import type { Metadata } from 'next'
import '../pages.css'
import PageShell from '@/components/edahn/PageShell'

export const metadata: Metadata = {
  title: 'Ideas and opinions — Edahn Small',
  description:
    'Writing on Zen, cosmology, therapy, AI, and whatever else is currently refusing to resolve.',
}

/**
 * The index for writing that doesn't exist yet. The subject blocks below are
 * real — they're the things Edahn actually returns to — but there are no
 * invented posts, titles, or dates here. Each block becomes a filter once
 * there's something to filter.
 */

const SUBJECTS = [
  {
    title: 'Zen',
    blurb:
      'Practice, retreats, and what twenty years of sitting does and doesn’t do to a person.',
    cell: 'oklch(0.949 0.023 300)',
    hover: 'oklch(0.88 0.08 300)',
  },
  {
    title: 'Reality',
    blurb: 'Cosmology, physics, and the edge where science starts sounding like science fiction.',
    cell: 'oklch(0.951 0.021 238)',
    hover: 'oklch(0.88 0.08 238)',
  },
  {
    title: 'Narrative Theory',
    blurb: 'The theory as it develops — modes, Saran Wrap, scoring systems, narrative dynamics.',
    cell: 'oklch(0.949 0.021 350)',
    hover: 'oklch(0.88 0.09 350)',
  },
  {
    title: 'Therapy',
    blurb: 'What the field gets right, what it keeps getting wrong, and what happens in the room.',
    cell: 'oklch(0.952 0.026 152)',
    hover: 'oklch(0.87 0.09 152)',
  },
  {
    title: 'AI',
    blurb: 'Building with it, thinking about it, and the parts that are genuinely strange.',
    cell: 'oklch(0.957 0.024 88)',
    hover: 'oklch(0.88 0.1 88)',
  },
  {
    title: 'Animals and us',
    blurb:
      'Human ethology — the Darwin’s Mirror territory. Animals and humans caught doing exactly the same thing.',
    cell: 'oklch(0.955 0.031 68)',
    hover: 'oklch(0.87 0.11 68)',
  },
]

export default function IdeasPage() {
  return (
    <PageShell
      band="oklch(0.65 0.21 5)"
      current="/ideas"
      title="Ideas and opinions"
      intro="I like to write, even though I never really considered myself a good writer. Writing within flow is incredibly enjoyable. This is where that goes."
    >
      <section className="e-section">
        <h2>What I keep coming back to</h2>
        <div className="e-grid">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.title}
              className="e-cell"
              style={{
                ['--e-cell' as string]: subject.cell,
                ['--e-cell-hover' as string]: subject.hover,
              }}
            >
              <span className="e-cell-kind">Subject</span>
              <h3>{subject.title}</h3>
              <p>{subject.blurb}</p>
              <span className="e-cell-foot">No posts yet</span>
            </div>
          ))}
        </div>
      </section>

      <section className="e-section">
        <h2>Previously</h2>
        <div className="e-prose">
          <p>
            I’ve had an advice column and countless blogs. My favorite was a short-lived one called{' '}
            <strong>Darwin’s Mirror</strong>, about animals and humans engaged in the same behavior,
            back when I was very into human ethology.
          </p>
        </div>

        <div className="e-notice">
          <strong>For Edahn:</strong> no posts are invented here — the six subjects are real, the
          archive line is yours. Send writing (drafts, old posts, links to anything still online) and
          this becomes a proper index with the subjects as filters. If you’d rather it read as a
          feed than a grid, say so and I’ll rebuild it that way.
        </div>
      </section>
    </PageShell>
  )
}
