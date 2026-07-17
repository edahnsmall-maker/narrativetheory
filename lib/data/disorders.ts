export type DisorderSection = {
  name: string;
  slug: string;
  intro: string;
  breakdown: {
    target: string;
    nState: string;
    bodyState: string;
    energyState: string;
    actionSet: string;
    feedbackLoop: string;
  };
  intervention: string;
};

export type DisorderFamily = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  targets: string;
  includes: string;
  intro: string[];
  basicModeWorld: string[];
  pattern: {
    narrative: string;
    body: string;
    energy: string;
    action: string;
  };
  disorders: DisorderSection[];
  commonInterventions: string[];
  table: {
    coreSaranWrap: string;
    target: string;
    nState: string;
    bodyPattern: string;
    rootEnergy: string;
    actionSet: string;
    feedbackLoop: string;
    intervention: string;
  };
};

export const disorderFamilies: DisorderFamily[] = [
  {
    slug: "threat-worlds",
    title: "Threat Worlds",
    subtitle: "When the world appears dangerous, unstable, or about to go wrong.",
    description: "The world appears dangerous, unstable, or about to go wrong.",
    targets: "Future, body, environment, memory, uncertainty.",
    includes: "Generalized anxiety, panic disorder, phobias, PTSD, health anxiety.",
    intro: [
      "Threat Worlds are organized around danger.",
      "The danger may be vague or specific. It may attach to the future, the body, a place, a memory, an object, or a social situation. The target changes, but the deeper pattern is the same: the world is rendered through alarm.",
      "The person is not simply \u201Cthinking anxious thoughts.\u201D A whole world has formed. The body braces. Attention scans. The future becomes charged. The mind starts predicting. Action narrows around prevention, escape, reassurance, or control.",
      "In NT language, this is danger-Saran Wrap. Reality is still there, but it is being wrapped by fear, prediction, and survival-pressure.",
    ],
    basicModeWorld: [
      "Threat Worlds usually follow a simple loop:",
      "Trigger \u2192 body alarm \u2192 danger-world \u2192 prediction \u2192 avoidance/control \u2192 temporary relief \u2192 stronger danger-world later.",
      "The action set often makes sense in the moment. Avoidance, checking, and reassurance reduce the fear temporarily. But they also feed back into the narrative: \u201CI escaped because it was dangerous.\u201D The system learns that the threat-world was accurate.",
    ],
    pattern: {
      narrative: "Something bad is about to happen. I have to prevent it.",
      body: "Bracing, shallow breathing, scanning, tight chest or stomach, startle.",
      energy: "Fear, alarm, vigilance, urgency.",
      action: "Avoid, check, control, flee, reassure, mentally rehearse.",
    },
    disorders: [
      {
        name: "Generalized Anxiety",
        slug: "generalized-anxiety",
        intro:
          "Generalized anxiety is globalized prediction mode.\n\nThe target keeps changing: work, money, health, family, sleep, politics, relationships, the future. But the mode is stable. Life appears as a field of possible problems.\n\nThe core narrative is: \u201CSomething could go wrong, and I need to keep thinking so I am not caught off guard.\u201D\n\nThe mind confuses worry with responsibility. Stopping the worry can feel careless, as if the guard tower has been abandoned.",
        breakdown: {
          target: "Future and life conditions.",
          nState: "Futurecasting, problem-scanning, unfinished loops.",
          bodyState: "Chronic bracing, shallow breath, chest or stomach tension.",
          energyState: "Alarm mixed with responsibility.",
          actionSet: "Worry, plan, check, reassure, rehearse.",
          feedbackLoop: "Worry gives a feeling of control, which makes not-worrying feel dangerous.",
        },
        intervention:
          "Notice worry as a mode, not as wisdom. The useful question becomes: What is actually happening in this slice, and what is the next correct function?",
      },
      {
        name: "Panic Disorder",
        slug: "panic-disorder",
        intro:
          "Panic disorder is body-danger world.\n\nA body sensation appears: racing heart, dizziness, breath change, trembling, heat, unreality. The sensation gets wrapped in emergency: \u201CI am dying,\u201D \u201CI am losing control,\u201D \u201CI need to escape.\u201D\n\nPanic is a closed loop between body sensation and catastrophic interpretation.",
        breakdown: {
          target: "Body sensation.",
          nState: "Body catastrophe, emergency interpretation.",
          bodyState: "Racing heart, breath disruption, dizziness, trembling, derealization.",
          energyState: "Terror, emergency, escape urgency.",
          actionSet: "Flee, seek rescue, check the body, avoid panic contexts.",
          feedbackLoop: "Escaping panic teaches the system that escape prevented catastrophe.",
        },
        intervention: "Separate sensation from emergency-story. Intense body energy is not the same as danger.",
      },
      {
        name: "Specific Phobia",
        slug: "specific-phobia",
        intro:
          "Specific phobia is narrow threat-world.\n\nThe world may be fine until the object appears: dog, elevator, plane, needle, spider, bridge, enclosed space. Then the object becomes saturated with danger.",
        breakdown: {
          target: "Specific object or situation.",
          nState: "Object-danger narrative.",
          bodyState: "Recoil, freeze, sympathetic spike.",
          energyState: "Fear, disgust, escape urgency.",
          actionSet: "Avoid, flee, arrange life around non-contact.",
          feedbackLoop: "Avoidance prevents new evidence and keeps the object wrapped in danger.",
        },
        intervention:
          "Gradually separate the object from danger-Saran Wrap. The body needs repeated contact with the object or situation without catastrophe.",
      },
      {
        name: "PTSD",
        slug: "ptsd",
        intro:
          "PTSD is past-in-present threat-world.\n\nThe traumatic scene does not stay in memory. It rehydrates into the current slice. A tone, smell, room, sound, conflict, silence, authority figure, or touch can become the old danger again.",
        breakdown: {
          target: "Present cue carrying past danger.",
          nState: "\u201CIt can happen again,\u201D \u201CI am not safe,\u201D \u201CI must detect danger first.\u201D",
          bodyState: "Hypervigilance, startle, numbness, bracing, shutdown.",
          energyState: "Survival fear, rage, collapse, vigilance.",
          actionSet: "Scan, avoid, control, flee, freeze, attack, disappear.",
          feedbackLoop: "The present gets organized around preventing an old scene from returning.",
        },
        intervention:
          "Safety first. Then distinguish the current slice from the old scene. The question is: What scene is the body in right now?",
      },
      {
        name: "Health Anxiety",
        slug: "health-anxiety",
        intro:
          "Health anxiety is threat-world attached to body ambiguity.\n\nThe body produces a sensation. The mind wraps it in diagnosis. Uncertainty becomes intolerable. The person checks, Googles, scans, and seeks reassurance.",
        breakdown: {
          target: "Body ambiguity.",
          nState: "Sensation becomes illness narrative.",
          bodyState: "Scanning, vigilance, breath tension.",
          energyState: "Fear plus uncertainty intolerance.",
          actionSet: "Google, check, seek reassurance, monitor.",
          feedbackLoop: "Checking briefly calms the person, then teaches the system that sensations require investigation.",
        },
        intervention: "Separate body sensation from diagnosis-world. The person learns to let some ambiguity remain unresolved.",
      },
    ],
    commonInterventions: [
      "Return to the actual slice.",
      "Name danger-world as danger-world.",
      "Track body alarm before debating thought content.",
      "Separate danger from danger-feeling.",
      "Reduce checking and avoidance where possible.",
      "Replace imagined future-function with present correct function.",
    ],
    table: {
      coreSaranWrap: "Something bad is about to happen",
      target: "Future, body, environment, memory, uncertainty",
      nState: "Futurecasting, scanning, catastrophic association",
      bodyPattern: "Bracing, shallow breath, vigilance, startle",
      rootEnergy: "Fear / alarm",
      actionSet: "Avoid, check, control, escape, seek reassurance",
      feedbackLoop: "Avoidance reduces fear briefly, then teaches the system the danger was real",
      intervention: "Separate real danger from danger-world; return to the present slice and next correct function",
    },
  },
  {
    slug: "shame-rank-worlds",
    title: "Shame & Rank Worlds",
    subtitle: "When the self appears exposed, inferior, defective, or at risk of humiliation.",
    description: "The self appears exposed, inferior, defective, or at risk of humiliation.",
    targets: "Self, other people, social room, body-image, status.",
    includes: "Social anxiety, avoidant patterns, narcissistic defenses, shame-based depression, eating-disorder rank patterns.",
    intro: [
      "Shame & Rank Worlds are organized around position.",
      "The self appears too low, too visible, too flawed, too needy, too ordinary, or not good enough. Other people become judges. Rooms become hierarchies. Conversation becomes performance.",
      "The central target is the self in relation to others.",
      "In NT language, this is rank-Saran Wrap. The mind projects hierarchy onto the room and then experiences the hierarchy as real. The locus of normal moves outside the self. Someone else seems to possess validity, legitimacy, coolness, desirability, or permission to exist naturally.",
    ],
    basicModeWorld: [
      "The loop often looks like this:",
      "Social cue \u2192 rank-drop \u2192 shame body \u2192 performance/avoidance/inflation \u2192 unnatural contact \u2192 more shame.",
      "The person tries to solve shame by managing appearance. But managing appearance makes the social world feel even more dangerous and artificial.",
    ],
    pattern: {
      narrative: "I am being judged. I may be exposed. I am lower. I must manage the impression.",
      body: "Contraction, face heat, self-monitoring, frozen spontaneity, or inflated posture.",
      energy: "Shame, status fear, appeasement, defensive pride.",
      action: "Perform, hide, appease, dominate, compare, replay.",
    },
    disorders: [
      {
        name: "Social Anxiety",
        slug: "social-anxiety",
        intro:
          "Social anxiety is scrutiny-world.\n\nThe room becomes a judging field. Faces become evaluators. Silence becomes failure. Small awkwardness becomes evidence. Conversation becomes an audition.",
        breakdown: {
          target: "Self as seen by others.",
          nState: "Evaluation narrative, anticipated humiliation, self-monitoring.",
          bodyState: "Face heat, chest tightness, constricted voice, scanning.",
          energyState: "Shame plus appeasement fear.",
          actionSet: "Rehearse, edit, overtalk, go quiet, avoid, replay afterward.",
          feedbackLoop: "Performance makes natural contact harder, which creates more evidence of social danger.",
        },
        intervention: "Restore rank equality. The point is not \u201Cbe impressive.\u201D It is two humans, same boat, just talking.",
      },
      {
        name: "Avoidant Patterns",
        slug: "avoidant-patterns",
        intro:
          "Avoidant patterns are shame-protection worlds.\n\nThe person avoids exposure because exposure risks rejection, humiliation, or proof of defectiveness.",
        breakdown: {
          target: "Self exposed to judgment.",
          nState: "Exposure equals danger; rejection confirms defect.",
          bodyState: "Inhibited, contracted, hidden, low social ignition.",
          energyState: "Shame plus fear.",
          actionSet: "Withdraw, delay, decline, stay unseen, underreach.",
          feedbackLoop: "Avoidance preserves safety but prevents lived evidence that contact can be survived.",
        },
        intervention: "Practice tolerable sincerity. Not fake confidence. Not forced extroversion. Small real contact without a false self.",
      },
      {
        name: "Narcissistic Defenses",
        slug: "narcissistic-defenses",
        intro:
          "Narcissistic defenses are rank-inflation worlds.\n\nThe person protects against shame by moving upward. They need to be special, superior, admired, right, exceptional, or exempt from ordinary vulnerability.\n\nThis is still rank-world. It is not freedom from shame. It is shame defended by superiority.",
        breakdown: {
          target: "Self-rank.",
          nState: "\u201CI must remain superior, special, or unexposed.\u201D",
          bodyState: "Postural inflation, tension under challenge, defensive rigidity.",
          energyState: "Rank fear, pride, shame defense.",
          actionSet: "Dominate, dismiss, perform, idealize, devalue, compete.",
          feedbackLoop: "Superiority blocks ordinary contact, which increases the need for superiority.",
        },
        intervention: "Contact the ordinary self without collapse. Rank-maintenance is protection, not freedom.",
      },
      {
        name: "Eating-Disorder Rank / Body Image",
        slug: "eating-disorder-rank",
        intro:
          "Some eating-disorder patterns belong here because the body becomes a rank-object.\n\nThe body is not experienced as living body. It becomes evidence: attractive or unattractive, controlled or failed, acceptable or unacceptable.",
        breakdown: {
          target: "Body as public value object.",
          nState: "Body equals rank, desirability, acceptability.",
          bodyState: "Checking, disgust, tension around food and appearance.",
          energyState: "Shame, comparison, control fear.",
          actionSet: "Restrict, check, compare, hide, compensate.",
          feedbackLoop: "Checking and comparison make the body feel more like a scored object.",
        },
        intervention: "Separate living body from scored body. The body has to become body again, not a public scoreboard.",
      },
      {
        name: "Shame-Based Depression",
        slug: "shame-based-depression",
        intro:
          "Some depression is less about sadness and more about rank-collapse.\n\nThe person feels behind, failed, inferior, unworthy, or exposed as not enough. The scoring system turns against the self.",
        breakdown: {
          target: "Self-worth and life-rank.",
          nState: "\u201CI am failing,\u201D \u201CI am behind,\u201D \u201CI am less.\u201D",
          bodyState: "Collapse, heaviness, lowered gaze, low ignition.",
          energyState: "Shame plus despair.",
          actionSet: "Withdraw, compare, ruminate, stop trying.",
          feedbackLoop: "Withdrawal and comparison strengthen the sense of defectiveness.",
        },
        intervention: "See the scoring system itself. The person is not only losing the game. The mind is hallucinating the game as ultimate.",
      },
    ],
    commonInterventions: [
      "Restore rank equality.",
      "Find the external locus of normal.",
      "Track comparison as Saran Wrap.",
      "Return from performance to sincerity.",
      "Let the body soften out of appeasement or inflation.",
      "Ask: What is correct relationship here?",
    ],
    table: {
      coreSaranWrap: "I am exposed, lower, defective, or being judged",
      target: "Self in relation to others",
      nState: "Comparison, self-monitoring, rank distortion, external locus of normal",
      bodyPattern: "Contraction, face heat, frozen spontaneity, or compensatory inflation",
      rootEnergy: "Shame / status fear",
      actionSet: "Perform, hide, appease, dominate, replay",
      feedbackLoop: "Performance and avoidance make the social world feel more dangerous and artificial",
      intervention: "Restore rank equality; return from performance to sincerity",
    },
  },
  {
    slug: "value-collapse-worlds",
    title: "Value-Collapse Worlds",
    subtitle: "When life, self, and future appear drained of worth or possibility.",
    description: "Life, self, and future appear drained of worth or possibility.",
    targets: "Self, life, future, purpose, effort.",
    includes: "Major depression, dysthymia, burnout-like shutdown states.",
    intro: [
      "Value-Collapse Worlds form when the scoring system turns dark.",
      "The self appears failed. The future appears closed. Life appears empty, pointless, stale, or too heavy to move. This is not merely sadness. It is a world-state.",
      "The same room, same body, same friend, same work, and same future are rendered through low-value Saran Wrap.",
      "In NT language, this is collapse of valuation. The person does not only feel bad. The world appears as if it has lost charge.",
    ],
    basicModeWorld: [
      "The loop often looks like this:",
      "Low energy \u2192 negative valuation \u2192 withdrawal \u2192 less contact with life \u2192 more deadness \u2192 stronger negative valuation.",
      "The body says no energy. The narrative says no point. The future says no opening. The action set says withdraw.",
      "This is why depression is so sticky. The action that feels most natural inside the mode often strengthens the mode. Withdrawal protects the person from effort, disappointment, exposure, and overwhelm, but it also reduces contact with the things that might rehydrate the world.",
    ],
    pattern: {
      narrative: "I am failing. Life is not working. The future will not open. Nothing matters.",
      body: "Heavy, slowed, collapsed, tired, low movement.",
      energy: "Despair, shame, depletion, resignation.",
      action: "Withdraw, ruminate, sleep, scroll, avoid, stop initiating.",
    },
    disorders: [
      {
        name: "Major Depression",
        slug: "major-depression",
        intro:
          "Major depression is full value-collapse world.\n\nThe scoring system becomes global. It does not only say, \u201CThis situation is hard.\u201D It says, \u201CI am bad,\u201D \u201Cmy life is wrong,\u201D \u201Cthe future is closed,\u201D \u201Cnothing will help.\u201D\n\nThe depressed world does not feel like a story. It feels like the truth finally revealed. That is part of the Saran Wrap. The world appears stripped of false hope, but it is also being wrapped by depletion, shame, and negative valuation.",
        breakdown: {
          target: "Self, life, future.",
          nState: "Global negative valuation, self-failure, no-future narrative.",
          bodyState: "Heaviness, low energy, slowed movement, sleep/appetite disruption.",
          energyState: "Despair, shame, depletion.",
          actionSet: "Withdraw, ruminate, avoid, isolate, stop acting.",
          feedbackLoop: "Withdrawal reduces contact with life, which confirms that life has no charge.",
        },
        intervention:
          "Small correct function. Not self-improvement war. Shower, walk, eat, sunlight, one task, one person. The point is recontact with life.\n\nThe intervention is not to argue the person into optimism. It is to reduce the scoring war and create tiny points of contact with what is actually here.",
      },
      {
        name: "Dysthymia / Persistent Low Mood",
        slug: "dysthymia",
        intro:
          "Dysthymia is low-grade atmospheric collapse.\n\nThe world may not feel unbearable. It may feel gray, stale, chronically disappointing. The person functions, but without much aliveness.\n\nBecause the state is chronic, it can become confused with personality. The person may not think, \u201CI am in a mode.\u201D They may think, \u201CThis is just who I am,\u201D or \u201CThis is just what life is.\u201D",
        breakdown: {
          target: "Life atmosphere.",
          nState: "Resignation, muted hope, low expectation.",
          bodyState: "Tired, under-energized, dull.",
          energyState: "Flatness, resignation.",
          actionSet: "Coast, avoid risk, underreach, detach.",
          feedbackLoop: "Underreaching protects against disappointment but keeps life small.",
        },
        intervention:
          "Notice the atmosphere as atmosphere. Reintroduce aliveness through contact, movement, creativity, and small risks.\n\nThis does not mean forcing excitement. It means testing whether the deadness belongs to reality or to the mode-world.",
      },
      {
        name: "Burnout-Like Shutdown",
        slug: "burnout",
        intro:
          "Burnout-like shutdown is depletion-world after prolonged Doing.\n\nThe person has spent too long under demand. Eventually the system refuses. Tasks that once felt possible now feel dead, hostile, absurd, or impossible.\n\nBurnout often has a resentment layer. The body does not simply say, \u201CI\u2019m tired.\u201D It says, \u201CNo more.\u201D",
        breakdown: {
          target: "Obligation, work, demand.",
          nState: "\u201CI can\u2019t keep doing this,\u201D \u201Cnothing is worth the effort,\u201D \u201CI have nothing left.\u201D",
          bodyState: "Exhaustion, irritability, cognitive fog, low resilience.",
          energyState: "Depletion, resentment, aversion.",
          actionSet: "Procrastinate, detach, numb, avoid responsibility.",
          feedbackLoop: "Avoidance creates more backlog, which makes the world feel more crushing.",
        },
        intervention:
          "Separate correct function from false obligation. Identify which demands are real and which are self-worth machinery.\n\nRest is also not the same as escape. The question becomes: what actually restores the organism, and what only numbs it?",
      },
      {
        name: "Shame-Based Depressive States",
        slug: "shame-based-depressive-states",
        intro:
          "Some depression is not primarily emptiness. It is shame turned into atmosphere.\n\nThe person feels behind, failed, inferior, unworthy, exposed, or somehow disqualified from ordinary life. The scoring system has become a weapon pointed inward.",
        breakdown: {
          target: "Self-worth and life-rank.",
          nState: "\u201CI am behind,\u201D \u201CI am less,\u201D \u201CI have failed,\u201D \u201CI am not what I should be.\u201D",
          bodyState: "Collapse, heaviness, lowered gaze, low ignition.",
          energyState: "Shame plus despair.",
          actionSet: "Withdraw, compare, ruminate, stop trying.",
          feedbackLoop: "Withdrawal and comparison strengthen the sense of defectiveness.",
        },
        intervention: "See the scoring system itself. The person is not only losing the game. The mind is hallucinating the game as ultimate.",
      },
    ],
    commonInterventions: [
      "Name the value-collapse world.",
      "Reduce the scoring system.",
      "Avoid turning recovery into another self-worth contest.",
      "Use small correct functions.",
      "Reconnect with body, environment, people, rhythm, light, and movement.",
      "Distinguish rest from avoidance.",
      "Watch for shame narratives pretending to be realism.",
    ],
    table: {
      coreSaranWrap: "I, life, or the future have lost value",
      target: "Self, life, future, purpose",
      nState: "Global negative valuation, hopelessness, failure-story",
      bodyPattern: "Heaviness, low ignition, collapse, slowed movement",
      rootEnergy: "Despair / depletion",
      actionSet: "Withdraw, ruminate, sleep, scroll, avoid",
      feedbackLoop: "Withdrawal reduces contact with life, which makes life feel even more dead",
      intervention: "Reduce the scoring war; reconnect through small correct functions",
    },
  },
  {
    slug: "control-certainty-worlds",
    title: "Control & Certainty Worlds",
    subtitle: "When uncertainty, incompletion, contamination, or loss of control become intolerable.",
    description: "Uncertainty, incompletion, contamination, or loss of control become intolerable.",
    targets: "Safety, morality, body, cleanliness, food, performance, uncertainty.",
    includes: "OCD, health anxiety, eating-disorder control loops, perfectionistic compulsions.",
    intro: [
      "Control & Certainty Worlds form when the mind cannot let something remain unresolved.",
      "Something feels wrong, unsafe, contaminated, unfinished, immoral, medically uncertain, or out of control. The body tightens around not-knowing. The action set tries to neutralize the discomfort.",
      "The deeper pattern is certainty-demand.",
      "The person may appear irrational from the outside, but from inside the mode the action often feels necessary. The ritual, checking, restriction, or repetition promises relief from a world that feels unresolved and unsafe.",
    ],
    basicModeWorld: [
      "The loop often looks like this:",
      "Uncertainty / not-right feeling \u2192 tension \u2192 ritual / control / checking \u2192 relief \u2192 renewed uncertainty.",
      "The ritual works briefly. Then it teaches the system that the ritual was necessary.",
      "This is the central trap. The action set lowers distress, but it also strengthens the world that made the action seem required.",
    ],
    pattern: {
      narrative: "Something is wrong. I need certainty. I need to fix, check, clean, complete, restrict, or neutralize.",
      body: "Tension, dread, disgust, incompletion, agitation.",
      energy: "Dread, uncertainty intolerance, control pressure.",
      action: "Check, wash, count, confess, repeat, restrict, arrange, neutralize.",
    },
    disorders: [
      {
        name: "OCD",
        slug: "ocd",
        intro:
          "OCD is narrative lock plus relief-ritual.\n\nThe obsession forms. The body tightens. The person feels a demand to do something. The compulsion offers relief, but relief strengthens the loop.\n\nThe target may be contamination, harm, morality, symmetry, responsibility, relationship certainty, or something else. The surface content changes. The deeper structure is the felt demand to resolve.",
        breakdown: {
          target: "Uncertainty, contamination, harm, morality, symmetry, responsibility.",
          nState: "\u201CSomething is unsafe, wrong, unfinished, or morally dangerous.\u201D",
          bodyState: "Dread, tension, not-right feeling.",
          energyState: "Certainty hunger, disgust, fear.",
          actionSet: "Ritualize, check, wash, count, confess, mentally review.",
          feedbackLoop: "Ritual relief strengthens the belief that ritual prevented danger.",
        },
        intervention:
          "Do not endlessly debate the obsession. The obsession wants a courtroom.\n\nSee the certainty-demand itself. Stay with the body charge without obeying the ritual.",
      },
      {
        name: "Health Anxiety",
        slug: "health-anxiety",
        intro:
          "Health anxiety belongs here when the main issue is certainty.\n\nThe person does not merely fear illness. They need to know. The body becomes a mystery that must be solved.\n\nA sensation appears. The mind wraps it in diagnosis. Reassurance calms the person briefly, but the calm fades. Another sensation appears. The loop begins again.",
        breakdown: {
          target: "Body ambiguity.",
          nState: "\u201CThis sensation might mean something serious.\u201D",
          bodyState: "Scanning, checking, breath tension.",
          energyState: "Fear plus uncertainty intolerance.",
          actionSet: "Search, check, seek reassurance, monitor.",
          feedbackLoop: "Reassurance fades, and the need to know returns.",
        },
        intervention:
          "Tolerate unresolved body ambiguity. Ask: is this care, or certainty hunger?\n\nThis does not mean ignoring real medical needs. It means distinguishing medical care from compulsive certainty-seeking.",
      },
      {
        name: "Eating-Disorder Control Loops",
        slug: "eating-disorder-control",
        intro:
          "Food, body size, hunger, fullness, exercise, and rules can become a system for managing anxiety, value, and identity.\n\nControl feels like safety. Loss of control feels like collapse. The person may experience food and body as if they contain the whole question of whether the self is acceptable.",
        breakdown: {
          target: "Food, body, hunger, control.",
          nState: "\u201CIf I control this, I am okay.\u201D",
          bodyState: "Hunger tension, checking, rigidity, disgust.",
          energyState: "Control fear, shame, dread.",
          actionSet: "Restrict, compensate, count, weigh, compare.",
          feedbackLoop: "Control briefly stabilizes the self, then makes loss of control more terrifying.",
        },
        intervention:
          "Identify what control is doing: safety, value, rank, purity, identity, relief. Then separate living body from control-object.\n\nThe body has to become body again, not the arena where the whole self is won or lost.",
      },
      {
        name: "Perfectionistic Compulsions",
        slug: "perfectionistic-compulsions",
        intro:
          "Perfectionism is certainty-world applied to performance.\n\nThe task cannot simply be done. It must be protected from criticism, defect, incompletion, shame, or ordinary imperfection.\n\nThe person may look conscientious, but the mode is often fear-based. Finishing becomes dangerous because finishing exposes the work to reality.",
        breakdown: {
          target: "Performance, work, output, self-image.",
          nState: "\u201CThis must be right or I am exposed.\u201D",
          bodyState: "Tension, overfocus, inability to release.",
          energyState: "Dread plus rank fear.",
          actionSet: "Over-edit, delay, redo, avoid finishing.",
          feedbackLoop: "Delay and overwork make the task feel more important and dangerous.",
        },
        intervention: "Correct function over perfect function. What does the situation actually call for? What is enough?",
      },
    ],
    commonInterventions: [
      "Name the certainty-demand.",
      "Separate care from compulsion.",
      "Stop debating inside the obsession-world.",
      "Practice leaving some uncertainty unresolved.",
      "Stay with body charge without ritual.",
      "Return to correct function, not perfect control.",
    ],
    table: {
      coreSaranWrap: "Something is wrong, unsafe, contaminated, unfinished, or unresolved",
      target: "Uncertainty, body, morality, cleanliness, food, performance",
      nState: "Not-rightness, certainty-demand, threat through ambiguity",
      bodyPattern: "Tension, dread, disgust, incompletion",
      rootEnergy: "Dread / uncertainty intolerance",
      actionSet: "Check, wash, count, restrict, confess, neutralize, redo",
      feedbackLoop: "Ritual gives relief, then strengthens the belief that ritual was necessary",
      intervention: "See the certainty-demand itself; stay embodied without obeying the ritual",
    },
  },
  {
    slug: "relief-escape-worlds",
    title: "Relief & Escape Worlds",
    subtitle: "When the current state feels intolerable, and an object or behavior appears to offer rescue.",
    description: "The current state feels intolerable, and an object or behavior appears to offer rescue.",
    targets: "Internal state, craving object, boredom, pain, shame, emptiness.",
    includes: "Substance use, binge eating, phone addiction, gambling, porn, shopping, work compulsion.",
    intro: [
      "Relief & Escape Worlds form when the person cannot stay with the current state.",
      "Something feels too empty, too agitated, too lonely, too ashamed, too bored, too painful, or too much. Then an object glows: substance, food, phone, porn, gambling, shopping, work, fantasy, drama.",
      "The object appears as relief, permission, aliveness, silence, power, or escape.",
      "In NT language, this is object-glow. The object is not experienced as neutral. It becomes wrapped in rescue.",
    ],
    basicModeWorld: [
      "The loop often looks like this:",
      "Intolerable state \u2192 object-glow \u2192 use / consume / escape \u2192 relief \u2192 shame / collapse \u2192 renewed intolerable state.",
      "The object solves the moment and worsens the pattern.",
      "The key is not only the object. It is the state before the object. What state can\u2019t the person stay with? What world forms right before the action?",
    ],
    pattern: {
      narrative: "I need this. After this I\u2019ll feel okay. I deserve it. I can stop later.",
      body: "Craving pull, agitation, emptiness, restlessness, shame after.",
      energy: "Craving, aversion, relief-seeking.",
      action: "Seek, consume, conceal, repeat, regret, restart.",
    },
    disorders: [
      {
        name: "Substance Use Disorders",
        slug: "substance-use",
        intro:
          "Substance use disorder is outsourced energy-state regulation.\n\nThe substance may offer quiet, confidence, sociability, sleep, rebellion, creativity, numbness, pleasure, or permission. It becomes a shortcut from one mode-world to another.\n\nThe person is not only seeking the substance. They are seeking a different total state.",
        breakdown: {
          target: "Current state and substance-object.",
          nState: "\u201CThis will change my state,\u201D \u201CI need it,\u201D \u201CI\u2019ll be okay after.\u201D",
          bodyState: "Craving, agitation, withdrawal, emptiness, shame.",
          energyState: "Craving plus aversion.",
          actionSet: "Seek, use, conceal, justify, recover, repeat.",
          feedbackLoop: "Relief confirms the substance as the path out.",
        },
        intervention:
          "Map the pre-use sequence. What state is the person trying to leave? What does the substance promise?\n\nThe work is not only stopping the action. It is building non-object regulation and learning to remain with raw experience without immediate escape.",
      },
      {
        name: "Binge Eating / Compulsive Eating",
        slug: "binge-eating",
        intro:
          "Food becomes soothing, filling, numbing, rebellion, comfort, or private pleasure.\n\nThe binge may begin before conscious decision. The body is already moving toward relief. The mind may join later with permission stories: \u201CI already failed,\u201D \u201Cjust this once,\u201D \u201CI\u2019ll restart tomorrow.\u201D",
        breakdown: {
          target: "Food as relief-object.",
          nState: "\u201CI need comfort,\u201D \u201CI already failed,\u201D \u201Cjust this once,\u201D \u201CI\u2019ll restart tomorrow.\u201D",
          bodyState: "Urgency, emptiness, dissociation, shame after.",
          energyState: "Craving, soothing hunger, self-abandonment.",
          actionSet: "Binge, hide, numb, regret, restart rules.",
          feedbackLoop: "Shame after the binge becomes part of the next binge-world.",
        },
        intervention:
          "Identify the pre-binge world. Is it loneliness, shame, depletion, restriction, anger, boredom, or emptiness?\n\nThen separate hunger, emotion, and relief-story.",
      },
      {
        name: "Behavioral Addictions",
        slug: "behavioral-addictions",
        intro:
          "The phone, gambling, porn, shopping, gaming, drama, or fantasy becomes a portal.\n\nThe common denominator is not the object. It is the object-glow. Something outside the present state promises charge, relief, escape, or identity.",
        breakdown: {
          target: "Behavior/object as portal.",
          nState: "\u201CThis will give me charge, relief, escape, or identity.\u201D",
          bodyState: "Restless seeking, dopamine pull, agitation, collapse after.",
          energyState: "Craving, boredom intolerance, avoidance.",
          actionSet: "Open app, search, scroll, chase, hide, repeat.",
          feedbackLoop: "The nervous system learns to exit discomfort through the behavior.",
        },
        intervention:
          "Map the state being escaped. Reduce frictionless repetition. Build the capacity to stay with the raw state.\n\nThe question is simple: what state can\u2019t I stay with?",
      },
      {
        name: "Work and Achievement Compulsion",
        slug: "work-achievement-compulsion",
        intro:
          "Some achievement loops belong here too.\n\nWork becomes escape from self, loneliness, uncertainty, ordinariness, or worthlessness. The person may look productive while actually running from Being.\n\nThe action is socially rewarded, which makes the loop harder to see.",
        breakdown: {
          target: "Worth, achievement, future self.",
          nState: "\u201COnce I accomplish this, I\u2019ll be okay.\u201D",
          bodyState: "Tension, speed, inability to rest.",
          energyState: "Craving for worth, fear of stillness.",
          actionSet: "Overwork, optimize, plan, compare, collapse.",
          feedbackLoop: "Achievement briefly lifts worth, then creates the need for the next achievement.",
        },
        intervention: "Separate correct function from worth-chasing. The work may be real. The possession by work is the mode.",
      },
    ],
    commonInterventions: [
      "Map the pre-use or pre-compulsion sequence.",
      "Identify object-glow.",
      "Ask what state is intolerable.",
      "Build non-object regulation.",
      "Increase body contact before action.",
      "Reduce frictionless repetition.",
      "Let discomfort exist without immediate rescue.",
    ],
    table: {
      coreSaranWrap: "This state is intolerable; something else will save me",
      target: "Internal discomfort and the relief-object",
      nState: "Object-glow, permission story, relief fantasy",
      bodyPattern: "Craving pull, agitation, emptiness, shame after",
      rootEnergy: "Craving / aversion",
      actionSet: "Seek, consume, conceal, repeat, regret",
      feedbackLoop: "Relief confirms the object as solution while deepening dependence on it",
      intervention: "Map the pre-use sequence; build non-object regulation; tolerate the raw state",
    },
  },
  {
    slug: "attachment-emergency-worlds",
    title: "Attachment Emergency Worlds",
    subtitle: "When relationship instability appears as survival threat.",
    description: "Relationship instability appears as survival threat.",
    targets: "Partner, attachment figure, text delay, tone shift, boundary, rejection cue.",
    includes: "Borderline patterns, anxious attachment, avoidant attachment, trauma-bond dynamics, relational panic.",
    intro: [
      "Attachment Emergency Worlds form when a relationship event becomes danger to the self.",
      "A delayed text, changed tone, boundary, conflict, distance, attraction, disappointment, or ambiguity becomes more than an event. It becomes abandonment, betrayal, engulfment, rejection, or proof that love is disappearing.",
      "The cue may be small. The world it activates is not.",
      "In NT language, the relationship becomes wrapped in survival-story. The other person is no longer only another person. They become safety, danger, oxygen, mirror, judge, rescuer, enemy, parent, home, or proof.",
    ],
    basicModeWorld: [
      "The loop often looks like this:",
      "Ambiguous relational cue \u2192 attachment-world \u2192 body panic/rage/collapse \u2192 emergency action \u2192 relationship destabilization \u2192 more evidence for attachment-world.",
      "The person tries to secure the relationship, but the emergency actions often make the relationship less stable.",
      "This is one of the places where feedback matters most. The action set becomes part of the evidence for the narrative.",
    ],
    pattern: {
      narrative: "I am being abandoned, betrayed, engulfed, erased, or rejected.",
      body: "Surge, panic, collapse, rage, shame, longing.",
      energy: "Attachment terror, protest, desperation.",
      action: "Cling, test, accuse, attack, disappear, apologize, idealize, devalue.",
    },
    disorders: [
      {
        name: "Borderline Patterns",
        slug: "borderline-patterns",
        intro:
          "Borderline patterns are intense self/other state-switching.\n\nThe other person may become savior, enemy, abandoner, betrayer, or only source of safety. The self shifts with the relationship field.\n\nThe relationship is not merely important. It becomes tied to self-continuity.",
        breakdown: {
          target: "Attachment figure and self-stability.",
          nState: "Abandonment, betrayal, engulfment, idealization/devaluation.",
          bodyState: "Relational panic, rage, collapse, shame.",
          energyState: "Attachment terror.",
          actionSet: "Cling, test, accuse, attack, apologize, disappear, return.",
          feedbackLoop: "Emergency actions create relational instability, which confirms the emergency-world.",
        },
        intervention:
          "Regulate before interpreting. Do not let abandonment-world choose the action.\n\nThe useful question is: what happened in the actual slice, and what world formed around it?",
      },
      {
        name: "Anxious Attachment",
        slug: "anxious-attachment",
        intro:
          "Anxious attachment is uncertainty-intolerant relationship mode.\n\nThe person tracks distance, tone, response time, affection, and signs of change. Ambiguity becomes danger. Waiting becomes proof. Silence becomes meaning.",
        breakdown: {
          target: "Relational ambiguity.",
          nState: "\u201CThey are pulling away,\u201D \u201CI need reassurance,\u201D \u201CI may lose them.\u201D",
          bodyState: "Agitation, chest/stomach activation, scanning.",
          energyState: "Longing, fear, protest.",
          actionSet: "Text, check, ask, pursue, analyze, replay.",
          feedbackLoop: "Reassurance fades quickly, requiring more reassurance.",
        },
        intervention:
          "Separate closeness from certainty. Stabilize before pursuing.\n\nThe desire for closeness may be real. The emergency-world is the part that needs to be seen.",
      },
      {
        name: "Avoidant Attachment",
        slug: "avoidant-attachment",
        intro:
          "Avoidant attachment moves away from the emergency.\n\nCloseness appears as engulfment, demand, loss of autonomy, or exposure. Distance becomes regulation.\n\nThe person may experience intimacy as pressure before they can explain why. Their body has already moved toward exit.",
        breakdown: {
          target: "Closeness and dependency.",
          nState: "\u201CThey want too much,\u201D \u201CI\u2019ll be trapped,\u201D \u201CI need space to be myself.\u201D",
          bodyState: "Constriction, numbness, irritation, shutdown.",
          energyState: "Overwhelm, aversion, autonomy defense.",
          actionSet: "Withdraw, dismiss, delay, intellectualize, disappear.",
          feedbackLoop: "Distance reduces overwhelm but blocks intimacy and repair.",
        },
        intervention:
          "Separate closeness from engulfment. Practice staying present in small doses of intimacy.\n\nThe point is not to erase the need for space. It is to see when space is correct function and when it is emergency exit.",
      },
      {
        name: "Trauma-Bond Dynamics",
        slug: "trauma-bond-dynamics",
        intro:
          "Trauma-bond dynamics occur when fear and relief become fused with attachment.\n\nThe relationship may feel like danger and rescue at the same time. The nervous system becomes organized around rupture, threat, reunion, relief, and renewed threat.\n\nIntensity starts to feel like love because the body associates relief with attachment.",
        breakdown: {
          target: "Harmful or unstable attachment figure.",
          nState: "\u201CThey hurt me / they save me,\u201D \u201Cthis intensity means love,\u201D \u201CI can\u2019t leave.\u201D",
          bodyState: "High activation, collapse, relief spikes, withdrawal-like longing.",
          energyState: "Fear, craving, dependency.",
          actionSet: "Return, chase repair, excuse harm, cling to relief.",
          feedbackLoop: "Relief after rupture strengthens the bond to the person who caused the rupture.",
        },
        intervention:
          "Map the cycle, not just the person. The question is not only \u201CDo they love me?\u201D but \u201CWhat mode-world does this relationship keep putting me in?\u201D",
      },
      {
        name: "Relational Panic",
        slug: "relational-panic",
        intro:
          "Relational panic is the acute version of attachment emergency.\n\nSomething happens: a text is delayed, a conversation shifts, someone gets quiet, a boundary appears. The body surges and the mind rushes to explain.",
        breakdown: {
          target: "Immediate relational cue.",
          nState: "\u201CSomething is wrong,\u201D \u201CI am losing them,\u201D \u201CI need to fix this now.\u201D",
          bodyState: "Surge, tight chest, stomach drop, agitation.",
          energyState: "Panic, protest, urgency.",
          actionSet: "Text, call, accuse, explain, apologize, pursue, demand clarity.",
          feedbackLoop: "Urgent action can pressure the other person, creating more distance and more panic.",
        },
        intervention: "Pause the action set. Regulate first, interpret second, communicate third.",
      },
    ],
    commonInterventions: [
      "Stabilize body before interpreting the relationship.",
      "Name the active attachment-world.",
      "Separate cue from story.",
      "Delay action during relational panic.",
      "Ask what correct relationship actually is.",
      "Build scripts for rupture, repair, space, reassurance, and boundaries.",
      "Avoid making another person responsible for total self-stability.",
    ],
    table: {
      coreSaranWrap: "Love, safety, or selfhood is disappearing right now",
      target: "Partner, attachment figure, relational cue",
      nState: "Abandonment, betrayal, engulfment, idealization/devaluation",
      bodyPattern: "Relational panic, surge, collapse, rage, longing",
      rootEnergy: "Attachment terror",
      actionSet: "Cling, test, accuse, attack, disappear, apologize",
      feedbackLoop: "Emergency actions destabilize the relationship, creating more evidence for the emergency-world",
      intervention: "Regulate before interpreting; separate relational fact from abandonment-world",
    },
  },
  {
    slug: "reality-interface-worlds",
    title: "Reality & Interface Worlds",
    subtitle: "When shared reality, sensory reality, self-continuity, or social meaning becomes unstable or differently configured.",
    description: "Shared reality, sensory reality, self-continuity, or social meaning becomes unstable or differently configured.",
    targets: "Reality, self, body, sensory world, symbolic meaning, social code.",
    includes: "Psychosis, dissociation, autism, derealization/depersonalization, sensory overload.",
    intro: [
      "Reality & Interface Worlds are different from the other families.",
      "Here the issue may not be a simple distorted narrative. It may involve the boundary between private meaning and shared reality, the continuity of self-experience, the body\u2019s ability to stay present, sensory intensity, or the effort required to translate social meaning.",
      "This family includes both destabilized reality-construction and different interface styles.",
      "In NT language, these are modes where the basic interface with reality, self, body, sensory input, or social code becomes central.",
    ],
    basicModeWorld: [
      "The loop varies more here than in the other families.",
      "In psychosis, private meaning can pull the person away from shared reality. In dissociation, overwhelm can push the person out of contact with body and scene. In autism, there is no delusion or destabilization at all \u2014 it's a different baseline interface with sensory input and social meaning, the same way a different attention system is neurology rather than narrative.",
      "This family should stay wide, and autism in particular is not a mode-world the way the others here are. It's included only because sensory intensity and social-translation effort interact with narrative \u2014 the same interaction NT notes for ADHD elsewhere on this site, where the attention system itself is explicitly out of scope. Some of what's below is destabilization. Some of it is difference. Some of it is overload. Some of it is the world demanding a false normal.",
    ],
    pattern: {
      narrative: "Reality is unstable, private, overwhelming, unreal, or socially unclear.",
      body: "Overload, shutdown, numbness, disorganization, derealization.",
      energy: "Salience, confusion, terror, overwhelm, pattern-seeking.",
      action: "Decode, withdraw, script, detach, follow signs, seek structure.",
    },
    disorders: [
      {
        name: "Psychosis / Schizophrenia-Spectrum States",
        slug: "psychosis",
        intro:
          "Psychosis is high-Saran reality fusion.\n\nPrivate meaning may become reality. Coincidences become messages. Thoughts, symbols, voices, or perceptions may feel externally significant or threatening.\n\nThis is not ordinary Saran Wrap. It is a more extreme fusion of meaning-world and reality-world.",
        breakdown: {
          target: "Reality, symbols, others, hidden meaning.",
          nState: "Private meaning-world, hidden signals, persecution, revelation.",
          bodyState: "Agitation, suspicion, disorganization, withdrawal, or flattening.",
          energyState: "Salience, terror, intensity, revelation.",
          actionSet: "Decode, defend, withdraw, follow signs, avoid perceived threats.",
          feedbackLoop: "Isolation and decoding can make the private meaning-world stronger.",
        },
        intervention:
          "Safety, grounding, sleep, reduced stimulation, stable relationships, shared-reality contact, and clinical support where needed.\n\nDo not argue inside the delusion-world. Do not intensify meaning. Help the person stay connected to what is shared, stable, and immediate.",
      },
      {
        name: "Dissociation",
        slug: "dissociation",
        intro:
          "Dissociation is self/world disconnection.\n\nThe person may feel unreal, outside the body, emotionally numb, far away, fragmented, or on autopilot.\n\nIn NT terms, the organism leaves contact. This may be protection. The system reduces feeling, embodiment, and scene-contact because full contact feels like too much.",
        breakdown: {
          target: "Self-continuity and present contact.",
          nState: "\u201CThis is not real,\u201D \u201CI am not here,\u201D \u201CI am watching from outside.\u201D",
          bodyState: "Numbness, floatiness, low embodiment, disconnection.",
          energyState: "Overwhelm turning into shutdown.",
          actionSet: "Detach, disappear, autopilot, avoid feeling.",
          feedbackLoop: "Detachment protects from overwhelm but weakens contact with present life.",
        },
        intervention:
          "Re-enter slowly. Restore orientation to the present slice: feet, room, breath, temperature, name, date, sound.\n\nThe question is: what amount of contact is safe right now?",
      },
      {
        name: "Autism",
        slug: "autism",
        intro:
          "Autism is a neurotype, not a mode-world — it doesn't belong in this list on the same terms as the others, and it's worth saying that plainly before anything else. It is not a distorted narrative and not a destabilized construction. It's a different baseline interface with sensory input and social meaning, the same way a different attention system is neurology rather than narrative.\n\nWhat NT can speak to is narrower: the social world is full of hidden, unwritten rules — tone, implication, status cues, small talk, face-reading, vague expectations, performance norms — and autistic people may not automatically share or prioritize that particular social Saran Wrap. That's a mismatch of interfaces, not a deficit in either one.\n\nThis matters because a person can suffer here not because their world is false, but because the shared world around them is built for a different interface and doesn't accommodate theirs.",
        breakdown: {
          target: "Social meaning, sensory input, predictability, pattern.",
          nState: "Social meaning may require translation; patterns may be clearer than implicit norms.",
          bodyState: "Sensory overload, shutdown, intense focus, fatigue after masking.",
          energyState: "Overload, pattern-seeking, special-interest aliveness.",
          actionSet: "Script, mask, withdraw, systematize, pursue deep interests.",
          feedbackLoop: "Masking to fit an unaccommodating world is exhausting — that's a cost of the mismatch, not a flaw in the person.",
        },
        intervention:
          "Reduce translation burden. Lower sensory chaos. Respect special interests. Distinguish sincerity from masking. Support correct function without forcing fake normality.",
      },
      {
        name: "Derealization / Depersonalization",
        slug: "derealization-depersonalization",
        intro:
          "Derealization and depersonalization are reality-distance worlds.\n\nThe world may feel dreamlike, flat, artificial, distant, or unreal. The self may feel absent, strange, mechanical, or not located in the body.\n\nThis can become frightening when the mind wraps the state in danger: \u201CSomething is wrong with reality,\u201D \u201CI am going crazy,\u201D \u201CI will never come back.\u201D",
        breakdown: {
          target: "Reality-feeling and self-feeling.",
          nState: "Reality feels unreal; self feels absent or strange.",
          bodyState: "Numbness, visual distance, breath constriction, low grounding.",
          energyState: "Fear plus shutdown.",
          actionSet: "Check reality, panic, withdraw, monitor consciousness.",
          feedbackLoop: "Monitoring unreality makes unreality more salient.",
        },
        intervention:
          "Do not solve reality philosophically. That can worsen the loop.\n\nGround in body, ordinary action, environment, and simple contact. Reduce the fear-story around unreality.",
      },
      {
        name: "Sensory Overload States",
        slug: "sensory-overload",
        intro:
          "Sensory overload occurs when the scene is too much for the nervous system.\n\nLight, sound, touch, smell, motion, complexity, or social demand may exceed processing capacity. The person may shut down, melt down, leave, stim, or become irritable.",
        breakdown: {
          target: "Sensory scene.",
          nState: "\u201CToo much,\u201D \u201CI need out,\u201D \u201CI cannot process this.\u201D",
          bodyState: "Agitation, pain, shutdown, startle, irritability.",
          energyState: "Overload, aversion.",
          actionSet: "Leave, cover ears, stim, shut down, snap, avoid.",
          feedbackLoop: "Repeated overload makes more environments feel unsafe or exhausting.",
        },
        intervention: "Reduce input. Increase predictability. Give the body a way out before it has to force one.",
      },
    ],
    commonInterventions: [
      "Prioritize safety.",
      "Reduce stimulation.",
      "Ground in the present slice.",
      "Strengthen shared-reality contact where needed.",
      "Avoid over-interpreting.",
      "Respect different interfaces with reality.",
      "Reduce masking burden.",
      "Use clinical support where psychosis, severe dissociation, or safety risk is present.",
    ],
    table: {
      coreSaranWrap: "Reality, self, sensory input, or social meaning is unstable or differently rendered — autism belongs here as a difference, not a distortion",
      target: "Reality, self, body, social code, symbolic meaning",
      nState: "Private meaning, derealization, sensory overload, social translation",
      bodyPattern: "Disorganization, numbness, overload, shutdown",
      rootEnergy: "Salience / confusion / overwhelm",
      actionSet: "Decode, withdraw, script, detach, follow signs",
      feedbackLoop: "Isolation, overload, or private meaning can move the person farther from shared stabilizing contact",
      intervention: "Safety, grounding, shared-reality contact, reduced translation burden, clinical support where needed",
    },
  },
];

export const getFamily = (slug: string) => disorderFamilies.find((f) => f.slug === slug);
