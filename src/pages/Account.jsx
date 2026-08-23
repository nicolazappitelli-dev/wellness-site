import { Link } from 'react-router-dom'
import './SimplePages.css'

export default function Account() {
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Member Portal</span>
          <h1 className="simple-page__title fade-up-1">The member portal opens with us.</h1>
          <p className="simple-page__sub fade-up-2">
            Accounts, online booking, and membership billing launch when we open.
            Join the waitlist now to lock in founding member pricing.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="booking-gate">
          <div className="booking-gate__icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <h2 className="booking-gate__title">Sign-in is not live yet.</h2>
          <p className="booking-gate__desc">
            When we open, members will create an account, choose Essential or Unlimited,
            and book sessions up to 4 days ahead. Until then, the waitlist is the way in.
          </p>
          <div className="booking-gate__actions">
            <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
            <Link to="/memberships" className="btn-secondary">View Plans</Link>
          </div>
          <p className="booking-gate__walkin-note">
            Walk-ins will also be welcome at $25 + tax per modality — no account required.
          </p>
        </div>
      </div>
    </main>
  )
}
