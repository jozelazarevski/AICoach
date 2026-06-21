import type { Encounter } from "../../game/types";

export const creditMeeting: Encounter = {
  id: "credit-meeting",
  title: "The Redirect",
  difficulty: "pointed",
  opponent: {
    name: "The VP",
    role: "A senior leader who just redirected your presentation to your junior teammate",
    archetype: "Skeptical Principal",
    blurb: "Mid-presentation the VP cut to your junior. Let her speak without losing your footing, then reclaim the room without looking territorial.",
  },
  scene:
    "You are twenty minutes into a forty-minute readout with a VP and three other leaders. Your junior team member, Kira, is sitting beside you. You are presenting a section you own when the VP interrupts: 'Actually, I want to hear Kira's take on this piece. Kira, walk me through it from your side.' Your manager is also in the room. The redirect can mean many things. How you handle the next five minutes determines what the room concludes about you.",
  objective:
    "Let Kira shine without disappearing yourself, and finish the meeting with your authorship of the work and your leadership of the team both visible.",
  startStanding: 52,
  startMomentum: 25,
  stages: [
    {
      id: "s1",
      prompt:
        "Kira, walk me through it from your side.",
      choices: [
        {
          id: "s1a",
          tag: "Set Kira up cleanly",
          line:
            "Kira built the model that drives this section. Kira, take it from the assumptions through to the output.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Good. Kira, go ahead.",
          principle:
            "Handing off with a credit-giving bridge makes you look like a confident leader who develops people. The VP asked for Kira, but the room sees you frame the handoff.",
          keywords: ["built", "model", "kira", "set up", "take it", "assumptions", "output", "her section", "lead"],
        },
        {
          id: "s1b",
          tag: "Stay in control",
          line:
            "I can walk you through the technical detail behind this section. The model Kira built is the core of it.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "I said I would like to hear from Kira. Please give her the floor.",
          principle:
            "Redirecting a redirect reads as territorial. When a VP names someone they want to hear from, that instruction is not optional. Resisting it signals insecurity.",
          keywords: ["I can walk", "stay in", "technical detail", "I want to explain", "let me", "I will answer", "myself"],
        },
        {
          id: "s1c",
          tag: "Hand off generously",
          line:
            "Kira, this is yours.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction:
            "Kira, go ahead.",
          principle:
            "A clean three-word handoff is fine but a missed opportunity. Setting up the credit before passing the mic gives the room a frame for what they are about to hear.",
          keywords: ["yours", "go ahead", "kira", "over to you", "handoff", "pass", "take it"],
        },
        {
          id: "s1d",
          tag: "Invite and stay present",
          line:
            "Kira did the analytical work here. Kira, walk them through the assumptions and the output. I will add anything on the strategic layer after you finish.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "Good. Kira, take it.",
          principle:
            "Handing the floor to Kira while naming your own role afterward keeps you in the meeting without blocking her. You give her the spotlight and signal that you have something to add after.",
          keywords: ["analytical work", "walk them through", "after you finish", "strategic layer", "kira", "I will add", "stay present"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "Let us hear from Kira first.",
        principle: "When a VP redirects to your junior, the only correct move is to facilitate the handoff, not resist it.",
      },
    },
    {
      id: "s2",
      prompt:
        "Kira, that was clear. I have a follow-up question for the team. How confident are you in the seventy-two-hour delivery assumption. It seems aggressive.",
      choices: [
        {
          id: "s2a",
          tag: "Let Kira answer first",
          line:
            "Kira, you want to start on that one. You ran the dependency analysis.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction:
            "Kira: 'The seventy-two hours is tight but we validated it against three prior deliveries at the same scope. The single risk is the third-party data pull, which has a four-hour variance. We built in a buffer.'",
          principle:
            "Letting Kira answer a follow-up after her presentation keeps the VP's attention where it went and signals that you trust her in front of a room. Your contribution after that is additive, not competing.",
          keywords: ["kira first", "you ran", "dependency analysis", "her answer", "let kira", "start on that", "kira want to"],
        },
        {
          id: "s2b",
          tag: "Answer for the team",
          line:
            "I will take that one. The seventy-two hours is validated against three prior deliveries. The risk is the third-party data pull and we have a buffer built in.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction:
            "I appreciate that, but I was asking the team.",
          principle:
            "Answering a question directed at the team after the VP just redirected to your junior reads as reclaiming control. The VP will notice the pattern.",
          keywords: ["I will take", "answer for", "let me answer", "the risk is", "we have", "I know", "take that"],
        },
        {
          id: "s2c",
          tag: "Redirect and add",
          line:
            "Kira, do you want to take the assumption question. Then I can address the risk buffer.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Sure. Kira, you first.",
          principle:
            "Splitting the answer gives Kira the primary response and keeps you in the conversation on a specific element. It avoids both disappearing and dominating.",
          keywords: ["split", "kira first", "then I", "take the assumption", "address the risk", "you first", "both"],
        },
        {
          id: "s2d",
          tag: "Build on Kira's point",
          line:
            "Kira covered the dependency validation. The thing I would add on confidence is that this assumption is the output of a decision tree we built for exactly this type of delivery. It is not a guess.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "What does the decision tree look like.",
          principle:
            "Additive contributions that build on your junior's answer rather than replacing it show collaborative leadership without ceding your voice in the room.",
          keywords: ["build on", "kira covered", "I would add", "decision tree", "additive", "her point", "also"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a direct answer on the confidence level.",
        principle: "After a VP redirected to your junior, any answer you give should be additive, not replacing. Let the junior lead, then add.",
      },
    },
    {
      id: "s3",
      prompt:
        "This is good work. I want to understand the ownership going forward. Who is the point person on this.",
      choices: [
        {
          id: "s3a",
          tag: "Name yourself as owner",
          line:
            "I am the owner. Kira leads the analytical component and I own the delivery and the stakeholder interface. That is the structure we use across the team.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Good. I want to hear directly from you on status updates then. Kira can be the backup.",
          principle:
            "Naming yourself as owner with Kira in a defined role is the correct structure to state in front of a VP. It elevates Kira without creating ambiguity about accountability.",
          keywords: ["I am the owner", "kira leads", "I own", "stakeholder interface", "delivery", "structure", "owner"],
        },
        {
          id: "s3b",
          tag: "Defer to Kira",
          line:
            "Kira has been closer to the details on this one. She might be the better point person.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "You are the senior person in the room. Who owns it.",
          principle:
            "Deferring ownership to your junior when a VP asks who is accountable reads as abdication, not generosity. It creates confusion about who to hold responsible if something goes wrong.",
          keywords: ["defer to kira", "she might be", "closer to details", "better point person", "let kira", "her ownership", "deferring"],
        },
        {
          id: "s3c",
          tag: "Offer to define it later",
          line:
            "That is a good question. Let me think about the best structure and come back to you with a clear answer.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "I am asking you now. If you do not know who owns it, that is a concern.",
          principle:
            "When a VP asks a direct accountability question in a room, 'let me get back to you' reads as not being in command of your own team's structure.",
          keywords: ["come back", "think about", "define later", "not sure", "let me consider", "good question", "structure later"],
        },
        {
          id: "s3d",
          tag: "Clarify the layer",
          line:
            "I own the outcome. Kira owns the work. What that means in practice: I am the escalation point and the sign-off, Kira is the one to call when you want to understand what the model says.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "That is a sensible split. I will direct questions to you for decisions and to Kira for analytics.",
          principle:
            "Distinguishing ownership by layer, outcome versus work, gives the VP a clear mental model without ambiguity. It elevates Kira's expertise while keeping your accountability intact.",
          keywords: ["own the outcome", "kira owns the work", "escalation", "sign-off", "call kira", "analytical", "layer", "split"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a clear answer on who I talk to.",
        principle: "Ownership questions from a VP require a direct answer in the room. Define the layer and move on.",
      },
    },
    {
      id: "s4",
      prompt:
        "Before we wrap, I want to ask you directly: what does Kira's development look like from here. She is clearly capable.",
      choices: [
        {
          id: "s4a",
          tag: "Champion her specifically",
          line:
            "Kira is ready for a scope expansion. The next step for her is owning a full workstream end to end, not just the analytical component. I am building a case for her and I could use a word from you to her manager to accelerate the timing.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "I am glad you said that. I will mention it to her manager. Have the case ready and I will add my name to it.",
          principle:
            "Championing your junior specifically and asking for executive backing turns a development question into a concrete ask. You look like a strong developer of talent and you secure real support for Kira.",
          keywords: ["scope expansion", "full workstream", "end to end", "building a case", "word from you", "her manager", "accelerate", "champion"],
        },
        {
          id: "s4b",
          tag: "Stay general",
          line:
            "Kira is on a strong trajectory. I am giving her increasing responsibility and she is handling it well.",
          points: 0,
          standing: -2,
          momentum: 1,
          reaction:
            "That is good to hear. What is the next concrete step for her.",
          principle:
            "Describing development in vague terms when a VP is actively interested in your junior is a missed opportunity. The VP is offering to help. Take it.",
          keywords: ["strong trajectory", "increasing responsibility", "handling well", "doing well", "good trajectory", "vague", "general"],
        },
        {
          id: "s4c",
          tag: "Redirect to the work",
          line:
            "She is great. On the delivery question we were discussing, I want to circle back to the timeline assumption before we close.",
          points: -2,
          standing: -10,
          momentum: -3,
          reaction:
            "I asked about Kira's development. We can do the timeline question by email.",
          principle:
            "Pivoting away from a VP's development question reads as uncomfortable with the subject. When an executive shows interest in your junior, that is a moment to lead, not to redirect.",
          keywords: ["redirect", "circle back", "delivery", "timeline", "before we close", "change subject", "pivot"],
        },
        {
          id: "s4d",
          tag: "Name the obstacle",
          line:
            "She is ready to grow and the main thing slowing her down is that her title does not match her scope. I would welcome your help surfacing that to leadership.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "What is the title gap.",
          principle:
            "Naming a specific structural obstacle when a VP is asking about development gives them something concrete to act on. It is advocacy, and advocacy is what good managers do.",
          keywords: ["title", "scope", "obstacle", "slowing down", "ready to grow", "leadership", "surface", "advocacy"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "I was expecting you to say more. She is clearly talented.",
        principle: "When a VP shows genuine interest in your junior, this is the most important development question you will be asked. Have a real answer.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 54 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The VP ends the meeting saying she wants you running the next phase and that she will have a word with Kira's manager. You are seen as a leader who develops people, not a person who hoards credit.",
      lessons: [
        "When a VP redirects to your junior, facilitate the handoff and stay present. Resisting it signals insecurity.",
        "Handing off with a credit-giving bridge makes you look like a confident developer of talent.",
        "When a VP asks about your junior's development, have a specific ask ready. They are offering to help, not making small talk.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The meeting ends warmly. The VP is impressed with Kira. Your role in the work is visible but your leadership of Kira's development is not clearly established.",
      lessons: [
        "You handled the redirect well but missed the development conversation. That was the most important exchange in the room.",
        "A clean handoff is the baseline. A credit-giving bridge is the move.",
        "Ownership questions require a direct answer. Define the layer and move on.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The VP ends the meeting asking Kira to be the point person going forward and to copy you on updates. Your ownership of the work has been reversed.",
      lessons: [
        "Redirecting a redirect is the most damaging move. When a VP names someone, that instruction is final.",
        "Answering for your junior after the VP redirected to them reads as territorial and compounds the original impression.",
        "Deferring ownership when asked directly reads as abdication. Name yourself as owner and elevate your junior's role within your ownership.",
      ],
    },
  ],
};
