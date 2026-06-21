import type { Encounter } from "../../game/types";

export const rivalExit: Encounter = {
  id: "rival-exit",
  title: "The Vacuum",
  difficulty: "pointed",
  opponent: {
    name: "The Division Head",
    role: "The executive who controls the VP appointment you both wanted",
    archetype: "Skeptical Principal",
    blurb: "Your rival for VP just announced departure. Everyone is watching. Position without looking like you already measured the curtains.",
  },
  scene:
    "Marcus, who has been the other internal candidate for the open VP role, announced his departure this morning. The Division Head has called a one-on-one with you this afternoon. You do not know if she is gauging your interest, testing your reaction, or making a decision. She has the power to name you to the role, accelerate a search, or bring in someone external. The wrong read of this conversation is as dangerous as the wrong move.",
  objective:
    "Signal readiness without looking opportunistic, and come out with either a timeline or a specific next step on the VP question.",
  startStanding: 55,
  startMomentum: 28,
  stages: [
    {
      id: "s1",
      prompt:
        "I imagine you heard about Marcus. I wanted to get your read on things.",
      choices: [
        {
          id: "s1a",
          tag: "Acknowledge then ask",
          line:
            "I did. It is a real loss for the team. I want to understand what you are thinking about the shape of things from here before I share my own read.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "I am still working through it. But I am curious what your read is on the org and the role.",
          principle:
            "Acknowledging the departure genuinely before asking to hear the executive's thinking positions you as someone who reads situations before acting, not someone who rushes into a vacancy.",
          keywords: ["real loss", "understand", "your thinking", "before I share", "my read", "shape of things", "hear you first"],
        },
        {
          id: "s1b",
          tag: "Signal readiness immediately",
          line:
            "I did. I want you to know I am ready to step into the role and I think the timing works well for me.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "That is a quick turn. Marcus only announced this morning. What makes you confident the timing works.",
          principle:
            "Announcing readiness in the first breath looks like you have been waiting for your rival to leave. Even when you are ready, leading with it confirms the most unflattering read of the situation.",
          keywords: ["ready", "step in", "timing works", "the role", "want you to know", "I am ready", "immediately"],
        },
        {
          id: "s1c",
          tag: "Ask about the org",
          line:
            "I heard. How are you thinking about the team and the org structure from here. That question feels more important than the role question right now.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is the right instinct. The org question is real. Tell me what you see.",
          principle:
            "Putting the org question ahead of the role question signals that you think like an owner. It also gives the executive a reason to talk to you substantively before the role decision is made.",
          keywords: ["org structure", "team", "more important", "right instinct", "think like owner", "how you thinking", "org first"],
        },
        {
          id: "s1d",
          tag: "Express the loss genuinely",
          line:
            "Marcus built something real here. I know you and he had a strong working relationship. I am sorry it ended this way for the team.",
          points: 3,
          standing: 7,
          momentum: 8,
          reaction:
            "He did. It is a difficult moment. What do you make of the gap he is leaving.",
          principle:
            "Genuine acknowledgment of the rival's contribution, without qualification, signals emotional maturity. It also gives the executive permission to think about the succession without feeling like you are waiting for her to do so.",
          keywords: ["loss", "marcus", "built something", "genuine", "sorry", "difficult", "your relationship", "worked well together"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "Give me something more direct. What is your read.",
        principle: "When a VP calls a one-on-one after your rival exits, she is measuring your judgment before she measures your readiness.",
      },
    },
    {
      id: "s2",
      prompt:
        "Tell me honestly: do you want the role. I am not looking for a political answer.",
      choices: [
        {
          id: "s2a",
          tag: "Say yes with texture",
          line:
            "Yes. I want it and I think I am ready for it. The part I want you to know is that I am not saying that because Marcus left. I have thought about this for the last year and the reasons have not changed.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "Good. Tell me what your version of the role looks like. Not Marcus's version.",
          principle:
            "A direct yes with the explanation that your readiness predates the departure separates ambition from opportunism. It also signals that you have been preparing, not waiting.",
          keywords: ["yes", "ready", "not because marcus left", "year", "reasons have not changed", "I want it", "thought about"],
        },
        {
          id: "s2b",
          tag: "Hedge the answer",
          line:
            "I would be open to it if the scope and the support are right. I want to make sure I can succeed in the role before I commit.",
          points: -2,
          standing: -8,
          momentum: -5,
          reaction:
            "I asked if you want it, not whether the conditions are right. Do you want it.",
          principle:
            "Hedging when a VP asks a direct yes-or-no ambition question reads as a lack of conviction about your own readiness. She is testing whether you know your own mind.",
          keywords: ["open to it", "if the scope", "conditions", "succeed first", "hedge", "depends", "if the support"],
        },
        {
          id: "s2c",
          tag: "Turn the question back",
          line:
            "Before I answer that, can you tell me how you are thinking about the search. Is this an internal or external process.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "That is not what I asked. I asked if you want the role.",
          principle:
            "Deflecting a direct ambition question with a process question reads as either afraid of the answer or afraid of being rejected. Neither is the right signal.",
          keywords: ["before I answer", "how you thinking", "internal or external", "process", "search", "deflect", "turn back"],
        },
        {
          id: "s2d",
          tag: "Name what you bring differently",
          line:
            "Yes. And I want to tell you what I would do differently than Marcus, because I think the role needs to look different in the next chapter than it did in his.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is interesting. What would you do differently.",
          principle:
            "Saying yes and then defining your own version of the role signals that you have been thinking about the job, not just the title. It separates your candidacy from your rival's.",
          keywords: ["yes", "differently", "next chapter", "my version", "not marcus", "what I would do", "different from his"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a direct answer. Yes or no.",
        principle: "When a VP asks if you want a role and says she is not looking for a political answer, give her a direct yes.",
      },
    },
    {
      id: "s3",
      prompt:
        "Tell me about your version of the role. What would you do differently in the first ninety days.",
      choices: [
        {
          id: "s3a",
          tag: "Name three specifics",
          line:
            "Three things. First, I would get in front of the two accounts where we have relationship gaps and own those directly. Second, I would restructure the operating cadence so product and go-to-market are in the same room weekly. Third, I would make a decision on the open team-lead position in the first thirty days, not sixty.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "The team-lead decision has been on my mind too. Why thirty days.",
          principle:
            "Three specific first-ninety-day actions signal that you have been doing the job in your head before you got the title. Specificity is the only thing that separates your answer from a generic VP ambition response.",
          keywords: ["three things", "first thirty days", "relationship gaps", "team lead", "operating cadence", "product go-to-market", "specific", "ninety days"],
        },
        {
          id: "s3b",
          tag: "Focus on continuity",
          line:
            "I would make sure the team does not feel the disruption. Marcus built strong relationships and I would spend the first thirty days preserving them before making any changes.",
          points: -2,
          standing: -9,
          momentum: -4,
          reaction:
            "I did not ask about continuity. I asked what you would do differently.",
          principle:
            "Answering a 'what would you do differently' question with continuity themes reads as having no independent vision. It also implicitly says you would run Marcus's playbook, which is the wrong signal when she is thinking about what comes next.",
          keywords: ["continuity", "preserve", "his relationships", "no disruption", "what he built", "thirty days", "not change", "keep things stable"],
        },
        {
          id: "s3c",
          tag: "Start with the team",
          line:
            "I would spend the first two weeks in listening mode. One-on-ones with every senior member of the team. I would not do anything structural until I understand what the team thinks is broken.",
          points: 2,
          standing: 3,
          momentum: 5,
          reaction:
            "That is a reasonable approach. What have you already heard that makes you think something is broken.",
          principle:
            "A listening tour is sensible but it is also the default answer. Every VP candidate says it. She is asking for your thesis, not your process.",
          keywords: ["listening mode", "one on ones", "two weeks", "team thinks", "before I", "understand first", "listening tour"],
        },
        {
          id: "s3d",
          tag: "Name the gap the role must fill",
          line:
            "The role needs to solve a problem that Marcus was not asked to solve: we have great individual execution and a weak operating model that stitches it together. I would spend the first ninety days building the connective tissue. That is the thing the team cannot do without a VP owning it.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is the right diagnosis. Why do you think Marcus did not solve it.",
          principle:
            "Naming the gap the role must fill, rather than describing your management style, signals that you see the job from the outside as an executive rather than from the inside as an employee.",
          keywords: ["gap", "operating model", "connective tissue", "stitches together", "solve a problem", "weak", "individual execution", "not Marcus"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am looking for something more concrete. What specifically would be different on day ninety.",
        principle: "First-ninety-day answers need three named actions, not a management philosophy. Be specific.",
      },
    },
    {
      id: "s4",
      prompt:
        "I want to ask you something direct. Is there anything that would give me reason to pause on your candidacy. Be honest with me.",
      choices: [
        {
          id: "s4a",
          tag: "Name a real gap",
          line:
            "Yes. I have less experience on the revenue side than the role demands. I know the operational and product sides deeply. I would need to lean on your guidance in the first six months on the commercial side and I would want to tell you that rather than discover it together later.",
          points: 6,
          standing: 14,
          momentum: 14,
          reaction:
            "That is exactly the kind of answer I was looking for. The commercial side is something we can work with. I was more worried you would tell me you have no gaps.",
          principle:
            "Naming a real, specific gap when asked directly is the highest-trust move available. It signals that you know yourself and that you are not going to oversell your readiness.",
          keywords: ["real gap", "revenue side", "commercial", "less experience", "lean on you", "honest", "specific gap", "tell you rather than discover"],
        },
        {
          id: "s4b",
          tag: "Claim no gaps",
          line:
            "No. I think I have the experience and the relationships to do this job at the level you need.",
          points: -3,
          standing: -15,
          momentum: -6,
          reaction:
            "Everyone has gaps. If you cannot name one, I am not sure how self-aware you are about the role.",
          principle:
            "Saying you have no gaps when asked directly reads as either dishonest or unaware. A VP who cannot name their own development areas is not ready for the meta-responsibility that comes with the title.",
          keywords: ["no gaps", "no concerns", "ready", "have the experience", "not worried", "all good", "no issues"],
        },
        {
          id: "s4c",
          tag: "Name a minor one",
          line:
            "I sometimes take on too much myself rather than delegating. I know that about myself and I am working on it.",
          points: 0,
          standing: -2,
          momentum: -1,
          reaction:
            "That is a classic interview answer. Tell me something real.",
          principle:
            "The classic 'I work too hard' gap reads as either calculated or unimaginative. She asked for something that would give her reason to pause. That answer does not give her reason to pause.",
          keywords: ["too much myself", "delegate", "working on it", "interview answer", "generic", "classic gap", "soft gap"],
        },
        {
          id: "s4d",
          tag: "Name a relationship gap",
          line:
            "I do not have a strong existing relationship with the two most important customers in the segment, and Marcus did. That is a real gap and I want you to know I am planning to get in front of both of them in the first thirty days with or without the title.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction:
            "I know you would do that. The customer relationships are fixable. Good to hear you name it.",
          principle:
            "Naming a specific gap that is relevant to the job and adding what you are doing about it is more credible than naming a generic development area. It shows you know the job, not just yourself.",
          keywords: ["customer relationship", "marcus had", "real gap", "thirty days", "get in front", "fixable", "specific gap", "planning to"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a real answer. Everyone has something.",
        principle: "Name a real gap that is specific to the role. Generic gaps read as calculated. No gaps read as unaware.",
      },
    },
    {
      id: "s5",
      prompt:
        "Good conversation. I have a few more conversations to have. What would you like me to know before I make a decision.",
      choices: [
        {
          id: "s5a",
          tag: "Ask for the timeline",
          line:
            "I want to know when you are making the decision so I can plan around it. I am not pushing, I just do not want to commit elsewhere if the window is near.",
          points: 5,
          standing: 10,
          momentum: 14,
          reaction:
            "I am targeting the end of the month. Can you hold your plans until then.",
          principle:
            "Asking for the timeline with a legitimate reason, which is avoiding conflicting commitments, is an acceptable close. It signals that you are in demand without issuing an ultimatum.",
          keywords: ["timeline", "when", "decision", "plan around", "commit elsewhere", "window", "end of month", "hold plans"],
        },
        {
          id: "s5b",
          tag: "Make a final pitch",
          line:
            "I want you to know that I am fully committed to this organization and this role. I have been here eight years and I am not looking elsewhere. I am the right choice.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "I know you are committed. That is not the question. The question is whether you are ready.",
          principle:
            "A final commitment pitch after a good conversation sounds desperate. She already knows you are committed. What she is still weighing is whether you are ready.",
          keywords: ["fully committed", "eight years", "right choice", "not looking", "pitch", "final push", "want you to know"],
        },
        {
          id: "s5c",
          tag: "Leave cleanly",
          line:
            "I think you have what you need from me. The one thing I would add is that I am ready to start the transition preparation now, before the decision is made, if that would help you.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is a helpful offer. I will think about whether there is something you can do in the interim.",
          principle:
            "Offering to start preparation before the decision is made signals that you are already thinking like the person in the role. It also gives the executive a low-risk way to extend the conversation.",
          keywords: ["start now", "transition preparation", "before decision", "ready", "helpful offer", "interim", "even if not decided"],
        },
        {
          id: "s5d",
          tag: "Name what you need from her",
          line:
            "One thing. If there is a concern about my candidacy that you are working through, I would rather hear it from you directly than discover it in the outcome. I can take honest feedback.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction:
            "The commercial experience is my main pause. We talked about it. I think it is manageable. Let me finish my other conversations.",
          principle:
            "Asking for honest concerns before the decision is made is the highest form of direct engagement. It signals confidence and prevents you from being surprised by feedback after the fact.",
          keywords: ["honest feedback", "concern about candidacy", "hear it directly", "before outcome", "can take it", "honest", "direct"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "I will let you know when I have made a decision.",
        principle: "End the conversation with a specific ask or a specific offer. Leaving with pleasantries gives her nothing to hold onto.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 78, standingAtLeast: 56 },
      result: "won",
      baseGrade: "A",
      resolution:
        "She tells you the decision will be end of month and asks if you can prepare a ninety-day brief in the interim. You leave as the leading candidate.",
      lessons: [
        "Signal readiness through specificity, not availability. First-ninety-day plans are the difference between ambition and candidacy.",
        "Name a real, specific gap when asked. It is the highest-trust move and the one thing generic candidates cannot do.",
        "End with an ask for the timeline or a specific next step. Leaving with pleasantries is leaving empty-handed.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 55 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "She thanks you for the conversation and says she will be in touch. You have been heard but not selected. The decision is still open.",
      lessons: [
        "A good conversation that ends without a named next step gives her permission to keep searching.",
        "Asking for the timeline with a legitimate reason is not pressure. It is the kind of move candidates who have other options make.",
        "Your version of the role needs three named actions, not a philosophy. She is imagining you in the job.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "She conducts a broader search. The feedback you get later: you seemed eager but not ready.",
      lessons: [
        "Signaling readiness in the first breath after your rival's exit looks like you have been waiting. Acknowledge the departure first.",
        "Saying you have no gaps reads as unaware. Every VP candidate has gaps. The question is whether you know yours.",
        "Continuity answers to a 'what would you do differently' question confirm you have no independent vision.",
      ],
    },
  ],
};
