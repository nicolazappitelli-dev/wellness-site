import { CLOVER_BOOKING_URL, CLOVER_LOGIN_URL } from '../lib/clover'
import { SITE_PHONE, SITE_PHONE_HREF } from '../lib/site'
import './SimplePages.css'
import './Booking.css'

export default function Booking() {
  return (
    <main className="booking-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Call to join. Members book here.</h1>
          <p className="simple-page__sub fade-up-2">
            The Clover calendar has no prices because sessions are included with membership.
            New clients call the studio. After you are set up, sign in and pick a time.
            Walk-ins stay $25 + tax at the door.
          </p>
          <div className="hero__ctas fade-up-3" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn-primary" href={SITE_PHONE_HREF}>Call {SITE_PHONE}</a>
            <a className="btn-secondary" href={CLOVER_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Member sign in
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="clover-book">
          <div className="clover-book__bar">
            <p>Member calendar — sessions show $0 because they are included, not free drop-ins.</p>
            <a className="btn-secondary" href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Open in Clover
            </a>
          </div>
          <iframe
            className="clover-book__frame"
            title="Elevate Cryo Concord booking"
            src={CLOVER_BOOKING_URL}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  )
}
