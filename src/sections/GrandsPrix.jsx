import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/profile.js'
import { useLang, pick } from '../i18n.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './grandsprix.css'

gsap.registerPlugin(ScrollTrigger)

// Trazados originales de cada circuito (viewBox 0 0 300 200)
const CIRCUITS = {
  A: 'M60,150 C22,148 18,112 45,96 C72,80 58,52 92,40 C130,26 168,32 210,30 C258,28 282,56 270,86 C261,110 232,104 210,120 C186,138 238,168 198,181 C158,194 98,152 60,150 Z',
  B: 'M40,168 L40,80 Q40,60 60,60 L138,60 Q158,60 158,42 Q158,24 178,24 L248,24 Q268,24 268,44 L268,88 Q268,108 248,108 L222,108 Q202,108 202,128 L202,148 Q202,168 182,168 Z',
  C: 'M30,102 C30,62 68,40 108,54 C140,65 150,92 180,86 C216,79 204,36 244,36 C274,36 286,70 266,96 C246,122 272,150 236,165 C192,183 170,138 130,148 C90,158 30,142 30,102 Z',
}

function CircuitMap({ shape, round }) {
  const d = CIRCUITS[shape] || CIRCUITS.A
  return (
    <div className="gp-circuit" aria-hidden="true">
      <svg viewBox="0 0 300 200">
        <path className="gp-track-base" d={d} />
        <path className="gp-track-s1" d={d} pathLength="100" />
        <path className="gp-track-s2" d={d} pathLength="100" />
        <path className="gp-track-s3" d={d} pathLength="100" />
        <path className="gp-track-draw" d={d} pathLength="100" />
      </svg>
      <span className="gp-round mono">R{round}</span>
    </div>
  )
}

export default function GrandsPrix() {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const { lang, t } = useLang()

  // Dibuja cada circuito cuando entra al viewport
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gp-circuit').forEach((el) => {
        const draw = el.querySelector('.gp-track-draw')
        const sectors = el.querySelectorAll('.gp-track-s1, .gp-track-s2, .gp-track-s3')
        gsap.set(draw, { strokeDasharray: 100, strokeDashoffset: 100 })
        gsap.set(sectors, { opacity: 0 })
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: 'top 75%' } })
          .to(draw, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
          .to(sectors, { opacity: 1, duration: 0.5, stagger: 0.15 }, '-=0.3')
          .to(draw, { opacity: 0, duration: 0.4 }, '<')
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="sector" id="projects" data-track-anchor="right" ref={rootRef}>
      <div className="sector-inner">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S3</span> Grands Prix
        </div>
        <h2 className="sec-title" data-reveal>
          {t.projTitle.pre}
          <em>{t.projTitle.em}</em>
          {t.projTitle.post}
        </h2>
        <p className="sec-desc" data-reveal>
          {t.projDesc}
        </p>
      </div>

      <div className="gp-list">
        {projects.map((p) => (
          <article className="gp" key={p.round} data-reveal>
            <div className="gp-visual">
              <CircuitMap shape={p.circuit} round={p.round} />
              {p.image && (
                <figure className="gp-shot">
                  <img src={p.image} alt={pick(p.title, lang)} loading="lazy" />
                </figure>
              )}
            </div>

            <div className="gp-info">
              <p className="gp-name mono">
                ROUND {p.round} — {pick(p.gpName, lang).toUpperCase()}
              </p>
              <h3 className="gp-title">{pick(p.title, lang)}</h3>

              <div className="gp-meta mono">
                <span>{pick(p.role, lang)}</span>
                <span className="gp-meta-dot" />
                <span>
                  {p.laps} {t.laps} · {p.length}
                </span>
              </div>

              <p className="gp-desc">{pick(p.description, lang)}</p>

              <div className="gp-setup">
                <span className="gp-setup-label mono">Setup</span>
                <div className="gp-stack">
                  {p.stack.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="gp-notes">
                {pick(p.notes, lang).map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>

              {(p.links.live || p.links.repo) && (
                <div className="gp-links">
                  {p.links.live && (
                    <a className="btn" href={p.links.live} target="_blank" rel="noreferrer">
                      <span>{t.viewLive}</span>
                    </a>
                  )}
                  {p.links.repo && (
                    <a
                      className="btn ghost"
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{t.sourceCode}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
