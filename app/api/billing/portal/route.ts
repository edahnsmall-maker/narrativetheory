import { NextResponse } from 'next/server'
import { currentUser } from '@/lib/auth'
import { devBilling } from '@/lib/config'
import { store } from '@/lib/store'
import { originOf, stripe } from '@/lib/billing'

export const runtime = 'nodejs'

/** Opens Stripe's billing portal (update card, cancel). Returns { url }. */
export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 })

  if (devBilling) {
    // Local development: "managing billing" simply ends the simulated membership.
    await store.updateUser(user.id, { plan: 'free', subscriptionStatus: null, currentPeriodEnd: null })
    return NextResponse.json({ url: '/account' })
  }

  if (!user.stripeCustomerId) {
    return NextResponse.json({ error: 'No billing account found.' }, { status: 400 })
  }

  try {
    const session = await stripe().billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${originOf(req)}/account`,
    })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[billing/portal]', err)
    return NextResponse.json({ error: 'Could not open billing. Please try again.' }, { status: 502 })
  }
}
