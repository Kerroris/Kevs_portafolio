import { education, languages, profile } from '../data/profile.js'
import './academy.css'

export default function Academy() {
  return (
    <section className="sector" id="academy" data-track-anchor="right">
      <div className="sector-inner">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S5</span> Driver Academy
        </div>
        <h2 className="sec-title" data-reveal>
          Formación de <em>piloto</em>
        </h2>
      </div>

      <div className="academy-grid">
        {education.map((ed) => (
          <article className="license panel" key={ed.title} data-reveal>
            <header className="license-head">
              <span className="license-tier mono">{ed.tier}</span>
              <span className="license-num mono">#{profile.racingNumber}</span>
            </header>
            <h3 className="license-title">{ed.title}</h3>
            <p className="license-school">{ed.school}</p>
            <footer className="license-foot mono">
              <span>{ed.period}</span>
              <span className="license-detail">{ed.detail}</span>
            </footer>
            <span className="license-holo" aria-hidden="true" />
          </article>
        ))}

        <article className="license panel license-lang" data-reveal>
          <header className="license-head">
            <span className="license-tier mono">PIT RADIO</span>
          </header>
          <h3 className="license-title">Idiomas</h3>
          <ul className="lang-list">
            {languages.map((l) => (
              <li key={l.name}>
                <span className="lang-name">{l.name}</span>
                <span className="lang-level mono">{l.level}</span>
              </li>
            ))}
          </ul>
          <span className="license-holo" aria-hidden="true" />
        </article>
      </div>
    </section>
  )
}
