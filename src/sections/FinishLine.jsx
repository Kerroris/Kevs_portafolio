import { useState } from 'react'
import { profile } from '../data/profile.js'
import { useLang } from '../i18n.jsx'
import './finishline.css'

export default function FinishLine() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { t } = useLang()

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Sin backend: arma el correo en el cliente del visitante
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${t.mailSubject} ${form.name || t.visitor}`)
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
          {t.finishTitle.pre}
          <em>{t.finishTitle.em}</em>
          {t.finishTitle.post}
        </h2>
        <p className="sec-desc" data-reveal>
          {t.finishDesc}
        </p>
      </div>

      <div className="finish-grid">
        <form className="panel finish-form" onSubmit={onSubmit} data-reveal>
          <p className="finish-form-label mono">{t.pitRadio}</p>

          <label className="field">
            <span className="field-label mono">{t.formName}</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={onChange}
              placeholder={t.phName}
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="field-label mono">{t.formEmail}</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder={t.phEmail}
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span className="field-label mono">{t.formMessage}</span>
            <textarea
              name="message"
              rows="5"
              required
              value={form.message}
              onChange={onChange}
              placeholder={t.phMessage}
            />
          </label>

          <button className="btn" type="submit">
            <span>{t.transmit}</span>
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
            <span className="radio-link-tag mono">{t.emailTag}</span>
            <span className="radio-link-value">{profile.email}</span>
          </a>

          <p className="finish-quote">
            {t.quote.a}
            <em>{t.quote.em}</em>
            {t.quote.b}
          </p>
        </div>
      </div>

      <footer className="finish-footer mono">
        <span>© 2026 {profile.name}</span>
        <span className="finish-footer-sep" />
        <span>
          {t.footerLine} · {profile.chassis}
        </span>
      </footer>
    </section>
  )
}
