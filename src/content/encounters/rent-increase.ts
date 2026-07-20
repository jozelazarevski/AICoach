import type { Encounter } from "../../game/types";

export const rentIncrease: Encounter = {
  id: "rent-increase",
  title: "The Rent Letter",
  difficulty: "measured",
  setting: "life",
  opponent: {
    name: "The Landlord",
    role: "Your landlord, who just sent a letter raising your rent eighteen percent",
    archetype: "Gatekeeper",
    blurb: "He is not a villain. He has a spreadsheet, a mortgage on the building, and no idea whether you will fight, fold, or leave. What happens next depends on which one he decides you are.",
  },
  scene:
    "The letter says your rent goes from $1,600 to $1,890 at renewal, sixty days out. You like the apartment. Moving would cost you at least two thousand dollars and a weekend of your life. You called the landlord and he picked up.",
  objective:
    "Get the increase down to something fair without burning the relationship or making threats you cannot afford to keep.",
  startStanding: 50,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt:
        "I figured I would hear from you. Look, everything has gone up: taxes, insurance, the water heater I replaced in the spring. What can I do for you?",
      choices: [
        {
          id: "s1a",
          tag: "Open with your record, then ask",
          line: "I hear you on costs. Before we get into numbers, I want to note what you have on this side: three years, rent on the first every month, no complaints, and I repainted the bedroom myself. I would like to find a number that keeps a tenant like that. How did you land on eighteen percent?",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "You have been a good tenant, no argument. The eighteen is what the two vacant units across the street are asking.",
          principle:
            "Your payment history is the strongest card you hold, and it works best played early and factually. Ending with a question about his math makes him defend the number instead of you attacking it.",
          keywords: ["three years", "on the first", "no complaints", "good tenant", "how did you land", "keep a tenant", "my record"],
        },
        {
          id: "s1b",
          tag: "Ask what is driving the number",
          line: "Help me understand the number first. Is eighteen percent covering real cost increases, or is it what the market listing sites say units are going for?",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "Some of both, honestly. Taxes went up about six percent. The rest is the market.",
          principle:
            "Separating real costs from market hope splits the increase into a part you should respect and a part you can negotiate. You cannot argue with his tax bill. You can argue with a listing site.",
          keywords: ["help me understand", "what is driving", "real cost", "market", "taxes", "or is it", "listing"],
        },
        {
          id: "s1c",
          tag: "Threaten to move out",
          line: "Eighteen percent? If that is the number, I will just move. There are cheaper places all over the neighborhood.",
          points: -3,
          standing: -10,
          momentum: -5,
          reaction: "That is your right. I would need your notice in writing by the end of the month.",
          principle:
            "A move-out threat only works if moving is genuinely cheaper than the increase, and he can do that math too. Bluff called, you now have to fold or actually spend two thousand dollars to save face.",
          keywords: ["I will just move", "cheaper places", "threaten", "find somewhere else", "walk", "move out"],
        },
        {
          id: "s1d",
          tag: "Appeal to fairness",
          line: "Honestly, eighteen percent feels wrong. I have been a good tenant and this is how I get treated?",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "It is not about treatment, it is about what the building costs to run. I am not doing this to you personally.",
          principle:
            "Fairness framing turns a numbers conversation into a feelings conversation, and he is holding the spreadsheet. Grievance makes him defensive. Data makes him negotiate.",
          keywords: ["feels wrong", "how I get treated", "not fair", "after everything", "deserve better", "unfair"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "So what are you asking me for, exactly?",
        principle: "Lead with your record as a tenant, then ask how he arrived at the number. Make him explain the eighteen before you fight it.",
      },
    },
    {
      id: "s2",
      prompt:
        "The two vacant units across the street are listed at nineteen hundred, so honestly I am pricing below market as it is.",
      choices: [
        {
          id: "s2a",
          tag: "Name the difference between listed and rented",
          line: "Those units are listed at nineteen hundred, and they have been listed for six weeks. Listed is not rented. Every month one sits empty costs the owner more than the difference we are talking about. I am offering you zero vacant months.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Six weeks, is it. You have been paying attention.",
          principle:
            "An asking price is a hope, not a fact. Vacancy is the landlord's real cost, and a reliable tenant who stays is worth more than a listing that might convert. Do the vacancy math for him out loud.",
          keywords: ["listed is not rented", "six weeks", "vacant", "empty costs", "zero vacant months", "asking price", "sits empty"],
        },
        {
          id: "s2b",
          tag: "Bring your own comparisons",
          line: "I looked before I called. Renewals in this building have been running eight to ten percent, and the unit above me went for seventeen fifty last month. I am not asking you to lose money. I am asking to be priced like a renewal, not a new listing.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "Where are you getting the seventeen fifty from? ...Actually, that sounds about right.",
          principle:
            "Specific numbers you gathered yourself beat general complaints every time. Renewal pricing versus new-listing pricing is a real distinction landlords use, and invoking it shows you know the game.",
          keywords: ["renewals", "eight to ten", "seventeen fifty", "priced like a renewal", "I looked", "not asking you to lose", "comparisons"],
        },
        {
          id: "s2c",
          tag: "Accept his framing",
          line: "I guess if that is what the market is, that is what it is. Maybe I could do seventeen fifty as a compromise?",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "Seventeen fifty is closer. Let me think about it.",
          principle:
            "You accepted his anchor and then bid against yourself in the same breath. He was defending nineteen hundred with a stale listing. You never made him prove it.",
          keywords: ["I guess", "that is what it is", "compromise", "maybe I could", "if that is the market", "fold"],
        },
        {
          id: "s2d",
          tag: "Attack his honesty",
          line: "Below market? Come on. You are quoting the two most overpriced listings on the street and hoping I do not check.",
          points: -2,
          standing: -8,
          momentum: -3,
          reaction: "I am not hoping anything. Check whatever you like. The number in the letter stands until you give me a reason to change it.",
          principle:
            "Being right about the listings does not require calling him dishonest. The same fact, delivered as vacancy math instead of accusation, would have moved the number instead of hardening it.",
          keywords: ["come on", "hoping I do not check", "overpriced", "dishonest", "accusation", "seriously"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "The market is the market. What is your counter?",
        principle: "Fight the listing with facts: listed is not rented, vacancy costs him real money, and renewals price lower than new leases.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright, you have done your homework. What number are you actually proposing, and why should I take it?",
      choices: [
        {
          id: "s3a",
          tag: "Offer a trade, not just a number",
          line: "Sixteen ninety, five and a half percent, covers your real cost increases. And I will sign a two-year lease at it. You get no vacancy, no turnover cost, and no re-listing next spring. That trade beats nineteen hundred from a stranger who might leave in a year.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Two years. Huh. Nobody has ever offered me that before.",
          principle:
            "A pure discount request asks him to lose. A trade gives him something the vacant units cannot: certainty. Longer lease terms are the cheapest currency a good tenant has, because you were probably staying anyway.",
          keywords: ["two-year lease", "sixteen ninety", "no vacancy", "no turnover", "trade", "certainty", "five and a half"],
        },
        {
          id: "s3b",
          tag: "Anchor low with your reasoning",
          line: "Sixteen fifty. That covers the six percent in real costs you named, with a little more on top. The market portion of the eighteen is built on listings that are not renting.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction: "Sixteen fifty is thin. But you are using my own numbers on me, which I respect.",
          principle:
            "Building your counter from figures he gave you makes it hard to reject without contradicting himself. An anchor with visible reasoning gets negotiated. An anchor without it gets dismissed.",
          keywords: ["sixteen fifty", "covers the six percent", "your own numbers", "real costs you named", "built on listings", "reasoning"],
        },
        {
          id: "s3c",
          tag: "Ask him to just be kind",
          line: "I am asking you to work with me here. Money is tight for everyone right now and every dollar matters.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction: "I understand, I do. But I cannot price the building on sympathy. Give me a number.",
          principle:
            "A hardship appeal without a number gives him nothing to say yes to. He may genuinely sympathize and still raise the rent, because sympathy is not a proposal.",
          keywords: ["work with me", "money is tight", "every dollar", "sympathy", "please", "hard right now"],
        },
        {
          id: "s3d",
          tag: "Refuse to go first",
          line: "You are the one raising the rent. You tell me what your real bottom number is and we will go from there.",
          points: -1,
          standing: -3,
          momentum: -2,
          reaction: "My real number is in the letter. That is what the letter is for.",
          principle:
            "Refusing to name a number when invited hands the anchor back to the side that already anchored high. He asked for a proposal. That was the door opening. You closed it.",
          keywords: ["you tell me", "your bottom number", "you go first", "not naming", "you are the one"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need an actual number from you.",
        principle: "Propose a specific number tied to his real costs, and attach a trade like a longer lease. Give him a reason to say yes that his spreadsheet understands.",
      },
    },
    {
      id: "s4",
      prompt:
        "Okay. Seventeen twenty-five, two-year lease, and I will throw in fixing that bathroom fan you mentioned last winter. Do we have a deal?",
      choices: [
        {
          id: "s4a",
          tag: "Accept and get it in writing",
          line: "Seventeen twenty-five, two years, bathroom fan fixed. Deal. Send me the new lease this week and just note the fan repair in the renewal email so we both remember the terms.",
          points: 6,
          standing: 11,
          momentum: 14,
          reaction: "Fair enough. I will email the lease tomorrow with the fan in it. Good talking to you, honestly.",
          principle:
            "That is a real win: under half the proposed increase, locked for two years. Closing cleanly and asking for the terms in writing, casually, without drama, is how the win survives contact with memory.",
          keywords: ["deal", "in writing", "send the lease", "note the fan", "this week", "both remember", "email"],
        },
        {
          id: "s4b",
          tag: "Push one last time",
          line: "Make it seventeen even and you have a deal on the spot.",
          points: 2,
          standing: 2,
          momentum: 6,
          reaction: "...Fine. Seventeen even, two years, and you are getting my final answer. Do not ask me for anything else this year.",
          principle:
            "The last-second nibble sometimes works, and it worked here. But notice the price: you spent the goodwill this negotiation built. Judge whether twenty-five dollars a month was worth being remembered as the tenant who squeezed.",
          keywords: ["seventeen even", "on the spot", "one last", "final push", "nibble", "make it"],
        },
        {
          id: "s4c",
          tag: "Say yes vaguely and hang up",
          line: "That works, I think. Okay. We will sort out the details whenever.",
          points: -1,
          standing: -3,
          momentum: -2,
          reaction: "Sure. I will get to the paperwork when I can.",
          principle:
            "A vague yes with no paper trail means the number can drift by renewal day and the fan gets fixed never. The close is not the agreement. The close is the agreement written down.",
          keywords: ["I think", "whenever", "sort out later", "vague", "we will see", "details later"],
        },
        {
          id: "s4d",
          tag: "Reopen everything",
          line: "Actually, thinking about it more, two years is a big commitment. Can we do seventeen twenty-five but keep it to one year?",
          points: -2,
          standing: -6,
          momentum: -3,
          reaction: "The seventeen twenty-five was FOR the two years. One year puts us back at the letter. Pick one.",
          principle:
            "The lease term was not a side detail. It was the thing you sold to get the number. Unwinding your own trade at the close tells him the whole negotiation might come apart, and the safest response is the letter.",
          keywords: ["big commitment", "keep it to one year", "actually", "thinking about it", "reopen", "changed my mind"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Is that a yes or a no?",
        principle: "Take the deal clearly and get every term into the written lease, including the small stuff like repairs. Wins that stay verbal have a way of shrinking.",
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
        "The lease arrives by email with seventeen twenty-five, a two-year term, and one line about the bathroom fan. You saved about two thousand dollars a year with a twenty-minute phone call, and your landlord thinks more of you than he did before it.",
      lessons: [
        "Your payment history is your strongest card. Play it early, factually, and without grievance.",
        "Listed is not rented. Vacancy is the landlord's real cost, and a reliable tenant who stays beats a hopeful listing.",
        "Trade things that cost you little, like a longer lease you wanted anyway, for money off. Then get every term in writing while the goodwill is warm.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You land somewhere around seventeen seventy-five on a one-year lease. Better than the letter, worse than it could have been, and you get to do this all again in twelve months.",
      lessons: [
        "Separate real cost increases from market hope. You cannot argue with a tax bill, but a stale listing is fair game.",
        "A counter built from numbers he gave you is hard to reject without self-contradiction.",
        "A hardship appeal without a number attached gives the other side nothing to say yes to.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The conversation goes sideways and the letter stands at eighteen percent. Now you are pricing moving trucks on your lunch break, and the cheapest option still costs more than the increase you refused.",
      lessons: [
        "Never threaten to move unless moving is genuinely cheaper and you are genuinely willing. Landlords can do that math too.",
        "Fairness arguments turn a numbers conversation into a feelings conversation, and the other side is holding the spreadsheet.",
        "Being right delivered as an accusation hardens the number. The same fact delivered as math moves it.",
      ],
    },
  ],
};
