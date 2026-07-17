'use client'

import { useEffect, useRef, useState } from 'react'
import { Figure } from './Figure'
import { Beam } from './Beam'
import {
  STAGES,
  TARGET_LABELS,
  STATE_LABELS,
  STATE_COLORS,
  AURA_LABELS,
  STATE_STORY,
  ZONE_DESCRIPTORS,
  MODE_NAMES,
  DAY_PANELS,
  THINNING_TAGS,
  type TargetKey,
  type StateKey,
} from './content'

const STAGE_COUNT = STAGES.length
const THINKER = { cx: 310, cy: 240 }
const TARGET_POS = { cx: 630, cy: 240 }

function AuraLabels({ labels, cx, cy, dim }: { labels: string[]; cx: number; cy: number; dim?: boolean }) {
  const radius = 54
  return (
    <>
      {labels.map((l, i) => {
        const angle = (i / labels.length) * Math.PI * 2 - Math.PI / 2
        const x = cx + Math.cos(angle) * radius
        const y = cy + Math.sin(angle) * radius
        return (
          <text
            key={l}
            x={x}
            y={y}
            textAnchor="middle"
            className="fill-foreground/75"
            style={{ font: '400 10px var(--font-sans)', opacity: dim ? 0.35 : 1, transition: 'opacity 500ms ease' }}
          >
            {l}
          </text>
        )
      })}
    </>
  )
}

function TargetShape({ cx, cy, color, opacity = 0, label }: { cx: number; cy: number; color?: string; opacity?: number; label?: string }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={30}
        fill={color ?? 'var(--muted)'}
        opacity={color ? Math.max(opacity, 0.35) : 0.5}
        style={{ transition: 'all 600ms ease' }}
      />
      <circle cx={cx} cy={cy} r={30} fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={1} />
      {label && (
        <text x={cx} y={cy + 50} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 10px var(--font-sans)' }}>
          {label}
        </text>
      )}
    </g>
  )
}

