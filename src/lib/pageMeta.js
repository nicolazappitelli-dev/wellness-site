export const SITE_ORIGIN = 'https://elevatecryoconcord.com'

/**
 * Per-route title and description. A single-page app serves one index.html to
 * every route, so without this each page would report the homepage's title and
 * compete with itself in search results.
 */
export const PAGE_META = {
  '/': {
    title: 'Cryotherapy in Concord, OH | Elevate Cryo & Wellness',
    description:
      'Recover faster. Feel better. Age better. Cryotherapy, infrared sauna, red light therapy bed, and compression therapy in Concord, Ohio.',
  },
  '/modalities': {
    title: 'Cryotherapy, Sauna & Red Light | Elevate Cryo Concord',
    description:
      '4 modalities for complete recovery in Concord, Ohio: cryotherapy, infrared sauna, red light therapy bed up to 940nm, and compression therapy.',
  },
  '/memberships': {
    title: 'Memberships & Pricing | Elevate Cryo Concord, OH',
    description:
      'Elevate Essential $99.99/mo, founding rates on Everyday Wellness and Unlimited, walk-ins $35, and a $99.99 Unlimited Week Pass. Concord, Ohio.',
  },
  '/contact': {
    title: 'Contact & Hours | Elevate Cryo Concord, OH',
    description:
      '8019 Crile Road, Concord, OH 44077. Mon–Thu 8 AM–7 PM, Fri 8 AM–5 PM, Sat 8 AM–2 PM. Closed Sunday. Call (440) 754-2912.',
  },
  '/policies': {
    title: 'Policies | Elevate Cryo Concord, OH',
    description:
      'Membership terms, cancellation, and health and safety policies for Elevate Cryo & Wellness in Concord, Ohio.',
  },
}

export const DEFAULT_META = PAGE_META['/']
