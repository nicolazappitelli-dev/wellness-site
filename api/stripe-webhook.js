import Stripe from 'stripe'
import { supabaseAdmin } from './_supabaseAdmin.js'

export const config = {
  api: { bodyParser: false },
}

async function rawBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return Buffer.concat(chunks)
}

function statusFromSubscription(sub) {
  if (!sub) return { membership_status: 'canceled', plan: null, stripe_subscription_id: null }
  if (sub.status === 'active' || sub.status === 'trialing') {
    return {
      membership_status: 'active',
      plan: sub.metadata?.plan || null,
      stripe_subscription_id: sub.id,
    }
  }
  if (sub.status === 'past_due') {
    return {
      membership_status: 'past_due',
      plan: sub.metadata?.plan || null,
      stripe_subscription_id: sub.id,
    }
  }
  return {
    membership_status: 'canceled',
    plan: sub.metadata?.plan || null,
    stripe_subscription_id: sub.id,
  }
}

async function applyToUser(admin, userId, fields) {
  if (!userId) return
  const patch = { ...fields }
  await admin.from('profiles').update(patch).eq('id', userId)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end()
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const body = await rawBody(req)
    const event = stripe.webhooks.constructEvent(
      body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    )
    const admin = supabaseAdmin()

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const userId = session.client_reference_id || session.metadata?.supabase_user_id
      const plan = session.metadata?.plan
      await applyToUser(admin, userId, {
        stripe_customer_id: session.customer || undefined,
        stripe_subscription_id: session.subscription || undefined,
        plan: plan || undefined,
        membership_status: 'active',
      })
    }

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.deleted'
    ) {
      const sub = event.data.object
      const userId = sub.metadata?.supabase_user_id
      await applyToUser(admin, userId, statusFromSubscription(
        event.type === 'customer.subscription.deleted' ? null : sub,
      ))
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Webhook failed' })
  }
}
