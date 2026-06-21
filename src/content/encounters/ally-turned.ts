import type { Encounter } from "../../game/types";

export const allyTurned: Encounter = {
  id: "ally-turned",
  title: "The Turn",
  difficulty: "adversarial",
  opponent: {
    name: "The Former Protege",
    role: "Someone you mentored who is now competing for the same VP slot and using things you told them",
    archetype: "Territorial Counterpart",
    blurb: "You mentored him. He is now in direct competition with you and positioning against you using things you said in confidence. Neutralize the threat without destroying him.",
  },
  scene:
    "Daniel worked for you three years ago as a junior manager. You sponsored his move to a peer role and invested significant time in his development. He is now, like you, a candidate for the open VP position. Over the last month, you have heard through two separate people that Daniel has been characterizing your approach to the cross-functional work as 'siloed' and citing things you told him in 1:1 conversations as evidence. He requested a coffee with you this morning. He opened by saying he wants to 'clear the air.'",
  objective:
    "Name what you know without making it a confrontation, understand his read of the situation, and leave in a position where he is no longer actively positioning against you.",
  startStanding: 32,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "I wanted to get together because I think there has been some miscommunication and I want to be straight with you about where I stand.",
      choices: [
        {
          id: "s1a",
          tag: "Name what you heard",
          line:
            "I appreciate you saying that. I want to be straight with you too. I have heard from two people that you have been describing my approach as siloed and citing things I said to you privately. I want to hear your account of that before I react.",
          points: 5,
          standing: 8,
          momentum: 13,
          reaction:
            "I did have some conversations about the cross-functional approach. I would not characterize it as positioning against you.",
          principle:
            "Naming what you heard before he can frame the conversation prevents him from setting the narrative. Saying you want to hear his account first signals that you are interested in facts, not a fight.",
          keywords: ["two people", "heard", "siloed", "privately", "your account", "before I react", "name what I heard", "straight with you"],
        },
        {
          id: "s1b",
          tag: "Let him lead",
          line:
            "Go ahead. What did you want to clear up.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction:
            "I think there has been some misunderstanding about my intentions. I want you to know I have the highest respect for your work.",
          principle:
            "Letting him set the frame of the conversation after he has already been positioning against you allows him to recharacterize the situation on his terms. You enter the conversation at a disadvantage.",
          keywords: ["go ahead", "let him lead", "you go first", "what did you want", "let him talk"],
        },
        {
          id: "s1c",
          tag: "Express the impact",
          line:
            "I want you to know that what has been coming back to me has been damaging, and it is coming from conversations you and I had privately. That is the specific thing I want to address.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "I did not mean for those conversations to come out that way. Who told you.",
          principle:
            "Naming the impact before the account focuses the conversation on what is at stake for both of you. It is harder to dismiss impact than to reframe characterizations.",
          keywords: ["damaging", "privately", "coming back to me", "specific thing", "impact", "came from our conversations"],
        },
        {
          id: "s1d",
          tag: "Name the dynamic",
          line:
            "I want to be clear about what I see happening. We are both candidates for the same role. I understand that creates pressure. What I am not willing to do is have information I shared with you in a mentoring context used against me in that process. I think you know that.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction:
            "I did not think of it as using information against you. I was sharing a perspective.",
          principle:
            "Naming the dynamic, that the competition context changes the meaning of the conversations, is accurate and forces him to acknowledge the situation. It is direct without being accusatory.",
          keywords: ["same role", "both candidates", "pressure", "mentoring context", "used against me", "I think you know", "dynamic"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "Tell me what you have heard.",
        principle: "Name what you heard before he frames the conversation. You will not get a second chance to set the baseline.",
      },
    },
    {
      id: "s2",
      prompt:
        "I did have some conversations about cross-functional coordination. I would not call it positioning. I was just sharing my read of the situation.",
      choices: [
        {
          id: "s2a",
          tag: "Name the specific characterization",
          line:
            "The specific thing that came back to me was 'siloed approach,' attributed to things I said to you when I was being candid about the challenges I was navigating. That is a different thing from sharing your read. That is taking something I said in confidence and using it to characterize my leadership to the people who make the VP decision.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "I did not frame it as siloed. I said there were coordination challenges. That is accurate.",
          principle:
            "Distinguishing between a characterization and a quote gives him the opportunity to clarify or admit. It also shows that you are not reacting to vague secondhand information but to a specific thing that was said.",
          keywords: ["specific", "siloed approach", "attributed", "candid", "characterize", "confidence", "leadership", "decision makers"],
        },
        {
          id: "s2b",
          tag: "Accept his framing",
          line:
            "Okay. If it was just your read of the situation, I can accept that.",
          points: -2,
          standing: -8,
          momentum: -5,
          reaction:
            "Good. I think there was just a miscommunication.",
          principle:
            "Accepting his reframing of 'positioning' as 'sharing my read' lets him off the hook without accountability and without a conversation about what should not happen going forward.",
          keywords: ["accept his framing", "okay", "just your read", "miscommunication", "accept it", "fine"],
        },
        {
          id: "s2c",
          tag: "Ask who he said it to",
          line:
            "Who did you share that read with.",
          points: 2,
          standing: -2,
          momentum: 4,
          reaction:
            "I had a conversation with the Division Head's chief of staff. It came up naturally.",
          principle:
            "Asking who he told clarifies the scope of the damage. If it reached the chief of staff, it reached the Division Head. That information changes what you need to do next.",
          keywords: ["who did you", "who did you tell", "who heard it", "audience", "who shared with"],
        },
        {
          id: "s2d",
          tag: "Make the line explicit",
          line:
            "The line I want to draw is this: your read of my leadership is yours. What is not yours is information I gave you in a private context when I was thinking out loud about a problem. Those are not the same thing and I want to be direct that the second one is what I am reacting to.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "I hear that. I did not think about it that way at the time.",
          principle:
            "Drawing a clear line between a peer's independent assessment and the use of confidential information names the violation without calling it a betrayal. It makes the distinction he needs to accept.",
          keywords: ["line I want to draw", "your read is yours", "private context", "thinking out loud", "not the same", "direct", "reacting to"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "That is how I saw it. I am not sure what else to say.",
        principle: "Name the specific characterization and distinguish it from a general read. He cannot deny something you can describe precisely.",
      },
    },
    {
      id: "s3",
      prompt:
        "I hear you. But I do not think I said anything that was not already visible in how the team was operating. I was not making things up.",
      choices: [
        {
          id: "s3a",
          tag: "Acknowledge what is true",
          line:
            "Some of it is visible. The part that is not visible is the context I gave you for why those challenges exist and what I was doing about them. Without that context, it reads differently than it is. And that context came from our private conversations.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "I did not think about the context piece.",
          principle:
            "Acknowledging what is true in his claim while naming the missing context is more credible than disputing everything. Most behavioral observations have some basis. The problem is the framing, not the observation.",
          keywords: ["acknowledge", "some is true", "context I gave you", "why challenges exist", "private", "reads differently", "missing context"],
        },
        {
          id: "s3b",
          tag: "Dispute the characterization",
          line:
            "The team is not operating in a siloed way. That characterization is inaccurate and I think you know it.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "That is not what I said. I said there were coordination challenges. That is different.",
          principle:
            "Disputing the characterization without acknowledging what might be true in it gives him the high ground. He can now claim you are defensive about fair feedback.",
          keywords: ["not accurate", "dispute", "inaccurate", "you know it", "that is wrong", "deny it"],
        },
        {
          id: "s3c",
          tag: "Name the effect on the decision",
          line:
            "I am not arguing about whether the observations are accurate. I am telling you that the effect of those conversations reaching the Division Head's office is that it shapes the VP decision. That is the thing I want you to understand.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "I did not think it would reach the Division Head.",
          principle:
            "Naming the concrete effect on the decision forces him to reckon with the consequence rather than the abstract question of accuracy. Most people are more moved by specific outcomes than by process arguments.",
          keywords: ["effect on decision", "Division Head", "VP decision", "shapes", "reaching", "understand the consequence", "concrete"],
        },
        {
          id: "s3d",
          tag: "Ask what he would want you to do",
          line:
            "If our positions were reversed and I had shared private conversations of yours in a context that affected your VP candidacy, what would you want me to do.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "I would want you to stop. And I would want to know it happened.",
          principle:
            "Asking what he would want in the reversed situation makes him articulate his own standard. It is harder to refuse to apply a standard you just stated.",
          keywords: ["reversed", "what would you want", "your positions", "private conversations of yours", "your candidacy", "mirror"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am not sure why we are still on this point.",
        principle: "Acknowledge the truth in his observation and name what he omitted. That combination is impossible to dismiss.",
      },
    },
    {
      id: "s4",
      prompt:
        "What do you want from this conversation. Tell me directly.",
      choices: [
        {
          id: "s4a",
          tag: "Name the two things",
          line:
            "Two things. I want you to stop using information from our private conversations to characterize my leadership to anyone who influences the VP decision. And I want to understand whether you think we can stay professional through this process, because I would rather have that be a conscious choice we both make than something that just erodes.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "Those are fair things to ask for. I can commit to both.",
          principle:
            "Naming two specific, non-punitive asks makes him commit to concrete behavior rather than a vague agreement to 'do better.' The second ask, can we stay professional, also gives both of you a framework for the competition.",
          keywords: ["two things", "stop using", "private conversations", "stay professional", "conscious choice", "fair asks", "concrete", "both"],
        },
        {
          id: "s4b",
          tag: "Ask for an apology",
          line:
            "I want an apology and I want you to correct the impression with the people you spoke to.",
          points: -1,
          standing: -6,
          momentum: -3,
          reaction:
            "I am sorry you feel that way. I am not sure I can unsay something I said weeks ago.",
          principle:
            "Asking for an apology in a competitive context hands him the chance to give you an ambiguous one. 'I am sorry you feel that way' is not what you want and it closes the conversation without a going-forward commitment.",
          keywords: ["apology", "correct the impression", "unsay", "sorry", "formal apology", "take it back"],
        },
        {
          id: "s4c",
          tag: "Name what you will do",
          line:
            "I want you to know that if this continues, I am going to address it with the Division Head directly. I am telling you that now rather than doing it without warning.",
          points: 1,
          standing: -4,
          momentum: 3,
          reaction:
            "That sounds like a threat.",
          principle:
            "Threatening to escalate in the same conversation where you are asking for cooperation makes the next move adversarial. Use escalation as a last resort, named only after you have exhausted direct engagement.",
          keywords: ["escalate", "Division Head", "address it", "warning", "if this continues", "threat", "telling you now"],
        },
        {
          id: "s4d",
          tag: "Name what you want to protect",
          line:
            "I want to protect the relationship we built. I also want this competition to be clean. What I do not want is to be in a position where I have to manage what I say to you because it might end up in someone else's inbox. Tell me whether that is something we can agree on.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "I understand. Yes. We can agree on that.",
          principle:
            "Naming what you want to protect, the relationship and the integrity of the competition, converts a confrontation into a shared interest. It gives him a reason to agree that is not just compliance with your demand.",
          keywords: ["protect the relationship", "clean competition", "what I do not want", "agree on", "shared interest", "manage what I say", "protect"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need you to say what you specifically want from me.",
        principle: "Name two specific, non-punitive asks. Vague requests give him nothing to agree to.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 40 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He commits to both asks. The competition continues but the back-channel positioning stops. You leave as the person who handled the situation with more composure than he expected.",
      lessons: [
        "Name what you heard before he frames the conversation. You will not get a second chance to set the baseline.",
        "Draw a clear line between a peer's independent assessment and the use of confidential information. That distinction is the whole argument.",
        "Name two specific asks, not a vague demand. A commitment to concrete behavior is the only thing that changes what happens next.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He apologizes but you are not sure what he will do next. The conversation was inconclusive and you leave without a clear commitment.",
      lessons: [
        "An ambiguous apology is not a going-forward commitment. Name the two specific things you want and get him to commit to them.",
        "Asking for an apology in a competitive context usually produces 'I am sorry you feel that way.' It is not what you need.",
        "Name what you want to protect. Shared interests are more durable than compliance.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He leaves the conversation feeling threatened and accelerates the positioning. The situation is now worse than before the coffee.",
      lessons: [
        "Letting him set the frame of the conversation after he has been positioning against you allows him to recharacterize on his terms.",
        "Threatening to escalate in the same conversation where you are asking for cooperation makes the next move adversarial.",
        "Accepting his reframing of 'positioning' as 'sharing a read' lets him off the hook without accountability.",
      ],
    },
  ],
};
