import type Anthropic from '@anthropic-ai/sdk'
import { newId } from '@/lib/store'
import type { LogItem, SessionRecord, StreamEvent } from '@/lib/types'

/**
 * Practice mode: a scripted stand-in for the guide, used when no Anthropic
 * API key is configured. It walks a session through every phase and every
 * card type so the experience can be clicked through and tested end to end.
 * It is obviously generic — it is not the real guide.
 */

type Block =
  | { type: 'text'; text: string }
  | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }

const T = (text: string): Block => ({ type: 'text', text })
const U = (name: string, input: Record<string, unknown>): Block => ({ type: 'tool_use', id: `toolu_${newId().replace(/-/g, '').slice(0, 20)}`, name, input })

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function lastUserText(s: SessionRecord): string {
  for (let i = s.apiMessages.length - 1; i >= 0; i--) {
    const m = s.apiMessages[i]
    if (m.role === 'user' && typeof m.content === 'string') return m.content
  }
  return ''
}

function turnIndex(s: SessionRecord): number {
  return s.apiMessages.filter((m) => m.role === 'user' && typeof m.content === 'string').length - 1
}

function script(s: SessionRecord): Block[] {
  const said = lastUserText(s).replace(/^\([\s\S]*?\)\s*/, '').trim()
  const snippet = said.length > 90 ? said.slice(0, 87) + '…' : said
  const n = turnIndex(s)

  if (s.kind === 'situation' && n === 0) {
    return [
      U('set_phase', { phase: 'see' }),
      T("Let's pull this apart. First, what actually happened, as a camera would have recorded it, and then everything your mind laid on top of it."),
      U('show_split', { title: 'What you brought', events: [snippet || 'Something happened.', 'That is the whole event.'], story: ['This says something about me.', "It's going to keep going this way."] }),
      T("Notice how much of the weight sits in the right-hand column. That's the Saran Wrap: the story pressed so close to the event that it feels like the event itself.\n\nWhich line on the right feels most true right now?"),
    ]
  }

  switch (n) {
    case 0:
      return said.includes('worked example')
        ? [
            U('set_phase', { phase: 'arrive' }),
            T(`Welcome. This session is about **${s.title}**, and we'll start with someone else's moment so you can see the idea working before you aim it at yourself.\n\nMaya sends a long message to a friend on Friday afternoon. By Saturday morning there's no reply. By Saturday night she's replayed the message four times and decided it was too much.\n\nWhat do you think Maya's mind is doing there?`),
            U('offer_replies', { options: ['Filling in the silence', "She's probably right", 'Not sure yet'] }),
          ]
        : [
            U('set_phase', { phase: 'arrive' }),
            T(`Welcome. This session is about **${s.title}**, and we'll work it through one real moment from your life, because that's where the idea actually shows up.\n\nWhat's one specific, recent situation that's been sitting with you? A moment, not a whole saga.`),
            U('offer_replies', { options: ['Something at work', 'Something with a partner', 'Give me an example instead'] }),
          ]
    case 1:
      return [
        U('set_phase', { phase: 'see' }),
        T("Okay. Let's slow that down and separate two things that arrived as one."),
        U('show_split', { title: 'The moment', events: [snippet || 'Something happened.'], story: ['This means something about me.', "It's going to go badly."] }),
        T('Left side: what a camera would have caught. Right side: what your mind added. Which right-hand line has the most grip on you?'),
      ]
    case 2:
      return [
        T("That one's doing a lot of work. Here's the idea underneath it."),
        U('show_concept', { concept: 'saran-wrap', in_your_words: `In your situation, "${snippet || 'what happened'}" stopped feeling like an interpretation and started feeling like a fact about how things are.` }),
        U('ask_check', {
          question: 'So what is the Saran Wrap in your situation?',
          options: ['The event itself', 'The meaning your mind pressed onto the event', 'The other person being unfair'],
          answer_index: 1,
          explanation: "Right: the event stays the same. The wrap is the meaning layered so tightly on it that you can't see it's there.",
        }),
      ]
    case 3:
      return [
        U('set_phase', { phase: 'work' }),
        T("Now look at the whole package you were in, not just the thought. Thinking, body and action tend to move together."),
        U('show_mode', { name: 'Bracing Mode', narrative: 'Something is about to go wrong and it will be my fault', body: 'Tight chest, shallow breath, shoulders up', action: 'Re-reading, checking, rehearsing what to say', energy: 'Alert, sour, high charge', save_to_library: true }),
        T('Does that package feel familiar, like a place you go, not just a thing that happened once?'),
        U('offer_replies', { options: ['Yes, a lot', 'Sort of', "Not really, it's different"] }),
      ]
    case 4:
      return [
        T("Then here's the useful part: you don't have to argue with the story. Once you can see the package as a package, it's already a little less you."),
        U('save_insight', { text: 'The story arrived feeling like a fact, but it was a package I go into, not the truth about the situation.' }),
        U('show_shift', { text: 'The situation went back to being a situation, plus a mind building something on top of it.' }),
        T('What do you notice in your body as you look at it that way?'),
      ]
    case 5:
      return [
        U('set_phase', { phase: 'carry' }),
        T("Good place to land. One small thing to take with you, nothing to grind at:"),
        U('set_practice', { instruction: 'When you notice the bracing start, just name it to yourself: "Bracing Mode." No fixing. Then notice what the body does next.', when: 'the next time something is unresolved and your mind starts filling it in', days: 3 }),
        U('complete_session', {
          summary: 'You took one moment, separated what happened from what your mind added, and saw the package you go into when things are unresolved.',
          takeaways: ['The event and the story arrive fused; you can pull them apart.', 'Bracing is a mode: thinking, body and action moving together.', "Naming it is enough; you don't have to fight it."],
          next: 'Name the Mode',
        }),
      ]
    default:
      return [T('(Practice mode is out of script here. With an API key configured, the real guide keeps going from wherever you are.)')]
  }
}

export async function practiceTurn(
  session: SessionRecord,
  emit: (e: StreamEvent) => void,
  push: (item: LogItem) => void,
  handleTool: (id: string, name: string, raw: string | null, parsed: unknown) => Anthropic.Beta.BetaToolResultBlockParam,
) {
  const blocks = script(session)
  const results: Anthropic.Beta.BetaToolResultBlockParam[] = []

  for (const b of blocks) {
    if (b.type === 'text') {
      // stream it in small chunks so the UI behaves as it will with the real guide
      for (const chunk of b.text.match(/[\s\S]{1,6}/g) ?? []) {
        emit({ t: 'text', v: chunk })
        await sleep(12)
      }
      push({ id: newId(), type: 'guide', text: b.text })
    } else {
      await sleep(250)
      results.push(handleTool(b.id, b.name, null, b.input))
    }
  }

  session.apiMessages.push({ role: 'assistant', content: blocks as Anthropic.Beta.BetaContentBlockParam[] })
  if (results.length) session.apiMessages.push({ role: 'user', content: results })
}
