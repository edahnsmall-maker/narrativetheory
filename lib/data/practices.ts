/**
 * Pocket practices. Every line here comes from Edahn's own notes (Narrative
 * Notes and Apple Notes), lightly cleaned up. Sources are listed in
 * ideas-from-your-notes.md at the project root.
 */
export interface Practice {
  id: string
  title: string
  when: string
  intro?: string
  steps: string[]
  outro?: string
  color: string
}

export const practices: Practice[] = [
  {
    id: 'not-me-itis',
    title: 'Fear-shame-not-me-itis',
    when: 'When you start feeling not you, like you’re being someone else.',
    steps: [
      'Call it fear-shame-not-me-itis.',
      'Let it be you without being all of you. It’s a slice of your experience: a bunch of thinking that something is wrong, and that you’re not doing something right. Take the pressure off, because that’s just a belief, and it’s nonsense. You know it deep down.',
      'Have it without it being a big deal. That’s all. No need to rush or panic. Just stick through it, with an open heart and a little smile.',
      'Move on.',
    ],
    color: '#e0533d',
  },
  {
    id: 'nothing-wrong',
    title: 'What if nothing is wrong?',
    when: 'When you’re sitting, or just living, and it feels like it isn’t working.',
    intro:
      'A couple of years ago I was sitting Kyol Che and asked our teacher a question about the intricacies of technique. He said, “Wow, sounds exhausting,” without really giving me an answer. A day later I was sitting and asked myself this.',
    steps: [
      'What if nothing is actually wrong with my meditation? Accept it as a hypothesis. Relax a little.',
      'What if there’s nothing wrong with this whole experience? Relax more.',
      'What if there’s nothing wrong with me?',
    ],
    outro:
      'That relaxation went even deeper. The thoughts kept going in the background, but they didn’t have the control over me they used to. I remember smiling for about three hours straight. Now, as soon as I realize I have a goal, I ask: what am I trying to avoid? What is the moment I think is not enough? What did I assume needs to change?',
    color: '#6f6bd8',
  },
  {
    id: 'in-your-head',
    title: 'When you’re balled up in your head',
    when: 'When you’re tight, stuck in thinking, and can’t find your way out.',
    steps: [
      'Are you in your head? If you aren’t sure you’re not, then you are. It’s a fuck no or it’s a fuck yes.',
      'Just listen. Just observe. Without thinking and talking, and without not talking either. Put down the worrying, because it’s thinking. There’s no right way to do it.',
      'Be patient. Wait till you just start feeling refreshed.',
      'Relaxing is never an operation, and it’s also not a non-operation. It’s something in the middle: waiting, with some effort to not drift. Not judging your experience as good or bad, because that’s evaluation mind.',
    ],
    color: '#2f5bd3',
  },
  {
    id: 'checking',
    title: 'Checking',
    when: 'When you keep taking your own temperature. Am I okay? Is this working? How am I coming across?',
    steps: [
      'It’s okay to check.',
      'Notice when you’re checking.',
      'Let the checking end on its own.',
      'Monitoring whether you’re self-monitoring is just another form of monitoring, so skip that part. Just jump in, even with a little anxiety, and do the thing. If you don’t feel it, you don’t feel it. You don’t have to feel everything.',
    ],
    color: '#d98a12',
  },
  {
    id: 'gloves',
    title: 'Putting down the gloves',
    when: 'When you’re so upset you have the gloves up. It’s ME. MY SIDE.',
    steps: [
      'Notice the gloves. It’s narrative, and it’s locked in. You’ve put up a wall people can’t get through.',
      'Go from fight to reflect. Not a philosophical reflection. Not a mind expedition. Just looking at it, and looking into it.',
      'Ask: what is this?',
      'Look for the vulnerability under it. “I felt scared. I’m afraid you’ll leave me. I’m afraid I’m not good enough deep down.”',
      'Same input, same output. New information, new output. Seeing what’s under it gives you new options for writing the script.',
    ],
    color: '#3f9b94',
  },
  {
    id: 'all-in-a-mode',
    title: 'We’re all in a mode',
    when: 'Any time. Right now works.',
    steps: [
      'Identify the mode you’re in.',
      'What’s your thinking style right now? The conscious, actual part: what you see.',
      'What’s your predictive thinking style? What are you expecting to happen?',
      'How is that shaping the way you see events, conversations and interactions (or the failure to interact)?',
      'You don’t have to actively change your style. Better to see it and let it pass. We’re trying to eliminate thinking, not just substitute it.',
    ],
    color: '#8fb39a',
  },
  {
    id: 'jacket',
    title: 'Confidence like a jacket',
    when: 'Before something you’ve already decided is going to go badly.',
    intro:
      'Maybe I imagine it going bad because I create a goal, which always implies a scoring system, and then demand that I perform. Not everything has to be a test of your fitness and worth.',
    steps: [
      'Notice the goal, and the scoring system that came with it.',
      'Try on some confidence like a jacket, without lots of goals or demands.',
      'Just relaxed and natural.',
      'You don’t have to be a scintillating person. You can just relax, and even be quiet or be shy.',
    ],
    color: '#e8b23a',
  },
]
