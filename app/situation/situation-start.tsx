'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Camera, Sparkles, Wind } from 'lucide-react'
import { SessionView } from '@/components/session/session-view'
import { UpgradeButton } from '@/app/account/billing-buttons'

const PROMPTS = [
  'She replied to my long message with one word, and I’ve been replaying it all day.',
  'My boss walked into my presentation and I suddenly forgot everything I knew.',
  'At dinner my brother made a joke about my job and I went quiet for the rest of the night.',
]

export function SituationStart({ signedIn, remaining }: { signedIn: boolean; remaining: number | null }) {
  const [text, setText] = useState('')
  const [started, setStarted] = useState<string | null>(null)

  // The Narrative X-ray can hand a situation over (kept in sessionStorage, not the URL).
  useEffect(() => {
    try {
      const v = sessionStorage.getItem('nt-situation-prefill')
      if (v) setText(v)
    } catch {}
  }, [])

  if (started) return <SessionView start={{ kind: 'situation', text: started }} />

  const out = remaining === 0

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 md:py-20">
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Bring a Situation</div>
      <h1 className="font-display text-4xl md:text-5xl leading-[1.02] mb-4">What are you caught in?</h1>
      <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mb-10">
        Describe one real moment. The guide will separate what actually happened from what your mind built on top of it, and then you can
        talk it through.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 mb-10">
        {[
          { icon: <Camera size={15} />, t: 'What happened', d: 'The events, as a camera would have caught them.' },
          { icon: <Sparkles size={15} />, t: 'What the mind added', d: 'The story, the verdict, the mode you went into.' },
          { icon: <Wind size={15} />, t: 'What loosens it', d: 'Not a fix to grind at: a way of seeing.' },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border bg-card p-4">
            <div className="mb-2 text-muted-foreground">{x.icon}</div>
            <div className="font-medium text-[15px]">{x.t}</div>
            <div className="text-sm text-muted-foreground">{x.d}</div>
          </div>
        ))}
      </div>

      {!signedIn ? (
        <div className="nt-card text-center py-8">
          <p className="text-[15px] text-muted-foreground mb-4">Situation readings need a free account. Sign in with just your email.</p>
          <Link href="/signin?next=/situation" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium">
            Sign in
          </Link>
        </div>
      ) : out ? (
        <div className="nt-card nt-shift text-center py-8">
          <h2 className="font-display text-2xl mb-2">You've used this month's free readings</h2>
          <p className="text-[15px] text-muted-foreground mb-5 max-w-md mx-auto">Free accounts get two a month. Members can bring a situation whenever one comes up.</p>
          <UpgradeButton returnTo="/situation" />
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (text.trim().length >= 10) {
              try {
                sessionStorage.removeItem('nt-situation-prefill')
              } catch {}
              setStarted(text.trim())
            }
          }}
        >
          <label htmlFor="situation" className="sr-only">
            Your situation
          </label>
          <textarea
            id="situation"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="What happened, and what are you telling yourself about it?"
            className="w-full rounded-2xl border bg-card px-5 py-4 text-[16px] leading-relaxed focus:outline-none focus:border-[var(--accent-violet)]"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {PROMPTS.map((p) => (
              <button key={p} type="button" onClick={() => setText(p)} className="nt-reply text-left text-[13px]">
                {p}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={text.trim().length < 10}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-xl text-sm font-medium disabled:opacity-40"
            >
              Read this situation
            </button>
            {remaining !== null && (
              <span className="text-sm text-muted-foreground">
                {remaining} free {remaining === 1 ? 'reading' : 'readings'} left this month
              </span>
            )}
          </div>
          <p className="mt-6 text-xs text-muted-foreground/80 max-w-xl">
            Leave out names and details that identify other people. This is education, not therapy; if you're in crisis, call or text 988 (US) or your
            local emergency number.
          </p>
        </form>
      )}
    </div>
  )
}
