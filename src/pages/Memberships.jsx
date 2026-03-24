import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import './Memberships.css'

const plans = [
  {
    name: 'Essential',
    price: '$99',
    billing: '+ tax / month',
    tagline: 'Focused recovery, every day.',
    sessions: '1 modality per day',
    desc: 'The Essential plan gives you daily access to one modality of your choice. Whether you rotate through our offerings or anchor to a single treatment, this plan delivers consistent, meaningful recovery for a disciplined routine.',
    includes: [
      'One modality session per calendar day',
      'Choose from Cryo, Red Light, Sauna, or Compression',
      'Full member portal access for online scheduling',
      'Advance online booking up to 4 days ahead',
      'Cancel or pause anytime',
    ],
    cta: 'Start with Essential',
    featured: false,
  },
  {
    name: 'Unlimited',
    price: '$129',
    billing: '+ tax / month',
    tagline: 'Everything, every visit.',
    sessions: 'Unlimited modalities per day',
    desc: 'The Unlimited plan removes all limits. Stack every modality in a single visit, building the most comprehensive recovery protocol available. Preferred by athletes, high-performers, and anyone committed to peak restoration.',
    includes: [
      'Unlimited modality sessions per calendar day',
      'Stack Cryo, Red Light, Sauna, and Compression in one visit',
      'Full member portal access for online scheduling',
      'Advance online booking up to 4 days ahead',
      'Cancel or pause anytime',
    ],
    cta: 'Start with Unlimited',
    featured: true,
  },
]

const comparisons = [
  { feature: 'Daily sessions', essential: '1 modality', unlimited: 'Unlimited' },
  { feature: 'Cryotherapy', essential: true, unlimited: true },
  { feature: 'Red Light Bed Therapy', essential: true, unlimited: true },
  { feature: 'Infrared Sauna', essential: true, unlimited: true },
  { feature: 'Compression Therapy', essential: true, unlimited: true },
  { feature: 'Advance booking window', essential: '4 days', unlimited: '4 days' },
  { feature: 'Online scheduling portal', essential: true, unlimited: true },
  { feature: 'Cancel / pause anytime', essential: true, unlimited: true },
]

