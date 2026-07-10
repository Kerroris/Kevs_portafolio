import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { useLang } from '../i18n.jsx'
import { sectors, profile } from '../data/profile.js'
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

function getInitialTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function Hud({ sectorIndex }) {
  const progressRef = useRef(null)
  const pctRef = useRef(null)
  const speedRef = useRef(null)
  const gearRef = useRef(null)
  const reduced = useReducedMotion()
  const { lang, setLang } = useLang()
  const [theme, setTheme] = useState(getInitialTheme)

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'light') document.documentElement.dataset.theme = 'light'
    else document.documentElement.removeAttribute('data-theme')
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* almacenamiento no disponible */
    }
  }

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
        <span className="hud-num">{profile.chassis}</span>
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

      <div className="hud-right">
        <span className="hud-telemetry mono" aria-hidden="true">
          <span className="hud-speed" ref={speedRef}>
            000
          </span>
          <span className="hud-unit">km/h</span>
          <span className="hud-divider" />
          <span className="hud-gear" ref={gearRef}>
            N
          </span>
        </span>

        <div className="hud-lang mono" role="group" aria-label="Idioma / Language">
          <button
            type="button"
            className={lang === 'es' ? 'active' : ''}
            onClick={() => setLang('es')}
            aria-pressed={lang === 'es'}
          >
            ES
          </button>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            EN
          </button>
        </div>

        <button
          type="button"
          className="hud-theme"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="7" y2="7" />
                <line x1="17" y1="17" x2="19.1" y2="19.1" />
                <line x1="4.9" y1="19.1" x2="7" y2="17" />
                <line x1="17" y1="7" x2="19.1" y2="4.9" />
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
