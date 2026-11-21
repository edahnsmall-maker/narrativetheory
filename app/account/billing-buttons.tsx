'use client'

import { useState } from 'react'

/** Shared client buttons for billing and sign-out. Used by /account and /pricing. */

async function postForUrl(path: string, body?: unknown): Promise<string> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
  if (!res.ok || !data.url) throw new Error(data.error || 'Something went wrong. Please try again.')
  return data.url
}

function useAction() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  async function run(fn: () => Promise<void>) {
    setBusy(true)
    setError(null)
    try {
      await fn()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
      setBusy(false)
    }
  }
  return { busy, error, run }
}

const primaryCls =
  'inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity'
const secondaryCls =
  'inline-flex items-center justify-center rounded-full border border-foreground/20 px-5 py-2.5 text-sm hover:bg-foreground hover:text-background disabled:opacity-60 transition-colors'

export function UpgradeButton({
  label = 'Become a member',
  signedIn = true,
  next = '/pricing',
  returnTo,
  className,
}: {
  label?: string
  signedIn?: boolean
  next?: string
  returnTo?: string
  className?: string
}) {
  const { busy, error, run } = useAction()
  return (
    <div>
      <button
        type="button"
        disabled={busy}
        className={className ?? primaryCls}
        onClick={() =>
          run(async () => {
            if (!signedIn) {
              window.location.assign(`/signin?next=${encodeURIComponent(next)}`)
              return
            }
            const url = await postForUrl('/api/billing/checkout', returnTo ? { returnTo } : undefined)
            window.location.assign(url)
          })
        }
      >
        {busy ? 'One moment…' : label}
      </button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export function ManageBillingButton() {
  const { busy, error, run } = useAction()
  return (
    <div>
      <button
        type="button"
        disabled={busy}
        className={secondaryCls}
        onClick={() =>
          run(async () => {
            const url = await postForUrl('/api/billing/portal')
            window.location.assign(url)
          })
        }
      >
        {busy ? 'One moment…' : 'Manage billing'}
      </button>
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  )
}

export function SignOutButton() {
  const { busy, run } = useAction()
  return (
    <button
      type="button"
      disabled={busy}
      className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-60"
      onClick={() =>
        run(async () => {
          await fetch('/api/auth/signout', { method: 'POST' }).catch(() => {})
          window.location.assign('/')
        })
      }
    >
      {busy ? 'Signing out…' : 'Sign out'}
    </button>
  )
}
