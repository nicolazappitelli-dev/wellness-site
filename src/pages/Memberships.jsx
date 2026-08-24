import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import './Memberships.css'

const plans = [
  {
    name: 'Everyday Wellness',
    sessions: '1 modality a day · every day',
    founding: '149.99',
    standard: '169.99',
    desc: 'One modality session per day — ideal for consistent recovery.',
    includes: [
      '1 modality session per day',
      'Access to all four modalities',
      'We will call you to get set up and scheduled',
      'Founding rate locked for the first 50 members',
    ],
  },
  {
    name: 'Unlimited',
    sessions: 'All modalities · unlimited access',
    founding: '229.99',
    standard: '249.99',
    desc: 'Stack every modality in a single visit — maximum restoration.',
    includes: [
      'Unlimited modality access',
      'Use all four modalities in one visit',
      'We will call you to get set up and scheduled',
      'Founding rate locked for the first 50 members',
    ],
    featured: true,
  },
]

const faqs = [
  {
    q: 'What is the walk-in rate?',
    a: 'Walk-ins are $35 + tax per modality. No membership required — first-come, first-served based on availability.',
  },
  {
    q: 'What is Everyday Wellness?',
    a: 'Everyday Wellness includes 1 modality a day, every day. Founding members (first 50) pay $149.99 + tax per month. After the first 50, the rate is $169.99 + tax per month.',
  },
  {
    q: 'What is Unlimited?',
    a: 'Unlimited includes all modalities with unlimited access. Founding members (first 50) pay $229.99 + tax per month. After the first 50, the rate is $249.99 + tax per month.',
  },
  {
    q: 'How do founding memberships work?',
    a: 'The first 50 members lock in founding rates: $149.99/mo for Everyday Wellness and $229.99/mo for Unlimited (plus tax). After the first 50, standard rates apply.',
  },
  {
    q: 'Can I pause or cancel my membership?',
    a: 'Yes. Members may pause or cancel at any time with no cancellation fees. See Policies for full terms.',
  },
  {
    q: 'Where are you located?',
    a: '8019 Crile Road, Concord Township, OH 44077 — next to Discount Drug Mart.',
  },
]

export default function Memberships() {
  return (
    <main className="memberships-page">
      <section className="memb-hero">
        <div className="container">
          <span className="section-label fade-up">Membership Plans</span>
          <h1 className="memb-hero__title fade-up-1">
            Simple pricing.<br />
            <em>Founding rates locked in.</em>
          </h1>
          <p className="memb-hero__sub fade-up-2">
            Choose Everyday Wellness or Unlimited. The first 50 members lock in founding rates before standard pricing begins.
          </p>
        </div>
      </section>

      <div className="memb-notice">
        <div className="container">
          <div className="memb-notice__inner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            <p>
              <strong>Walk-in:</strong> $35 + tax per modality — no membership required.
            </p>
          </div>
        </div>
      </div>

      <section className="section memb-plans">
        <div className="container">
          <div className="memb-plans__grid">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 80}>
                <div className={`memb-plan${plan.featured ? ' memb-plan--featured' : ''}`}>
                  {plan.featured && <div className="memb-plan__badge">Most Popular</div>}
                  <div className="memb-plan__name">{plan.name}</div>
                  <div className="memb-plan__sessions">{plan.sessions}</div>
                  <div className="memb-plan__price">
                    <span className="memb-plan__amount">${plan.founding}</span>
                    <span className="memb-plan__billing">+ tax / mo</span>
                  </div>
                  <p className="memb-plan__tagline">Founding members · first 50</p>
                  <p className="memb-plan__standard">
                    After first 50: <strong>${plan.standard}</strong> + tax / mo
                  </p>
                  <div className="memb-plan__divider" />
                  <p className="memb-plan__desc">{plan.desc}</p>
                  <ul className="memb-plan__includes">
                    {plan.includes.map(item => (
                      <li key={item} className="memb-plan__include-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link to="/#inquiry" className={plan.featured ? 'btn-primary' : 'btn-secondary'}>
                    Request a Call
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="memb-plans__note">
            All prices + tax. Founding rates apply to the first 50 members only.
            See <Link to="/policies">Policies</Link> for full membership terms.
          </p>
        </div>
      </section>

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

      <section className="memb-cta-section">
        <div className="container">
          <Reveal>
            <div className="memb-cta__inner">
              <h2 className="memb-cta__title">Lock in founding rates.</h2>
              <p className="memb-cta__sub">
                First 50 members get Everyday Wellness at $149.99/mo or Unlimited at $229.99/mo (+ tax).
              </p>
              <div className="memb-cta__actions">
                <Link to="/#inquiry" className="btn-primary">Request a Call</Link>
                <Link to="/contact" className="btn-secondary">Contact Us</Link>
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
