'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Chat from '@/components/program/Chat'
import DreamMap from '@/components/program/DreamMap'
import {
  MissionList,
  ObservationList,
  PlanBoard,
  PracticeList,
} from '@/components/program/RecordPanels'
import { STAGES, stageById } from '@/lib/program/stages'
import {
  STAGE_IDS,
  appendMessage,
  applyToolCall,
  clearState,
  completeStage,
  createState,
  goToStage,
  loadState,
  saveState,
  serializeContext,
} from '@/lib/program/state'
import type { ChatMessage, ProgramState, StageId, ToolCall } from '@/lib/program/types'

type PanelId = 'observations' | 'map' | 'plan' | 'missions' | 'practices'

const PANELS: { id: PanelId; label: string }[] = [
  { id: 'observations', label: 'Notes' },
  { id: 'map', label: 'Map' },
  { id: 'plan', label: 'Plan' },
  { id: 'missions', label: 'Missions' },
  { id: 'practices', label: 'Practice' },
]

/** Which panel is most worth looking at while a given stage is running. */
const DEFAULT_PANEL: Record<StageId, PanelId> = {
  1: 'observations',
  2: 'map',
  3: 'plan',
  4: 'missions',
  5: 'practices',
}

let messageCounter = 0
const newMessage = (role: 'user' | 'assistant', content: string, effects?: string[]): ChatMessage => ({
  id: `m${Date.now()}-${messageCounter++}`,
  role,
  content,
  effects,
  createdAt: Date.now(),
})

