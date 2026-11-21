'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMe } from '@/components/life/use-me'

type Story = { id: string; text: string; createdAt: string }

/** Approved readers' stories of a mode, plus a box to share your own. */
export function ModeStories({ slug, name }: { slug: string; name: string }) {
  const me = useMe()
  const [stories, setStories] = useState<Story[] | null>(null)
  const [text, setText] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | string>('idle')

  useEffect(() => {
    fetch(`/api/mode-stories?mode=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((j) => setStories(j.stories ?? []))
      .catch(() => setStories([]))
  }, [slug])

  const send = async () => {
    setState('sending')
    const r = await fetch('/api/mode-stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: slug, text }),
    })
    const j = await r.json().catch(() => ({}))
    if (r.ok) {
      setText('')
      setState('sent')
    } else setState(j.error === 'signin' ? 'Please sign in first.' : (j.error ?? 'Something went wrong.'))
  }

  const signedIn = !me.loading && !!me.data.user

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-3xl leading-tight">Have you been here?</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed max-w-xl">
          Tell your story of {name}: when it shows up, what your body does, what the world looks like from inside it, and what
          gets you out. Stories are read before they’re posted, and they’re shown without your name.
        </p>
      </div>

      {stories && stories.length > 0 && (
        <ul className="space-y-3">
          {stories.map((s) => (
            <li key={s.id} className="rounded-2xl border bg-card px-5 py-4 text-[16px] leading-relaxed">
              {s.text}
            </li>
          ))}
        </ul>
      )}

      {state === 'sent' ? (
        <p className="rounded-2xl border border-dashed px-5 py-4 text-[15px]">Thank you. It’ll show up here once it’s been read.</p>
      ) : me.loading ? null : signedIn ? (
        <div className="space-y-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder={`The last time I was in ${name}…`}
            className="w-full rounded-2xl border bg-card px-4 py-3 text-[16px] leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/15"
          />
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={send}
              disabled={text.trim().length < 20 || state === 'sending'}
              className="rounded-full bg-foreground text-background px-5 py-2 text-sm disabled:opacity-35"
            >
              {state === 'sending' ? 'Sending…' : 'Share my story'}
            </button>
            {state !== 'idle' && state !== 'sending' && <span className="text-sm text-[#b83f2c]">{state}</span>}
          </div>
        </div>
      ) : (
        <Link
          href={`/signin?next=${encodeURIComponent(`/modes/${slug}`)}`}
          className="inline-flex rounded-full border px-4 py-2 text-sm hover:bg-accent"
        >
          Sign in to share yours →
        </Link>
      )}
    </section>
  )
}
