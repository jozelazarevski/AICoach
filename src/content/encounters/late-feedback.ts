import type { Encounter } from "../../game/types";

export const lateFeedback: Encounter = {
  id: "late-feedback",
  title: "The Delayed Verdict",
  difficulty: "pointed",
  opponent: {
    name: "The Manager",
    role: "Your direct manager, surfacing a concern that is months old",
    archetype: "Guarded Manager",
    blurb: "In your review, he surfaces a six-month-old concern he never raised. Receive it cleanly without rolling over or burning the relationship.",
  },
  scene:
    "You are in your mid-year performance review. Your manager opens by saying the quantitative part of your review is strong, then adds: 'There is one piece of feedback I want to share that I have been sitting with for a while.' He goes on to describe a situation from January, six months ago, where he says you handled a cross-functional conflict in a way that 'left people feeling talked over.' You do not remember the situation the way he describes it and you were never told this at the time. The feedback feels unfair. You are also aware that how you receive this feedback is itself being evaluated.",
  objective:
    "Receive the feedback in a way that shows maturity and earns trust, surface the pattern problem without sounding defensive, and leave with a concrete understanding of what he needs from you going forward.",
  startStanding: 55,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt:
        "I want to share something I have been sitting with for a while. In January, during the cross-functional conflict with the operations team, the feedback I heard was that you handled it in a way that left people feeling talked over. I should have said this sooner, but I wanted to have the full picture before I raised it.",
      choices: [
        {
          id: "s1a",
          tag: "Receive it first",
          line:
            "Thank you for telling me. I want to make sure I understand this clearly before I respond. Can you tell me specifically what behavior you are describing, and who gave you that feedback.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "The feedback was that in the meeting on the fourteenth, you pushed the operations team to a decision before they felt ready. Specifically, you interrupted Renata twice and then called the item closed before she had finished her point.",
          principle:
            "Receiving feedback before responding to it signals emotional regulation and earns you the specifics you need to know whether the concern is accurate.",
          keywords: ["understand clearly", "before I respond", "specifically", "who gave", "thank you", "tell me more", "want to understand"],
        },
        {
          id: "s1b",
          tag: "Push back immediately",
          line:
            "I do not remember it that way. I remember that meeting being difficult because the operations team was not prepared and we had a deadline. I do not think I talked over anyone.",
          points: -3,
          standing: -14,
          momentum: -5,
          reaction:
            "I understand you see it differently. But the feedback I got was consistent and specific. I am not asking you to agree with it, I am asking you to take it seriously.",
          principle:
            "Defending your memory against feedback before understanding the specifics tells your manager that you receive all critical feedback as an attack. It also confirms the concern.",
          keywords: ["do not remember", "I remember it differently", "push back", "not true", "defend", "operations not prepared", "I did not"],
        },
        {
          id: "s1c",
          tag: "Accept it fully",
          line:
            "You are right. I can be too direct in those situations and I should have read the room better.",
          points: -1,
          standing: -3,
          momentum: -3,
          reaction:
            "I appreciate you taking it that way. Is there anything you want to say about the situation.",
          principle:
            "Accepting feedback before you understand it signals that you agree with any characterization given to you. It is not maturity, it is compliance, and it fails to surface whether the concern is accurate.",
          keywords: ["you are right", "accept fully", "too direct", "should have", "agree", "my fault", "concede everything"],
        },
        {
          id: "s1d",
          tag: "Name that you are hearing it",
          line:
            "I want to receive this well. Give me the specific situation and the specific behavior so I can take it seriously rather than either dismissing it or just agreeing.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is the right approach. The situation was the January fourteenth meeting. The specific behavior was interrupting Renata and calling the item closed before she finished.",
          principle:
            "Naming your intention to receive the feedback before responding signals emotional intelligence and frames your follow-up questions as inquiry, not defense.",
          keywords: ["receive this well", "specific situation", "specific behavior", "take it seriously", "not dismiss", "not just agree", "hear you"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "I need you to engage with what I am saying, not sidestep it.",
        principle: "In a performance review, the first move is to receive the feedback with enough specificity to evaluate it honestly.",
      },
    },
    {
      id: "s2",
      prompt:
        "Does that description match what you remember.",
      choices: [
        {
          id: "s2a",
          tag: "Give an honest account",
          line:
            "Partially. I did interrupt Renata once, and I recall it being because we were fifteen minutes over and I was watching the time. I do not recall a second interruption or calling it closed while she was mid-sentence. I could be wrong about the second one. Can you tell me what she said specifically when she gave you the feedback.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "She said she felt dismissed and did not feel like her concern was registered. The second interruption may be her perception more than a literal sequence, but the impact is what I am focused on.",
          principle:
            "An honest, specific counter-account, where you acknowledge what you did and flag what you are less certain about, is more credible than either full agreement or full denial.",
          keywords: ["partially", "honest account", "I did interrupt", "once", "do not recall second", "could be wrong", "what did she say", "specific"],
        },
        {
          id: "s2b",
          tag: "Agree with the description",
          line:
            "If that is how it landed, then I accept it. I do not want to dispute Renata's experience.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction:
            "Good. I just want to make sure it does not happen again.",
          principle:
            "Accepting a characterization without engaging with whether it is accurate treats feedback as a verdict to accept rather than information to examine. You learn nothing and commit to changing something you may not have done.",
          keywords: ["if that is how", "accept it", "do not want to dispute", "agree", "accept her experience", "her perception", "whatever she felt"],
        },
        {
          id: "s2c",
          tag: "Dispute the account",
          line:
            "Honestly, it does not match what I remember. I was managing time and the team was going in circles. I do not think I did what is being described.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "Your memory and Renata's memory are different. I am not saying one of you is lying. I am saying that the impact was real and I need you to take that seriously even if your intent was different.",
          principle:
            "Disputing feedback based on your own memory without acknowledging the possibility that your memory is incomplete is a common mistake that reads as unwilling to self-examine.",
          keywords: ["does not match", "dispute", "what I remember", "not what happened", "going in circles", "managing time", "did not do"],
        },
        {
          id: "s2d",
          tag: "Name the intent gap",
          line:
            "I remember the situation and I was managing time, not trying to dismiss her. I want to own the impact, but I also want to understand whether this is a behavior pattern or a one-time situation where intent and impact diverged.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "That is a fair distinction. This is the first time I have heard it, so I think it is more situational than a pattern. But I wanted you to know.",
          principle:
            "Distinguishing between impact and intent, and asking whether it is a pattern, shows self-awareness without either rolling over or dismissing the concern.",
          keywords: ["intent", "impact", "not dismiss", "pattern or one time", "diverged", "want to own impact", "understand whether"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a straight answer. Does it match what you remember.",
        principle: "Give an honest account, not a defensive one. Acknowledge what you can and flag what you are uncertain about.",
      },
    },
    {
      id: "s3",
      prompt:
        "Fair. Now I want to ask you something. Do you understand why I sat on this for six months before raising it.",
      choices: [
        {
          id: "s3a",
          tag: "Engage the question honestly",
          line:
            "I think I do. It is hard to raise something like this in real time and you probably wanted more data before you said anything. I understand that. What I also want you to know is that I would have preferred to hear it closer to when it happened, and I want to ask you to do that going forward.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is a fair thing to ask. I will try to be more timely. I was worried you would be defensive.",
          principle:
            "Acknowledging his reason for the delay while naming your preference for earlier feedback is the adult move. It closes the gap without making him wrong for holding it.",
          keywords: ["I understand", "wanted more data", "would have preferred sooner", "going forward", "ask you to", "fair", "closer to when"],
        },
        {
          id: "s3b",
          tag: "Express frustration",
          line:
            "Honestly, no. Waiting six months to tell me something I should have heard at the time is not fair to me. How am I supposed to correct something if I did not know it was a problem.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "I hear you. But the frustration you are showing right now is actually part of what I was worried about. This is why I held it.",
          principle:
            "Expressing frustration about delayed feedback in the performance review proves his reason for holding it. He becomes more cautious, not less.",
          keywords: ["not fair", "frustration", "should have heard sooner", "cannot correct", "six months", "express frustration", "angry"],
        },
        {
          id: "s3c",
          tag: "Accept his reasoning",
          line:
            "I understand. You wanted to be sure before you said anything. I appreciate you raising it now.",
          points: 1,
          standing: 0,
          momentum: 2,
          reaction:
            "Thank you for taking it that way.",
          principle:
            "Accepting his reasoning without naming your own preference for earlier feedback lets the pattern continue. You have now given him permission to sit on the next concern for six months too.",
          keywords: ["understand", "wanted to be sure", "appreciate now", "accept his reason", "fine", "makes sense", "okay"],
        },
        {
          id: "s3d",
          tag: "Name the pattern risk",
          line:
            "I can guess. But I want to name something: if I only hear this kind of feedback in reviews, I cannot improve in real time. I want to ask for a different agreement going forward. If you see something like this, I want to hear it within a week, even if it is just 'hey, can we talk about that meeting.'",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is reasonable. I was not sure how you would take it. I can commit to that.",
          principle:
            "Naming the structural problem with delayed feedback and proposing a specific new agreement converts a passive dynamic into an explicit one. It is a leadership move, not a complaint.",
          keywords: ["within a week", "real time", "cannot improve", "new agreement", "going forward", "specific ask", "pattern risk", "want to hear"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I am looking for some acknowledgment here.",
        principle: "When your manager explains why he sat on feedback, acknowledge his reason and then name your own preference. Both are valid.",
      },
    },
    {
      id: "s4",
      prompt:
        "Let me be direct. The overall review is strong. But I want to make sure this does not become a pattern. What are you going to do differently.",
      choices: [
        {
          id: "s4a",
          tag: "Name a specific change",
          line:
            "In high-pressure meetings where time is short and people have not landed on a decision, I am going to start explicitly asking before I move to close: 'Is everyone heard on this.' That is a small move but it changes the dynamic and it is the right check for me.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is a good habit. Simple and effective. I will look for it.",
          principle:
            "A specific behavioral commitment that is small, checkable, and connected to the actual concern is the most credible kind of follow-through. Vague commitments to 'do better' are unenforceable.",
          keywords: ["specific change", "is everyone heard", "small move", "high pressure", "before I close", "habit", "checkable", "behavioral"],
        },
        {
          id: "s4b",
          tag: "Commit vaguely",
          line:
            "I will be more aware of how I come across in those situations and make sure everyone feels heard.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "That is a bit vague. What does that look like in practice.",
          principle:
            "Vague commitments sound mature but give neither of you a way to verify follow-through. Your manager will be watching and if he cannot name what to look for, he cannot see improvement.",
          keywords: ["more aware", "how I come across", "feel heard", "vague", "general", "better at", "will be more"],
        },
        {
          id: "s4c",
          tag: "Ask for his input",
          line:
            "I want to do something specific, not just a general commitment. What specific behavior would signal to you that I have taken this on board.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Asking for input before you close out is the key move. Make it explicit and make it consistent.",
          principle:
            "Asking your manager what specific behavior would signal improvement inverts the usual dynamic. It makes him name the success criteria, which also binds him to seeing your progress.",
          keywords: ["specific", "not general", "what would signal", "his input", "success criteria", "taken on board", "what to look for"],
        },
        {
          id: "s4d",
          tag: "Acknowledge and close",
          line:
            "I want to close this out cleanly. I have heard the feedback, I have a specific change I am going to make, and I want to ask you to tell me the next time you see it, not six months later. Can we agree to that.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Yes. Agreed. Good conversation.",
          principle:
            "Closing a difficult performance conversation with a mutual agreement and a specific ask converts it from a one-way delivery into a bilateral commitment.",
          keywords: ["close it out", "heard feedback", "specific change", "tell me next time", "not six months", "mutual agreement", "agreed", "bilateral"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need something concrete. What specifically will be different.",
        principle: "Name a specific, visible behavioral change. Your manager needs to be able to see it, not just hear about it.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 56 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He closes the review noting that how you handled this feedback is itself a positive signal. You leave with a specific behavioral commitment, a mutual agreement on timing, and a stronger relationship.",
      lessons: [
        "Receive feedback with enough specificity to evaluate it honestly. Neither full acceptance nor full rejection is the right move.",
        "Name the pattern problem with delayed feedback and propose a specific new agreement. It is a leadership move, not a complaint.",
        "A specific behavioral commitment that is small and checkable is more credible than a general promise to improve.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The review ends without incident. You received the feedback reasonably well but did not ask for the new timing agreement. He may sit on the next concern just as long.",
      lessons: [
        "Acknowledging the delay in feedback without naming your preference lets the pattern continue. You gave permission for the next one.",
        "The vague commitment to 'be more aware' sounds mature but gives neither of you anything to verify.",
        "A mutual agreement on timing is the most valuable thing you can leave this conversation with.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The review ends with your manager noting that your reaction to the feedback confirmed his hesitation. He will be more careful what he shares with you going forward.",
      lessons: [
        "Pushing back on feedback before understanding the specifics confirms the concern.",
        "Expressing frustration about delayed feedback in the review proves his reason for holding it. He becomes more cautious.",
        "How you receive feedback is itself being evaluated in a performance review. The manager is watching.",
      ],
    },
  ],
};
