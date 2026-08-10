import Link from 'next/link'

/**
 * Chrome shared by the personal site's inner pages. The deck itself doesn't
 * use this — it has its own rail and wordmark.
 */

const LINKS = [
  { href: '/edahn/projects', label: 'AI projects' },
  { href: '/edahn/therapy', label: 'Therapy' },
  { href: '/edahn/ideas', label: 'Ideas' },
]

interface Props {
  /** Colour band behind the masthead, and the fill on primary buttons. */
  band: string
  title: string
  intro?: string
  current: string
  children: React.ReactNode
}

export default function PageShell({ band, title, intro, current, children }: Props) {
  return (
    <div className="e-page" style={{ ['--e-band' as string]: band }}>
      <header className="e-page-bar">
        <Link href="/edahn">&larr; Edahn Small</Link>
        <nav>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === current ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="e-masthead">
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>

      {children}

      <footer className="e-page-foot">
        <Link href="/edahn">Back to the beginning</Link>
      </footer>
    </div>
  )
}
