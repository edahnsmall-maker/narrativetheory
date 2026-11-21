import { getModule } from '@/lib/data/lifeInstruction'
import { conceptBySlug } from '@/lib/data/concepts'
import type { NotebookItem } from '@/lib/types'
import { FOUNDATION, SESSION_METHOD, SITUATION_METHOD } from './voice'

/**
 * System prompts, built once at session start and frozen into the session
 * record. Never rebuilt mid-session: the prefix must stay byte-identical for
 * prompt caching and preserved thinking.
 */

function learnerContext(notes: NotebookItem[]): string {
  const modes = notes.filter((n) => n.card.kind === 'mode').slice(0, 8)
  const insights = notes.filter((n) => n.card.kind === 'insight').slice(0, 4)
  const practices = notes.filter((n) => n.card.kind === 'practice').slice(0, 2)
  if (!modes.length && !insights.length && !practices.length) {
    return '# About this person\n\nThis is their first guided session, or they have nothing saved yet.'
  }
  const lines = ['# About this person', '', 'From their notebook (earlier sessions). Connect to these when it genuinely helps; don\'t recite them.']
  if (modes.length) {
    lines.push('', 'Modes they have recognized as theirs:')
    for (const m of modes) if (m.card.kind === 'mode') lines.push(`- ${m.card.name}: ${m.card.narrative} / ${m.card.body}`)
  }
  if (insights.length) {
    lines.push('', 'Things they have realized:')
    for (const n of insights) if (n.card.kind === 'insight') lines.push(`- "${n.card.text}"`)
  }
  if (practices.length) {
    lines.push('', 'Practices they took away recently (worth a light check-in if relevant):')
    for (const p of practices) if (p.card.kind === 'practice') lines.push(`- ${p.card.instruction} (${p.createdAt.slice(0, 10)})`)
  }
  return lines.join('\n')
}

export function moduleSystem(moduleId: string, notes: NotebookItem[]): { system: string; title: string } | null {
  const [shelfSlug, moduleSlug] = moduleId.split('/')
  const found = getModule(shelfSlug, moduleSlug)
  if (!found) return null
  const { shelf, module: mod } = found
  const related = (mod.relatedConcepts ?? [])
    .map((s) => conceptBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => `- ${c.name} (${c.slug}): ${c.shortDef}`)
    .join('\n')

  const parts = [
    FOUNDATION,
    SESSION_METHOD,
    `# The module: ${mod.name}`,
    `Shelf: ${shelf.name}.${mod.issueCategory ? ` Kind of material: ${mod.issueCategory}.` : ''}`,
    'The person may have read the article below. Teach its idea; do not recite it. Where the article and your foundation disagree, the foundation wins.',
    mod.sections.Article ? `## Article\n\n${mod.sections.Article}` : '',
    mod.sections.Exercise ? `## Exercise (from the page)\n\n${mod.sections.Exercise}` : '',
    related ? `## Related NT concepts\n\n${related}` : '',
    mod.subPrompt ? `## Module-specific guidance\n\n${mod.subPrompt}` : '',
    learnerContext(notes),
  ].filter(Boolean)

  return { system: parts.join('\n\n'), title: mod.name }
}

export function situationSystem(notes: NotebookItem[]): { system: string; title: string } {
  return {
    system: [FOUNDATION, SITUATION_METHOD, learnerContext(notes)].join('\n\n'),
    title: 'A situation',
  }
}

/** The hidden opening line that starts a session (never shown on screen). */
export function openingLine(kind: 'module' | 'situation', start: 'own' | 'example', situationText?: string) {
  if (kind === 'situation') {
    return `(The person opened "Bring a Situation" and wrote:)\n\n${situationText ?? ''}`
  }
  return start === 'example'
    ? '(The person just opened this session and chose to start with a worked example rather than their own situation. Begin with a brief welcome and the example.)'
    : '(The person just opened this session and chose to work with something from their own life. Begin with a brief welcome — one or two sentences on what this session is about — and ask for one specific, recent situation.)'
}
