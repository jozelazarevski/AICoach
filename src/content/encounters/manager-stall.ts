import type { Encounter } from "../../game/types";

export const managerStall: Encounter = {
  id: "manager-stall",
  title: "The Stalled Case",
  difficulty: "pointed",
  opponent: {
    name: "The Manager",
    role: "Your direct manager, capable but insecure",
    archetype: "Guarded Manager",
    blurb: "He has sat on your promotion case for months. Move him without triggering him.",
  },
  scene:
    "Your manager has sat on your promotion case since the autumn. He is operationally capable but not technical, and your visibility makes him uneasy. He prefers delay to commitment and quietly takes credit for the team's wins. You have him one on one for fifteen minutes.",
  objective:
    "Get him to commit to one specific action that advances your case, without going around him or making him feel shown up.",
  startStanding: 45,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "Look, I hear you on the promotion. It is just not the right moment. There is a lot going on above me and the timing is tricky right now.",
      choices: [
        {
          id: "s1a",
          tag: "Give him the win",
          line:
            "I get it, the timing is yours to manage. I want to make this easy for you. If I step up, it reflects well on the team you built. How do we set it up so it lands as your call?",
          points: 5,
          standing: 12,
          momentum: 14,
          reaction:
            "That is fair. I do want it to look like a considered decision, not a reaction to pressure. Keep going.",
          principle:
            "A threatened manager moves when the win is framed as his. You lowered his defenses by handing him control and credit.",
          keywords: ["your call", "team", "credit", "make it easy", "reflects", "you built", "timing"],
        },
        {
          id: "s1b",
          tag: "Cite the numbers",
          line:
            "With respect, I have earned it. My platform drove twenty nine million in impact and the retention numbers speak for themselves. The case is obvious.",
          points: -2,
          standing: -12,
          momentum: -2,
          reaction:
            "Nobody is disputing the numbers. But it is not as simple as you make it sound, and frankly that is the kind of thing I have to manage.",
          principle:
            "Leading with your own brilliance makes an insecure manager feel smaller and slows him down. The numbers are not the blocker, his standing is.",
          keywords: ["earned", "numbers", "impact", "results", "obvious", "deserve", "metrics", "retention"],
        },
        {
          id: "s1c",
          tag: "Surface the blocker",
          line:
            "Help me understand what would need to be true for this to move forward. What is the real obstacle, so I can help solve it rather than just push.",
          points: 3,
          standing: 6,
          momentum: 7,
          reaction:
            "Honestly, it is about how it reads upstairs. I do not want it to look like I am just rubber stamping my own people.",
          principle:
            "Asking what would need to be true gives him control and surfaces the actual constraint instead of fighting the stall.",
          keywords: ["what would", "obstacle", "blocker", "help", "understand", "solve", "real", "concern"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "I am not sure what you are getting at. Be straight with me.",
        principle: "Vague openings let a staller keep stalling. Give him a clear, low-threat frame to respond to.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "The thing is, the decision is not really mine alone. It has to clear the people above me, and I do not want to spend capital on something that is not airtight.",
        ifStandingBelow: [
          35,
          "And I will be honest, the way you are pushing this is exactly the kind of thing that makes me hesitate.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Hand him the package",
          line:
            "Then let me do the work. I will put together a one page case with the impact, the scope, and the precedent, written so you can forward it as is. You decide if and when it goes up.",
          points: 5,
          standing: 10,
          momentum: 15,
          reaction:
            "That actually helps. If it is airtight and ready, I am more comfortable carrying it up. Send me something I can use.",
          principle:
            "Doing the work and handing him a ready artifact removes his risk and keeps him in control. Low effort and low exposure is how you move him.",
          keywords: ["do the work", "one page", "package", "ready", "forward", "draft", "you decide", "prepare"],
        },
        {
          id: "s2b",
          tag: "Name the sponsor",
          line:
            "Vijay already supports this. I could ask him to weigh in directly if that would help move it.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "So you have been talking to Vijay about this. That is exactly the kind of end run that makes my job harder. Let me be clear, this goes through me.",
          principle:
            "Invoking his boss reads as going around him and confirms his deepest fear of being bypassed. On this opponent it is the most damaging move available.",
          keywords: ["vijay", "sponsor", "his boss", "go to", "weigh in", "above you", "skip", "directly"],
        },
        {
          id: "s2c",
          tag: "Name a small step",
          line:
            "What if we start small. Put me on the agenda for the next talent review as a name to watch. No commitment, just visibility.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction: "That is a reasonable first step. I can do that much without sticking my neck out.",
          principle:
            "A small, low-commitment step is easy for a cautious manager to say yes to and builds the path without forcing the decision.",
          keywords: ["small", "first step", "talent review", "agenda", "visibility", "watch", "start", "low commitment"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Maybe. I would need to see something concrete before I commit to anything.",
        principle: "When he hides behind people above him, give him a concrete, low-risk action, not more reassurance.",
      },
    },
    {
      id: "s3",
      prompt:
        "I will say, the team has done well this year. I have been pleased with how it has all come together under my watch.",
      choices: [
        {
          id: "s3a",
          tag: "Feed the narrative",
          line:
            "It has, and that is your leadership showing. Promoting from within is the proof that the bet you made on this team paid off. It is a good story for you.",
          points: 5,
          standing: 12,
          momentum: 12,
          reaction:
            "It is a good story. I had not thought of it as proof the approach worked, but you are right.",
          principle:
            "Tying your promotion to his success story turns your ask into evidence of his good judgment. He now has a reason of his own to say yes.",
          keywords: ["your leadership", "bet paid off", "good story", "proof", "from within", "credit", "your watch"],
        },
        {
          id: "s3b",
          tag: "Correct the record",
          line:
            "To be fair, most of those wins came out of my workstream and my team's effort. I would not want that to get lost.",
          points: -3,
          standing: -18,
          momentum: -3,
          reaction:
            "I see. Well, I think leadership is about more than any one workstream. I would be careful about claiming too much.",
          principle:
            "Correcting his credit in the moment threatens the exact thing he is protecting. Even when you are right, this hardens him against you.",
          keywords: ["my workstream", "my team", "my effort", "credit", "to be fair", "lost", "actually mine"],
        },
        {
          id: "s3c",
          tag: "Stay neutral",
          line: "It has been a strong year all around. So, on the next step for me, where does your head land?",
          points: 1,
          standing: 1,
          momentum: 3,
          reaction: "My head lands on cautious. But I am listening. What are you actually asking for.",
          principle:
            "Neutral is safe but wastes a chance to make him an ally. A credit moment is an opening to align your win with his.",
          keywords: ["strong year", "next step", "where", "head", "neutral", "moving on", "anyway"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Sure. Anyway, what is the specific thing you want from me here.",
        principle: "When he fishes for credit, the play is to feed it and connect it to your ask, not to contest it.",
      },
    },
    {
      id: "s4",
      prompt: "So tell me plainly. What do you actually want me to do.",
      choices: [
        {
          id: "s4a",
          tag: "Specific and safe",
          line:
            "One thing. Put my name forward for the next promotion cycle with the one pager I will send you by Friday. If anyone asks, it was your initiative based on the team's results. Nothing else from you.",
          points: 6,
          standing: 10,
          momentum: 18,
          reaction:
            "That is clean. One pager, my name on the sponsorship, next cycle. I can work with that.",
          principle:
            "A single, specific, time-bound ask with the risk pre-removed and the credit pre-assigned is the easiest possible yes for a cautious manager.",
          keywords: ["one thing", "next cycle", "one pager", "friday", "your initiative", "specific", "nothing else"],
        },
        {
          id: "s4b",
          tag: "Ask for support",
          line: "I just want to know I have your support on this. That you are behind me.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "You have my support in principle. What that means in practice, we can figure out down the line.",
          principle:
            "Asking for support in the abstract gives him room to agree warmly and do nothing. Vague asks get vague yeses.",
          keywords: ["support", "behind me", "in principle", "vague", "feel", "know you", "general"],
        },
        {
          id: "s4c",
          tag: "Hint at options",
          line:
            "I should mention I am getting interest from outside. I would rather grow here, but I need to see movement.",
          points: -2,
          standing: -12,
          momentum: -2,
          reaction:
            "Is that a threat. Because if you are looking elsewhere, maybe that tells me something about your commitment here.",
          principle:
            "An outside-option hint to an insecure manager reads as a threat and a loyalty problem, not as urgency. Wrong lever, wrong person.",
          keywords: ["outside", "interest", "offer", "elsewhere", "movement", "leave", "options", "ultimatum"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "That is a bit fuzzy. Give me the specific action you want and I will tell you if I can do it.",
        principle: "At the ask, fuzzy loses. Name the single concrete action and remove his risk.",
      },
    },
    {
      id: "s5",
      prompt: "Alright. So where does that leave us.",
      choices: [
        {
          id: "s5a",
          tag: "Lock it down",
          line:
            "It leaves us here. I send the one pager Friday, you put my name in for the next cycle, and we check in after the talent review. I will get it to you by end of week.",
          points: 5,
          standing: 8,
          momentum: 16,
          reaction:
            "Works for me. Get me the page by Friday and I will carry it forward. Good conversation.",
          principle:
            "Closing on the exact action plus a date and a check-in turns a soft agreement into a real commitment he is now on record for.",
          keywords: ["friday", "next cycle", "check in", "end of week", "lock", "confirm", "carry it forward"],
        },
        {
          id: "s5b",
          tag: "Leave it open",
          line: "I appreciate you hearing me out. Let us keep talking about it.",
          points: 0,
          standing: 0,
          momentum: -4,
          reaction: "Sounds good. We will revisit it at some point.",
          principle:
            "Ending on let us keep talking lets the stall resume the moment you leave the room. Always close on a dated action.",
          keywords: ["keep talking", "revisit", "appreciate", "hearing", "some point", "later", "open"],
        },
        {
          id: "s5c",
          tag: "Push for more",
          line:
            "Good. And while we are at it, can you also commit to backing me for the expanded scope in the reorg.",
          points: -2,
          standing: -10,
          momentum: -5,
          reaction:
            "Now you are pushing your luck. Let us not get ahead of ourselves. I said what I can do.",
          principle:
            "Over-asking at the close makes him feel handled and pulls back the ground you just won. Bank the yes and stop.",
          keywords: ["also", "and while", "expanded scope", "reorg", "more", "on top", "as well"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -2,
        reaction: "Let us just leave it there for now.",
        principle: "At the close, restate the agreed action and a date. Anything looser lets it evaporate.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 78, standingAtLeast: 45 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He commits to putting your name forward for the next cycle and agrees to carry your one pager up, framed as his own initiative. You leave with a specific action and a date.",
      lessons: [
        "Lower a threatened manager's defenses before you ask. Give him control and visible credit first.",
        "Remove his risk by doing the work and handing him a ready artifact he can forward as is.",
        "Close on a single specific action with a date, or the stall resumes the moment you leave.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He agrees in principle and warms to the idea, but commits to nothing concrete and no date. You have momentum but not a decision.",
      lessons: [
        "A warm yes with no specifics is a stall in nicer clothing. Push gently for the dated action.",
        "You moved him by aligning with his interests. You lost the close by leaving it open.",
        "Name the exact next step and a date before the conversation ends.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He retreats further behind the people above him and the timing. The case is no closer than when you walked in, and he is warier of you.",
      lessons: [
        "Pressure, going around him, or correcting his credit all confirm his fear of being made small.",
        "On an insecure manager, the outside-option lever reads as disloyalty, not urgency.",
        "Make him feel safe and in control first. The ask only lands once his defenses are down.",
      ],
    },
  ],
};