const faqs = [
  {
    q: 'Can I visit without a membership?',
    a: 'Yes. Walk-ins are always welcome at $25 + tax per modality — no membership, no booking, no commitment. Simply arrive during operating hours and pay on the day. Membership is only required for online booking.',
  },
  {
    q: 'Is membership required to book online?',
    a: 'Yes. Online scheduling through the member portal is exclusive to active members. If you\'d prefer not to commit to a plan, walk-ins are available at $25 + tax per modality on a first-come, first-served basis.',
  },
  {
    q: 'How far in advance can I book?',
    a: 'Members can book sessions up to 4 days in advance through the portal. The booking window rolls forward daily, so there are always slots available within the next 4 days.',
  },
  {
    q: 'When does my billing cycle start?',
    a: 'Your billing cycle begins on the date you activate your membership and renews monthly on that same date.',
  },
  {
    q: 'Can I switch plans mid-cycle?',
    a: 'Yes. You may upgrade or downgrade your plan at any time. Upgrades take effect immediately; downgrades apply at the start of your next billing cycle.',
  },
  {
    q: 'Can I pause or cancel my membership?',
    a: 'Absolutely. Members may pause their membership for up to 60 days or cancel at any time with no cancellation fees. Cancellations take effect at the end of the current billing period.',
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
            Commit to your recovery.<br />
            <em>We'll handle the rest.</em>
          </h1>
          <p className="memb-hero__sub fade-up-2">
            Members get unlimited online booking, up to 4 days ahead. Prefer to drop in?
            Walk-ins are always welcome at $25 + tax per modality — no commitment required.
          </p>
        </div>
      </section>

      {/* Notice Banner */}
      <section className="memb-notice">
        <div className="container">
          <div className="memb-notice__inner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>
            <div>
              <strong>Membership unlocks online booking</strong> — reserve sessions up to 4 days ahead, guaranteed.
              Walk-ins are always welcome at $25 + tax per modality, no account needed.
              <Link to="/#waitlist" className="memb-notice__link"> Join the waitlist</Link> to get started.
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section memb-plans">
        <div className="container">
          <div className="memb-plans__grid">
            {plans.map((p, idx) => (
              <Reveal key={p.name} delay={idx * 120}>
              <div className={`memb-plan${p.featured ? ' memb-plan--featured' : ''}`}>
                {p.featured && <div className="memb-plan__badge">Most Popular</div>}

                <div className="memb-plan__header">
                  <div className="memb-plan__name">{p.name}</div>
                  <div className="memb-plan__price">
                    <span className="memb-plan__amount">{p.price}</span>
                    <span className="memb-plan__billing">{p.billing}</span>
                  </div>
                  <div className="memb-plan__sessions">{p.sessions}</div>
                  <p className="memb-plan__tagline">{p.tagline}</p>
                </div>

                <div className="memb-plan__divider" />

                <p className="memb-plan__desc">{p.desc}</p>

                <ul className="memb-plan__includes">
                  {p.includes.map((item, i) => (
                    <li key={i} className="memb-plan__include-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link to="/#waitlist" className={p.featured ? 'btn-primary' : 'btn-secondary'} style={{ marginTop: 'auto', display: 'inline-flex', justifyContent: 'center' }}>
                  {p.cta}
                </Link>
              </div>
              </Reveal>
            ))}
          </div>
          <p className="memb-plans__note">
            All memberships require account creation and are subject to our <Link to="/policies">Terms & Policies</Link>.
            Membership rates are subject to applicable sales tax.
          </p>

          {/* Walk-In Info Box */}
          <Reveal delay={100}>
            <div className="walkin-info-box">
              <div className="walkin-info-box__eyebrow">No commitment needed</div>
              <div className="walkin-info-box__main">
                <div className="walkin-info-box__text">
                  <strong>Walk-ins welcome — $25 + tax per modality.</strong>
                  <span> No membership, no booking, no account required. Just show up during operating hours. First-come, first-served.</span>
                </div>
                <Link to="/contact" className="walkin-info-box__link">
                  Check hours
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section memb-compare">
        <div className="container">
          <Reveal>
            <span className="section-label">Compare Plans</span>
            <h2 className="section-title">Find the right fit.</h2>
          </Reveal>
          <div className="compare-table">
            <div className="compare-table__header">
              <div className="compare-table__feature-col">Feature</div>
              <div className="compare-table__plan-col compare-table__plan-col--ess">Essential<br /><span>$99 / mo</span></div>
              <div className="compare-table__plan-col compare-table__plan-col--unl">Unlimited<br /><span>$129 / mo</span></div>
            </div>
            {comparisons.map((row, i) => (
              <div key={i} className="compare-table__row">
                <div className="compare-table__feature">{row.feature}</div>
                <div className="compare-table__cell">
                  {typeof row.essential === 'boolean' ? (
                    row.essential
                      ? <CheckIcon />
                      : <XIcon />
                  ) : row.essential}
                </div>
                <div className="compare-table__cell compare-table__cell--featured">
                  {typeof row.unlimited === 'boolean' ? (
                    row.unlimited
                      ? <CheckIcon featured />
                      : <XIcon />
                  ) : row.unlimited}
                </div>
              </div>
            ))}
          </div>
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
              <h2 className="memb-cta__title">Begin your membership today.</h2>
              <p className="memb-cta__sub">Join Elevate and gain instant access to the most effective recovery modalities available.</p>
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

function CheckIcon({ featured }) {
  return (
    <span className={`check-icon${featured ? ' check-icon--featured' : ''}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
    </span>
  )
}

function XIcon() {
  return (
    <span className="x-icon">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </span>
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
