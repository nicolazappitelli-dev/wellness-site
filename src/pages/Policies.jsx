import './SimplePages.css'

const sections = [
  {
    title: 'Membership Terms',
    content: [
      { heading: 'Eligibility', text: 'Membership is available to individuals 18 years of age or older. All members must complete a health intake form and acknowledge any applicable health contraindications prior to activating their account.' },
      { heading: 'Minor Clients', text: 'Clients must be at least 16 years of age to use any services at Elevate Cryo & Wellness. Clients under the age of 18 must have a parent or legal guardian present to sign a consent form prior to receiving services. A parent or guardian may be required to remain on-site during the session at the discretion of staff.' },
      { heading: 'Right to Refuse', text: 'Elevate Cryo & Wellness reserves the right to request valid identification and to refuse service if age or consent requirements are not met.' },
      { heading: 'Waiver & Health Screening', text: 'All clients are required to complete a waiver and health screening prior to participation. Certain services may not be suitable for individuals with specific medical conditions.' },
      { heading: 'Billing & Renewal', text: 'Memberships are billed monthly on the activation date and renew automatically. All rates are subject to applicable sales tax. Elevate reserves the right to update pricing with 30 days written notice to members.' },
      { heading: 'Cancellation', text: 'Members may cancel at any time with no cancellation fee. Cancellations take effect at the end of the current billing period. No partial refunds are issued for unused days within a billing cycle.' },
      { heading: 'Pausing Membership', text: 'Members may pause their membership for up to 60 consecutive days per calendar year. Sessions cannot be booked during a paused period. Pauses take effect at the start of the next billing cycle when requested mid-cycle.' },
    ],
  },
  {
    title: 'Booking & Cancellation Policy',
    content: [
      { heading: 'Advance Booking', text: 'All members (Essential and Unlimited) may book sessions up to 4 days in advance through the online member portal. The booking window is a rolling 4-day window that refreshes daily. Online booking is available to active members only.' },
      { heading: 'Walk-In Access', text: 'Walk-in access details and pricing will be available when we open. No membership is required to walk in. Walk-in access is first-come, first-served and subject to availability.' },
      { heading: 'Cancellation Window', text: 'Sessions must be cancelled at least 4 hours prior to the scheduled start time. Late cancellations (under 4 hours) and no-shows will be counted as a used session under the Essential plan. Repeated no-shows may result in temporary booking restrictions.' },
      { heading: 'Rescheduling', text: 'Sessions may be rescheduled through the member portal up to 4 hours before the scheduled time, subject to availability.' },
    ],
  },
  {
    title: 'Health & Safety Guidelines',
    content: [
      { heading: 'Health Intake', text: 'All members must complete a comprehensive health intake form before their first session. It is your responsibility to update this information if your health status changes.' },
      { heading: 'Cryotherapy Contraindications', text: 'Cryotherapy is contraindicated for individuals with Raynaud\'s disease, uncontrolled hypertension, cardiovascular conditions, open wounds, active infections, pregnancy, or severe cold allergies. A full list is available at the facility.' },
      { heading: 'Infrared Sauna Contraindications', text: 'Individuals with MS, lupus, adrenal suppression, or those who are pregnant should consult a physician before using the infrared sauna. Avoid use if feverish or immediately post-strenuous exercise.' },
      { heading: 'Red Light Therapy', text: 'Clients currently taking photosensitizing medications or applying photosensitizing topical agents should consult a physician before use. Protective eyewear is mandatory during sessions.' },
      { heading: 'Compression Therapy', text: 'Contraindicated with active deep vein thrombosis (DVT), severe peripheral artery disease, or acute lower-extremity injuries. Clients with circulatory conditions should obtain physician clearance.' },
      { heading: 'Assumption of Risk', text: 'By activating a membership, you acknowledge an understanding of the inherent risks associated with wellness modalities and agree to hold Elevate Cryo & Wellness harmless for any injury arising from disclosed or undisclosed health conditions.' },
    ],
  },
  {
    title: 'Privacy Policy',
    content: [
      { heading: 'Data Collection', text: 'Elevate collects personal information—including name, contact details, health information, and booking data—solely for the purpose of providing our services, ensuring your safety, and communicating with you about your membership.' },
      { heading: 'Data Use', text: 'We do not sell or share your personal information with third parties for marketing purposes. Health information is kept strictly confidential and is accessible only to authorized staff.' },
      { heading: 'Data Security', text: 'We employ industry-standard security measures to protect your personal data. Payment information is processed through secure, PCI-compliant third-party processors and is never stored on our systems.' },
    ],
  },
  {
    title: 'Code of Conduct',
    content: [
      { heading: 'Facility Standards', text: 'We are committed to maintaining a clean, calm, and respectful environment for all members. Disruptive behavior, misuse of equipment, or violations of staff instructions may result in immediate membership termination without refund.' },
      { heading: 'Hygiene', text: 'All members are expected to arrive for sessions with clean, dry skin free of heavy lotions, oils, or perfumes. Appropriate attire is required for all modalities as directed by staff.' },
      { heading: 'Photography', text: 'Photography and recording inside the facility—including treatment areas—is strictly prohibited without prior written consent from Elevate management.' },
    ],
  },
]

export default function Policies() {
  return (
    <main className="simple-page">
      <div className="simple-page__hero">
        <div className="container">
          <span className="section-label fade-up">Legal & Guidelines</span>
          <h1 className="simple-page__title fade-up-1">Policies & Terms.</h1>
          <p className="simple-page__sub fade-up-2">
            Please review all policies carefully before activating your membership.
            By joining Elevate, you agree to the terms outlined below.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="policies-layout">
          {/* Table of Contents */}
          <aside className="policies-toc">
            <h3 className="policies-toc__heading">Contents</h3>
            <nav>
              {sections.map((s, i) => (
                <a key={i} href={`#section-${i}`} className="policies-toc__item">
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="policies-content">
            {sections.map((s, i) => (
              <section key={i} id={`section-${i}`} className="policies-section">
                <h2 className="policies-section__title">{s.title}</h2>
                {s.content.map((c, j) => (
                  <div key={j} className="policies-item">
                    <h3 className="policies-item__heading">{c.heading}</h3>
                    <p className="policies-item__text">{c.text}</p>
                  </div>
                ))}
              </section>
            ))}
            <div className="policies-updated">
              <p>Last updated: January 2026. Elevate Cryo & Wellness reserves the right to update these policies at any time. Members will be notified of material changes via email.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
