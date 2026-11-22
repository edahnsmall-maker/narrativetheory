'use client'

import { useState } from 'react'
import Link from 'next/link'
import { catalogBySlug } from '@/lib/data/catalog'

type Take = { mode: string; sees: string; body: string; does: string }
type Moment = { label: string; what: string; takes: Take[] }

// The crying-baby lines are Edahn's, from the homepage scene.
const MOMENTS: Moment[] = [
  {
    label: 'A crying baby',
    what: 'A baby starts crying at the next table in a nice restaurant.',
    takes: [
      { mode: 'anger-mode', sees: 'Who brings a baby to a nice restaurant? Inconsiderate. I would never do that.', body: 'Jaw tight, eyes narrow, shoulders up.', does: 'Glares. Sighs loudly. The night is ruined.' },
      { mode: 'social-anxiety-mode', sees: 'Everyone’s staring. Is it bothering people? Should we leave?', body: 'Stomach drops, face warm.', does: 'Can’t follow the conversation. Checks the room.' },
      { mode: 'thinking-mode', sees: 'Why do babies cry at that pitch? There’s probably an evolutionary reason.', body: 'Slightly removed, in the head.', does: 'Starts explaining it to the table.' },
      { mode: 'deep-chill-mode', sees: 'Oh, how beautiful. They probably just had their baby and want a normal night out. Good for them.', body: 'Soft face, easy breath.', does: 'Smiles at the parents. Goes back to dinner.' },
    ],
  },
  {
    label: '“ok.”',
    what: 'Your boss answers your long, careful email with one word: “ok.”',
    takes: [
      { mode: 'anxiety-mode', sees: 'She’s annoyed. I said something wrong. This is bad.', body: 'Chest tight, quick breath.', does: 'Rereads the email five times. Can’t focus on anything else.' },
      { mode: 'defense-mode', sees: 'I did exactly what she asked. If she has a problem she should say so.', body: 'Heat in the face, quick speech.', does: 'Drafts a long reply explaining everything.' },
      { mode: 'inferiority-mode', sees: 'Everyone else gets real replies. I’m not good at this job.', body: 'Heavy, slumped.', does: 'Goes quiet in the next meeting.' },
      { mode: 'deep-chill-mode', sees: 'Ok. Great.', body: 'Nothing much happens.', does: 'Moves on to the next thing.' },
    ],
  },
  {
    label: '“We need to talk.”',
    what: 'Your partner texts: “We need to talk tonight.”',
    takes: [
      { mode: 'alert-mode', sees: 'What happened? What did I do? What is this about?', body: 'Still, eyes fixed on the phone.', does: 'Scans the last week for clues.' },
      { mode: 'defense-mode', sees: 'If this is about Saturday, that wasn’t my fault.', body: 'Tight jaw, rehearsing.', does: 'Walks in with a list of arguments.' },
      { mode: 'withdrawal-mode', sees: 'Here we go again. I can’t do this.', body: 'Flat, shut down.', does: 'Shorter answers. Goes cold before the talk starts.' },
      { mode: 'post-fight-warmth', sees: 'Something’s on their mind. I want to hear it.', body: 'Face and voice relaxed.', does: '“Sure. What’s up?” Listens.' },
    ],
  },
]

export function StimulusDemo() {
  const [i, setI] = useState(0)
  const m = MOMENTS[i]
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {MOMENTS.map((x, j) => (
          <button
            key={x.label}
            type="button"
            aria-pressed={i === j}
            onClick={() => setI(j)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${i === j ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'}`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="mt-6 font-display text-2xl md:text-3xl leading-snug">{m.what}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {m.takes.map((t) => {
          const mode = catalogBySlug(t.mode)
          return (
            <div key={t.mode} className="rounded-3xl border bg-card p-5 flex flex-col">
              <Link href={`/modes/${t.mode}`} className="flex items-center gap-2 hover:underline underline-offset-4">
                <span className="text-2xl" aria-hidden>{mode?.sticker}</span>
                <span className="font-display text-lg leading-tight">{mode?.name ?? t.mode}</span>
              </Link>
              <p className="mt-4 italic text-[15px] leading-snug">“{t.sees}”</p>
              <dl className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div><dt className="inline text-[10px] uppercase tracking-widest mr-1.5">Body</dt><dd className="inline">{t.body}</dd></div>
                <div><dt className="inline text-[10px] uppercase tracking-widest mr-1.5">Does</dt><dd className="inline">{t.does}</dd></div>
              </dl>
            </div>
          )
        })}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">Same moment. Different mode, different world, different outcome.</p>
    </div>
  )
}
