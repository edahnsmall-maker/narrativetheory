'use client'

import { useId, useState } from 'react'
import { C, Defs, Figure, Paper, Person, Scrap } from '@/components/home2/collage'

/**
 * Layers of Saran Wrap, from Edahn's notes (Apple Notes, "Layers of Saran"):
 * visual identity as a thing, name, visceral reaction (yuck / yum / meh),
 * then history and story-and-evidence. Peel them off one at a time.
 */
const LAYERS = [
  { name: 'Story and evidence', says: 'He always does this. Remember the email?', color: C.tomato },
  { name: 'History', says: 'That meeting in March. He talked over me.', color: '#d98a12' },
  { name: 'Yuck, yum or meh', says: 'Ugh.', color: C.mustard },
  { name: 'A name', says: 'Dave from accounting.', color: C.teal },
  { name: 'A thing, separate', says: 'A person. Over there. Not me.', color: '#6f6bd8' },
]

const INNER = { x: 300, y: 250, w: 170, h: 240 }
const TAG_X = 580
const STEP = 22

export function PeelWrap() {
  const id = useId().replace(/:/g, '')
  // how many layers have been peeled off (outermost first)
  const [peeled, setPeeled] = useState(0)
  const done = peeled >= LAYERS.length

  return (
    <Figure
      label="A coworker wrapped in five layers of Saran Wrap; each click peels one off"
      controls={
        <>
          <button
            type="button"
            onClick={() => setPeeled((p) => Math.min(LAYERS.length, p + 1))}
            disabled={done}
            className="rounded-full bg-foreground text-background px-4 py-2 text-sm disabled:opacity-40"
          >
            {peeled === 0 ? 'Peel a layer' : done ? 'Nothing left to peel' : 'Peel the next one'}
          </button>
          <button
            type="button"
            onClick={() => setPeeled(0)}
            disabled={peeled === 0}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground disabled:opacity-40 disabled:no-underline"
          >
            Wrap him back up
          </button>
          <span className="text-xs text-muted-foreground tabular-nums">
            {LAYERS.length - peeled} of {LAYERS.length} layers on
          </span>
        </>
      }
      mobile={
        <ol className="space-y-1 font-mono text-[14px]">
          {LAYERS.map((l, i) => (
            <li key={l.name} className={i < peeled ? 'line-through text-muted-foreground/60' : ''}>
              <span className="text-muted-foreground">{l.name}: </span>
              {l.says}
            </li>
          ))}
          {done && <li className="pt-1">Shapes, color, light. Someone breathing.</li>}
        </ol>
      }
      caption={
        done
          ? 'What’s left is just this: shapes, color, light, someone breathing. He didn’t change at any point. Only the wrap did.'
          : 'The outer layers are the obvious ones: the story and the evidence for it. The deepest layers, the name and the sense of a separate thing, are so thin you’d never think to call them a story.'
      }
    >
      <svg viewBox="0 0 960 600" className="block w-full h-auto">
        <Defs id={id} />
        <Paper id={id} w={960} h={600} color={done ? '#f3efe4' : '#efe9dd'} />
        <Scrap id={id} d="M0,560 H960 V600 H0 Z" fill={C.paper2} pattern="dots" />
        <Scrap id={id} d="M40,70 C120,40 220,60 250,110 C270,150 170,180 100,160 C50,146 10,110 40,70 Z" fill="#fff" opacity={0.5} pattern="dots-lg" />

        {/* a desk, so he's at work */}
        <g transform="translate(-95 0)">
        <g filter={`url(#${id}-cut)`}>
          <rect x="360" y="470" width="240" height="22" rx="4" fill={C.hair2} />
          <rect x="372" y="492" width="14" height="68" fill={C.hair2} />
          <rect x="574" y="492" width="14" height="68" fill={C.hair2} />
          <rect x="520" y="446" width="26" height="26" rx="3" fill={C.cream} />
        </g>
        <path d="M546,452 q12,0 12,9 q0,9 -12,9" stroke={C.cream} strokeWidth="4" fill="none" />

        {/* the coworker: the same the whole time */}
        <Person id={id} x={480} y={470} s={1.55} skin={C.skin2} hair={C.hair1} hairStyle="short" shirt={C.sage} expr="flat" look={-1} />
        </g>

        {/* you, over on the left */}
        <Person id={id} x={110} y={560} s={1.2} skin={C.skin1} hair={C.hair2} hairStyle="curly" shirt={C.cobalt} expr="flat" look={1} />
        <text x="110" y="590" textAnchor="middle" fontSize="12" letterSpacing="2" fill={C.ink} opacity="0.55" fontFamily="Inter, sans-serif">
          YOU
        </text>

        {/* the layers, innermost last so the outer ones sit on top */}
        {LAYERS.map((l, i) => {
          const grow = (LAYERS.length - 1 - i) * STEP
          const x = INNER.x - grow
          const y = INNER.y - grow
          const w = INNER.w + grow * 2
          const h = INNER.h + grow * 2
          const gone = i < peeled
          const tagW = Math.max(l.says.length * 8, l.name.length * 8.5) + 26
          const ty = 190 + i * 62
          return (
            <g
              key={l.name}
              style={{
                opacity: gone ? 0 : 1,
                transformBox: 'view-box',
                transformOrigin: `${x + w}px ${y}px`,
                transform: gone ? 'translate(70px,-60px) rotate(9deg) scale(0.96)' : 'none',
                transition: 'transform 650ms cubic-bezier(.2,.8,.2,1), opacity 550ms ease',
                pointerEvents: 'none',
              }}
            >
              <rect x={x} y={y} width={w} height={h} rx={28} fill={l.color} opacity="0.13" />
              <rect x={x} y={y} width={w} height={h} rx={28} fill={`url(#${id}-gloss)`} opacity="0.45" />
              <rect x={x} y={y} width={w} height={h} rx={28} fill="none" stroke={l.color} strokeWidth="2" opacity="0.7" />
              <path d={`M${x + 16},${y + 22} q${w * 0.18},-14 ${w * 0.38},-5`} stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
              {/* leader line from the layer's edge to its label */}
              <path d={`M${x + w},${ty} L${TAG_X},${ty}`} stroke={l.color} strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
              <circle cx={x + w} cy={ty} r="4" fill={l.color} />
              {/* the label, in a column on the right */}
              <g transform={`translate(${TAG_X},${ty}) rotate(${i % 2 ? 1.2 : -1.2})`} filter={`url(#${id}-cut)`}>
                <rect x="0" y="-20" width={tagW} height="44" fill={C.cream} />
                <rect x="0" y="-20" width="6" height="44" fill={l.color} />
                <text x="14" y="-4" fontSize="11" letterSpacing="1.5" fill={C.ink} opacity="0.55" fontFamily="Inter, sans-serif">
                  {l.name.toUpperCase()}
                </text>
                <text x="14" y="15" fontSize="13" fill={C.ink} fontFamily="'Courier New', ui-monospace, monospace" fontWeight="600">
                  {l.says}
                </text>
              </g>
            </g>
          )
        })}

        {done && (
          <g style={{ animation: 'nt-appear 700ms ease both' }}>
            <text x="600" y="300" fontSize="20" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
              Shapes. Color. Light.
            </text>
            <text x="600" y="328" fontSize="20" fill={C.ink} fontFamily="Bricolage Grotesque, Georgia, serif">
              Someone breathing.
            </text>
          </g>
        )}
      </svg>
    </Figure>
  )
}
