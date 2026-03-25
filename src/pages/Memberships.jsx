import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import './Memberships.css'

const faqs = [
  {
    q: 'When are you opening?',
    a: "We're targeting Summer 2026 in Concord, Ohio. Join the waitlist to be the first to know and lock in founding member pricing before we open.",
  },
  {
    q: 'What does founding membership include?',
    a: 'Founding members receive priority access when we open, exclusive pricing locked in before public rates are announced, and early booking privileges across all four recovery modalities.',
  },
  {
    q: 'How do I secure founding member status?',
    a: 'Simply join the waitlist. When memberships open, waitlist members will be the first notified and will have a priority window to activate their founding membership.',
  },
  {
    q: 'What modalities will be available?',
    a: 'We offer four modalities: whole-body Cryotherapy, Red Light Bed Therapy, Infrared Sauna, and Compression Therapy. Each is individually powerful — together they form a complete recovery protocol.',
  },
  {
    q: 'Can I pause or cancel my membership?',
    a: 'Yes. Members will be able to pause or cancel at any time with no cancellation fees. Full membership terms will be available when we open.',
  },
  {
    q: 'Where are you located?',
    a: 'We are coming to 8019 Crile Road, Concord, OH 44077. Opening Summer 2026.',
  },
]

export default function Memberships() {
  return (
    <main className="memberships-page">
      {/* Hero */}
      <section className="memb-hero">
        <div className="container">
          <span className="section-label fade-up">Membership Plans</span>
          <h1 className="memb-hero__title fade-up-1">
            Founding Memberships<br />
            <em>Coming Soon.</em>
          </h1>
          <p className="memb-hero__sub fade-up-2">
            Be among the first to join Elevate Cryo &amp; Wellness. Founding members
            lock in exclusive pricing before we open our doors this Summer 2026.
          </p>
        </div>
      </section>

      {/* Founding Membership Card */}
      <section className="section memb-plans">
        <div className="container">
          <Reveal>
            <div className="founding-memb-card">
              <div className="founding-memb-card__eyebrow">Limited Spots Available</div>
              <h2 className="founding-memb-card__title">Founding Memberships Coming Soon</h2>
              <p className="founding-memb-card__body">
                Be one of the first to experience Elevate Cryo &amp; Wellness and lock in exclusive rates before we open.
              </p>
              <ul className="founding-memb-card__perks">
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  Priority access when we open
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  Exclusive founding member pricing
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  First to know about our opening date
                </li>
                <li>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  Full access to all four recovery modalities
                </li>
              </ul>
              <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section memb-faq">
        <div className="container">
          <div className="memb-faq__inner">
            <Reveal>
              <div>
                <span className="section-label">Questions</span>
                <h2 className="section-title">Membership FAQ.</h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="memb-faq__list">
                {faqs.map((f, i) => (
                  <FaqItem key={i} q={f.q} a={f.a} />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="memb-cta-section">
        <div className="container">
          <Reveal>
            <div className="memb-cta__inner">
              <h2 className="memb-cta__title">Be among the first.</h2>
              <p className="memb-cta__sub">Join the waitlist for priority access and founding member pricing.</p>
              <div className="memb-cta__actions">
                <Link to="/#waitlist" className="btn-primary">Join the Waitlist</Link>
                <Link to="/contact" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}>Contact Us</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        {q}
        <span className="faq-item__icon">{open ? '−' : '+'}</span>
      </button>
      <div className="faq-item__a">
        <p>{a}</p>
      </div>
    </div>
  )
}
