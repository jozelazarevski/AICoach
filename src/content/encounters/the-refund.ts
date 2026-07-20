import type { Encounter } from "../../game/types";

export const theRefund: Encounter = {
  id: "the-refund",
  title: "The Refund",
  difficulty: "pointed",
  setting: "life",
  opponent: {
    name: "The Store Manager",
    role: "A retail manager who has heard every refund story ever told",
    archetype: "Gatekeeper",
    blurb: "Your blender died at day forty of a thirty-day return policy, and the receipt is long gone. She has the power to fix this in ninety seconds. She also has the power to recite policy until you leave. Which one you get is up to you.",
  },
  scene:
    "The $180 blender you bought six weeks ago started smoking mid-use and died. The store's return window is thirty days and you cannot find the receipt, though the purchase is right there on your banking app. The clerk called the manager, and she walks up already reading the situation.",
  objective:
    "Walk out with your money back, or the closest thing to it, without losing your temper or your afternoon.",
  startStanding: 40,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "Hi, I am the manager. My clerk says you have a return without a receipt, outside the thirty-day window. What can I do for you?",
      choices: [
        {
          id: "s1a",
          tag: "Calm facts, then a clear ask",
          line: "Thanks for coming over. Six weeks ago I bought this blender here for one eighty. On Tuesday it started smoking during normal use and died. Here is the purchase on my bank statement, and the model serial matches your stock. It is not a change-of-mind return, it is a product that failed. I would like a refund or a replacement.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Smoking, you said? That is a safety issue, which is a different conversation than a return. Let me look at the unit.",
          principle:
            "A defective product is a different category than a change-of-mind return, and naming that difference moves you out of the return policy entirely. Calm specifics plus proof of purchase make you easy to help.",
          keywords: ["smoking", "failed", "bank statement", "not change of mind", "defective", "refund or replacement", "serial", "normal use"],
        },
        {
          id: "s1b",
          tag: "Lead with the safety angle",
          line: "Honestly, my main concern is that it smoked and could have caught fire. I wanted you to know about the safety issue first. And then yes, I would like to talk about a refund.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction: "I appreciate you flagging that. We log safety complaints separately. Show me what happened with the unit.",
          principle:
            "Safety language changes what the conversation is about. Stores have real processes and real fears around hazardous products, and a genuine safety report gets attention a return request never will.",
          keywords: ["caught fire", "safety issue", "wanted you to know", "flag", "hazard", "smoked"],
        },
        {
          id: "s1c",
          tag: "Come in hot",
          line: "What you can do is refund me for this fire hazard you sold me before I post the video of it smoking all over the internet and call the consumer protection office.",
          points: -3,
          standing: -12,
          momentum: -5,
          reaction: "Sir, if you are going to threaten me, this conversation is going to be very short. Post whatever you like.",
          principle:
            "Opening with threats forces her to defend the store instead of helping you. Escalation is a card you keep in your pocket, and it only has value while it stays there.",
          keywords: ["post the video", "internet", "consumer protection", "threaten", "before I", "review"],
        },
        {
          id: "s1d",
          tag: "Apologize your way in",
          line: "I am so sorry to bother you, I know this is outside the window and I lost the receipt, and honestly you probably cannot do anything, but I figured I would at least ask.",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "Well, you are right that it is outside the window. Without a receipt there is really not much I can do.",
          principle:
            "You made her case for her before she said a word. Politeness is good. Pre-surrendering is not. Never open by listing the reasons you deserve to lose.",
          keywords: ["sorry to bother", "probably cannot do anything", "at least ask", "I know this is outside", "apologize", "lost the receipt"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Okay, but I need to understand what actually happened with the product.",
        principle: "State the facts in order: what you bought, what it did, what proof you have, what you want. A failed product is not a change-of-mind return, so do not let it be treated as one.",
      },
    },
    {
      id: "s2",
      prompt:
        "Here is my problem. Policy is thirty days with a receipt. You are at forty days with a bank statement. If I make exceptions for everyone with a sad story, the policy means nothing.",
      choices: [
        {
          id: "s2a",
          tag: "Ask what she can do",
          line: "I get that you cannot shred the policy for everyone. So let me ask it differently: for a product that failed from a defect, with proof of purchase from this store, what CAN you do? I suspect there is a defective-item process that is separate from the return window.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "...There is a defective merchandise process, yes. It needs proof of purchase, which a bank statement technically satisfies.",
          principle:
            "Gatekeepers say no to exceptions all day, but almost every policy has a second door. Asking what she can do, instead of arguing with what she cannot, invites her to open it for you.",
          keywords: ["what can you do", "defective-item process", "separate from the return window", "second door", "proof of purchase", "ask it differently"],
        },
        {
          id: "s2b",
          tag: "Point past the store policy",
          line: "The thirty days is your store's policy for returns, and I respect it. But a product that fails from a defect in six weeks is covered by the manufacturer's warranty and by basic consumer law, neither of which cares about your return window. I would rather solve it here with you than mail it to the manufacturer.",
          points: 5,
          standing: 8,
          momentum: 12,
          reaction: "You are not wrong about the warranty. We can process warranty claims in-store. It is slower than a return, but it exists.",
          principle:
            "Store return policy is one layer of your rights, not the whole of them. Naming the warranty calmly, while offering to keep things easy, gives her a legitimate path to yes that is not an exception.",
          keywords: ["manufacturer's warranty", "consumer law", "return window does not apply", "solve it here", "warranty claim", "rather with you"],
        },
        {
          id: "s2c",
          tag: "Argue the policy is dumb",
          line: "Thirty days is an arbitrary number some corporate office picked. You can see the purchase right here on my phone. Why are we pretending a piece of paper matters in this century?",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction: "The arbitrary number is the one I am employed to enforce. Is there anything else?",
          principle:
            "She did not write the policy and cannot be argued out of enforcing it. Attacking the rule makes her its defender. The move is never to fight the policy. It is to find the process the policy lives next to.",
          keywords: ["arbitrary", "corporate office", "piece of paper", "this century", "dumb policy", "pretending"],
        },
        {
          id: "s2d",
          tag: "Demand the corporate number",
          line: "Fine. Give me the number for corporate and your full name. I will take it up with someone who has actual authority.",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction: "It is on the website. And my name is on the badge. Have a good day, sir.",
          principle:
            "Going over her head while standing in front of her guarantees she stops helping, and corporate will route the complaint straight back to her store. Escalation before you have exhausted the person in front of you is just a slower no.",
          keywords: ["corporate", "your full name", "actual authority", "over your head", "take it up", "supervisor"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "The policy is the policy. Give me something to work with here.",
        principle: "Stop arguing with the return window. Ask what she can do for a defective product, and mention the manufacturer's warranty. There is almost always a second process.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright. Here is what I can offer without a receipt: store credit for the full one eighty, today, right now. A cash refund back to your card needs the warranty claim process, which takes two to three weeks and I cannot promise the outcome.",
      choices: [
        {
          id: "s3a",
          tag: "Probe the trade before choosing",
          line: "Help me weigh that. If the warranty claim is denied, do I lose the store credit offer, or does it stay on the table? And does the claim usually come back approved for a unit that visibly burned out?",
          points: 6,
          standing: 10,
          momentum: 13,
          reaction: "Fair questions. The credit offer stays either way, I will note it on the account. And honestly, visible burnout with proof of purchase almost always comes back approved.",
          principle:
            "When someone offers you a choice, the first move is not to choose. It is to find out what each branch really costs. Two questions just turned a gamble into a free shot at full cash back.",
          keywords: ["help me weigh", "if denied", "stays on the table", "usually approved", "before choosing", "what happens if", "probe"],
        },
        {
          id: "s3b",
          tag: "Take cash path with the credit as floor",
          line: "Then let us file the warranty claim for the card refund, and I would appreciate you noting the store credit offer on the account as the fallback. I can wait three weeks for it to be done right.",
          points: 5,
          standing: 8,
          momentum: 12,
          reaction: "Done. Claim filed, credit noted as fallback. You will hear within three weeks.",
          principle:
            "Cash beats credit because it does not lock you into shopping where the blender died. Taking the slower path while pinning the fallback in writing means you cannot end up worse off for waiting.",
          keywords: ["file the warranty claim", "card refund", "note the credit", "fallback", "wait three weeks", "done right"],
        },
        {
          id: "s3c",
          tag: "Grab the credit instantly",
          line: "Store credit today works. Let us just do that and be done.",
          points: 1,
          standing: 1,
          momentum: 4,
          reaction: "Easy enough. I will print the credit voucher now.",
          principle:
            "Not a disaster, but you took the first offer without asking a single question about the better one. The instant option is priced for people in a hurry, and the store is never the one paying for the hurry.",
          keywords: ["credit today works", "be done", "just do that", "first offer", "quick", "fine"],
        },
        {
          id: "s3d",
          tag: "Reject both and demand cash now",
          line: "Neither. I want cash back on my card today. You have the authority to do that and we both know it.",
          points: -3,
          standing: -10,
          momentum: -5,
          reaction: "What I have the authority to do is what I just offered. Both offers expire when I walk away from this counter.",
          principle:
            "She moved from no to two real offers, and you answered with an ultimatum. Pushing past a genuine concession does not read as strength. It reads as someone who cannot take yes for an answer.",
          keywords: ["cash today", "we both know", "neither", "demand", "you have the authority", "right now"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Those are the two options. Which one do you want?",
        principle: "Before picking between two offers, ask questions that reveal what each really costs: does the fallback survive, and how do claims usually resolve? Then choose with the odds visible.",
      },
    },
    {
      id: "s4",
      prompt:
        "Okay, the claim is in the system. Anything else you need from me before I get back to the floor?",
      choices: [
        {
          id: "s4a",
          tag: "Lock the details, thank her by name",
          line: "Two things and I am gone. Can I get the claim number and that note about the store credit on a printout or an email? And thank you, Dana, seriously. You did not have to find the second path and you did.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Here is the printout with both on it. And, thank you. Most people in this situation yell at me.",
          principle:
            "Paper turns a promise into a fact that survives shift changes and memory. And thanking a gatekeeper by name, for the specific thing she chose to do, costs nothing and is remembered longer than the refund.",
          keywords: ["claim number", "printout", "email", "thank you", "by name", "in writing", "second path"],
        },
        {
          id: "s4b",
          tag: "Confirm the timeline and who to call",
          line: "Just the practical bits: claim number, and if three weeks pass with no word, do I call the store and ask for you, or is there a claim line?",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "Claim number is on this slip. If it goes quiet, call the store and ask for me directly.",
          principle:
            "Every process that takes weeks needs a name attached to it before you leave. A claim with a follow-up path is a claim. A claim without one is a hope.",
          keywords: ["claim number", "three weeks", "who do I call", "ask for you", "follow up", "claim line"],
        },
        {
          id: "s4c",
          tag: "Leave without paperwork",
          line: "No, that is everything. Thanks for sorting it out.",
          points: -1,
          standing: -2,
          momentum: -2,
          reaction: "No problem. Have a good one.",
          principle:
            "Everything agreed in the last ten minutes exists only in the system notes you have never seen and the memory of a manager who talks to two hundred people a week. Walking out empty-handed puts your refund on faith.",
          keywords: ["that is everything", "no paperwork", "thanks", "walk out", "nothing else"],
        },
        {
          id: "s4d",
          tag: "Ask for extra compensation",
          line: "One more thing. Given the fire risk and the hassle, I think some kind of gift card on top would be appropriate here.",
          points: -2,
          standing: -7,
          momentum: -3,
          reaction: "The refund makes you whole for the blender. I am not paying you a bonus for owning it. We are done here.",
          principle:
            "There is a moment when a win is complete and every further ask starts unwinding it. She solved your actual problem. Squeezing for extras converts a grateful ally into someone rethinking her generosity.",
          keywords: ["gift card on top", "compensation", "for the hassle", "something extra", "appropriate", "on top"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So, are we good?",
        principle: "Get the claim number and the fallback offer in writing, learn who to call if it stalls, and say a real thank you. Then leave while you are ahead.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 40 },
      result: "won",
      baseGrade: "A",
      resolution:
        "Nineteen days later, one eighty lands back on your card. You never raised your voice, you have the paperwork in a drawer you never needed, and somewhere in that store is a manager who would help you again tomorrow.",
      lessons: [
        "A defective product is not a return. Naming the right category moves you out of the return policy entirely.",
        "Never argue with the policy. Ask what the person CAN do. Almost every no has a second process standing next to it.",
        "When offered a choice, question both branches before picking one. And get the outcome in writing with a name attached before you leave.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You leave with a store credit voucher for one eighty. Your money is back, sort of, as long as you spend it here, at the store whose blender caught fire. It is a draw that feels like one.",
      lessons: [
        "The instant option is priced for people in a hurry. Two more questions would have revealed the cash path was nearly a sure thing.",
        "Proof of purchase does not have to be a receipt. A bank statement plus a matching serial number satisfies most processes if you present it before conceding.",
        "Politeness works. Pre-surrendering does not. Never open by listing the reasons you deserve to lose.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "You leave with the dead blender under your arm and a one-star review half-typed in your pocket. The review will feel good for an hour. The one eighty is gone for good, and it did not have to be.",
      lessons: [
        "Threats force a gatekeeper to defend the store instead of helping you. Escalation only has value while it stays in your pocket.",
        "Going over someone's head while standing in front of them is a slower no. Exhaust the person present before invoking anyone absent.",
        "She did not write the policy. Attacking it makes her its defender. Finding the process beside it makes her your ally.",
      ],
    },
  ],
};
