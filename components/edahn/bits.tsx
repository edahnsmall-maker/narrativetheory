'use client'

import type { Note } from '@/lib/edahn/content'

/**
 * A phrase carrying a flat coloured rule. There is deliberately no hover
 * behaviour — an earlier version redrew the rule as a squiggle on hover and it
 * read as a gimmick bolted onto the type rather than part of it.
 */
export function Mark({ children }: { children: React.ReactNode }) {
  return <span className="e-mark">{children}</span>
}

/**
 * Splits a line so the phrases listed in `marks` come back ruled. Matching is
 * literal and first-occurrence, which is all the copy needs.
 */
export function marked(text: string, marks?: string[]): React.ReactNode {
  if (!marks?.length) return text

  const remaining = [...marks]
  const out: React.ReactNode[] = []
  let rest = text
  let key = 0

  while (remaining.length) {
    const phrase = remaining.shift()!
    const at = rest.indexOf(phrase)
    if (at === -1) continue
    if (at > 0) out.push(rest.slice(0, at))
    out.push(<Mark key={key++}>{phrase}</Mark>)
    rest = rest.slice(at + phrase.length)
  }

  if (rest) out.push(rest)
  return out
}

/**
 * The long material, as a solid block that slides in a beat after its slide
 * settles — no click, no dismiss. Visibility is driven entirely by the
 * `data-active` attribute the deck sets on the parent slide, so the animation
 * rides the scroll rather than needing its own observer.
 */
export function NoteBlock({ note }: { note: Note }) {
  return (
    <aside className="e-note-block">
      <p className="e-note-label">{note.label}</p>
      <div className="e-note-body">
        {note.title && <h3>{note.title}</h3>}
        {note.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </aside>
  )
}
