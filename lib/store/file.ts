import fs from 'node:fs'
import path from 'node:path'
import type { Store } from './index'
import type { ModeStory, NotebookItem, SessionRecord, UserRecord } from '@/lib/types'

/**
 * Local-development store: one JSON file at .data/dev-store.json (gitignored).
 * Fine for one developer clicking around; not for production.
 */

interface Db {
  users: Record<string, UserRecord>
  sessions: Record<string, SessionRecord>
  notebook: NotebookItem[]
  replies: { userId: string; sessionId: string; at: string }[]
  stories?: ModeStory[]
}

const FILE = path.join(process.cwd(), '.data', 'dev-store.json')

function load(): Db {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8')) as Db
  } catch {
    return { users: {}, sessions: {}, notebook: [], replies: [] }
  }
}

function save(db: Db) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(db, null, 1))
}

export const fileStore: Store = {
  async addStory(st) {
    const db = load()
    db.stories = [...(db.stories ?? []), st]
    save(db)
  },
  async listStories(f) {
    return (load().stories ?? [])
      .filter((x) => (!f.status || x.status === f.status) && (!f.modeSlug || x.modeSlug === f.modeSlug) && (!f.userId || x.userId === f.userId))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  async setStoryStatus(id, status) {
    const db = load()
    db.stories = (db.stories ?? []).map((x) => (x.id === id ? { ...x, status } : x))
    save(db)
  },

  async getUser(id) {
    return load().users[id] ?? null
  },
  async ensureUser(id, email) {
    const db = load()
    if (!db.users[id]) {
      db.users[id] = { id, email, plan: 'free', createdAt: new Date().toISOString() }
      save(db)
    }
    return db.users[id]
  },
  async updateUser(id, patch) {
    const db = load()
    if (!db.users[id]) return null
    db.users[id] = { ...db.users[id], ...patch, id }
    save(db)
    return db.users[id]
  },
  async findUserByCustomer(customerId) {
    return Object.values(load().users).find((u) => u.stripeCustomerId === customerId) ?? null
  },

  async createSession(s) {
    const db = load()
    db.sessions[s.id] = s
    save(db)
  },
  async getSession(id) {
    return load().sessions[id] ?? null
  },
  async saveSession(s) {
    const db = load()
    db.sessions[s.id] = s
    save(db)
  },
  async listSessions(userId) {
    return Object.values(load().sessions)
      .filter((s) => s.userId === userId)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  },

  async addNotebook(item) {
    const db = load()
    db.notebook.push(item)
    save(db)
  },
  async listNotebook(userId) {
    return load()
      .notebook.filter((n) => n.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },
  async deleteNotebook(userId, id) {
    const db = load()
    db.notebook = db.notebook.filter((n) => !(n.userId === userId && n.id === id))
    save(db)
  },

  async countRepliesSince(userId, since) {
    return load().replies.filter((r) => r.userId === userId && r.at >= since).length
  },
  async recordReply(userId, sessionId) {
    const db = load()
    db.replies.push({ userId, sessionId, at: new Date().toISOString() })
    // keep the file small: drop entries older than 40 days
    const cutoff = new Date(Date.now() - 40 * 864e5).toISOString()
    db.replies = db.replies.filter((r) => r.at >= cutoff)
    save(db)
  },
}
