import { CLOVER_BOOKING_URL, hasCloverBooking } from '../lib/clover'
import './SimplePages.css'
import './Booking.css'

export default function Booking() {
  return (
    <main className="booking-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Book a Session</span>
          <h1 className="simple-page__title fade-up-1">Reserve your session.</h1>
          <p className="simple-page__sub fade-up-2">
            Scheduling and payment run through Clover — the same system the studio uses at the front desk.
            Walk-ins are still welcome at $25 + tax, first-come, first-served.
          </p>
        </div>
      </div>

      <div className="container">
        {hasCloverBooking() ? (
          <div className="clover-book">
            <div className="clover-book__bar">
              <p>Booking calendar is powered by Clover.</p>
              <a className="btn-secondary" href={CLOVER_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                Open booking in a new tab
              </a>
            </div>
            <iframe
              className="clover-book__frame"
              title="Clover online booking"
              src={CLOVER_BOOKING_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="bk-locked">
            <div className="bk-locked__bg" aria-hidden="true">
              <div className="bk-locked__fake-days">
                {['Tue 25', 'Wed 26', 'Thu 27', 'Fri 28'].map(d => (
                  <div key={d} className="bk-locked__fake-day">{d}</div>
                ))}
              </div>
              <div className="bk-locked__fake-grid">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`bk-locked__fake-slot${[1, 5, 8, 12].includes(i) ? ' --full' : ''}`} />
                ))}
              </div>
            </div>
            <div className="bk-locked__gate">
              <div className="bk-locked__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
              </div>
              <h2 className="bk-locked__title">Connect the Clover booking page.</h2>
              <p className="bk-locked__sub">
                In Clover (or the booking app on Clover, like Appointments or BookedBy), copy the
                <strong> public online booking link</strong> — not the dashboard login — and add it as
                <code> VITE_CLOVER_BOOKING_URL</code> in Vercel.
              </p>
              <p className="bk-locked__walkin">
                Walk-ins welcome — <strong>$25 + tax per modality</strong>.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
