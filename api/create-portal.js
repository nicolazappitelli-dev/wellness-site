import Stripe from 'stripe'
import { supabaseAdmin, userFromRequest } from './_supabaseAdmin.js'

function originFrom(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  return `${proto}://${host}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const user = await userFromRequest(req)
    if (!user) return res.status(401).json({ error: 'Sign in to manage billing' })

    const admin = supabaseAdmin()
    const { data: profile, error } = await admin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', user.id)
      .maybeSingle()
    if (error) throw error
    if (!profile?.stripe_customer_id) {
      return res.status(400).json({ error: 'No billing account yet. Subscribe first.' })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${originFrom(req)}/account`,
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Portal failed' })
  }
}
