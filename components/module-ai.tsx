'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, RotateCcw, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ModuleAIProps {
  shelfSlug: string
  moduleSlug: string
  moduleName: string
}

export default function ModuleAI({ shelfSlug, moduleSlug, moduleName }: ModuleAIProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScrollRef = useRef(true)

  function handleScroll() {
    const el = containerRef.current
    if (!el) return
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    shouldAutoScrollRef.current = distanceFromBottom < 80
  }

  useEffect(() => {
    if (shouldAutoScrollRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  async function start() {
    setStarted(true)
    await sendMessage([], '')
  }

  async function sendMessage(history: Message[], userText: string) {
    const trimmed = userText.trim()
    const newMessages: Message[] = trimmed
      ? [...history, { role: 'user' as const, content: trimmed }]
      : [{ role: 'user' as const, content: 'Start the walkthrough — invite me to share what brought me here.' }]

    shouldAutoScrollRef.current = true

    if (trimmed) {
      setMessages(newMessages)
    }
    setInput('')
    setStreaming(true)

    const assistantMsg: Message = { role: 'assistant', content: '' }
    setMessages((prev) => [...prev, assistantMsg])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          shelfSlug,
          moduleSlug,
        }),
      })

      if (!res.ok) throw new Error('Failed to connect')
      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let text = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: text }
          return updated
        })
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || streaming) return
    sendMessage(messages, input)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  function reset() {
    setMessages([])
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="rounded-2xl border border-dashed p-8 text-center bg-card">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-3">
          <Sparkles size={13} />
          AI Walkthrough
        </div>
        <h3 className="font-display text-xl text-foreground mb-2">{moduleName}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
          Have a guided conversation about this module. The AI knows the theory and will help you apply it to your actual situation.
        </p>
        <p className="text-xs text-muted-foreground/70 mb-6">
          This is not therapy and not a substitute for mental health treatment. Don&apos;t share identifying details about others.
        </p>
        <button
          onClick={start}
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Start walkthrough
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border bg-card flex flex-col" style={{ height: 520 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Sparkles size={13} className="text-accent-violet" />
          AI walkthrough — {moduleName}
        </div>
        <button
          onClick={reset}
          className="text-muted-foreground/70 hover:text-foreground transition-colors"
          title="Reset"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      {/* Messages */}
      <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'flex justify-end' : ''}>
            {msg.role === 'assistant' ? (
              <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap max-w-prose">
                {msg.content}
                {i === messages.length - 1 && streaming && (
                  <span className="inline-block w-1.5 h-4 bg-foreground ml-0.5 animate-pulse" />
                )}
              </div>
            ) : (
              <div className="bg-secondary rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-foreground max-w-xs leading-relaxed">
                {msg.content}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          rows={1}
          disabled={streaming}
          className="flex-1 bg-background border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:border-accent-violet/50 disabled:opacity-50 leading-relaxed"
          style={{ maxHeight: 120 }}
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          className="bg-primary text-primary-foreground rounded-xl px-3 flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  )
}
