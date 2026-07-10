import { profile, interests } from '../data/profile.js'
import { useLang, pick } from '../i18n.jsx'
import './driverprofile.css'

export default function DriverProfile() {
  const { lang, t } = useLang()

  return (
    <section className="sector" id="driver" data-track-anchor="right">
      <div className="sector-inner">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S1</span> Driver Profile
        </div>
        <h2 className="sec-title" data-reveal>
          {t.driverTitle.pre}
          <em>{t.driverTitle.em}</em>
          {t.driverTitle.post}
        </h2>

        <article className="driver-card panel" data-reveal>
          <div className="driver-photo">
            <img src={profile.photo} alt={`Fotografía de ${profile.name}`} loading="lazy" />
            <span className="driver-photo-num mono">#{profile.racingNumber}</span>
          </div>

          <div className="driver-info">
            <h3 className="driver-name">{profile.name}</h3>
            <p className="driver-subrole mono">{profile.subRole}</p>

            <dl className="driver-specs">
              <div>
                <dt>{t.specRole}</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>{t.specBase}</dt>
                <dd>{pick(profile.location, lang)}</dd>
              </div>
              <div>
                <dt>{t.specSpecialty}</dt>
                <dd>{pick(profile.specialty, lang)}</dd>
              </div>
              <div>
                <dt>{t.specChassis}</dt>
                <dd>{profile.chassis}</dd>
              </div>
            </dl>
          </div>
        </article>

        <p className="driver-summary" data-reveal>
          {pick(profile.summary, lang)}
        </p>

        <div className="driver-stats" data-reveal>
          {profile.stats.map((s) => (
            <div className="driver-stat" key={s.value}>
              <span className="driver-stat-value">{s.value}</span>
              <span className="driver-stat-label mono">{pick(s.label, lang)}</span>
            </div>
          ))}
        </div>

        {/* Lo que me mueve fuera del teclado */}
        <div className="driver-offtrack" data-reveal>
          <p className="offtrack-label mono">{t.offTrack}</p>
          <ul className="offtrack-list">
            {interests.map((item) => (
              <li className="offtrack-item" key={item.tag}>
                <span className="offtrack-tag mono">{item.tag}</span>
                <span className="offtrack-text">{pick(item.text, lang)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
