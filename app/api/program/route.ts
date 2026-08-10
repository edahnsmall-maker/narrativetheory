import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'
import { buildSystemPrompt, stageById } from '@/lib/program/stages'
import { toolsForStage } from '@/lib/program/tools'
import type { StageId } from '@/lib/program/types'

export const runtime = 'nodejs'
export const maxDuration = 120

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

/* ------------------------------------------------------------------ *
 * Rate limiting
 *
 * The program is open with no account, so the only thing standing between
 * it and an unbounded bill is this. In-memory means it resets on deploy and
 * doesn't span instances — adequate for a demo, and the first thing to
 * replace with a shared store if this ever goes properly public.
 * ------------------------------------------------------------------ */

const WINDOW_MS = 60 * 60 * 1000
const MAX_TURNS_PER_WINDOW = 60
const buckets = new Map<string, { count: number; resetAt: number }>()

function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS })
    // Opportunistic sweep so the map can't grow without bound.
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (now > v.resetAt) buckets.delete(k)
    }
    return { ok: true, retryAfter: 0 }
  }

  if (bucket.count >= MAX_TURNS_PER_WINDOW) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { ok: true, retryAfter: 0 }
}

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

/* ------------------------------------------------------------------ *
 * Request handling
 * ------------------------------------------------------------------ */

interface IncomingMessage {
  role: 'user' | 'assistant'
  content: string
}

interface Body {
  stage: StageId
  messages: IncomingMessage[]
  context: string
}

/** Guards against a client sending an unbounded transcript. */
const MAX_MESSAGES = 80
const MAX_CHARS_PER_MESSAGE = 8000
/** Tool-use rounds per turn, so a confused model can't loop indefinitely. */
const MAX_ROUNDS = 6

function sanitize(messages: IncomingMessage[]): Anthropic.MessageParam[] {
  return messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && m.content?.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }))
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'The guide is not configured on this deploy.' }, { status: 500 })
  }

  const limit = rateLimit(clientKey(req))
  if (!limit.ok) {
    return Response.json(
      {
        error:
          "You've hit the hourly limit for this demo. Your record is saved in this browser — come back in a bit and pick up where you left off.",
      },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'Malformed request.' }, { status: 400 })
  }

  const stageId = ([1, 2, 3, 4, 5] as StageId[]).includes(body.stage) ? body.stage : 1
  const stage = stageById(stageId)
  const messages = sanitize(body.messages ?? [])

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'Nothing to respond to.' }, { status: 400 })
  }

  const system = buildSystemPrompt(stageId, (body.context ?? '').slice(0, 24000))
  const tools = toolsForStage(stage.tools)

  const encoder = new TextEncoder()

  /**
   * Newline-delimited JSON. Two event types reach the client:
   *   {"t":"text","v":"..."}  — a token of prose
   *   {"t":"tool","name":"...","input":{...}} — a write to the person's record
   *   {"t":"error","v":"..."}
   */
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'))

      const turns: Anthropic.MessageParam[] = [...messages]

      try {
        for (let round = 0; round < MAX_ROUNDS; round++) {
          const response = client.messages.stream({
            model: stage.model,
            max_tokens: stage.maxTokens,
            system,
            tools,
            messages: turns,
          })

          for await (const chunk of response) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              send({ t: 'text', v: chunk.delta.text })
            }
          }

          const final = await response.finalMessage()

          const toolUses = final.content.filter(
            (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
          )

          if (!toolUses.length) return

          for (const use of toolUses) {
            send({ t: 'tool', name: use.name, input: use.input })
          }

          // The client owns the record, so there is nothing real to return —
          // acknowledge each call and let the model keep going in the same turn.
          turns.push({ role: 'assistant', content: final.content })
          turns.push({
            role: 'user',
            content: toolUses.map((use) => ({
              type: 'tool_result' as const,
              tool_use_id: use.id,
              content: 'Recorded. It is now visible to them on screen.',
            })),
          })
        }
      } catch (err) {
        const message =
          err instanceof Anthropic.APIError
            ? err.status === 429
              ? 'The model is rate limited right now. Give it a moment and send that again.'
              : 'The guide had trouble responding. Your record is safe — try sending that again.'
            : 'Something went wrong mid-response. Your record is safe.'
        send({ t: 'error', v: message })
        console.error('[program] stream failed:', err)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
