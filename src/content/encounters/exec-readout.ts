import type { Encounter } from "../../game/types";

export const execReadout: Encounter = {
  id: "exec-readout",
  title: "The Readout",
  difficulty: "adversarial",
  opponent: {
    name: "The Principal",
    role: "A hostile exec attacking your numbers in a live readout",
    archetype: "Skeptical Principal",
    blurb: "She is attacking your program numbers in front of the room. Hold it.",
  },
  scene:
    "You are halfway through a live program readout when a senior exec cuts in and starts attacking your numbers in front of a full room. Heads turn to you. How you handle the next few minutes decides whether the room keeps trusting the program, and you.",
  objective:
    "Hold the room under live attack by staying composed and owning the facts, without getting defensive or bluffing.",
  startStanding: 38,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "Hold on. These adoption numbers do not match what I am hearing from the field. Are we just presenting the flattering version here?",
      choices: [
        {
          id: "s1a",
          tag: "Acknowledge and give the real number",
          line:
            "Fair challenge. The slide shows registered users at sixty two percent. Weekly active is lower, at forty one percent, and that gap is the real story I am about to walk you through.",
          points: 6,
          standing: 11,
          momentum: 16,
          reaction:
            "Alright. At least someone is willing to put the unflattering number on the table. Forty one. Go on.",
          principle:
            "Acknowledge the concern and volunteer the real number before you are forced to. Owning the hard figure converts an attack into credibility.",
          keywords: ["fair", "acknowledge", "real number", "active", "gap", "honest", "own it", "walk through"],
        },
        {
          id: "s1b",
          tag: "Get defensive",
          line:
            "These numbers have been validated. I am not sure what field anecdotes you are hearing, but the data is the data.",
          points: -3,
          standing: -16,
          momentum: -5,
          reaction:
            "The data is the data. That is what people say right before the data falls apart. You just told the room you would rather defend the slide than answer the question.",
          principle:
            "Defensiveness under fire signals you are protecting yourself, not the truth. It hands the room a reason to doubt you.",
          keywords: ["validated", "data is the data", "anecdotes", "defensive", "not sure", "dispute", "deflect", "stand by"],
        },
        {
          id: "s1c",
          tag: "Invite the specifics",
          line:
            "I want to close that gap with you. Tell me which field signal is off, and I will show you exactly where it sits in our data.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Churn in the enterprise segment. Your slide buries it. So show me where it sits.",
          principle:
            "Inviting the specific objection turns a vague attack into a concrete one you can answer. Curiosity reads as confidence.",
          keywords: ["close the gap", "which signal", "show me", "specifics", "invite", "where it sits", "concrete", "open"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "That is a non-answer. Try again, with a number this time.",
        principle: "Under live attack, vagueness reads as evasion. Meet the challenge with a specific figure.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "Forty one percent weekly active is well short of the target you committed to last quarter. So what happened.",
        ifStandingBelow: [
          30,
          "And given how you opened, I am not inclined to take the next number on faith. What happened.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Take the hard question head on",
          line:
            "We missed it, and I will own why. We over-indexed on registration and under-invested in the activation flow. I called it too late, and that is on me, not the team. Here is what we changed.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "That is the most useful thing said in this room all morning. You missed, you know why, and you are not hiding behind anyone. Tell me what changed.",
          principle:
            "Take the hardest question head on and own the miss personally. Accountability under fire is what restores a room's trust.",
          keywords: ["we missed", "own it", "activation", "too late", "on me", "head on", "accountable", "changed"],
        },
        {
          id: "s2b",
          tag: "Blame your team",
          line:
            "The activation work slipped because the engineering team did not prioritize it the way I asked. It was out of my hands.",
          points: -3,
          standing: -17,
          momentum: -5,
          reaction:
            "Out of your hands. You are the owner. If you throw your own team under the bus in front of me, I have to wonder what you say about them when you are not being watched.",
          principle:
            "Blaming your team under pressure makes you look like a weak owner and a worse leader. The room counts it against you, not them.",
          keywords: ["team", "engineering", "did not prioritize", "out of my hands", "blame", "slipped", "not me", "their fault"],
        },
        {
          id: "s2c",
          tag: "Own it and stay factual",
          line:
            "We fell short of target. The driver was a slower activation curve than we modeled. I am not going to dress that up, and I can take you through the corrective plan.",
          points: 3,
          standing: 6,
          momentum: 9,
          reaction:
            "Plain and honest. I can work with that. Let me see the plan.",
          principle:
            "Owning the miss factually, without spin, keeps you credible even when the number is bad. Facts stated plainly hold the room.",
          keywords: ["fell short", "activation curve", "not dress up", "factual", "own", "corrective", "plain", "honest"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I asked what happened. I did not ask for a deflection.",
        principle: "When pressed on a miss, name the cause and take ownership. Spin reads as fear.",
      },
    },
    {
      id: "s3",
      prompt:
        "And what is your churn number in enterprise. Right now. I want the figure, not a story.",
      choices: [
        {
          id: "s3a",
          tag: "Offer a follow-up with data",
          line:
            "I will not guess at a churn figure in front of this room and get it wrong. I have the exact number in our dashboard. I will send the verified breakdown by segment by end of day today.",
          points: 5,
          standing: 10,
          momentum: 15,
          reaction:
            "Good. I would rather have the right number tomorrow than a wrong one now. End of day, all segments. I will be looking for it.",
          principle:
            "When you do not have a figure cold, commit to a dated follow-up with verified data. Refusing to guess protects your credibility.",
          keywords: ["will not guess", "exact number", "dashboard", "verified", "end of day", "follow up", "by segment", "send"],
        },
        {
          id: "s3b",
          tag: "Bluff a figure",
          line:
            "It is around eight percent, give or take. Nothing that should worry anyone in this room.",
          points: -3,
          standing: -18,
          momentum: -5,
          reaction:
            "Give or take. So you are guessing in a readout. If that eight is wrong, and I suspect it is, everything else you said today is now suspect too.",
          principle:
            "Bluffing a number you cannot back is the fastest way to lose a room. One unprovable figure poisons every figure you gave.",
          keywords: ["around", "give or take", "eight percent", "bluff", "guess", "should not worry", "made up", "approximate"],
        },
        {
          id: "s3c",
          tag: "Give the range you can stand behind",
          line:
            "I can give you a range I will stand behind: enterprise churn is in the low teens, higher than the rest of the book. I will confirm the precise figure in writing after this.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Low teens, and you flagged it is your worst segment. That I believe. Send me the precise number.",
          principle:
            "If you must answer live, give only the range you can defend and promise the precise figure later. Bounded honesty beats a false point estimate.",
          keywords: ["range", "stand behind", "low teens", "worst segment", "confirm", "in writing", "bounded", "defensible"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a number or a date, not a shrug. Which is it.",
        principle: "When you lack a figure, do not improvise it. Commit to a dated, verified follow-up instead.",
      },
    },
    {
      id: "s4",
      prompt: "Fine. So what should this room actually take away from your program. In one breath.",
      choices: [
        {
          id: "s4a",
          tag: "Close with the honest frame",
          line:
            "Registration is strong, activation is the gap, and we have a plan to close it that I will report against by month end. The number I am proud of is that nothing I told you today was dressed up.",
          points: 6,
          standing: 11,
          momentum: 18,
          reaction:
            "That is the readout I wanted in the first place. You held your ground without hiding anything. The program keeps my support. Get me that data.",
          principle:
            "Close by naming the honest headline and committing to report against it. A clean, accountable summary wins back the room.",
          keywords: ["registration strong", "activation gap", "plan", "month end", "nothing dressed up", "report", "honest", "headline"],
        },
        {
          id: "s4b",
          tag: "Overclaim a recovery",
          line:
            "Honestly, we have basically turned the corner and I expect us to be back on target within weeks. The worst is behind us.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "Turned the corner. You just spent ten minutes admitting you missed, and now it is all fixed in weeks. Do not undo your one good move by overpromising the comeback.",
          principle:
            "An unearned recovery claim at the close undercuts the honesty you just built. Do not trade credibility for a comeback line.",
          keywords: ["turned the corner", "back on target", "weeks", "worst is behind", "overclaim", "fixed", "comeback", "overpromise"],
        },
        {
          id: "s4c",
          tag: "Summarize plainly",
          line:
            "Strong top of funnel, real activation gap, corrective plan in motion. I will come back with the segment data and a status against the plan.",
          points: 3,
          standing: 6,
          momentum: 9,
          reaction:
            "Clear and no spin. That is enough for me to keep backing it for now. I will expect the follow-up.",
          principle:
            "A plain, spin-free summary plus a committed follow-up is enough to hold a hostile room. You do not need to oversell to win.",
          keywords: ["top of funnel", "activation gap", "corrective plan", "segment data", "status", "plain", "no spin", "summary"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "One breath. Give me the takeaway, not another slide.",
        principle: "Close a hostile readout on one honest headline and a committed follow-up, nothing inflated.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 38 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You held the room under live fire. You volunteered the hard numbers, owned the miss personally, refused to bluff, and closed on an honest headline with a dated follow-up. The exec ends the readout backing your program and your judgment.",
      lessons: [
        "Acknowledge the concern and give the real number before you are forced to. Owning the hard figure builds credibility.",
        "Take the hardest question head on and own the miss yourself. Accountability under fire restores trust.",
        "Never bluff a figure you cannot back. Commit to a dated, verified follow-up instead.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You survived the attack and kept most of the room, but a defensive moment or a soft answer left the exec only half convinced. The program keeps provisional support pending your data.",
      lessons: [
        "Composure and honesty held the line, but hesitation let some doubt linger.",
        "Plain, factual answers keep you credible. Spin or vagueness costs you the room.",
        "A bounded, defensible answer plus a follow-up beats both bluffing and stonewalling.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The room turned. By getting defensive, blaming your team, or bluffing a number, you confirmed the exec's suspicion that the program could not stand scrutiny. Your credibility took the hit, not just the slide.",
      lessons: [
        "Defensiveness signals you are protecting yourself, not the truth, and invites more doubt.",
        "Blaming your team makes you a weak owner. The room counts it against you.",
        "One bluffed figure poisons every figure you gave. Refuse to guess in a live room.",
      ],
    },
  ],
};
