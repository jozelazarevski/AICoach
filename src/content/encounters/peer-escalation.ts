import type { Encounter } from "../../game/types";

export const peerEscalation: Encounter = {
  id: "peer-escalation",
  title: "The Escalation",
  difficulty: "adversarial",
  opponent: {
    name: "The Counterpart",
    role: "A rival peer who took the conflict to the VP",
    archetype: "Territorial Counterpart",
    blurb: "He escalated a false narrative to the VP. Neutralize it without looking petty.",
  },
  scene:
    "A conflict with a peer has already reached the VP on a false narrative. He has framed a delay as your failure and positioned himself as the one cleaning it up. You have him in a room before the VP forms a fixed view. You must neutralize the spin calmly and credibly, without looking defensive or petty.",
  objective:
    "Neutralize the false narrative and reset the facts without looking defensive or petty.",
  startStanding: 30,
  startMomentum: 15,
  stages: [
    {
      id: "s1",
      prompt:
        "I had to loop in the VP. Honestly, your team dropped the ball on the integration and it was starting to put the whole launch at risk. Someone had to flag it.",
      choices: [
        {
          id: "s1a",
          tag: "Counterattack",
          line:
            "That is rich coming from you. Your team missed two handoffs and now you are blaming mine to cover for it. The VP should hear that part.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "So your answer is to point fingers right back. That is exactly the kind of thing I flagged. You make my point for me.",
          principle:
            "Returning fire confirms the story that you are the problem. A counterattack reads as defensiveness, not as truth.",
          keywords: ["blame back", "your fault", "cover", "point fingers", "you missed", "the VP should hear", "retaliate"],
        },
        {
          id: "s1b",
          tag: "Stay calm and curious",
          line:
            "Okay. I want to get this right, so help me understand exactly what you told the VP. I would rather we are working from the same facts than from two versions.",
          points: 5,
          standing: 11,
          momentum: 14,
          reaction:
            "Fine. I said the integration slipped and that it was on your side. If that is not the whole picture, I am listening.",
          principle:
            "Calm curiosity pulls the actual claim into the open without conceding it. You cannot reset a narrative you have not heard stated plainly.",
          keywords: ["get it right", "what you told", "same facts", "understand", "calm", "two versions", "listening"],
        },
        {
          id: "s1c",
          tag: "Acknowledge the concern",
          line:
            "I hear that the launch risk worried you. That is fair to care about. Let us separate the risk itself from whose fault it was, because those are two different conversations.",
          points: 2,
          standing: 5,
          momentum: 6,
          reaction:
            "I suppose they are different conversations. The risk is what I actually care about, so go on.",
          principle:
            "Validating the underlying concern lowers the temperature and lets you split a fair worry from an unfair attribution.",
          keywords: ["i hear", "fair to care", "separate", "risk versus fault", "acknowledge", "different conversations"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "I am not following. Are you disputing it or not.",
        principle: "A vague reply to an escalation lets the false story stand. Get the specific claim on the table first.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "The way I see it, the timeline slipped and that is on your team. The VP agreed it looked that way.",
        ifStandingBelow: [
          20,
          "And frankly the way you are reacting right now is exactly what I described to the VP.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Lay out the record",
          line:
            "Here is the timeline as it actually happened, dates and handoffs. The slip started when the spec changed on your side. I am not assigning blame, just putting the sequence in front of both of us.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "Hm. I had not lined the dates up like that. The spec change was real, I will give you that.",
          principle:
            "A neutral, dated record beats a hot accusation. Facts laid out without heat let the other person revise their own story.",
          keywords: ["timeline", "dates", "handoffs", "sequence", "the record", "spec change", "no blame", "facts"],
        },
        {
          id: "s2b",
          tag: "Go over his head in return",
          line:
            "If we are escalating, then I will set up my own time with the VP and give her the real version. Two can play this.",
          points: -3,
          standing: -15,
          momentum: -5,
          reaction:
            "Of course you will. So now we both run to the VP and look like two peers who cannot manage a problem. Great optics for you.",
          principle:
            "Matching his escalation drags you both down and makes you look as political as him. The goal is to look like the adult, not the rival.",
          keywords: ["my own time", "real version", "go to the VP", "two can play", "escalate back", "over his head"],
        },
        {
          id: "s2c",
          tag: "Offer to verify together",
          line:
            "Let us not argue from memory. Pull up the project log and we walk the timeline side by side right now. Whatever it shows, it shows.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "I can do that. If the log backs you, I will adjust how I framed it. If it backs me, you adjust.",
          principle:
            "Proposing to check the shared record together signals confidence and fairness. People trust the person willing to look at the receipts.",
          keywords: ["project log", "side by side", "verify together", "whatever it shows", "check the record", "not from memory"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Show me something concrete then, because right now it is your word against the timeline I gave.",
        principle: "Against a confident false claim, opinion loses. Move the conversation onto the documented record.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright, the dates are messier than I told the VP. But she already has the version I gave her. I am not going to walk into her office and say I was wrong.",
      choices: [
        {
          id: "s3a",
          tag: "Propose a joint fix",
          line:
            "Then we do not frame it as you being wrong. We go to her together with the corrected timeline and a fix for the launch. You look like someone who chased the truth, not someone who got it wrong.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "Together, with a fix. That I can stand behind. It is a better look than letting the wrong version sit.",
          principle:
            "Give your rival a face-saving way to correct the record. A joint fix reframes a retraction as leadership and turns him into a partner.",
          keywords: ["together", "corrected timeline", "a fix", "face-saving", "joint", "chased the truth", "better look"],
        },
        {
          id: "s3b",
          tag: "Get emotional",
          line:
            "Do you have any idea what this did to me. You went and trashed my name to the VP over something that was not even true, and now you want to protect your image.",
          points: -2,
          standing: -12,
          momentum: -3,
          reaction:
            "Look, I am not doing a feelings session. You are proving you cannot keep this professional, which is sort of the whole issue.",
          principle:
            "Venting hands him the narrative back. Emotion in a credibility fight reads as the very instability he accused you of.",
          keywords: ["what this did to me", "trashed my name", "feelings", "not even true", "upset", "emotional", "your image"],
        },
        {
          id: "s3c",
          tag: "Let him save face",
          line:
            "Nobody needs to use the word wrong. New information came in, you adjust. That is just how good operators work. Let us update her with the fuller picture.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "New information, fuller picture. I can live with that framing. It is honest enough and it does not make me the villain.",
          principle:
            "Offering a dignified exit costs you nothing and buys his cooperation. People move when correcting course does not require humiliation.",
          keywords: ["nobody says wrong", "new information", "adjust", "fuller picture", "save face", "good operators", "update"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "So what, then. I am not going to fall on my sword over this.",
        principle: "When a rival fears the climb-down, the move is to engineer a path that does not cost him face.",
      },
    },
    {
      id: "s4",
      prompt: "So how do you actually want to play this with the VP. Be specific.",
      choices: [
        {
          id: "s4a",
          tag: "Joint correction and fix",
          line:
            "One short message from both of us to the VP today. Corrected timeline, what we each own, and the recovery plan with a date. Both names on it. We close it before it grows.",
          points: 6,
          standing: 11,
          momentum: 18,
          reaction:
            "Both names, corrected timeline, recovery plan, today. Done. Honestly that is a cleaner outcome than where I started.",
          principle:
            "Close on a specific joint artifact with both names and a date. Shared ownership of the correction ends the false story for good.",
          keywords: ["both names", "today", "corrected timeline", "recovery plan", "date", "one message", "close it"],
        },
        {
          id: "s4b",
          tag: "Demand he recants alone",
          line:
            "You created this, so you go back to the VP alone and tell her you got it wrong about my team. I want it on the record that it was your error.",
          points: -3,
          standing: -14,
          momentum: -4,
          reaction:
            "Not a chance. You want a public scalp, not a fix. We are right back to a fight, and now I have no reason to help you.",
          principle:
            "Demanding a solo, public recant is about winning, not resolving. It re-arms the rival and reopens the whole conflict.",
          keywords: ["go back alone", "you got it wrong", "on the record", "your error", "recant", "public scalp", "admit it"],
        },
        {
          id: "s4c",
          tag: "Leave it informal",
          line:
            "Let us just both mention to the VP that we sorted it out next time we see her. No need to make a thing of it.",
          points: 1,
          standing: 1,
          momentum: 3,
          reaction:
            "I mean, sure, if it comes up. Though that leaves the version I gave her sitting there until then.",
          principle:
            "An informal mention leaves the false narrative on the record by default. Resolutions that depend on it coming up usually do not.",
          keywords: ["mention", "next time", "no big deal", "if it comes up", "informal", "sorted it out", "loose"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "That is vague. Tell me exactly what goes to the VP and when.",
        principle: "At the close, name the specific joint message and the timing, or the original story stays the official one.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 30 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You both send the VP a corrected timeline and a recovery plan with both names on it the same day. The false narrative is gone, you look like the steady one, and the rival is now invested in the joint fix rather than the fight.",
      lessons: [
        "Stay calm and pull the actual claim into the open before you try to reset it.",
        "A neutral, dated record beats a hot accusation. Let the facts let the other person revise their own story.",
        "Give your rival a face-saving path to correct the record, then close on a joint artifact with both names and a date.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He softens and agrees the facts are messier than he said, but you leave it loose. The correction depends on it coming up later, so the original version still sits in the VP's mind for now.",
      lessons: [
        "Defusing the rival is only half the job. An informal mention leaves the false story on the record by default.",
        "You stayed credible and avoided a war, but you did not lock the fix to a date.",
        "Close on a specific joint message and timing so the correction actually reaches the VP.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The exchange turns into a peer fight. You either matched his escalation, vented, or demanded a public scalp, and now two peers look unable to manage a problem. The VP's first impression hardens against you.",
      lessons: [
        "Counterattacking, escalating back, or venting all confirm the story that you are the unstable one.",
        "Demanding a solo public recant is about winning, not resolving, and it re-arms the rival.",
        "Be the adult in the room: separate facts from spin and propose a fix the other side can accept.",
      ],
    },
  ],
};
