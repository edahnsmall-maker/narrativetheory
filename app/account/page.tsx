import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import { currentUser, isMember } from '@/lib/auth'
import { devBilling, pricing } from '@/lib/config'
import { store } from '@/lib/store'
import { ManageBillingButton, SignOutButton, UpgradeButton } from './billing-buttons'

export const metadata = {
  title: 'Your account — Narrative Theory',
}
export const dynamic = 'force-dynamic'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

const statusLabel: Record<string, string> = {
  active: 'In progress',
  complete: 'Complete',
  locked: 'Paused — members only',
}

const includes = [
  'Every guided session, in full',
  'Bring a Situation readings whenever you need them (within fair use)',
  'The Program — five stages of deep work that build your personal map',
  'Your notebook and mode library across everything',
]

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const user = await currentUser()
  if (!user) redirect('/signin?next=/account')
  const sp = await searchParams
  const upgraded = sp.upgraded === '1'
  const member = isMember(user)

  const sessions = (await store.listSessions(user.id))
    .slice()
    .sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? ''))
    .slice(0, 6)

  return (
    <div className="mx-auto max-w-2xl px-5 lg:px-8 py-16">
      <header className="mb-12">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Account</div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground leading-tight">Your account</h1>
      </header>

      {upgraded && member && (
        <div className="mb-10 rounded-2xl border border-rule bg-[color-mix(in_oklab,var(--accent-violet)_10%,var(--card))] p-6">
          <div className="font-display text-xl mb-1">Thank you — you&rsquo;re a member.</div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Every session is open to you now, along with the Program. Take your time with it.
          </p>
        </div>
      )}

      <section className="mb-12 rounded-2xl border border-rule bg-card p-6 md:p-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</dt>
            <dd className="text-foreground break-all">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Plan</dt>
            <dd className="text-foreground">
              {member ? pricing.planName : 'Free'}
              {member && user.currentPeriodEnd && (
                <span className="block text-sm text-muted-foreground">
                  {user.subscriptionStatus === 'past_due'
                    ? 'Payment needs attention — please update your card.'
                    : `Renews ${fmtDate(user.currentPeriodEnd)}`}
                </span>
              )}
            </dd>
          </div>
        </dl>

        <div className="mt-8 pt-6 border-t border-rule">
          {member ? (
            <div className="flex flex-wrap items-center gap-4">
              <ManageBillingButton />
              <span className="text-sm text-muted-foreground">
                {devBilling ? 'Development mode: this ends the simulated membership.' : 'Update your card or cancel anytime.'}
              </span>
            </div>
          ) : (
            <div>
              <p className="text-foreground mb-4">
                Membership is {pricing.label} a {pricing.period}. It includes:
              </p>
              <ul className="space-y-2 mb-6">
                {includes.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] text-foreground/85">
                    <Check className="h-4 w-4 mt-1 shrink-0 text-[var(--accent-violet)]" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <UpgradeButton label={`Become a member — ${pricing.label}/${pricing.period}`} />
                <Link href="/pricing" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
                  Compare plans
                </Link>
              </div>
              {devBilling && (
                <p className="mt-3 text-xs text-muted-foreground">Development mode: no card is charged.</p>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="font-display text-xl text-foreground">Your recent sessions</h2>
          <Link href="/notebook" className="inline-flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground">
            Your notebook <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground leading-relaxed">
            Nothing here yet.{' '}
            <Link href="/life" className="underline underline-offset-4 hover:text-foreground">
              Start with a guided session
            </Link>{' '}
            — the Start Here shelf is free.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--rule)] border-y border-rule">
            {sessions.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/session/${s.id}`}
                  className="flex items-center justify-between gap-4 py-4 group"
                >
                  <div className="min-w-0">
                    <div className="text-foreground truncate group-hover:underline underline-offset-4">
                      {s.title || 'Untitled session'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {statusLabel[s.status] ?? s.status} · {fmtDate(s.updatedAt)}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <SignOutButton />
    </div>
  )
}
