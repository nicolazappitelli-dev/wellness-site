import { useState } from 'react'
import { Link } from 'react-router-dom'
import { submitLead } from '../lib/submitLead'
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_HREF, SITE_MAPS_HREF } from '../lib/site'
import './SimplePages.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TOPICS = [
  'Membership Inquiry',
  'Booking Help',
  'Modality Questions',
  'Health & Contraindications',
  'General Inquiry',
]

export default function Contact() {
  const [form, setForm] = useState({
    first: '',
    last: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  })
  const [status, setStatus] = useState('idle')
  const [invalid, setInvalid] = useState('')

  function update(field) {
    return e => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      setInvalid('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const email = form.email.trim()
    const message = form.message.trim()
    if (!form.first.trim() || !form.last.trim()) {
      setInvalid('Please enter your first and last name.')
      return
    }
    if (!email || !EMAIL_RE.test(email)) {
      setInvalid('Please enter a valid email address.')
      return
    }
    if (!form.subject) {
      setInvalid('Please choose a topic.')
      return
    }
    if (message.length < 8) {
      setInvalid('Please include a short message.')
      return
    }

    setStatus('loading')
    try {
      await submitLead({
        form: 'Contact',
        name: `${form.first.trim()} ${form.last.trim()}`,
        first_name: form.first.trim(),
        last_name: form.last.trim(),
        email,
        subject: form.subject,
        message,
        website: form.website,
        _subject: `Website inquiry: ${form.subject}`,
      })
      setStatus('success')
    } catch (err) {
      setStatus(err.code === 'activation' ? 'activation' : 'error')
    }
  }

  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Get in Touch</span>
          <h1 className="simple-page__title fade-up-1">We&apos;d love to hear from you.</h1>
          <p className="simple-page__sub fade-up-2">
            Have a question about membership, modalities, or your first visit?
            Reach out — we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-form-wrap">
            <h2 className="contact-form-wrap__title">Send a message</h2>
            {status === 'success' ? (
              <div className="form-done">
                <div className="form-done__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <p className="form-done__msg">Message sent. We typically reply within one business day.</p>
                <Link to="/#waitlist" className="btn-secondary">Join the Waitlist</Link>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-form__row-2">
                  <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="contact-first">First Name</label>
                    <input id="contact-first" type="text" className="auth-form__input" placeholder="First" value={form.first} onChange={update('first')} autoComplete="given-name" required />
                  </div>
                  <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="contact-last">Last Name</label>
                    <input id="contact-last" type="text" className="auth-form__input" placeholder="Last" value={form.last} onChange={update('last')} autoComplete="family-name" required />
                  </div>
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label" htmlFor="contact-email">Email Address</label>
                  <input id="contact-email" type="email" className="auth-form__input" placeholder="you@example.com" value={form.email} onChange={update('email')} autoComplete="email" required />
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label" htmlFor="contact-subject">Subject</label>
                  <select id="contact-subject" className="auth-form__input" value={form.subject} onChange={update('subject')} required>
                    <option value="">Select a topic...</option>
                    {TOPICS.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label" htmlFor="contact-message">Message</label>
                  <textarea id="contact-message" className="auth-form__input auth-form__textarea" rows="5" placeholder="Tell us how we can help..." value={form.message} onChange={update('message')} required />
                </div>
                <label className="waitlist__hp" aria-hidden="true">
                  Company
                  <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
                </label>
                {invalid && <p className="form-hint form-hint--error">{invalid}</p>}
                {status === 'error' && (
                  <p className="form-hint form-hint--error">
                    Something went wrong. Email us at {SITE_EMAIL} or try again.
                  </p>
                )}
                {status === 'activation' && (
                  <p className="form-hint form-hint--error">
                    One more step: confirm the first FormSubmit email in {SITE_EMAIL} so messages can arrive.
                  </p>
                )}
                <button type="submit" className="btn-primary auth-form__submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          <div className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__heading">Visit Us</h3>
              <address className="contact-info__address">
                8019 Crile Road<br />
                Concord, OH 44077
              </address>
              <a href={SITE_MAPS_HREF} target="_blank" rel="noopener noreferrer" className="contact-info__directions">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                Get Directions
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Hours of Operation</h3>
              <div className="contact-info__hours">
                <div className="contact-info__hours-row">
                  <span>Hours</span>
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Direct Contact</h3>
              <div className="contact-info__links">
                <a href={SITE_PHONE_HREF} className="contact-info__link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  {SITE_PHONE}
                </a>
                <a href={`mailto:${SITE_EMAIL}`} className="contact-info__link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {SITE_EMAIL}
                </a>
              </div>
            </div>

            <div className="contact-info__note">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
              We typically respond to all inquiries within one business day.
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
