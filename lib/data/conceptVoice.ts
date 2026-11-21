import type { Concept } from './concepts'

/**
 * Concept texts in Edahn's own words, taken from his homepage copy, his notes
 * (Narrative Notes, Apple Notes), his one-pager and his Primer deck. These
 * override the older, AI-written entries in concepts.ts. Light cleanup only.
 */
export const conceptVoice: Record<string, Partial<Concept>> = {
  'saran-wrap': {
    text:
      'Imagine a piece of Saran Wrap that’s wrapped around a statue or an apple: we don’t really notice because of how perfectly it molds onto the object. You have to get up close, inspect it, and maybe touch it to realize it’s even there. Once you realize it’s there, you can make a mental note and remember for next time.\n\nNarrative (our thinking) operates the same way. When we’re angry, things are irritating. People are awful. Life looks shitty. We rarely think “things look shitty because I’m in a terrible thinking style and am adding all these things (assumptions, characterizations, projections) onto my reality.” We just think that our life sucks.\n\nBut the clue is in its inconsistency. When your mood improves (time passes, new information comes in, sleep improves, hormones chill out) the entire situation looks dramatically different. It’s less dire, less hopeless.',
  },
  narrative: {
    text:
      'A narrative is the particular type of thinking we have activated that forms the substance of the Saran Wrap. It is not stable but changes, and sometimes can be removed almost entirely with the help of contemplative practice like meditation.\n\nWe think about others (lovers, family members), we think about the future, we think about ourselves, we think about things (movies, political movements, a dinner), and we think about situations (a fight, going out, a meeting). The clue that it’s all narrative is that it shifts with your mood. When you’re in a great mood, all those things might seem hopeful, positive, agreeable. In a bad mood, maybe they’re all irritating, negative, hopeless.\n\nNarrative Theory is concerned with documenting, classifying, and untangling these narratives, both within a person and across people in general.',
  },
  mode: {
    text:
      'Modes are combinations of narrative styles, body styles, and action styles. You can think of a style as a theme.\n\nWhen I’m angry, I think in an angry way: black and white, simplified, me-vs.-them, victim/aggressor. My body does characteristic things too. My breathing gets shallow. My gaze becomes intense and confrontational. I smile less. I don’t laugh. And my actions shift. I make noise. I start slamming things. I interrupt more, curse more, and speak louder, in shorter, declarative sentences with less hedging. Congratulations, you’re in anger mode.\n\nEveryone’s modes look a little different, but there’s consistency in how a mode is expressed by an individual. Unpacking your modes, and your partner’s modes, is pretty much what therapy is all about.',
  },
  'narrative-lock': {
    text:
      'Sometimes the Saran Wrap gets glued on so hard that we can’t unstick it. We can’t see something differently than the way we currently see it. I call that narrative lock.\n\nYou see it everywhere, but it’s most obvious when people are emotionally charged. Take a couple who’s fighting about whether someone slammed the car door or just closed it. No matter what the other person says or explains, they just can’t see it. Any contradicting information is dismissed, rationalized, or disputed.\n\nAnd then something happens. The bad outcome doesn’t happen, or the person goes on a run or a meditation retreat and comes back with a totally different outlook. The lock breaks, like a fever breaking. Those moments are invaluable, because they show clearly how narratives hijack our perception.',
  },
  'energy-state': {
    text:
      'Before you roll your eyes (because the word “energy” brings out my cynicism too), hear me out. Every mode exists in an energy state. An energy state predicts the style of the mode. People can engage in the same mode, but in different energy states.\n\nWe use the word energy state instead of mood. It’s not that moods don’t exist, but they’re imprecise and already connected to a set of presumptions and ideas that we avoid, so as to prevent contamination with the NT framework.\n\nThe same set of facts can look totally different depending on your energy state. A newborn crying in a restaurant is irritating to an agitated person and beautiful to the same person in a calm, reflective state.',
  },
  'scoring-system': {
    text:
      'The scoring system is the template that you use in that moment to evaluate a situation. Values are exchangeable; they are mutable. Our appraisals of things are constantly changing.\n\nValue is premised upon a scoring system, and the scoring system is hallucinated, a fiction. It’s projected onto our perception and gives things (events, objects, situations) valence and meaning. Much of it is inherited and passed through culture, and generally tied to survival and longevity, which is why having children and a steady job have ingrained themselves into scoring systems everywhere.\n\nWhen I’m self-conscious, it’s just the mind creating a scoring system and attacking the self.',
  },
  rank: {
    text:
      'Rank is a human module, and an important one. Because we construct these social worlds, it’s very important for us to know who’s who in the social kingdom, and rank is our way of managing that.\n\nThe way you construct reality around somebody is your rank. Most people are in your zone, especially friends. In your zone, you don’t react. As someone moves out of the zone, you start to react. If they’re too low, you form a flattened perception of them. If they’re too high, you fear them and go into alert mode.\n\nShyness is an automatic assumption about rank: a belief that they have something you don’t, and everything filters into that perception. When you have a ranking system that ranks everybody above you, that’s imposter syndrome.',
  },
  'locus-of-normal': {
    text:
      'In alert mode, everything becomes monitoring your own progress, with the assumption that you’re failing, and often that it’s something they’re doing. Your own activity is no longer the locus of normal. Somebody else becomes the center.\n\nThat’s the core of confidence loss. It’s actually very big.\n\nWhen you’re okay, nobody in the room holds the standard. Your own way of doing things is just normal, and you don’t even notice it.',
  },
  'dehydrated-narrative': {
    text:
      'What you may not realize is how many narratives are already in play, activated but not at the forefront of your experience. We call these dehydrated narratives because they developed long ago but we don’t remember them. They’re still active.\n\nThe deep ones are still operating on the body and running the default narrative mode. They show up as mood, not as thoughts.\n\nWe need to rehydrate them to get to them. And then befriend them, rather than hate them or feel ashamed of them.',
  },
  'thought-o-complete': {
    name: 'Thoughtocomplete',
    text:
      'Autocomplete is the way we anticipate things happening. Your Thoughtocomplete could be positive or negative. Negative ToC is anxiety. It doesn’t lead to anxiety, it is it.\n\nThoughtocomplete explains what happens when we have ambiguous information: if somebody likes me, if somebody’s looking at me, if someone liked what I just said, if someone is enjoying me or not. All of that is Thoughtocomplete and your energy.\n\nPessimism is just filling in the blanks negatively, and optimism is filling in the blanks positively. I have a tendency to fill in the blanks negatively, and I’m not angry at myself for that. That’s just my pattern.\n\nIt’s mostly unconscious. It’s a dehydrated narrative, which is to say it’s not obviously recognizable as a narrative. We experience it as a vague “mood.” It needs to be rehydrated, then examined.\n\nEverybody needs to see how they fill in with negative detail. That’s the main job. Negative detail about how people see me, but also negative detail about other people. And if you really don’t know, you may as well think positive.',
  },
  checking: {
    text:
      'Zen Master Seung Sahn would say, “Just drive.” I like that. When you’re driving, just drive. But I don’t really just drive. I keep checking my experience. How outside my mind I am. How salient things are.\n\nAt the gym I realized that monitoring whether you’re self-monitoring is just another form of monitoring. Another version of checking, worrying, occupying the mind. Versus just jumping in, regardless of whether there’s a little anxiety. Not monitoring it. Just doing the thing. And if you don’t feel it, you don’t feel it. You don’t have to feel everything.\n\nTrying leads to checking. Checking is such a big part of practice: looking and waiting for our minds to do something, like settle or get to a destination. But meditation is always at the origin. It’s the origin-destination problem.\n\nSo I think the right approach is: it’s okay to check. Let the checking end on its own. Notice when you’re checking. That’s skillful means.',
  },
  'the-end-of-trying': {
    name: 'The End of Trying',
    text:
      'Meditation isn’t making something happen. It’s the end of trying to make something happen.\n\nEverybody’s always trying to get somewhere, and then they come to meditation and they’re still trying to get somewhere. They’re trying to get to meditation. And if you try to do it, you break it. If you try to meditate and get to letting go, you’re not letting go. You’re just trying something.\n\nSo you gotta stop trying, and then stop trying to stop trying. People think you’re gaining something in Zen. You never gain anything. You just stop searching.',
  },
}
