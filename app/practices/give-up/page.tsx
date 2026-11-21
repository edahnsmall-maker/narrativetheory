import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { TheShift } from '@/components/nt2/TheShift'

export const metadata: Metadata = {
  title: 'Lesson one: give up — Narrative Theory',
  description: 'The Shift: a loss of desire in a big, huge way. Edahn Small on conflict, bees, and how to stop the striving.',
}

// From "chapter 1 - LESSON ONE. GIVE UP." in Edahn's Narrative Notes (NN 4560–4583). Typos fixed, nothing added.

function P({ children }: { children: ReactNode }) {
  return <p className="text-[17px] md:text-[18px] leading-relaxed text-foreground/90">{children}</p>
}

const CHECKS = [
  'See how it changes the way your body holds itself up.',
  'See if it changes your breathing.',
  'See how it changes your thinking.',
  'See how it affects determination.',
]

export default function GiveUpPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-14 md:py-20">
      <Link href="/practices" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
        ← Practices
      </Link>
      <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Chapter 1</div>
      <h1 className="mt-2 font-display text-5xl md:text-6xl leading-[1] tracking-tight">Lesson one. Give up.</h1>

      <div className="mt-10 space-y-5">
        <P>
          We are, ultimately, and almost always in some type of conflict. Don’t think of conflict as a thing between you and someone
          else; think of it as a relationship you have with something, and the types of mental qualities, states and moods that
          engenders. It’s the same. And it explains so much.
        </P>
        <P>Conflict is simply the desire to reject what’s already here and opt for a different state.</P>
        <P>
          We’re always trying to reassemble the universe as the universe is always headed towards entropy. And it’s fruitless. It’s moving against a
          universe. If we can’t stop a fucking asteroid, we’re not stopping the entire universe’s rules. But more importantly, we start
          generating friction. It’s exactly like a rocket entering the atmosphere. The nitrogen and oxygen in the atmosphere generate
          friction, then heat, then it starts to turn red because it’s in conflict with its surroundings. In the same way, our fighting
          with things, our desire to arrange in the face of the great rearranger, generates heat. We turn to anguish, and our minds get
          clogged.
        </P>
        <P>
          It gets our minds buzzing, like millions of bees. And we just can’t see through it. All we can see is bees.
        </P>
      </div>

      <TheShift />

      <section className="space-y-5">
        <h2 className="font-display text-3xl md:text-4xl leading-tight">The shift</h2>
        <P>
          It’s hard to see really how much desire motivates and steers, and <em>derails</em>, your entire experience. But it’s a thing
          you can see in meditation if you experience some type of shift. It’s an experience, THE SHIFT, that I became obsessed with,
          and to some degree still am.
        </P>
        <P>
          The shift is a loss of desire in a big, huge, huge way. You can experience it in big ways and small. Mystics have advised us
          to “put it all down,” “let go,” “surrender.” It’s the same experience, but it’s an experience. And through that experience you
          see how insane you are all day. You stop resisting in a big way. You stop trying to advance, or to achieve, or to impress, or
          to plan, or to worry. You just say, fuck. I can’t. I can’t out-maneuver without burning up in the process. You win. You win.
          You win.
        </P>
        <P>
          And your shoulders fall. And your breath appears. And your head is just quiet, for a second. Maybe 5 seconds, maybe 10
          seconds. You’re not a fucking robot. You’re still living your life. You’re just in your body, and you can see things as they
          already are. You can see them clearly and with great resolution. You’ve cleaned the mirror.
        </P>
        <P>
          Some people only experience this after a big loss or on psychedelics, but it’s an experience that’s always available.
        </P>
      </section>

      <section className="mt-14 rounded-3xl border bg-[#f5f0e6] text-[#1f1d1a] px-5 sm:px-8 py-8 space-y-5">
        <div className="text-[11px] uppercase tracking-[0.16em] text-black/45">Practice</div>
        <h2 className="font-display text-3xl md:text-4xl leading-tight">How do we make the shift</h2>
        <ol className="space-y-5 text-[17px] leading-relaxed">
          <li className="grid grid-cols-[2rem_1fr]">
            <span className="font-display text-xl text-black/40">1</span>
            <span>
              Sit, so your mind can start to sit too. Movement usually leads to distraction and inattention. We need attention.
            </span>
          </li>
          <li className="grid grid-cols-[2rem_1fr]">
            <span className="font-display text-xl text-black/40">2</span>
            <span>
              You are going to find a way to let go and give up. Not in a dramatic way. You’re not going to force yourself to cry. You’re
              just stopping the striving. To change. You’re stopping the friction. Stopping the assembly.
            </span>
          </li>
          <li className="grid grid-cols-[2rem_1fr]">
            <span className="font-display text-xl text-black/40">3</span>
            <span>
              You’re just sitting right here. Looking at that wall. Noises happening. And the mind isn’t running crazy. It’s starting to
              settle.
            </span>
          </li>
          <li className="grid grid-cols-[2rem_1fr]">
            <span className="font-display text-xl text-black/40">4</span>
            <span>
              You will know it when you experience it. Be curious with it. Investigate it.
              <ul className="mt-3 space-y-1.5">
                {CHECKS.map((c) => (
                  <li key={c} className="pl-4 border-l-2 border-black/20">
                    {c}
                  </li>
                ))}
              </ul>
            </span>
          </li>
          <li className="grid grid-cols-[2rem_1fr]">
            <span className="font-display text-xl text-black/40">5</span>
            <span>
              And never strive for it again, because all striving is more resistance, more assembly and arranging. It only creates
              mental heat and friction. More bees.
            </span>
          </li>
        </ol>
      </section>

      <section className="mt-14 space-y-5">
        <P>
          It usually requires some unfruitful attempts or a big fuck you from life to really reach surrender. For me it happened after
          reaching absolute total clusterfuck confusion and saying “fuck. I can’t.” It’s not defeatist, it’s realist. It’s wisdom. It’s
          finding surrender and harmony with life.
        </P>
        <P>
          Let go of your needs. Your agendas. Your situations in life that you’re in currently and that you collect. We all do. Let go of
          needing to be better. Let go of needing to be fixed.
        </P>
        <P>
          There’s nothing to hold onto now. You can’t recreate this because the only quality it has is giving up. Anything that’s not
          giving up is noise. Now practice that.
        </P>
        <p className="font-display text-3xl leading-tight pt-2">
          You’re awakened.
          <br />
          For now.
        </p>
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link href="/theory/concepts/the-end-of-trying" className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
          Concept: the end of trying →
        </Link>
        <Link href="/practices#nothing-wrong" className="rounded-full border px-4 py-2 text-sm hover:bg-accent">
          Practice: what if nothing is wrong? →
        </Link>
      </div>

      <p className="mt-14 text-sm text-muted-foreground leading-relaxed">
        This is a practice, not treatment. If you’re in crisis or something feels unsafe, please reach out to a professional or a local
        emergency line.
      </p>
    </article>
  )
}