function StageVisual({
  index,
  target,
  setTarget,
  activeState,
  setActiveState,
}: {
  index: number
  target: TargetKey
  setTarget: (t: TargetKey) => void
  activeState: StateKey
  setActiveState: (s: StateKey) => void
}) {
  const aura = AURA_LABELS[target]
  const stateColor = STATE_COLORS[activeState]
  const zd = ZONE_DESCRIPTORS[activeState]

  // Stage 1 — a person and a target (mirror if target === 'me')
  if (index === 0) {
    return (
      <>
        <Figure cx={THINKER.cx} cy={THINKER.cy} />
        {target === 'me' ? (
          <Figure cx={TARGET_POS.cx} cy={TARGET_POS.cy} mirrored />
        ) : (
          <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} label={TARGET_LABELS[target]} />
        )}
        <text x={THINKER.cx} y={THINKER.cy + 96} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 10px var(--font-sans)' }}>
          the thinker
        </text>
        {target !== 'me' && (
          <text x={TARGET_POS.cx} y={TARGET_POS.cy - 46} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 10px var(--font-sans)' }}>
            the target
          </text>
        )}
      </>
    )
  }

  // Stage 2 — thinking begins: particles + aura forming
  if (index === 1) {
    return (
      <>
        <Figure cx={THINKER.cx} cy={THINKER.cy} zones={{ head: { active: true, color: 'var(--accent-violet)' } }} />
        <line
          x1={THINKER.cx + 40}
          y1={THINKER.cy - 58}
          x2={TARGET_POS.cx - 30}
          y2={TARGET_POS.cy}
          stroke="var(--accent-violet)"
          strokeOpacity={0.4}
          strokeDasharray="1 5"
          strokeWidth={1.5}
        />
        <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} />
        <AuraLabels labels={aura} cx={TARGET_POS.cx} cy={TARGET_POS.cy} />
        <text x={THINKER.cx} y={THINKER.cy - 100} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          narrative
        </text>
        <text x={TARGET_POS.cx} y={TARGET_POS.cy - 70} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          what the mind adds
        </text>
      </>
    )
  }

  // Stage 3 — the aura sticks: the cone / Saran Wrap
  if (index === 2) {
    return (
      <>
        <Beam
          originX={THINKER.cx + 6}
          originY={THINKER.cy - 58}
          targetX={TARGET_POS.cx}
          targetY={TARGET_POS.cy}
          color="var(--accent-violet)"
          opacity={0.28}
        />
        <Figure cx={THINKER.cx} cy={THINKER.cy} zones={{ head: { active: true, color: 'var(--accent-violet)' } }} />
        <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} color="var(--accent-violet)" opacity={0.3} />
        <AuraLabels labels={aura} cx={TARGET_POS.cx} cy={TARGET_POS.cy} />
        <text x={(THINKER.cx + TARGET_POS.cx) / 2} y={THINKER.cy - 90} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          Saran Wrap
        </text>
        <text x={TARGET_POS.cx} y={TARGET_POS.cy - 70} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          feels like reality now
        </text>
        <text x={THINKER.cx + 14} y={THINKER.cy - 76} className="fill-muted-foreground" style={{ font: '400 9px var(--font-sans)' }}>
          projected from here
        </text>
      </>
    )
  }

  // Stage 4 — state selects the story (illustrated with "My Partner")
  if (index === 3) {
    const storyLines = STATE_STORY[activeState]
    return (
      <>
        <Beam originX={THINKER.cx + 6} originY={THINKER.cy - 58} targetX={TARGET_POS.cx} targetY={TARGET_POS.cy} color={stateColor} opacity={0.32} />
        <Figure cx={THINKER.cx} cy={THINKER.cy} zones={{ head: { active: true, color: stateColor }, chest: { active: true, color: stateColor } }} />
        <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} color={stateColor} opacity={0.35} label="My Partner" />
        <AuraLabels labels={storyLines} cx={TARGET_POS.cx} cy={TARGET_POS.cy} />
        <text x={TARGET_POS.cx} y={TARGET_POS.cy - 70} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          same target
        </text>
        <text x={(THINKER.cx + TARGET_POS.cx) / 2} y={THINKER.cy - 90} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          different wrap
        </text>
        <text x={THINKER.cx} y={THINKER.cy - 34} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          energy state
        </text>
      </>
    )
  }

  // Stage 5 — the body was in it the whole time
  if (index === 4) {
    return (
      <>
        <Beam originX={THINKER.cx + 6} originY={THINKER.cy - 58} targetX={TARGET_POS.cx} targetY={TARGET_POS.cy} color={stateColor} opacity={0.28} />
        <Figure
          cx={THINKER.cx}
          cy={THINKER.cy}
          actionLabel={zd.action}
          zones={{
            head: { active: true, color: stateColor, label: 'narrative state', sublabel: zd.head },
            chest: { active: true, color: stateColor, label: 'energy state', sublabel: zd.chest },
            belly: { active: true, color: stateColor, label: 'body state', sublabel: zd.belly },
          }}
        />
        <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} color={stateColor} opacity={0.3} label="My Partner" />
      </>
    )
  }

  // Stage 6 — when it repeats, it's a mode
  if (index === 5) {
    return (
      <>
        <Figure
          cx={THINKER.cx}
          cy={THINKER.cy}
          actionLabel={zd.action}
          showConnectors
          nameplate={MODE_NAMES[activeState]}
          zones={{
            head: { active: true, color: stateColor, label: 'narrative', sublabel: zd.head },
            chest: { active: true, color: stateColor, label: 'energy', sublabel: zd.chest },
            belly: { active: true, color: stateColor, label: 'body', sublabel: zd.belly },
          }}
        />
      </>
    )
  }

  // Stage 7 — a day is a sequence of modes (filmstrip)
  if (index === 6 || index === 7) {
    const wash = index === 7
    const positions = [-2, -1, 0, 1, 2]
    return (
      <>
        {positions.map((p) => {
          const cx = 450 + p * 150
          if (p === 0) {
            return (
              <g key="now">
                <Figure cx={cx} cy={210} scale={0.62} nameplate={MODE_NAMES[activeState]} zones={{ head: { active: true, color: stateColor }, chest: { active: true, color: stateColor }, belly: { active: true, color: stateColor } }} />
                <text x={cx} y={95} textAnchor="middle" className="fill-muted-foreground" style={{ font: '500 9px var(--font-sans)' }}>now</text>
              </g>
            )
          }
          const panel = DAY_PANELS[p < 0 ? p + 2 : p + 1]
          return (
            <g key={panel.context}>
              <rect x={cx - 58} y={130} width={116} height={155} rx={14} fill="var(--card)" stroke="currentColor" strokeOpacity={0.15} />
              {wash && <rect x={cx - 58} y={130} width={116} height={155} rx={14} fill={stateColor} opacity={0.22} />}
              <text x={cx} y={95} textAnchor="middle" className="fill-muted-foreground" style={{ font: '500 9px var(--font-sans)' }}>{panel.context}</text>
              <text x={cx} y={155} textAnchor="middle" className="fill-foreground" style={{ font: '600 11px var(--font-sans)' }}>{panel.mode}</text>
              <text x={cx} y={180} textAnchor="middle" className="fill-foreground/70" style={{ font: '400 9px var(--font-sans)' }}>&ldquo;{panel.narrative}&rdquo;</text>
              <text x={cx} y={222} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 9px var(--font-sans)' }}>{panel.body}</text>
              <text x={cx} y={260} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 9px var(--font-sans)' }}>{panel.action}</text>
            </g>
          )
        })}
        {wash && (
          <text x={450} y={55} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
            dominant state
          </text>
        )}
      </>
    )
  }

  // Stage 9 — two people, one event
  if (index === 8) {
    const herColor = 'var(--accent-pink)'
    const hisColor = 'var(--accent-blue)'
    const eventX = 450
    return (
      <>
        <Beam originX={260 + 6} originY={260 - 58} targetX={eventX} targetY={260} color={herColor} opacity={0.22} width={90} />
        <Beam originX={640 - 6} originY={260 - 58} targetX={eventX} targetY={260} color={hisColor} opacity={0.22} width={90} />
        <Figure cx={260} cy={260} zones={{ head: { active: true, color: herColor } }} />
        <Figure cx={640} cy={260} mirrored zones={{ head: { active: true, color: hisColor } }} />
        <TargetShape cx={eventX} cy={260} label="what actually happened — a disagreement" />
        <AuraLabels labels={['dismissed', 'doesn’t listen', 'always']} cx={eventX} cy={215} dim />
        <AuraLabels labels={['ambushed', 'nothing’s ever enough', 'unfair']} cx={eventX} cy={305} dim />
        <text x={260} y={150} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>her wrap</text>
        <text x={640} y={150} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>his wrap</text>
      </>
    )
  }

  // Stage 10 — lock
  if (index === 9) {
    const herColor = 'var(--accent-pink)'
    const hisColor = 'var(--accent-blue)'
    const eventX = 450
    return (
      <>
        <Beam originX={266} originY={202} targetX={eventX} targetY={260} color={herColor} opacity={0.4} width={90} locked reverseWrap />
        <Beam originX={634} originY={202} targetX={eventX} targetY={260} color={hisColor} opacity={0.4} width={90} locked reverseWrap />
        <Figure cx={260} cy={260} zones={{ head: { active: true, color: herColor } }} />
        <Figure cx={640} cy={260} mirrored zones={{ head: { active: true, color: hisColor } }} />
        <text x={eventX} y={264} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 9px var(--font-sans)' }}>
          the event is gone now
        </text>
        <text x={450} y={130} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          narrative lock
        </text>
      </>
    )
  }

  // Stage 11 — the thinning
  if (index === 10) {
    return (
      <>
        <Beam originX={THINKER.cx + 6} originY={THINKER.cy - 58} targetX={TARGET_POS.cx} targetY={TARGET_POS.cy} color="var(--accent-violet)" opacity={0.12} width={40} />
        <Figure cx={THINKER.cx} cy={THINKER.cy} zones={{ head: { color: 'var(--accent-violet)' }, chest: { color: 'var(--accent-violet)' }, belly: { color: 'var(--accent-violet)', label: 'body', sublabel: 'slow breath · shoulders down' } }} />
        <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} color="var(--accent-violet)" opacity={0.1} />
        <g>
          {THINNING_TAGS.map((t, i) => (
            <text
              key={t}
              x={TARGET_POS.cx}
              y={TARGET_POS.cy - 60 + i * 14}
              textAnchor="middle"
              className="fill-muted-foreground"
              style={{ font: '400 9px var(--font-sans)', opacity: 0.5 }}
            >
              {t}
            </text>
          ))}
        </g>
        <text x={(THINKER.cx + TARGET_POS.cx) / 2} y={THINKER.cy - 100} textAnchor="middle" className="fill-foreground/70" style={{ font: '500 10px var(--font-sans)' }}>
          thinner
        </text>
        <text x={THINKER.cx} y={THINKER.cy + 96} textAnchor="middle" className="fill-muted-foreground" style={{ font: '400 10px var(--font-sans)' }}>
          more room
        </text>
      </>
    )
  }

  // Stage 12 — the bare slice
  return (
    <>
      <Figure cx={THINKER.cx} cy={THINKER.cy} />
      <TargetShape cx={TARGET_POS.cx} cy={TARGET_POS.cy} />
    </>
  )
}

