import type { Encounter } from "../../game/types";

export const reorgScope: Encounter = {
  id: "reorg-scope",
  title: "The Reorg",
  difficulty: "pointed",
  opponent: {
    name: "The Manager",
    role: "Your manager redrawing the org and your scope",
    archetype: "Guarded Manager",
    blurb: "A reorg threatens to shrink your scope. Protect it without looking like you are grabbing.",
  },
  scene:
    "A reorg is moving through the organization and the lines are being redrawn this week. Your manager is the one holding the pen, and the early draft shrinks your scope. You meet him to protect what you own without coming across as territorial or self-serving.",
  objective:
    "Keep your scope intact by tying it to the outcomes the reorg needs, not to your ego or your title.",
  startStanding: 40,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "I am redrawing the lines this week. I will be straight with you, the early version moves a couple of your areas under another team to simplify things. I wanted you to hear it from me.",
      choices: [
        {
          id: "s1a",
          tag: "Tie scope to outcomes",
          line:
            "Thanks for being straight. Help me make this a good decision with you. Two of those areas are what hit the retention target the org is committed to next year. Where they sit should follow that outcome, not the other way around.",
          points: 6,
          standing: 11,
          momentum: 16,
          reaction:
            "That is a fair lens. If splitting them off puts the retention number at risk, that is exactly the kind of thing I need to weigh before I commit to lines on a chart.",
          principle:
            "Anchor your scope to an outcome the org cannot afford to drop. Lines on a chart bend around results, not the reverse.",
          keywords: ["outcome", "retention target", "follow the outcome", "good decision", "at risk", "results", "tie", "org commitment"],
        },
        {
          id: "s1b",
          tag: "Complain about fairness",
          line:
            "This is not fair. I built those areas up from nothing and now they are being taken from me without a conversation. That is not right.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "We are having the conversation right now. And reorgs are not about what is fair to any one person, they are about what the business needs. That framing is not going to help you here.",
          principle:
            "Arguing fairness makes the reorg about you. Managers redraw lines for the business, and a fairness plea reads as self-interest.",
          keywords: ["not fair", "built it up", "taken from me", "not right", "fairness", "mine", "deserve", "unfair"],
        },
        {
          id: "s1c",
          tag: "Ask the design goal",
          line:
            "Before I react, what is the reorg actually trying to fix. If I understand the goal, I can tell you where my areas help or get in the way.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Mostly cutting handoffs and clarifying ownership. If you can show me your areas reduce handoffs rather than add them, I am listening.",
          principle:
            "Understand the design goal before defending your turf. You cannot align your scope to a purpose you have not named.",
          keywords: ["design goal", "trying to fix", "understand", "handoffs", "ownership", "purpose", "where i help", "react"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Tell me how you actually see it, because right now you are just reacting.",
        principle: "In a reorg conversation, lead with the business lens, not a reaction. Reaction reads as territorial.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "Here is the tension. Keeping everything under you looks like empire building to the others in the room when I present this. Convince me it is not.",
        ifStandingBelow: [
          30,
          "And after how you just framed it, the empire building read is exactly where my head goes. Convince me otherwise.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Propose clean ownership",
          line:
            "Then let us not keep everything. Give me clean end to end ownership of retention and the activation surface, and move the rest out cleanly. Fewer seams, one accountable owner. That is the opposite of empire building.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "Now that I can present. You are giving things up to get a clean line, not hoarding. One throat to choke on retention actually makes my chart easier to defend.",
          principle:
            "Offer to give up the loose pieces in exchange for clean end to end ownership. Trading breadth for clarity reads as service, not greed.",
          keywords: ["clean ownership", "end to end", "give up the rest", "fewer seams", "accountable", "one owner", "trade", "service"],
        },
        {
          id: "s2b",
          tag: "Grab for more",
          line:
            "Actually, while the lines are open, this is the moment to also bring the analytics team and the partnerships group under me. Consolidate it all while we can.",
          points: -3,
          standing: -17,
          momentum: -5,
          reaction:
            "And there it is. I float that you might lose scope and you respond by reaching for two more teams. That is the exact empire building I was worried about. Hard no.",
          principle:
            "Reaching for more the moment scope is in play confirms the empire building fear. Overreach in a reorg is self-sabotage.",
          keywords: ["while open", "also bring", "analytics", "partnerships", "consolidate", "grab", "more teams", "under me"],
        },
        {
          id: "s2c",
          tag: "Show the cost of splitting",
          line:
            "It is not about size, it is about seams. Split retention from activation and you create a handoff that has burned us twice already. I can show you where it broke.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "If there is a real handoff cost with a track record, that is a business reason I can use, not a turf reason. Show me the two times.",
          principle:
            "Argue from the cost of splitting, not the size of your domain. A documented seam is a business case your manager can defend.",
          keywords: ["seams", "split", "handoff", "burned us", "cost", "track record", "broke", "interdependence"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Give me something I can say in the room that is not just you wanting to keep your stuff.",
        principle: "Counter the empire building read with a clean structural argument, not a defense of your possessions.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright. There is also a hard problem nobody wants in this reorg: the migration off the legacy platform. It is ugly and it is behind. Where does that land.",
      choices: [
        {
          id: "s3a",
          tag: "Take the hard problem",
          line:
            "Put it with me. I will own the legacy migration and get it back on track. Taking the ugly job is how I earn the scope, not by protecting the easy parts.",
          points: 5,
          standing: 10,
          momentum: 15,
          reaction:
            "That changes the conversation. Someone volunteering for the worst job in the reorg is not someone I worry about empire building. If you take the migration, your case for the rest gets a lot stronger.",
          principle:
            "Volunteer for the hard, unwanted problem. Taking on risk is the most credible way to justify scope and disarm the grabbing accusation.",
          keywords: ["take it", "legacy migration", "own it", "ugly job", "earn", "back on track", "hard problem", "volunteer"],
        },
        {
          id: "s3b",
          tag: "Threaten to leave",
          line:
            "I will be honest, if my scope gets carved up like this, I am going to have to think hard about whether I stay.",
          points: -3,
          standing: -16,
          momentum: -5,
          reaction:
            "Is that where we are. If your commitment depends on a box on a chart, that actually tells me you are easier to move than I thought. I do not negotiate scope against a resignation threat.",
          principle:
            "A resignation threat in a reorg signals your loyalty is conditional and makes you safer to cut, not harder. It is the weakest possible lever.",
          keywords: ["if my scope", "think about whether", "stay", "leave", "threaten", "resign", "carved up", "ultimatum"],
        },
        {
          id: "s3c",
          tag: "Offer to help scope it",
          line:
            "I do not have to own all of it, but I know that platform cold. Let me help scope the migration and staff it right, even if it formally sits elsewhere.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Useful. Even if you do not run it, having you shape it de-risks the worst part of this whole plan. I will take that.",
          principle:
            "Offering to help on a hard problem, even without owning it, shows you optimize for the org over your title and builds trust.",
          keywords: ["help scope", "know it cold", "staff it", "even if elsewhere", "de-risk", "shape", "contribute", "platform"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "So do you want to be part of solving the ugly thing or not.",
        principle: "When a hard problem is offered, leaning in builds the credibility that justifies your scope.",
      },
    },
    {
      id: "s4",
      prompt: "Okay. So how do I draw your box. Give me the version I can put on the chart and defend.",
      choices: [
        {
          id: "s4a",
          tag: "Propose the clean line",
          line:
            "Draw it as end to end ownership of retention, activation, and the legacy migration, with analytics and partnerships moving out cleanly. One accountable line tied to the retention number. Tight to defend, no loose threads.",
          points: 6,
          standing: 10,
          momentum: 18,
          reaction:
            "That I can present without flinching. Retention, activation, migration under you, the rest moved out clean. It reads as a decision about outcomes, not about you. Done.",
          principle:
            "Hand your manager a clean, defensible box tied to an outcome and you make saying yes the easy choice. Make his chart easy to defend.",
          keywords: ["end to end", "retention", "migration", "moving out clean", "accountable line", "defensible", "no loose threads", "outcome"],
        },
        {
          id: "s4b",
          tag: "Leave it to him",
          line: "I trust you to draw it however works. Just try to be fair to me when you do.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "Fair to you, again. When you leave the pen entirely to me and ask for fairness, the path of least resistance is to shrink your box, not grow it.",
          principle:
            "Handing over the pen and asking for fairness invites the default outcome, which in a reorg usually shrinks you. Propose the line yourself.",
          keywords: ["trust you", "however works", "be fair", "leave it", "your call", "default", "passive", "fairness"],
        },
        {
          id: "s4c",
          tag: "Squeeze for one more",
          line:
            "Good. And since we are drawing it, can you also pull partnerships back under me. It would round out the story nicely.",
          points: -2,
          standing: -11,
          momentum: -4,
          reaction:
            "We just agreed partnerships moves out, and you are already clawing it back. Do not turn a clean win into a grab at the finish line. The answer is no.",
          principle:
            "Squeezing for one more item at the close reopens the empire building fear and risks the clean deal you just earned. Bank it and stop.",
          keywords: ["also pull", "partnerships", "round out", "one more", "claw back", "grab", "at the close", "as well"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Give me the exact box. If you make me invent it, you will not like where my pen lands.",
        principle: "At the close, propose the precise, outcome-tied line yourself, or you inherit the default that shrinks you.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 40 },
      result: "won",
      baseGrade: "A",
      resolution:
        "Your scope survives the reorg, and it grows in substance. You walk out owning retention, activation, and the migration nobody wanted, with a clean line your manager can defend as a decision about outcomes rather than about you.",
      lessons: [
        "Tie your scope to an outcome the org cannot drop. Lines on a chart bend around results.",
        "Trade loose pieces for clean end to end ownership so you read as service, not greed.",
        "Volunteer for the hard, unwanted problem. Taking on risk is the most credible claim to scope.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You hold most of your scope, but a passive moment or a structural argument that did not fully land leaves the lines softer than they could have been. You kept your ground without strengthening it.",
      lessons: [
        "Business framing protected you, but leaving the pen to your manager invited the shrinking default.",
        "Argue from outcomes and the cost of splitting, not from size or possession.",
        "Propose the precise, defensible box yourself rather than asking to be treated fairly.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Your scope gets carved up. By pleading fairness, grabbing for more, or threatening to leave, you confirmed the empire building read and made yourself the easy thing to cut. You leave smaller than you started.",
      lessons: [
        "Fairness pleas make the reorg about you, which is exactly the wrong frame.",
        "Reaching for more the moment scope is in play confirms the grabbing fear and sinks your case.",
        "A resignation threat signals conditional loyalty and makes you safer to cut, not harder.",
      ],
    },
  ],
};
