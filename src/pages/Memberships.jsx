import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { OFFERS } from '../lib/catalog'
import './Memberships.css'

const { walkIn, essential, everyday, unlimited, weekPass, addOn } = OFFERS

const faqs = [
  {
    q: 'What is the walk-in rate?',
    a: `Walk-ins are $${walkIn.price} + tax per modality. No membership required — first-come, first-served based on availability.`,
  },
  {
    q: 'What is Elevate Essential?',
    a: `Elevate Essential is $${essential.price} + tax per month and includes 1 modality a week.`,
  },
  {
    q: 'What is Everyday Wellness?',
    a: `Everyday Wellness includes 1 modality a day, every day. Founding members (the first 50) pay $${everyday.founding} + tax per month. After the first 50, the rate is $${everyday.standard} + tax per month.`,
  },
  {
    q: 'What is Unlimited?',
    a: `Unlimited includes all modalities with unlimited access. Founding members (the first 50) pay $${unlimited.founding} + tax per month. After the first 50, the rate is $${unlimited.standard} + tax per month.`,
  },
  {
    q: 'How do founding memberships work?',
    a: `The first 50 members lock in founding rates: $${everyday.founding}/mo for Everyday Wellness and $${unlimited.founding}/mo for Unlimited, plus tax. After the first 50, those plans are $${everyday.standard}/mo and $${unlimited.standard}/mo, plus tax. Elevate Essential stays $${essential.price}/mo plus tax.`,
  },
  {
    q: 'What is the Unlimited Week Pass?',
    a: `The Unlimited Week Pass is $${weekPass.price} for 7 days of unlimited access.`,
  },
  {
    q: 'Can I add another modality the same day?',
    a: `Members on Everyday Wellness or Elevate Essential can add an additional modality the same day for $${addOn.price}.`,
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

function PriceBlock({ amount, unit, tax }) {
  return (
    <div className="price-block">
      <p className="price-block__amount">${amount}</p>
      <p className="price-block__unit">{unit}</p>
      <span className="price-block__rule" aria-hidden="true" />
      {tax && <p className="price-block__tax">+ Tax</p>}
    </div>
  )
}

function FoundingPrice({ offer }) {
  return (
    <div className="price-card__rates">
      <div className="price-founding">
        <p className="price-founding__kicker">First 50 members</p>
        <p className="price-founding__amount">${offer.founding}</p>
        <p className="price-founding__unit">{offer.unit} + tax</p>
      </div>
      <p className="price-after">
        <span className="price-after__amount">${offer.standard}</span>
        {offer.unit} + tax after the first 50
      </p>
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
            <em>Founding rates for the first 50.</em>
          </h1>
          <p className="memb-hero__sub fade-up-2">
            Elevate Essential, Everyday Wellness, and Unlimited. Founding rates on Everyday Wellness and Unlimited are for the first 50 members.
          </p>
        </div>
      </section>

      <section className="section memb-plans" aria-label="Pricing">
        <div className="container">
          <div className="memb-plans__grid">
            <Reveal>
              <article className="price-card price-card--single">
                <h2 className="price-card__name">{essential.name}</h2>
                <span className="price-card__rule" aria-hidden="true" />
                <p className="price-card__sessions">{essential.summary}</p>
                <PriceBlock amount={essential.price} unit={essential.unit} tax={essential.tax} />
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="price-card price-card--founding">
                <p className="price-card__badge">Founding rate</p>
                <h2 className="price-card__name">{everyday.name}</h2>
                <p className="price-card__sessions">{everyday.summary}</p>
                <FoundingPrice offer={everyday} />
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="price-card price-card--founding">
                <p className="price-card__badge">Founding rate</p>
                <h2 className="price-card__name">{unlimited.name}</h2>
                <p className="price-card__sessions">{unlimited.summary}</p>
                <FoundingPrice offer={unlimited} />
              </article>
            </Reveal>
          </div>

          <div className="memb-plans__extras">
            <Reveal>
              <article className="price-card price-card--single">
                <h2 className="price-card__name">{walkIn.name}</h2>
                <span className="price-card__rule" aria-hidden="true" />
                <p className="price-card__sessions">{walkIn.summary}</p>
                <PriceBlock amount={walkIn.price} unit={walkIn.unit} tax={walkIn.tax} />
              </article>
            </Reveal>

            <Reveal delay={80}>
              <article className="price-card price-card--single">
                <h2 className="price-card__name">{weekPass.name}</h2>
                <span className="price-card__rule" aria-hidden="true" />
                <p className="price-card__sessions">{weekPass.summary}</p>
                <PriceBlock amount={weekPass.price} unit={weekPass.unit} tax={weekPass.tax} />
              </article>
            </Reveal>

            <Reveal delay={160}>
              <article className="price-card price-card--single">
                <h2 className="price-card__name">{addOn.name}</h2>
                <span className="price-card__rule" aria-hidden="true" />
                <p className="price-card__sessions">{addOn.summary}</p>
                <PriceBlock amount={addOn.price} unit={addOn.unit} tax={addOn.tax} />
                <p className="price-card__note">{addOn.note}</p>
              </article>
            </Reveal>
          </div>

          <div className="memb-plans__cta">
            <Link to="/#inquiry" className="btn-primary">Request a Call</Link>
          </div>
          <p className="memb-plans__note">
            Walk-ins and monthly memberships are plus tax. Founding rates on Everyday Wellness and Unlimited
            apply to the first 50 members. See <Link to="/policies">Policies</Link> for full membership terms.
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
                {`The first 50 members get Everyday Wellness at $${everyday.founding}/mo or Unlimited at $${unlimited.founding}/mo, plus tax.`}
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
