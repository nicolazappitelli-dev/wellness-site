import { useState, useEffect, useRef } from 'react'
import { submitLead } from '../lib/submitLead'
import './Waitlist.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error | activation
  const [invalid, setInvalid] = useState(false)
  const inputRef = useRef(null)
  const doneRef = useRef(null)

  useEffect(() => {
    if (window.location.hash === '#waitlist') {
      const timer = setTimeout(() => inputRef.current?.focus(), 450)
      return () => clearTimeout(timer)
    }
  }, [])

  const done = status === 'success'
  useEffect(() => {
    if (done && doneRef.current) {
      doneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [done])

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = email.trim()

    if (!trimmed || !EMAIL_RE.test(trimmed)) {
      setInvalid(true)
      return
    }

    setInvalid(false)
    setStatus('loading')

    try {
      await submitLead({
        form: 'Waitlist',
        email: trimmed,
        website,
        _subject: 'New waitlist signup — Elevate Cryo & Wellness',
      })
      setStatus('success')
    } catch (err) {
      setStatus(err.code === 'activation' ? 'activation' : 'error')
    }
  }

  return (
    <section id="waitlist" className="waitlist">
      <div className="waitlist__glow" aria-hidden="true" />
      <div className="container">
        <div className="waitlist__inner">

          <div className="waitlist__copy">
            <span className="section-label">Founding Members</span>
            <h2 className="waitlist__title">Join the waitlist.</h2>
            <p className="waitlist__sub">
              Be first through our doors. Founding members lock in exclusive pricing before we open.
            </p>
          </div>

          <div className="waitlist__form-wrap">
            {done ? (
              <div className="waitlist__done" ref={doneRef}>
                <div className="waitlist__done-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="waitlist__done-msg">
                  You&apos;re on the list. We&apos;ll reach out soon.
                </p>
              </div>
            ) : (
              <form className="waitlist__form" onSubmit={handleSubmit} noValidate>
                <div className={`waitlist__field${invalid ? ' waitlist__field--error' : ''}`}>
                  <input
                    ref={inputRef}
                    type="email"
                    inputMode="email"
                    className="waitlist__input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setInvalid(false) }}
                    disabled={status === 'loading'}
                    autoComplete="email"
                    aria-label="Email address"
                    required
                  />
                  <label className="waitlist__hp" aria-hidden="true">
                    Company
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    className="waitlist__btn btn-primary"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      <span className="waitlist__spinner" aria-hidden="true" />
                    ) : 'Join Waitlist'}
                  </button>
                </div>

                {invalid && (
                  <p className="waitlist__hint waitlist__hint--error">
                    Please enter a valid email address.
                  </p>
                )}
                {status === 'error' && (
                  <p className="waitlist__hint waitlist__hint--error">
                    Something went wrong — please try again, or email us directly.
                  </p>
                )}
                {status === 'activation' && (
                  <p className="waitlist__hint waitlist__hint--error">
                    One more step: check elevatecryowellness@gmail.com and confirm the first form email so signups can arrive.
                  </p>
                )}

                <p className="waitlist__trust">No spam. Unsubscribe anytime.</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
