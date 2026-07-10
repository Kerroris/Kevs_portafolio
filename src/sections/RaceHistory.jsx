import { seasons } from '../data/profile.js'
import './racehistory.css'

export default function RaceHistory() {
  return (
    <section className="sector" id="history" data-track-anchor="left">
      <div className="sector-inner side-right">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S4</span> Race History
        </div>
        <h2 className="sec-title" data-reveal>
          Temporadas <em>corridas</em>
        </h2>
        <p className="sec-desc" data-reveal>
          Cada temporada, un equipo distinto y un sistema entregado.
        </p>
      </div>

      <ol className="season-list">
        {seasons.map((s, i) => (
          <li className="season" key={s.year + s.team} data-reveal>
            <div className="season-marker" aria-hidden="true">
              <span className="season-year mono">{s.year}</span>
              <span className="season-dot" />
              {i < seasons.length - 1 && <span className="season-line" />}
            </div>

            <article className="panel season-card">
              <header className="season-head">
                <h3 className="season-team">{s.team}</h3>
                <span className="season-period mono">{s.period}</span>
              </header>
              <p className="season-role mono">{s.role}</p>
              <ul className="season-results">
                {s.results.map((r) => (
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
