'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'

/**
 * The Narrative X-ray: Edahn's "way to do narrative analysis" (Apple Notes,
 * flagged "IMPORTANT!!!! Give this high importance") combined with his
 * five-question rubric (Narrative Notes) and his first question, "what's
 * actually happening? what are the events?"
 */

type XRayData = {
  id: string
  createdAt: string
  narrative: string
  events: string
  species: string[]
  intentions: string
  future: string
  judgments: string
  tone: string[]
  payoff: string
  repeats: '' | 'yes' | 'no' | 'not sure'
  modeName: string
  lock: number
  move: string[]
  care: string
}

const blank = (): XRayData => ({
  id: Math.random().toString(36).slice(2, 10),
  createdAt: new Date().toISOString(),
  narrative: '',
  events: '',
  species: [],
  intentions: '',
  future: '',
  judgments: '',
  tone: [],
  payoff: '',
  repeats: '',
  modeName: '',
  lock: 5,
  move: [],
  care: '',
})

const KEY = 'nt-xrays'
const SPECIES = ['Me', 'Someone else', 'A situation', 'A thing', 'A group', 'The future']
const TONES = ['Negative', 'Paranoid', 'Hopeless', 'Defensive', 'Superior', 'Resentful', 'Hopeful', 'Warm']
const PAYOFFS = ['I’m right and they’re wrong', 'I don’t have to risk anything', 'I won’t get blindsided', 'It’s familiar']
const MOVES = ['Challenge the Saran', 'Ignore it', 'Heal it', 'Just see it and let it pass']

function load(): XRayData[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}
function save(list: XRayData[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)))
  } catch {}
}

