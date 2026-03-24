import { useNavigate } from 'react-router-dom'
import './SimplePages.css'

export default function Contact() {
  const navigate = useNavigate()
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Get in Touch</span>
          <h1 className="simple-page__title fade-up-1">We'd love to hear from you.</h1>
          <p className="simple-page__sub fade-up-2">
            Have a question about membership, modalities, or your first visit?
            Reach out — we're here to help.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-wrap__title">Send a message</h2>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); navigate('/#waitlist') }}>
              <div className="auth-form__row-2">
                <div className="auth-form__field">
                  <label className="auth-form__label">First Name</label>
                  <input type="text" className="auth-form__input" placeholder="First" />
                </div>
                <div className="auth-form__field">
                  <label className="auth-form__label">Last Name</label>
                  <input type="text" className="auth-form__input" placeholder="Last" />
                </div>
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Email Address</label>
                <input type="email" className="auth-form__input" placeholder="you@example.com" />
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Subject</label>
                <select className="auth-form__input">
                  <option value="">Select a topic...</option>
                  <option>Membership Inquiry</option>
                  <option>Booking Help</option>
                  <option>Modality Questions</option>
                  <option>Health &amp; Contraindications</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div className="auth-form__field">
                <label className="auth-form__label">Message</label>
                <textarea className="auth-form__input auth-form__textarea" rows="5" placeholder="Tell us how we can help..."></textarea>
              </div>
              <button type="submit" className="btn-primary auth-form__submit">Send Message</button>
            </form>
          </div>

          {/* Info */}
          <div className="contact-info">
            <div className="contact-info__block">
              <h3 className="contact-info__heading">Visit Us</h3>
              <address className="contact-info__address">
                8019 Crile Road<br />
                Concord, OH 44077
              </address>
              <a
                href="https://maps.google.com/?q=8019+Crile+Road+Concord+OH+44077"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__directions"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                Get Directions
              </a>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Hours of Operation</h3>
              <div className="contact-info__hours">
                <div className="contact-info__hours-row">
                  <span>Monday – Friday</span>
                  <span>7:00 AM – 8:00 PM</span>
                </div>
                <div className="contact-info__hours-row">
                  <span>Saturday</span>
                  <span>8:00 AM – 6:00 PM</span>
                </div>
                <div className="contact-info__hours-row">
                  <span>Sunday</span>
                  <span>9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__heading">Direct Contact</h3>
              <div className="contact-info__links">
                <a href="tel:+14405550100" className="contact-info__link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  (440) 555-0100
                </a>
                <a href="mailto:hello@elevatecryo.com" className="contact-info__link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  hello@elevatecryo.com
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
