/**
 * Central configuration. Everything that varies between local development and
 * production — and every business rule about what's free — lives here.
 *
 * Local development needs no accounts at all: with no Supabase keys the site
 * uses a file-backed store and a "dev sign-in", with no Stripe keys "upgrade"
 * flips the plan locally, and with no Anthropic key the guide runs in practice
 * mode (scripted responses) so the whole flow can be clicked through.
 */

export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  stripeSecret: process.env.STRIPE_SECRET_KEY ?? '',
  stripePriceId: process.env.STRIPE_PRICE_ID ?? '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
  anthropicKey: process.env.ANTHROPIC_API_KEY ?? '',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
}

/** True when Supabase isn't configured: file store + dev sign-in. */
export const devAuth = !env.supabaseUrl || !env.supabaseServiceKey
/** True when Stripe isn't configured: upgrades are simulated locally. */
export const devBilling = !env.stripeSecret || !env.stripePriceId
/** True when there's no API key, or practice mode is forced: scripted guide. */
export const practiceAI = !env.anthropicKey || process.env.NT_PRACTICE_AI === '1'

export const pricing = {
  label: process.env.NEXT_PUBLIC_PRICE_LABEL ?? '$12',
  period: 'month',
  planName: 'Member',
}

/** Models. Opus 5.5 by default; set NT_SESSION_MODEL=claude-sonnet-5-5 to run sessions cheaper. */
export const models = {
  session: process.env.NT_SESSION_MODEL ?? 'claude-opus-5-5',
  program: process.env.NT_PROGRAM_MODEL ?? 'claude-opus-5-5',
  /** Opus-family models accept only an array-form fallback on this SDK version. */
  fallback: process.env.NT_FALLBACK_MODEL ?? 'claude-opus-4-8',
}

export const rules = {
  /** Shelves whose guided sessions are free for anyone signed in. */
  freeShelves: ['start-here-core-practice'],
  /** On a locked module, a free member gets this many of their own replies before the paywall. */
  tasteReplies: 3,
  /** Free "Bring a Situation" readings per calendar month. */
  freeSituationsPerMonth: 2,
  /** Fair-use ceiling on replies per day, per person, for everyone (protects the AI bill). */
  dailyReplyCap: { free: 40, member: 200 },
  /** The five-stage Program is members-only. */
  programRequiresMember: true,
}
