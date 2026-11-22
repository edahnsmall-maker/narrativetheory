'use client'

import { useEffect, useState } from 'react'
import { C, Toggle, useArtStyle } from '@/components/home2/collage'

type State = 'relaxed' | 'anxious' | 'irritated'
type Scene = 'read' | 'glance' | 'pause'

const STATES: Record<State, { label: string; color: string }> = {
  relaxed: { label: 'Relaxed', color: C.teal },
  anxious: { label: 'Anxious', color: '#d98a12' },
  irritated: { label: 'Irritated', color: C.tomato },
}

const SCENES: Record<Scene, { tab: string; known: string; prompt: string; fill: Record<State, [string, string, string]> }> = {
  read: {
    tab: 'Left on read',
    known: 'You sent “Had fun last night :)”. It says Read 2:14 PM. That’s it.',
    prompt: 'They haven’t answered because',
    fill: {
      relaxed: ['they’re at work', 'they’re busy', 'they’ll get to it'],
      anxious: ['I said something wrong', 'they’re losing interest', 'it’s over'],
      irritated: ['rude', 'they’re playing games', 'typical'],
    },
  },
  glance: {
    tab: 'The glance',
    known: 'Someone across the room looked over. For about a second.',
    prompt: 'They looked at me because',
    fill: {
      relaxed: ['they were looking around', 'they liked my jacket', 'people look at people'],
      anxious: ['something’s off about me', 'they’re judging me', 'I don’t belong here'],
      irritated: ['what’s their problem', 'they’re staring', 'mind your business'],
    },
  },
  pause: {
    tab: 'The pause',
    known: 'You made a joke in the meeting. Two seconds of quiet.',
    prompt: 'Nobody laughed because',
    fill: {
      relaxed: ['it’s 9am', 'it was a weird room', 'the next one will land'],
      anxious: ['everyone thinks I’m an idiot', 'I should stop talking', 'I’ll replay this all night'],
      irritated: ['these people have no sense of humor', 'tough crowd', 'whatever'],
    },
  },
}

export function AutoComplete({ caption = true }: { caption?: boolean }) {
  const [scene, setScene] = useState<Scene>('read')
  const [state, setState] = useState<State>('anxious')
  const line = useArtStyle() !== 'collage'
  const [typed, setTyped] = useState('')
  const s = SCENES[scene]
  const chips = s.fill[state]
  const pick = chips[1]

  // type the middle suggestion into the field, like the phone picked it for you
  useEffect(() => {
    setTyped('')
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(pick.slice(0, i))
      if (i >= pick.length) clearInterval(t)
    }, 38)
    return () => clearInterval(t)
  }, [pick])

  const color = STATES[state].color

  return (
    <figure className="my-12 md:my-16">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Toggle
          label="Energy state"
          value={state}
          onChange={setState}
          options={(Object.keys(STATES) as State[]).map((k) => ({ value: k, label: STATES[k].label, color: STATES[k].color }))}
        />
      </div>

      <div className={`rounded-3xl border ${line ? 'bg-[#faf9f7]' : 'bg-[#f5f0e6]'} p-4 sm:p-8 grid md:grid-cols-[minmax(0,320px)_1fr] gap-6 md:gap-10 items-center`}>
        {/* the phone */}
        <div className={`mx-auto w-full max-w-[320px] rounded-[2.2rem] p-2.5 ${line ? 'bg-white border-[1.5px] border-[#34323a] shadow-[0_0_40px_rgba(185,162,240,0.35)]' : 'bg-[#1f1d1a] shadow-[3px_5px_0_rgba(31,29,26,0.18)] rotate-[-1.2deg]'}`}>
          <div className="rounded-[1.8rem] bg-[#fffaf0] overflow-hidden">
            <div className="flex gap-1 p-2 border-b border-black/5" role="tablist" aria-label="Situation">
              {(Object.keys(SCENES) as Scene[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={k === scene}
                  onClick={() => setScene(k)}
                  className={`flex-1 rounded-full px-2 py-1.5 text-[12px] transition-colors ${k === scene ? 'bg-[#1f1d1a] text-white' : 'text-black/60 hover:text-black'}`}
                >
                  {SCENES[k].tab}
                </button>
              ))}
            </div>
            <div className="px-4 pt-5 pb-4 min-h-[150px]">
              <div className="text-[11px] uppercase tracking-widest text-black/40">What you actually know</div>
              <p className="mt-1.5 text-[14px] leading-snug text-black/80">{s.known}</p>
            </div>
            <div className="px-3 pb-3">
              <div className="rounded-2xl bg-white border border-black/10 px-3.5 py-3 text-[15px] leading-snug min-h-[72px]">
                <span className="text-black/55">{s.prompt} </span>
                <span style={{ color, transition: 'color 400ms' }} className="font-medium">
                  {typed}
                </span>
                <span className="inline-block w-[2px] h-[1.05em] align-[-2px] ml-px bg-[#2f5bd3] animate-pulse" />
              </div>
            </div>
            {/* the autocomplete bar */}
            <div className="grid grid-cols-3 border-t border-black/10 bg-[#ece4d4] text-[12.5px] leading-tight">
              {chips.map((c, i) => (
                <div
                  key={c}
                  className={`px-1.5 py-3 text-center ${i === 1 ? 'font-semibold' : 'text-black/65'} ${i > 0 ? 'border-l border-black/10' : ''}`}
                  style={i === 1 ? { color, transition: 'color 400ms' } : undefined}
                >
                  {c}
                </div>
              ))}
            </div>
            <div className="h-24 bg-[#ece4d4] grid grid-cols-10 gap-1 px-2 pb-3 pt-1" aria-hidden>
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="rounded-[5px] bg-[#fffaf0] shadow-[0_1px_0_rgba(0,0,0,0.12)]" />
              ))}
            </div>
          </div>
        </div>

        {/* the point */}
        <div className="text-[16px] leading-relaxed space-y-4">
          <p className="font-display text-2xl leading-snug">I call this Thoughtocomplete™.</p>
          <p>
            Autocomplete is the way we anticipate things happening. Your Thoughtocomplete could be positive or negative, and
            mostly it’s unconscious.
          </p>
          <p className="text-muted-foreground">
            Same facts every time. Change the energy state and the suggestions change. Usually the mind picks one before you
            even notice there was a blank.
          </p>
          <blockquote className="border-l-2 pl-4" style={{ borderColor: color }}>
            “Negative ToC is anxiety. It doesn’t lead to anxiety, it is it.”
          </blockquote>
        </div>
      </div>
      {caption && (
      <figcaption className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Pessimism is just filling in the blanks negatively, and optimism is filling in the blanks positively. And if you really don’t
        know, you may as well think positive.
      </figcaption>
      )}
    </figure>
  )
}
