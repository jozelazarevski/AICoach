import type { Encounter } from "../../game/types";

export const clientUltimatum: Encounter = {
  id: "client-ultimatum",
  title: "The Retention Call",
  difficulty: "pointed",
  opponent: {
    name: "The Client CTO",
    role: "A client CTO who says they will only renew if you personally stay on the account",
    archetype: "External Counterpart",
    blurb: "He controls a contract worth 40 percent of your division's revenue. He trusts you. He does not trust your company. He is asking for a personal commitment you may not be able to give.",
  },
  scene:
    "Your largest client's CTO calls. The renewal is in three weeks. He says the partnership has worked because of you specifically, and if you move to a different account or leave the company, they will not renew. He is not making a threat. He is telling you a fact about how he makes decisions.",
  objective:
    "Keep the renewal without making a personal commitment you cannot keep and without alarming him about things he does not need to know yet.",
  startStanding: 48,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt: "I want to be straight with you. The relationship works because of you. If that changes, we have a problem.",
      choices: [
        {
          id: "s1a",
          tag: "Acknowledge without committing",
          line:
            "I hear you, and I take that seriously. The relationship matters to me too. What I want to make sure is that you are choosing to renew because the work has been strong, not because of any one person's continuity. Can you tell me more about what is driving the concern right now.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "I have seen what happens when account leads change. The context disappears and we start over.",
          principle:
            "Acknowledging the concern without making a commitment, and redirecting to what he actually values, is the right first move. It opens the conversation without closing your options.",
          keywords: ["I hear you", "take that seriously", "choosing to renew", "strong work", "driving the concern", "what is driving"],
        },
        {
          id: "s1b",
          tag: "Promise you will stay",
          line:
            "I am not going anywhere. You have my word on that.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "Good. Can you put something in writing.",
          principle:
            "Promising continuity without checking with your manager or knowing your own plans is a commitment you may not be able to keep. When it breaks, you lose the client and your credibility at once.",
          keywords: ["not going anywhere", "my word", "promise", "I will stay", "guaranteed", "you have my word"],
        },
        {
          id: "s1c",
          tag: "Tell him it is not how this works",
          line:
            "I appreciate the confidence, but account assignments are a business decision. I cannot make personal guarantees about where I will be.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "That is exactly my concern. If it is a business decision, the business might decide differently.",
          principle:
            "Stating policy before acknowledging what he actually said reads as dismissing the relationship. He knows how account assignments work. He is telling you about his decision-making, not asking for a policy explanation.",
          keywords: ["business decision", "cannot guarantee", "account assignments", "policy", "not how it works"],
        },
        {
          id: "s1d",
          tag: "Surface what he is really protecting",
          line:
            "It sounds like the real concern is context loss, not the name on the account. If we can structure this renewal so the institutional knowledge stays intact regardless of who is in the seat, would that address it.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "That is part of it. But I also trust your judgment in a way I do not yet trust your organization.",
          principle:
            "Identifying what he is actually protecting, context and judgment, rather than treating the ask at face value opens a path to solutions that do not require a personal commitment you cannot make.",
          keywords: ["context loss", "institutional knowledge", "regardless of who", "address it", "real concern", "what he is protecting"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am not trying to put you in a difficult position. I am just telling you how we decide.",
        principle: "Acknowledge what he said before responding to it. The concern is real. Find out what he is actually protecting before you decide what to offer.",
      },
    },
    {
      id: "s2",
      prompt: "We have had three account managers on other vendor relationships in two years. Each time, we lost six months re-explaining ourselves. I cannot do that again.",
      choices: [
        {
          id: "s2a",
          tag: "Propose a continuity structure",
          line:
            "That is a legitimate concern and I have seen it happen. What I can commit to is this: regardless of what changes, I will personally ensure that context handoff is treated as a deliverable, not a courtesy. I can also propose that any transition involves a sixty-day parallel period. Would that change the math.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "A sixty-day parallel period is something I could actually take to my CEO. What would that look like.",
          principle:
            "Committing to a process you can control, not a personal guarantee about your role, converts an impossible ask into a solvable structural problem. The transition protocol is something you can actually deliver.",
          keywords: ["continuity structure", "context handoff", "sixty-day", "parallel period", "commit to process", "deliverable not courtesy"],
        },
        {
          id: "s2b",
          tag: "Minimize the concern",
          line:
            "I understand the frustration, but a good account lead transition should not take six months. That sounds like an execution problem, not an inherent risk.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "You may be right, but that is not reassuring when I am the one absorbing the disruption.",
          principle:
            "Telling a client their concern is an execution problem dismisses real experience they have had. Even if you are right, this is the wrong moment for it.",
          keywords: ["minimize", "not inherent", "execution problem", "should not take", "frustration", "bad transition"],
        },
        {
          id: "s2c",
          tag: "Validate and buy time",
          line:
            "That experience would make me cautious too. Before I say anything I cannot back up, can I come back to you with a specific proposal by end of week.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "End of week works. The board meeting where we finalize the renewal budget is Monday.",
          principle:
            "Buying time to make a real proposal is legitimate. Naming why you need it, to avoid saying something you cannot back up, is more credible than a vague delay.",
          keywords: ["buy time", "come back to you", "end of week", "cannot back up", "specific proposal", "before I say"],
        },
        {
          id: "s2d",
          tag: "Ask what would actually satisfy him",
          line:
            "What would need to be true about this renewal for you to feel confident even if the account team changes.",
          points: 5,
          standing: 9,
          momentum: 11,
          reaction: "I would want a written protocol and a named escalation path that goes above account management.",
          principle:
            "Asking what would satisfy him directly avoids the trap of proposing solutions to the wrong problem. Let him name the actual requirement before you try to meet it.",
          keywords: ["what would satisfy", "feel confident", "even if", "what would need", "ask him directly"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am listening. What can you actually commit to.",
        principle: "Offer a structural commitment you can control. A transition protocol or parallel period is something you can actually deliver. A personal guarantee about your future role is not.",
      },
    },
    {
      id: "s3",
      prompt: "I need to know: are you planning to move off this account in the next twelve months.",
      choices: [
        {
          id: "s3a",
          tag: "Answer honestly with context",
          line:
            "I do not have plans to move off this account. What I cannot tell you is that I know for certain what twelve months holds for either of us. What I can tell you is that this account is a priority for me and for the business, and if anything were to change, I would not let it happen without a proper handoff that I personally managed.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "That is a more honest answer than I expected. I appreciate it.",
          principle:
            "Answering honestly, naming what you do not know, and committing to what you can control is more credible than a clean assurance. It also does not create a promise you cannot keep.",
          keywords: ["do not have plans", "cannot tell you for certain", "twelve months", "priority", "proper handoff", "personally managed"],
        },
        {
          id: "s3b",
          tag: "Say no definitively",
          line:
            "No. I am not planning to move off this account.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction: "Can I hold you to that.",
          principle:
            "A definitive no to a twelve-month question without any qualifier sets up a future conversation you may not be able to manage. An honest answer with context is more durable.",
          keywords: ["no", "not planning", "definitive", "simple no", "not moving"],
        },
        {
          id: "s3c",
          tag: "Redirect to the company relationship",
          line:
            "I want to gently push back on framing it that way. The question I would rather we focus on is whether our company is delivering what you need, not whether a specific person is in a specific seat.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction: "I understand the principle but that is not the question I asked.",
          principle:
            "Redirecting when someone asks you a direct question reads as evasion, especially on a direct question about your plans. Answer the question first, then reframe if it is useful.",
          keywords: ["gently push back", "redirect", "company relationship", "specific person", "specific seat", "not the question"],
        },
        {
          id: "s3d",
          tag: "Name the uncertainty honestly",
          line:
            "What I can tell you is that I have no plans to move, and I would not make plans without thinking hard about what it means for you. Beyond that, I cannot see twelve months into the future and I would rather be honest with you than give you an answer that sounds cleaner than it is.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "I respect that. Most people would just say what I want to hear.",
          principle:
            "Naming the limits of what you can honestly commit to, rather than over-promising, is the right play with a client who values the relationship. He is more likely to trust a careful answer than a clean one.",
          keywords: ["no plans to move", "cannot see twelve months", "honest with you", "cleaner than it is", "name uncertainty", "would rather be honest"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something more concrete than that.",
        principle: "Answer the question directly, name what you do not know, and commit to what you can control. A careful honest answer is more durable than a clean one.",
      },
    },
    {
      id: "s4",
      prompt: "What do you need from me to make this renewal happen.",
      choices: [
        {
          id: "s4a",
          tag: "Name what a good renewal looks like",
          line:
            "I need the renewal to be based on the work, not on my continued presence. What that means practically is that I want to propose a continuity protocol that protects you regardless of what happens on our side. If you agree to that framing, I think we can close this in the next two weeks.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "Send me the protocol. I will review it before Monday.",
          principle:
            "Naming the framing you need, renewal based on work quality rather than personal continuity, converts a high-risk ask into a durable structure. It also moves toward close.",
          keywords: ["based on the work", "not my presence", "continuity protocol", "regardless of what happens", "close this", "framing"],
        },
        {
          id: "s4b",
          tag: "Ask for a longer term deal",
          line:
            "Honestly, if you are worried about continuity, a multi-year deal would give both of us more stability. Would you consider a three-year term.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction: "A three-year term requires more internal process on my end. I need to take that to the CFO.",
          principle:
            "Proposing a longer deal converts the continuity concern into a longer commitment but adds procurement friction. It is worth raising but should not be your only move.",
          keywords: ["longer term", "multi-year", "three-year", "more stability", "extended deal"],
        },
        {
          id: "s4c",
          tag: "Say the ball is in his court",
          line:
            "I have said what I can say. The decision is yours. I hope the partnership we have built is enough.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "That feels like you are walking away from the conversation.",
          principle:
            "Leaving the decision entirely to the client when they asked what you need from them reads as disengagement. He gave you an opening. Use it.",
          keywords: ["ball is in your court", "decision is yours", "hope it is enough", "walking away", "I have said what I can"],
        },
        {
          id: "s4d",
          tag: "Offer an executive sponsor",
          line:
            "What I can do is bring my SVP into the renewal conversation. Not as a sign-off but as a direct relationship at a peer level for you. That gives you an escalation path that does not depend on me.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "That is actually something I have been wanting. Can you make that happen.",
          principle:
            "Offering an executive sponsor who operates at the CTO's peer level converts a personal-dependency risk into an organizational relationship. It expands the account while addressing his core concern.",
          keywords: ["executive sponsor", "SVP", "peer level", "escalation path", "does not depend on me", "bring in leadership"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something actionable I can take to my team.",
        principle: "Give him something concrete: a continuity protocol, an executive sponsor, or a clear framing for the renewal. The ask was real. Match it with something real.",
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
        "He agrees to the renewal. He sends a note to his CEO saying the process gave him more confidence in the organization, not just in you. You have turned a personal dependency into a structural advantage.",
      lessons: [
        "Surface what the client is actually protecting before you try to meet the ask. Context loss and judgment trust are different problems with different solutions.",
        "Commit to what you can control, transition protocols, not what you cannot, your future role. A structural commitment is more durable than a personal guarantee.",
        "Honest answers with named uncertainty are more credible than clean answers. Clients who value relationships recognize the difference.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The renewal goes through, but with a shorter term than hoped and a note from his CFO about continuity risk. You have the account but you have not removed the underlying concern.",
      lessons: [
        "Buying time is legitimate but only if you use it. Come back with something specific.",
        "Proposing a longer deal addresses continuity but adds procurement friction. Have a fallback ready.",
        "A client who says the relationship works because of you is not making a threat. He is giving you information about what he values.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He tells you he is going to RFP the contract. He thanks you for the partnership and says the decision is not personal. It was.",
      lessons: [
        "Promising continuity without the authority to guarantee it sets up a future failure that is worse than the current conversation.",
        "Stating policy when someone shares a concern dismisses the relationship they are trying to protect.",
        "Leaving the decision entirely to the client when they asked what you need reads as you walking away from the conversation.",
      ],
    },
  ],
};
