import Link from 'next/link'
import { Check } from 'lucide-react'
import { currentUser, isMember } from '@/lib/auth'
import { devBilling, pricing, rules } from '@/lib/config'
import { UpgradeButton } from '../account/billing-buttons'

export const metadata = {
  title: 'Pricing — Narrative Theory',
  description: 'Read everything free. Membership opens every guided session and the Program.',
}
export const dynamic = 'force-dynamic'

const free = [
  'Read every article and diagram',
  'All Start Here guided sessions',
  'A taste of every other session',
  `${rules.freeSituationsPerMonth} Bring a Situation readings a month`,
]

const member = [
  'Every guided session, in full',
  'Bring a Situation readings whenever you need them, within fair use',
  'The Program — five stages of deep work that build your personal map',
  'Your notebook and mode library across everything',
]

const faq = [
  {
    q: 'Can I cancel?',
    a: 'Yes, anytime, from your account page. You keep membership until the end of the period you paid for, and nothing renews after that.',
  },
  {
    q: 'Is this therapy?',
    a: 'No. Narrative Theory is education — a way of looking at experience that you can practice on your own. The guided sessions are a teacher, not a clinician. If you are in crisis or need care, please reach out to a licensed professional or a local crisis line.',
  },
  {
    q: 'What does “fair use” mean?',
    a: `The guide runs on an AI model that costs real money per reply, so there is a daily ceiling on replies — ${rules.dailyReplyCap.member} a day for members. Almost no one comes near it; it is there to keep the price low for everyone. If you reach it, you can pick up again the next day.`,
  },
  {
    q: 'What do I keep if I stop?',
    a: 'Your account, your notebook, and everything you wrote stay yours. You go back to the free plan, and all the reading stays open.',
  },
]

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 text-[15px] leading-relaxed">
      <Check className="h-4 w-4 mt-1 shrink-0 text-[var(--accent-violet)]" />
      <span>{children}</span>
    </li>
  )
}

export default async function PricingPage() {
  const user = await currentUser()
  const isMem = isMember(user)

  return (
    <div className="mx-auto max-w-5xl px-5 lg:px-8 py-16">
      <header className="mb-14 max-w-2xl">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Pricing</div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-5 leading-tight">
          Read freely. Go deeper when you&rsquo;re ready.
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          The ideas are free for anyone. Membership pays for the guided work — the sessions that
          walk through your own life with you — and keeps the project going.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 items-stretch mb-20">
        {/* Free */}
        <section className="rounded-2xl border border-rule bg-card p-7 md:p-8 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Free</div>
          <div className="font-display text-3xl mb-1">$0</div>
          <p className="text-sm text-muted-foreground mb-7">For reading and getting started.</p>
          <ul className="space-y-3 mb-8 flex-1 text-foreground/85">
            {free.map((f) => (
              <Item key={f}>{f}</Item>
            ))}
          </ul>
          <Link
            href="/life"
            className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-2.5 text-sm hover:bg-foreground hover:text-background transition-colors"
          >
            Start reading
          </Link>
        </section>

        {/* Member */}
        <section className="relative rounded-2xl border-2 border-foreground bg-card p-7 md:p-8 flex flex-col shadow-[0_12px_40px_-16px_color-mix(in_oklab,var(--accent-violet)_45%,transparent)]">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
            style={{ background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-pink), var(--accent-orange), var(--accent-blue))' }}
          />
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{pricing.planName}</div>
          <div className="font-display text-3xl mb-1">
            {pricing.label}
            <span className="text-base text-muted-foreground font-sans"> / {pricing.period}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-7">For doing the work.</p>
          <ul className="space-y-3 mb-8 flex-1 text-foreground">
            {member.map((f) => (
              <Item key={f}>{f}</Item>
            ))}
          </ul>
          {isMem ? (
            <Link
              href="/account"
              className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90"
            >
              You&rsquo;re a member — go to your account
            </Link>
          ) : (
            <UpgradeButton
              label="Become a member"
              signedIn={!!user}
              next="/pricing"
              className="w-full inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
            />
          )}
          <p className="mt-3 text-xs text-muted-foreground text-center">
            {devBilling ? 'Development mode: no card is charged.' : 'Cancel anytime.'}
          </p>
        </section>
      </div>

      <section className="max-w-2xl">
        <h2 className="font-display text-2xl text-foreground mb-6">Questions</h2>
        <dl className="divide-y divide-[var(--rule)] border-y border-rule">
          {faq.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-medium text-foreground mb-2">{f.q}</dt>
              <dd className="text-muted-foreground leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  )
}
