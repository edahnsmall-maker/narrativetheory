import { currentUser, isAdmin } from '@/lib/auth'
import { newId, store } from '@/lib/store'
import { sightings, sightingSlug, species } from '@/lib/data/fieldGuide'
import type { StoryStatus } from '@/lib/types'

export const dynamic = 'force-dynamic'

const MAX_LEN = 2000
const PER_DAY = 5

/** Every mode a story can be about: described species plus sightings. */
function modeName(slug: string): string | null {
  const s = species.find((x) => x.slug === slug)
  if (s) return s.name
  const g = sightings.find((x) => sightingSlug(x.name) === slug)
  return g ? g.name : null
}

/**
 * GET /api/mode-stories?mode=slug → approved stories for a mode (anonymous).
 * GET /api/mode-stories?all=1     → every story, for the owner's review page.
 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  if (url.searchParams.get('all')) {
    const user = await currentUser()
    if (!isAdmin(user)) return Response.json({ error: 'forbidden' }, { status: 403 })
    return Response.json({ stories: await store.listStories({}) })
  }
  const mode = url.searchParams.get('mode')
  if (!mode || !modeName(mode)) return Response.json({ error: 'unknown mode' }, { status: 400 })
  const stories = await store.listStories({ status: 'approved', modeSlug: mode })
  return Response.json({ stories: stories.map((s) => ({ id: s.id, text: s.text, createdAt: s.createdAt })) })
}

/** POST { mode, text } — a signed-in reader shares a story. It stays private until approved. */
export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return Response.json({ error: 'signin' }, { status: 401 })
  let body: { mode?: string; text?: string }
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'bad request' }, { status: 400 })
  }
  const name = body.mode ? modeName(body.mode) : null
  const text = (body.text ?? '').trim()
  if (!name || !body.mode) return Response.json({ error: 'unknown mode' }, { status: 400 })
  if (text.length < 20) return Response.json({ error: 'A few sentences, please.' }, { status: 400 })
  if (text.length > MAX_LEN) return Response.json({ error: `Keep it under ${MAX_LEN} characters.` }, { status: 400 })

  const since = new Date(Date.now() - 864e5).toISOString()
  const recent = (await store.listStories({ userId: user.id })).filter((s) => s.createdAt >= since)
  if (recent.length >= PER_DAY) return Response.json({ error: 'That’s plenty for today. Thank you!' }, { status: 429 })

  await store.addStory({
    id: newId(),
    userId: user.id,
    modeSlug: body.mode,
    modeName: name,
    text,
    status: 'new',
    createdAt: new Date().toISOString(),
  })
  return Response.json({ ok: true })
}

/** PATCH { id, status } — owner approves or hides a story. */
export async function PATCH(req: Request) {
  const user = await currentUser()
  if (!isAdmin(user)) return Response.json({ error: 'forbidden' }, { status: 403 })
  const { id, status } = (await req.json().catch(() => ({}))) as { id?: string; status?: StoryStatus }
  if (!id || !status || !['new', 'approved', 'hidden'].includes(status)) return Response.json({ error: 'bad request' }, { status: 400 })
  await store.setStoryStatus(id, status)
  return Response.json({ ok: true })
}
