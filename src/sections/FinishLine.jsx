import { useState } from 'react'
import { profile } from '../data/profile.js'
import './finishline.css'

export default function FinishLine() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Sin backend: arma el correo en el cliente del visitante
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Pit radio de ${form.name || 'un visitante'}`)
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section className="sector finish" id="finish" data-track-anchor="center">
      <div className="finish-flag" aria-hidden="true" />

      <div className="finish-head">
        <div className="sec-kicker" data-reveal>
          <span className="sec-num">S7</span> Finish Line
        </div>
        <h2 className="sec-title" data-reveal>
          Bandera a <em>cuadros</em>
        </h2>
        <p className="sec-desc" data-reveal>
          Cruzaste la meta. Si buscas a alguien para tu equipo o traes un proyecto
          entre manos, abre el canal de radio.
        </p>
      </div>

      <div className="finish-grid">
        <form className="panel finish-form" onSubmit={onSubmit} data-reveal>
          <p className="finish-form-label mono">PIT RADIO — CANAL ABIERTO</p>

          <label className="field">
            <span className="field-label mono">Nombre</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder="¿Quién llama a boxes?"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="field-label mono">Correo</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Para responderte por radio"
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span className="field-label mono">Mensaje</span>
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={onChange}
              placeholder="Cuéntame del proyecto, la vacante o la idea"
            />
          </label>

          <button className="btn" type="submit">
            <span>Transmitir</span>
          </button>
        </form>

        <div className="finish-links" data-reveal>
          <a className="radio-link" href={profile.github} target="_blank" rel="noreferrer">
            <span className="radio-link-tag mono">GITHUB</span>
            <span className="radio-link-value">github.com/Kerroris</span>
          </a>
          <a className="radio-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="radio-link-tag mono">LINKEDIN</span>
            <span className="radio-link-value">linkedin.com/in/kerroris</span>
          </a>
          <a className="radio-link" href={`mailto:${profile.email}`}>
            <span className="radio-link-tag mono">CORREO</span>
            <span className="radio-link-value">{profile.email}</span>
          </a>

          <p className="finish-quote">
            El software, como las carreras, se gana en los detalles: en la vuelta
            {' '}<em>que nadie ve</em>, en el pit stop que sale perfecto.
          </p>
        </div>
      </div>

      <footer className="finish-footer mono">
        <span>© 2026 {profile.name}</span>
        <span className="finish-footer-sep" />
        <span>Diseñado y construido desde el garage · {profile.chassis}</span>
      </footer>
    </section>
  )
}
