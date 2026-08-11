import type { Metadata } from 'next'
import '../pages.css'
import PageShell from '@/components/edahn/PageShell'

export const metadata: Metadata = {
  title: 'Therapy — Edahn Small',
  description:
    'How I work, who I see, and how to get in touch. Therapy practiced online from Los Angeles.',
}

/**
 * Deliberately thin on claims. Everything here is either something Edahn has
 * said himself or a plain structural fact. No license numbers, no fees, no
 * modality list, no years-in-practice — those are his to supply, and inventing
 * them on a therapy page would be worse than leaving them out.
 */

const WHO = [
  {
    term: 'Individuals',
    detail:
      'Anyone who comes to it sincerely. You don’t need a diagnosis, a crisis, or a tidy explanation of what’s wrong — wanting to look at something honestly is enough.',
  },
  {
    term: 'Couples',
    detail:
      'Yes. Often the most useful work is watching two narratives collide in real time, which is difficult to do alone.',
  },
  {
    term: 'Where',
    detail: 'Online. I’m based in Los Angeles.',
  },
  {
    term: 'Who this isn’t for',
    detail:
      'If you’re at high risk of suicide, this isn’t the right setting, and I’ll say so rather than take you on. That needs care that can reach you physically and quickly.',
  },
]

export default function TherapyPage() {
  return (
    <PageShell
      band="oklch(0.62 0.2 295)"
      current="/therapy"
      title="Therapy"
      intro="I live in Los Angeles and practice therapy online. Here’s roughly how I think about the work, and who it tends to suit."
    >
      <section className="e-section">
        <h2>How I work</h2>
        <div className="e-prose">
          <p>
            My approach comes out of two things that have run alongside each other for twenty years:
            Zen practice, and a long argument with contemporary psychotherapy. Not from dogma on
            either side — from my own experience of what actually shifts something and what only
            sounds like it does.
          </p>
          <p>
            The working assumption is that most suffering runs through a story. We construct
            narratives about ourselves, other people, the future, and whatever situation we’re in,
            and then we live inside them as though we’d found them rather than made them. The work
            is learning to see the story as a story — which is a different skill from having a
            better one.
          </p>
          <p>
            So I’m less interested in reframing than in looking directly. What’s actually happening,
            what you’re making it mean, and what that reliably costs you. I’ll tell you what I think
            rather than reflect everything back, and I’d rather be corrected than agreed with.
          </p>
          <p>
            I’ve written the theory behind this up in some detail if you want to see the machinery
            before you decide.
          </p>
        </div>
        <div className="e-cta-actions">
          <a className="e-btn" href="/narrative-theory">
            <span>Read Narrative Theory</span>
            <span aria-hidden>&rarr;</span>
          </a>
          <a className="e-btn" data-variant="ghost" href="/program">
            <span>Or try the guided program</span>
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>

      <section className="e-section">
        <h2>Who I see</h2>
        <dl className="e-rows">
          {WHO.map((item) => (
            <div className="e-row" key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="e-notice">
          <strong>For Edahn:</strong> this page carries no license details, fees, insurance,
          session length, or availability, because I don’t have them and won’t guess on a therapy
          page. Send them and I’ll add a practical section. Same for anything above that misstates
          how you actually work — I wrote it from what you told me in chat.
        </div>
      </section>

      <section className="e-cta">
        <h2>If you’re curious, write to me.</h2>
        <p>
          Tell me a bit about what’s going on, or don’t — &ldquo;I’d like to talk&rdquo; is a
          perfectly good first message. I read everything that comes in.
        </p>
        <div className="e-cta-actions">
          {/* TODO(edahn): swap in the address you actually want public. */}
          <a className="e-btn" href="mailto:hello@edahnsmall.com">
            <span>Get in touch</span>
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>
    </PageShell>
  )
}
