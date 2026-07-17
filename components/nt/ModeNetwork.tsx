'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { families } from '@/lib/data/families'
import { modes } from '@/lib/data/modes'

const W = 900, H = 640

export function ModeNetwork() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)

  const layout = useMemo(() => {
    const cx = W / 2, cy = H / 2
    const famRadius = 220
    const center = families.find((f) => f.name === 'Natural Function / Being')
    const ring = families.filter((f) => f.name !== 'Natural Function / Being')
    const famPositions = [
      ...(center ? [{ ...center, x: cx, y: cy, isCenter: true }] : []),
      ...ring.map((f, i) => {
        const a = (i / ring.length) * Math.PI * 2 - Math.PI / 2
        return { ...f, x: cx + Math.cos(a) * famRadius, y: cy + Math.sin(a) * famRadius, isCenter: false }
      }),
    ]
    const modePositions = modes.map((m) => {
      const fam = famPositions.find((f) => f.name === m.family) ?? famPositions[0]
      const siblings = modes.filter((x) => x.family === m.family)
      const idx = Math.max(0, siblings.findIndex((x) => x.slug === m.slug))
      const count = Math.max(1, siblings.length)
      const a = (idx / count) * Math.PI * 2
      const r = (fam.isCenter ? 55 : 78) + (idx % 2) * 22
      return { ...m, x: fam.x + Math.cos(a) * r, y: fam.y + Math.sin(a) * r }
    })
    return { famPositions, modePositions }
  }, [])

  const focusMode = modes.find((m) => m.slug === selected)

  return (
    <div className="relative rounded-3xl border bg-card overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block">
        {layout.modePositions.map((m) => {
          const fam = layout.famPositions.find((f) => f.name === m.family)!
          const active = hovered === m.slug || selected === m.slug
          return (
            <line key={`e-${m.slug}`} x1={fam.x} y1={fam.y} x2={m.x} y2={m.y}
              stroke="currentColor" strokeOpacity={active ? 0.45 : 0.12} strokeWidth={active ? 1.2 : 0.6} />
          )
        })}
        {layout.famPositions.map((f) => (
          <g key={f.slug}>
            <circle cx={f.x} cy={f.y} r={f.isCenter ? 62 : 42}
              fill={`oklch(${f.isCenter ? '0.96' : '0.92'} 0.08 ${f.hue})`}
              stroke="currentColor" strokeOpacity={f.isCenter ? 0.45 : 0.25}
              strokeWidth={f.isCenter ? 1.2 : 1} />
            <text x={f.x} y={f.y - 2} textAnchor="middle" className="fill-foreground"
              style={{ font: `${f.isCenter ? 700 : 600} ${f.isCenter ? 13 : 11}px var(--font-display)` }}>
              {f.name.split(' / ')[0]}
            </text>
            <text x={f.x} y={f.y + (f.isCenter ? 14 : 12)} textAnchor="middle" className="fill-foreground/60"
              style={{ font: `400 ${f.isCenter ? 10 : 9}px var(--font-sans)` }}>
              {f.name.split(' / ')[1] ?? ''}
            </text>
          </g>
        ))}
        {layout.modePositions.map((m) => {
          const active = hovered === m.slug || selected === m.slug
          const fam = families.find((f) => f.name === m.family)!
          return (
            <g key={m.slug}
              onMouseEnter={() => setHovered(m.slug)}
              onMouseLeave={() => setHovered((h) => (h === m.slug ? null : h))}
              onClick={() => setSelected(m.slug)}
              style={{ cursor: 'pointer' }}>
              <circle cx={m.x} cy={m.y} r={14} fill="transparent" />
              <circle cx={m.x} cy={m.y} r={active ? 7 : 5}
                fill={`oklch(0.85 0.12 ${fam.hue})`}
                stroke="currentColor" strokeOpacity={active ? 0.7 : 0.3} strokeWidth={active ? 1.2 : 0.6}
                style={{ pointerEvents: 'none' }} />
              {active && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect x={m.x - (m.name.length * 3.4)} y={m.y - 26} width={m.name.length * 6.8} height={16} rx={4}
                    fill="var(--color-background)" stroke="currentColor" strokeOpacity={0.2} />
                  <text x={m.x} y={m.y - 15} textAnchor="middle" className="fill-foreground"
                    style={{ font: '500 11px var(--font-sans)' }}>
                    {m.name}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {focusMode && (
        <div className="absolute inset-x-3 bottom-3 md:inset-auto md:right-4 md:bottom-4 md:w-[22rem]
                        rounded-2xl border bg-background/95 backdrop-blur p-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {focusMode.family}
              </div>
              <div className="font-display text-lg leading-tight">{focusMode.name}</div>
              <div className="text-xs text-muted-foreground italic mt-0.5">{focusMode.tagline}</div>
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setSelected(null)} aria-label="Close">✕</button>
          </div>
          <dl className="mt-3 space-y-2 text-[12px] leading-snug">
            {[
              { label: 'Mind / Narrative', value: focusMode.saran, token: 'var(--nt-mind)' },
              { label: 'Body / Energy', value: focusMode.body, token: 'var(--nt-body)' },
              { label: 'Action / Behavior', value: focusMode.behaviors, token: 'var(--nt-action)' },
            ].map((row) => (
              <div key={row.label} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: row.token }} />
                <div className="flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{row.label}</div>
                  <div className="text-foreground/90">{row.value}</div>
                </div>
              </div>
            ))}
          </dl>
          <Link href={`/modes/${focusMode.slug}`}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium underline underline-offset-4">
            Open mode →
          </Link>
        </div>
      )}
    </div>
  )
}
