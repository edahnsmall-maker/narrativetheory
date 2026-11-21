'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap, Toggle } from './collage'

/**
 * The alien over the bar: sensors read thinking, body and action at once, and
 * notice they move together. Toggle between two modes to see all three change.
 */

type ModeKey = 'anger' | 'relaxing'

const MODES: Record<ModeKey, { label: string; color: string; narrative: string[]; body: string[]; action: string[]; expr: 'angry' | 'smile'; slump: number }> = {
  anger: {
    label: 'Anger mode',
    color: C.tomato,
    narrative: ['Black and white', 'Me vs. them', 'Victim / aggressor'],
    body: ['Shallow breathing', 'Intense, confrontational gaze', "Doesn't smile, doesn't laugh"],
    action: ['Slams things, makes noise', 'Interrupts, curses more', 'Louder, shorter sentences'],
    expr: 'angry',
    slump: 1,
  },
  relaxing: {
    label: 'Relaxing mode',
    color: C.teal,
    narrative: ['Loose, wandering', 'Things are fine', 'Curious about people'],
    body: ['Slow belly breathing', 'Soft eyes, easy smile', 'Shoulders down'],
    action: ['Sips, leans back', 'Listens, laughs', 'Talks slower, hedges more'],
    expr: 'smile',
    slump: 0,
  },
}

function Panel({ x, y, title, lines, color, id }: { x: number; y: number; title: string; lines: string[]; color: string; id: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g filter={`url(#${id}-cut)`}>
        <rect width="230" height="132" rx="10" fill={C.cream} />
        <rect width="230" height="30" rx="10" fill={color} style={{ transition: 'fill 500ms' }} />
        <rect y="20" width="230" height="10" fill={color} style={{ transition: 'fill 500ms' }} />
      </g>
      <text x="14" y="20" fontSize="13" letterSpacing="1.5" fill="#fff" fontFamily="Inter, sans-serif" fontWeight="600">
        {title}
      </text>
      {lines.map((l, i) => (
        <text key={i} x="14" y={56 + i * 26} fontSize="15" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
          {l}
        </text>
      ))}
    </g>
  )
}

export function ModeScene() {
  const id = useId().replace(/:/g, '')
  const [mode, setMode] = useState<ModeKey>('anger')
  const m = MODES[mode]

  return (
    <Figure
      label="An alien scanning a person at a bar and finding that their thinking, body and actions change together"
      controls={
        <Toggle
          label="Mode"
          value={mode}
          onChange={setMode}
          options={(Object.keys(MODES) as ModeKey[]).map((k) => ({ value: k, label: MODES[k].label, color: MODES[k].color }))}
        />
      }
      mobile={
        <dl className="grid gap-2">
          {[
            ['Narrative', m.narrative],
            ['Body', m.body],
            ['Action + speech', m.action],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k as string}</dt>
              <dd>{(v as string[]).join(' · ')}</dd>
            </div>
          ))}
        </dl>
      }
      caption="The alien's sensors read the head, the body and the behavior separately. What it notices is that they don't work independently. They work in unison. That package is a mode."
    >
      <svg viewBox="0 0 960 560" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={560} color="#2b2d3a" />
        {/* bar: back shelf, bottles, counter */}
        <Scrap id={id} d="M0,330 H960 V560 H0 Z" fill="#4a3b33" />
        <Scrap id={id} d="M0,310 H960 V345 H0 Z" fill="#7a5a44" />
        {[90, 130, 170, 790, 830, 870].map((x, i) => (
          <g key={x} filter={`url(#${id}-cut)`}>
            <rect x={x} y={190 + (i % 2) * 12} width="22" height={70 - (i % 2) * 12} rx="5" fill={[C.sage, C.mustard, C.tomato, C.sky, C.lavender, C.teal][i]} />
            <rect x={x + 7} y={176 + (i % 2) * 12} width="8" height="18" fill={[C.sage, C.mustard, C.tomato, C.sky, C.lavender, C.teal][i]} />
          </g>
        ))}
        <path d="M60,262 H210 M760,262 H910" stroke="#7a5a44" strokeWidth="6" />

        {/* the alien and its scan */}
        <polygon points="455,92 505,92 600,330 360,330" fill="#9be7c4" opacity="0.18" />
        <g filter={`url(#${id}-cut)`}>
          <ellipse cx="480" cy="86" rx="92" ry="22" fill="#b7bcc9" />
          <path d="M432,74 a48,40 0 0 1 96,0 z" fill="#9be7c4" opacity="0.9" />
          <circle cx="480" cy="58" r="12" fill="#6ccf9f" />
          <circle cx="476" cy="56" r="3" fill={C.ink} />
          <circle cx="486" cy="56" r="3" fill={C.ink} />
        </g>
        {[420, 455, 490, 525].map((x) => (
          <circle key={x} cx={x} cy="94" r="5" fill={C.mustard} />
        ))}

        {/* the person, with a drink */}
        <Person id={id} x={480} y={330} s={1.35} skin={C.skin1} hair={C.hair3} hairStyle="bun" shirt={m.color} expr={m.expr} look={0} slump={m.slump} />
        <g filter={`url(#${id}-cut)`}>
          <path d="M548,268 h30 l-4,44 h-22 z" fill={C.sky} opacity="0.9" />
          <rect x="551" y="276" width="24" height="10" fill={C.mustard} opacity="0.9" />
        </g>

        {/* scan readouts */}
        <Panel id={id} x={40} y={380} title="NARRATIVE" lines={m.narrative} color={m.color} />
        <Panel id={id} x={365} y={380} title="BODY" lines={m.body} color={m.color} />
        <Panel id={id} x={690} y={380} title="ACTION + SPEECH" lines={m.action} color={m.color} />
        <path d="M155,380 C200,330 360,340 420,300 M480,380 L480,340 M805,380 C760,330 600,340 540,300" stroke="#9be7c4" strokeWidth="2" strokeDasharray="4 6" fill="none" opacity="0.7" />
      </svg>
    </Figure>
  )
}
