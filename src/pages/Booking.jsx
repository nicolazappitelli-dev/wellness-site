import { Link } from 'react-router-dom'
import './SimplePages.css'
import './Booking.css'

export default function Booking() {
  return (
    <main className="booking-page">

      {/* Page hero */}
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Booking opens soon.</h1>
          <p className="simple-page__sub fade-up-2">
            Online session booking launches when we open. Join the waitlist to get
            first access and secure founding member pricing.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="bk-locked">
          {/* Blurred fake calendar behind the gate */}
          <div className="bk-locked__bg" aria-hidden="true">
            <div className="bk-locked__fake-days">
              {['Tue 25', 'Wed 26', 'Thu 27', 'Fri 28'].map(d => (
                <div key={d} className="bk-locked__fake-day">{d}</div>
              ))}
            </div>
            <div className="bk-locked__fake-grid">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`bk-locked__fake-slot${
                    [1,5,8,12,16].includes(i) ? ' --full' :
                    [3,10,17].includes(i)     ? ' --partial' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Gate card */}
          <div className="bk-locked__gate">
            <div className="bk-locked__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
                <path d="M9 16l2 2 4-4"/>
              </svg>
            </div>
            <h2 className="bk-locked__title">Booking opens Summer 2026.</h2>
            <p className="bk-locked__sub">
              Members will be able to reserve sessions up to 4 days ahead —
              guaranteed time, guaranteed modality. Join the waitlist for first access.
            </p>
            <div className="bk-locked__ctas">
              <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
              <Link to="/modalities" className="btn-secondary">Explore Modalities</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