function StateSelector({ active, onChange }: { active: StateKey; onChange: (s: StateKey) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(Object.keys(STATE_LABELS) as StateKey[]).map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={`rounded-full border px-3 py-1.5 text-xs transition ${
            active === k ? 'bg-foreground text-background border-foreground' : 'bg-card hover:border-foreground/40'
          }`}
        >
          {STATE_LABELS[k]}
        </button>
      ))}
    </div>
  )
}

function TargetSelector({ active, onChange }: { active: TargetKey; onChange: (t: TargetKey) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {(Object.keys(TARGET_LABELS) as TargetKey[]).map((k) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={`rounded-full border px-3 py-1.5 text-xs transition ${
            active === k ? 'bg-foreground text-background border-foreground' : 'bg-card hover:border-foreground/40'
          }`}
        >
          {TARGET_LABELS[k]}
        </button>
      ))}
    </div>
  )
}

const TRIGGER_FRACTION = 0.5

export function ScrollStory() {
  const blockRefs = useRef<Array<HTMLDivElement | null>>([])
  const [stageIndex, setStageIndex] = useState(0)
  const [target, setTarget] = useState<TargetKey>('partner')
  const [activeState, setActiveState] = useState<StateKey>('fearful')

  useEffect(() => {
    let raf = 0
    function measure() {
      raf = 0
      const triggerY = window.innerHeight * TRIGGER_FRACTION
      let active = 0
      blockRefs.current.forEach((el, i) => {
        if (!el) return
        if (el.getBoundingClientRect().top <= triggerY) active = i
      })
      setStageIndex(active)
    }
    function onScroll() {
      if (raf) return
      raf = requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    measure()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  function goToStage(idx: number) {
    const el = blockRefs.current[idx]
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * TRIGGER_FRACTION + 12
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left column: normal document flow — this is what drives the diagram */}
        <div className="lg:col-span-5">
          {STAGES.map((stage, i) => {
            const active = i === stageIndex
            const showTargetSelector = i === 0
            const showStateSelector = i >= 3 && i <= 7
            return (
              <div
                key={i}
                ref={(el) => {
                  blockRefs.current[i] = el
                }}
                className="min-h-[70vh] lg:min-h-[85vh] flex flex-col justify-center py-10"
              >
                <div
                  className="transition-opacity duration-500"
                  style={{ opacity: active ? 1 : 0.4 }}
                >
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Stage {i + 1} / {STAGE_COUNT}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight">{stage.heading}</h3>
                  <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {stage.copy}
                  </p>
                  {showTargetSelector && (
                    <div className="mt-6">
                      <TargetSelector active={target} onChange={setTarget} />
                    </div>
                  )}
                  {showStateSelector && (
                    <div className="mt-6">
                      <StateSelector active={activeState} onChange={setActiveState} />
                    </div>
                  )}
                </div>

                {/* mobile/tablet: sticky side-by-side doesn't work below lg, so each stage
                    carries its own inline diagram instead — this is also the tap-through card */}
                <div
                  className="lg:hidden mt-8 relative rounded-3xl border bg-card overflow-hidden"
                  style={{ aspectRatio: '16 / 10' }}
                >
                  <svg viewBox="0 0 900 500" className="absolute inset-0 w-full h-full">
                    <StageVisual
                      index={i}
                      target={target}
                      setTarget={setTarget}
                      activeState={activeState}
                      setActiveState={setActiveState}
                    />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right column: sticky illustration, desktop only */}
        <div className="hidden lg:block lg:col-span-7">
          <div className="sticky top-28">
            <div className="relative rounded-3xl border bg-card overflow-hidden" style={{ aspectRatio: '16 / 10' }}>
              <svg viewBox="0 0 900 500" className="absolute inset-0 w-full h-full">
                <StageVisual
                  index={stageIndex}
                  target={target}
                  setTarget={setTarget}
                  activeState={activeState}
                  setActiveState={setActiveState}
                />
              </svg>

              {/* progress dots */}
              <div className="absolute top-5 right-6 flex gap-1.5">
                {STAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToStage(i)}
                    aria-label={`Go to stage ${i + 1}`}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === stageIndex ? 18 : 6,
                      background: i === stageIndex ? 'var(--foreground)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
