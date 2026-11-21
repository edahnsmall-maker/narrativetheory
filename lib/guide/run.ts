import Anthropic from '@anthropic-ai/sdk'
import { models, practiceAI } from '@/lib/config'
import { newId } from '@/lib/store'
import type { Card, LogItem, SessionRecord, StreamEvent } from '@/lib/types'
import { GUIDE_TOOLS, applyTool } from './tools'
import { practiceTurn } from './practice'

/**
 * Runs one guide turn: sends the session's transcript plus the new user
 * message, streams prose to the browser as it's written, turns tool calls
 * into on-screen cards, and appends everything to the session (append-only).
 */

const MAX_ROUNDS = 5
let client: Anthropic | null = null
const anthropic = () => (client ??= new Anthropic())

export interface TurnResult {
  notebook: Card[]
}

type Emit = (e: StreamEvent) => void
type ToolResult = Anthropic.Beta.BetaToolResultBlockParam

export async function runTurn(session: SessionRecord, userContent: string, emit: Emit): Promise<TurnResult> {
  const notebook: Card[] = []
  session.apiMessages.push({ role: 'user', content: userContent })

  const push = (item: LogItem) => {
    session.log.push(item)
    emit({ t: 'item', item })
  }

  /** Handles one tool call; returns the tool_result to send back. */
  const handleTool = (id: string, name: string, rawJson: string | null, parsed: unknown): ToolResult => {
    let input = parsed
    if (rawJson !== null) {
      try {
        input = rawJson.trim() ? JSON.parse(rawJson) : {}
      } catch {
        return { type: 'tool_result', tool_use_id: id, is_error: true, content: 'INVALID_JSON: the input was cut off or malformed. Send the call again.' }
      }
    }
    const out = applyTool(name, input, newId)
    if (!out.ok) return { type: 'tool_result', tool_use_id: id, is_error: true, content: out.error }
    out.items.forEach(push)
    if (out.phase) session.phase = out.phase
    if (out.complete) session.status = 'complete'
    if (out.notebook) notebook.push(out.notebook)
    return { type: 'tool_result', tool_use_id: id, content: out.result }
  }

  if (practiceAI) {
    await practiceTurn(session, emit, push, handleTool)
    return { notebook }
  }

  for (let round = 0; round < MAX_ROUNDS; round++) {
    const blocks = new Map<number, { type: string; text: string; json: string; id?: string; name?: string }>()
    const results: ToolResult[] = []

    const stream = anthropic().beta.messages.stream({
      model: models.session,
      max_tokens: 16000,
      system: [{ type: 'text', text: session.system, cache_control: { type: 'ephemeral' } }],
      tools: GUIDE_TOOLS,
      messages: session.apiMessages,
      output_config: { effort: 'medium' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: [{ model: models.fallback }],
      // Also cache the growing conversation, not just the system prompt.
      cache_control: { type: 'ephemeral' },
    } as Anthropic.Beta.MessageCreateParamsStreaming)

    for await (const ev of stream) {
      if (ev.type === 'content_block_start') {
        const b = ev.content_block as { type: string; id?: string; name?: string }
        blocks.set(ev.index, { type: b.type, text: '', json: '', id: b.id, name: b.name })
      } else if (ev.type === 'content_block_delta') {
        const b = blocks.get(ev.index)
        if (!b) continue
        if (ev.delta.type === 'text_delta') {
          b.text += ev.delta.text
          emit({ t: 'text', v: ev.delta.text })
        } else if (ev.delta.type === 'input_json_delta') {
          b.json += ev.delta.partial_json
        }
      } else if (ev.type === 'content_block_stop') {
        const b = blocks.get(ev.index)
        if (!b) continue
        if (b.type === 'text' && b.text.trim()) {
          push({ id: newId(), type: 'guide', text: b.text.trim() })
        } else if (b.type === 'tool_use' && b.id && b.name) {
          results.push(handleTool(b.id, b.name, b.json, null))
        }
      }
    }

    const final = await stream.finalMessage()
    // Replay the assistant turn verbatim next time (thinking blocks included).
    session.apiMessages.push({ role: 'assistant', content: final.content })

    if (final.stop_reason === 'refusal') {
      push({ id: newId(), type: 'error', text: "The guide can't continue with that. If you're going through something serious, please reach out to someone you trust, or call or text 988 in the US." })
      return { notebook }
    }
    if (final.stop_reason !== 'tool_use' || !results.length) return { notebook }

    session.apiMessages.push({ role: 'user', content: results })
  }
  return { notebook }
}

/** Maps API errors to something we can say to a person. */
export function friendlyError(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) return 'The guide is busy right now. Give it a moment and send that again.'
  if (err instanceof Anthropic.AuthenticationError) return 'The guide is not configured correctly on this site.'
  if (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500) return 'The guide had trouble responding. Your session is saved — try sending that again.'
  if (err instanceof Anthropic.APIError) return 'Something went wrong talking to the guide. Your session is saved.'
  return 'Something went wrong mid-response. Your session is saved.'
}
