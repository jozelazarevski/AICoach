import type { Encounter } from "../../game/types";

export const passiveVeto: Encounter = {
  id: "passive-veto",
  title: "The Ghost",
  difficulty: "pointed",
  opponent: {
    name: "The Peer",
    role: "A cross-functional counterpart who controls a sign-off you need",
    archetype: "Territorial Counterpart",
    blurb: "He has not blocked you. He has simply stopped responding. Get the sign-off without making it a confrontation.",
  },
  scene:
    "Your initiative requires a formal sign-off from a peer leader whose team has downstream exposure. For six weeks you have sent calendar invites, two-pagers, and follow-up notes. He has attended none of them and replied to none of them. You finally caught him in the hall and he agreed to a thirty-minute meeting. He is here now, but his body language says he would rather be anywhere else.",
  objective:
    "Get a specific sign-off or a named alternative action before you leave the room, without triggering a direct confrontation that gives him a reason to escalate.",
  startStanding: 40,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "Look, I have been heads down on the migration. I am not trying to be difficult, I just have not had the bandwidth to give your proposal the attention it deserves.",
      choices: [
        {
          id: "s1a",
          tag: "Accept the frame",
          line:
            "I hear you. That is actually why I kept this to thirty minutes. I am not asking you to study it, just to tell me what would make this easy enough for you to clear.",
          points: 5,
          standing: 12,
          momentum: 14,
          reaction:
            "That is a more manageable ask. What specifically do you need me to clear.",
          principle:
            "Accepting his bandwidth frame without pushing back lowers his guard. The question then becomes what he needs to say yes, not whether he will.",
          keywords: ["hear you", "easy", "what would", "clear", "bandwidth", "manageable", "thirty minutes", "not study"],
        },
        {
          id: "s1b",
          tag: "Name the pattern",
          line:
            "Six weeks of invites and follow-ups is more than bandwidth. I want to understand what the actual concern is so we can address it, because the silence is creating a deadline problem.",
          points: -2,
          standing: -10,
          momentum: -3,
          reaction:
            "I told you, I have been heads down. If you came here to accuse me of something, this is going to be a short meeting.",
          principle:
            "Naming the blocking pattern directly in the opening move puts him on trial. Even when you are right, it gives him an honorable exit from the conversation.",
          keywords: ["six weeks", "pattern", "silence", "actual concern", "accuse", "blocking", "name", "follow-ups"],
        },
        {
          id: "s1c",
          tag: "Give him an easy out",
          line:
            "No problem. Tell me who on your team can give me the technical input I need and I will take it from there. I just need a name.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "That could work. Let me think about who makes sense.",
          principle:
            "Offering to work with a delegate removes his exposure and gives him a face-saving path to move out of your way without a direct commitment.",
          keywords: ["delegate", "your team", "who", "name", "technical input", "from there", "easy", "alternative"],
        },
        {
          id: "s1d",
          tag: "Thank him for showing up",
          line:
            "I appreciate you making the time. I know the migration is eating everything. I am going to make this as fast as possible, and I need one thing from you before I do.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Alright. What is the one thing.",
          principle:
            "Acknowledging his real constraint before making an ask signals you are not going to waste his time. It buys the moment of genuine attention you need.",
          keywords: ["appreciate", "making time", "migration", "fast", "one thing", "thank", "know it is hard"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "Sure. What did you want to cover.",
        principle: "Do not burn the opening on pleasantries. Name what you need in the first two sentences.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "Honestly, my concern is the timeline. You are asking me to sign off on something that touches my team's systems, and I have not had time to pressure-test it.",
        ifStandingBelow: [
          36,
          "And between us, I have already mentioned my concerns to Shenaz. I was not trying to escalate, but she asked me directly and I was honest.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Use the concern",
          line:
            "Then let us pressure-test it right now. What is the specific thing you are most worried about. Tell me the worst case and I will either explain why it cannot happen or I will add a safeguard.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "The worst case is that your migration overwrites the reconciliation table before my team has a backup. That is a data loss scenario for us.",
          principle:
            "Turning his timeline concern into an on-the-spot pressure test changes the dynamic from delay to diagnosis. Most concerns either dissolve or become fixable in ten minutes.",
          keywords: ["pressure test", "right now", "specific", "worst case", "safeguard", "explain", "cannot happen", "concern"],
        },
        {
          id: "s2b",
          tag: "Dismiss the concern",
          line:
            "The timeline risk is low. We have a full rollback plan and this has been reviewed by the platform team. I would not be asking for the sign-off if it were not safe.",
          points: -2,
          standing: -9,
          momentum: -3,
          reaction:
            "I am glad you think it is low. I am the one who has to explain it to my team if something goes wrong. That is my call to make, not yours.",
          principle:
            "Telling a territorial counterpart that his concern is overblown confirms his read that you do not respect his exposure. It hardens every position he holds.",
          keywords: ["low risk", "rollback", "reviewed", "safe", "platform team", "I would not", "not a problem", "dismiss"],
        },
        {
          id: "s2c",
          tag: "Offer a smaller scope",
          line:
            "What if I scoped the first phase to exclude your systems entirely, got your sign-off on phase one, and then we do a dedicated technical session before phase two starts.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is more palatable. If phase one does not touch us, I can clear that without the same level of scrutiny.",
          principle:
            "Reducing scope reduces the perceived risk and the required trust. A smaller sign-off that you get is worth more than a full sign-off that you do not.",
          keywords: ["smaller scope", "exclude", "phase one", "phase two", "dedicated session", "palatable", "reduce", "separate"],
        },
        {
          id: "s2d",
          tag: "Name the cost of delay",
          line:
            "I want to be transparent with you. The longer this stays unsigned, the more it looks like a blocker rather than a concern. That creates pressure from above that neither of us wants.",
          points: 2,
          standing: -2,
          momentum: 5,
          reaction:
            "Is that a threat about escalating.",
          principle:
            "Hinting at escalation to a territorial counterpart reads as a threat even when framed neutrally. Use it only if you have tried everything else and only if you mean it.",
          keywords: ["transparent", "pressure", "looks like", "blocker", "escalation", "from above", "longer", "neither of us"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "I still have not heard anything that makes me more comfortable moving on this.",
        principle: "When his stated concern is timeline, give him a way to test the risk himself rather than reassuring him from your side.",
      },
    },
    {
      id: "s3",
      prompt:
        "I already told my team we were going to loop in before any decision on the data layer. If I sign off now, I look like I bypassed my own people.",
      choices: [
        {
          id: "s3a",
          tag: "Give him the loop",
          line:
            "Then let them in. Schedule thirty minutes with the relevant people on your team and I will walk them through exactly what touches the data layer. If they raise something I cannot answer, I will not ask you to sign off until it is resolved.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is fair. Set it up. Get my EA and we will find twenty minutes this week.",
          principle:
            "Making the consultation real and on his terms removes the face-saving problem. He can tell his team he did loop them in, because he did. You get the meeting, and if the meeting goes well, you get the sign-off.",
          keywords: ["loop them in", "his team", "walk through", "thirty minutes", "resolve first", "set it up", "schedule", "their concerns"],
        },
        {
          id: "s3b",
          tag: "Point out the delay",
          line:
            "You have had six weeks to loop your team in. At some point that window closes, and the decision gets made around you rather than with you.",
          points: -3,
          standing: -15,
          momentum: -4,
          reaction:
            "I do not respond well to that kind of framing. We are done here.",
          principle:
            "Pointing out that he missed his window is accurate and almost guaranteed to end the conversation. Territorial people need a face-saving path, not a verdict.",
          keywords: ["six weeks", "window closes", "around you", "too late", "missed", "deadline", "around him", "point out"],
        },
        {
          id: "s3c",
          tag: "Offer the narrative",
          line:
            "What if the story to your team was that you required the walkthrough as a condition of sign-off, and then they reviewed it and cleared it. You can frame this as you enforcing the process.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "I could work with that framing. It has to be a real walkthrough though, not a rubber stamp.",
          principle:
            "Offering a territorial counterpart a narrative that makes them look like they enforced the process rather than delayed it removes the face problem entirely.",
          keywords: ["narrative", "frame", "enforcing process", "required walkthrough", "condition", "story to your team", "your call", "you required"],
        },
        {
          id: "s3d",
          tag: "Ask who specifically",
          line:
            "Who on your team specifically needs to be in the loop. Give me a name and I will set up the session directly with them.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction:
            "Pradeep owns the data contracts. Start with him.",
          principle:
            "Getting a specific name transforms a vague process concern into a trackable action. Once a name is named, the delay becomes attributable to a person, not a principle.",
          keywords: ["who specifically", "name", "direct", "set up", "session", "person", "who", "contact"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "I need my people involved before I put my name on anything.",
        principle: "When face is the real issue, design a path where he looks like he enforced the process, not like he caved.",
      },
    },
    {
      id: "s4",
      prompt:
        "Alright. Walk me through the data layer piece specifically. If I can see it right now, maybe we do not need a whole separate session.",
      choices: [
        {
          id: "s4a",
          tag: "Walk it plainly",
          line:
            "The data layer change is: we add a read-only mirror of the reconciliation table before the migration runs. Nothing gets deleted until the mirror is confirmed. If anything fails, the original is untouched. Your team can validate the mirror before we proceed.",
          points: 6,
          standing: 10,
          momentum: 16,
          reaction:
            "That is actually a sensible safeguard. I did not know that was in the design. That changes things.",
          principle:
            "Explaining the actual technical safeguard in plain terms, without jargon, often resolves the concern in the room without needing a session. Most blocking concerns are about what is unknown, not what is unsafe.",
          keywords: ["read-only", "mirror", "before migration", "untouched", "validate", "confirm", "safeguard", "plain", "walkthrough"],
        },
        {
          id: "s4b",
          tag: "Offer to send docs",
          line:
            "I can send you the technical spec after this meeting. It covers everything in detail.",
          points: -1,
          standing: -5,
          momentum: -4,
          reaction:
            "If you send me a spec I have to read, we are back to the beginning. I told you I do not have bandwidth.",
          principle:
            "Sending documents to someone who has already not read your documents is not a solution. It is a delay dressed up as progress.",
          keywords: ["send you", "spec", "after meeting", "document", "detail", "technical doc", "in writing"],
        },
        {
          id: "s4c",
          tag: "Sketch it out",
          line:
            "Let me draw it on the whiteboard. It is faster than words.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "Go ahead.",
          principle:
            "A visual explanation in the room removes the reading requirement and creates a shared reference point. It is harder to dismiss something you drew together.",
          keywords: ["whiteboard", "draw", "visual", "faster", "show you", "sketch", "diagram", "picture"],
        },
        {
          id: "s4d",
          tag: "Ask what would close it",
          line:
            "What would you need to see or hear in the next five minutes to be comfortable signing off. Tell me and I will answer it directly.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Tell me what happens if the mirror fails.",
          principle:
            "Asking what would close the concern in a bounded timeframe keeps both parties focused on resolution rather than on building a case for delay.",
          keywords: ["what would close it", "five minutes", "comfortable", "tell me", "answer directly", "need to see", "what if"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "That still does not give me enough to sign off on.",
        principle: "When a peer opens the door to a technical walkthrough, give him the real answer in real terms. Not a summary, not a pointer to docs.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 72, standingAtLeast: 44 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He signs off on the scoped phase and agrees to a session with Pradeep before phase two. You leave with a name, a date, and his signature.",
      lessons: [
        "Surface the real concern rather than fighting the pattern. Most blocking behavior has a specific fear underneath it.",
        "Offer a face-saving narrative so the counterpart can tell their team they enforced the process, not that they caved.",
        "A smaller sign-off you actually get is worth more than a full sign-off you cannot get.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 48 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He agrees to a technical session with Pradeep but will not sign off today. You have a meeting on the calendar but no commitment.",
      lessons: [
        "A meeting is not a sign-off. Close on the specific outcome before you leave the room.",
        "The face-saving narrative was the move that almost worked. Offer it earlier next time.",
        "Getting a name is progress. Getting a date with that name is the real win.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He ends the meeting without a commitment and you are back where you started. He has also mentioned his concerns to Shenaz.",
      lessons: [
        "Naming the blocking pattern in the opening move gave him an honorable exit. He took it.",
        "Territorial counterparts do not respond to deadline pressure. They respond to face-saving paths.",
        "When the real concern is face, design a path where they look like they enforced the process.",
      ],
    },
  ],
};
