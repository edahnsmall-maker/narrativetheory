import fs from 'node:fs'
import path from 'node:path'

/**
 * Edahn's writing: plain markdown files in content/notes (short thoughts) and
 * content/essays (longer pieces). Add a file, commit, and it's on the site.
 * See content/README.md. Server-only.
 *
 * Front matter (between --- lines at the top), all optional except date:
 *   title: Letting Go
 *   date: 2026-05-24
 *   tags: zen, practice
 *   summary: One line for the index.
 *   draft: true        (hidden on the live site; visible in local development)
 */

export type Kind = 'notes' | 'essays'

export interface Post {
  kind: Kind
  slug: string
  title: string
  date: string
  tags: string[]
  summary: string
  draft: boolean
  body: string
}

const ROOT = path.join(process.cwd(), 'content')

function parse(kind: Kind, file: string): Post {
  const raw = fs.readFileSync(path.join(ROOT, kind, file), 'utf8').replace(/\r\n/g, '\n')
  const meta: Record<string, string> = {}
  let body = raw
  const fm = /^---\n([\s\S]*?)\n---\n?/.exec(raw)
  if (fm) {
    body = raw.slice(fm[0].length)
    for (const line of fm[1].split('\n')) {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    }
  }
  const slug = file.replace(/\.md$/, '')
  return {
    kind,
    slug,
    title: meta.title ?? '',
    date: meta.date ?? slug.slice(0, 10),
    tags: (meta.tags ?? '').split(',').map((t) => t.trim()).filter(Boolean),
    summary: meta.summary ?? '',
    draft: meta.draft === 'true',
    body: body.trim(),
  }
}

/** Drafts show in local development (and with ?drafts=1 for previewing); never on the live site otherwise. */
export function showDrafts(previewParam?: string | string[]) {
  return process.env.NODE_ENV !== 'production' || previewParam === '1'
}

export function listPosts(kind: Kind, includeDrafts = false): Post[] {
  const dir = path.join(ROOT, kind)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parse(kind, f))
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getPost(kind: Kind, slug: string): Post | null {
  if (!/^[\w-]+$/.test(slug)) return null
  const file = path.join(ROOT, kind, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  return parse(kind, `${slug}.md`)
}

export function formatDate(iso: string) {
  const d = new Date(iso + 'T12:00:00')
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
