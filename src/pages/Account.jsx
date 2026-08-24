import { Link } from 'react-router-dom'
import { CLOVER_BOOKING_URL, CLOVER_LOGIN_URL } from '../lib/clover'
import './SimplePages.css'
import './Account.css'

export default function Account() {
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Member Portal</span>
          <h1 className="simple-page__title fade-up-1">Your account lives in Clover.</h1>
          <p className="simple-page__sub fade-up-2">
            Once the studio activates your membership, sign in on Clover to book cryo, red light,
            sauna, and compression. Sessions show $0 because they are included — not because they are free drop-ins.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="booking-gate">
          <div className="booking-gate__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <h2 className="booking-gate__title">Already a member?</h2>
          <p className="booking-gate__desc">
            Use the same Clover login the studio set up for you. That is the only account you need.
          </p>
          <div className="booking-gate__actions">
            <a className="btn-primary" href={CLOVER_LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Sign in to Clover
            </a>
            <a className="btn-secondary" href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Book a session
            </a>
          </div>
          <p className="booking-gate__walkin-note">
            Not a member yet? <Link to="/memberships">See plans</Link>, then{' '}
            <Link to="/contact">contact the studio</Link> or <Link to="/#waitlist">join the waitlist</Link>.
            Walk-ins are $25 + tax, first-come, first-served.
          </p>
        </div>
      </div>
    </main>
  )
}
