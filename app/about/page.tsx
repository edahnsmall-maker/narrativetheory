import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About — Narrative Theory',
  description: 'What Narrative Theory is, where it comes from, and what it claims — in the author’s own words.',
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-xl text-foreground mb-4">{title}</h2>
      <div className="prose-nt text-[17px] leading-relaxed space-y-5">{children}</div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 lg:px-8 py-16">
      <header className="mb-14">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">About</div>
        <h1 className="font-display text-4xl md:text-5xl text-foreground mb-5 leading-tight">
          What is Narrative Theory?
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          People have asked what Narrative Theory is all about. Here&rsquo;s the short version —
          three to five minutes. Assembled almost entirely from the notebooks it grew up in.
        </p>
      </header>

      <Section title="Where it comes from">
        <p>
          Narrative Theory is a way to break down and make sense of our experience. It was born out
          of personal observation, Zen practice, psychology, animal behavior, and an honest
          disappointment in contemporary psychotherapy. It&rsquo;s a map — of relationships, conflict,
          happiness, and everything in between — so you can understand your own situations with
          clarity, and see their solutions.
        </p>
        <p>
          Another way to say it: NT is the psychology of Zen. It starts from the clear mind — the
          one you find at the end of a long retreat, after real grief, in deep rest — and asks:
          what is that mind, and what is everything else? It is the book I couldn&rsquo;t find on the
          shelf, so it had to be written.
        </p>
      </Section>

      <Section title="The basic claim">
        <p>
          You can experience reality two fundamentally different ways: with noisy habitual thinking,
          and without. NT looks to understand everything through that one dichotomy.
        </p>
        <p>
          When the mind is quiet, the world is less divided. Situations are less gloomy. Other
          people become ordinary and near. The natural impulse to help comes online by itself,
          without a philosophy attached.
        </p>
        <p>
          When the mind is noisy, we live inside a constructed world — reality cut into pieces,
          each piece wrapped in an identity, a value, a rank we projected onto it — and then we
          defend that world as if we had found it rather than made it.
        </p>
      </Section>

      <Section title="The Saran Wrap">
        <p>
          We are always harboring thoughts, and those thoughts are projected outward into
          perception. We don&rsquo;t notice, because the projection maps perfectly onto reality — like
          plastic wrap pulled tight over a fruit. It fits so well and it&rsquo;s so clear that you
          can&rsquo;t see it&rsquo;s there.
        </p>
        <p>
          But sometimes it peels. The moment you decide to stop fighting, and the person you hated
          becomes a person again. The end of a retreat. Real loss. Deep relaxation. Then you see
          what things are like without the commentary: quiet, connected, unranked, simpler than the
          story said. That glimpse is the beginning of the whole practice — once you have seen the
          wrap as wrap, you can never fully unsee it.
        </p>
      </Section>

      <Section title="Modes">
        <p>
          We move through the day in modes: repeating packages of thinking style, body state,
          energy, and action that arrive together and leave together. A mode is a little world.
          Inside Anxiety Mode the future is dangerous. Inside Fight Mode the other person is guilty.
          Inside Progress Mode your life is a scoreboard, and you&rsquo;re behind.
        </p>
        <p>
          The key mechanism is the feedback loop: a mode&rsquo;s actions reinforce the world that
          produced them. Anxiety avoids, and avoidance makes danger feel more real. The mode solves
          the moment and deepens the pattern. That is why these things get sticky — and why naming
          the mode, feeling its body signature, and watching its sequence is already the start of
          the exit.
        </p>
      </Section>

      <Section title="Rank, frames, and the fake contest">
        <p>
          Much of social life is a quiet contest over whose frame governs and whose way of being
          counts as normal. Rank feels real — the felt hierarchy of every room — but the scoreboard
          is invented, and it flickers with your state, which is the giveaway. Certainty transfers;
          doubt defers. None of this needs to be won. It needs to be seen.
        </p>
      </Section>

      <Section title="The Shift">
        <p>
          Healing, in NT, is not narrative editing. We don&rsquo;t try to swap bad stories for better
          ones — that&rsquo;s redecorating the cell. The Shift is a change from resistance to
          surrender: the cessation of wanting this moment to be different, the end of trying.
        </p>
        <p>
          Wanting is the fuel of the thinking machine. Remove the fuel and the machinery quiets on
          its own — the wrap thins, the body unclenches, and wisdom and warmth come up by
          themselves, uninvited. You cannot force this. Forcing is the opposite motion. You can only
          position yourself — sit down, stop steering, let things be as they already are right now —
          and let it happen to you.
        </p>
      </Section>

      <Section title="What NT is not">
        <p>
          It is not therapy, and it&rsquo;s not a substitute for it. It is not positive thinking. It
          is not about killing thought — the mind is no hindrance; thoughts come and go, and you
          simply stop being their vehicle. And it is not a finished doctrine. It&rsquo;s a working
          map, drawn from the inside, still being drawn.
        </p>
        <p>
          Kindness is woven into all of this. Not the end goal — more the end state. When the
          contest quiets and the wrap thins, care is just what&rsquo;s left.
        </p>
      </Section>

      <Section title="The point">
        <p>
          The goal is not to make perfect categories. There are no perfect categories. The goal is
          to see clearly enough that we stop being possessed by the categories and worlds we create
          — and then to live from there: simpler, warmer, with both feet in the actual moment.
        </p>
        <p>Now practice that.</p>
      </Section>

      <div className="border-t pt-8 flex flex-wrap gap-4">
        <Link
          href="/program"
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
        >
          Do the program <ArrowRight size={14} />
        </Link>
        <Link
          href="/theory"
          className="border bg-card text-muted-foreground px-5 py-2.5 rounded-xl text-sm hover:text-foreground hover:border-foreground/40 transition-colors"
        >
          Learn the vocabulary
        </Link>
      </div>
    </div>
  )
}
