import { seasons } from '../data/profile.js'
import { useLang, pick } from '../i18n.jsx'
import './racehistory.css'

export default function RaceHistory() {
  const { lang, t } = useLang()

  return (
    <section className="sector" id="history" data-track-anchor="left">
      <div className="sector-inner side-right">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S4</span> Race History
        </div>
        <h2 className="sec-title" data-reveal>
          {t.histTitle.pre}
          <em>{t.histTitle.em}</em>
          {t.histTitle.post}
        </h2>
        <p className="sec-desc" data-reveal>
          {t.histDesc}
        </p>
      </div>

      <ol className="season-list">
        {seasons.map((s, i) => (
          <li className="season" key={pick(s.team, lang)} data-reveal>
            <div className="season-marker" aria-hidden="true">
              <span className="season-year mono">{pick(s.year, lang)}</span>
              <span className="season-dot" />
              {i < seasons.length - 1 && <span className="season-line" />}
            </div>

            <article className="panel season-card">
              <header className="season-head">
                <h3 className="season-team">{pick(s.team, lang)}</h3>
                <span className="season-period mono">{pick(s.period, lang)}</span>
              </header>
              <p className="season-role mono">{pick(s.role, lang)}</p>
              <ul className="season-results">
                {pick(s.results, lang).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
