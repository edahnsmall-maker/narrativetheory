'use client'

import { useEffect, useState } from 'react'
import type { ContactMessage } from '@/lib/types'

/** Owner-only: messages from the contact form. */
export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[] | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/contact')
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 403 ? 'This page is only for the site owner.' : 'Could not load messages.')
        return r.json()
      })
      .then((j) => setMessages(j.messages))
      .catch((e) => setError(e.message))
  }, [])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Studio</div>
      <h1 className="font-display text-4xl mb-2">Messages</h1>
      <p className="text-muted-foreground mb-8">From the contact form.</p>
      {error && <p className="rounded-2xl border px-4 py-3">{error}</p>}
      {messages && messages.length === 0 && <p className="text-muted-foreground">Nothing yet.</p>}
      <ul className="space-y-4">
        {messages?.map((m) => (
          <li key={m.id} className="rounded-2xl border bg-card p-5">
            <div className="text-sm">
              <span className="font-medium">{m.name}</span> ·{' '}
              <a href={`mailto:${m.email}`} className="underline underline-offset-4">
                {m.email}
              </a>
              {m.phone && <> · {m.phone}</>}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(m.createdAt).toLocaleString()}
              {m.prefer && <> · prefers {m.prefer.toLowerCase()}</>}
            </div>
            <p className="mt-3 whitespace-pre-wrap leading-relaxed">{m.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
