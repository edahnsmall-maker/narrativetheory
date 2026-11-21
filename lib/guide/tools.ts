import type Anthropic from '@anthropic-ai/sdk'
import { concepts, conceptBySlug } from '@/lib/data/concepts'
import type { Card, LogItem, Phase } from '@/lib/types'

/**
 * Tools the guide uses to put things on the person's screen. Each one is a
 * pure UI write: the server validates the input, turns it into a log item, and
 * returns a short acknowledgement to the model. The descriptions carry real
 * instruction — the model reads them closely.
 */

type Tool = Anthropic.Beta.BetaTool

const str = (description: string) => ({ type: 'string' as const, description })
const strList = (description: string, min = 1, max = 6) => ({
  type: 'array' as const,
  items: { type: 'string' as const },
  minItems: min,
  maxItems: max,
  description,
})

const PHASES: Phase[] = ['arrive', 'see', 'work', 'carry']
export const CONCEPT_SLUGS = concepts.map((c) => c.slug)

function tool(name: string, description: string, properties: Record<string, unknown>, required: string[]): Tool {
  return {
    name,
    description,
    input_schema: { type: 'object', properties, required, additionalProperties: false },
    // Stream tool input as it's generated (inputs are then unvalidated, so we validate below).
    eager_input_streaming: true,
  } as Tool
}

export const GUIDE_TOOLS: Tool[] = [
  tool(
    'set_phase',
    'Move the session into its next phase. The screen shows the person where they are. Call it once, at the start of the turn where the new phase begins.',
    { phase: { type: 'string', enum: PHASES } },
    ['phase'],
  ),
  tool(
    'show_split',
    "Show what a camera would have recorded next to what the mind added. The foundational NT move. Events: plain, observable, no motives or adjectives that judge. Story: the meanings, motives, predictions and verdicts, in the person's own phrasing where possible.",
    {
      title: str('Optional short title naming the moment, e.g. "The six-hour reply". Empty string for none.'),
      events: strList('What a camera would see, one short item each.', 1, 5),
      story: strList('What the mind added, one short item each, in their voice.', 1, 5),
    },
    ['title', 'events', 'story'],
  ),
  tool(
    'show_concept',
    "Introduce one Narrative Theory idea, tied to their situation. The card shows NT's own definition; you supply in_your_words: one or two sentences showing the idea operating in THEIR example. Use only when the idea is actually doing work right now, not as decoration.",
    {
      concept: { type: 'string', enum: CONCEPT_SLUGS, description: 'Which NT concept.' },
      in_your_words: str("One or two sentences: the idea, visible in this person's situation."),
    },
    ['concept', 'in_your_words'],
  ),
  tool(
    'show_mode',
    'Lay out a mode: the package of narrative, body, action and energy state running together. Name it plainly and specifically from their situation (e.g. "Audition Mode", "Six-Hour-Reply Mode"), never with clinical labels. Each channel: a short phrase, concrete.',
    {
      name: str('A short, plain, specific name for the mode.'),
      narrative: str('The thinking style / story it runs.'),
      body: str('What the body does in it.'),
      action: str('What the person does or says in it.'),
      energy: str('The energy state animating it, in a few words.'),
      save_to_library: {
        type: 'boolean',
        description: "True only when the person has recognized this pattern as theirs. Saves it to their personal mode library.",
      },
    },
    ['name', 'narrative', 'body', 'action', 'energy', 'save_to_library'],
  ),
  tool(
    'ask_check',
    "A quick multiple-choice check of understanding, built from the person's own situation. The person taps an answer; their choice comes back as their next message. Make the wrong options plausible, not silly.",
    {
      question: str('The question.'),
      options: strList('Two to four answer options.', 2, 4),
      answer_index: { type: 'integer', minimum: 0, maximum: 3, description: 'Index of the best answer.' },
      explanation: str('Shown after they answer: why that answer, in one or two sentences.'),
    },
    ['question', 'options', 'answer_index', 'explanation'],
  ),
  tool(
    'offer_replies',
    'Offer two to four short tappable replies the person might want to send next. They can still type anything. Write them in the first person, in their voice, under 8 words each.',
    { options: strList('The replies.', 2, 4) },
    ['options'],
  ),
  tool(
    'save_insight',
    "Save the person's own realization to their notebook. Only for something they actually saw, phrased close to how they'd say it. One or two per session.",
    { text: str('The realization, one or two sentences, in their voice.') },
    ['text'],
  ),
  tool(
    'show_shift',
    'Mark a moment where something genuinely loosened: the story seen as a story, the grip relaxing. One or two plain sentences. Never use it to declare a shift that did not happen.',
    { text: str('What shifted, plainly.') },
    ['text'],
  ),
  tool(
    'set_practice',
    'Give one small thing to notice over the next few days. Something to catch, not a regimen or a schedule of check-ins. Saved to their notebook.',
    {
      instruction: str('The practice, one to three sentences, concrete.'),
      when: str('The situation where it applies, e.g. "the next time a reply takes a while".'),
      days: { type: 'integer', minimum: 1, maximum: 14, description: 'How many days to try it.' },
    },
    ['instruction', 'when', 'days'],
  ),
  tool(
    'complete_session',
    'Close the session with a short summary and the takeaways. Call after the practice and insight are in place, or when the person wants to stop.',
    {
      summary: str("Two or three sentences: what you looked at and what they saw. Address them as 'you'."),
      takeaways: strList('Two to four short takeaways, concrete, in plain language.', 1, 4),
      next: str('Optional: one module or idea worth exploring next, by name. Empty string for none.'),
    },
    ['summary', 'takeaways', 'next'],
  ),
]

