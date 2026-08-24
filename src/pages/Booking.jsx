import { Link } from 'react-router-dom'
import { CLOVER_BOOKING_URL, CLOVER_LOGIN_URL } from '../lib/clover'
import './SimplePages.css'
import './Booking.css'

export default function Booking() {
  return (
    <main className="booking-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Members book in Clover.</h1>
          <p className="simple-page__sub fade-up-2">
            Cryotherapy, red light, sauna, and compression are $0 on the booking page because they
            are included with membership. Sign in with your Clover account, then pick a time.
            Walk-ins remain $25 + tax at the door.
          </p>
          <div className="hero__ctas fade-up-3" style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn-primary" href={CLOVER_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Member sign in
            </a>
            <a className="btn-secondary" href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Open the calendar
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="clover-book">
          <div className="clover-book__bar">
            <p>Live Clover calendar — members only. If you are not signed in, create or activate a membership first.</p>
            <Link to="/memberships" className="btn-secondary">See memberships</Link>
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
