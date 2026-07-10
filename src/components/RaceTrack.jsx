import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import RaceCar from './RaceCar.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './racetrack.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

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
  const carRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const layer = layerRef.current
    const container = layer?.parentElement
    if (!layer || !container) return

    const mql = window.matchMedia('(min-width: 900px)')
    let tween = null
    let raf = 0

    const teardown = () => {
      if (tween) {
        tween.scrollTrigger?.kill()
        tween.kill()
        tween = null
      }
    }

    const build = () => {
      teardown()
      const svg = svgRef.current
      const car = carRef.current
      if (!svg || !car) return

      if (!mql.matches) {
        layer.style.display = 'none'
        return
      }
      layer.style.display = ''

      const width = container.clientWidth
      const height = container.scrollHeight
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)

      const points = buildPoints(container)
      if (points.length < 2) return
      const d = smoothPath(points)
      svg.querySelectorAll('.rt-stroke').forEach((p) => p.setAttribute('d', d))

      if (reduced) {
        gsap.set(car, { autoAlpha: 0 })
        return
      }

      const pathEl = svg.querySelector('#rt-main-path')
      gsap.set(car, { autoAlpha: 1 })
      // El scrub termina cuando la meta está a media pantalla, para que el
      // cruce de la línea ocurra dentro del viewport
      const endScroll = Math.max(
        window.innerHeight,
        points[points.length - 1].y - window.innerHeight * 0.55
      )
      tween = gsap.to(car, {
        motionPath: {
          path: pathEl,
          align: pathEl,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: 'none',
        immediateRender: true,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: endScroll,
          scrub: 0.6,
        },
      })
    }

    // La primera construcción espera a que cargue la fuente y se asiente el layout
    const initial = window.setTimeout(() => {
      build()
      ScrollTrigger.refresh()
    }, 120)

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        window.clearTimeout(debounce)
        debounce = window.setTimeout(() => {
          build()
          ScrollTrigger.refresh()
        }, 180)
      })
    })
    let debounce = 0
    ro.observe(container)

    return () => {
      window.clearTimeout(initial)
      window.clearTimeout(debounce)
      cancelAnimationFrame(raf)
      ro.disconnect()
      teardown()
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
      <div ref={carRef} className="rt-car">
        <RaceCar className="rt-car-svg" />
      </div>
    </div>
  )
}
