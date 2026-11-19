export const TAGLINE = 'Recover faster. Feel better. Age better.'
export const HEADLINE = '4 Modalities. Complete Recovery.'

export const STUDIO_HOURS = [
  { days: 'Monday – Thursday', hours: '8:00 AM – 7:00 PM' },
  { days: 'Friday', hours: '8:00 AM – 5:00 PM' },
  { days: 'Saturday', hours: '8:00 AM – 2:00 PM' },
  { days: 'Sunday', hours: 'Closed' },
]

export const MODALITIES = [
  {
    slug: 'cryotherapy',
    name: 'Cryotherapy',
    benefits: [
      'Reduce inflammation',
      'Boost recovery',
      'Relieve muscle soreness',
      'Support circulation',
      'Enhance alertness & energy',
    ],
  },
  {
    slug: 'sauna',
    name: 'Infrared Sauna',
    benefits: [
      'Improve circulation',
      'Relieve muscle tension',
      'Promote relaxation',
      'Support cardiovascular health',
      'Promote restful sleep',
    ],
  },
  {
    slug: 'red-light',
    name: 'Red Light Therapy Bed',
    detail: 'Up to 940nm',
    benefits: [
      'Support cellular repair',
      'Promote muscle recovery',
      'Support skin repair',
      'Support hair growth',
      'Reduce muscle fatigue',
    ],
  },
  {
    slug: 'compression',
    name: 'Compression Therapy',
    benefits: [
      'Improve circulation',
      'Reduce leg swelling',
      'Relieve soreness',
      'Support recovery',
      'Relieve leg fatigue',
    ],
  },
]

export function modalityBySlug(slug) {
  const modality = MODALITIES.find(item => item.slug === slug)
  if (!modality) throw new Error(`Unknown modality: ${slug}`)
  return modality
}

export function modalitySummary(slug) {
  const { benefits, detail } = modalityBySlug(slug)
  const [first, ...rest] = benefits
  const body = rest.map(item => item.charAt(0).toLowerCase() + item.slice(1))
  const last = body.pop()
  const sentence = `${first}, ${body.join(', ')}, and ${last}.`
  return detail ? `${sentence} ${detail}.` : sentence
}

export const OFFERS = {
  walkIn: {
    id: 'walk-in',
    name: 'Walk-In',
    summary: 'Any one modality',
    price: '35',
    unit: 'Per modality',
    tax: true,
  },
  essential: {
    id: 'essential',
    name: 'Elevate Essential',
    summary: '1 modality a week',
    price: '99.99',
    unit: 'Per month',
    tax: true,
  },
  everyday: {
    id: 'everyday',
    name: 'Everyday Wellness',
    summary: '1 modality a day, every day',
    unit: 'Per month',
    tax: true,
    founding: '149.99',
    standard: '169.99',
  },
  unlimited: {
    id: 'unlimited',
    name: 'Unlimited',
    summary: 'All modalities, unlimited access',
    unit: 'Per month',
    tax: true,
    founding: '229.99',
    standard: '249.99',
  },
  weekPass: {
    id: 'week-pass',
    name: 'Unlimited Week Pass',
    summary: '7 days of unlimited access',
    price: '99.99',
    unit: '7 days',
    tax: false,
  },
  addOn: {
    id: 'add-on',
    name: 'Member Add-On',
    summary: 'Additional modality, same day',
    note: 'For members on Everyday Wellness or Elevate Essential',
    price: '20',
    unit: 'Same day',
    tax: false,
  },
}

export const INQUIRY_INTERESTS = [
  `Elevate Essential ($${OFFERS.essential.price}/mo + tax)`,
  `Everyday Wellness ($${OFFERS.everyday.founding}/mo founding + tax)`,
  `Unlimited ($${OFFERS.unlimited.founding}/mo founding + tax)`,
  `Unlimited Week Pass ($${OFFERS.weekPass.price})`,
  `Walk-in ($${OFFERS.walkIn.price} per modality + tax)`,
  `Member add-on ($${OFFERS.addOn.price})`,
  'Cryotherapy',
  'Red Light Therapy Bed',
  'Infrared Sauna',
  'Compression Therapy',
  'Not sure yet',
]
