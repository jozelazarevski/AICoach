import type { Encounter } from "../../game/types";

export const referenceTrap: Encounter = {
  id: "reference-trap",
  title: "The Reference",
  difficulty: "measured",
  opponent: {
    name: "The Colleague",
    role: "A peer who has asked you to be their internal reference for a senior role",
    archetype: "Constrained Sponsor",
    blurb: "She asked you to be her reference. You have real concerns about the fit. Neither a false positive nor a direct refusal is a real option.",
  },
  scene:
    "Priya, a colleague you have worked alongside for three years and genuinely like, has asked you to serve as an internal reference for a senior director role. The hiring manager is someone you work with closely. You have real concerns about Priya's fit for the role: she is strong operationally but the role requires a political and stakeholder-management skill set you have not seen her demonstrate. If you are a false positive reference, you expose the team. If you refuse, you damage a relationship. You are in a coffee meeting with Priya right now.",
  objective:
    "Manage your own integrity without destroying the relationship or leaving Priya without an honest picture of what she is walking into.",
  startStanding: 62,
  startMomentum: 28,
  stages: [
    {
      id: "s1",
      prompt:
        "I really appreciate you agreeing to be a reference. I feel like you know my work better than almost anyone and I trust your opinion. I want to do well in this process.",
      choices: [
        {
          id: "s1a",
          tag: "Be honest about the fit",
          line:
            "I want to be a real reference for you, which means I want to be honest with you before I talk to anyone. There is one area where I am not sure this role is a match and I think you should hear it from me before you get into the process.",
          points: 5,
          standing: 8,
          momentum: 13,
          reaction:
            "Okay. Tell me what you are thinking. I can handle honest feedback.",
          principle:
            "Giving honest pre-process feedback before the reference conversation is the highest service you can offer. It protects the relationship by treating her as someone who can handle truth.",
          keywords: ["honest", "real reference", "before I talk to anyone", "fit", "one area", "hear from me", "pre-process"],
        },
        {
          id: "s1b",
          tag: "Agree without reservation",
          line:
            "Of course. I am glad to be a reference. You have done great work and I will make that clear.",
          points: -2,
          standing: 2,
          momentum: -5,
          reaction:
            "Thank you. That means a lot. What do you think I should emphasize when I talk to the hiring manager.",
          principle:
            "Agreeing to be a fully positive reference when you have real concerns commits you to either misleading the hiring manager or suddenly backing out later. Both outcomes are worse than being honest now.",
          keywords: ["of course", "glad to", "great work", "will make clear", "agree", "yes", "no hesitation"],
        },
        {
          id: "s1c",
          tag: "Ask about the role first",
          line:
            "Tell me about the role and what you understand the expectations to be. I want to know what I am being asked to vouch for before I agree.",
          points: 4,
          standing: 6,
          momentum: 10,
          reaction:
            "It is a senior director overseeing the go-to-market integration work, reporting to the VP of Partnerships. There are twelve direct stakeholders across three functions.",
          principle:
            "Understanding the role before agreeing to vouch for someone is both responsible and protective. It also gives you a natural opening to discuss fit without leading with your concerns.",
          keywords: ["tell me about", "expectations", "what the role", "vouch for", "understand first", "ask first", "know what"],
        },
        {
          id: "s1d",
          tag: "Surface the concern gently",
          line:
            "I want to do right by you here, and I want to make sure you go into this with a clear picture. Can I share one thing that I think is worth thinking through before you commit to the process.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "Yes. I would rather know now.",
          principle:
            "Framing your concern as something she should know before she commits, rather than a reason not to try, treats her as a partner rather than a subject of your judgment.",
          keywords: ["do right by you", "clear picture", "one thing", "before you commit", "worth thinking", "share", "partner"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Is there something you want to say.",
        principle: "If you have concerns, say them now. A vague hesitation at the coffee stage is worse than a clear conversation.",
      },
    },
    {
      id: "s2",
      prompt:
        "What is the one thing. Tell me directly.",
      choices: [
        {
          id: "s2a",
          tag: "Name the specific gap",
          line:
            "This role is heavily stakeholder-facing across three functions that do not naturally align. The work I have seen you do is operationally excellent but I have not seen you navigate a situation where three senior leaders had competing agendas and you had to get them to a shared decision. That is the core of this job and I do not have data to speak to it.",
          points: 6,
          standing: 10,
          momentum: 14,
          reaction:
            "That is fair. I have done some of that, but you are right that it has not been my main arena. I am thinking about whether I have examples I can pull from other contexts.",
          principle:
            "Naming the specific gap, not as a disqualifier but as the thing you cannot speak to, is the most useful feedback you can give. It tells her what to prepare and what evidence to gather before the process.",
          keywords: ["specific", "stakeholder", "three leaders", "competing agendas", "shared decision", "I have not seen", "cannot speak to", "gap"],
        },
        {
          id: "s2b",
          tag: "Soften it broadly",
          line:
            "I just want to make sure this role plays to your strengths. It is a big job and I want to be sure you are set up to succeed.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "Can you be more specific. What strengths are you worried about.",
          principle:
            "Vague concern without a specific observation is not feedback. It reads as either not knowing your own mind or not being willing to say the real thing.",
          keywords: ["plays to your strengths", "big job", "set up to succeed", "vague", "soft", "general", "broadly"],
        },
        {
          id: "s2c",
          tag: "Withdraw as reference",
          line:
            "I want to be honest with you: I am not sure I can be the right reference for this role. I think someone who has seen you work in a more stakeholder-facing environment would vouch for you more effectively.",
          points: 1,
          standing: -5,
          momentum: -2,
          reaction:
            "Are you saying I should not apply, or just that you are not the right reference.",
          principle:
            "Withdrawing as a reference without giving your actual concern leaves her without the feedback she needs to decide. She reads it as a soft no.",
          keywords: ["not the right reference", "withdraw", "someone else", "more effective", "step back", "decline"],
        },
        {
          id: "s2d",
          tag: "Name it and offer to help",
          line:
            "The specific thing is multi-stakeholder alignment under pressure. I have not seen you lead a room where people are starting from competing positions. That is different from operational leadership and it is the core of this role. I would like to help you think through whether you have examples from elsewhere, because that is what the hiring manager will probe.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is really useful. I have not framed my experience that way. Can we work through that.",
          principle:
            "Naming the gap and immediately pivoting to help her address it converts a limiting conversation into a coaching session. You protect your integrity and the relationship at the same time.",
          keywords: ["multi-stakeholder", "under pressure", "help you", "think through", "examples", "probe", "coaching", "name and help"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need you to be direct. What is the concern.",
        principle: "When someone asks you to be direct, be direct. A careful hedge at this stage reads as a soft no with no useful information.",
      },
    },
    {
      id: "s3",
      prompt:
        "Okay, I hear you. I think I have some of that experience, but I have not had to name it explicitly. What do you think I should do. Should I still apply.",
      choices: [
        {
          id: "s3a",
          tag: "Stay in your lane",
          line:
            "That is your call, not mine. What I can do is help you prepare if you do apply, and be honest with the hiring manager about what I have seen and what I cannot speak to.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "I appreciate that. I think I will apply. I need a reference who can talk about what I have done, not just what they have not seen.",
          principle:
            "Returning the decision to her is the correct move. She is not asking you to decide for her, she is asking for information. Name what you can and cannot speak to, and let her choose.",
          keywords: ["your call", "help you prepare", "honest with", "cannot speak to", "her decision", "stay in your lane", "you decide"],
        },
        {
          id: "s3b",
          tag: "Recommend she not apply",
          line:
            "Honestly, I think the risk is real. The role might be a stretch too far right now and I would not want you to take a hit on a near miss. Maybe wait for the next one.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "I did not ask you whether I should apply. I asked what you think I should do to prepare.",
          principle:
            "Recommending someone not apply for a role they want, without being asked for that recommendation, is paternalistic and reads as making their career decision for them.",
          keywords: ["not apply", "recommend against", "too much stretch", "near miss", "wait", "risk is real", "maybe later"],
        },
        {
          id: "s3c",
          tag: "Encourage her fully",
          line:
            "Apply. You have more to offer than you are giving yourself credit for. The examples are there, you just need to articulate them.",
          points: 0,
          standing: 0,
          momentum: -2,
          reaction:
            "Thanks. But I still want to know: if the hiring manager asks you about stakeholder management, what will you say.",
          principle:
            "Unconditional encouragement after raising a specific concern is not reassurance, it is a reversal. She is trying to understand your actual position before she builds her case.",
          keywords: ["apply", "encourage", "more to offer", "giving credit", "examples are there", "you can do it", "fully encourage"],
        },
        {
          id: "s3d",
          tag: "Help her build the case",
          line:
            "If you apply, I want you going in with three specific examples of situations where you got people with different interests to commit to a shared path. Let me help you find them. If you can get to three strong examples, I can speak to them as your reference.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is exactly what I need. Can we do that right now.",
          principle:
            "Offering to help her build the specific evidence that addresses your concern converts your objection into a development session. You protect your integrity while actively supporting her candidacy.",
          keywords: ["three examples", "help her build", "specific", "shared path", "different interests", "can speak to them", "coaching", "evidence"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "That does not really answer the question. Should I apply or not.",
        principle: "Do not answer whether she should apply. Answer what you can do for her if she does.",
      },
    },
    {
      id: "s4",
      prompt:
        "If the hiring manager asks you whether I am ready for this specific role, what will you say. I want to know so I am not walking in blind.",
      choices: [
        {
          id: "s4a",
          tag: "Be specific about what you will say",
          line:
            "I will say that you are one of the strongest operational leaders I have worked with and that the work I have seen you do is excellent. If they ask about multi-stakeholder alignment, I will say that I have not seen you in that specific context and then tell them what I have seen you do in adjacent situations. I will not make claims I cannot back up.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction:
            "That is fair. I would rather know that than find out the reference was soft after the fact.",
          principle:
            "Telling a candidate exactly what you will say to the hiring manager is the highest form of transparency in a reference situation. It protects both of you and removes hidden risk from the process.",
          keywords: ["I will say", "specific", "strong operationally", "not seen in that context", "adjacent", "cannot back up", "tell you exactly", "transparent"],
        },
        {
          id: "s4b",
          tag: "Commit to a strong reference",
          line:
            "I will give you a strong reference. I will focus on what you have done and I will not raise the concerns I mentioned to you.",
          points: -3,
          standing: -12,
          momentum: -6,
          reaction:
            "I appreciate that, but now I am worried you are not being straight with me. Are there concerns you are going to keep to yourself.",
          principle:
            "Committing to conceal your concerns to give a stronger reference is not loyalty, it is a lie by omission. She will also hear the gap between what you say here and what the hiring manager reports back.",
          keywords: ["strong reference", "not raise concerns", "focus on what you did", "commit", "hide concerns", "will not mention"],
        },
        {
          id: "s4c",
          tag: "Offer to be replaced",
          line:
            "If you feel like my honest reference could hurt your candidacy, I think you should find someone who has seen you in a more directly relevant context. I would rather you succeed than have me be your reference.",
          points: 1,
          standing: -3,
          momentum: -2,
          reaction:
            "So you are saying my reference is going to hurt me.",
          principle:
            "Offering to step back as a reference after this conversation plants the read that your reference would be harmful. The damage is done whether or not she replaces you.",
          keywords: ["replace me", "find someone else", "step back", "more relevant", "hurt your candidacy", "offer to withdraw"],
        },
        {
          id: "s4d",
          tag: "Ask what she needs from a reference",
          line:
            "Let me ask you this: what does a strong reference for you look like in this process. Tell me what you want the hiring manager to walk away believing, and I will tell you honestly if I can make that case.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "I want them to believe I can handle complexity and difficult people. That is what this role demands.",
          principle:
            "Asking what she needs from a reference before confirming what you can provide surfaces whether your reference has value for her specific goal. It also gives her agency in shaping her own candidacy.",
          keywords: ["what do you need", "from a reference", "hiring manager believe", "tell me what you want", "can I make that case", "her goal"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "I need to know what you are actually going to say.",
        principle: "She is asking a direct question. Tell her exactly what you will say to the hiring manager.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 60 },
      result: "won",
      baseGrade: "A",
      resolution:
        "She leaves the conversation with three specific examples to build, a clear picture of what you can and cannot speak to, and an appreciation for your honesty. The relationship is stronger, not weaker.",
      lessons: [
        "Honest feedback before the process is the highest service you can offer. It protects the relationship by treating the person as someone who can handle truth.",
        "Name the gap and immediately offer to help address it. That is advocacy, not obstruction.",
        "Tell a candidate exactly what you will say to the hiring manager. Transparency removes hidden risk from both sides.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "She applies with some idea of your concerns but no clear picture of what you will say. The reference goes through but neither of you is confident in how it landed.",
      lessons: [
        "Vague concern without a specific observation is not feedback. Say the specific thing.",
        "Offering to help her build the case turns your objection into partnership. It is the best move available.",
        "She needed to know what you would say to the hiring manager. If you did not tell her, she found out later.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "She thanks you, applies anyway, and the reference is described as lukewarm by the hiring manager. She does not get the role and knows your reference was part of it.",
      lessons: [
        "Agreeing without reservation when you have real concerns commits you to either misleading the hiring manager or backing out later.",
        "Recommending she not apply without being asked is paternalistic. Return the decision to her.",
        "Committing to conceal your concerns is not loyalty. She will hear the gap between what you said and what was reported.",
      ],
    },
  ],
};
