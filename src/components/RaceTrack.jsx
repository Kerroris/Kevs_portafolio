import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RaceCar from './RaceCar.jsx'
import { profile } from '../data/profile.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './racetrack.css'

gsap.registerPlugin(ScrollTrigger)

// Parrilla: el líder (número del piloto) va al frente; lo persiguen un carro
// negro y uno plateado. Los tres siguen EXACTAMENTE la misma curva; sólo se
// separan por distancia a lo largo de la pista (`trail`, en px de recorrido),
// así nunca se salen del carril ni en las curvas. `smooth` controla qué tan
// rápido cada carro alcanza al scroll: menor = más inercia, el grupo se estira
// al acelerar y se reagrupa al frenar.
const CARS = [
  { number: profile.racingNumber, trail: 0, smooth: 0.18, livery: null },
  {
    number: '08',
    trail: 82,
    smooth: 0.12,
    livery: {
      body: '#1b2027',
      pods: '#10141a',
      wings: '#0c0f13',
      wingAccent: '#00c2b0',
      stripe: '#00c2b0',
      numberBg: '#00c2b0',
      numberColor: '#0c1013',
    },
  },
  {
    number: '27',
    trail: 164,
    smooth: 0.085,
    livery: {
      body: '#b6bdc7',
      pods: '#828b96',
      wings: '#14171c',
      wingAccent: '#b6bdc7',
      stripe: '#e8342a',
      numberBg: '#14171c',
      numberColor: '#f2f3f5',
    },
  },
]

// Convierte puntos en una curva suave (Catmull-Rom -> Bézier cúbica)
function smoothPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(i + 2, points.length - 1)]
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

// Construye los puntos de la pista a partir de los anclajes de cada sección
function buildPoints(container) {
  const width = container.clientWidth
  const anchors = Array.from(container.querySelectorAll('[data-track-anchor]'))
  if (!anchors.length) return []

  const SIDE_X = { left: 0.26, right: 0.74, center: 0.5 }
  const raw = anchors.map((el) => {
    const side = el.getAttribute('data-track-anchor') || 'center'
    const top = el.offsetTop
    const h = el.offsetHeight
    return { x: width * (SIDE_X[side] ?? 0.5), y: top + h * 0.5 }
  })

  // La meta: el trazado termina en la franja de cuadros de la última sección
  const lastEl = anchors[anchors.length - 1]
  raw[raw.length - 1] = { x: width * 0.5, y: lastEl.offsetTop + 48 }

  // Punto inicial: parte baja de la primera sección (la parrilla de salida)
  const first = anchors[0]
  const points = [{ x: width * 0.5, y: first.offsetTop + first.offsetHeight * 0.86 }]

  // Entre cada par de anclajes se insertan chicanes para que el trazado serpentee
  for (let i = 0; i < raw.length - 1; i++) {
    if (i > 0) points.push(raw[i])
    const a = raw[i]
    const b = raw[i + 1]
    const midY = (a.y + b.y) / 2
    const sway = width * (i % 2 === 0 ? 0.16 : -0.16)
    points.push({ x: (a.x + b.x) / 2 + sway, y: midY })
  }
  points.push(raw[raw.length - 1])
  return points
}