/* ------------------------------------------------------------------ *
 * Validation and conversion
 * ------------------------------------------------------------------ */

const isStr = (v: unknown, max = 600): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const strArr = (v: unknown, min: number, max: number) =>
  Array.isArray(v) && v.length >= min && v.length <= max && v.every((x) => isStr(x, 400))
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export type ToolOutcome =
  | { ok: true; items: LogItem[]; phase?: Phase; complete?: boolean; notebook?: Card; result: string }
  | { ok: false; error: string }

export function applyTool(name: string, input: unknown, newId: () => string): ToolOutcome {
  const i = (input ?? {}) as Record<string, unknown>
  const card = (c: Card): LogItem => ({ id: newId(), type: 'card', card: c })
  switch (name) {
    case 'set_phase': {
      const phase = i.phase as Phase
      if (!PHASES.includes(phase)) return { ok: false, error: 'phase must be one of arrive, see, work, carry' }
      return { ok: true, items: [{ id: newId(), type: 'phase', phase }], phase, result: `Phase is now ${phase}.` }
    }
    case 'show_split': {
      if (!strArr(i.events, 1, 5) || !strArr(i.story, 1, 5)) return { ok: false, error: 'events and story need 1-5 short strings each' }
      return {
        ok: true,
        items: [card({ kind: 'split', title: clean(i.title) || undefined, events: (i.events as string[]).map(clean), story: (i.story as string[]).map(clean) })],
        result: 'Shown.',
      }
    }
    case 'show_concept': {
      const c = conceptBySlug(String(i.concept))
      if (!c) return { ok: false, error: `concept must be one of: ${CONCEPT_SLUGS.join(', ')}` }
      if (!isStr(i.in_your_words)) return { ok: false, error: 'in_your_words is required' }
      return {
        ok: true,
        items: [card({ kind: 'concept', slug: c.slug, name: c.name, definition: c.shortDef, inYourWords: clean(i.in_your_words) })],
        result: 'Shown.',
      }
    }
    case 'show_mode': {
      for (const k of ['name', 'narrative', 'body', 'action', 'energy']) {
        if (!isStr(i[k], 300)) return { ok: false, error: `${k} is required` }
      }
      const saved = i.save_to_library === true
      const c: Card = {
        kind: 'mode',
        name: clean(i.name),
        narrative: clean(i.narrative),
        body: clean(i.body),
        action: clean(i.action),
        energy: clean(i.energy),
        saved,
      }
      return { ok: true, items: [card(c)], notebook: saved ? c : undefined, result: saved ? 'Shown and saved to their mode library.' : 'Shown.' }
    }
    case 'ask_check': {
      const n = Array.isArray(i.options) ? i.options.length : 0
      if (!isStr(i.question) || !strArr(i.options, 2, 4) || !isStr(i.explanation)) return { ok: false, error: 'question, 2-4 options and explanation are required' }
      const idx = Number(i.answer_index)
      if (!Number.isInteger(idx) || idx < 0 || idx >= n) return { ok: false, error: 'answer_index must point at one of the options' }
      return {
        ok: true,
        items: [card({ kind: 'check', question: clean(i.question), options: (i.options as string[]).map(clean), answerIndex: idx, explanation: clean(i.explanation) })],
        result: 'Shown. Their answer will arrive as their next message.',
      }
    }
    case 'offer_replies': {
      if (!strArr(i.options, 2, 4)) return { ok: false, error: 'options needs 2-4 short strings' }
      return { ok: true, items: [{ id: newId(), type: 'replies', options: (i.options as string[]).map(clean) }], result: 'Shown.' }
    }
    case 'save_insight': {
      if (!isStr(i.text, 500)) return { ok: false, error: 'text is required' }
      const c: Card = { kind: 'insight', text: clean(i.text) }
      return { ok: true, items: [card(c)], notebook: c, result: 'Saved to their notebook.' }
    }
    case 'show_shift': {
      if (!isStr(i.text, 500)) return { ok: false, error: 'text is required' }
      return { ok: true, items: [card({ kind: 'shift', text: clean(i.text) })], result: 'Shown.' }
    }
    case 'set_practice': {
      const days = Number(i.days)
      if (!isStr(i.instruction) || !Number.isInteger(days) || days < 1 || days > 14) return { ok: false, error: 'instruction and days (1-14) are required' }
      const c: Card = { kind: 'practice', instruction: clean(i.instruction), when: clean(i.when), days }
      return { ok: true, items: [card(c)], notebook: c, result: 'Shown and saved to their notebook.' }
    }
    case 'complete_session': {
      if (!isStr(i.summary, 1000) || !strArr(i.takeaways, 1, 4)) return { ok: false, error: 'summary and 1-4 takeaways are required' }
      const c: Card = { kind: 'summary', summary: clean(i.summary), takeaways: (i.takeaways as string[]).map(clean), next: clean(i.next) || undefined }
      return { ok: true, items: [card(c)], notebook: c, complete: true, result: 'Session marked complete. They can keep talking if they want.' }
    }
    default:
      return { ok: false, error: `Unknown tool ${name}` }
  }
}
