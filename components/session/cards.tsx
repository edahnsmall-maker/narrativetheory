'use client'

import Link from 'next/link'
import { Camera, Sparkles, Bookmark, Footprints, CheckCircle2, Circle, Wind, ArrowRight } from 'lucide-react'
import type { Card } from '@/lib/types'

/**
 * Visual cards the guide places into a session. Shared by the session screen
 * and the notebook. `onAnswer` is only passed on the live session screen.
 */

export function CardView({
  card,
  onAnswer,
  compact = false,
}: {
  card: Card
  onAnswer?: (index: number) => void
  compact?: boolean
}) {
  switch (card.kind) {
    case 'split':
      return <SplitView card={card} />
    case 'mode':
      return <ModeView card={card} />
    case 'concept':
      return <ConceptView card={card} compact={compact} />
    case 'check':
      return <CheckView card={card} onAnswer={onAnswer} />
    case 'insight':
      return (
        <div className="nt-card border-l-4" style={{ borderLeftColor: 'var(--accent-violet)' }}>
          <Label icon={<Bookmark size={12} />} text="Saved to your notebook" />
          <p className="font-display text-xl leading-snug text-foreground">{card.text}</p>
        </div>
      )
    case 'practice':
      return (
        <div className="nt-card" style={{ background: 'color-mix(in oklab, var(--accent-yellow) 14%, var(--card))' }}>
          <Label icon={<Footprints size={12} />} text={`Try this · ${card.days === 1 ? 'today' : `for ${card.days} days`}`} />
          <p className="text-[16px] leading-relaxed text-foreground">{card.instruction}</p>
          {card.when && <p className="mt-2 text-sm text-muted-foreground">When: {card.when}</p>}
        </div>
      )
    case 'shift':
      return (
        <div className="nt-card nt-shift">
          <Label icon={<Wind size={12} />} text="The shift" />
          <p className="font-display text-xl leading-snug text-foreground">{card.text}</p>
        </div>
      )
    case 'summary':
      return (
        <div className="nt-card">
          <Label icon={<CheckCircle2 size={12} />} text="What you're taking with you" />
          <p className="text-[16px] leading-relaxed text-foreground mb-3">{card.summary}</p>
          <ul className="space-y-2">
            {card.takeaways.map((t, i) => (
              <li key={i} className="flex gap-2 text-[15px] text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full" style={{ background: 'var(--accent-violet)' }} />
                {t}
              </li>
            ))}
          </ul>
          {card.next && (
            <p className="mt-4 text-sm text-muted-foreground flex items-center gap-1">
              <ArrowRight size={13} /> Next: {card.next}
            </p>
          )}
        </div>
      )
  }
}

function Label({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
      {icon}
      {text}
    </div>
  )
}

function SplitView({ card }: { card: Extract<Card, { kind: 'split' }> }) {
  return (
    <div className="nt-card p-0 overflow-hidden">
      {card.title && <div className="px-5 pt-4 font-display text-lg text-foreground">{card.title}</div>}
      <div className="grid sm:grid-cols-2">
        <div className="p-5">
          <Label icon={<Camera size={12} />} text="What a camera would see" />
          <ul className="space-y-2">
            {card.events.map((e, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-foreground">{e}</li>
            ))}
          </ul>
        </div>
        <div className="p-5 nt-wrap-panel">
          <Label icon={<Sparkles size={12} />} text="What the mind added" />
          <ul className="space-y-2">
            {card.story.map((s, i) => (
              <li key={i} className="text-[15px] leading-relaxed text-foreground/90 italic">“{s}”</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const CHANNELS = [
  { key: 'narrative', letter: 'N', label: 'Narrative', color: 'var(--nt-mind)' },
  { key: 'body', letter: 'B', label: 'Body', color: 'var(--nt-body)' },
  { key: 'action', letter: 'A', label: 'Action', color: 'var(--nt-action)' },
  { key: 'energy', letter: 'E', label: 'Energy state', color: 'var(--nt-reality)' },
] as const

function ModeView({ card }: { card: Extract<Card, { kind: 'mode' }> }) {
  return (
    <div className="nt-card">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">A mode</div>
          <div className="font-display text-2xl text-foreground">{card.name}</div>
        </div>
        {card.saved && (
          <span className="chip">
            <Bookmark size={11} /> In your modes
          </span>
        )}
      </div>
      <div className="grid gap-2.5">
        {CHANNELS.map((c) => (
          <div key={c.key} className="grid grid-cols-[2rem_1fr] items-start gap-3">
            <span
              className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold text-white"
              style={{ background: c.color }}
              title={c.label}
            >
              {c.letter}
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{c.label}</div>
              <div className="text-[15px] leading-snug text-foreground">{card[c.key]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConceptView({ card, compact }: { card: Extract<Card, { kind: 'concept' }>; compact: boolean }) {
  return (
    <div className="nt-card">
      <Label icon={<Sparkles size={12} />} text="An idea from Narrative Theory" />
      <div className="font-display text-2xl text-foreground">{card.name}</div>
      <p className="mt-1 text-[15px] text-muted-foreground">{card.definition}</p>
      {card.inYourWords && (
        <div className="mt-4 rounded-xl px-4 py-3" style={{ background: 'color-mix(in oklab, var(--accent-violet) 7%, transparent)' }}>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">In your situation</div>
          <p className="text-[15px] leading-relaxed text-foreground">{card.inYourWords}</p>
        </div>
      )}
      {!compact && (
        <Link href={`/theory/concepts/${card.slug}`} target="_blank" className="mt-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
          Read more about {card.name}
        </Link>
      )}
    </div>
  )
}

function CheckView({ card, onAnswer }: { card: Extract<Card, { kind: 'check' }>; onAnswer?: (i: number) => void }) {
  const answered = card.chosen !== undefined
  return (
    <div className="nt-card">
      <Label icon={<Circle size={12} />} text="Quick check" />
      <p className="font-display text-lg leading-snug text-foreground mb-3">{card.question}</p>
      <div className="grid gap-2">
        {card.options.map((o, i) => {
          const isRight = i === card.answerIndex
          const isChosen = i === card.chosen
          const state = !answered ? '' : isRight ? 'nt-opt-right' : isChosen ? 'nt-opt-wrong' : 'opacity-60'
          return (
            <button
              key={i}
              type="button"
              disabled={answered || !onAnswer}
              onClick={() => onAnswer?.(i)}
              className={`nt-opt ${state}`}
            >
              {o}
            </button>
          )
        })}
      </div>
      {answered && <p className="mt-3 text-[15px] leading-relaxed text-foreground/90">{card.explanation}</p>}
    </div>
  )
}
