'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUp, Lock, FlaskConical, BookOpen } from 'lucide-react'
import { RichText } from '@/components/rich-text'
import { UpgradeButton } from '@/app/account/billing-buttons'
import { CardView } from './cards'
import type { LogItem, Phase, SessionStatus, StreamEvent } from '@/lib/types'

interface Access {
  member: boolean
  practice: boolean
  canReply: boolean
  blockedReason: string | null
  tasteRemaining: number | null
}

interface SessionInfo {
  id: string
  kind: 'module' | 'situation'
  moduleId: string
  title: string
  status: SessionStatus
  phase: Phase
}

export type StartSpec =
  | { kind: 'module'; moduleId: string; start: 'own' | 'example' }
  | { kind: 'situation'; text: string }

const PHASES: { key: Phase; label: string }[] = [
  { key: 'arrive', label: 'Arrive' },
  { key: 'see', label: 'See it' },
  { key: 'work', label: 'Work it' },
  { key: 'carry', label: 'Take it with you' },
]

async function readStream(res: Response, on: (e: StreamEvent) => void) {
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim()
      buf = buf.slice(nl + 1)
      if (line) {
        try {
          on(JSON.parse(line) as StreamEvent)
        } catch {}
      }
    }
  }
}

export function SessionView({ id: initialId, start }: { id?: string; start?: StartSpec }) {
  const [id, setId] = useState<string | undefined>(initialId)
  const [info, setInfo] = useState<SessionInfo | null>(null)
  const [access, setAccess] = useState<Access | null>(null)
  const [log, setLog] = useState<LogItem[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [input, setInput] = useState('')
  const [fatal, setFatal] = useState<{ text: string; reason?: string } | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const followRef = useRef(true)
  const startedRef = useRef(false)
  /** Items that arrived live (animate in); items loaded from history don't. */
  const liveRef = useRef(new Set<string>())

  const refresh = useCallback(async (sid: string) => {
    const res = await fetch(`/api/session/${sid}`)
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setFatal({ text: j.error ?? 'Could not load this session.', reason: res.status === 401 ? 'signin' : undefined })
      return
    }
    const j = await res.json()
    setInfo(j.session)
    setLog(j.session.log)
    setAccess(j.access)
  }, [])

  const onEvent = useCallback((e: StreamEvent) => {
    if (e.t === 'session') {
      setId(e.id)
      window.history.replaceState(null, '', `/session/${e.id}`)
    } else if (e.t === 'text') {
      setDraft((d) => d + e.v)
    } else if (e.t === 'item') {
      if (e.item.type === 'guide') setDraft('')
      liveRef.current.add(e.item.id)
      setLog((l) => [...l, e.item])
      if (e.item.type === 'phase') {
        const phase = e.item.phase
        setInfo((i) => (i ? { ...i, phase } : i))
      }
    } else if (e.t === 'status') {
      setInfo((i) => (i ? { ...i, status: e.status } : i))
    }
  }, [])

  // Load an existing session, or start a new one.
  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    if (initialId) {
      refresh(initialId)
      return
    }
    if (!start) return
    ;(async () => {
      setBusy(true)
      if (start.kind === 'situation') setLog([{ id: 'local-first', type: 'user', text: start.text }])
      try {
        const res = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(start.kind === 'module' ? start : { kind: 'situation', text: start.text }),
        })
        if (!res.ok) {
          const j = await res.json().catch(() => ({}))
          setFatal({ text: j.error ?? 'Could not start the session.', reason: j.reason })
          return
        }
        let sid: string | undefined
        await readStream(res, (e) => {
          if (e.t === 'session') sid = e.id
          if (e.t === 'item' && e.item.type === 'user') return // the situation text is already shown
          onEvent(e)
        })
        if (sid) await refresh(sid)
      } catch {
        setFatal({ text: 'The connection dropped while starting. Try again.' })
      } finally {
        setDraft('')
        setBusy(false)
      }
    })()
  }, [initialId, start, refresh, onEvent])

  useEffect(() => {
    if (followRef.current) window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }, [log, draft])

  // Follow new content unless the reader scrolls up; resume once they're back near the bottom.
  useEffect(() => {
    const nearBottom = () => window.innerHeight + window.scrollY > document.body.scrollHeight - 200
    const onUserScroll = (e: Event) => {
      if (e instanceof WheelEvent && e.deltaY < 0) followRef.current = false
      else if (e.type === 'touchmove') followRef.current = nearBottom()
    }
    const onScroll = () => {
      if (nearBottom()) followRef.current = true
    }
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  async function send(text: string, check?: { itemId: string; index: number }) {
    if (!id || busy) return
    const t = text.trim()
    if (!t && !check) return
    setInput('')
    setBusy(true)
    followRef.current = true
    if (check) {
      setLog((l) => l.map((it) => (it.id === check.itemId && it.type === 'card' && it.card.kind === 'check' ? { ...it, card: { ...it.card, chosen: check.index } } : it)))
    }
    try {
      const res = await fetch(`/api/session/${id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t || '(answer)', check }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setLog((l) => [...l, { id: `err-${Date.now()}`, type: 'error', text: j.error ?? 'That did not send.' }])
        return
      }
      await readStream(res, onEvent)
      await refresh(id)
    } catch {
      setLog((l) => [...l, { id: `err-${Date.now()}`, type: 'error', text: 'The connection dropped. Your session is saved; try again.' }])
    } finally {
      setDraft('')
      setBusy(false)
    }
  }

  const lastIndex = log.length - 1
  const latestCheckId = useMemo(() => [...log].reverse().find((l) => l.type === 'card' && l.card.kind === 'check')?.id, [log])
  const found = log.filter((l) => l.type === 'card' && ['mode', 'insight', 'practice', 'concept', 'shift'].includes(l.card.kind))
  const phase = info?.phase ?? 'arrive'
  const backHref = info?.kind === 'module' || start?.kind === 'module'
    ? `/life/${(info?.moduleId ?? (start as { moduleId: string }).moduleId)}`
    : '/situation'
  const blocked = access ? !access.canReply : false
  const paywalled = log.some((l) => l.type === 'paywall') && !access?.member

  if (fatal) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">
          {fatal.reason === 'signin' ? 'Sign in to continue' : fatal.reason === 'situations' ? "You've used this month's free readings" : 'Something went wrong'}
        </h1>
        <p className="text-muted-foreground mb-6">
          {fatal.reason === 'situations'
            ? 'Free accounts get two situation readings a month. Members can bring situations whenever they come up.'
            : fatal.text}
        </p>
        {fatal.reason === 'signin' && (
          <Link href={`/signin?next=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '/life')}`} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl text-sm font-medium">
            Sign in
          </Link>
        )}
        {fatal.reason === 'situations' && <UpgradeButton returnTo="/situation" />}
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="sticky top-14 z-20 border-b bg-[color-mix(in_oklab,var(--paper)_92%,transparent)] backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link href={backHref} className="text-muted-foreground hover:text-foreground" aria-label="Back">
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {(info?.kind ?? start?.kind) === 'situation' ? 'Situation reading' : 'Guided session'}
            </div>
            <div className="truncate font-display text-lg leading-tight">{info?.title ?? 'Starting…'}</div>
          </div>
          {access?.practice && (
            <span className="chip hidden sm:inline-flex" title="No API key is configured, so the guide is scripted.">
              <FlaskConical size={11} /> Practice mode
            </span>
          )}
        </div>
        <ol className="mx-auto max-w-6xl px-4 sm:px-6 pb-3 grid grid-cols-4 gap-2" aria-label="Session progress">
          {PHASES.map((p, i) => {
            const cur = PHASES.findIndex((x) => x.key === phase)
            const state = i < cur || info?.status === 'complete' ? 'done' : i === cur ? 'now' : 'next'
            return (
              <li key={p.key} aria-current={state === 'now' ? 'step' : undefined}>
                <div
                  className="h-1 rounded-full transition-colors duration-500"
                  style={{ background: state === 'next' ? 'var(--rule)' : state === 'now' ? 'var(--accent-violet)' : 'color-mix(in oklab, var(--accent-violet) 45%, var(--rule))' }}
                />
                <div className={`mt-1.5 text-[11px] ${state === 'now' ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{p.label}</div>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-10">
        {/* Conversation */}
        <main className="min-w-0 max-w-2xl w-full mx-auto lg:mx-0 pt-8 pb-40 space-y-6">
          {log.map((item, idx) => {
            switch (item.type) {
              case 'user':
                return (
                  <div key={item.id} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-secondary px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap">{item.text}</div>
                  </div>
                )
              case 'guide':
                return <RichText key={item.id} text={item.text} />
              case 'card':
                return (
                  <div key={item.id} className={liveRef.current.has(item.id) ? 'nt-appear' : undefined}>
                    <CardView
                      card={item.card}
                      onAnswer={item.card.kind === 'check' && item.id === latestCheckId && !busy && !blocked ? (i) => send('', { itemId: item.id, index: i }) : undefined}
                    />
                  </div>
                )
              case 'replies':
                return idx === lastIndex && !busy && !blocked ? (
                  <div key={item.id} className="flex flex-wrap gap-2">
                    {item.options.map((o) => (
                      <button key={o} type="button" className="nt-reply" onClick={() => send(o)}>
                        {o}
                      </button>
                    ))}
                  </div>
                ) : null
              case 'phase':
                return null
              case 'paywall':
                return access?.member ? null : <Paywall key={item.id} sessionId={id} />
              case 'limit':
              case 'error':
                return (
                  <div key={item.id} className="rounded-xl border border-dashed px-4 py-3 text-sm text-muted-foreground">
                    {item.text}
                  </div>
                )
            }
          })}

          {draft && (
            <div className="relative">
              <RichText text={draft} />
              <span className="inline-block w-1.5 h-4 bg-foreground/70 animate-pulse align-middle" />
            </div>
          )}
          {busy && !draft && (
            <div className="flex gap-1.5 py-2" aria-label="The guide is thinking">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: `${i * 160}ms` }} />
              ))}
            </div>
          )}
          {info?.status === 'complete' && !busy && (
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/notebook" className="nt-reply inline-flex items-center gap-1.5">
                <BookOpen size={14} /> Open your notebook
              </Link>
              <Link href="/life" className="nt-reply">Back to the library</Link>
            </div>
          )}
          <div ref={bottomRef} />
        </main>

        {/* What you've found */}
        <aside className="hidden lg:block pt-8">
          <div className="sticky top-32 space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">What you've found</div>
            {found.length === 0 ? (
              <p className="text-sm text-muted-foreground leading-relaxed">Modes you recognize, ideas, and what you take away will collect here as you go.</p>
            ) : (
              <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
                {found.map((f) =>
                  f.type === 'card' ? (
                    <div key={f.id} className="rounded-xl border bg-card px-3 py-2.5">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {{ mode: 'Mode', insight: 'Insight', practice: 'Practice', concept: 'Idea', shift: 'Shift' }[f.card.kind as string]}
                      </div>
                      <div className="text-sm leading-snug">
                        {f.card.kind === 'mode'
                          ? f.card.name
                          : f.card.kind === 'concept'
                            ? f.card.name
                            : f.card.kind === 'insight' || f.card.kind === 'shift'
                              ? f.card.text
                              : f.card.kind === 'practice'
                                ? f.card.instruction
                                : ''}
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Composer */}
      {!paywalled && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-[color-mix(in_oklab,var(--paper)_94%,transparent)] backdrop-blur">
          <form
            className="mx-auto max-w-2xl px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            {access?.tasteRemaining != null && (
              <div className="mb-2 text-xs text-muted-foreground">
                {access.tasteRemaining} free {access.tasteRemaining === 1 ? 'reply' : 'replies'} left in this session ·{' '}
                <Link href="/pricing" className="underline underline-offset-4">membership</Link>
              </div>
            )}
            {blocked && access?.blockedReason === 'daily' && (
              <div className="mb-2 text-xs text-muted-foreground">You've reached today's fair-use limit. Your session is saved.</div>
            )}
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    send(input)
                  }
                }}
                rows={1}
                placeholder={busy ? 'The guide is responding…' : 'Write back…'}
                disabled={busy || blocked || !id}
                aria-label="Your reply"
                className="flex-1 resize-none rounded-2xl border bg-card px-4 py-3 text-[15px] leading-relaxed focus:outline-none focus:border-[var(--accent-violet)] disabled:opacity-60 max-h-40"
              />
              <button
                type="submit"
                disabled={busy || blocked || !input.trim() || !id}
                className="h-11 w-11 flex-none rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30"
                aria-label="Send"
              >
                <ArrowUp size={18} />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground/80">Education, not therapy. If you're in crisis, call or text 988 (US) or your local emergency number.</p>
          </form>
        </div>
      )}
    </div>
  )
}

function Paywall({ sessionId }: { sessionId?: string }) {
  return (
    <div className="nt-card nt-shift text-center py-8">
      <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card border">
        <Lock size={16} />
      </div>
      <h3 className="font-display text-2xl mb-2">That's the free part of this session</h3>
      <p className="mx-auto max-w-md text-[15px] text-muted-foreground leading-relaxed mb-5">
        Members get the rest of this session and every other one. Your session is saved, so if you join you'll pick up right here.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <UpgradeButton label="Become a member" returnTo={sessionId ? `/session/${sessionId}` : '/life'} />
        <Link href="/pricing" className="text-sm text-muted-foreground underline underline-offset-4">What's included</Link>
      </div>
    </div>
  )
}
