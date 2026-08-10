import type { Metadata } from 'next'
import Link from 'next/link'
import '../pages.css'
import PageShell from '@/components/edahn/PageShell'

export const metadata: Metadata = {
  title: 'AI projects — Edahn Small',
  description:
    'Things I’ve been building at the intersection of AI and therapy, Zen, art, and data analysis.',
}

/**
 * A gallery waiting on its contents. Only the Narrative Theory program is a
 * real entry — the rest are typed placeholders holding the shape until Edahn
 * sends the repos. Nothing here invents a project that doesn't exist.
 */

interface Project {
  kind: string
  title: string
  blurb: string
  href?: string
  foot: string
  cell?: string
  hover?: string
}

const PROJECTS: Project[] = [
  {
    kind: 'Live',
    title: 'Narrative Theory: the program',
    blurb:
      'A five-stage guided program that maps the dream your thinking has built, then works on it. An AI guide listens, proposes a structure, and draws you a map you can argue with.',
    href: '/program',
    foot: 'Try it →',
    cell: 'oklch(0.949 0.021 350)',
    hover: 'oklch(0.9 0.06 350)',
  },
  {
    kind: 'Live',
    title: 'Narrative Theory: the framework',
    blurb:
      'The written theory — modes, Saran Wrap, energy states, scoring systems — plus the mode library and the Life Instruction modules.',
    href: '/theory',
    foot: 'Read it →',
    cell: 'oklch(0.951 0.021 238)',
    hover: 'oklch(0.9 0.06 238)',
  },
]

const SLOTS = 4

export default function ProjectsPage() {
  return (
    <PageShell
      band="oklch(0.68 0.16 235)"
      current="/edahn/projects"
      title="AI projects"
      intro="I’m curious about the intersection of AI and everything, but specifically therapy, Zen, art, and data analysis. Here’s what that has turned into so far."
    >
      <div className="e-section">
        <div className="e-grid">
          {PROJECTS.map((project) => {
            const style = {
              ['--e-cell' as string]: project.cell,
              ['--e-cell-hover' as string]: project.hover,
            }
            const inner = (
              <>
                <span className="e-cell-kind">{project.kind}</span>
                <h3>{project.title}</h3>
                <p>{project.blurb}</p>
                <span className="e-cell-foot">{project.foot}</span>
              </>
            )
            return project.href ? (
              <Link key={project.title} href={project.href} className="e-cell" style={style}>
                {inner}
              </Link>
            ) : (
              <div key={project.title} className="e-cell" style={style}>
                {inner}
              </div>
            )
          })}

          {Array.from({ length: SLOTS }, (_, index) => (
            <div key={index} className="e-cell" data-placeholder="true">
              <span className="e-cell-kind">Slot {index + 1}</span>
              <h3>Waiting on a repo</h3>
              <p>
                A title, two sentences, a link, and a tag. Send the GitHub URL or the demo and this
                becomes a real card.
              </p>
              <span className="e-cell-foot">Empty</span>
            </div>
          ))}
        </div>

        <div className="e-notice">
          <strong>For Edahn:</strong> the two live cards are real. The four striped ones are
          placeholders. Send repo links, demo URLs, or just titles and a line each, and they fill in
          — the grid grows to whatever number you give me.
        </div>
      </div>
    </PageShell>
  )
}
