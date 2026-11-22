import { Fragment, type ReactNode } from 'react'

/**
 * Renders the light markdown used in module text:
 *   ```text fences  → a "prompt" box (one line per prompt, body font, not code)
 *   ---             → a divider (dropped when it's the last thing in a block)
 *   > quote         → a pull quote
 *   1. / - lists    → ordered / unordered lists
 *   **bold**, *italic*, _italic_, ~~struck~~ inline; * escapes a marker
 */

type Part =
  | { type: 'p'; text: string }
  | { type: 'h'; level: 2 | 3; text: string }
  | { type: 'prompts'; groups: string[][] }
  | { type: 'hr' }
  | { type: 'quote'; text: string }
  | { type: 'ol' | 'ul'; items: string[] }

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|\*([^*\s][^*\n]*?)\*|(?<![\w])_([^_\n]+)_(?![\w])|~~([^~\n]+)~~|\\([*_~\\])/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1] && m[2]) {
      const href = m[2]
      const safe = /^(https?:\/\/|\/|#|mailto:)/.test(href) ? href : '#'
      const external = safe.startsWith('http')
      out.push(
        <a key={k++} href={safe} className="underline underline-offset-4 decoration-[var(--accent-violet)]/60 hover:decoration-[var(--accent-violet)]" {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {m[1]}
        </a>,
      )
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>)
    else if (m[6]) out.push(<s key={k++}>{m[6]}</s>)
    else if (m[7]) out.push(m[7])
    else out.push(<em key={k++}>{m[4] ?? m[5]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function parse(text: string): Part[] {
  const parts: Part[] = []
  const segs = text.replace(/\r\n/g, '\n').split(/```[a-z]*\n([\s\S]*?)```/)
  segs.forEach((seg, i) => {
    if (i % 2 === 1) {
      const groups = seg
        .trim()
        .split(/\n\s*\n/)
        .map((g) => g.split('\n').map((l) => l.trim()).filter(Boolean))
        .filter((g) => g.length)
      if (groups.length) parts.push({ type: 'prompts', groups })
      return
    }
    for (const raw of seg.split(/\n\s*\n/)) {
      const p = raw.trim()
      if (!p) continue
      const lines = p.split('\n').map((l) => l.trim())
      const heading = /^(#{2,3})\s+(.+)$/.exec(p)
      if (heading && lines.length === 1) parts.push({ type: 'h', level: heading[1].length as 2 | 3, text: heading[2] })
      else if (/^-{3,}$/.test(p)) parts.push({ type: 'hr' })
      else if (lines.every((l) => l.startsWith('>')))
        parts.push({ type: 'quote', text: lines.map((l) => l.replace(/^>\s?/, '')).join('\n') })
      else if (lines.every((l) => /^\d+[.)]\s/.test(l)))
        parts.push({ type: 'ol', items: lines.map((l) => l.replace(/^\d+[.)]\s+/, '')) })
      else if (lines.every((l) => /^[-•]\s/.test(l)))
        parts.push({ type: 'ul', items: lines.map((l) => l.replace(/^[-•]\s+/, '')) })
      else parts.push({ type: 'p', text: p })
    }
  })
  while (parts.length && parts[parts.length - 1].type === 'hr') parts.pop()
  return parts
}

/** Strips the markdown above, for short previews. */
export function plainText(text: string): string {
  return text
    .replace(/```[a-z]*\n?|```/g, '')
    .replace(/^\s*(>|-{3,}|[-•]\s|\d+[.)]\s|#{1,3}\s)/gm, '')
    .replace(/\[([^\]\n]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*\n]+)\*\*|\*([^*\s][^*\n]*?)\*/g, (_, b, i) => b ?? i)
    .replace(/\s+/g, ' ')
    .trim()
}

export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const parts = parse(text)
  return (
    <div className={`space-y-5 ${className}`}>
      {parts.map((p, i) => {
        switch (p.type) {
          case 'prompts':
            return (
              <div key={i} className="prompt-box">
                {p.groups.map((g, gi) => (
                  <ul key={gi}>
                    {g.map((l, li) => (
                      <li key={li}>{inline(l)}</li>
                    ))}
                  </ul>
                ))}
              </div>
            )
          case 'h':
            return p.level === 2 ? (
              <h2 key={i} className="font-display text-2xl md:text-3xl leading-tight pt-6">{inline(p.text)}</h2>
            ) : (
              <h3 key={i} className="font-display text-xl leading-snug pt-3">{inline(p.text)}</h3>
            )
          case 'hr':
            return <hr key={i} className="border-rule" />
          case 'quote':
            return (
              <blockquote key={i} className="pull-quote whitespace-pre-line">
                {inline(p.text)}
              </blockquote>
            )
          case 'ol':
          case 'ul': {
            const List = p.type
            return (
              <List key={i} className={`prose-nt text-[17px] leading-relaxed pl-6 space-y-1 ${p.type === 'ol' ? 'list-decimal' : 'list-disc'}`}>
                {p.items.map((it, ii) => (
                  <li key={ii}>{inline(it)}</li>
                ))}
              </List>
            )
          }
          default:
            return (
              <p key={i} className="prose-nt text-[17px] leading-relaxed whitespace-pre-line">
                {p.text.split('\n').map((line, li, arr) => (
                  <Fragment key={li}>
                    {inline(line)}
                    {li < arr.length - 1 ? '\n' : null}
                  </Fragment>
                ))}
              </p>
            )
        }
      })}
    </div>
  )
}
