import { useMemo } from 'react'
import { skills, contextMeta } from '../data/profile.js'
import './telemetry.css'

const CURRENT_YEAR = 2026
const TRACE_W = 640
const TRACE_STEP = 16

// Generador determinista para que las trazas no cambien entre renders
function lcg(seed) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function buildTraces(seed) {
  const rnd = lcg(seed)
  const throttle = []
  const brake = []
  const speed = []
  let open = 1 // 1 = acelerando, 0 = frenando
  let hold = 0
  let spd = 30

  for (let x = 0; x <= TRACE_W; x += TRACE_STEP) {
    if (hold <= 0) {
      open = rnd() > 0.32 ? 1 : 0
      hold = 2 + Math.floor(rnd() * 5)
    }
    hold--
    const jitter = rnd() * 4
    throttle.push([x, open ? 6 + jitter : 40 + jitter])
    brake.push([x, open ? 44 + jitter : 8 + jitter])
    spd += open ? (52 - spd) * 0.28 : (14 - spd) * 0.36
    speed.push([x, 52 - spd + rnd() * 2])
  }
  const toStr = (pts) => pts.map(([x, y]) => `${x},${y.toFixed(1)}`).join(' ')
  return { throttle: toStr(throttle), brake: toStr(brake), speed: toStr(speed) }
}

function Trace({ seed, duration }) {
  const t = useMemo(() => buildTraces(seed), [seed])
  return (
    <div className="tel-trace" aria-hidden="true">
      <svg viewBox={`0 0 ${TRACE_W} 52`} preserveAspectRatio="none">
        <g className="tel-trace-scroll" style={{ animationDuration: `${duration}s` }}>
          {[0, TRACE_W].map((offset) => (
            <g key={offset} transform={`translate(${offset} 0)`}>
              <polyline className="tel-line tel-line-speed" points={t.speed} />
              <polyline className="tel-line tel-line-brake" points={t.brake} />
              <polyline className="tel-line tel-line-throttle" points={t.throttle} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

function stintYears(since) {
  return Math.max(1, CURRENT_YEAR - since)
}

export default function Telemetry() {
  return (
    <section className="sector" id="telemetry" data-track-anchor="left">
      <div className="sector-inner side-right">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S2</span> Car Telemetry
        </div>
        <h2 className="sec-title" data-reveal>
          Telemetría del <em>{'KBC-74'}</em>
        </h2>
        <p className="sec-desc" data-reveal>
          Sin porcentajes inventados: cada tecnología muestra desde cuándo está en el
          stint y en qué contexto se ha usado de verdad.
        </p>

        <div className="tel-legend mono" data-reveal>
          {Object.entries(contextMeta).map(([key, meta]) => (
            <span className="tel-legend-item" key={key}>
              <i style={{ background: meta.color }} /> {meta.label}
            </span>
          ))}
          <span className="tel-legend-item">
            <i className="tel-legend-block" /> = 1 año en pista
          </span>
        </div>
      </div>

      <div className="tel-panels">
        {skills.map((group, gi) => (
          <article className="panel tel-panel" key={group.channel} data-reveal>
            <header className="tel-panel-head">
              <h3 className="tel-channel">{group.channel}</h3>
              <span className="tel-unit mono">{group.unit}</span>
            </header>

            <Trace seed={(gi + 3) * 97} duration={9 + gi * 2.4} />

            <ul className="tel-list">
              {group.items.map((item) => {
                const meta = contextMeta[item.context]
                const years = stintYears(item.since)
                return (
                  <li className="tel-row" key={item.name}>
                    <span className="tel-name">{item.name}</span>
                    <span className="tel-since mono">since {item.since}</span>
                    <span
                      className="tel-blocks"
                      role="img"
                      aria-label={`${years} años de uso, contexto ${meta.label}`}
                    >
                      {Array.from({ length: Math.min(years, 5) }).map((_, i) => (
                        <i key={i} style={{ background: meta.color }} />
                      ))}
                    </span>
                    <span className="tel-context mono" style={{ color: meta.color }}>
                      {meta.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
