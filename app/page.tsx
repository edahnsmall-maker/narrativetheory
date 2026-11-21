import Link from 'next/link'
import type { ReactNode } from 'react'
import { BabyScene } from '@/components/home2/BabyScene'
import { WrapScene } from '@/components/home2/WrapScene'
import { LockDiagram } from '@/components/home2/LockDiagram'
import { ModeScene } from '@/components/home2/ModeScene'
import { ModeTree, ModeTable, Species, ContestGrid } from '@/components/home2/Panels'
import { Fn } from '@/components/home2/Footnote'
import { HeroApple } from '@/components/home2/HeroApple'
import { CoworkerPanels } from '@/components/home2/CoworkerPanels'

/**
 * Homepage: Edahn's own copy ("NT web copy rewrite — v.edahn"), lightly
 * copyedited for typos only. Keep it in his words.
 */

const SECTIONS = [
  ['big-idea', 'The big idea'],
  ['saran-wrap', 'The Saran Wrap'],
  ['narrative-lock', 'Narrative lock'],
  ['modes', 'Modes and energy states'],
  ['species', 'Species of narratives'],
  ['dynamics', 'Two narratives walk into a bar'],
  ['putting-it-down', 'Putting it all down'],
  ['deep', 'Deep spiritual stuff'],
] as const

