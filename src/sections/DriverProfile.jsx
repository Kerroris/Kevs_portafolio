import { profile } from '../data/profile.js'
import './driverprofile.css'

export default function DriverProfile() {
  return (
    <section className="sector" id="driver" data-track-anchor="right">
      <div className="sector-inner">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S1</span> Driver Profile
        </div>
        <h2 className="sec-title" data-reveal>
          El <em>piloto</em>
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
                <dt>Rol</dt>
                <dd>{profile.role}</dd>
              </div>
              <div>
                <dt>Base</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Especialidad</dt>
                <dd>{profile.specialty}</dd>
              </div>
              <div>
                <dt>Chasis</dt>
                <dd>{profile.chassis}</dd>
              </div>
            </dl>
          </div>
        </article>

        <p className="driver-summary" data-reveal>
          {profile.summary}
        </p>

        <div className="driver-stats" data-reveal>
          {profile.stats.map((s) => (
            <div className="driver-stat" key={s.label}>
              <span className="driver-stat-value">{s.value}</span>
              <span className="driver-stat-label mono">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
