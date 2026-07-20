import type { Encounter } from "../../game/types";

export const familyLoan: Encounter = {
  id: "family-loan",
  title: "The Family Loan",
  difficulty: "pointed",
  setting: "life",
  opponent: {
    name: "Your Brother",
    role: "Your younger brother, asking to borrow eight thousand dollars for a food truck",
    archetype: "Close to Home",
    blurb: "He still owes you twelve hundred from three years ago that neither of you mentions. You have fifteen thousand saved toward a house. He is family, he is serious this time, and he is sitting at your kitchen table. There is no version of this where you just win.",
  },
  scene:
    "Sunday dinner is over and your brother stayed to help with the dishes, which he never does. Then he sits back down at the kitchen table and says he has found a used food truck, fully equipped, and the owner needs an answer by Friday. He needs eight thousand dollars.",
  objective:
    "Protect your savings and your relationship at the same time. Both. That is the whole game.",
  startStanding: 55,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "Eight grand, and I know how that sounds. But I have been cooking on weekends for two years, I have actual customers asking where to find me, and this truck is half what they usually go for. I need to know by Friday. Will you help me?",
      choices: [
        {
          id: "s1a",
          tag: "Take him seriously before deciding anything",
          line: "Before I say anything about money, I want to hear the whole plan. Not the truck, the business. What do the weekends bring in now, what does a permit cost, where do you park it, what happens in winter? Walk me through it like I am a stranger.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Nobody has asked me that. Mom just said be careful. Okay. So Saturdays I clear about four hundred...",
          principle:
            "Hearing the full plan before touching the yes-or-no does two things at once: it honors him as an adult with a business idea, and it gets you the information a real decision needs. Respect first, numbers second.",
          keywords: ["whole plan", "walk me through", "what do weekends bring", "permit", "winter", "like a stranger", "the business not the truck"],
        },
        {
          id: "s1b",
          tag: "Name the stakes on your side",
          line: "I am not saying no. I want you to know what you are asking, though. That money is the house fund, more than half of it. So this is not can I spare it, it is us deciding together whether your truck comes before my down payment. Now tell me about the plan.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "I did not know it was that much of your savings. That changes... no, I still want to show you the plan. But thank you for telling me.",
          principle:
            "Letting him see your real stakes early keeps resentment from compounding in the dark. He cannot weigh a cost he cannot see, and hidden sacrifice always finds a worse way to surface later.",
          keywords: ["house fund", "half of it", "what you are asking", "down payment", "deciding together", "my savings", "know the stakes"],
        },
        {
          id: "s1c",
          tag: "Say yes on the spot",
          line: "You know what, you are my brother. Eight grand, done. Do not even worry about it.",
          points: -3,
          standing: -8,
          momentum: -5,
          reaction: "Seriously? Just like that? You are the best. I will pay you back so fast, I promise.",
          principle:
            "The instant yes feels like love and works like a time bomb. No terms, no plan reviewed, no repayment shape, and 'do not worry about it' guarantees that when you do worry about it, you will look like the one who changed.",
          keywords: ["done", "do not worry about it", "just like that", "instant yes", "of course", "no questions"],
        },
        {
          id: "s1d",
          tag: "Open with the old debt",
          line: "Eight thousand? You still owe me twelve hundred from the car thing three years ago. We are really doing this again?",
          points: -3,
          standing: -12,
          momentum: -5,
          reaction: "Wow. Okay. I knew you were keeping score this whole time. Forget it, I should not have asked.",
          principle:
            "The old debt is real and belongs in this conversation, but as an opening blow it is not information, it is an indictment. Lead with it and the conversation becomes about three years ago instead of about Friday.",
          keywords: ["still owe me", "twelve hundred", "doing this again", "car thing", "keeping score", "last time"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So... is that a maybe? I cannot tell what you are thinking.",
        principle: "Do not answer the money question yet. Ask for the whole plan first. Taking the idea seriously is the respect, and the plan is the information.",
      },
    },
    {
      id: "s2",
      prompt:
        "So you are with me so far. Look, I know I still owe you from the car. I have not forgotten. But this is different, this is a real business. You are honestly the only person I can ask.",
      choices: [
        {
          id: "s2a",
          tag: "Fold the old debt in gently",
          line: "I am glad you brought up the car money, because I did not want it sitting under the table while we talk. Here is what it tells me: not that you are a bad bet, but that between us, loans without a plan turn into weight. So whatever we do this time, we do with real terms on paper. Deal?",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "That is... fair. Honestly it has been sitting on me too. Okay. Real terms. What does that look like?",
          principle:
            "He opened the door to the old debt, and walking through it gently converts it from ammunition into evidence for structure. The lesson is not 'you failed me.' The lesson is 'casual money hurt us both, so this time we do it right.'",
          keywords: ["glad you brought it up", "under the table", "turn into weight", "terms on paper", "do it right this time", "not a bad bet"],
        },
        {
          id: "s2b",
          tag: "Push back on 'only person'",
          line: "I hear you, but 'only person I can ask' is not quite true, and it matters. A bank, a credit union, equipment financing on the truck itself. If the plan is as solid as you say, some of this money can come from someone who is not at Sunday dinner. Have you tried?",
          points: 5,
          standing: 8,
          momentum: 12,
          reaction: "The bank said I need two years of business income, which I will not have until I have the truck. But no, I did not try equipment financing. I did not know that existed.",
          principle:
            "'You are the only one' is pressure wearing the costume of a compliment. Testing it against real alternatives either shrinks the ask to a safer size or reveals what banks saw that made them pass. Both answers are worth having.",
          keywords: ["only person is not true", "bank", "credit union", "equipment financing", "have you tried", "someone not at dinner"],
        },
        {
          id: "s2c",
          tag: "Wave the old debt away",
          line: "Forget the car money, that is ancient history, it does not matter. Let us just talk about the truck.",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "See, this is why you are the best. So anyway, the owner said Friday, but honestly Wednesday would lock it in...",
          principle:
            "He offered you the old debt and you handed it back. It did matter, it does matter, and waving it away teaches him that debts to you evaporate if he waits long enough. Kindness that erases history is not kindness, it is training.",
          keywords: ["ancient history", "does not matter", "forget it", "wave away", "just the truck", "water under the bridge"],
        },
        {
          id: "s2d",
          tag: "Make him earn it emotionally",
          line: "The only person you can ask. Where was all this brotherly closeness when I moved apartments in the rain and you had a thing that weekend?",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction: "Are we really doing a whole inventory right now? I knew this was a mistake.",
          principle:
            "Every family has a ledger of small grievances, and reaching for it mid-negotiation means the money conversation is now a relationship audit. Whatever this was about, it is not about that anymore.",
          keywords: ["where were you when", "moved apartments", "brotherly closeness", "had a thing", "inventory", "grievance"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I feel like there is something you want to say. Just say it.",
        principle: "Use the old debt as a reason for structure, not as a weapon. And test the 'only person I can ask' claim against real alternatives like equipment financing.",
      },
    },
    {
      id: "s3",
      prompt:
        "Okay, real terms, I am in. But the equipment financing thing would take weeks I do not have. The owner needs an answer Friday. So what are you actually able to do?",
      choices: [
        {
          id: "s3a",
          tag: "Offer less than the ask, shaped safely",
          line: "Here is what I can do and stay okay if it goes wrong: three thousand, written up, repaid at two hundred a month starting when the truck starts selling. Not eight. Three is the number where, if the business fails, I am sad and not wrecked, and Christmas is still Christmas. The other five, we look at the equipment financing together this week.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Three plus help chasing the rest... that could actually work. The owner might take three down to hold it. You would really sit with me on the financing?",
          principle:
            "The only safe family loan is one you can afford to lose entirely. Naming that number out loud, with the reason attached, is not stinginess. It is the honesty that keeps Thanksgiving intact if the truck fails.",
          keywords: ["three thousand", "afford to lose", "two hundred a month", "written up", "not wrecked", "financing together", "sad not wrecked"],
        },
        {
          id: "s3b",
          tag: "Offer a smaller gift instead of a loan",
          line: "Counter-offer. I give you fifteen hundred, and it is not a loan, it is a gift, my investment in my brother, no repayment ever. Plus the car money is wiped, officially. That is twenty-seven hundred of weight off both of us, and nobody owes anybody anything.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "A gift? That is... man. It is less than I need, but it might be the first money anyone has given me with no strings since I was a kid.",
          principle:
            "A gift you choose is often cheaper than a loan you resent. It caps your loss at a number you picked, deletes the old debt cleanly, and means no future dinner ever features you doing repayment math in your head.",
          keywords: ["gift not a loan", "fifteen hundred", "no repayment", "car money wiped", "nobody owes", "no strings"],
        },
        {
          id: "s3c",
          tag: "Give the full eight to end the pressure",
          line: "Okay. Okay. Eight thousand, we will write something up, just... tell the owner yes before Friday stops mattering.",
          points: -3,
          standing: -8,
          momentum: -5,
          reaction: "YES. You will not regret this. I am calling him right now.",
          principle:
            "The deadline did what deadlines do. Over half the house fund is now riding on a first-time business, and the terms got promised in a sentence that started with two okays and a just. That is not a decision, it is surrender with paperwork.",
          keywords: ["okay okay", "full eight", "before Friday", "write something up", "fine", "call him"],
        },
        {
          id: "s3d",
          tag: "Offer to co-sign instead",
          line: "What if I do not lend you anything, but I co-sign the equipment financing? My credit gets you approved, no cash leaves my account, everybody wins.",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "Wait, really? That would totally work. You would just have to sign some stuff.",
          principle:
            "Co-signing is not a smaller favor, it is a bigger one wearing a disguise. You just became legally liable for the whole amount, attached your credit score to a food truck, and kept none of the control a lender at least has.",
          keywords: ["co-sign", "my credit", "no cash leaves", "everybody wins", "just sign", "guarantee"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something concrete, the guy is waiting on me.",
        principle: "Offer the number you could lose without wrecking your plans or your holidays, shaped as either a smaller written loan or a clean gift. The deadline is his, not yours.",
      },
    },
    {
      id: "s4",
      prompt:
        "Deal. Honestly, better than I hoped for once you started asking the hard questions. So do we shake on it, or what happens now?",
      choices: [
        {
          id: "s4a",
          tag: "Write it down together, tonight",
          line: "We write it down right now, together, while it feels good. One page: the amount, the monthly number, when it starts, and what happens if a month gets missed, which is that you tell me early instead of avoiding me. Then we both sign it and I transfer the money tonight.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "One page. 'Tell you early instead of avoiding you.' You know that is exactly what I did last time. Okay. Get a pen.",
          principle:
            "Writing it down while everyone is warm is protecting the relationship, not doubting it. The missed-month clause matters most: the plan for bad news, made in advance, is what keeps a late payment from becoming a lost brother.",
          keywords: ["write it down now", "one page", "both sign", "missed month", "tell me early", "tonight", "while it feels good"],
        },
        {
          id: "s4b",
          tag: "Add one honest sentence about the risk",
          line: "We shake, and then we paper it tomorrow. But first, look at me: if the truck fails, the money is the small loss. You avoiding me at Christmas because you are embarrassed, that is the big one. If it goes wrong, you show up anyway. That is the real term.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction: "That is the part I was actually scared of. Not the money. Okay. I show up anyway. Deal.",
          principle:
            "Money debts get repaid or forgiven, but shame is the thing that actually breaks families. Naming the avoidance risk out loud, before it exists, is the single best insurance this deal can carry.",
          keywords: ["show up anyway", "embarrassed", "avoiding me", "Christmas", "real term", "the big loss", "look at me"],
        },
        {
          id: "s4c",
          tag: "Seal it with just a handshake",
          line: "We are brothers. A handshake is plenty. Papers are for strangers.",
          points: -2,
          standing: -5,
          momentum: -3,
          reaction: "See, this is why I came to you and not a bank. Handshake it is.",
          principle:
            "Papers are not for strangers, they are for futures. In a year, his memory will say the repayment was 'whenever things pick up' and yours will say January, and both of you will be sincere. The handshake did this exact thing last time.",
          keywords: ["handshake is plenty", "papers are for strangers", "we are brothers", "no paperwork", "trust", "just shake"],
        },
        {
          id: "s4d",
          tag: "Announce it to the family",
          line: "One condition: we tell Mom and the whole table what we agreed, so everyone knows the terms and you have some accountability.",
          points: -2,
          standing: -7,
          momentum: -3,
          reaction: "You want to announce my loan terms at Sunday dinner? Like a press conference about how I cannot handle money? Why not just put it in the group chat?",
          principle:
            "Witnesses feel like accountability but function as humiliation. This agreement needs exactly two people and one page. Turning his ask into family theater converts your generosity into his public debt, and he will not forgive the audience.",
          keywords: ["tell Mom", "whole table", "everyone knows", "accountability", "announce", "family knows"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So how do we make it official?",
        principle: "Put it on one page tonight, both sign, and include the plan for a missed month: he tells you early instead of disappearing. The paper protects the relationship, not just the money.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 50 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The truck opens in spring with three thousand of your money, equipment financing you found together, and a one-page agreement on your fridge held up by a pizza magnet. He pays on time mostly, tells you early once, and brings the family free tacos every Sunday. The house fund is still a house fund.",
      lessons: [
        "Hear the whole plan before answering the money question. Taking the idea seriously is the respect, and the plan is the information.",
        "Only lend family what you could lose entirely without wrecking your plans or your holidays. Say that number and the reason for it out loud.",
        "Write it down while everyone is warm, including what happens when a payment is missed. The plan for bad news, made in advance, is what saves the relationship from it.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "Money moved, the truck got bought, and things are fine, roughly. But the terms live in two different memories, and lately you catch yourself doing repayment math during dinner. Nothing is broken. Something is quietly loaded.",
      lessons: [
        "A gift you choose is often cheaper than a loan you resent. It caps the loss and deletes the future bookkeeping.",
        "'You are the only one I can ask' is pressure dressed as a compliment. Test it against banks and equipment financing before accepting it.",
        "The old debt belongs in the conversation as a reason for structure, never as an opening accusation.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Either the money left with no terms and Friday's deadline doing the deciding, or the conversation detonated over a three-year-old car repair. Both ways, the next family dinner has a new empty chair or a new silence, and the food truck was never really the subject.",
      lessons: [
        "The instant yes feels like love and works like a time bomb. No terms means the fight is scheduled, just not dated.",
        "His deadline is not your deadline. Urgency borrowed from a truck owner is still borrowed pressure.",
        "Co-signing is a bigger favor than lending, wearing a smaller favor's clothes. Full liability, zero control.",
      ],
    },
  ],
};
