import { devAuth } from '@/lib/config'
import type { ContactMessage, ModeStory, NotebookItem, SessionRecord, StoryStatus, UserRecord } from '@/lib/types'
import { fileStore } from './file'
import { supabaseStore } from './supabase'

/**
 * Persistence for users, sessions and notebook entries. Two implementations:
 * a JSON file for local development, Supabase Postgres in production.
 * Server-only — never import from a client component.
 */
export interface Store {
  getUser(id: string): Promise<UserRecord | null>
  /** Creates the user row on first sign-in; returns the existing one otherwise. */
  ensureUser(id: string, email: string): Promise<UserRecord>
  updateUser(id: string, patch: Partial<UserRecord>): Promise<UserRecord | null>
  findUserByCustomer(customerId: string): Promise<UserRecord | null>

  createSession(s: SessionRecord): Promise<void>
  getSession(id: string): Promise<SessionRecord | null>
  saveSession(s: SessionRecord): Promise<void>
  listSessions(userId: string): Promise<SessionRecord[]>

  addNotebook(item: NotebookItem): Promise<void>
  listNotebook(userId: string): Promise<NotebookItem[]>
  deleteNotebook(userId: string, id: string): Promise<void>

  /** Replies sent by this user since `since` (ISO), across all sessions. */
  countRepliesSince(userId: string, since: string): Promise<number>
  /** Records one reply for fair-use counting. */
  recordReply(userId: string, sessionId: string): Promise<void>

  /** Contact-form messages. */
  addMessage(m: ContactMessage): Promise<void>
  listMessages(): Promise<ContactMessage[]>
  /** Readers' mode stories (Mode Field Guide). */
  addStory(s: ModeStory): Promise<void>
  listStories(filter: { status?: StoryStatus; modeSlug?: string; userId?: string }): Promise<ModeStory[]>
  setStoryStatus(id: string, status: StoryStatus): Promise<void>
}

export const store: Store = devAuth ? fileStore : supabaseStore

export const newId = () =>
  (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36))
