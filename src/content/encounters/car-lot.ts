import type { Encounter } from "../../game/types";

export const carLot: Encounter = {
  id: "car-lot",
  title: "The Car Lot",
  difficulty: "measured",
  setting: "life",
  opponent: {
    name: "The Salesman",
    role: "A used car salesman who does this forty times a week",
    archetype: "Deal Maker",
    blurb: "You found a car you actually want. He knows the moment you fall in love with it, the price stops mattering. You have done your research. He has done this his whole life.",
  },
  scene:
    "You are at a used car lot looking at a five-year-old sedan listed at $16,500. You checked the pricing guides last night: similar cars sell for $14,000 to $15,000. The salesman walks over before you have finished reading the window sticker.",
  objective:
    "Buy the car for a fair price without getting rushed, spun, or loaded up with extras you do not need.",
  startStanding: 50,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "Beautiful car, right? It just came in Tuesday and I already have two people coming back to look at it this afternoon. What would it take to get you driving it home today?",
      choices: [
        {
          id: "s1a",
          tag: "Stay flat and name your research",
          line: "It might be the right car. I checked the pricing guides last night and similar ones are selling for fourteen to fifteen. Before we talk about today, I want to see the service history and take it to my mechanic.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "You have done your homework. The service records are inside. The mechanic thing takes a day to arrange.",
          principle:
            "Answering urgency with research changes who is running the conversation. The two buyers this afternoon may or may not exist. Your pricing data definitely does.",
          keywords: ["pricing guides", "fourteen", "fifteen", "service history", "mechanic", "checked", "research", "before we talk"],
        },
        {
          id: "s1b",
          tag: "Ask about the car before the deal",
          line: "Tell me about the car first. How many owners, any accidents, and why did the last person get rid of it?",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "One owner, clean report, it was a lease return. You want to see the paperwork?",
          principle:
            "Making him talk about the car instead of the deal slows the tempo. Every question you ask before naming a number is a question he has to answer on the record.",
          keywords: ["tell me about", "how many owners", "accidents", "lease", "paperwork", "car first", "why did"],
        },
        {
          id: "s1c",
          tag: "Show him you love it",
          line: "Honestly, this is exactly what I have been looking for. I have wanted this model for years.",
          points: -3,
          standing: -10,
          momentum: -5,
          reaction: "Then today is your lucky day. Let me grab the keys so you can feel how she drives.",
          principle:
            "The moment he knows you want this specific car, every number that follows gets worse. Enthusiasm is the most expensive thing you can bring to a car lot.",
          keywords: ["exactly what I have been looking for", "wanted this for years", "love it", "perfect", "dream car", "always wanted"],
        },
        {
          id: "s1d",
          tag: "Play tough from the start",
          line: "Save the pitch. I know how this works and I am not paying anywhere near sticker.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction: "No pitch, friend. The price is on the window. Some cars sell for sticker, some do not. Want to look around?",
          principle:
            "Opening hostile costs you information. A salesman who likes talking to you tells you things: how long the car has sat, what the manager will really take. One who does not just waits you out.",
          keywords: ["save the pitch", "know how this works", "not paying", "sticker", "tough", "cut to it"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So are you a buyer today or just kicking tires?",
        principle: "Do not answer the urgency question. Ask about the car, name your research, and set your own pace.",
      },
    },
    {
      id: "s2",
      prompt:
        "Let me ask you this so I can help you: what monthly payment are you comfortable with?",
      choices: [
        {
          id: "s2a",
          tag: "Refuse the monthly frame",
          line: "Let us not do payments. I want to agree on the total price of the car first. Once we have that number, we can talk about how I pay for it.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Fair enough. Total price it is. Where do you need to be?",
          principle:
            "The monthly payment question is the oldest trick on the lot. Any total can be made to fit any monthly number if the loan is long enough. Negotiate the price of the car. Only the price of the car.",
          keywords: ["total price", "not payments", "not monthly", "agree on the price first", "price of the car", "how I pay later"],
        },
        {
          id: "s2b",
          tag: "Anchor below your target",
          line: "Payments are not the conversation. On price, the guides say fourteen for this car, and it has the scratched bumper, so I am thinking thirteen five.",
          points: 5,
          standing: 8,
          momentum: 12,
          reaction: "Thirteen five is not happening. But bring me something real and I will take it to my manager.",
          principle:
            "An anchor below your true target gives the negotiation room to land where you actually want it. Naming a flaw with the anchor makes the number feel reasoned instead of rude.",
          keywords: ["thirteen five", "guides say", "scratched bumper", "anchor", "thinking thirteen", "flaw"],
        },
        {
          id: "s2c",
          tag: "Tell him your monthly budget",
          line: "I can do about four hundred a month, maybe four fifty if the car is right.",
          points: -3,
          standing: -10,
          momentum: -5,
          reaction: "Four fifty, we can absolutely work with that. Let me show you what we can do over seventy-two months.",
          principle:
            "You just told him exactly how much money to extract per month, and he will stretch the loan until the total hits the ceiling of it. The car's price never even came up.",
          keywords: ["four hundred a month", "monthly budget", "a month", "four fifty", "per month", "can do about"],
        },
        {
          id: "s2d",
          tag: "Announce you are paying cash",
          line: "There will not be payments. I am paying cash, so give me your best cash price.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction: "Cash, huh. The price is the price, but let us see what we can do.",
          principle:
            "Dealers make money on financing, so cash buyers often get worse prices, not better. Keep the payment method to yourself until the price is settled. It is a card you play at the end, not the start.",
          keywords: ["paying cash", "cash price", "no payments", "best cash", "cash buyer"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Everybody has a budget. Help me help you.",
        principle: "Never negotiate the monthly payment. Move the conversation to the total price of the car and keep it there.",
      },
    },
    {
      id: "s3",
      prompt:
        "Okay, I took it to my manager. He says fifteen nine, and honestly he is doing you a favor at that. But that number is only good today.",
      choices: [
        {
          id: "s3a",
          tag: "Treat the deadline as noise",
          line: "If the car is worth fifteen nine tomorrow, it is worth fifteen nine next week. My number is fourteen two based on the guides and the bumper. If that does not work today, leave me your card and call me if it starts working.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Hold on, do not run off. Let me make one more trip to the manager's office.",
          principle:
            "The today-only price is theater. A real willingness to walk out is the single strongest move a buyer has, and it only works if you are actually willing.",
          keywords: ["worth the same tomorrow", "fourteen two", "leave me your card", "call me", "walk", "next week", "if that does not work"],
        },
        {
          id: "s3b",
          tag: "Make him justify the number",
          line: "Fifteen nine against a fourteen thousand guide price is a big gap. What exactly about this car earns the extra nineteen hundred?",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction: "New tires, one owner, and the certified inspection. That is real money.",
          principle:
            "Making him itemize the premium turns a vague number into a list you can attack piece by piece. Some items on the list will be real. Most will not survive scrutiny.",
          keywords: ["big gap", "what earns", "justify", "extra nineteen hundred", "guide price", "itemize", "what exactly"],
        },
        {
          id: "s3c",
          tag: "Split the difference reflexively",
          line: "Let us just meet in the middle. Call it fifteen even and we are done.",
          points: -1,
          standing: -3,
          momentum: -2,
          reaction: "Fifteen even. Let me see if I can get him there. I think we are close.",
          principle:
            "Splitting the difference feels fair but rewards whoever anchored higher, and he anchored first. You just negotiated against yourself and skipped everything your research told you.",
          keywords: ["meet in the middle", "split", "fifteen even", "call it", "we are done", "middle"],
        },
        {
          id: "s3d",
          tag: "Fold to the deadline",
          line: "If it is only good today, then okay. Fifteen nine. I do not want to lose the car.",
          points: -3,
          standing: -10,
          momentum: -5,
          reaction: "Smart move. Let me get the paperwork started before he changes his mind.",
          principle:
            "You paid nineteen hundred over guide price to defuse a deadline the salesman invented. Fear of losing the deal is the exact feeling the today-only line exists to create.",
          keywords: ["okay fifteen nine", "do not want to lose", "only good today", "fine", "take it", "accept"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So where are we? My manager needs an answer.",
        principle: "Ignore the deadline, restate your researched number, and mean it when you head for the door. The number will follow you out.",
      },
    },
    {
      id: "s4",
      prompt:
        "Fourteen six, final, and my manager is already unhappy with me. Now, in the finance office there are a few protection packages everyone takes: extended warranty, paint sealant, tire coverage. It is about forty a month all in.",
      choices: [
        {
          id: "s4a",
          tag: "Take the win, strike the extras",
          line: "Fourteen six works. And no to all three packages. If anything shows up on the paperwork besides the car, tax, and the required fees, I am not signing it.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "No packages. You drive a hard deal. Give me twenty minutes on the paperwork.",
          principle:
            "The finance office is where dealers win back everything they gave up on the price. Deciding no before you walk in, and saying it out loud, is the only reliable defense.",
          keywords: ["fourteen six works", "no to all three", "nothing besides the car", "not signing", "no packages", "required fees only"],
        },
        {
          id: "s4b",
          tag: "Ask what the forty a month really costs",
          line: "Forty a month over the loan is about three thousand dollars. Say the actual price of each package out loud and tell me which ones I can add later if I change my mind.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "When you put it that way, the warranty is twenty-two hundred and yes, you can buy it any time in the first year.",
          principle:
            "Per-month pricing exists to make three thousand dollars sound like lunch money. Converting it back to a total, and learning what can be bought later, usually ends the pitch on its own.",
          keywords: ["three thousand", "actual price", "out loud", "add later", "over the loan", "total cost", "each package"],
        },
        {
          id: "s4c",
          tag: "Accept the packages to be done",
          line: "Fine, include the packages. It is only forty a month and I just want to finish and drive home.",
          points: -3,
          standing: -8,
          momentum: -5,
          reaction: "You will not regret it. Let me write it all up.",
          principle:
            "You negotiated hard for an hour and then gave back three thousand dollars in the last five minutes because you were tired. That is not bad luck. That is the design of the process.",
          keywords: ["include the packages", "only forty", "just want to finish", "fine", "drive home", "whatever"],
        },
        {
          id: "s4d",
          tag: "Reopen the price fight",
          line: "Actually, if you can afford to throw in packages, fourteen six is clearly not your floor. Make it fourteen two.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction: "The packages are separate money, friend. Fourteen six was real. Do we have a deal or not?",
          principle:
            "Reopening a settled number at the finish line burns goodwill for pennies. You had the win. The packages were a new fight, and declining them was the whole battle.",
          keywords: ["not your floor", "make it fourteen two", "reopen", "clearly", "if you can afford"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So the packages: yes or no?",
        principle: "Say no to the finance office extras plainly and completely. Anything worth buying there can be bought later, cheaper, without a loan wrapped around it.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 45 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You drive off at fourteen six with no add-ons, about two thousand under sticker. The salesman shakes your hand and means it. People who hold a number calmly are rare, and he remembers them.",
      lessons: [
        "Never negotiate the monthly payment. Agree on the total price of the car first and keep the payment method to yourself until the end.",
        "The today-only deadline is theater. A calm, researched number plus a genuine willingness to walk beats every trick on the lot.",
        "The finance office is the second negotiation. Decide no on the extras before you walk in, and convert every per-month price back into a total.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You get the car for around fifteen two. Not a robbery, not a win. Somewhere in the conversation you gave up ground you did not need to give, and you both know where.",
      lessons: [
        "Asking questions about the car before talking numbers slows the tempo and puts you in charge of the pace.",
        "Splitting the difference rewards whoever anchored first, and the seller always anchors first.",
        "Make the seller itemize any premium over guide price. Most of the list will not survive being said out loud.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "You pay close to sticker plus three thousand in packages you will never use, financed over seventy-two months. The salesman waves warmly as you leave. Of course he does.",
      lessons: [
        "Enthusiasm is the most expensive thing you can bring to a car lot. The moment they know you want this exact car, the price stops moving.",
        "Naming your monthly budget tells the dealer exactly how much to extract. The loan term will stretch until it fits.",
        "Deal fatigue is a tactic, not an accident. The extras are pitched at the end because that is when you stop fighting.",
      ],
    },
  ],
};
