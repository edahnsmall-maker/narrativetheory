import Stripe from 'stripe'
import { env } from '@/lib/config'
import { store } from '@/lib/store'
import type { UserRecord } from '@/lib/types'

/**
 * Stripe helpers. Server-only.
 *
 * The client is created lazily so that importing this module in local
 * development (no STRIPE_SECRET_KEY) never constructs Stripe with an empty key.
 */

let client: Stripe | null = null

export function stripe(): Stripe {
  if (!env.stripeSecret) throw new Error('Stripe is not configured (STRIPE_SECRET_KEY is missing).')
  if (!client) client = new Stripe(env.stripeSecret, { appInfo: { name: 'Narrative Theory' } })
  return client
}

/** Returns the user's Stripe customer id, creating the customer on first use. */
export async function getOrCreateCustomer(user: UserRecord): Promise<string> {
  if (user.stripeCustomerId) return user.stripeCustomerId
  const customer = await stripe().customers.create({
    email: user.email,
    metadata: { userId: user.id },
  })
  await store.updateUser(user.id, { stripeCustomerId: customer.id })
  return customer.id
}

/** Stripe statuses that keep someone a member (past_due gives them time to fix a card). */
const MEMBER_STATUSES: ReadonlySet<Stripe.Subscription.Status> = new Set(['active', 'trialing', 'past_due'])

/**
 * Brings the user record in line with a Stripe subscription.
 * Returns the updated user, or null if no user is linked to this customer.
 */
export async function applySubscription(
  customerId: string,
  subscription: Stripe.Subscription,
): Promise<UserRecord | null> {
  const user = await store.findUserByCustomer(customerId)
  if (!user) return null

  const isMember = MEMBER_STATUSES.has(subscription.status)
  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000).toISOString()
    : null

  return store.updateUser(user.id, {
    plan: isMember ? 'member' : 'free',
    subscriptionStatus: subscription.status,
    currentPeriodEnd: isMember ? periodEnd : null,
  })
}

/** Accepts only same-site relative paths ("/x", not "//evil.com" or "https://..."). */
export function safePath(p: unknown): string | null {
  if (typeof p !== 'string') return null
  if (!p.startsWith('/') || p.startsWith('//') || p.startsWith('/\\')) return null
  if (p.length > 500) return null
  return p
}

/** The site's origin for building absolute redirect URLs. */
export function originOf(req: Request): string {
  const fromHeader = req.headers.get('origin')
  if (fromHeader && /^https?:\/\//.test(fromHeader)) return fromHeader
  try {
    return new URL(req.url).origin
  } catch {
    return env.siteUrl
  }
}
