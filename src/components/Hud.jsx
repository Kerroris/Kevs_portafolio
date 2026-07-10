import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { sectors } from '../data/profile.js'
import './hud.css'

gsap.registerPlugin(ScrollTrigger)

const GEARS = [0, 40, 80, 130, 180, 230, 280, 320]

function gearFor(speed) {
  let g = 1
  for (let i = 0; i < GEARS.length; i++) {
    if (speed >= GEARS[i]) g = i + 1
  }
  return Math.min(g, 8)
}

export default function Hud({ sectorIndex }) {
  const progressRef = useRef(null)
  const pctRef = useRef(null)
  const speedRef = useRef(null)
  const gearRef = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    let target = 0
    let shown = 0

    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        const pct = Math.round(self.progress * 100)
        if (pctRef.current) pctRef.current.textContent = `${pct}%`
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`
        target = Math.min(338, Math.abs(self.getVelocity()) / 11)
      },
    })

    const tick = () => {
      target *= 0.92
      shown += (target - shown) * 0.12
      const s = Math.round(shown)
      if (speedRef.current) speedRef.current.textContent = String(s).padStart(3, '0')
      if (gearRef.current) gearRef.current.textContent = s < 3 ? 'N' : String(gearFor(s))
    }
    gsap.ticker.add(tick)

    return () => {
      st.kill()
      gsap.ticker.remove(tick)
    }
  }, [reduced])

  const sector = sectors[sectorIndex] || sectors[0]

  return (
    <header className="hud" role="banner">
      <div className="hud-left">
        <span className="hud-num">KBC-74</span>
        <span className="hud-divider" />
        <span className="hud-sector" key={sectorIndex}>
          <span className="hud-sector-idx">
            S{sectorIndex + 1}/{sectors.length}
          </span>
          <span className="hud-sector-name">{sector.label}</span>
        </span>
      </div>

      <div className="hud-center" aria-hidden="true">
        <span className="hud-label">Race</span>
        <div className="hud-bar">
          <div className="hud-bar-fill" ref={progressRef} />
        </div>
        <span className="hud-pct mono" ref={pctRef}>
          0%
        </span>
      </div>

      <div className="hud-right mono" aria-hidden="true">
        <span className="hud-speed" ref={speedRef}>
          000
        </span>
        <span className="hud-unit">km/h</span>
        <span className="hud-divider" />
        <span className="hud-gear" ref={gearRef}>
          N
        </span>
      </div>
    </header>
  )
}
