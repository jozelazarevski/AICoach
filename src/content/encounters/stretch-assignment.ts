import type { Encounter } from "../../game/types";

export const stretchAssignment: Encounter = {
  id: "stretch-assignment",
  title: "The Stretch",
  difficulty: "pointed",
  opponent: {
    name: "The Group VP",
    role: "A senior leader offering you a high-visibility project",
    archetype: "Skeptical Principal",
    blurb: "The project sounds great. Taking it without conditions will gut your current work. Negotiate the terms before you say yes.",
  },
  scene:
    "A Group VP has asked you to take on a high-visibility cross-functional initiative that runs for six months. It is the kind of thing that gets people promoted. It is also the kind of thing that leaves your current team without a leader at a critical moment, since you are six weeks from a major delivery. She is waiting for your answer. The wrong answer here is not a no, and it is not an unconditioned yes.",
  objective:
    "Accept the assignment with explicit conditions that protect your current delivery, without looking reluctant or like you need to be managed.",
  startStanding: 55,
  startMomentum: 25,
  stages: [
    {
      id: "s1",
      prompt:
        "I would not be asking if I did not think you could do it. I have watched you handle complicated situations and you have good instincts for the political side of these things. I want you on this.",
      choices: [
        {
          id: "s1a",
          tag: "Affirm and surface the tension",
          line:
            "I want to be on it. I also want to be honest with you about the one timing risk I am looking at, so we can design this in a way that does not create a problem on either side.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "What is the timing risk.",
          principle:
            "Affirming the ask before surfacing the constraint signals enthusiasm without sycophancy. It also makes the constraint sound like honest planning rather than reluctance.",
          keywords: ["want to", "honest", "timing risk", "design", "both sides", "one thing", "affirm first"],
        },
        {
          id: "s1b",
          tag: "Say yes immediately",
          line:
            "I am in. When do we start.",
          points: -1,
          standing: 2,
          momentum: -4,
          reaction:
            "Good. The kickoff is next Monday. I will send you the briefing document this afternoon.",
          principle:
            "An unconditioned yes feels like a win but transfers the risk to you without protecting your current delivery. You have now said yes to two full-time jobs at once.",
          keywords: ["yes", "in", "when do we start", "ready", "count me in", "absolutely", "I am in"],
        },
        {
          id: "s1c",
          tag: "Ask about the scope",
          line:
            "Before I say yes, can you help me understand what the weekly time commitment looks like and who else is on the team.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "I am thinking two to three days a week, plus a few steering sessions. The team is still being formed.",
          principle:
            "Getting the scope before you commit is smart, but asking questions before expressing enthusiasm can read as reluctance to a VP who expected a different opening.",
          keywords: ["scope", "time commitment", "weekly", "who else", "understand first", "before I say yes", "how much"],
        },
        {
          id: "s1d",
          tag: "Name what you bring",
          line:
            "I am glad you thought of me for this. The cross-functional piece is exactly where I think I add something different. I want to make it work, and I have one thing I need to think through with you.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "Go ahead.",
          principle:
            "Naming what you bring to the specific challenge demonstrates independent thinking about fit, not just gratitude. It also earns a moment of honest planning rather than just receiving instructions.",
          keywords: ["what I bring", "add something", "cross-functional", "glad you thought", "make it work", "one thing"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Is that a yes or are you still thinking.",
        principle: "A VP offering a stretch assignment expects enthusiasm first. Lead with the yes, then shape the terms.",
      },
    },
    {
      id: "s2",
      prompt:
        "Tell me about the timing risk. I want to understand what you are worried about.",
      choices: [
        {
          id: "s2a",
          tag: "Name the specific date",
          line:
            "My team ships in six weeks. That is a delivery I own personally, not just as a manager. If I take on a significant load before that date, one of the two things will be done at eighty percent. I want to propose a start date that protects both.",
          points: 6,
          standing: 11,
          momentum: 15,
          reaction:
            "When does the delivery close, exactly.",
          principle:
            "Naming a specific date and a specific risk shows command of your own situation. It makes the ask feel like logistics, not negotiation, which is the frame a VP accepts more easily.",
          keywords: ["six weeks", "specific date", "delivery", "own personally", "eighty percent", "start date", "protect both", "date"],
        },
        {
          id: "s2b",
          tag: "Propose to backfill first",
          line:
            "My concern is bandwidth. Could we bring in a backfill for my current role before I start, so there is not a gap.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction:
            "A backfill takes months. If you need a backfill to take this on, maybe it is not the right moment for you.",
          principle:
            "Asking for a backfill as a condition signals that you cannot hold two things at once. A VP offering a stretch assignment expects you to be a force multiplier, not a person who creates new headcount asks.",
          keywords: ["backfill", "bandwidth", "my current role", "gap", "cover", "replacement", "someone else"],
        },
        {
          id: "s2c",
          tag: "Propose a limited start",
          line:
            "What if I joined in a limited capacity for the first six weeks, focused only on the design and stakeholder alignment work, and stepped into full leadership after my delivery lands.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That could work. What does limited capacity look like in hours per week.",
          principle:
            "A phased entry gives the VP what she wants, which is you on the project, while protecting your current delivery. It also shows you are thinking about the project's needs, not just your own constraints.",
          keywords: ["limited capacity", "first six weeks", "design phase", "stakeholder alignment", "after delivery", "phased", "step in later"],
        },
        {
          id: "s2d",
          tag: "Frame it as her risk too",
          line:
            "Here is my honest take. If I take this on right now without conditions, there is a real chance my current delivery slips. That creates a problem for you too, because that delivery has visibility. I would rather design this to avoid that outcome.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "Fair point. What are you proposing.",
          principle:
            "Framing the risk as shared gives the VP a reason to want to solve the timing problem. It converts a personal constraint into a mutual interest.",
          keywords: ["her risk", "slips", "problem for you", "visibility", "honest", "design to avoid", "shared risk"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "I need you to be more concrete. What exactly are you asking for.",
        principle: "Name the specific date and the specific risk. A VP cannot negotiate against a vague constraint.",
      },
    },
    {
      id: "s3",
      prompt:
        "I hear you on the delivery. Here is the reality: the initiative has a kickoff that involves external partners, and it is already on the calendar. I need a face in the room on Monday.",
      choices: [
        {
          id: "s3a",
          tag: "Accept Monday, name the limit",
          line:
            "I can be in the room Monday. I want to be honest: I will be observing and building context rather than leading in that session, because I have a team call that morning on the delivery. After Monday I will have a clearer picture of what I can take on at full capacity.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is fine for the kickoff. I just needed a face from our side. Be there and take notes.",
          principle:
            "Accepting the hard constraint while naming your actual status prevents you from entering the room with more authority than you can back up. Showing up with honest limits beats showing up and underdelivering.",
          keywords: ["Monday", "in the room", "observing", "context", "honest", "limit", "that morning", "full capacity later"],
        },
        {
          id: "s3b",
          tag: "Ask who else can go",
          line:
            "Is there someone else on the initiative who could cover that session while I close out my delivery. I could brief them beforehand.",
          points: -1,
          standing: -6,
          momentum: -4,
          reaction:
            "I want you there, not a proxy. If you cannot make Monday work, I need to know that now.",
          principle:
            "Proposing a proxy to a VP who specifically wants you in the room signals that you are already trying to reduce your commitment before it starts.",
          keywords: ["someone else", "proxy", "cover", "brief them", "delegate", "who else", "instead of me"],
        },
        {
          id: "s3c",
          tag: "Renegotiate the frame",
          line:
            "If Monday is a hard date, let me rethink the framing. What if I treat the first two weeks as an onboarding and listening mode, not a leading mode. I will be fully engaged by week three.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "Week three is tight but I can work with that if you are fully in by then. What does fully in mean for you.",
          principle:
            "Proposing a specific transition point converts a hard constraint into a manageable plan. VPs can sell a ramp. They cannot sell an absence.",
          keywords: ["onboarding", "listening mode", "week three", "ramp", "fully in", "not leading yet", "first two weeks"],
        },
        {
          id: "s3d",
          tag: "Commit and trade",
          line:
            "I will be there Monday. In exchange, I need something from you: one conversation with my current team's stakeholders to explain the context, so they do not feel like I am abandoning the delivery.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "I can do that. Who do I need to talk to.",
          principle:
            "Accepting the hard constraint and naming a specific support ask is a clean trade. You commit, they cover your flank. It is a partnership rather than a negotiation.",
          keywords: ["be there", "in exchange", "one conversation", "stakeholders", "current team", "cover", "trade", "context"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a straight answer on Monday. Can you be there or not.",
        principle: "When a VP names a hard constraint, work within it. Shape the terms, not the date.",
      },
    },
    {
      id: "s4",
      prompt:
        "Good. So you will be in from Monday. What do you need from me to set yourself up to succeed on this.",
      choices: [
        {
          id: "s4a",
          tag: "Ask for one specific thing",
          line:
            "One thing: an explicit signal to the other initiative leaders that I have your backing. Not in an email, in the room at kickoff. That changes the dynamic for everything that follows.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "I can do that. I will open the Monday session with an introduction that makes clear you are running point for our group.",
          principle:
            "Asking for a public endorsement at the kickoff is specific, low-cost for the VP, and has an outsized effect on how peers on the initiative receive you. One sentence from her is worth weeks of positioning.",
          keywords: ["one thing", "explicit signal", "backing", "in the room", "kickoff", "not email", "run point", "introduction"],
        },
        {
          id: "s4b",
          tag: "Ask for headcount",
          line:
            "I would like a dedicated project manager and potentially an additional analyst to support the work.",
          points: -2,
          standing: -9,
          momentum: -4,
          reaction:
            "We do not have those resources budgeted. This is a stretch assignment, not a program build. Can you work with what is there.",
          principle:
            "Asking for headcount when accepting a stretch assignment reads as not understanding what a stretch assignment is. The whole point is doing more with the same.",
          keywords: ["headcount", "project manager", "analyst", "resources", "dedicated", "staff", "support", "budget"],
        },
        {
          id: "s4c",
          tag: "Name the political risk",
          line:
            "I need to know what to do when the other stakeholders push back on decisions I make. Is there a governance structure, or are you the escalation path.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Come to me first if something is stuck. But I do not want to be in every decision. That is why I am picking someone I trust.",
          principle:
            "Asking about escalation paths before you start shows you understand the political terrain. It also surfaces whether the VP has your back, which is the most important thing to know early.",
          keywords: ["political", "push back", "governance", "escalation", "stakeholders", "stuck", "who decides", "structure"],
        },
        {
          id: "s4d",
          tag: "Name nothing needed",
          line:
            "I think I have what I need. I will figure out what I do not know as I go.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "Alright. Let me know if that changes.",
          principle:
            "Declining to name what you need reads as either fearless or unaware. In a new political environment, the people who do not ask for what they need tend not to get it.",
          keywords: ["nothing", "figure it out", "fine", "as I go", "no asks", "I am good", "will manage"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Tell me one concrete thing and I will see what I can do.",
        principle: "A VP asking what you need is not a pleasantry. Name the one thing that actually changes your odds.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 72, standingAtLeast: 55 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You are on the initiative with a clear ramp, a public endorsement at kickoff, and your delivery protected. The VP now sees you as someone who handles complexity without flinching.",
      lessons: [
        "Lead with enthusiasm before surfacing constraints. A VP interprets reluctance first and logic second.",
        "A phased entry or a limited-capacity start is almost always acceptable. Asking for a backfill is not.",
        "The one thing to ask for in a new high-visibility role is public endorsement at the kickoff. It is free for the VP and changes everything.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You are on the initiative but the terms are not settled. You took on two full jobs without protecting either one clearly.",
      lessons: [
        "Accepting without conditions felt like commitment but set up a failure state.",
        "Name the specific date and the specific risk. A VP cannot negotiate against a vague constraint.",
        "When a VP says 'what do you need,' she is asking you to be specific. One concrete ask is the right answer.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "She reconsiders and names someone else, noting that you seemed ambivalent and created problems before you even started.",
      lessons: [
        "Asking for a backfill signals you cannot hold two things at once. That is the opposite of what a stretch assignment tests.",
        "Proposing a proxy for the kickoff signals you are already managing your commitment down before it begins.",
        "Enthusiasm first, constraints second. The VP is offering you something she does not have to offer.",
      ],
    },
  ],
};
