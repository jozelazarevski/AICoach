import type { Encounter } from "../../game/types";

export const matrixConflict: Encounter = {
  id: "matrix-conflict",
  title: "The Two-Boss Problem",
  difficulty: "adversarial",
  opponent: {
    name: "The Program Sponsor",
    role: "A VP who co-controls your time with your functional manager",
    archetype: "Skeptical Principal",
    blurb: "Your functional manager and your program sponsor both think they own your next two months. You need to resolve it without playing one against the other.",
  },
  scene:
    "You are in a matrix. Your functional manager, Sandra, has asked you to lead a critical internal build that runs through December. Your program sponsor, the VP of Strategy, has simultaneously committed your time to a client-facing initiative for the same period. Neither knows the other made this claim on your time. You are in a meeting with the VP of Strategy right now, and you have to decide whether and how to surface the conflict.",
  objective:
    "Surface the conflict without making either leader look bad, and leave the conversation with a clear path to a real resolution, not a vague hope that it sorts itself out.",
  startStanding: 42,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "I want to confirm that you are fully available for the client initiative starting next Monday. We are locking the team composition this week.",
      choices: [
        {
          id: "s1a",
          tag: "Surface the conflict now",
          line:
            "I need to raise something with you before we confirm. Sandra has committed my time to an internal build through December. I do not think she knew about this initiative when she did it. Before you lock the team, I want to make sure we resolve it the right way rather than leave you with a commitment I cannot fully honor.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "I was not aware of the internal build. What is the scope and who else knows about this conflict.",
          principle:
            "Surfacing the conflict before being locked in is always better than surfacing it after. It signals integrity and prevents a larger failure later.",
          keywords: ["raise something", "conflict", "Sandra", "internal build", "before you lock", "resolve the right way", "fully honor", "need to tell you"],
        },
        {
          id: "s1b",
          tag: "Confirm and deal with it later",
          line:
            "Yes, I will be available. I will work out the details on my end.",
          points: -3,
          standing: -6,
          momentum: -6,
          reaction:
            "Good. You are locked in. I will send the briefing today.",
          principle:
            "Confirming availability when you have a known conflict sets up a larger failure when the conflict surfaces under pressure. You now own the breach of both commitments.",
          keywords: ["yes", "available", "will work it out", "details later", "confirm", "locked in", "figure it out"],
        },
        {
          id: "s1c",
          tag: "Deflect the confirmation",
          line:
            "Can I get back to you by end of day. I need to check a few things.",
          points: 2,
          standing: 0,
          momentum: 3,
          reaction:
            "I need an answer today. What is the hold-up.",
          principle:
            "Delaying without naming the reason reads as evasive. You have the information to surface the conflict now. Waiting gives neither leader the chance to solve it.",
          keywords: ["get back to you", "check a few things", "end of day", "delay", "hold up", "need to check"],
        },
        {
          id: "s1d",
          tag: "Ask about priority",
          line:
            "Before I confirm, I want to understand from you how this initiative ranks against a significant internal commitment. Are you the right person to make that call or does it need to go to both you and Sandra.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "I was not aware there was an internal commitment competing for your time. Tell me about it.",
          principle:
            "Framing the conflict as a priority question rather than a scheduling problem elevates the conversation and positions you as someone thinking about the organization's tradeoffs, not just your own.",
          keywords: ["priority", "how this ranks", "right person", "Sandra", "both of you", "competing", "need to go up"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a clear answer on your availability.",
        principle: "Surface the conflict now. Confirming availability when you have a known conflict sets up a larger failure.",
      },
    },
    {
      id: "s2",
      prompt:
        "I was not aware of the internal build. How did this happen without me knowing.",
      choices: [
        {
          id: "s2a",
          tag: "Explain without assigning blame",
          line:
            "The two commitments were made through different channels and the timing was close. I do not think anyone made a mistake intentionally, and I do not want to characterize it that way. What I want to do is make sure we resolve it quickly rather than assign it.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is a mature way to look at it. Have you talked to Sandra about this.",
          principle:
            "Explaining a conflict without assigning blame keeps both leaders' credibility intact and keeps you out of the middle. If you assign blame, you become the reporter, and reporters get distrusted.",
          keywords: ["no blame", "different channels", "not intentional", "resolve quickly", "mature", "not assign", "both sides", "explain"],
        },
        {
          id: "s2b",
          tag: "Point to Sandra's timing",
          line:
            "Sandra committed my time before the client initiative was confirmed. I think the internal build came first and your initiative was planned after.",
          points: -2,
          standing: -9,
          momentum: -4,
          reaction:
            "So Sandra's commitment predates mine. That is useful to know. It also means I need to have a conversation with her.",
          principle:
            "Explaining the timeline in a way that implies Sandra was first reads as siding against the VP to protect your functional manager. He will notice it and it will affect how he sees you.",
          keywords: ["Sandra came first", "before yours", "her commitment predates", "timeline", "she committed first", "your initiative after"],
        },
        {
          id: "s2c",
          tag: "Admit you should have flagged it",
          line:
            "I should have flagged this earlier. I knew there was a potential conflict and I was hoping it would resolve before it got to this point. That was wrong and I want to own it.",
          points: 3,
          standing: 6,
          momentum: 7,
          reaction:
            "I appreciate that. But we are here now. What is the path forward.",
          principle:
            "Admitting you sat on a conflict is honest and earns some trust, but it also confirms a judgment error. Name the path forward quickly to shift from the mistake to the solution.",
          keywords: ["should have flagged", "knew about it", "hoping", "sit on it", "own it", "wrong", "should have told you"],
        },
        {
          id: "s2d",
          tag: "Name it as a system failure",
          line:
            "This is what happens when two leaders plan in parallel without a shared view of resource allocation. Neither you nor Sandra did anything wrong. The system did not give you the visibility you needed. I want to solve the immediate problem and then propose a process fix so it does not happen again.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is right. And the immediate problem is your time. What is your view on how to resolve it.",
          principle:
            "Framing the conflict as a systems problem rather than an individual mistake names the real issue without assigning fault. It also positions you as someone thinking at the organizational level.",
          keywords: ["system failure", "parallel planning", "shared view", "neither wrong", "process fix", "visibility", "system problem"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need to understand how this happened so it does not happen again.",
        principle: "Explain the conflict without assigning blame. You are in the middle; picking a side makes you a liability to both.",
      },
    },
    {
      id: "s3",
      prompt:
        "What is your view on how to resolve this. I am asking because you are the one in the middle.",
      choices: [
        {
          id: "s3a",
          tag: "Name the decision and who makes it",
          line:
            "There is a priority decision here that I do not think I should make on my own. I can give you my honest view of the relative impact, but the call between the two commitments should come from you and Sandra together, not from me.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is the right position. Tell me the relative impact first.",
          principle:
            "Refusing to resolve a conflict between two bosses unilaterally is the correct move. You can inform the decision but making it yourself exposes you to the losing side.",
          keywords: ["not my decision", "you and Sandra", "priority decision", "relative impact", "honest view", "together", "not me alone"],
        },
        {
          id: "s3b",
          tag: "Propose a split",
          line:
            "I could split my time: fifty percent on each initiative for two months. I would rather do that than force a priority call.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction:
            "Fifty-fifty does not work on either side. Both of these need meaningful time, not split attention.",
          principle:
            "Proposing a split to avoid a hard priority call often produces two mediocre outcomes instead of one good one. A VP with a real commitment will push back on this immediately.",
          keywords: ["split", "fifty fifty", "both", "avoid choosing", "half time", "part time on each", "balance both"],
        },
        {
          id: "s3c",
          tag: "Propose a sequencing",
          line:
            "What if I do the first four weeks of your initiative and then move fully to the internal build for the second period. The client work is front-loaded and the build does not peak until late November.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "That could work if the client initiative does not need deep continuity in the second half. Let me think about it. Have you checked this with Sandra.",
          principle:
            "Proposing a sequencing based on the actual work requirements is more credible than an arbitrary split. It shows you have thought about the substance, not just the politics.",
          keywords: ["sequencing", "first four weeks", "front-loaded", "second period", "late November", "phase", "timing"],
        },
        {
          id: "s3d",
          tag: "Offer to facilitate the conversation",
          line:
            "I will not make the call between the two commitments. What I can do is set up a thirty-minute conversation between you and Sandra with a clear framing of the trade so you can decide together. I can have that scheduled by tomorrow.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is the right move. Set it up. I will hold the team composition until we have resolution.",
          principle:
            "Offering to facilitate the resolution between the two leaders rather than resolving it yourself protects you from being the tiebreaker and positions you as a capable manager of complex situations.",
          keywords: ["facilitate", "set up conversation", "you and Sandra", "together", "not my call", "thirty minutes", "schedule", "framing"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need you to have a view, not just a process.",
        principle: "Have a view on how to resolve it, but be clear about whose decision it is. You inform, they decide.",
      },
    },
    {
      id: "s4",
      prompt:
        "I want to ask you something harder. If you had to choose, which commitment do you think is more important right now.",
      choices: [
        {
          id: "s4a",
          tag: "Decline to choose between them",
          line:
            "I am not going to answer that in a way that positions one of you over the other. What I can tell you is the organizational stakes of each, and you can weigh them with Sandra. I have a view on the stakes, I do not have a view on the priority.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Fair enough. Tell me the organizational stakes.",
          principle:
            "Refusing to prioritize between two bosses while offering to inform the decision is the sustainable position. Choosing in this room means the losing side learns about it.",
          keywords: ["not going to choose", "stakes", "not priority", "weigh together", "both of you", "inform not decide", "organizational"],
        },
        {
          id: "s4b",
          tag: "Name the client initiative as priority",
          line:
            "Honestly, the client initiative is higher stakes. The revenue exposure is larger and the client relationship is at risk if there is not a strong lead.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction:
            "I appreciate you saying that. But I want you to think about what Sandra will say when she hears you prioritized my work over hers.",
          principle:
            "Choosing the VP's initiative when he asks risks your relationship with your functional manager when she finds out, and she will find out. This is a trap.",
          keywords: ["client higher stakes", "revenue", "your initiative", "higher priority", "client relationship", "honestly yours wins"],
        },
        {
          id: "s4c",
          tag: "Name both stakes without ranking",
          line:
            "The client initiative has a revenue number attached to it and a relationship risk if the lead is not strong. The internal build has a dependency from three other teams and if it slips, it delays a platform release. Both are real. I genuinely cannot tell you one is obviously more important.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "That is the honest answer. I respect it. Let me talk to Sandra.",
          principle:
            "Naming both stakes clearly without ranking them gives the VP the information he needs to have the conversation with Sandra while protecting your relationship with both.",
          keywords: ["revenue", "relationship risk", "dependency", "platform release", "both real", "cannot rank", "name both", "honest"],
        },
        {
          id: "s4d",
          tag: "Propose a principle",
          line:
            "The right principle is: whichever commitment has the higher cost of disruption at this specific moment should take priority. I can give you that analysis for both. Then you and Sandra apply the principle. That way the decision is made on the merits, not on who asked first.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "That is a smart frame. Give me the analysis and I will bring it to Sandra.",
          principle:
            "Proposing a decision principle instead of a decision answer gives both leaders a framework to agree on before they apply it to the specific situation. It is executive thinking.",
          keywords: ["principle", "cost of disruption", "analysis", "on the merits", "not who asked first", "framework", "apply together"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am asking you a direct question. Which is more important.",
        principle: "When asked to choose between two bosses, name the stakes clearly and return the decision to them. Do not pick a side.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 48 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The VP agrees to hold the team lock until he has spoken with Sandra. You have a facilitated conversation scheduled for tomorrow. Both leaders now see you as someone who manages complex situations without creating political fallout.",
      lessons: [
        "Surface conflicts before they get locked in. Confirming availability when you have a known conflict sets up a larger failure.",
        "Refusing to prioritize between two bosses while offering to inform the decision is the only sustainable position.",
        "Facilitate the resolution between the two leaders. Being the tiebreaker exposes you to the losing side.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The VP holds the team lock and says he will call Sandra. You were not involved in the resolution and do not know how it landed.",
      lessons: [
        "Offering to facilitate the conversation is better than leaving it to resolve without you. You lose information and influence when you step out.",
        "A split commitment proposal sounds fair but produces two mediocre outcomes. Neither leader will accept it.",
        "Name both stakes clearly without ranking them. That is the honest answer a VP can work with.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "You confirmed availability you do not have. When the conflict surfaces under deadline pressure, both leaders are disappointed and you are seen as someone who let a predictable problem run.",
      lessons: [
        "Confirming a commitment you cannot fully honor is the fastest way to lose both leaders' trust.",
        "Delaying without naming the reason reads as evasive. You had the information to surface the conflict immediately.",
        "Choosing the VP's initiative when he asks risks your functional manager's trust when she finds out. It is a trap.",
      ],
    },
  ],
};