export default function SessionPage() {
  const [state, setState] = useState<ProgramState | null>(null)
  const [panel, setPanel] = useState<PanelId>('observations')
  const [confirmingReset, setConfirmingReset] = useState(false)

  // Mirrors state so several tool calls arriving in one stream each build on
  // the previous one rather than all reading the same stale render.
  const stateRef = useRef<ProgramState | null>(null)

  const commit = useCallback((next: ProgramState) => {
    stateRef.current = next
    setState(next)
  }, [])

  useEffect(() => {
    const restored = loadState() ?? createState()
    stateRef.current = restored
    setState(restored)
    setPanel(DEFAULT_PANEL[restored.currentStage])
  }, [])

  useEffect(() => {
    if (state) saveState(state)
  }, [state])

  const handleToolCall = useCallback(
    (call: ToolCall): string | null => {
      const current = stateRef.current
      if (!current) return null
      const { state: next, effect } = applyToolCall(current, call)
      commit(next)
      return effect
    },
    [commit],
  )

  const handleUserMessage = useCallback(
    (text: string) => {
      const current = stateRef.current
      if (!current) return
      commit(appendMessage(current, current.currentStage, newMessage('user', text)))
    },
    [commit],
  )

  const handleAssistantMessage = useCallback(
    (text: string, effects: string[]) => {
      const current = stateRef.current
      if (!current) return
      commit(
        appendMessage(
          current,
          current.currentStage,
          newMessage('assistant', text, effects.length ? effects : undefined),
        ),
      )
    },
    [commit],
  )

  const buildContext = useCallback(() => serializeContext(stateRef.current ?? createState()), [])

  const stage = state ? stageById(state.currentStage) : null
  const proposal = state?.completionProposals[state.currentStage]

  const hasAnything = useMemo(
    () =>
      Boolean(
        state &&
          (state.observations.length ||
            state.map.nodes.length ||
            state.plan.issues.length ||
            state.missions.length ||
            state.practices.length),
      ),
    [state],
  )

  if (!state || !stage) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-sm text-[var(--muted-foreground)]">Opening your record&hellip;</p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-[92rem] flex-col px-4 pb-4">
      {/* Stage rail */}
      <nav className="flex items-center gap-1 overflow-x-auto border-b border-[var(--rule)] py-3">
        {STAGES.map((s) => {
          const status = state.status[s.id]
          const isCurrent = state.currentStage === s.id
          return (
            <button
              key={s.id}
              onClick={() => {
                if (status === 'locked') return
                commit(goToStage(state, s.id))
                setPanel(DEFAULT_PANEL[s.id])
              }}
              disabled={status === 'locked'}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${
                isCurrent
                  ? 'bg-[var(--ink)] text-[var(--paper)]'
                  : status === 'locked'
                    ? 'cursor-not-allowed text-[var(--muted-foreground)] opacity-45'
                    : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'
              }`}
              title={status === 'locked' ? 'Comes later' : s.tagline}
            >
              <span className="mr-1.5 tabular-nums opacity-60">{s.id}</span>
              {s.name}
              {status === 'complete' && <span className="ml-1.5 opacity-60">&#10003;</span>}
            </button>
          )
        })}

        <div className="ml-auto flex shrink-0 items-center gap-2 pl-4">
          {confirmingReset ? (
            <>
              <span className="text-xs text-[var(--muted-foreground)]">Erase everything?</span>
              <button
                onClick={() => {
                  clearState()
                  const fresh = createState()
                  commit(fresh)
                  setPanel('observations')
                  setConfirmingReset(false)
                }}
                className="rounded-lg border border-[var(--destructive)] px-2.5 py-1 text-xs text-[var(--destructive)]"
              >
                Erase
              </button>
              <button
                onClick={() => setConfirmingReset(false)}
                className="rounded-lg px-2.5 py-1 text-xs text-[var(--muted-foreground)]"
              >
                Keep
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirmingReset(true)}
              disabled={!hasAnything}
              className="rounded-lg px-2.5 py-1 text-xs text-[var(--muted-foreground)] hover:bg-[var(--muted)] disabled:opacity-40"
            >
              Start over
            </button>
          )}
        </div>
      </nav>

      <div className="grid min-h-0 flex-1 gap-4 pt-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Conversation */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--card)]">
          <header className="border-b border-[var(--rule)] px-6 py-3">
            <h1 className="font-display text-lg leading-none">{stage.name}</h1>
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">{stage.tagline}</p>
          </header>

          <div className="min-h-0 flex-1">
            <Chat
              key={stage.id}
              stage={stage.id}
              messages={state.transcripts[stage.id]}
              buildContext={buildContext}
              onUserMessage={handleUserMessage}
              onToolCall={handleToolCall}
              onAssistantMessage={handleAssistantMessage}
            />
          </div>

          {proposal && state.status[stage.id] !== 'complete' && (
            <div className="border-t border-[var(--rule)] bg-[var(--muted)] px-6 py-4">
              <p className="text-sm leading-relaxed">{proposal}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {stage.id < 5 ? (
                  <button
                    onClick={() => {
                      const next = completeStage(state, stage.id)
                      commit(next)
                      setPanel(DEFAULT_PANEL[next.currentStage])
                    }}
                    className="rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm text-[var(--paper)]"
                  >
                    Move on to {stageById((stage.id + 1) as StageId).name}
                  </button>
                ) : (
                  <button
                    onClick={() => commit(completeStage(state, stage.id))}
                    className="rounded-lg bg-[var(--ink)] px-3.5 py-2 text-sm text-[var(--paper)]"
                  >
                    Close out the program
                  </button>
                )}
                <span className="text-xs text-[var(--muted-foreground)]">
                  Or keep going here as long as you like &mdash; nothing closes.
                </span>
              </div>
            </div>
          )}
        </section>

        {/* The record */}
        <section className="flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[var(--rule)] bg-[var(--card)]">
          <nav className="flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--rule)] px-3 py-2">
            {PANELS.map((p) => (
              <button
                key={p.id}
                onClick={() => setPanel(p.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  panel === p.id
                    ? 'bg-[var(--muted)] text-[var(--ink)]'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--ink)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </nav>

          <div className="min-h-0 flex-1 overflow-y-auto">
            {panel === 'observations' && <ObservationList observations={state.observations} />}
            {panel === 'map' && <DreamMap map={state.map} />}
            {panel === 'plan' && <PlanBoard plan={state.plan} />}
            {panel === 'missions' && <MissionList missions={state.missions} />}
            {panel === 'practices' && <PracticeList practices={state.practices} />}
          </div>
        </section>
      </div>

      <p className="pt-3 text-center text-xs text-[var(--muted-foreground)]">
        Everything here is stored in this browser only &mdash; nothing is sent to an account.{' '}
        <Link href="/program" className="underline underline-offset-2">
          What this is
        </Link>
      </p>
    </div>
  )
}