function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o)
        return (
          <button
            key={o}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${on ? 'bg-foreground text-background border-foreground' : 'hover:bg-accent'}`}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

function Area({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-2xl border bg-card px-4 py-3 text-[16px] leading-relaxed placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/15"
    />
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="block text-sm font-medium">{label}</span>
      {hint && <span className="block text-sm text-muted-foreground -mt-1">{hint}</span>}
      {children}
    </label>
  )
}

export function XRay() {
  const router = useRouter()
  const [d, setD] = useState<XRayData>(blank)
  const [step, setStep] = useState(0)
  const [past, setPast] = useState<XRayData[]>([])
  const [copied, setCopied] = useState(false)
  useEffect(() => setPast(load()), [])

  // keep the top of the worksheet in view when the step changes
  const topRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const el = topRef.current
    if (el && el.getBoundingClientRect().top < 64) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 80, behavior: 'smooth' })
  }, [step])

  const set = <K extends keyof XRayData>(k: K, v: XRayData[K]) => setD((x) => ({ ...x, [k]: v }))

  const steps: { title: string; sub?: string; body: ReactNode; ready: boolean }[] = [
    {
      title: 'What’s the narrative?',
      sub: 'The sentence your mind keeps saying about it. Write it the way it sounds in your head.',
      ready: d.narrative.trim().length > 3,
      body: <Area value={d.narrative} onChange={(v) => set('narrative', v)} placeholder="They haven’t texted back since Tuesday. They’re losing interest." />,
    },
    {
      title: 'What’s actually happening? What are the events?',
      sub: 'Only what a camera would have recorded. No motives, no meaning, no future.',
      ready: d.events.trim().length > 3,
      body: <Area value={d.events} onChange={(v) => set('events', v)} placeholder="I sent a message Tuesday night. No reply yet. It’s Thursday." />,
    },
    {
      title: 'Who’s it of?',
      sub: 'What species of narrative is it? Pick all that fit.',
      ready: d.species.length > 0,
      body: <Chips options={SPECIES} value={d.species} onChange={(v) => set('species', v)} />,
    },
    {
      title: 'What does it assume?',
      sub: 'This is usually where the Saran Wrap is. Skip any that don’t apply.',
      ready: !!(d.intentions || d.future || d.judgments),
      body: (
        <div className="space-y-5">
          <Field label="Intentions" hint="What it says someone meant.">
            <Area rows={2} value={d.intentions} onChange={(v) => set('intentions', v)} placeholder="They’re ignoring me on purpose." />
          </Field>
          <Field label="Future states" hint="What it says is going to happen.">
            <Area rows={2} value={d.future} onChange={(v) => set('future', v)} placeholder="This is going to end." />
          </Field>
          <Field label="Judgments and the scoring system" hint="What it says about worth, theirs or yours.">
            <Area rows={2} value={d.judgments} onChange={(v) => set('judgments', v)} placeholder="I’m not interesting enough." />
          </Field>
        </div>
      ),
    },
    {
      title: 'What’s the general tone?',
      sub: 'Is it negative? Paranoid?',
      ready: d.tone.length > 0,
      body: <Chips options={TONES} value={d.tone} onChange={(v) => set('tone', v)} />,
    },
    {
      title: 'What’s the payoff that holds it in place?',
      sub: 'In the moment, and later. Narratives stick around because they get you something.',
      ready: d.payoff.trim().length > 1,
      body: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {PAYOFFS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => set('payoff', d.payoff ? `${d.payoff}; ${p}` : p)}
                className="rounded-full border border-dashed px-3.5 py-1.5 text-sm hover:bg-accent"
              >
                + {p}
              </button>
            ))}
          </div>
          <Area value={d.payoff} onChange={(v) => set('payoff', v)} placeholder="If I decide it’s over, I can’t be hurt when it is." />
        </div>
      ),
    },
    {
      title: 'Is it a mode? Does it repeat?',
      sub: 'Have you been here before, with other people or in other rooms?',
      ready: d.repeats !== '',
      body: (
        <div className="space-y-5">
          <Chips
            options={['yes', 'no', 'not sure']}
            value={d.repeats ? [d.repeats] : []}
            onChange={(v) => set('repeats', (v.filter((x) => x !== d.repeats)[0] ?? '') as XRayData['repeats'])}
          />
          {d.repeats === 'yes' && (
            <Field label="Give it a name" hint="Serious, funny, ugly, whatever works. A good name makes you go: oh, this again.">
              <input
                value={d.modeName}
                onChange={(e) => set('modeName', e.target.value)}
                placeholder="Waiting-by-the-phone Mode"
                className="w-full rounded-2xl border bg-card px-4 py-3 text-[16px]"
              />
            </Field>
          )}
        </div>
      ),
    },
    {
      title: 'How locked in is it?',
      sub: 'Right now, how hard would it be to see this any other way?',
      ready: true,
      body: (
        <div>
          <input
            type="range"
            min={0}
            max={10}
            value={d.lock}
            onChange={(e) => set('lock', Number(e.target.value))}
            className="w-full accent-[#e0533d]"
            aria-label="How locked in the narrative is"
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Loose. I can already see other versions.</span>
            <span>Locked. Anything else sounds wrong.</span>
          </div>
          {d.lock >= 8 && (
            <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
              That’s narrative lock. It isn’t a reason to argue with it harder. Locks usually break on their own, with time, sleep, a walk,
              or new information.
            </p>
          )}
        </div>
      ),
    },
    {
      title: 'What do we do?',
      sub: 'Challenge the Saran? Ignore it? Heal it? Pick what feels right.',
      ready: true,
      body: (
        <div className="space-y-5">
          <Chips options={MOVES} value={d.move} onChange={(v) => set('move', v)} />
          <Field label="How can you help here, not from a position of ideology, but softness and care?">
            <Area value={d.care} onChange={(v) => set('care', v)} placeholder="Stop checking my phone tonight. Text them something easy tomorrow." />
          </Field>
        </div>
      ),
    },
  ]

  const finished = step >= steps.length
  const cur = steps[step]

  const finish = () => {
    const list = [d, ...past.filter((p) => p.id !== d.id)]
    setPast(list)
    save(list)
    setStep(steps.length)
  }

  const asText = (x: XRayData) =>
    [
      `NARRATIVE X-RAY (${new Date(x.createdAt).toLocaleDateString()})`,
      `The narrative: ${x.narrative}`,
      `What actually happened: ${x.events}`,
      `It's of: ${x.species.join(', ')}`,
      x.intentions && `Assumed intentions: ${x.intentions}`,
      x.future && `Assumed future: ${x.future}`,
      x.judgments && `Judgments / scoring: ${x.judgments}`,
      `Tone: ${x.tone.join(', ')}`,
      `Payoff: ${x.payoff}`,
      `Repeats: ${x.repeats}${x.modeName ? ` (${x.modeName})` : ''}`,
      `Lock: ${x.lock}/10`,
      x.move.length > 0 && `What to do: ${x.move.join(', ')}`,
      x.care && `With care: ${x.care}`,
    ]
      .filter(Boolean)
      .join('\n')

  const toGuide = () => {
    try {
      sessionStorage.setItem('nt-situation-prefill', `${d.events}\n\nWhat my mind says: ${d.narrative}`)
    } catch {}
    router.push('/situation')
  }

  if (finished) {
    return (
      <div ref={topRef} className="space-y-10">
        <XRayCard x={d} />
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(asText(d)).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 1800)
              })
            }}
            className="rounded-full border px-4 py-2 text-sm hover:bg-accent"
          >
            {copied ? 'Copied' : 'Copy as text'}
          </button>
          <button type="button" onClick={toGuide} className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
            Talk it through with the guide →
          </button>
          <button
            type="button"
            onClick={() => {
              setD(blank())
              setStep(0)
            }}
            className="rounded-full bg-foreground text-background px-4 py-2 text-sm"
          >
            Do another one
          </button>
        </div>
        <Past list={past} onOpen={(x) => setD(x)} onDelete={(id) => {
          const list = past.filter((p) => p.id !== id)
          setPast(list)
          save(list)
        }} />
      </div>
    )
  }

  return (
    <div ref={topRef}>
      {/* progress */}
      <div className="mb-8 flex gap-1.5" aria-hidden>
        {steps.map((_, k) => (
          <div key={k} className={`h-1.5 flex-1 rounded-full ${k <= step ? 'bg-foreground' : 'bg-foreground/10'}`} style={{ transition: 'background 300ms' }} />
        ))}
      </div>

      <div key={step} style={{ animation: 'nt-appear 350ms ease both' }}>
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Step {step + 1} of {steps.length}
        </div>
        <h2 className="font-display text-3xl md:text-4xl leading-tight">{cur.title}</h2>
        {cur.sub && <p className="mt-2 mb-6 text-[16px] text-muted-foreground leading-relaxed">{cur.sub}</p>}
        {cur.body}
        {step === 1 && d.narrative && (
          <p className="mt-4 text-sm text-muted-foreground">
            Your narrative: <span className="italic">“{d.narrative}”</span>
          </p>
        )}
      </div>

      <div className="mt-10 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            disabled={!cur.ready}
            className="rounded-full bg-foreground text-background px-5 py-2 text-sm disabled:opacity-35"
          >
            Next
          </button>
        ) : (
          <button type="button" onClick={finish} className="rounded-full bg-foreground text-background px-5 py-2 text-sm">
            See the X-ray
          </button>
        )}
        {!cur.ready && step > 1 && (
          <button type="button" onClick={() => setStep(step + 1)} className="text-sm text-muted-foreground underline underline-offset-4">
            Skip
          </button>
        )}
      </div>

      {past.length > 0 && step === 0 && (
        <div className="mt-16">
          <Past list={past} onOpen={(x) => { setD(x); setStep(steps.length) }} onDelete={(id) => {
            const list = past.filter((p) => p.id !== id)
            setPast(list)
            save(list)
          }} />
        </div>
      )}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[150px_1fr] gap-1 sm:gap-4 py-3 border-t border-black/10">
      <div className="text-[11px] uppercase tracking-widest text-black/45 pt-0.5">{label}</div>
      <div className="text-[15px] leading-relaxed text-black/85">{children}</div>
    </div>
  )
}

