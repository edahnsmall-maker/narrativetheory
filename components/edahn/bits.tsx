'use client'

/**
 * A phrase carrying a flat violet rule. There is deliberately no hover
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
