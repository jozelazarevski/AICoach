import type { Encounter } from "../../game/types";

export const investorProbe: Encounter = {
  id: "investor-probe",
  title: "The Portfolio Review",
  difficulty: "measured",
  opponent: {
    name: "The Lead Investor",
    role: "Your lead investor who asks publicly about the missed milestone at a portfolio CEO gathering",
    archetype: "Constrained Sponsor",
    blurb: "He is publicly asking about the missed milestone in front of eight other portfolio CEOs. He is still in your corner, but he needs something he can tell the other partners.",
  },
  scene:
    "You are presenting at the quarterly portfolio review. Six minutes into your update, your lead investor interrupts to ask about the milestone you missed in Q3. Eight other portfolio CEOs are in the room. He is not hostile, but the question is public and the room is listening.",
  objective:
    "Give a credible public account of the miss without undermining his confidence, over-promising on the revised timeline, or giving the room a reason to doubt you.",
  startStanding: 52,
  startMomentum: 26,
  stages: [
    {
      id: "s1",
      prompt: "I want to pause on the Q3 milestone. You missed it by about thirty percent. Tell the room what happened.",
      choices: [
        {
          id: "s1a",
          tag: "Own it cleanly",
          line:
            "We missed it. The milestone required two things to happen simultaneously and one of them did not land on time. That is on me, not on the market. Here is what we learned and what we changed.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Tell the room what you changed.",
          principle:
            "Owning the miss without context or excuses first signals that you are the kind of founder who does not explain before accounting. It disarms the room before they can become an audience for your defense.",
          keywords: ["we missed", "own it", "on me", "what we learned", "what we changed", "missed it", "that is on me"],
        },
        {
          id: "s1b",
          tag: "Lead with context",
          line:
            "Q3 was a difficult quarter for the whole sector. We saw demand soften across the board and our pipeline was affected.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "I am not asking about the sector. I am asking about your company.",
          principle:
            "Leading with sector context before owning the number reads as deflection in a room full of founders who had their own Q3. Your investor is asking about you specifically.",
          keywords: ["difficult quarter", "sector", "demand soften", "pipeline", "context", "market"],
        },
        {
          id: "s1c",
          tag: "Name what you learned",
          line:
            "We missed, and the most useful thing I can tell this room is what we did not know at the time we set the milestone that we know now.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction: "What did you not know.",
          principle:
            "Framing the miss as a learning opportunity before anyone asks positions you as reflective rather than defensive. It converts the question from 'what went wrong' to 'what did you do about it.'",
          keywords: ["we missed", "most useful", "did not know", "know now", "what we learned", "learning"],
        },
        {
          id: "s1d",
          tag: "Ask for context",
          line:
            "What version of the story have you heard? I want to make sure I am addressing the right concern.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction: "I heard you missed by thirty percent. That is the concern.",
          principle:
            "Asking what he has heard before you answer in a public setting reads as trying to calibrate your story to the information in the room. Own the number directly.",
          keywords: ["what have you heard", "version", "which concern", "ask for context", "right concern"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a direct answer on the miss.",
        principle: "Own the miss before the room can start interpreting your silence. One sentence. Then move.",
      },
    },
    {
      id: "s2",
      prompt: "What is the revised timeline and how confident are you in it.",
      choices: [
        {
          id: "s2a",
          tag: "Name the range, not the date",
          line:
            "I am targeting Q1 with high confidence and Q4 as the stretch. What I am not going to do is give you a single date and defend it the same way I defended the one I missed.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction: "That is a more honest frame than most founders use. What changed in your model.",
          principle:
            "Naming a range and explaining why you are giving a range rather than a date demonstrates that you have updated your approach, not just your timeline.",
          keywords: ["range", "Q1", "stretch", "not single date", "missed", "high confidence", "honest"],
        },
        {
          id: "s2b",
          tag: "Commit to a specific date",
          line:
            "We are targeting February fifteenth and I am highly confident in that date.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction: "You said the same thing about the Q3 date.",
          principle:
            "High-confidence point estimates after a miss invite the obvious comparison. You are asking the room to believe the same process that produced the miss will produce a correct date this time.",
          keywords: ["specific date", "February", "highly confident", "commit to", "date"],
        },
        {
          id: "s2c",
          tag: "Explain what changed",
          line:
            "The timeline changed because our understanding of the dependency changed. We now track [specific dependency] weekly instead of monthly. That is the variable that tripped us last time.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction: "What does the weekly track tell you right now.",
          principle:
            "Naming the specific process change that addresses the specific failure shows you are not just re-setting the same clock. It gives the room something to evaluate instead of a number to be skeptical of.",
          keywords: ["what changed", "dependency", "weekly", "monthly", "tripped us", "process change", "specific"],
        },
        {
          id: "s2d",
          tag: "Be honest about uncertainty",
          line:
            "I have a target and I have genuine uncertainty. If you want the target, it is Q1. If you want the honest uncertainty band, it is Q1 to Q2. I would rather tell you that now than have this conversation again.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "I would rather hear that too. What is driving the uncertainty.",
          principle:
            "Naming genuine uncertainty in a room of investors is not weakness. It is the exact behavior they are hoping to see from a founder who just missed. It converts the miss into a trust-building moment.",
          keywords: ["genuine uncertainty", "uncertainty band", "honest", "Q1 to Q2", "rather tell you", "this conversation again"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Give me the number and tell me how confident you are.",
        principle: "Give a range and explain why you are giving a range. A defensible estimate is more valuable than a confident one.",
      },
    },
    {
      id: "s3",
      prompt: "One of the other portfolio CEOs chimes in: 'We had a similar situation. Did you consider restructuring the team when you missed?'",
      choices: [
        {
          id: "s3a",
          tag: "Answer directly, own the decision",
          line:
            "We considered it. We made changes to how the team is structured around the dependency. I am not going to detail personnel decisions in this setting, but yes, the miss had structural consequences.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "Fair. What was the structural change.",
          principle:
            "Confirming you considered restructuring without detailing personnel decisions is the right scope for a public setting. It shows accountability without violating confidentiality or inviting comparison.",
          keywords: ["considered it", "structural", "personnel", "not in this setting", "had consequences", "made changes"],
        },
        {
          id: "s3b",
          tag: "Deflect to your investor",
          line:
            "That is something I discussed with the board. I think it is better addressed in that context.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction: "The room is curious. You do not have to share details but you can say something.",
          principle:
            "Redirecting a direct question to the board in a founder setting reads as evasion. The question is about your decision-making, not a governance matter.",
          keywords: ["discussed with board", "board context", "deflect", "not appropriate", "better addressed"],
        },
        {
          id: "s3c",
          tag: "Share the lesson",
          line:
            "The lesson I took from it was that organizational structure around a key dependency should not wait for a miss to become visible. We moved faster than we should have had to.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "That is well put.",
          principle:
            "Converting the restructuring question into a lesson you can share positions you as a peer giving hard-won insight rather than a founder defending a decision under pressure.",
          keywords: ["lesson", "organizational structure", "dependency", "moved faster", "should not wait", "visible"],
        },
        {
          id: "s3d",
          tag: "Invite the parallel",
          line:
            "I would actually be curious what you did. We made changes but I would not claim we found the optimal path.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction: "We moved one key person into a different accountability structure. It helped.",
          principle:
            "Inviting a peer to share their approach in a portfolio context converts a potentially awkward question into a collegial exchange. It signals confidence rather than defensiveness.",
          keywords: ["curious what you did", "invite parallel", "made changes", "optimal path", "what did you do"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I think the room is just curious how you handled it.",
        principle: "Answer the restructuring question directly without detailing personnel decisions. The room wants to know you took it seriously.",
      },
    },
    {
      id: "s4",
      prompt: "Good discussion. After the session, I want to take ten minutes with you. Is that alright.",
      choices: [
        {
          id: "s4a",
          tag: "Accept and name what you will bring",
          line:
            "Of course. I will have the updated model and the specific Q4 leading indicators pulled up so we can go through the numbers directly.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction: "Good. See you in fifteen.",
          principle:
            "Accepting a private follow-up and naming what you will bring converts the investor's ask from a check-in into a structured conversation. It also signals you came prepared.",
          keywords: ["of course", "updated model", "leading indicators", "numbers directly", "accept", "prepared"],
        },
        {
          id: "s4b",
          tag: "Ask what he wants to cover",
          line:
            "Absolutely. Is there something specific you want to cover or is it general?",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction: "I want to go through the Q4 model with you.",
          principle:
            "Asking what he wants to cover is reasonable but slightly passive. Better to come prepared for the obvious follow-up and offer that directly.",
          keywords: ["what do you want", "specific", "general", "cover", "ask him"],
        },
        {
          id: "s4c",
          tag: "Propose to send materials instead",
          line:
            "Of course. Or if it is easier, I can send you the full model tonight and we can do a call this week.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction: "I would rather do it now while the conversation is fresh.",
          principle:
            "Suggesting a later call when someone offers a face-to-face follow-up reads as avoidance. He offered a ten-minute window. Take it.",
          keywords: ["send materials", "call this week", "tonight", "easier", "defer"],
        },
        {
          id: "s4d",
          tag: "Thank him for the public question",
          line:
            "Yes. And I want to say in private what I could not say in the room: I am grateful you asked the question the way you did. It gave me a chance to say what needed to be said.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "You handled it well. That is what I was hoping for.",
          principle:
            "Thanking an investor for asking a hard question publicly, and naming what it gave you, is the kind of signal that turns a moment of accountability into a moment of relationship building. It can only work if you actually handled the session well.",
          keywords: ["grateful", "thank you", "public question", "what needed to be said", "in private", "handled it"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I will take that as a yes. See you after.",
        principle: "Accept a private follow-up with specificity. Name what you will bring to the conversation.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 52 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He pulls you aside after and says the room responded well. He is going to tell the other partners that the Q3 miss is behind you. You leave the portfolio review stronger than you arrived.",
      lessons: [
        "Own the miss before the room can start interpreting. One sentence. Then move to what changed.",
        "Give a range and explain why you are giving a range instead of a date. That is the signal that you updated your process, not just your timeline.",
        "Naming genuine uncertainty after a miss is not weakness. It is the exact behavior an investor is hoping to see.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He follows up by email with specific questions about the Q4 model. You left the room intact but not ahead of where you started.",
      lessons: [
        "Context before accountability always reads as deflection. The room will notice.",
        "A confident single date after a miss invites the obvious comparison. Give a range.",
        "Accept the private follow-up with specificity. He is giving you a second chance to strengthen the relationship.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Two of the other portfolio CEOs ask the investor about the miss after the session. He tells you privately that he is going to need a deeper review before the next partner meeting.",
      lessons: [
        "Leading with sector context before owning the number reads as deflection in a room that had its own Q3.",
        "Redirecting a direct question to the board in a founder setting signals evasion, not governance.",
        "High-confidence point estimates after a miss invite comparison to the estimate you already got wrong.",
      ],
    },
  ],
};
