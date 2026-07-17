export interface Concept {
  slug: string;
  name: string;
  shortDef: string;
  text: string;
  related: string[];
}

export const concepts: Concept[] = [
  {
    slug: "construction",
    name: "Construction",
    shortDef: "The assembled world you actually live in — senses plus story, delivered as one thing.",
    text:
      "You never experience raw sense data. You experience a construction: what the senses deliver, fused with memory, expectation, mood, and meaning, arriving as a single, seamless thing. There is no moment where you get the facts first and add the story after — by the time anything reaches you, it has already been built.\n\nThis is the frame everything else in NT sits inside. Narrative is the part of the construction made of thought. Saran Wrap is the construction once it's mistaken for the thing itself. A mode is a construction that keeps rebuilding the same way. Seeing the construction as a construction — built, not given — is the move underneath all the others.",
    related: ["narrative", "saran-wrap", "mode"],
  },
  {
    slug: "narrative",
    name: "Narrative",
    shortDef: "Thought that forms an opinion about a target — and then becomes part of how the target appears.",
    text:
      "A narrative is not merely a story told on purpose. It is the active construction of meaning around self, other, world, future, memory, or situation. The mind narrates almost continuously, and most of the time the narration is invisible because it conforms so closely to experience.\n\nWhen a delayed text feels like rejection, when a quiet partner feels like contempt, when a room feels like a hierarchy — those are narratives, presented as facts.",
    related: ["construction", "saran-wrap", "narrative-lock", "scoring-system"],
  },
  {
    slug: "saran-wrap",
    name: "Saran Wrap",
    shortDef: "The transparent layer of story wrapped around reality.",
    text:
      "Saran Wrap is the layer of story, meaning, interpretation, judgment, memory, expectation, fear, desire, and self-concept wrapped around reality. Like clear plastic wrap, it is difficult to see because it conforms so closely to the thing it covers.\n\nYou are not usually arguing with reality. You are arguing with the wrap. Once the wrap is seen as wrap, the underlying situation becomes simpler and often much smaller.",
    related: ["narrative", "the-end-of-trying", "thinking-body-action"],
  },
  {
    slug: "thinking-body-action",
    name: "Thinking · Body · Action",
    shortDef: "Thought, state, and behavior arise together as one package.",
    text:
      "A moment is not thought first, feeling second, action third. Narrative, body, and action arise together. A braced body produces braced thinking. A defensive story produces defensive action. They rhyme because they are faces of one state.\n\nChanging one face changes the others. Soften the jaw and the prosecution in the head quiets a little. Drop the story and the chest releases.",
    related: ["mode", "energy-state", "correct-function"],
  },
  {
    slug: "energy-state",
    name: "Body + Energy States",
    shortDef: "The physical and energetic side of experience: breath, tension, posture, speed, charge, flavor.",
    text:
      "Body + Energy States are the physical and energetic side of experience: breath, tension, posture, speed, charge, and flavor. They are not noise around the content of a moment; they are part of the content.\n\nThe same facts land differently in a braced body than in a settled one. Working at the level of body and energy is often more direct than arguing with the story on top of them.",
    related: ["narrative-flavors", "mode", "thinking-body-action"],
  },
  {
    slug: "narrative-flavors",
    name: "Narrative Styles / Flavors",
    shortDef: "The characteristic style or tone of thinking: anxious, strategic, romantic, suspicious, playful.",
    text:
      "Every narrative has a flavor: anxious, strategic, romantic, suspicious, prosecutorial, collapsed, playful, devotional, contemptuous, tender. The flavor is the style of the thinking, not just its content.\n\nFlavors travel with body states and energy. Naming the flavor often loosens it faster than arguing with the words inside it.",
    related: ["energy-state", "mode", "narrative"],
  },
  {
    slug: "mode",
    name: "Mode",
    shortDef: "A repeating package of thinking style, body state, energy, and action.",
    text:
      "A mode is a repeating package of thinking style, body state, energy state, and action tendency. You enter and leave modes. You are not identical to them.\n\nModes have signatures: a way the body holds itself, a tone of inner speech, a set of behaviors, a way the world appears. Once a mode has a name and a felt signature, it stops being invisible. That recognition is already a shift.",
    related: ["thinking-body-action", "energy-state", "life-review"],
  },
  {
    slug: "scoring-system",
    name: "Scoring System",
    shortDef: "The mind's invisible scoreboard for worth and standing.",
    text:
      "The Scoring System is the mind's invisible scoreboard: worth, status, attractiveness, success, failure, progress, respect, and belonging. It feels like noticing reality, but it is often projection.\n\nMost suffering around rank is suffering around the scoreboard, not around any real verdict that has been delivered.",
    related: ["rank", "narrative"],
  },
  {
    slug: "rank",
    name: "Rank",
    shortDef: "The felt social hierarchy projected onto rooms and relationships.",
    text:
      "Rank is the felt social hierarchy the mind projects onto rooms, relationships, work, dating, and conflict. Rank may overlap with real power, but the felt hierarchy is often Saran Wrap.\n\nNoticing felt rank is the beginning of unhooking from it. The room is rarely the courtroom the mind has constructed.",
    related: ["scoring-system", "saran-wrap"],
  },
  {
    slug: "narrative-lock",
    name: "Narrative Lock",
    shortDef: "When a story becomes so certain it no longer feels like a story.",
    text:
      "Narrative Lock is when a story becomes so certain that it no longer feels like a story. Certainty is not the same as truth.\n\nA locked narrative collapses options. Conflict, grief, shame, and breakups often involve a locked narrative that has to be loosened before any movement is possible.",
    related: ["narrative", "the-end-of-trying"],
  },
  {
    slug: "correct-function",
    name: "Correct Function",
    shortDef: "Seeing what the situation calls for — and doing it.",
    text:
      "Correct Function is not what anxiety wants, what rank wants, or what the story wants. It is wiser, fitting action that meets the situation as it actually is.\n\nIt often looks ordinary from the outside: answering simply, listening fully, acting without flourish.",
    related: ["being-doing", "mode"],
  },
  {
    slug: "being-doing",
    name: "Being / Doing",
    shortDef: "Mental action vs. clear contact.",
    text:
      "Doing is mental action: managing, steering, striving, proving, avoiding, controlling. Being is clear contact with what is happening. Modes are often Doing states; Being is not another performance.\n\nBeing is what you stop adding to the moment, not what you produce on top of it.",
    related: ["correct-function", "the-end-of-trying"],
  },
  {
    slug: "life-review",
    name: "Life Review",
    shortDef: "Practical application of NT to one's recurring patterns.",
    text:
      "Life Review is the practical application of NT to recurring patterns: work, family, relationships, social life, dating, confidence, and practice. The goal is to identify modes, name them, and understand their body/narrative/action signatures.\n\nIt is not about judging yourself. It is about seeing the patterns clearly enough that they stop being invisible.",
    related: ["mode"],
  },
  {
    slug: "cuts-clumps-sequences-modes-pattern",
    name: "Cuts, Clumps, Sequences, Modes, and Pattern",
    shortDef: "How the mind slices continuous reality into things, events, and patterns.",
    text:
      "The basic idea\n\nThere is The Pattern, and then there are the cuts we make into The Pattern.\n\nThe Pattern is everything happening: body, room, sound, thought, memory, weather, other people, nervous system, language, culture, karma, whatever. All of it moving together. Then the mind divides it so it can understand, explain, predict, and act.\n\nThis matters because Narrative Theory is mostly dealing with things that are not exactly things. Anxiety is not exactly a thing. A relationship is not exactly a thing. A self is not exactly a thing. A disorder is not exactly a thing. They are patterns we cut out of the larger pattern. Sometimes the cut is useful. Sometimes the cut becomes Saran Wrap and we start believing too much in the object we created.\n\nThe Pattern\n\nDefinition: The Pattern is the whole field of what is happening before we divide it into names, objects, problems, selves, disorders, or stories.\n\nThe Pattern is not mystical, exactly. It is just the whole situation before the mind starts carving it up. Body-state, room, other people, thoughts, sounds, memories, roles, history, biology, culture, energy, weather, karma, all of it. NT starts from the assumption that everything we name is being cut out of this larger movement.\n\nThis keeps the theory humble. We can talk about anger, shame, anxiety, depression, self, relationship, and disorder, but we should remember that these are names we give to parts of The Pattern. They are not final objects sitting there with clean edges.\n\nCuts\n\nDefinition: A cut is a way of slicing The Pattern so we can look at something.\n\nWhen we say \u201cnarrative,\u201d that is a cut. When we say \u201cbody-state,\u201d that is a cut. When we say \u201caction set,\u201d that is a cut. When we say \u201cdepression,\u201d that is also a cut. The cut helps us see something, but it also hides the fact that everything is still connected.\n\nFor example, NT often cuts experience into narrative, body, energy, and action. That is useful. It lets us ask what story is active, what the body is doing, what energy is running, and what action wants to happen. But in real life, these are not separate. The story changes the body, the body changes the story, the energy changes the action, the action changes the world. The cut is a tool, not the truth.\n\nThis is also how I think about diagnosis. A diagnosis is a cut. It may be useful, but it is not the thing itself. There is no perfect natural border where worry becomes anxiety, or sadness becomes depression, or awkwardness becomes social anxiety. There are patterns, and then there are cuts we make into those patterns.\n\nClumps\n\nDefinition: A clump is a bundle of many moving parts that the mind treats as one object.\n\n\u201cMy life\u201d is a clump. \u201cMy relationship\u201d is a clump. \u201cMy career\u201d is a clump. \u201cMy anxiety\u201d is a clump. \u201cMy personality\u201d is a clump. \u201cMe\u201d is probably a clump too.\n\nClumps are useful because they compress information. You can\u2019t think through every detail of your entire life every time you say \u201cmy life.\u201d So the mind bundles things. The problem is that the bundle starts to feel like a solid object.\n\nYou are not just sitting in a room with a tired body and a few thoughts. Suddenly you are sitting inside \u201cmy life is failing.\u201d Now the clump has become a world. You are reacting to a huge abstract object as if it is directly present.\n\nThat is one way Saran Wrap gets thick: the mind clumps a lot of moving reality into one object, gives it a valuation, and then forgets it made the clump.\n\nSequences\n\nDefinition: A sequence is a pattern unfolding across time.\n\nMost psychological things are sequences before they are things. A fight is a sequence. Panic is a sequence. Anger is a sequence. Depression is a sequence. Addiction is a sequence. A date is a sequence. A meditation sit is a sequence.\n\nThis matters because if you only name the thing after it has fully formed, you miss how it formed. Anger may begin as a small cue, then an interpretation, then body tightening, then rank threat, then hostile story, then raised voice, then attack, then regret. Where exactly is the anger? It depends how you cut it.\n\nSequences let NT look at formation. What was the trigger? What shifted first? What did the body do? What story appeared? What action followed? What happened after? That is usually more useful than naming the state and stopping there.\n\nModes\n\nDefinition: A mode is a repeating sequence with a recognizable narrative, body-state, energy-state, and action set.\n\nA mode is not just a mood. It is the whole package. Anxiety mode is not just anxious thoughts. It is the future looking dangerous, the body bracing, alarm energy running, and the action set moving toward checking, planning, avoiding, or reassurance.\n\nAnger mode is not just being mad. It is the other person looking wrong or disrespectful, the body heating up, attack energy coming online, and the action set wanting to accuse, correct, dominate, or punish.\n\nSocial anxiety mode is not just nervousness. It is the room becoming a hierarchy, the self dropping rank, the body contracting, shame energy running, and the action set moving toward performance, hiding, or replay.\n\nA mode is a little world. Once it activates, the world appears differently. The future looks dangerous. The other person looks guilty. The self looks defective. The object looks like relief. The relationship looks like it is disappearing. That is why \u201cmode-world\u201d is useful language.\n\nThe feedback loop\n\nDefinition: The feedback loop is the way a mode\u2019s actions reinforce the world that produced them.\n\nThis is the key piece. Modes don\u2019t only generate actions. The actions feed back into the mode.\n\nAnxiety avoids, and then avoidance makes danger feel more real. OCD checks, and then checking makes uncertainty feel more dangerous. Depression withdraws, and then withdrawal makes life feel more dead. Addiction escapes, and then escape makes the object glow more next time. Attachment panic chases, and then chasing destabilizes the relationship and creates more evidence for panic.\n\nThe mode solves the moment and deepens the pattern. That is why these things get sticky. The action makes sense inside the mode, but from outside the mode we can see how it keeps the mode alive.\n\nWhy this matters\n\nThis gives NT a cleaner way to think about experience.\n\nInstead of treating anxiety, depression, addiction, social anxiety, or personality as solid things, we can ask: what cut are we making, what clump has the mind created, what sequence is unfolding, what mode is active, and how is the mode feeding itself?\n\nThis also gives NT a different way to think about disorders. A disorder is not necessarily a fixed object or identity. It is more like a sticky mode-world. The DSM names the clump from the outside. NT tries to map the pattern from the inside: what world forms, what it targets, what body-state comes online, what energy drives it, what actions follow, and how those actions feed the world that created them.\n\nThe point\n\nCuts help us look. Clumps show us what the mind has bundled together. Sequences show us how things unfold. Modes show us the repeating pattern. The Pattern is the whole thing moving before we divide it.\n\nThe goal is not to make perfect categories. There are no perfect categories. The goal is to see clearly enough that we stop being completely possessed by the categories and worlds we create.\n\nMaybe practice starts there: this is a cut, this is a clump, this is the sequence, this is the mode, this is the feedback loop. Then the Saran Wrap loosens a little and there is more room to ask what is actually happening and what the situation calls for.",
    related: ["mode", "saran-wrap", "narrative"],
  },
  {
    slug: "thought-o-complete",
    name: "Thought-o-Complete",
    shortDef: "The mind auto-fills ambiguous situations, and the filling is colored by your energy state.",
    text:
      "Most situations are ambiguous. Does that person like me? Did they mean that as a dig? Is my life on track? The information is incomplete, so the mind completes it — the way autocomplete finishes your sentence before you do.\n\nThe key point is that the completion is not neutral. It is colored by the energy state you are already in. Pessimism is just filling in the blanks negatively. Optimism is filling them in positively. Same blanks, different fill.\n\nThis is where anxiety actually lives. Anxiety is not caused by negative auto-complete — it *is* negative auto-complete. The delayed text becomes rejection. The quiet room becomes judgment. You did not decide to think that; the mind filled the gap before you arrived.\n\nThe practical move is not to force positive thoughts. It is to notice that you are filling a blank at all — and that a blank is not evidence. When you truly do not know, you may as well not complete it against yourself.",
    related: ["saran-wrap", "energy-state", "expectation-narrative", "checking"],
  },
  {
    slug: "the-dream",
    name: "The Dream (Maya / Logosphere)",
    shortDef: "The total world of meaning the mind projects and then lives inside, mistaking it for reality.",
    text:
      "Add up all your Saran Wrap — every projection about yourself, other people, rank, what things mean, what is supposed to happen — and you get a whole world. Not a world you visit. A world you live inside without noticing. Call it the dream, or maya, or the logosphere: the sphere of meaning laid over everything.\n\nThe reason it is hard to see is the same reason a fish does not see water. It is perfectly conformed to experience. You are not aware of interpreting the room; the room simply *is* threatening, or boring, or beneath you. The interpretation arrives pre-installed.\n\nYou know the dream is a dream because you wake up from it sometimes — after meditation, after real rest, in a moment of genuine contact with someone. Suddenly the same room, the same people, the same life looks different, lighter, less charged. Nothing out there changed. The dream thinned.\n\nNT is not about escaping the world. It is about noticing the layer you have added to it — clearly enough that it stops running you.",
    related: ["saran-wrap", "narrative", "the-end-of-trying", "rank"],
  },
  {
    slug: "checking",
    name: "Checking",
    shortDef: "The reflex of monitoring your own state and performance, which is itself the problem.",
    text:
      "There is a background habit of constantly checking: How am I doing? Am I okay? How am I coming across? Am I relaxed yet? Is this working? It feels like vigilance, like staying safe. It is actually the engine that keeps you tense.\n\nHere is the trap. Monitoring whether you are self-monitoring is just more monitoring. Checking whether you have stopped checking is more checking. You cannot solve it with another layer of the same move. The way out is not a better check; it is noticing the checking and letting it end on its own.\n\nSocial anxiety is largely checking. So is a certain kind of failed meditation, where you keep taking your own temperature to see if you have arrived. The instruction is almost too simple: don't check. Not as force — you can't force your way out of force — but as a willingness to stop taking the reading and just be in the thing.",
    related: ["assaulting-the-moment", "the-end-of-trying", "rank"],
  },
  {
    slug: "the-end-of-trying",
    name: "The End of Trying (formerly The Shift)",
    shortDef: "The paradox at the center of the practice: the effort to relax is itself the tension.",
    text:
      "You cannot try your way into ease, because trying is the opposite of ease. The moment you try to relax, to be present, to stop thinking, you have added another layer of doing on top of what is already here. This is the central paradox, and it cannot be solved by effort — effort is the problem.\n\nSo what do you do? You notice the trying. You feel the impulse to steer, control, improve, arrive — and instead of acting from it, you let it be seen. The seeing is the release. Not because you forced anything, but because you stopped adding.\n\nThis shows up everywhere, not just on the cushion. On a date, at the drum circle, in a hard conversation — the harder you try to produce the right version of yourself, the more it breaks. The good stuff arrives when the trying gets tired and drops. You don't achieve it. It is what's left when the achieving stops.\n\nThe evaporation is the journey. Seeking arrives at non-seeking. This is also what used to be called The Shift: the movement out of narrative possession. The grip loosens. The mind does not always let go; sometimes it gets let go.",
    related: ["being-doing", "checking", "correct-function"],
  },
  {
    slug: "dehydrated-narrative",
    name: "Dehydrated Narrative",
    shortDef: "A story so compressed and automatic it no longer looks like a story — it feels like mood.",
    text:
      "Not every narrative announces itself in full sentences. Some have been run so many times that they have dried out — compressed into a fast, wordless reaction that you experience as a vague mood or a bad feeling. That is a dehydrated narrative.\n\n\"Something is wrong.\" \"I'm behind.\" \"They don't respect me.\" \"I'm going to mess this up.\" These often run beneath language. You don't hear them; you just feel the tug and act on it. To work with one, you have to rehydrate it — slow down and ask what the feeling is actually claiming, in words, so you can look at it instead of obeying it.\n\nA lot of what gets called \"just a mood\" is a dehydrated narrative with the water squeezed out. Add the water back — spell out the story — and suddenly there is something to examine, question, and loosen. Left dehydrated, it just quietly steers the day.",
    related: ["narrative", "saran-wrap", "thought-o-complete", "energy-state"],
  },
  {
    slug: "assaulting-the-moment",
    name: "Assaulting the Moment",
    shortDef: "The constant low-grade war with what's actually here, in favor of what you wish were here.",
    text:
      "Underneath a lot of suffering is a quiet, continuous move: rejecting this moment because you want it to feel different. You want to be more at ease, further along, less awkward, somewhere better. The wanting seems reasonable. But the rejection itself is the discomfort.\n\nIt is a war with your own experience. Not a dramatic war — a subtle one, running most of the time, so familiar you don't notice it. The mind treats the present as substandard, as a problem to be fixed or improved or escaped, and that verdict is the tension you then try to relax away.\n\nThe shift is not forcing yourself to love the moment. It is seeing that the demand for a different moment is the thing hurting, and that this moment — even an uncomfortable one — is not actually a reason to go to war. You can let it be what it is and stop assaulting it. Peace is less something you build and more something you stop attacking.",
    related: ["the-end-of-trying", "checking", "being-doing", "correct-function"],
  },
  {
    slug: "expectation-narrative",
    name: "Expectation Narrative",
    shortDef: "The pre-written script of how a situation is going to go, usually mistaken for realism.",
    text:
      "Before a date, a conversation, a meeting, a confrontation, the mind writes a script: here is how this will go. These expectation narratives feel like sober forecasting, but they are stories — and they tend to run in the direction of your energy state and your dehydrated beliefs.\n\nThe trouble is that the script does not just predict the situation; it shapes it. If you walk in braced for rejection, you act braced, and bracing changes the room. The forecast helps produce the weather. This is one of the quiet ways a narrative becomes self-fulfilling.\n\nWorking with expectation narratives is not about replacing negative scripts with positive ones. It is about noticing that you are holding a script at all — and being willing to walk in without one. Improvisation is possible. You are usually better at it than the script gives you credit for.",
    related: ["thought-o-complete", "narrative", "dehydrated-narrative"],
  },
  {
    slug: "the-fake-contest",
    name: "The Fake Contest",
    shortDef: "Rank and worth treated as a real competition, when the scoreboard is invented.",
    text:
      "Social life often feels like a contest — who is cooler, higher status, more impressive, winning. The feeling is real. The contest is not. It is a game the mind made up and then forgot it made up, complete with a scoreboard that seems built into the world.\n\nThe tell is that the scoreboard keeps changing. Someone is \"alpha\" in one room and ordinary in another. What counts as cool shifts by crowd, by decade, by mood. If the value were real and fixed, it would not flicker like that. It flickers because it is projected — Saran Wrap in the shape of a ranking.\n\nThis does not mean nothing matters or that skill isn't real. It means the felt competition for worth is not a real competition. It is a fake contest the game made. You can decline to play without losing anything real, because there was never a real prize — just crumbs that keep you running. Cool, in the end, is mostly not caring whether you're winning a contest that isn't there.",
    related: ["rank", "scoring-system", "the-dream", "saran-wrap"],
  },
  {
    slug: "locus-of-normal",
    name: "Locus of Normal",
    shortDef: "The felt sense of whose way of being counts as “normal” in the room.",
    text:
      "In every interaction there is a quiet contest over whose reality is the reference point. The person holding the locus of normal doesn't adjust — everyone else adjusts to them. It's like a speaking stick nobody names.\n\nConfidence, stripped down, is this: knowing that your reactions, moment to moment, are normal and not in need of repair or modification, regardless of company. Not that you're always right — but that there is no external “right” you're failing to match. Leaders and unbothered people hold it naturally. Anger seizes it temporarily. Fear hands it away.\n\nMost social anxiety involves surrendering the locus of normal before anyone even asked for it: walking in already assuming the other person's way of seeing, talking, and evaluating is the standard, and yours is the deviation to be managed.\n\nThe repair is not dominating the room. It is noticing the moment you hand the stick over — and realizing it was never theirs to hold.",
    related: ["rank", "the-fake-contest", "frame-dynamics", "checking"],
  },
  {
    slug: "frame-dynamics",
    name: "Frames & Frame Dynamics",
    shortDef: "A frame is your working construction of a situation; when frames meet, there are rules.",
    text:
      "A frame is the perspective you're holding about a situation — what's happening, who's who, what matters. Frames don't sit still when two people meet. They interact, and the interaction follows patterns: adoption (one person quietly takes on the other's construction), opposition (a counter-narrative forms just to resist), contest (the fight over whose frame governs), and — rarely, on good days — genuine merger, where two constructions actually get examined and combined.\n\nMost arguments are not about facts. One person's “I'm just being honest” is the other's “you're being critical.” The fight is over which frame governs, and it's usually settled not by evidence but by certainty. Certainty transfers. The person with the stronger grip on their frame — less doubt, less hesitation — tends to win adoption, whether or not they're right.\n\nLock is a frame's resistance to change, and it grows with emotional charge. A locked frame cannot even see its competitor. That's why nobody has ever been argued out of a fight while still hot.\n\nSeeing frame dynamics doesn't end conflict, but it changes your position in it. You stop mistaking a contest of certainty for a search for truth.",
    related: ["narrative-lock", "locus-of-normal", "narrative", "saran-wrap"],
  },
  {
    slug: "narrative-resonance",
    name: "Narrative Resonance",
    shortDef: "Narratives seek an audience; being understood is your story finding resonance.",
    text:
      "A narrative doesn't want to sit quietly inside you. It wants to exist out loud — to be spoken, shared, agreed with. That's narrative resonance: the discharge and validation that happens when your construction of things lands in another mind and hums there.\n\nThis is most of why people talk. We trade stories not primarily to transfer information but to build shared reality — to have someone else's mind confirm the world we're carrying. It's why being understood feels like relief and being misunderstood feels like a small emergency. It's why people in distress repeat the same account of the same fight to anyone who will listen.\n\nThere's nothing wrong with resonance — connection is partly made of it. The trouble starts when you need it: when every perception has to be validated before it can settle, when you recruit allies for your version of events, when the story can't rest until someone else carries it too.\n\nA settled mind can hold a perception without a co-signer.",
    related: ["narrative", "frame-dynamics", "checking"],
  },
  {
    slug: "thought-melodies",
    name: "Thought-Melodies",
    shortDef: "Thinking unfolds over time like music — and every melody is in a key.",
    text:
      "A thought is not a static object. It unfolds — one piece leading to the next, each bearing a relationship to what came before, the way notes make a melody. Narratives are melodies over time.\n\nAnd like melodies, thinking happens in a key. The same content plays differently in different scales: anxious, prosecutorial, romantic, playful, collapsed. The flavor isn't added to the thought afterward — the thought is composed in it. Anger doesn't just color a thought; anger holds a note and won't release it.\n\nThis is why you can't easily argue with the content of a mood. The words are just the notes; the key is what's actually running. Change the key — through the body, through rest, through the grip loosening — and the same facts compose a different song.\n\nYou don't have to stop the music. You just stop mistaking the key it's in for the truth of the world.",
    related: ["narrative-flavors", "energy-state", "narrative"],
  },
  {
    slug: "performance-mode",
    name: "Performance Mode (The Act)",
    shortDef: "The role you snap into when stakes appear — and the contact it costs you.",
    text:
      "There's a version of you that shows up when something seems to be at stake: the date, the interview, the meeting, the new relationship. It's competent, managed, and slightly scripted. It monitors how it's landing. It performs the person you think you're supposed to be. That's Performance Mode.\n\nIt has costumes for every occasion — boyfriend mode, promoter mode, good-employee mode — and the same tell in all of them: you're acting in line with expectations rather than responding to what's here. The performance is meant to secure connection, and it's precisely what prevents it, because people can't connect to an act. Neither can you. Inside the performance you feel oddly absent from your own life.\n\nThe exit is not performing authenticity — that's just a subtler costume. It's noticing the moment the act switches on: the small bracing, the script loading. You don't fight it. You just stop feeding it lines, and let whoever you are when nobody needs managing walk in instead.\n\nThat person was there the whole time. It's the one your friends know.",
    related: ["checking", "being-doing", "the-end-of-trying", "assaulting-the-moment"],
  },
  {
    slug: "ltbatarn",
    name: "LTBATARN",
    shortDef: "Letting Things Be As They Already Are Right Now — the whole practice in one ugly acronym.",
    text:
      "Letting things be as they already are right now. It's the technique that isn't a technique — because a technique is a plan for getting somewhere, and this is the end of going anywhere.\n\nYou can't strategize your way to a place of no strategy. That's the trap in most self-improvement: using the mind to escape the mind. It's like hiring a rat to consult on your rat problem, like arranging desks while you're knocking them over. Every clever new approach is more of the same motion.\n\nSo the move is surrender — not dramatic collapse, just the quiet cessation of wanting this moment to be different. Not acceptance-as-a-tactic, which is still wanting. Actually letting the moment be what it is: unclear, mediocre, tense, fine, whatever it is. The mind, with nothing left to fix, begins to settle on its own.\n\nEverything in NT funnels here. See the wrap, name the mode, notice the checking — and then let things be as they already are right now. That's the whole thing.",
    related: ["the-end-of-trying", "assaulting-the-moment", "being-doing"],
  },
  {
    slug: "storypoints",
    name: "Storypoints",
    shortDef: "The specific facts a state selects, emphasizes, and dims to build its story.",
    text:
      "Storypoints are the raw material a state has to work with — the actual, neutral facts available about yourself or a situation. A confident state and a collapsed state aren't looking at different facts. They're looking at the same nine storypoints and lighting up a different four.\n\nThis is why arguing yourself out of a bad story with more facts often doesn't work: the facts you'd cite were already available, and the state simply wasn't selecting them. Changing the story isn't about finding new evidence. It's about noticing which storypoints are lit right now, and that a different, equally true set is sitting right next to them, dark.",
    related: ["narrative", "scoring-system", "expectation-narrative"],
  },
];

export const conceptBySlug = (slug: string) => concepts.find((c) => c.slug === slug);