/** The finished X-ray: events against the story, with the wrap in between. */
function XRayCard({ x }: { x: XRayData }) {
  const added = [x.intentions, x.future, x.judgments].filter(Boolean)
  return (
    <div className="rounded-3xl border bg-[#f5f0e6] p-5 sm:p-8 text-[#1f1d1a]" style={{ animation: 'nt-appear 500ms ease both' }}>
      <div className="text-[11px] uppercase tracking-[0.16em] text-black/45 mb-5">Narrative X-ray · {new Date(x.createdAt).toLocaleDateString()}</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
          <div className="text-[11px] uppercase tracking-widest text-black/45 mb-1.5">What happened</div>
          <p className="font-mono text-[15px] leading-relaxed">{x.events || '—'}</p>
        </div>
        <div className="rounded-2xl p-4 border" style={{ background: 'rgba(224,83,61,0.08)', borderColor: 'rgba(224,83,61,0.35)' }}>
          <div className="text-[11px] uppercase tracking-widest text-[#b83f2c] mb-1.5">What the mind says</div>
          <p className="font-display text-[19px] leading-snug">“{x.narrative}”</p>
        </div>
      </div>

      {added.length > 0 && (
        <div className="mt-4 rounded-2xl border border-dashed border-black/25 p-4">
          <div className="text-[11px] uppercase tracking-widest text-black/45 mb-2">The Saran Wrap: what got added in between</div>
          <ul className="space-y-1 text-[15px]">
            {added.map((a, i) => (
              <li key={i}>+ {a}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6">
        {x.species.length > 0 && <Row label="It’s of">{x.species.join(', ')}</Row>}
        {x.tone.length > 0 && <Row label="Tone">{x.tone.join(', ')}</Row>}
        {x.payoff && <Row label="Payoff">{x.payoff}</Row>}
        {x.repeats && (
          <Row label="Repeats">
            {x.repeats}
            {x.modeName && <span className="ml-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[13px] text-white">{x.modeName}</span>}
          </Row>
        )}
        <Row label="Lock">
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 max-w-[220px] rounded-full bg-black/10 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${x.lock * 10}%`, background: x.lock >= 8 ? '#e0533d' : x.lock >= 4 ? '#e8b23a' : '#3f9b94' }} />
            </div>
            <span className="tabular-nums text-sm">{x.lock}/10</span>
          </div>
        </Row>
        {(x.move.length > 0 || x.care) && (
          <Row label="What to do">
            {x.move.join(', ')}
            {x.care && <div className="mt-1">{x.care}</div>}
          </Row>
        )}
      </div>
      <p className="mt-6 text-sm text-black/55 italic">The whole point of Saran is that you don’t see it. Now you’ve seen a little of it.</p>
    </div>
  )
}

function Past({ list, onOpen, onDelete }: { list: XRayData[]; onOpen: (x: XRayData) => void; onDelete: (id: string) => void }) {
  if (list.length === 0) return null
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">Your X-rays (on this device)</h3>
      <ul className="divide-y border-y">
        {list.map((x) => (
          <li key={x.id} className="flex items-center gap-3 py-3">
            <button type="button" onClick={() => onOpen(x)} className="flex-1 text-left hover:underline underline-offset-4">
              <span className="text-xs text-muted-foreground mr-2">{new Date(x.createdAt).toLocaleDateString()}</span>
              {x.narrative.length > 80 ? x.narrative.slice(0, 80) + '…' : x.narrative}
            </button>
            <button type="button" onClick={() => onDelete(x.id)} className="text-xs text-muted-foreground hover:text-foreground">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
