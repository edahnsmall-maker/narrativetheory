'use client'

import { useState } from 'react'
import Link from 'next/link'

type SpotNode = {
  id: string
  label: string
  slug: string
  oneLine: string
  mind: string
  body: string
  action: string
  x: number
  y: number
}

const NODES: SpotNode[] = [
  {
    id: 'anxious',
    label: 'Anxious Overthinking',
    slug: 'anxiety-mode',
    oneLine: 'The future becomes a threat object the mind keeps rehearsing.',
    mind: 'Me: not ready. Future: dangerous. World: unstable.',
    body: 'Tight chest, shallow breath, restless legs.',
    action: 'Plan, rehearse, check, seek reassurance.',
    x: 50, y: 4,
  },
  {
    id: 'combative',
    label: 'Combative',
    slug: 'fight-mode',
    oneLine: 'Win the frame, defend the self.',
    mind: 'Me: wronged. Them: offender. World: unfair.',
    body: 'Heat, pressure, forward lean, louder voice.',
    action: 'Attack, counter, interrupt, escalate.',
    x: 85, y: 20,
  },
  {
    id: 'perfectionist',
    label: 'Performance',
    slug: 'performance-mode',
    oneLine: 'Become the version they will approve of.',
    mind: 'Me: on stage. Them: audience. Situation: audition.',
    body: 'Face control, voice control, breath held.',
    action: 'Polish, redo, hide flaws, overprepare.',
    x: 96, y: 55,
  },
  {
    id: 'collapsed',
    label: 'Collapsed',
    slug: 'collapse-mode',
    oneLine: 'The system powers down. Future closes. Effort feels pointless.',
    mind: 'Me: unable. Future: closed. World: too much.',
    body: 'Heavy body, slow movement, low gaze.',
    action: 'Stop, sleep, isolate, avoid decisions.',
    x: 80, y: 88,
  },
  {
    id: 'avoidant',
    label: 'Avoidant',
    slug: 'avoidance-mode',
    oneLine: 'Do anything except the thing.',
    mind: 'Task: threatening. Future: pressure. Me: not ready.',
    body: 'Restlessness, drifting eyes, low-grade tension.',
    action: 'Delay, scroll, clean, snack, switch tasks.',
    x: 35, y: 96,
  },
  {
    id: 'pleaser',
    label: 'Pleaser',
    slug: 'appeasement-mode',
    oneLine: 'Keep the peace by shrinking.',
    mind: 'Me: risky if honest. Them: must be managed. World: conflict is dangerous.',
    body: 'Soft voice, collapsed posture, stomach tension.',
    action: 'Agree, soften, apologize quickly, hide needs.',
    x: 4, y: 70,
  },
  {
    id: 'detached',
    label: 'Detached',
    slug: 'disengagement-mode',
    oneLine: 'None of this matters.',
    mind: 'Me: done. World: pointless. Future: not worth effort.',
    body: 'Slack body, shrugging, emotional distance.',
    action: 'Quit, dismiss, shrug, drift.',
    x: 8, y: 30,
  },
  {
    id: 'protector',
    label: 'Angry Protector',
    slug: 'defense-mode',
    oneLine: 'Set the record straight. Protect the self from being misread.',
    mind: 'Me: misunderstood. Them: unfair. Situation: trial.',
    body: 'Tight jaw, quick speech, chest pressure.',
    action: 'Explain, argue, document, correct.',
    x: 25, y: 12,
  },
]

export function ModeSpotlight() {
  const [hoverId, setHoverId] = useState<string | null>(null)

  return (
    <div className="rounded-3xl border bg-card p-6 md:p-10">
      <div className="relative mx-auto" style={{ maxWidth: 760 }}>
        <div className="relative w-full" style={{ aspectRatio: '1 / 1' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {NODES.map((n) => (
              <line
                key={n.id}
                x1={50}
                y1={50}
                x2={n.x}
                y2={n.y}
                stroke="currentColor"
                strokeOpacity={hoverId === n.id ? 0.5 : 0.18}
                strokeWidth={0.4}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative">
              <div
                className="absolute -inset-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, var(--nt-state-calm) 0%, transparent 70%)',
                  opacity: 0.45,
                  filter: 'blur(18px)',
                }}
              />
              <div className="relative rounded-full border bg-card/95 backdrop-blur w-32 h-32 md:w-36 md:h-36 flex items-center justify-center text-center">
                <div className="font-display text-sm leading-tight px-4">Recurring Modes</div>
              </div>
            </div>
          </div>

          {NODES.map((n) => {
            const active = hoverId === n.id
            const leftSide = n.x < 50
            const topSide = n.y < 50
            return (
              <div
                key={n.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId((cur) => (cur === n.id ? null : cur))}
                onFocus={() => setHoverId(n.id)}
                onBlur={() => setHoverId((cur) => (cur === n.id ? null : cur))}
              >
                <Link
                  href={`/modes/${n.slug}`}
                  className={`block rounded-full border px-3 py-1.5 text-xs whitespace-nowrap transition shadow-sm ${
                    active
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-card hover:border-foreground/40 text-foreground'
                  }`}
                >
                  {n.label}
                </Link>

                {active && (
                  <div
                    className="absolute z-30 w-72 rounded-xl border bg-card shadow-lg p-4 pointer-events-none"
                    style={{
                      left: leftSide ? 'calc(100% + 12px)' : 'auto',
                      right: leftSide ? 'auto' : 'calc(100% + 12px)',
                      top: topSide ? '0' : 'auto',
                      bottom: topSide ? 'auto' : '0',
                    }}
                  >
                    <div className="font-display text-lg leading-tight">{n.label}</div>
                    <p className="mt-1 text-xs text-muted-foreground italic leading-snug">{n.oneLine}</p>
                    <dl className="mt-3 space-y-2 text-[12px] leading-snug">
                      {[
                        { label: 'Mind / Narrative', value: n.mind, token: 'var(--nt-mind)' },
                        { label: 'Body / Energy', value: n.body, token: 'var(--nt-body)' },
                        { label: 'Action / Behavior', value: n.action, token: 'var(--nt-action)' },
                      ].map((row) => (
                        <div key={row.label} className="flex gap-2">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ background: row.token }}
                          />
                          <div className="flex-1">
                            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
                              {row.label}
                            </div>
                            <div className="text-foreground/90">{row.value}</div>
                          </div>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        Hover a mode to see its pattern. Click to open the full page.
      </div>
    </div>
  )
}
