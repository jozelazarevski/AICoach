import type { Encounter } from "../../game/types";

export const ambushMeeting: Encounter = {
  id: "ambush-meeting",
  title: "The Ambush",
  difficulty: "adversarial",
  opponent: {
    name: "The Division VP",
    role: "Your skip-level, with full authority to cancel your project",
    archetype: "Skeptical Principal",
    blurb: "You thought this was a status update. It is a kill review. Hold the room without looking rattled.",
  },
  scene:
    "You accepted a routine status update with the Division VP, expecting to walk through slides. You walk in to find three additional leaders you did not invite. The VP opens with: 'I have been hearing some concerns.' There are no slides on the screen. Nothing you prepared is relevant. You have about twenty minutes.",
  objective:
    "Survive the ambush, surface the actual concerns, and leave with the project intact and a clear next step.",
  startStanding: 38,
  startMomentum: 15,
  stages: [
    {
      id: "s1",
      prompt:
        "I have been hearing some concerns about this project's direction. Before we go through any slides, I want to open the floor. What is the state of play, from your honest view.",
      choices: [
        {
          id: "s1a",
          tag: "Name the shift",
          line:
            "I want to make sure I am answering the right question. This feels different from a status update, and I would rather address what is actually on the table. What specific concerns have come in, and from whom.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "Fair. The concerns are around timeline slippage and whether the original scope is still the right bet. A few people feel like the team has been running without enough oversight.",
          principle:
            "Naming the shift in the room before defending anything signals confidence and redirects you to the real fight, not the one you prepared for.",
          keywords: ["name", "different", "actual", "specific concerns", "what is on the table", "right question", "from whom"],
        },
        {
          id: "s1b",
          tag: "Launch the defense",
          line:
            "I am glad you asked. The project is tracking well. We are two weeks behind on the secondary deliverable but the core architecture is solid and the team is moving fast. I can walk through the numbers.",
          points: -2,
          standing: -10,
          momentum: -3,
          reaction:
            "I did not ask about the secondary deliverable. And two weeks behind is not nothing. Who else wants to weigh in.",
          principle:
            "Defending before you know the charge fills the room with your answers to the wrong questions and signals you are scared.",
          keywords: ["tracking", "numbers", "solid", "walk through", "moving fast", "on track", "behind schedule"],
        },
        {
          id: "s1c",
          tag: "Buy time cleanly",
          line:
            "Before I answer that, I want to understand who is in the room and what each person's stake is in this project. Can you introduce the group.",
          points: 3,
          standing: 6,
          momentum: 7,
          reaction:
            "This is Priya from Finance, David from the product side, and Keisha who oversees platform risk. They all have downstream exposure to your work.",
          principle:
            "Knowing the room before you talk prevents you from defending against the wrong person's concern. One extra minute of recon changes the entire conversation.",
          keywords: ["who is here", "stake", "introduce", "understand the room", "before I answer", "downstream"],
        },
        {
          id: "s1d",
          tag: "Concede forward",
          line:
            "Honestly, there are things I am not happy with on this project too. I would rather put them on the table than have them surface somewhere else.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "That is a more useful place to start. Tell me what you are not happy with.",
          principle:
            "Naming your own concerns before others can name them resets you as the honest broker, not the defender. It changes the dynamic from prosecution to diagnosis.",
          keywords: ["not happy", "honest", "put on the table", "surface", "concerned myself", "candid", "tell you"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -4,
        momentum: -1,
        reaction: "That does not really tell me anything. I need you to be more direct.",
        principle: "In an ambush, the first move is to surface the real accusation before defending anything.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "David has a point I want you to address. David, go ahead.",
        ifStandingBelow: [
          34,
          "I am going to let David raise his concern directly. David, tell them what you told me last week.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Redirect to the VP",
          line:
            "David, I want to hear you out. And then I would like to address it to the group, not just respond one on one, so everyone is working from the same information.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That works. David, go ahead, and then we will get a response to the room.",
          principle:
            "Anchoring your response to the full room prevents a side conversation that the VP cannot follow and keeps you in control of your own narrative.",
          keywords: ["hear you out", "address the group", "same information", "respond to room", "together", "everyone"],
        },
        {
          id: "s2b",
          tag: "Address David directly",
          line:
            "David, I appreciate you raising this. What exactly is the concern from your side.",
          points: 1,
          standing: 0,
          momentum: 2,
          reaction:
            "My concern is that your team has been making architectural decisions that affect the platform without looping in platform risk. That is on me to flag.",
          principle:
            "Engaging a peer directly in a room owned by your VP hands the conversation to them. It is not wrong, but it cedes the frame.",
          keywords: ["appreciate", "raise", "your side", "what exactly", "your concern", "david"],
        },
        {
          id: "s2c",
          tag: "Pre-answer it",
          line:
            "I think I know what the concern is. If it is about the platform architecture decisions, I want to address that before David goes on, because I have context that changes the picture.",
          points: -1,
          standing: -6,
          momentum: -2,
          reaction:
            "Let David speak. You do not know what I am going to say.",
          principle:
            "Cutting off someone the VP invited to speak looks defensive and makes the VP feel overridden in his own room.",
          keywords: ["I know what", "before you say", "pre-answer", "I have context", "address first", "let me explain"],
        },
        {
          id: "s2d",
          tag: "Take notes visibly",
          line:
            "I want to make sure I get this right. Let me write down your concern as you say it, so I can address each one specifically rather than in general.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction:
            "Good. David, go ahead.",
          principle:
            "Taking notes in a hostile room slows the pace, signals you are not rattled, and commits you to a structured response instead of a panicked one.",
          keywords: ["write down", "notes", "get this right", "specifically", "each one", "careful", "address"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "I need you to be present, not managing the room. Let David speak.",
        principle: "In a room that has been stacked against you, the goal is to slow down, not speed up.",
      },
    },
    {
      id: "s3",
      prompt:
        "Here is the question I want you to sit with. If we killed this project today and redirected the resources to the core platform, what would we actually lose. Take your time.",
      choices: [
        {
          id: "s3a",
          tag: "Engage the scenario",
          line:
            "That is a fair question and I want to answer it honestly. We would lose six months of architecture work and the customer commitments that depend on it. More importantly, the resources would not realistically redeploy to core platform in less than a quarter. So the trade is not as clean as it sounds.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "The customer commitment piece is the one I did not have a clean answer to. Say more about that.",
          principle:
            "Engaging a kill-scenario question honestly and with specifics reframes you as an analyst, not a project owner with an ego stake. It earns the VP's trust faster than defense would.",
          keywords: ["honest", "lose", "customer commitments", "architecture work", "trade", "not clean", "realistically", "quarter"],
        },
        {
          id: "s3b",
          tag: "Object to the premise",
          line:
            "Killing the project is not the right frame. We are six months in and the option value here is significant. Walking away now means we paid for learning we cannot apply.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "I did not say we were killing it. I asked you what we would lose. You are not answering the question.",
          principle:
            "Refusing to engage a hypothetical signals to a skeptical principal that you cannot reason independently from your own position. They interpret it as bias.",
          keywords: ["not the right frame", "object", "option value", "six months in", "walking away", "sunk cost"],
        },
        {
          id: "s3c",
          tag: "Reframe as a tradeoff",
          line:
            "What we would lose depends on what we consider the core platform's most urgent gap. If I knew that, I could tell you whether this project fills it or competes with it.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction:
            "The urgent gap is on the data pipeline side. That is separate from what your team is working on.",
          principle:
            "Linking the kill scenario to the VP's actual priority surfaces whether the projects are in competition or parallel, which changes the whole argument.",
          keywords: ["tradeoff", "depends", "core platform", "urgent gap", "fills", "competes", "if I knew"],
        },
        {
          id: "s3d",
          tag: "Name the irreversible cost",
          line:
            "The one thing we cannot recover is the team. If we scatter them now, that configuration of people does not come back together. That is the real cost of a kill decision.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "That is a real consideration. I have not been thinking about the team dimension.",
          principle:
            "Irreversible costs are the ones that move skeptical principals because they cannot be undone with budget. Naming them shifts the calculus from finance to strategy.",
          keywords: ["irreversible", "team", "scatter", "people", "configuration", "real cost", "cannot recover", "personnel"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "You are avoiding the question. I need a direct answer, not a pivot.",
        principle: "A kill-scenario question from a VP is a test of your independent judgment. Engaging it directly is the only passing answer.",
      },
    },
    {
      id: "s4",
      prompt:
        "Alright. I am not ready to make a call today. But I want to see something specific before our next meeting. What are you proposing.",
      choices: [
        {
          id: "s4a",
          tag: "One crisp gate",
          line:
            "I will bring you a two-page memo by Thursday. It covers the customer dependency map, the redeployment cost if we kill it, and a gated thirty-day plan so you can decide at the next milestone with real data, not a snapshot from today.",
          points: 6,
          standing: 10,
          momentum: 16,
          reaction:
            "Thursday works. Bring the customer map and the gated plan. I will read it before we speak.",
          principle:
            "Giving a skeptical principal a specific artifact with a date and a decision trigger converts an open threat into a structured review. They need a path to close the loop, not more reassurance.",
          keywords: ["memo", "thursday", "customer map", "gated", "thirty days", "milestone", "data", "specific", "two page"],
        },
        {
          id: "s4b",
          tag: "Ask for more time",
          line:
            "I need two weeks to put together a thorough picture. I do not want to come back with something half-finished.",
          points: -1,
          standing: -5,
          momentum: -4,
          reaction:
            "Two weeks is too long. If you do not have a picture of your own project in your head right now, that is itself a problem.",
          principle:
            "Asking for two weeks in a kill review signals you lack command of your own work. Four to five days is the credible window.",
          keywords: ["two weeks", "time", "thorough", "complete picture", "not half-finished", "preparation", "more time"],
        },
        {
          id: "s4c",
          tag: "Propose a decision brief",
          line:
            "I will draft a decision brief. It will lay out the three paths, the cost and risk of each, and a recommended one. You get to make the call with the full picture.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "I like the format. Make sure one of the three paths is an honest kill scenario with a real cost figure.",
          principle:
            "Offering a decision brief rather than a status update reframes you as the analyst and the VP as the decider. It removes the appearance of advocacy.",
          keywords: ["decision brief", "three paths", "cost", "risk", "recommended", "you decide", "full picture", "options"],
        },
        {
          id: "s4d",
          tag: "Propose a live gate",
          line:
            "What if we set a thirty-day gate right now, with a named metric. If the metric is not hit, I will recommend the kill myself. That removes the burden from you.",
          points: 5,
          standing: 9,
          momentum: 14,
          reaction:
            "What is the metric.",
          principle:
            "Offering to recommend the kill yourself if a named metric is missed turns you from a project defender into a fiduciary. That is the framing a skeptical principal trusts.",
          keywords: ["gate", "metric", "thirty days", "I will recommend", "named", "remove burden", "myself", "objective"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "That is not specific enough. I need to know what you will bring and by when.",
        principle: "When a skeptical principal says 'what are you proposing,' the only answer is a specific artifact and a date.",
      },
    },
    {
      id: "s5",
      prompt:
        "One more thing before we break. Keisha raised a concern about oversight. I want to hear your response to that directly.",
      choices: [
        {
          id: "s5a",
          tag: "Own the gap",
          line:
            "She is right that the oversight has not been tight enough. That is on me, not the team. I will add a biweekly checkpoint with her function as part of the thirty-day plan.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "I appreciate that. Keisha, does that address your concern.",
          principle:
            "Owning a legitimate process gap cleanly, without qualifying it, signals to the room that you manage upward honestly. It also closes the item before it can grow.",
          keywords: ["on me", "own it", "right", "add checkpoint", "her function", "biweekly", "address", "tight enough"],
        },
        {
          id: "s5b",
          tag: "Explain the process",
          line:
            "We have weekly status updates, a documented risk log, and a decision record that goes to the stakeholder group. The oversight is there, it just may not be visible to Keisha's team.",
          points: -1,
          standing: -7,
          momentum: -3,
          reaction:
            "If it is not visible, it is not working. That is the point.",
          principle:
            "Citing your own oversight process in response to an oversight concern reads as defensive and proves nothing. Visibility is the only metric that matters here.",
          keywords: ["weekly", "status updates", "risk log", "documented", "stakeholder", "process exists", "there", "visible"],
        },
        {
          id: "s5c",
          tag: "Push back on the framing",
          line:
            "I would want to understand what oversight means in this context before I respond. My team has been operating within the charter we agreed to at kickoff.",
          points: -2,
          standing: -10,
          momentum: -5,
          reaction:
            "I am not asking about the charter. I am asking about what Keisha sees from where she sits. Do not argue the framing, answer the concern.",
          principle:
            "Defending your charter against an oversight concern makes you look like a bureaucrat, not a leader. The charter is not the room's concern, trust is.",
          keywords: ["what does oversight mean", "charter", "agreed", "kickoff", "understand first", "framing", "push back"],
        },
        {
          id: "s5d",
          tag: "Invite her in",
          line:
            "Keisha, what would meaningful oversight look like from your position. I would rather design it around what you actually need than what I think you need.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "I want to be in the loop on any decision that affects platform data contracts. A two-day heads up before you finalize anything in that space.",
          principle:
            "Asking the skeptic what they need, rather than defending what you have, converts a critic into a co-designer. It also surfaces whether the ask is reasonable, which it usually is.",
          keywords: ["what would you need", "meaningful", "your position", "design around", "what you need", "invite", "keisha"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "That does not address Keisha's specific concern. Try again.",
        principle: "When a VP routes a specific concern to you, address it directly. Anything else reads as avoidance.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 75, standingAtLeast: 48 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The VP closes with a specific deliverable, a date, and a thirty-day gate. Keisha is now a stakeholder, not an adversary. The project lives.",
      lessons: [
        "Name the ambush before defending anything. Surfacing the real question earns trust that defense never would.",
        "Engage kill-scenario questions honestly and with specifics. A VP tests whether you can reason without ego in the room.",
        "When a skeptic raises a legitimate concern, invite them into the solution. It turns an obstacle into a co-designer.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The project is on a short stay. The VP wants a memo but no gate was set. The oversight concern is unresolved. You are still at risk.",
      lessons: [
        "A memo without a decision trigger gives the VP a reason to stall rather than decide.",
        "You survived the ambush but did not close it. A partial result here means a second ambush is likely.",
        "The oversight critic became an open wound. Name a specific fix before leaving any room.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The VP ends the meeting without a commitment and schedules a follow-up with the finance leader only. You were not invited. The project is on informal hold.",
      lessons: [
        "Defending before you know the charge fills the room with answers to the wrong questions.",
        "Blocking a kill-scenario question signals to a skeptical principal that you cannot reason independently from your stake.",
        "The oversight concern was the real weapon in the room. Dismissing it hands it back to your opponents.",
      ],
    },
  ],
};
