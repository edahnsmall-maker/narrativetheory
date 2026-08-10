'use client'

import { useEffect, useRef, useState } from 'react'
import type { ChatMessage, StageId, ToolCall } from '@/lib/program/types'
import { stageById } from '@/lib/program/stages'

interface ChatProps {
  stage: StageId
  messages: ChatMessage[]
  /** Serialized record, rebuilt at send time so it includes this turn's writes. */
  buildContext: () => string
  onUserMessage: (text: string) => void
  onToolCall: (call: ToolCall) => string | null
  onAssistantMessage: (text: string, effects: string[]) => void
}

/**
 * Very small subset of markdown — the guide writes prose with the occasional
 * emphasis, and pulling in a full renderer for that would be overkill.
 */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={key}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return <em key={key}>{part.slice(1, -1)}</em>
    }
    return <span key={key}>{part}</span>
  })
}

function Prose({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim())
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={index > 0 ? 'mt-3' : undefined}>
          {renderInline(paragraph, String(index))}
        </p>
      ))}
    </>
  )
}

export default function Chat({
  stage,
  messages,
  buildContext,
  onUserMessage,
  onToolCall,
  onAssistantMessage,
}: ChatProps) {
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState('')
  const [liveEffects, setLiveEffects] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const def = stageById(stage)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages.length, streaming, liveEffects.length])

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [input])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return

    setInput('')
    setError(null)
    setBusy(true)
    setStreaming('')
    setLiveEffects([])
    onUserMessage(trimmed)

    const payload = {
      stage,
      context: buildContext(),
      messages: [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content: trimmed },
      ],
    }

    let accumulated = ''
    const effects: string[] = []

    try {
      const res = await fetch('/api/program', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok || !res.body) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'The guide could not be reached.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      // NDJSON: text tokens and tool calls interleave on the same stream.
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.trim()) continue
          let event: { t: string; v?: string; name?: string; input?: Record<string, unknown> }
          try {
            event = JSON.parse(line)
          } catch {
            continue
          }

          if (event.t === 'text' && event.v) {
            accumulated += event.v
            setStreaming(accumulated)
          } else if (event.t === 'tool' && event.name) {
            const effect = onToolCall({ name: event.name, input: event.input ?? {} })
            if (effect) {
              effects.push(effect)
              setLiveEffects([...effects])
            }
          } else if (event.t === 'error' && event.v) {
            setError(event.v)
          }
        }
      }

      if (accumulated.trim() || effects.length) {
        onAssistantMessage(accumulated.trim(), effects)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setBusy(false)
      setStreaming('')
      setLiveEffects([])
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-[38rem] space-y-6">
          {isEmpty && (
            <div className="rounded-2xl bg-[var(--muted)] px-5 py-4">
              <p className="prose-nt text-[0.95rem] leading-relaxed">{def.opener}</p>
            </div>
          )}

          {messages.map((message) =>
            message.role === 'user' ? (
              <div key={message.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl bg-[var(--ink)] px-4 py-2.5 text-[0.95rem] leading-relaxed text-[var(--paper)]">
                  <Prose text={message.content} />
                </div>
              </div>
            ) : (
              <div key={message.id}>
                <div className="prose-nt text-[0.95rem] leading-relaxed">
                  <Prose text={message.content} />
                </div>
                {message.effects && message.effects.length > 0 && (
                  <ul className="mt-3 space-y-1 border-l-2 border-[var(--accent)] pl-3">
                    {message.effects.map((effect, index) => (
                      <li key={index} className="text-xs text-[var(--muted-foreground)]">
                        {effect}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ),
          )}

          {streaming && (
            <div className="prose-nt text-[0.95rem] leading-relaxed">
              <Prose text={streaming} />
            </div>
          )}

          {liveEffects.length > 0 && (
            <ul className="space-y-1 border-l-2 border-[var(--accent)] pl-3">
              {liveEffects.map((effect, index) => (
                <li key={index} className="text-xs text-[var(--muted-foreground)]">
                  {effect}
                </li>
              ))}
            </ul>
          )}

          {busy && !streaming && (
            <div className="flex gap-1.5 py-1" aria-label="The guide is thinking">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted-foreground)]"
                  style={{ animationDelay: `${i * 160}ms` }}
                />
              ))}
            </div>
          )}

          {error && (
            <p className="rounded-lg border border-[var(--destructive)] px-4 py-2.5 text-sm text-[var(--destructive)]">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-[var(--rule)] px-6 py-4">
        <form
          className="mx-auto flex max-w-[38rem] items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            void send(input)
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                void send(input)
              }
            }}
            rows={1}
            placeholder="Take your time."
            disabled={busy}
            className="flex-1 resize-none rounded-xl border border-[var(--rule)] bg-[var(--card)] px-4 py-2.5 text-[0.95rem] leading-relaxed outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--accent-violet)] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="shrink-0 rounded-xl bg-[var(--ink)] px-4 py-2.5 text-sm text-[var(--paper)] transition-opacity disabled:opacity-30"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
