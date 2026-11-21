import type Anthropic from '@anthropic-ai/sdk'

export type Plan = 'free' | 'member'

export interface UserRecord {
  id: string
  email: string
  plan: Plan
  stripeCustomerId?: string | null
  subscriptionStatus?: string | null
  currentPeriodEnd?: string | null
  createdAt: string
}

/* ------------------------------------------------------------------ *
 * Session content shown on screen. The guide produces these through tools;
 * the server stores them and the client renders them.
 * ------------------------------------------------------------------ */

export type Phase = 'arrive' | 'see' | 'work' | 'carry'

export interface SplitCard { kind: 'split'; title?: string; events: string[]; story: string[] }
export interface ModeCard {
  kind: 'mode'
  name: string
  narrative: string
  body: string
  action: string
  energy: string
  saved?: boolean
}
export interface ConceptCard { kind: 'concept'; slug: string; name: string; definition: string; inYourWords: string }
export interface CheckCard {
  kind: 'check'
  question: string
  options: string[]
  answerIndex: number
  explanation: string
  chosen?: number
}
export interface InsightCard { kind: 'insight'; text: string; concept?: string }
export interface PracticeCard { kind: 'practice'; instruction: string; when: string; days: number }
export interface SummaryCard { kind: 'summary'; summary: string; takeaways: string[]; next?: string }
export interface ShiftCard { kind: 'shift'; text: string }

export type Card =
  | SplitCard
  | ModeCard
  | ConceptCard
  | CheckCard
  | InsightCard
  | PracticeCard
  | SummaryCard
  | ShiftCard

/** One entry in the on-screen log. */
export type LogItem =
  | { id: string; type: 'user'; text: string }
  | { id: string; type: 'guide'; text: string }
  | { id: string; type: 'card'; card: Card }
  | { id: string; type: 'replies'; options: string[] }
  | { id: string; type: 'phase'; phase: Phase }
  | { id: string; type: 'paywall'; reason: 'taste' | 'situations' | 'program' }
  | { id: string; type: 'limit'; text: string }
  | { id: string; type: 'error'; text: string }

export type SessionKind = 'module' | 'situation'
export type SessionStatus = 'active' | 'complete' | 'locked'

export interface SessionRecord {
  id: string
  userId: string
  kind: SessionKind
  /** "shelf/module" for module sessions; "situation" otherwise. */
  moduleId: string
  title: string
  status: SessionStatus
  phase: Phase
  /** Frozen at session start so the prompt prefix never changes (prompt cache + preserved thinking). */
  system: string
  /** Full API transcript, append-only, replayed verbatim on every turn. */
  apiMessages: Anthropic.Beta.BetaMessageParam[]
  log: LogItem[]
  userReplies: number
  createdAt: string
  updatedAt: string
}

export type NotebookKind = 'insight' | 'mode' | 'practice' | 'summary'

export interface NotebookItem {
  id: string
  userId: string
  kind: NotebookKind
  sessionId: string
  moduleId: string
  card: Card
  createdAt: string
}

/** Events streamed to the browser as newline-delimited JSON. */
export type StreamEvent =
  | { t: 'session'; id: string }
  | { t: 'text'; v: string }
  | { t: 'item'; item: LogItem }
  | { t: 'status'; status: SessionStatus }
  | { t: 'done' }
  | { t: 'error'; v: string }

/** A reader's story of a mode, for the Mode Field Guide. Private until the owner approves it. */
export type StoryStatus = 'new' | 'approved' | 'hidden'
export interface ModeStory {
  id: string
  userId: string
  modeSlug: string
  modeName: string
  text: string
  status: StoryStatus
  createdAt: string
}
