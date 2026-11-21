'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { ModeStory, StoryStatus } from '@/lib/types'

/** Owner-only: read readers' mode stories and approve or hide them. */
export default function StoryReview() {
  const [stories, setStories] = useState<ModeStory[] | null>(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<StoryStatus>('new')

  const load = () =>
    fetch('/api/mode-stories?all=1')
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 403 ? 'This page is only for the site owner.' : 'Could not load stories.')
        return r.json()
      })
      .then((j) => setStories(j.stories))
      .catch((e) => setError(e.message))
  useEffect(() => {
    load()
  }, [])

  const set = async (id: string, status: StoryStatus) => {
    await fetch('/api/mode-stories', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) })
    setStories((list) => list?.map((s) => (s.id === id ? { ...s, status } : s)) ?? null)
  }

  const shown = stories?.filter((s) => s.status === tab) ?? []

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Studio</div>
      <h1 className="font-display text-4xl mb-2">Mode stories</h1>
      <p className="text-muted-foreground mb-8">Readers’ stories from the Mode Field Guide. Nothing shows on the site until you approve it.</p>
      {error && <p className="rounded-2xl border px-4 py-3">{error}</p>}
      {stories && (
        <>
          <div className="flex gap-2 mb-6">
            {(['new', 'approved', 'hidden'] as StoryStatus[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`rounded-full border px-3.5 py-1.5 text-sm capitalize ${tab === t ? 'bg-foreground text-background' : ''}`}
              >
                {t} ({stories.filter((s) => s.status === t).length})
              </button>
            ))}
          </div>
          {shown.length === 0 && <p className="text-muted-foreground">Nothing here.</p>}
          <ul className="space-y-4">
            {shown.map((s) => (
              <li key={s.id} className="rounded-2xl border bg-card p-5">
                <div className="text-xs text-muted-foreground mb-2">
                  <Link href={`/modes/${s.modeSlug}`} className="underline underline-offset-4">
                    {s.modeName}
                  </Link>{' '}
                  · {new Date(s.createdAt).toLocaleString()}
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{s.text}</p>
                <div className="mt-4 flex gap-2">
                  {s.status !== 'approved' && (
                    <button type="button" onClick={() => set(s.id, 'approved')} className="rounded-full bg-foreground text-background px-4 py-1.5 text-sm">
                      Approve
                    </button>
                  )}
                  {s.status !== 'hidden' && (
                    <button type="button" onClick={() => set(s.id, 'hidden')} className="rounded-full border px-4 py-1.5 text-sm">
                      Hide
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
