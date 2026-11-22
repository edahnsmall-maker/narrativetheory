'use client'

import { useState } from 'react'

/** Suggest a new mode for the catalog. Goes to Edahn by email (through /api/contact). */
export function AddMode() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>
    const text = [
      `Mode: ${f.mode}${f.sticker ? ` ${f.sticker}` : ''}`,
      f.body && `Body: ${f.body}`,
      f.thinking && `Thinking: ${f.thinking}`,
      f.does && `What you do: ${f.does}`,
      f.story && `\nStory:\n${f.story}`,
    ].filter(Boolean).join('\n')
    setState('sending')
    setError('')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'mode', name: f.name, email: f.email, text, website: f.website }),
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
        <p className="mt-2 text-muted-foreground">I read every one. Good ones go in the catalog.</p>
      </div>
    )
  }

  const field = 'mt-1.5 w-full rounded-xl border bg-background px-3.5 py-2.5 text-[16px] outline-none focus:ring-2 focus:ring-foreground/20'
  return (
    <form onSubmit={onSubmit} className="rounded-3xl border bg-card p-5 sm:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
        <label className="block text-sm">
          Name the mode
          <input name="mode" required maxLength={80} placeholder="e.g. Airport Mode" className={field} />
        </label>
        <label className="block text-sm">
          Emoji
          <input name="sticker" maxLength={4} placeholder="✈️" className={field} />
        </label>
      </div>
      <label className="block text-sm">
        Body <span className="text-muted-foreground">(what happens in your body)</span>
        <input name="body" maxLength={300} className={field} />
      </label>
      <label className="block text-sm">
        Thinking style <span className="text-muted-foreground">(how the mind talks, what it expects)</span>
        <input name="thinking" maxLength={300} className={field} />
      </label>
      <label className="block text-sm">
        What you do
        <input name="does" maxLength={300} className={field} />
      </label>
      <label className="block text-sm">
        A time you were in it
        <textarea name="story" rows={4} maxLength={2000} className={field} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Your name <span className="text-muted-foreground">(optional)</span>
          <input name="name" autoComplete="name" className={field} />
        </label>
        <label className="block text-sm">
          Email <span className="text-muted-foreground">(optional)</span>
          <input name="email" type="email" autoComplete="email" className={field} />
        </label>
      </div>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={state === 'sending'} className="rounded-full bg-foreground text-background px-6 py-2.5 text-sm disabled:opacity-60">
        {state === 'sending' ? 'Sending…' : 'Send it in'}
      </button>
    </form>
  )
}
