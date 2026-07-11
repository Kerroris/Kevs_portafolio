import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/profile.js'
import { useLang, pick } from '../i18n.jsx'
import useReducedMotion from '../hooks/useReducedMotion.js'
import './grandsprix.css'

gsap.registerPlugin(ScrollTrigger)

// Trazados de circuitos reales de F1, dibujados a mano (viewBox 0 0 300 200).
// En src/data/profile.js cada proyecto elige el suyo con `circuit: '<clave>'`.
const CIRCUITS = {
  suzuka: {
    label: { es: 'Suzuka · Japón', en: 'Suzuka · Japan' },
    d: 'M150,90 C125,93 108,94 95,95 C45,85 35,140 75,160 C115,180 150,150 140,120 L200,45 C225,20 275,35 268,70 C262,98 215,105 195,90 Z',
  },
  monza: {
    label: { es: 'Monza · Italia', en: 'Monza · Italy' },
    d: 'M62,178 L50,84 Q46,62 66,56 L118,42 Q130,38 142,44 L154,52 L190,40 Q206,34 220,44 L246,64 Q262,76 258,94 L252,112 Q240,146 206,156 L98,180 Q70,186 62,178 Z',
  },
  monaco: {
    label: { es: 'Mónaco', en: 'Monaco' },
    d: 'M40,130 Q32,112 50,104 L118,84 Q132,80 138,66 Q144,48 160,50 Q176,52 173,68 Q171,82 184,86 L216,94 Q232,98 244,90 L256,78 Q272,68 280,82 Q288,98 272,108 L240,128 Q228,136 212,134 L122,122 Q102,119 86,127 L64,138 Q46,146 40,130 Z',
  },
  spa: {
    label: { es: 'Spa · Bélgica', en: 'Spa · Belgium' },
    d: 'M60,60 Q46,52 54,40 Q62,28 76,36 L110,58 Q120,64 132,62 L200,50 Q216,47 228,56 L256,78 Q268,88 262,102 L240,148 Q232,164 214,162 L150,154 Q136,152 128,140 L112,112 Q106,100 94,94 L60,60 Z',
  },
  cota: {
    label: { es: 'COTA · EE. UU.', en: 'COTA · USA' },
    d: 'M150,170 L60,160 Q40,158 42,140 Q44,124 62,124 L96,122 Q112,120 118,106 Q124,92 116,80 Q108,68 118,58 Q128,48 142,54 L162,64 Q172,68 184,64 L228,50 Q246,44 254,60 Q260,74 248,84 L216,110 Q206,118 208,132 L212,146 Q214,164 196,168 L150,170 Z',
  },
  interlagos: {
    label: { es: 'Interlagos · Brasil', en: 'Interlagos · Brazil' },
    d: 'M80,150 Q50,148 46,120 Q42,96 68,88 L180,62 Q200,58 214,66 Q230,76 224,94 Q218,110 200,110 L150,108 Q134,108 130,122 Q126,136 140,142 L190,158 Q206,164 200,178 Q193,192 176,186 L80,150 Z',
  },
}

function CircuitMap({ shape, round }) {
  const { lang } = useLang()
  const circuit = CIRCUITS[shape] || CIRCUITS.suzuka
  const d = circuit.d
  return (
    <div className="gp-circuit" aria-hidden="true">
      <svg viewBox="0 0 300 200">
        <path className="gp-track-base" d={d} />
        <path className="gp-track-s1" d={d} pathLength="100" />
        <path className="gp-track-s2" d={d} pathLength="100" />
        <path className="gp-track-s3" d={d} pathLength="100" />
        <path className="gp-track-draw" d={d} pathLength="100" />
      </svg>
      <span className="gp-circuit-name mono">{pick(circuit.label, lang)}</span>
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
