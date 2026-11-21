import type Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { env } from '@/lib/config'
import { store } from '@/lib/store'
import { applySubscription, stripe } from '@/lib/billing'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const idOf = (v: string | { id: string } | null | undefined) => (typeof v === 'string' ? v : v?.id ?? null)

/** Stripe → site. Keeps each user's plan in step with their subscription. */
export async function POST(req: Request) {
  if (!env.stripeSecret || !env.stripeWebhookSecret) {
    return NextResponse.json({ error: 'Billing is not configured.' }, { status: 404 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return NextResponse.json({ error: 'Missing signature.' }, { status: 400 })

  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe().webhooks.constructEvent(raw, signature, env.stripeWebhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        if (session.mode !== 'subscription') break
        const customerId = idOf(session.customer)
        const userId = session.client_reference_id
        if (customerId && userId) {
          const user = await store.getUser(userId)
          if (user && user.stripeCustomerId !== customerId) {
            await store.updateUser(userId, { stripeCustomerId: customerId })
          }
        }
        const subId = idOf(session.subscription)
        if (customerId && subId) {
          const sub = await stripe().subscriptions.retrieve(subId)
          await applySubscription(customerId, sub)
        }
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const customerId = idOf(sub.customer)
        if (customerId) await applySubscription(customerId, sub)
        break
      }
      default:
        break
    }
  } catch (err) {
    // Signal failure so Stripe retries; the signature was valid.
    console.error('[billing/webhook]', event.type, err)
    return NextResponse.json({ error: 'Handler failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
