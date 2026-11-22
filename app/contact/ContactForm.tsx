'use client'

import { useState } from 'react'

const PREFER = ['Text', 'Email', 'Phone call', 'Doesn’t matter']

export function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setState('sending')
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(f.entries())),
    }).catch(() => null)
    if (res?.ok) return setState('sent')
    const j = await res?.json().catch(() => null)
    setError(j?.error ?? 'Something went wrong. Try again in a minute.')
    setState('idle')
  }

  if (state === 'sent') {
    return (
      <div className="rounded-3xl border bg-card px-6 py-10 text-center">
        <div className="font-display text-3xl">Thanks.</div>
        <p className="mt-2 text-muted-foreground">I got it, and I’ll get back to you soon.</p>
      </div>
    )
  }

  const field = 'mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-[16px] outline-none focus:ring-2 focus:ring-foreground/20'
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        Phone <span className="text-muted-foreground">(optional)</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block text-sm">
        Message
        <textarea name="text" required rows={6} className={field} />
      </label>
      <fieldset>
        <legend className="text-sm">How would you like me to contact you?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PREFER.map((p, i) => (
            <label key={p} className="cursor-pointer">
              <input type="radio" name="prefer" value={p} defaultChecked={i === 3} className="peer sr-only" />
              <span className="inline-block rounded-full border px-3.5 py-1.5 text-sm peer-checked:bg-foreground peer-checked:text-background peer-focus-visible:ring-2 peer-focus-visible:ring-foreground/30">
                {p}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {/* Hidden from people; catches bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm disabled:opacity-60"
      >
        {state === 'sending' ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}
