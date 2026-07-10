import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './startinggrid.css'

const LIGHT_COLS = 5

export default function StartingGrid() {
  const [litCols, setLitCols] = useState(0)
  const [lightsOut, setLightsOut] = useState(false)
  const reduced = useReducedMotion()
  const doneRef = useRef(false)

  // Secuencia del semáforo: se encienden 5 columnas y luego se apagan
  useEffect(() => {
    if (reduced) {
      setLitCols(LIGHT_COLS)
      setLightsOut(true)
      return
    }
    const timers = []
    for (let i = 1; i <= LIGHT_COLS; i++) {
      timers.push(window.setTimeout(() => setLitCols(i), 700 + i * 620))
    }
    timers.push(
      window.setTimeout(() => {
        setLightsOut(true)
        doneRef.current = true
      }, 700 + LIGHT_COLS * 620 + 1100)
    )

    const onScroll = () => {
      if (doneRef.current) return
      doneRef.current = true
      setLitCols(LIGHT_COLS)
      setLightsOut(true)
    }
    window.addEventListener('scroll', onScroll, { once: true, passive: true })

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section className="sector grid-hero" id="grid" data-track-anchor="center">
      <div className="grid-gantry" role="img" aria-label="Semáforo de salida de carrera">
        {Array.from({ length: LIGHT_COLS }).map((_, col) => (
          <div className="gantry-col" key={col}>
            {[0, 1].map((row) => (
              <span
                key={row}
                className={`gantry-light ${col < litCols && !lightsOut ? 'on' : ''}`}
              />
            ))}
          </div>
        ))}
      </div>

      <p className={`grid-status mono ${lightsOut ? 'go' : ''}`}>
        {lightsOut ? "LIGHTS OUT — HAZ SCROLL PARA ARRANCAR" : 'FORMATION LAP…'}
      </p>

      <div className="grid-title-block">
        <p className="grid-pole mono">
          <span>POLE POSITION</span>
          <span className="grid-pole-num">#{profile.racingNumber}</span>
        </p>
        <h1 className="grid-name">
          Kevin Brian
          <br />
          <em>Castillo Mejía</em>
        </h1>
        <p className="grid-role">
          {profile.role} <span className="grid-role-sep">/</span> Backend Developer
        </p>
        <p className="grid-tagline">{profile.tagline}</p>

        <div className="grid-ctas">
          <a className="btn" href="#driver" onClick={scrollTo('driver')}>
            <span>Start Engine</span>
          </a>
          <a className="btn ghost" href="#projects" onClick={scrollTo('projects')}>
            <span>Enter Paddock</span>
          </a>
        </div>
      </div>

      {/* Cajones de la parrilla de salida */}
      <div className="grid-slots" aria-hidden="true">
        <span className="grid-slot" />
        <span className="grid-slot" />
        <span className="grid-slot" />
      </div>

      <div className="grid-scroll-hint" aria-hidden="true">
        <span className="grid-scroll-line" />
      </div>
    </section>
  )
}
