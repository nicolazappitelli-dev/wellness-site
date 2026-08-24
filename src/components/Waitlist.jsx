import { useState, useEffect, useRef } from 'react'
import { submitLead } from '../lib/submitLead'
import './Waitlist.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const INTERESTS = [
  'Essential membership ($99/mo)',
  'Unlimited membership ($129/mo)',
  'Walk-in / drop-in',
  'Cryotherapy',
  'Red Light Bed Therapy',
  'Infrared Sauna',
  'Compression Therapy',
  'Not sure yet',
]

function phoneDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function isValidPhone(value) {
  const digits = phoneDigits(value)
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

export default function Waitlist() {
  const [form, setForm] = useState({
    first: '',
    last: '',
    phone: '',
    email: '',
    interest: '',
    note: '',
    website: '',
  })
  const [status, setStatus] = useState('idle')
  const [invalid, setInvalid] = useState('')
  const firstRef = useRef(null)
  const doneRef = useRef(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#inquiry' || hash === '#waitlist') {
      const timer = setTimeout(() => firstRef.current?.focus(), 450)
      return () => clearTimeout(timer)
    }
  }, [])

  const done = status === 'success' || status === 'mailto'
  useEffect(() => {
    if (done && doneRef.current) {
      doneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [done])

  function update(field) {
    return e => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      setInvalid('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const first = form.first.trim()
    const last = form.last.trim()
    const phone = form.phone.trim()
    const email = form.email.trim()
    const interest = form.interest
    const note = form.note.trim()

    if (!first || !last) {
      setInvalid('Please enter your first and last name.')
      return
    }
    if (!isValidPhone(phone)) {
      setInvalid('Please enter a phone number we can call you at.')
      return
    }
    if (!email || !EMAIL_RE.test(email)) {
      setInvalid('Please enter a valid email address.')
      return
    }
    if (!interest) {
      setInvalid('Please tell us what you are interested in.')
      return
    }

    setStatus('loading')

    const name = `${first} ${last}`
    const message = [
      `${name} requested a call back.`,
      `Phone: ${phone}`,
      `Interest: ${interest}`,
      note ? `Note: ${note}` : null,
    ].filter(Boolean).join('\n')

    try {
      const result = await submitLead({
        form: 'Inquiry',
        name,
        first_name: first,
        last_name: last,
        phone,
        email,
        interest,
        message,
        website: form.website,
        _subject: `Call request: ${interest} — ${name}`,
      })
      setStatus(result.fallback === 'mailto' ? 'mailto' : 'success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="inquiry" className="waitlist">
      <div id="waitlist" className="waitlist__anchor" aria-hidden="true" />
      <div className="waitlist__glow" aria-hidden="true" />
      <div className="container">
        <div className="waitlist__inner">

          <div className="waitlist__copy">
            <span className="section-label">Request a Call</span>
            <h2 className="waitlist__title">Tell us how to reach you.</h2>
            <p className="waitlist__sub">
              Leave your name and number. He will call you to answer questions,
              help you pick a plan, and get you scheduled when the studio opens.
            </p>
          </div>

          <div className="waitlist__form-wrap">
            {done ? (
              <div className="waitlist__done" ref={doneRef}>
                <div className="waitlist__done-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="waitlist__done-msg">
                  {status === 'mailto'
                    ? 'Send the email that just opened so he has your info and can call you.'
                    : 'Got it. He will call you to help you get set up.'}
                </p>
              </div>
            ) : (
              <form className="waitlist__form" onSubmit={handleSubmit} noValidate>
                <div className="waitlist__row">
                  <label className={`waitlist__box${invalid && !form.first.trim() ? ' waitlist__box--error' : ''}`}>
                    <span className="waitlist__label">First name</span>
                    <input
                      ref={firstRef}
                      type="text"
                      className="waitlist__input"
                      placeholder="First"
                      value={form.first}
                      onChange={update('first')}
                      disabled={status === 'loading'}
                      autoComplete="given-name"
                      required
                    />
                  </label>
                  <label className={`waitlist__box${invalid && !form.last.trim() ? ' waitlist__box--error' : ''}`}>
                    <span className="waitlist__label">Last name</span>
                    <input
                      type="text"
                      className="waitlist__input"
                      placeholder="Last"
                      value={form.last}
                      onChange={update('last')}
                      disabled={status === 'loading'}
                      autoComplete="family-name"
                      required
                    />
                  </label>
                </div>

                <label className={`waitlist__box${invalid && !isValidPhone(form.phone) ? ' waitlist__box--error' : ''}`}>
                  <span className="waitlist__label">Phone</span>
                  <input
                    type="tel"
                    className="waitlist__input"
                    placeholder="440-555-1234"
                    value={form.phone}
                    onChange={update('phone')}
                    disabled={status === 'loading'}
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </label>

                <label className={`waitlist__box${invalid && !EMAIL_RE.test(form.email.trim()) ? ' waitlist__box--error' : ''}`}>
                  <span className="waitlist__label">Email</span>
                  <input
                    type="email"
                    className="waitlist__input"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={update('email')}
                    disabled={status === 'loading'}
                    autoComplete="email"
                    required
                  />
                </label>

                <label className={`waitlist__box${invalid && !form.interest ? ' waitlist__box--error' : ''}`}>
                  <span className="waitlist__label">I am interested in</span>
                  <select
                    className="waitlist__input waitlist__select"
                    value={form.interest}
                    onChange={update('interest')}
                    disabled={status === 'loading'}
                    required
                  >
                    <option value="">Select one…</option>
                    {INTERESTS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="waitlist__box">
                  <span className="waitlist__label">Anything we should know? <em>(optional)</em></span>
                  <textarea
                    className="waitlist__input waitlist__textarea"
                    rows="3"
                    placeholder="Preferred times, questions, or what you want help with."
                    value={form.note}
                    onChange={update('note')}
                    disabled={status === 'loading'}
                  />
                </label>

                <label className="waitlist__hp" aria-hidden="true">
                  Company
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update('website')}
                  />
                </label>

                {invalid && (
                  <p className="waitlist__hint waitlist__hint--error">{invalid}</p>
                )}
                {status === 'error' && (
                  <p className="waitlist__hint waitlist__hint--error">
                    Something went wrong — please email elevatecryowellness@gmail.com directly.
                  </p>
                )}

                <button
                  type="submit"
                  className="waitlist__btn btn-primary"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="waitlist__spinner" aria-hidden="true" />
                  ) : 'Request a Call'}
                </button>

                <p className="waitlist__trust">We will only use this to call you back. No spam.</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
