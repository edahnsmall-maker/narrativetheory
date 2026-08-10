/**
 * The data model for the five-stage program.
 *
 * Everything the AI produces lands in a single `ProgramState` object. The
 * conversation is the interface; this object is the artifact. It persists to
 * localStorage (demo mode — no accounts), so it must stay JSON-serializable
 * and must never hold anything derived that we can recompute on render.
 */

export type StageId = 1 | 2 | 3 | 4 | 5

export type StageStatus = 'locked' | 'active' | 'complete'

/* ------------------------------------------------------------------ *
 * Stage 1 — Gather
 * ------------------------------------------------------------------ */

/**
 * Categories deliberately mirror the questions a careful listener would
 * already be holding in mind, rather than a clinical intake form.
 */
export type ObservationCategory =
  | 'ailment' // what actually hurts, in their words
  | 'relationship'
  | 'outlook' // how the world appears to them
  | 'history' // held loosely; never treated as a cause
  | 'strength'
  | 'contradiction' // where their account argues with itself

export interface Observation {
  id: string
  category: ObservationCategory
  /** One sentence, in language close to the person's own. */
  text: string
  /** Where this came from, so the user can push back on it. */
  basis?: string
  createdAt: number
}

/* ------------------------------------------------------------------ *
 * Stage 2 — Map the dream
 * ------------------------------------------------------------------ */

/**
 * The five node kinds are the layers of the diagram, in causal order.
 * `origin` sits first but is explicitly the weakest claim we make — the
 * program does not assert 1:1 links between past events and present pattern.
 */
export type NodeKind =
  | 'origin' // something earlier that may have set the conditions
  | 'trigger' // what switches the dream on now
  | 'world' // the world as it appears once the dream is running
  | 'lens' // the specific ways of seeing that the world produces
  | 'consequence' // what then happens, usually on repeat

export type Confidence = 'proposed' | 'confirmed' | 'rejected'

export interface MapNode {
  id: string
  kind: NodeKind
  /** Short — this is the label drawn in the box. */
  label: string
  /** The longer claim, shown on hover/expand. */
  detail?: string
  confidence: Confidence
  createdAt: number
}

export interface MapEdge {
  id: string
  from: string
  to: string
  /** The verb of the relationship: "hardens into", "gets read as". */
  label?: string
  confidence: Confidence
}

export interface DreamMap {
  title?: string
  /** The dream stated in a single sentence, once it's earned. */
  thesis?: string
  nodes: MapNode[]
  edges: MapEdge[]
}

/* ------------------------------------------------------------------ *
 * Stage 3 — Manage the dream
 * ------------------------------------------------------------------ */

export interface ResponseOption {
  text: string
  /** Why this one might fail, stated up front rather than discovered later. */
  caveat?: string
}

export interface IfThen {
  when: string
  then: string
}

export interface PlanIssue {
  id: string
  title: string
  /** The concrete conditions under which this shows up. */
  showsUpWhen: string
  /** What the person is actually responsible for here. */
  responsibility?: string
  responses: ResponseOption[]
  protocols: IfThen[]
  /** Linked map node, when this issue traces to one. */
  nodeId?: string
  createdAt: number
}

/** An objection or failure mode named in advance, so it can't derail things. */
export interface Anticipation {
  id: string
  objection: string
  reply: string
  createdAt: number
}

export interface ManagementPlan {
  issues: PlanIssue[]
  anticipations: Anticipation[]
}

/* ------------------------------------------------------------------ *
 * Stage 4 — Monitor
 * ------------------------------------------------------------------ */

export type CheckinStatus = 'went-well' | 'mixed' | 'did-not-happen' | 'harder-than-expected'

export interface Checkin {
  id: string
  status: CheckinStatus
  note: string
  createdAt: number
}

export interface Mission {
  id: string
  title: string
  /** The reason, tied back to the map — missions without a why get dropped. */
  why?: string
  cadence?: string
  successLooksLike?: string
  issueId?: string
  checkins: Checkin[]
  active: boolean
  createdAt: number
}

/* ------------------------------------------------------------------ *
 * Stage 5 — Wake up
 * ------------------------------------------------------------------ */

export interface Practice {
  id: string
  name: string
  instructions: string
  /** Free text: "5 minutes", "whenever you notice the grip". */
  duration?: string
  /** What in the map this practice is aimed at loosening. */
  aimedAt?: string
  createdAt: number
}

/* ------------------------------------------------------------------ *
 * Conversation
 * ------------------------------------------------------------------ */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  /** Summaries of what the model wrote to state on this turn. */
  effects?: string[]
  createdAt: number
}

/* ------------------------------------------------------------------ *
 * Root
 * ------------------------------------------------------------------ */

export interface ProgramState {
  version: number
  createdAt: number
  updatedAt: number
  currentStage: StageId
  status: Record<StageId, StageStatus>
  /**
   * Set when the model believes a stage is finished. Advancing is always the
   * user's click, never the model's — the stage ends when they say it does.
   */
  completionProposals: Partial<Record<StageId, string>>
  observations: Observation[]
  map: DreamMap
  plan: ManagementPlan
  missions: Mission[]
  practices: Practice[]
  transcripts: Record<StageId, ChatMessage[]>
}

/* ------------------------------------------------------------------ *
 * Tool calls — the model's write access to the state above
 * ------------------------------------------------------------------ */

export interface ToolCall {
  name: string
  input: Record<string, unknown>
}
