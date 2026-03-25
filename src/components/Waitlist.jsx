import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Waitlist.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Waitlist() {
  const [email,  setEmail]  = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | duplicate | error
  const [invalid, setInvalid] = useState(false)
  const inputRef = useRef(null)
  const doneRef  = useRef(null)

  // Auto-focus email when user navigates to #waitlist via a CTA
  useEffect(() => {
    if (window.location.hash === '#waitlist') {
      const timer = setTimeout(() => inputRef.current?.focus(), 450)
      return () => clearTimeout(timer)
    }
  }, [])

  // Scroll success/duplicate message into view
  const done = status === 'success' || status === 'duplicate'
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
      const { error } = await supabase
        .from('waitlist')
        .insert({ email: trimmed })

      if (error) {
        // Postgres unique constraint violation
        if (error.code === '23505') {
          setStatus('duplicate')
        } else {
          setStatus('error')
        }
      } else {
        setStatus('success')
      }
    } catch {
      setStatus('error')
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
                  {status === 'success'
                    ? "You're on the list. We'll reach out soon."
                    : "You're already on the list — thank you."}
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
                  />
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
                    Something went wrong — please try again.
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