export default function RaceTrack() {
  const layerRef = useRef(null)
  const svgRef = useRef(null)
  const carRefs = useRef([])
  const reduced = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    const container = layer?.parentElement
    if (!layer || !container) return

    let debounce = 0

    // Estado del bucle de render
    let pathEl = null
    let pathLen = 0
    let targetProgress = 0
    let trails = CARS.map((c) => c.trail)
    const shown = CARS.map(() => 0)
    let st = null
    let running = false

    // Coloca un carro a `dist` px del recorrido, orientado según la tangente
    const placeCar = (i) => {
      const car = carRefs.current[i]
      if (!car || !pathLen) return
      let dist = shown[i] * pathLen - trails[i]
      if (dist < 0) dist = 0
      if (dist > pathLen) dist = pathLen
      const p = pathEl.getPointAtLength(dist)
      const p2 = pathEl.getPointAtLength(Math.min(pathLen, dist + 2))
      const angle = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI
      car.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${angle}deg)`
    }

    const tick = () => {
      for (let i = 0; i < CARS.length; i++) {
        shown[i] += (targetProgress - shown[i]) * CARS[i].smooth
        placeCar(i)
      }
    }

    const stopLoop = () => {
      if (running) {
        gsap.ticker.remove(tick)
        running = false
      }
      if (st) {
        st.kill()
        st = null
      }
    }

    const build = () => {
      stopLoop()
      const svg = svgRef.current
      const cars = carRefs.current.filter(Boolean)
      if (!svg || !cars.length) return

      const width = container.clientWidth
      const height = container.scrollHeight
      if (!width) return

      // En pantallas angostas los carros son más chicos: acorta la separación
      const trailScale = width < 900 ? 0.62 : 1
      trails = CARS.map((c) => c.trail * trailScale)
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      const points = buildPoints(container)
      if (points.length < 2) return
      const d = smoothPath(points)
      svg.querySelectorAll('.rt-stroke').forEach((p) => p.setAttribute('d', d))

      if (reduced) {
        cars.forEach((car) => gsap.set(car, { autoAlpha: 0 }))
        return
      }
      cars.forEach((car) => gsap.set(car, { autoAlpha: 1 }))

      pathEl = svg.querySelector('#rt-main-path')
      pathLen = pathEl.getTotalLength()

      // El recorrido termina cuando la meta llega a media pantalla, para que el
      // cruce de la línea ocurra dentro del viewport
      const endScroll = Math.max(
        window.innerHeight,
        points[points.length - 1].y - window.innerHeight * 0.55
      )

      st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: endScroll,
        onUpdate: (self) => {
          targetProgress = self.progress
        },
      })
      // Arranca ya alineado con la posición actual de scroll
      targetProgress = st.progress
      for (let i = 0; i < CARS.length; i++) {
        shown[i] = targetProgress
        placeCar(i)
      }

      gsap.ticker.add(tick)
      running = true
    }

    const rebuild = () => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(() => {
        build()
        ScrollTrigger.refresh()
      }, 180)
    }

    // La primera construcción espera a que cargue la fuente y se asiente el layout
    const initial = window.setTimeout(() => {
      build()
      ScrollTrigger.refresh()
    }, 120)

    const ro = new ResizeObserver(rebuild)
    ro.observe(container)

    // Reconstruye cuando la pestaña vuelve a ser visible
    // (si cargó en segundo plano, el primer layout puede haber sido incorrecto)
    const onVisible = () => {
      if (!document.hidden) rebuild()
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      window.clearTimeout(initial)
      window.clearTimeout(debounce)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisible)
      stopLoop()
    }
  }, [reduced])

  return (
    <div className="rt-layer" ref={layerRef} aria-hidden="true">
      <svg ref={svgRef} className="rt-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Sombra del trazado */}
        <path className="rt-stroke rt-shadow" d="" />
        {/* Pianos: base blanca + franjas rojas discontinuas */}
        <path className="rt-stroke rt-kerb-base" d="" />
        <path className="rt-stroke rt-kerb-stripes" d="" />
        {/* Asfalto */}
        <path id="rt-main-path" className="rt-stroke rt-asphalt" d="" />
        {/* Línea central discontinua */}
        <path className="rt-stroke rt-centerline" d="" />
      </svg>
      {CARS.map((car, i) => (
        <div
          key={car.number}
          ref={(el) => (carRefs.current[i] = el)}
          className="rt-car"
          style={{ zIndex: CARS.length - i }}
        >
          <div className="rt-car-body">
            <RaceCar className="rt-car-svg" number={car.number} livery={car.livery} />
          </div>
        </div>
      ))}
    </div>
  )
}
