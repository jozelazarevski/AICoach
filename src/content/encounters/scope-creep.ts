import type { Encounter } from "../../game/types";

export const scopeCreep: Encounter = {
  id: "scope-creep",
  title: "The Ask Behind the Ask",
  difficulty: "pointed",
  opponent: {
    name: "The Skip-Level",
    role: "Your manager's manager, who controls your team's headcount and priorities",
    archetype: "Skeptical Principal",
    blurb: "He asked you to 'take a look' at a struggling team's roadmap. That phrase means something. Find out what before you agree.",
  },
  scene:
    "Your skip-level VP stops you after a town hall and says: 'The analytics team is struggling with their roadmap. I wonder if you could take a look and maybe help them sort it out.' The analytics team is led by a peer who has been here longer than you. Your team is at full capacity through the end of the quarter. 'Take a look' is one of the most dangerous phrases in a corporate environment. It can mean a two-hour consult or it can mean you are now informally running two teams.",
  objective:
    "Scope the ask before agreeing to it, and come out with either a bounded role or a graceful decline, without looking unhelpful.",
  startStanding: 48,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt:
        "The analytics team has been spinning on their roadmap for two months. I think they need an outside perspective and you are one of the people I trust to give useful feedback. It would just be taking a look.",
      choices: [
        {
          id: "s1a",
          tag: "Scope it before agreeing",
          line:
            "I want to help with this. Before I say yes, can you help me understand what you mean by taking a look. Are you thinking a single review session, ongoing advice, or something more structural.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Good question. I was thinking at least a review session and probably a few follow-up conversations to check that they are on track.",
          principle:
            "Scoping before agreeing is not reluctance, it is the professional move. A bounded commitment you can keep is worth more than an unbounded one you cannot.",
          keywords: ["scope", "before agreeing", "what do you mean", "single session", "ongoing", "structural", "how much", "understand first"],
        },
        {
          id: "s1b",
          tag: "Say yes immediately",
          line:
            "Sure, I am happy to help. I can set something up with them this week.",
          points: -2,
          standing: 2,
          momentum: -4,
          reaction:
            "Great. I will let them know. They may need more than one session, so make yourself available.",
          principle:
            "An unconditioned yes to 'take a look' converts a possible consult into an open-ended commitment. You have now volunteered for work that has no defined endpoint.",
          keywords: ["sure", "happy to help", "this week", "yes", "set something up", "of course", "glad to"],
        },
        {
          id: "s1c",
          tag: "Raise your capacity first",
          line:
            "I want to flag that my team is at full capacity through end of quarter. I want to help, but I also do not want to create a quality problem on my side. What is the timeline on the analytics roadmap.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "I understand you are busy. I would not ask if I did not think it was important. The roadmap decision needs to land by the end of the month.",
          principle:
            "Naming your capacity constraint before refusing protects your work but risks signaling that you are looking for a way out. Lead with the question about scope, then name capacity if the scope is too large.",
          keywords: ["capacity", "full", "end of quarter", "timeline", "quality problem", "my team", "busy"],
        },
        {
          id: "s1d",
          tag: "Ask about the leader",
          line:
            "Tell me more about the situation. Is the analytics team's leader aware you are asking me to weigh in, or is this separate from him.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "He knows I am thinking about it. He may need some convincing that outside input is useful, but he respects you.",
          principle:
            "Understanding whether the peer leader is looped in before you agree prevents you from stepping into a political situation you did not see coming. The phrase 'may need some convincing' is a significant signal.",
          keywords: ["is he aware", "analytics leader", "looped in", "political", "separate from", "know I am asking", "peer"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Are you able to help or not.",
        principle: "Scope the ask before answering whether you can help. 'Take a look' has no defined endpoint.",
      },
    },
    {
      id: "s2",
      prompt:
        "Look, the analytics team has real potential but they are stuck in an execution loop. I think they need someone to come in with fresh eyes and help them prioritize. You have done this before.",
      choices: [
        {
          id: "s2a",
          tag: "Name the role clearly",
          line:
            "I can play the role of an outside reviewer. What I want to be clear about is that I am not in a position to take on an advisory relationship that runs through the end of the year. A focused review with specific outputs is something I can commit to.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is fair. What would a focused review look like from you.",
          principle:
            "Naming the role you will play before you are assigned one prevents scope from expanding organically. You are defining the engagement, not accepting the one he is implying.",
          keywords: ["outside reviewer", "specific outputs", "not advisory", "not ongoing", "focused review", "what I can commit to", "clear about"],
        },
        {
          id: "s2b",
          tag: "Volunteer for more",
          line:
            "I could actually take on a more active role if that is useful. I am good at this kind of situation and I want to help the org succeed.",
          points: -2,
          standing: 0,
          momentum: -5,
          reaction:
            "How much time could you commit. I want to be realistic.",
          principle:
            "Volunteering for more than was asked when you are already at capacity is a fast path to a burnout and a quality failure on your primary work.",
          keywords: ["more active", "take on more", "good at this", "help the org", "volunteer", "want to do more", "active role"],
        },
        {
          id: "s2c",
          tag: "Propose a specific format",
          line:
            "Here is what I can do: a two-hour working session with the analytics team to review their current roadmap framing, with a one-page summary of recommendations. That is something I can turn around in the next two weeks without touching my current commitments.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is concrete. If they get a useful output from two hours and a one-pager, that is probably what they need.",
          principle:
            "Proposing a specific format with a named output and a bounded timeline converts an open-ended ask into a deliverable. It is helpful and finite.",
          keywords: ["two hours", "one-pager", "summary", "specific format", "two weeks", "bounded", "deliverable", "concrete"],
        },
        {
          id: "s2d",
          tag: "Ask what success looks like",
          line:
            "What does a successful outcome look like for you on this. If I knew what you were hoping the analytics team would have at the end, I could tell you whether I am the right person to help them get there.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "A clear set of priorities for the next two quarters and a roadmap they can actually execute. That is what they are missing.",
          principle:
            "Asking what success looks like gives you the criteria to scope your involvement and assess whether a two-hour session or a two-month commitment is what he actually needs.",
          keywords: ["success looks like", "outcome", "hoping", "right person", "get there", "what they need", "what you want"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Tell me what you can do. I am not trying to overwhelm you.",
        principle: "Name a specific format with a named output. An open-ended agreement is worse for both of you.",
      },
    },
    {
      id: "s3",
      prompt:
        "I should mention: the analytics leader, Kevin, is a bit territorial. He may not love having someone else come in. I want to be transparent about that.",
      choices: [
        {
          id: "s3a",
          tag: "Name the political risk",
          line:
            "I appreciate you flagging that. If Kevin is not bought in, anything I produce is going to sit on a shelf. For this to be useful, I need him to invite the input rather than receive it. Can you have that conversation with him before I reach out.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "That is fair. I will make sure he understands this is intended to help, not to evaluate him. I will reach out today.",
          principle:
            "Refusing to enter a political situation without the right setup is not cowardice, it is good judgment. Input that is not invited does not land.",
          keywords: ["political", "sit on a shelf", "invited", "not received", "you have that conversation", "bought in", "setup", "before I reach out"],
        },
        {
          id: "s3b",
          tag: "Accept the dynamic",
          line:
            "I can handle territorial. I have dealt with that before.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction:
            "That is the attitude that might make things worse. He is not someone you want to put on the defensive.",
          principle:
            "Saying you can handle a territorial peer reads as overconfident and sets up a conflict that your skip-level now has to manage. He told you about Kevin because he wanted you to factor it in, not dismiss it.",
          keywords: ["can handle", "territorial", "dealt with it", "no problem", "I will manage", "fine with that"],
        },
        {
          id: "s3c",
          tag: "Decline on political grounds",
          line:
            "I want to be honest with you: I am not the right person to do this if Kevin is not on board. Going in without his buy-in creates a peer relationship problem that is harder to fix than the roadmap problem.",
          points: 4,
          standing: 7,
          momentum: 9,
          reaction:
            "I can get him on board. I am asking whether you would be willing to help if he is.",
          principle:
            "Naming the condition under which you would help is different from refusing. It protects the relationship with the peer and gives the VP a clear action to take.",
          keywords: ["not the right person", "if not on board", "peer relationship", "harder to fix", "political grounds", "condition"],
        },
        {
          id: "s3d",
          tag: "Ask for a joint intro",
          line:
            "Then I want the two of us to be introduced together. A joint meeting with you, me, and Kevin. Not a back-channel ask from me to him. That gives him the right setup.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "That is smarter. I will set that up. Are you available Thursday.",
          principle:
            "Asking for a joint introduction puts the VP's authority behind the engagement from the start and prevents Kevin from reading it as a lateral intrusion.",
          keywords: ["joint intro", "three of us", "together", "not back-channel", "right setup", "meeting together", "your authority"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need to know you can work with him. Can you.",
        principle: "When a VP flags a peer as territorial, treat it as information about the required setup, not a challenge to overcome.",
      },
    },
    {
      id: "s4",
      prompt:
        "Assuming Kevin is on board, what is your one ask of me before you start.",
      choices: [
        {
          id: "s4a",
          tag: "Ask for air cover",
          line:
            "Make it clear to Kevin and his team that I am there as a thought partner, not as an evaluator of his leadership. That framing changes how the session goes.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "Done. I will say that when I set up the introduction. That is the right frame.",
          principle:
            "Asking the VP to set the right frame before you start costs him nothing and prevents the most likely failure mode of the engagement, which is Kevin being defensive.",
          keywords: ["thought partner", "not evaluator", "frame", "air cover", "make it clear", "how the session goes", "framing"],
        },
        {
          id: "s4b",
          tag: "Ask for protected time",
          line:
            "I need you to protect my team's priorities for the next two weeks. If my capacity gets pulled onto this, something on my current work will slip.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "I will keep an eye on it. But I do not want this to become a reason your team deprioritizes its own work.",
          principle:
            "Asking the VP to protect your team's priorities is reasonable but reads as a hedge. He asked for one ask and this is asking him to manage your calendar.",
          keywords: ["protect priorities", "my team", "capacity", "slip", "two weeks", "current work", "protected time"],
        },
        {
          id: "s4c",
          tag: "Ask for nothing",
          line:
            "I do not have an ask. I will make it work.",
          points: -1,
          standing: -3,
          momentum: -2,
          reaction:
            "Alright. I will leave it to you to set it up.",
          principle:
            "Asking for nothing is the same as accepting all the risk. The VP offered you one ask. Use it to set up the engagement correctly.",
          keywords: ["no ask", "nothing", "make it work", "figure it out", "fine", "no need", "all good"],
        },
        {
          id: "s4d",
          tag: "Ask for an output mandate",
          line:
            "I want you to commission the output explicitly. Not a favor from me to Kevin, but a formal request from you that results in a document. That gives the recommendations standing they would not have otherwise.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is sensible. I will send a note to both of you commissioning the review with a one-pager output expected.",
          principle:
            "A formally commissioned output has standing that an informal piece of advice does not. Kevin is more likely to act on something the VP asked for than something a peer offered.",
          keywords: ["formal request", "commission", "output mandate", "document", "standing", "not a favor", "formally"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "That is not really an ask. What do you actually need from me.",
        principle: "The VP offered you one ask before you start. Name the thing that most changes your odds of success.",
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
        "You agree to a two-hour session with a one-page output, Kevin is properly set up by the VP, and you have a formal commission behind the work. The engagement is bounded and useful.",
      lessons: [
        "Scope before agreeing. 'Take a look' has no defined endpoint unless you define it.",
        "Input that is not invited does not land. Get the right setup before you start.",
        "Use the VP's one-ask offer. Asking for nothing is accepting all the risk.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 48 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You agreed to help but the scope is still fuzzy. Kevin is only partially bought in. You are in, but the engagement is at risk.",
      lessons: [
        "A focused review with specific outputs is the bounded commitment. Anything less specific becomes open-ended.",
        "The territorial peer problem must be solved before you start. If you go in without the right frame, nothing lands.",
        "Ask for the formal commission. Advice from a peer has less weight than a VP-commissioned output.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "You said yes too quickly, Kevin is hostile, and the session produces nothing the analytics team will use. The VP is disappointed and you burned a peer relationship.",
      lessons: [
        "An unconditioned yes to 'take a look' converts a possible consult into an open-ended commitment.",
        "Saying you can handle a territorial peer dismisses information the VP gave you as a warning.",
        "A joint introduction is not optional when the peer is territorial. It sets the authority framing that makes the engagement possible.",
      ],
    },
  ],
};
