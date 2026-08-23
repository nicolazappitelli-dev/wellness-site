import Stripe from 'stripe'
import { supabaseAdmin, userFromRequest } from './_supabaseAdmin.js'

const PRICE_BY_PLAN = {
  essential: process.env.STRIPE_PRICE_ESSENTIAL,
  unlimited: process.env.STRIPE_PRICE_UNLIMITED,
}

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
    if (!user) return res.status(401).json({ error: 'Sign in to subscribe' })

    const plan = req.body?.plan
    const priceId = PRICE_BY_PLAN[plan]
    if (!priceId) {
      return res.status(400).json({
        error: 'Stripe price IDs are not configured yet. Add STRIPE_PRICE_ESSENTIAL and STRIPE_PRICE_UNLIMITED.',
      })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const admin = supabaseAdmin()
    const { data: profile, error } = await admin
      .from('profiles')
      .select('stripe_customer_id, first_name, last_name')
      .eq('id', user.id)
      .maybeSingle()
    if (error) throw error

    let customerId = profile?.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') || undefined,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
      await admin.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id)
    }

    const origin = originFrom(req)
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      client_reference_id: user.id,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/account?checkout=success`,
      cancel_url: `${origin}/memberships?checkout=cancel`,
      allow_promotion_codes: true,
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: {
        metadata: { supabase_user_id: user.id, plan },
      },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Checkout failed' })
  }
}
