import { NextResponse } from 'next/server'
import { currentUser } from '@/lib/auth'
import { devBilling, env } from '@/lib/config'
import { store } from '@/lib/store'
import { getOrCreateCustomer, originOf, safePath, stripe } from '@/lib/billing'

export const runtime = 'nodejs'

/** Starts a membership. Returns { url } for the browser to visit. */
export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Please sign in first.' }, { status: 401 })

  const body = (await req.json().catch(() => ({}))) as { returnTo?: unknown }
  const returnTo = safePath(body?.returnTo)

  if (devBilling) {
    await store.updateUser(user.id, {
      plan: 'member',
      subscriptionStatus: 'dev',
      currentPeriodEnd: new Date(Date.now() + 30 * 864e5).toISOString(),
    })
    return NextResponse.json({ url: returnTo ?? '/account?upgraded=1' })
  }

  try {
    const origin = originOf(req)
    const customer = await getOrCreateCustomer(user)
    const session = await stripe().checkout.sessions.create({
      mode: 'subscription',
      customer,
      client_reference_id: user.id,
      line_items: [{ price: env.stripePriceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${origin}${returnTo ?? '/account?upgraded=1'}`,
      cancel_url: `${origin}/pricing`,
      subscription_data: { metadata: { userId: user.id } },
    })
    if (!session.url) throw new Error('Stripe returned no checkout URL')
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[billing/checkout]', err)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