function H2({ id, kicker, children }: { id: string; kicker?: string; children: ReactNode }) {
  return (
    <header id={id} className="scroll-mt-24 pt-16 md:pt-24">
      {kicker && <div className="mb-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{kicker}</div>}
      <h2 className="font-display text-[2.1rem] md:text-5xl leading-[1.04] tracking-tight mb-6">{children}</h2>
    </header>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[18px] md:text-[19px] leading-[1.7] text-foreground/90 mb-6">{children}</p>
}

export default function HomePage() {
  return (
    <div className="overflow-x-clip">
      {/* Hero */}
      <section className="relative border-b">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--accent-violet) 45%, transparent), transparent 65%)' }} />
        <div aria-hidden className="pointer-events-none absolute right-40 top-40 h-[300px] w-[300px] rounded-full opacity-50 blur-3xl" style={{ background: 'radial-gradient(circle, color-mix(in oklab, var(--accent-orange) 40%, transparent), transparent 65%)' }} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14 md:pt-24 pb-14 md:pb-20">
          <div className="grid md:grid-cols-[1fr_360px] gap-8 items-center">
            <div>
              <h1 className="font-display text-[3.1rem] sm:text-7xl md:text-[5.2rem] leading-[0.95] tracking-tight">
                Introducing Narrative Theory
              </h1>
              <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground">
                A theory to explain how the mind works, how it constructs our reality, and how it influences how our life and relationships
                develop. (And what to do about it!)
              </p>
            </div>
            <div className="mx-auto w-64 md:w-full">
              <HeroApple />
            </div>
          </div>
          <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-2">
            {SECTIONS.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="chip hover:border-foreground/40 transition-colors">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <article className="mx-auto max-w-[44rem] px-4 sm:px-6 pb-24">
        {/* Intro */}
        <div className="pt-14 md:pt-20">
          <P>
            Narrative Theory (or NT for short) is a collection of ideas, observations, frameworks, and diagrams that help explain the inner world of
            experience and thinking and how that gets mixed up with reality.
          </P>
          <P>
            When I was a young kid <em>(cue music)</em> my mom, a psychotherapist with a psychodynamic orientation (the “tell me about your mother”
            kind of therapist) exposed me to what I now call post-Freudian psychotherapy. It was a model for thinking about people—how they operate,
            their needs and drives.<Fn n={1}>Yes, I use m-dashes and yes a human wrote this.</Fn> I was the only kid in junior high who had diagnosed
            classmates with Oedipus complexes. I knew about the id, ego, superego, and roughly how they operated. I knew about the major DSM disorders
            and half of my classmates had them. Poor guys.
          </P>
          <P>
            But as I got older I started to feel like the good ole theories just didn’t seem to capture what I was experiencing correctly. Sure, I
            could squeeze it into the classic vernacular, but it didn’t really sit right. It was like the feeling of putting on your t-shirt
            backwards. It fits, but does it? What I experienced as a high school and then college student didn’t seem to fit anywhere. I didn’t have a
            full blown disorder, but I didn’t have nothing either. And the id-ego-superego dynasty wasn’t how I understood my mind at all. I saw things
            appear and disappear depending on situations, and what exactly appeared was interesting. “Anxiety” kind of captured it, but it was more
            delicate, more nuanced. So I decided to build my own theory and my own models that snapped together better and reflected my experience
            better.
          </P>
          <P>
            The pieces started to come together over the next 20 years. My tools are just observation, reflection, and synthesis—something anyone can
            do. The biggest influences on my views probably come from my Zen practice, my interest in animal behavior, and my compulsive need to
            understand what things really are, beyond convention, beyond bias, and even beyond words. Narrative Theory is my attempt to assemble all
            the pieces into something recognizable. I personally think of it not just as an evolving theory, but a collaborative theory. I encourage
            others to add and build on the theory and refine it. With that, let’s get into the basics of NT.
          </P>
        </div>

        {/* The big idea */}
        <H2 id="big-idea" kicker="Or why it’s called Narrative Theory">The big idea</H2>
        <P>
          The big idea of narrative theory is that we aren’t really experiencing the world as it is; we’re experiencing the world mixed together with
          our thoughts about it. But because we’re such compulsive thinkers, and because of the nature of thinking, we hardly ever notice how our
          thinking colors our experience.
        </P>
        <P>This is probably not news to you. What’s news is how deep the con (or in Buddhist terms, delusion) actually goes.</P>
        <P>
          Thinking (or narrative) is constantly being activated on both surface and subtle levels,
          <Fn n={2}>This isn’t the same as Freud’s conscious and unconscious exactly, because for Freud, the unconscious had a specific content that NT doesn’t assume.</Fn>{' '}
          and it’s extremely pervasive. We think about others (lovers, family members), we think about the future, we think about ourselves, we think
          about things (movies, political movements, a dinner), and we think about situations (a fight, going out, a meeting). The clue that it’s all
          narrative is that it shifts with your mood. When you’re in a great mood, all those things might seem hopeful, positive, agreeable. In a bad
          mood, maybe they’re all irritating, negative, hopeless. And between good and bad moods, there’s myriad other moods with myriad other
          thinking styles and corresponding body states and behavioral states.
        </P>
        <P>
          On subtle levels, our thinking assigns names, labels, and valence (I like it, I dislike it) to things in our perception, including even us.
          That “us” part is a big topic that goes to the heart of Buddhist philosophy and we’ll get into it eventually. The main thing to know for now
          is that our thinking shapes how we experience and construct the world.
        </P>
        <P>
          The same set of facts can look totally different depending on my mood.
          <Fn n={3}>
            We’ve been using the word mood, but in NT, we use the word energy state. It’s not that moods don’t exist, but they’re imprecise and
            already connected to a set of presumptions and ideas that we avoid so as to prevent contamination with the NT framework. Elegance and
            parsimony in theory is something I strive for.
          </Fn>{' '}
          My go-to example is a newborn crying in a restaurant. To an agitated person, the sound would appear as irritating. “Who brings a baby to a
          nice restaurant? Are they kidding? They’re probably bad parents or at the least, inconsiderate assholes. I would never do that.” But the
          same person, in a calm, reflective state might say “oh how beautiful. They might have just had their baby and they’re trying to go out and
          have a normal life. Good for them and good fucking luck.” Same person, different moods, different perceptions. (In NT, we call these
          different thinking styles different flavors of thinking.)
        </P>
      </article>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <BabyScene />
      </div>

      <article className="mx-auto max-w-[44rem] px-4 sm:px-6">
        {/* Saran Wrap */}
        <H2 id="saran-wrap">The Saran Wrap</H2>
        <P>
          The reason this is all so tricky, and so interesting, is that we hardly ever are aware of how our thinking state is influencing our
          perception (or our total construction of reality). This is because of the nature of thinking and how the mind works.
        </P>
        <P>
          Imagine a piece of Saran Wrap that’s wrapped around a statue or an apple: we don’t really notice because of how perfectly it molds onto
          the object. You have to get up close, inspect it, and maybe touch it to realize it’s even there. Once you realize it’s there, you can make
          a mental note and remember for next time.
        </P>
        <P>
          Narrative (our thinking) operates the same way. When we’re angry, things are irritating. People are awful. Life looks shitty. Maybe we feel
          like outsiders because deep down we’re thinking about all the people who have better friendships than we do. We rarely think “things look
          shitty because I’m in a terrible thinking style and am adding all these things (assumptions, characterizations, projections) onto my
          reality.” We just think that our life sucks.
        </P>
        <P>
          But the clue is in its inconsistency. When your mood improves (time passes, new information comes in, sleep improves, hormones chill out)
          the entire situation looks dramatically different. It’s less dire, less hopeless.
        </P>
        <P>
          I had a coworker I heard was talking shit about me. In subsequent meetings with her, every word she uttered would cause me to roll my eyes
          so hard I thought I was going to have an ocular problem. “What is she talking about? Everything she says is just so full of shit. Does she
          even work? I should have HR look at her resume.<Fn n={4}>Ironically, she worked for HR.</Fn>”
        </P>
        <P>
          Then I had a meeting with her and decided to confront her in a professional way. I said what I had heard and she looked confused. “I
          wasn’t talking about you! I was talking about someone else!” I believed her and it completely changed my narrative about her. All the
          behaviors that made me resent her were instantly neutralized. I felt close to her again. She was great at her job.
          <Fn n={5}>Or good enough…fucking HR, am I right?</Fn> The narrative popped, and that was a clue that it was all narrative. It was all made
          up by me and injected into the situation. (Later we’ll get into techniques for peeling back the layer of Saran Wrap.)
        </P>
        <CoworkerPanels />
      </article>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <WrapScene />
      </div>

      <article className="mx-auto max-w-[44rem] px-4 sm:px-6">
        <P>
          We do this all the time without realizing. We construct narratives around things (an outfit), people (another person’s decision), our own
          experience (something’s off, I should feel better), our life (what a mess!), rivals (Democrats/Republicans disgust me!), situations (this
          party sucks) and more. We’ll get into that soon when we talk about species of narratives.
        </P>
        <P>And the more charged we are, the stronger the narrative gets fused with its target. That brings us to the next big term, Narrative Lock.</P>

        {/* Narrative lock */}
        <H2 id="narrative-lock">Narrative Lock</H2>
        <P>
          Sometimes the Saran Wrap gets glued on so hard that we can’t unstick it. We can’t see something differently than the way we currently see
          it. I call that narrative lock.
        </P>
        <P>
          You see narrative lock everywhere, but it’s most obvious when people are emotionally charged, and some people are easily emotionally
          charged about every position they take, especially when that position is being argued with.
        </P>
        <P>
          Take a couple who’s fighting. Both partners take a position on an issue. They develop competing narratives about how to interpret
          something—how someone’s tone sounded, someone’s intent, or whether they slammed the car door or just closed it. And no matter what the
          other person says or explains, they just can’t see it. They can’t even begin to understand it. It sounds absurd. Any contradicting
          information is dismissed, rationalized, or disputed.
        </P>
      </article>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <LockDiagram />
      </div>

      <article className="mx-auto max-w-[44rem] px-4 sm:px-6">
        <P>
          It’s not just couples. Narrative lock also shows up with people and their narratives about themselves. In my therapy work I run into
          clients who cannot for the life of them see themselves as anything but worthless. They often can’t even imagine themselves as anything but
          that.
          <Fn n={6}>
            This is where I like to focus therapy efforts: on starting to cast doubt on the locked narrative through creative visualization, often
            in small, safe doses that don’t immediately threaten the locked narrative.
          </Fn>
        </P>
        <P>
          Or take a situational narrative, where someone believes a situation is absolutely, 100%, without a doubt, headed towards a bad outcome.
          They know it in their bones. They can feel it. It could be a particular situation like a health issue or a relationship coming apart or
          maybe the world going to shit, or it could be pervasive, what we typically would label “generalized anxiety.”
        </P>
        <P>
          And then something happens. The bad outcome doesn’t happen, or maybe the person goes on a run or a meditation retreat and returns with a
          totally different outlook. (It’s happened to me many times.) The inevitable conclusion becomes a mere possibility, or even an
          improbability. The lock breaks, like a fever breaking.
        </P>
        <P>
          These moments are invaluable because they demonstrate clearly how narratives operate and hijack our perception. And how they twist
          everything around them to serve the overarching narrative.
        </P>
        <P>Here are a few more examples of lock to keep in your back pocket:</P>
        <ul className="mb-8 grid gap-2 sm:grid-cols-2">
          {['My partner is evil/bad', 'We’re all doomed', 'We’re perfect for each other, even though…', 'We could never be together', 'I’ll never find a better job', 'I’ll never find a better boyfriend'].map((t) => (
            <li key={t} className="rounded-xl border bg-card px-4 py-3 font-display text-[17px]">
              “{t}”
            </li>
          ))}
        </ul>
        <P>
          Those last two go together.
          <Fn n={7}>
            I’ve noticed that people tend to exhibit the same patterns of thinking and behavior across their careers and relationships. For example,
            the soulmate myth corresponds to a perfect career myth.
          </Fn>
        </P>

        {/* Modes */}
        <H2 id="modes">Modes and Energy States</H2>
        <P>
          A few more concepts before we get to the practical stuff and examples. These will help us talk about behaviors and people and deconstruct
          relationships much more easily later.
        </P>
        <P>
          Up until now we’ve been talking about narratives: the views we construct about things, including ourselves and others, and how they get
          fused with our experience of things so precisely that we don’t notice it. But we’ve ignored the rest of the organism—the body, behavior,
          and speech. Now it’s time to fold those in.
        </P>
        <P>
          Imagine an alien hovering over a bar in their spaceship. They have sensors that can see what’s going on in everyone’s brain (“not much,” he
          said cynically) and what’s happening in their body too. They can see their heart rate, their respiration, how they fidget, sip their
          drinks, laugh, talk loudly, and occasionally spill.
        </P>
        <P>
          How would an alien make sense of what’s happening? Well, if they’re observant, they might notice that there are links between all of these
          components. They don’t work independently, they work in unison.
        </P>
        <P>
          Introducing modes. Modes are combinations of narrative styles, body styles, and action styles. You can think of a style as a theme. When
          I’m angry, I think in an angry way—black and white, simplified, me-vs.-them, victim/aggressor. And when I’m angry, my body does certain
          characteristic things too. My breathing gets shallow. My gaze becomes intense and confrontational. I smile less. I don’t laugh. And my
          actions start to shift too. I make noise. I start slamming things. I might avoid making eye contact with someone. Even my communication
          patterns change. I start cursing more. I interrupt more frequently. I speak louder and in shorter, declarative sentences with less hedging.
          Congratulations, you’re in anger mode.
        </P>
      </article>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ModeScene />
      </div>

      <article className="mx-auto max-w-[44rem] px-4 sm:px-6">
        <P>A lot of our activity can be grouped together in modes and we can design trees of modes that help classify them.</P>
        <ModeTree />
        <P>
          Here’s a table with a few more examples of common modes and their breakdowns. Remember that everyone’s mode is going to look different, but
          there will be consistency in how that mode is expressed by an individual. Unpacking your modes—and your partner’s modes—is pretty much what
          therapy is all about, despite my complaints about the efficacy and strategy of traditional therapy formats.
        </P>
        <ModeTable />

        {/* Species */}
        <H2 id="species" kicker="Finally, the practical stuff">Species of Narratives</H2>
        <P>
          From our first-person perspective, narratives don’t really separate cleanly. We don’t experience narratives as having targets or categorize
          them into groups as we’re about to do. We experience one, cumulative story about the world, one construction we call reality.
        </P>
        <P>But for practical purposes, it’s useful to differentiate different types of narratives because it makes understanding and analysis easier.</P>
        <P>
          The primary way we classify narratives is by their target or subject, i.e., what they’re about. The big groups are: narratives about the
          self, about romantic partners, about others (family, friends), about situations and the future, about rival tribes, and narratives about
          life journeys, what I call metanarratives. The sum total of all a person’s unique narratives comprises their total worldview, or everything
          they are thinking about in a given moment.
        </P>
        <Species />

        {/* Dynamics */}
        <H2 id="dynamics" kicker="Narrative dynamics">Two Narratives Walk Into a Bar</H2>
        <P>
          What happens when two narratives clash across two people? You see it in relationships (a narrative about a situation plus a narrative about
          your partner), politics (what are the real issues and threats), law (plaintiff or defendant?), and work (who should do the project?).
        </P>
        <P>
          During contests, we can map out the possible outcomes. The thing that decides it usually isn’t who’s right. The dominant individual will
          always show more narrative certainty.
        </P>
        <ContestGrid />

        {/* Putting it down */}
        <H2 id="putting-it-down" kicker="What to do">Putting It All Down</H2>
        <P>
          The ultimate job, for those seeking a better life, or just less regret down the line, is to learn how to drop narrative.
        </P>
        <P>
          Narrative-dropping is what meditation literally is. In meditation we learn how to stop swimming in our narratives by paying attention to
          something else that isn’t charged, like breathing or sound. The consistent focus away from thinking weakens the grip of the Saran Wrap,
          and after sustained effort, the Saran Wrap starts to dissolve entirely.
        </P>
        <P>
          The qualities of meditation can also be consciously worked on. Cognitively: vying for openness, looking for facts, challenging and testing
          our own assumptions before reacting to them. Physically: exercise, sleep, and diet can help stabilize one’s energy state and cognitive
          style. Moving slower throughout the day (chores, walking, breathing) can also make a big impact.
        </P>

        {/* Deep */}
        <H2 id="deep">Deep Spiritual Stuff</H2>
        <P>
          Ridding ourselves of Saran Wrap is a life-changing experience, though it often is temporary rather than permanent. The deepest way to
          really wipe away narrative is to investigate the self.
        </P>
        <P>
          The self is the source of our wanting and clinging, which is the engine behind thinking. By the self we mean the idea of ourselves. When
          you think about what you are, what answer comes up? A description? Most of us identify with the stream of thinking in our head. We take it
          to be who we are.
        </P>
        <P>
          The stream of thinking exists, but the permanence and independence of the self (which we don’t realize is a necessary assumption and
          component of the self) is what gets examined carefully in meditation or contemplation. How real is this self thing? Is it me? Is it stable
          or dissolving? If it’s dissolving, am I dissolving? If I’m dissolving how could I be a thing?
        </P>
        <P>
          When all those questions are resolved (as far as they can be) the notion of self falls apart, and so does the clinging, craving, and
          thinking that it activates. When all our narratives become irrelevant, real peace exists. It’s something that’s always there and always
          available. There’s nothing missing, nothing to get, nothing to maintain and defend. Compassion and kindness and wisdom open up and we find
          a natural kindness waiting to support others and help out.
        </P>

        {/* Where to go next */}
        <section className="mt-20 rounded-3xl border bg-[#f5f0e6] p-6 sm:p-10">
          <h2 className="font-display text-3xl md:text-4xl leading-tight mb-3">Try it on your own stuff</h2>
          <p className="text-[17px] leading-relaxed text-foreground/85 mb-7">
            Reading about Saran Wrap is one thing. Catching it on your own life is the part that actually does something.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: '/life/start-here-core-practice', t: 'Start here', d: 'Short guided sessions on the core ideas. Free.' },
              { href: '/situation', t: 'Bring a situation', d: 'Something you’re caught in right now. Let’s pull it apart.' },
              { href: '/life', t: 'Browse everything', d: 'Self-worth, conflict, dating, grief, Zen, and more.' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="rounded-2xl border bg-card p-4 hover:border-foreground/40 transition-colors">
                <div className="font-display text-lg mb-1">{c.t}</div>
                <div className="text-sm text-muted-foreground leading-snug">{c.d}</div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}
