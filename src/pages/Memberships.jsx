import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import './Memberships.css'

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

function PriceBlock({ label, amount, unit }) {
  return (
    <div className="price-block">
      {label && <p className="price-block__label">{label}</p>}
      <p className="price-block__amount">${amount}</p>
      <p className="price-block__unit">{unit}</p>
      <span className="price-block__rule" aria-hidden="true" />
      <p className="price-block__tax">+ Tax</p>
    </div>
  )
}

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
            Walk-in, Everyday Wellness, or Unlimited. The first 50 members lock in founding rates before standard pricing begins.
          </p>
        </div>
      </section>

      <section className="section memb-plans" aria-label="Pricing">
        <div className="container">
          <div className="memb-plans__grid">
            <Reveal>
              <article className="price-card price-card--walkin">
                <h2 className="price-card__name">Walk-In</h2>
                <span className="price-card__rule" aria-hidden="true" />
                <PriceBlock amount="35" unit="Per modality" />
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="price-card price-card--featured">
                <p className="price-card__badge">Most Popular</p>
                <h2 className="price-card__name">Everyday Wellness</h2>
                <p className="price-card__sessions">1 modality a day • every day</p>
                <div className="price-card__split">
                  <PriceBlock
                    label="First 50 members (founding members)"
                    amount="149.99"
                    unit="Per month"
                  />
                  <span className="price-card__split-rule" aria-hidden="true" />
                  <PriceBlock
                    label="After first 50 members"
                    amount="169.99"
                    unit="Per month"
                  />
                </div>
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="price-card">
                <h2 className="price-card__name">Unlimited</h2>
                <p className="price-card__sessions">All modalities • unlimited access</p>
                <div className="price-card__split">
                  <PriceBlock
                    label="First 50 members (founding members)"
                    amount="229.99"
                    unit="Per month"
                  />
                  <span className="price-card__split-rule" aria-hidden="true" />
                  <PriceBlock
                    label="After first 50 members"
                    amount="249.99"
                    unit="Per month"
                  />
                </div>
              </article>
            </Reveal>
          </div>

          <div className="memb-plans__cta">
            <Link to="/#inquiry" className="btn-primary">Request a Call</Link>
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
