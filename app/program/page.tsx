import Link from 'next/link'
import type { Metadata } from 'next'
import { STAGES } from '@/lib/program/stages'

export const metadata: Metadata = {
  title: 'The Program — Narrative Theory',
  description:
    'A guided five-stage program: find the dream your thinking has built, map it, take responsibility for it, work it, and loosen its grip.',
}

export default function ProgramPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <p className="chip">Five stages &middot; no account &middot; free while in demo</p>

      <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight">
        Everyone is walking around inside a dream.
      </h1>

      <div className="prose-nt mt-7 text-[1.05rem]">
        <p>
          Not a delusion &mdash; a dream. Thinking lays a film over things, and after enough years
          the film stops feeling like interpretation and starts feeling like plain fact. This is
          just how people are. This is just how I am. Narrative Theory calls that film{' '}
          <em>Saran Wrap</em>; the older word is <em>maya</em>.
        </p>
        <p>
          The dream is not made of lies. It is made of real observations, mostly accurate ones,
          wired into a shape that stopped being checked a long time ago. That is why it is so
          durable, and why arguing with it rarely does anything.
        </p>
        <p>
          This is a guided program for finding out what yours actually is. You talk; a guide
          listens, makes a case for what it thinks is running, and builds you a map you can look at.
          Then the practical part: what is yours to do about it, what to try, and eventually how to
          catch the film while it is on rather than three days later.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link
          href="/program/session"
          className="rounded-xl bg-[var(--ink)] px-5 py-3 text-[0.95rem] text-[var(--paper)]"
        >
          Start the first conversation
        </Link>
        <span className="text-sm text-[var(--muted-foreground)]">
          Stored in your browser. Nothing to sign up for.
        </span>
      </div>

      <hr className="hairline my-16 border-0" />

      <h2 className="font-display text-2xl tracking-tight">How it goes</h2>
      <ol className="mt-8 space-y-9">
        {STAGES.map((stage) => (
          <li key={stage.id} className="grid gap-4 sm:grid-cols-[2.5rem_1fr]">
            <span className="font-display text-2xl tabular-nums text-[var(--muted-foreground)]">
              {stage.id}
            </span>
            <div>
              <h3 className="font-display text-lg leading-snug">{stage.name}</h3>
              <p className="prose-nt mt-1.5">{stage.blurb}</p>
              <p className="mt-2 text-sm text-[var(--muted-foreground)]">
                You end up with: {stage.artifact}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <hr className="hairline my-16 border-0" />

      <h2 className="font-display text-2xl tracking-tight">Worth saying plainly</h2>
      <div className="prose-nt mt-6">
        <p>
          <strong>This is not therapy and the guide is not a therapist.</strong> If you are in
          crisis or in danger, this is the wrong tool &mdash; go to a person. In the US you can
          call or text 988.
        </p>
        <p>
          <strong>It will make claims about you.</strong> That is the point, and it is also the
          risk. The guide proposes; you correct it. Anything it puts on your map stays a guess &mdash;
          drawn with a dashed outline &mdash; until you actually agree with it. Being told
          &ldquo;no, that&rsquo;s wrong&rdquo; is a normal part of this working.
        </p>
        <p>
          <strong>It is light on the past.</strong> The program asks about your history but does not
          treat any single event as the cause of any single pattern. People are not that legible,
          and a tidy origin story is usually a story.
        </p>
        <p>
          <strong>Your record lives in this browser.</strong> No account, no server-side copy. Clear
          your browser data and it is gone; open it on your phone and it is not there.
        </p>
      </div>
    </div>
  )
}
