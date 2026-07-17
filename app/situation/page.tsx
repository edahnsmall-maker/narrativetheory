'use client'

import { useState } from 'react'
import Link from 'next/link'
import { modes } from '@/lib/data/modes'
import { allModules } from '@/lib/data/lifeInstruction'
import { GradientOrb } from '@/components/nt/GradientOrb'

const cues: { keywords: string[]; modes: string[] }[] = [
  { keywords: ['text', 'reply', 'ghost', 'seen', "didn't respond", 'ignored'], modes: ['Anxiety Mode', 'Romantic Projection Mode', 'Chase Mode', 'Validation-Seeking Mode'] },
  { keywords: ['party', 'social', 'awkward', 'room', 'group'], modes: ['Social Anxiety Mode', 'Performance Mode', 'Appeasement Mode'] },
  { keywords: ['work', 'boss', 'feedback', 'meeting', 'review'], modes: ['Defense Mode', 'Performance Mode', 'Progress Mode'] },
  { keywords: ['partner', 'fight', 'argument', 'relationship', 'broke up', 'breakup', 'ex'], modes: ['Fight Mode', 'Resentment Mode', 'Breakup Replay Mode', 'Withdrawal Mode'] },
  { keywords: ['compare', 'behind', 'scroll', 'instagram', 'linkedin'], modes: ['Comparison Mode', 'Progress Mode', 'Scroll Mode'] },
  { keywords: ['scared', 'worry', 'anxious', 'future', 'what if'], modes: ['Anxiety Mode', 'Alert Mode', 'Planning Mode'] },
  { keywords: ['ashamed', 'stupid', 'embarrassed', 'failure'], modes: ['Shame Mode', 'Inferiority Mode'] },
  { keywords: ['numb', 'tired', 'done', 'collapse', 'give up'], modes: ['Collapse Mode', 'Numb Mode', 'Doom Mode'] },
]

function analyze(text: string) {
  const t = text.toLowerCase()
  const hits = new Set<string>()
  for (const c of cues) if (c.keywords.some((k) => t.includes(k))) c.modes.forEach((m) => hits.add(m))
  return modes.filter((m) => hits.has(m.name)).slice(0, 4)
}

function Card({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{kicker}</div>
      <div className="mt-1 font-display text-xl">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}

export default function SituationPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<ReturnType<typeof analyze> | null>(null)

  return (
    <div>
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-5 lg:px-8 py-12 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Tool</div>
            <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[0.95]">Bring a Situation</h1>
            <p className="mt-4 text-muted-foreground">
              Describe what you are caught in right now. The page will return a Narrative Theory reading:
              camera view, saran view, possible modes, body cues, and practice to try.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center"><GradientOrb variant="blue" size={200} /></div>
        </div>
      </header>

      <section>
        <div className="mx-auto max-w-3xl px-5 lg:px-8 py-10">
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Your situation</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="e.g. Sent a text last night, no reply. Now I'm spinning, checking my phone, reading old messages."
            className="w-full rounded-2xl border bg-card p-4 text-[15px]"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Please do not include names, contact info, or identifying details of others.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setResult(analyze(text))}
              disabled={!text.trim()}
              className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium disabled:opacity-40"
            >
              Run reading
            </button>
            <button onClick={() => { setText(''); setResult(null) }} className="text-sm text-muted-foreground">
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="mx-auto max-w-3xl px-5 lg:px-8 pb-16 space-y-6">
            <Card kicker="Camera view" title="What happened, before the story.">
              Strip the description to verifiable observations. &ldquo;I sent a text. They have not replied yet.&rdquo;
              That&apos;s the camera. Anything more is interpretation.
            </Card>
            <Card kicker="Saran view" title="What the mind is adding.">
              Notice the additions: meaning (&ldquo;they don&apos;t care&rdquo;), prediction (&ldquo;they never will&rdquo;), self-claims
              (&ldquo;I always do this&rdquo;), rank claims (&ldquo;I&apos;m not worth replying to&rdquo;).
            </Card>
            <Card kicker="Body state" title="Where it is living.">
              Tight chest, shallow breath, restless hands, a low pull in the stomach, a held jaw.
              Body is part of the mode, not separate from it.
            </Card>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Possible modes</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {result.length === 0 && (
                  <div className="text-sm text-muted-foreground">
                    No strong matches. Try a few words about where you feel it: anxious, ashamed, restless, numb, angry, comparing.
                  </div>
                )}
                {result.map((m) => (
                  <div key={m.slug} className="rounded-2xl border bg-card p-4">
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.family}</div>
                    <div className="mt-1 font-display text-lg">{m.name}</div>
                    <div className="mt-1 text-sm text-muted-foreground italic">{m.tagline}</div>
                  </div>
                ))}
              </div>
            </div>
            <Card kicker="Possible correct function" title="What the situation actually calls for.">
              Often it&apos;s small: feel the body, drop the prediction, return to what is in front of you.
              Sometimes it&apos;s an honest action you have been avoiding. Rarely is it the dramatic move
              the mode wants.
            </Card>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Suggested practice</div>
              <div className="grid sm:grid-cols-3 gap-3">
                {allModules().slice(0, 3).map(({ shelf, module }) => (
                  <Link
                    key={module.slug}
                    href={`/life/${shelf.slug}/${module.slug}`}
                    className="rounded-2xl border bg-card p-4 hover:border-foreground/40"
                  >
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{shelf.name}</div>
                    <div className="mt-1 font-display text-base">{module.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
