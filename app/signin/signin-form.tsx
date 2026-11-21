'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

type Props = { devAuth: boolean; next: string; linkError: boolean }

export default function SignInForm({ devAuth, next, linkError }: Props) {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(
    linkError ? 'That sign-in link didn’t work — it may have expired. Try again below.' : null,
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = email.trim().toLowerCase()
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      if (devAuth) {
        const res = await fetch('/api/auth/dev-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: value }),
        })
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string }
          throw new Error(data.error || 'Sign-in failed.')
        }
        window.location.assign(next)
        return
      }
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )
      const { error } = await supabase.auth.signInWithOtp({
        email: value,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      })
      if (error) throw error
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-rule bg-card p-6">
        <div className="font-display text-xl mb-2">Check your email for a sign-in link.</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We sent it to <span className="text-foreground">{email.trim()}</span>. It can take a minute
          to arrive — if you don&rsquo;t see it, look in spam.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
        >
          Use a different email
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="block text-sm text-foreground/80 mb-2">Email</span>
        <input
          type="email"
          autoComplete="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-rule bg-card px-4 py-3 text-[15px] outline-none focus:border-foreground/40 focus:ring-2 focus:ring-foreground/10"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
      >
        {busy ? 'One moment…' : devAuth ? 'Sign in' : 'Email me a link'}
      </button>
      {devAuth && (
        <p className="text-xs text-muted-foreground text-center pt-1">
          Development sign-in — no email is sent.
        </p>
      )}
    </form>
  )
}
