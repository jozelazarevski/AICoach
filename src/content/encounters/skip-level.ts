import type { Encounter } from "../../game/types";

export const skipLevel: Encounter = {
  id: "skip-level",
  title: "The Skip-Level",
  difficulty: "pointed",
  opponent: {
    name: "The Principal",
    role: "Your manager's boss in a skip-level one-on-one",
    archetype: "Skeptical Principal",
    blurb: "A rare skip-level. Plant the promotion seed without undermining your manager.",
  },
  scene:
    "You have a rare skip-level one on one with your manager's boss. These do not come often, and she is watching how you carry yourself as closely as what you say. You want to plant the seed of your promotion case without throwing your manager under the bus, who reports to her and whom she trusts.",
  objective:
    "Plant your promotion case credibly while staying loyal to your manager on the surface and asking for guidance, not a favor.",
  startStanding: 45,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt:
        "I do not get to do these often, so let us make it useful. Tell me how things are going from where you sit.",
      choices: [
        {
          id: "s1a",
          tag: "Show the work",
          line:
            "Going well. The platform I have been driving cut onboarding time by a third this quarter, and I have started owning the cross-team roadmap. I am trying to take on more of the hard, ambiguous problems.",
          points: 5,
          standing: 11,
          momentum: 14,
          reaction:
            "That onboarding number is real, I have seen it move. And taking the roadmap off other people's plates is exactly the kind of scope I notice. Keep going.",
          principle:
            "In a skip-level, lead with concrete work and the scope you are reaching for. Show, do not assert.",
          keywords: ["work", "platform", "onboarding", "roadmap", "ambiguous", "scope", "owning", "results"],
        },
        {
          id: "s1b",
          tag: "Vent about your manager",
          line:
            "Honestly, mixed. My manager moves slowly and sits on decisions, so I end up carrying more than my title says while he takes the credit upstairs.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "That is a heavy thing to bring to me about someone who is not in the room. It tells me more about how you handle a hard relationship than it does about him.",
          principle:
            "Badmouthing your manager to his boss reads as a loyalty and maturity flag, not a fair critique. It damages you, not him.",
          keywords: ["mixed", "slow", "sits on", "credit", "vent", "carrying", "complain", "title"],
        },
        {
          id: "s1c",
          tag: "Steady and honest",
          line:
            "Genuinely well. The team is shipping, I have grown into more ownership this year, and I want to be deliberate about where I take it next.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Deliberate is good. I would rather talk to someone who is steering than someone who is just busy. Say more about where next.",
          principle:
            "A steady, honest opener buys you the right to talk about ambition. Composure reads as readiness.",
          keywords: ["well", "shipping", "ownership", "deliberate", "steady", "grown", "next", "honest"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Be specific. Generalities do not tell me much in fifteen minutes.",
        principle: "A skip-level rewards specifics. Open with concrete work, not a status mood.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "You have a strong manager. How is that relationship working for you. I ask because how people talk about their boss tells me a lot.",
        ifStandingBelow: [
          35,
          "Given what you said a moment ago, I am curious how you actually see your manager.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Credit him genuinely",
          line:
            "He has been good for me. He has pushed me to own outcomes and given me air cover to take risks. A lot of what I have shipped this year happened because he made room for it.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "That is good to hear, and it is consistent with what he says about you. People who can credit their boss honestly tend to be the ones I can promote without worrying.",
          principle:
            "Crediting your manager sincerely to his boss proves you are safe to elevate. Loyalty upward is a promotion signal.",
          keywords: ["good for me", "air cover", "made room", "pushed me", "credit", "outcomes", "genuine", "boss"],
        },
        {
          id: "s2b",
          tag: "Damn with faint praise",
          line:
            "He is fine. We do not always agree on pace, but I make it work and I manage around him where I have to.",
          points: -2,
          standing: -11,
          momentum: -3,
          reaction:
            "Manage around him. That is a telling phrase. I would be careful with it, because it lands as a critique dressed up as diplomacy.",
          principle:
            "Faint praise and managing around him reads as a veiled complaint. Coded criticism still costs you trust.",
          keywords: ["fine", "pace", "manage around", "faint", "disagree", "work it", "coded", "diplomatic"],
        },
        {
          id: "s2c",
          tag: "Honest and fair",
          line:
            "Strong overall. We have our differences like anyone, but he backs me in the room and I have learned a lot under him.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Fair and grounded. No relationship is frictionless, and I trust the read of someone who can say that plainly.",
          principle:
            "Acknowledging normal friction while affirming the relationship is more credible than gushing and safer than sniping.",
          keywords: ["strong", "differences", "backs me", "learned", "fair", "grounded", "plainly", "honest"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Tell me straight. I can read around a dodge.",
        principle: "When the boss probes the relationship, sincere credit beats both gushing and hedging.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright, you have my attention. What do you actually want out of the next year. Be direct with me.",
      choices: [
        {
          id: "s3a",
          tag: "Ask for guidance",
          line:
            "I want the next level, and I would rather earn it than be handed it. What would you need to see from me to be convinced, and where would you push me to grow?",
          points: 5,
          standing: 10,
          momentum: 15,
          reaction:
            "Now that is a question I can work with. You are not asking me to pull a string, you are asking me to coach you. Let me tell you exactly what I would want to see.",
          principle:
            "Ask for guidance, not a favor. A request to be coached invites investment, while a request for a string invites resistance.",
          keywords: ["next level", "earn it", "what would you need", "guidance", "coach", "grow", "convinced", "push me"],
        },
        {
          id: "s3b",
          tag: "Ask her to go around him",
          line:
            "Honestly, I think my case is stuck with my manager. Could you push it forward directly, or take me onto something under you?",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "You are asking me to go around the person you report to. I will not do that, and the fact that you asked makes me trust the process less, not more.",
          principle:
            "Asking the skip to bypass your manager forces her to choose between you and her own chain. She will choose the chain.",
          keywords: ["stuck", "go around", "directly", "onto something", "bypass", "push it", "under you", "skip him"],
        },
        {
          id: "s3c",
          tag: "State the ambition plainly",
          line:
            "I am aiming for the next level within the year, and I want to be honest that it is on my mind. I would value your view on whether that timeline is realistic.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Honest and reasonable. The timeline is aggressive but not crazy. I respect that you said it out loud rather than hinting.",
          principle:
            "Naming your ambition plainly and inviting a reality check is credible and keeps her on your side of the table.",
          keywords: ["next level", "within the year", "honest", "timeline", "realistic", "ambition", "your view", "plainly"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Do not make me guess what you are after. Say it.",
        principle: "When invited to be direct, name the ambition and ask for a path, not a shortcut.",
      },
    },
    {
      id: "s4",
      prompt: "Good conversation. So how do we leave this. What is the right thing for me to do with it.",
      choices: [
        {
          id: "s4a",
          tag: "Keep your manager in the loop",
          line:
            "Nothing behind his back. I am going to take your guidance into my next one on one with him and build the case together. If it helps, you might mention to him that I am thinking about the next step.",
          points: 6,
          standing: 10,
          momentum: 18,
          reaction:
            "That is exactly right. You keep him in the loop, I reinforce it from my side, and now it looks like a coordinated plan rather than an end run. I am happy to do that.",
          principle:
            "Close by routing back through your manager. A plan that keeps him in the loop turns the skip into an ally, not a backdoor.",
          keywords: ["nothing behind his back", "one on one", "together", "in the loop", "reinforce", "coordinated", "mention", "build"],
        },
        {
          id: "s4b",
          tag: "Oversell yourself",
          line:
            "Honestly, I think I am already operating two levels up and the title is just catching up to reality. It is overdue.",
          points: -2,
          standing: -12,
          momentum: -3,
          reaction:
            "Two levels up is a big claim, and you just walked back the credibility you built. Overdue is the word of someone who feels owed, and I do not promote on owed.",
          principle:
            "Overselling at the close undoes the credibility you earned. Confidence persuades, entitlement repels.",
          keywords: ["two levels up", "overdue", "owed", "already operating", "catching up", "oversell", "entitled", "reality"],
        },
        {
          id: "s4c",
          tag: "Ask for a check-in",
          line:
            "I would value a check-in next quarter to see if I have moved the needle on what you named. Would that be reasonable?",
          points: 3,
          standing: 6,
          momentum: 9,
          reaction:
            "Reasonable. Come back in a quarter with progress against those things and we will have a real conversation. I will hold you to it.",
          principle:
            "A modest, dated check-in keeps the door open and gives your ambition a track without pressuring her now.",
          keywords: ["check-in", "next quarter", "moved the needle", "progress", "reasonable", "track", "follow up", "door open"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Give me a clean next step that does not put me in an awkward spot with your manager.",
        principle: "Close on a next step that keeps your manager in the loop, or you turn a champion into a risk.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 45 },
      result: "won",
      baseGrade: "A",
      resolution:
        "She leaves convinced you are ready to develop and safe to back. She names what she wants to see, agrees to reinforce it with your manager, and the case is planted as a coordinated plan rather than an end run.",
      lessons: [
        "Lead with concrete work and the scope you are reaching for, not a status mood.",
        "Credit your manager sincerely. Loyalty upward is the signal that you are safe to promote.",
        "Ask for guidance, not a favor, and route the close back through your manager so the skip becomes an ally.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "She takes you seriously and the seed is planted, but you left some credibility on the table and the path forward is softer than it could have been. You have her attention, not yet her conviction.",
      lessons: [
        "You named the ambition but did not fully convert it into a coached, coordinated plan.",
        "Hedged praise and soft asks plant a smaller seed than sincere credit and a clear request for guidance.",
        "Close on a dated check-in that keeps your manager in the loop.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "She leaves the room trusting you less than when it started. The skip-level you spent months waiting for became a mark against you, and she is now warier of how you operate.",
      lessons: [
        "Badmouthing your manager to his boss is a loyalty flag that damages you, not him.",
        "Asking the skip to go around your manager forces her to choose her chain over you.",
        "Overselling and entitlement undo earned credibility. Confidence persuades, owed repels.",
      ],
    },
  ],
};
