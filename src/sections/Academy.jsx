import { education, languages, profile } from '../data/profile.js'
import { useLang, pick } from '../i18n.jsx'
import './academy.css'

export default function Academy() {
  const { lang, t } = useLang()

  return (
    <section className="sector" id="academy" data-track-anchor="right">
      <div className="sector-inner">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S5</span> Driver Academy
        </div>
        <h2 className="sec-title" data-reveal>
          {t.acadTitle.pre}
          <em>{t.acadTitle.em}</em>
          {t.acadTitle.post}
        </h2>
      </div>

      <div className="academy-grid">
        {education.map((ed) => (
          <article className="license panel" key={ed.period} data-reveal>
            <header className="license-head">
              <span className="license-tier mono">{pick(ed.tier, lang)}</span>
              <span className="license-num mono">#{profile.racingNumber}</span>
            </header>
            <h3 className="license-title">{pick(ed.title, lang)}</h3>
            <p className="license-school">{ed.school}</p>
            <footer className="license-foot mono">
              <span>{ed.period}</span>
              <span className="license-detail">{pick(ed.detail, lang)}</span>
            </footer>
            <span className="license-holo" aria-hidden="true" />
          </article>
        ))}

        <article className="license panel license-lang" data-reveal>
          <header className="license-head">
            <span className="license-tier mono">PIT RADIO</span>
          </header>
          <h3 className="license-title">{t.languages}</h3>
          <ul className="lang-list">
            {languages.map((l) => (
              <li key={pick(l.name, 'es')}>
                <span className="lang-name">{pick(l.name, lang)}</span>
                <span className="lang-level mono">{pick(l.level, lang)}</span>
              </li>
            ))}
          </ul>
          <span className="license-holo" aria-hidden="true" />
        </article>
      </div>
    </section>
  )
}
