import { Link } from 'react-router-dom'
import { CLOVER_BOOKING_URL, CLOVER_LOGIN_URL } from '../lib/clover'
import { SITE_PHONE, SITE_PHONE_HREF } from '../lib/site'
import './SimplePages.css'

export default function Account() {
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Members</span>
          <h1 className="simple-page__title fade-up-1">No website account to create.</h1>
          <p className="simple-page__sub fade-up-2">
            Call to start Essential or Unlimited. He sets you up in Clover. After that, this is the
            only login you need — and included sessions show $0 on the calendar.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="booking-gate">
          <div className="booking-gate__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6.06 6.06l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h2 className="booking-gate__title">New here? Call first.</h2>
          <p className="booking-gate__desc">
            Memberships are started on the phone or in person. Already a member? Sign in to Clover and book.
          </p>
          <div className="booking-gate__actions">
            <a className="btn-primary" href={SITE_PHONE_HREF}>Call {SITE_PHONE}</a>
            <a className="btn-secondary" href={CLOVER_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Member sign in
            </a>
          </div>
          <p className="booking-gate__walkin-note">
            <a href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">Open the member calendar</a>
            {' · '}
            <Link to="/memberships">See plans</Link>
            {' · '}
            Walk-ins $25 + tax, no account needed.
          </p>
        </div>
      </div>
    </main>
  )
}
