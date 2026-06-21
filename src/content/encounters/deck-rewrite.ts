import type { Encounter } from "../../game/types";

export const deckRewrite: Encounter = {
  id: "deck-rewrite",
  title: "The Rewrite",
  difficulty: "pointed",
  opponent: {
    name: "The Executive",
    role: "A senior exec who rewrote your board deck section the night before without telling you",
    archetype: "Guarded Manager",
    blurb: "She rewrote your section and sent the revised version without asking. You are presenting in twelve hours. Handle it without making it a confrontation.",
  },
  scene:
    "You are presenting a section of a board deck tomorrow morning. At 10 PM tonight, the Chief of Staff forwarded you a message from Elena, a Senior VP you report to indirectly. Elena rewrote your section substantially and sent the revised version to the board deck coordinator as the final. Your analysis, your framing, and three key data points you chose are gone. The revised version is technically fine but makes different claims than you would make and changes the recommendation. You have twelve hours and Elena is online right now.",
  objective:
    "Understand why she rewrote it, recover what you need to recover without making it a confrontation, and walk into the board presentation as a credible voice on your own section.",
  startStanding: 44,
  startMomentum: 22,
  stages: [
    {
      id: "s1",
      prompt:
        "I see you received the updated version of your section. I made some changes I think will land better in the room tomorrow.",
      choices: [
        {
          id: "s1a",
          tag: "Ask what drove the change",
          line:
            "I appreciate you sending it and I want to understand what drove the changes before tomorrow. There are a few things in the original I feel strongly about and I want to make sure I understand your read before we decide what stays.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "The board has seen a version of this data before and I wanted to update the framing to reflect where we are now, not where we were six weeks ago.",
          principle:
            "Asking what drove the changes before expressing any concern signals that you are trying to understand, not resist. It also might reveal that her changes are more defensible than you thought.",
          keywords: ["what drove", "understand", "before tomorrow", "feel strongly", "your read", "decide together", "before we decide"],
        },
        {
          id: "s1b",
          tag: "Push back on the process",
          line:
            "I want to raise that this was sent without checking with me first. I understand you have authority over the deck, but I would have liked to be included before the version was finalized.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "We are on a tight timeline and I made a judgment call. The content is what matters.",
          principle:
            "Raising the process before understanding the content is the wrong sequence at 10 PM the night before a board presentation. It signals that you care more about being consulted than about getting it right.",
          keywords: ["process", "without checking", "authority", "finalized", "should have included", "consult me", "push back"],
        },
        {
          id: "s1c",
          tag: "Accept the version",
          line:
            "Got it. I will present the updated version as written.",
          points: -1,
          standing: -3,
          momentum: -3,
          reaction:
            "Good. Let me know if you have any questions about the framing.",
          principle:
            "Accepting the rewritten version without engaging on the content means presenting claims you may not be able to defend under questioning. If the board asks something your original addressed and her version does not, you are exposed.",
          keywords: ["accept", "as written", "will present", "fine", "got it", "no problem", "okay"],
        },
        {
          id: "s1d",
          tag: "Name the one concern",
          line:
            "The version looks solid overall. The one thing I want to flag is the recommendation on page four. The framing there is different from what the underlying data supports and I want to make sure I can defend it in the room if someone pushes. Can we talk through it.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "What is your concern with page four specifically.",
          principle:
            "Accepting most of the rewrite while naming the specific thing you cannot defend in the room converts a confrontation into a targeted technical conversation. She rewrote the deck, not your judgment in the room.",
          keywords: ["one thing", "page four", "framing different", "defend in the room", "underlying data", "specific", "talk through"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "Is there something specific you want to raise or are you okay with it.",
        principle: "Name the specific concern. Vague hesitation at 10 PM the night before a board presentation helps no one.",
      },
    },
    {
      id: "s2",
      prompt:
        "Tell me what your concern is with page four.",
      choices: [
        {
          id: "s2a",
          tag: "Name the data gap",
          line:
            "The recommendation in the updated version is to accelerate the timeline by six weeks. The data I collected does not support that and two of the three data points I used in the original version are no longer in the deck. If the board asks what supports the six-week acceleration, I do not have a clean answer. I want to either put the data points back or soften the recommendation.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "I removed those data points because they were from a survey that is now seven months old. I used more recent data from the pipeline analysis.",
          principle:
            "Naming the specific data gap and its consequence in the room is the clearest possible case for a change. It makes the discussion about evidence, not about whose version is correct.",
          keywords: ["data gap", "does not support", "data points removed", "clean answer", "board asks", "soften recommendation", "evidence", "six weeks"],
        },
        {
          id: "s2b",
          tag: "Defend your original framing",
          line:
            "My original framing of the recommendation was more conservative and I think it is closer to what the data actually shows. The six-week acceleration feels aggressive.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "I have more context on the board's priorities than you do. The acceleration is what they want to see.",
          principle:
            "Defending your original framing against someone who has more board context than you is a hard case to make. She may be right. Lead with the data question, not your preference.",
          keywords: ["my original", "more conservative", "closer to data", "feels aggressive", "defend my version", "original was better"],
        },
        {
          id: "s2c",
          tag: "Ask about the new data",
          line:
            "Before I weigh in further, can you walk me through the pipeline analysis you used. If the new data supports the six-week acceleration, I want to understand it so I can speak to it confidently in the room.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction:
            "The pipeline data shows deals closing three weeks earlier than modeled. Two large accounts are signing by end of Q3 and the board knows this.",
          principle:
            "Asking to understand the new data before pushing back signals intellectual openness. If the data is better than yours, incorporating it is the right move. You also get the information you need to defend the recommendation.",
          keywords: ["pipeline analysis", "understand it", "new data", "confidently", "walk me through", "ask about", "show me"],
        },
        {
          id: "s2d",
          tag: "Offer a compromise version",
          line:
            "What if we adjust the recommendation to say we are targeting the six-week acceleration contingent on Q3 pipeline close. That way if the board asks about the basis, I have a clean conditional answer and it accurately reflects what the data shows.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "That is defensible. Let me see the language.",
          principle:
            "Proposing a specific compromise that makes both the data and the recommendation defensible converts a disagreement into a drafting problem. It is collaborative rather than combative.",
          keywords: ["compromise", "contingent on", "conditional", "clean answer", "defensible", "adjust", "language", "both of us"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need you to be specific about what you cannot defend.",
        principle: "Name the specific data gap. The executive needs to know what breaks down under questioning, not that you prefer a different approach.",
      },
    },
    {
      id: "s3",
      prompt:
        "Okay. The pipeline data supports the acceleration. But I hear your concern about being able to defend it in the room. What do you need from me to feel confident presenting it.",
      choices: [
        {
          id: "s3a",
          tag: "Ask for three minutes of briefing",
          line:
            "Three minutes on the phone so I understand the pipeline numbers well enough to answer follow-up questions. I do not want to present a recommendation I cannot explain under pressure.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "I can do three minutes now. Let me pull up the file.",
          principle:
            "A three-minute phone briefing the night before converts an unknown into a known. It is a specific, low-cost request and it signals that your concern is about preparedness, not about the content.",
          keywords: ["three minutes", "phone", "pipeline numbers", "answer follow-up", "under pressure", "briefing", "understand the data"],
        },
        {
          id: "s3b",
          tag: "Ask to restore your original",
          line:
            "I want to go back to my original version. I am more confident in the framing I built and I know I can defend it.",
          points: -2,
          standing: -10,
          momentum: -5,
          reaction:
            "The board needs the updated recommendation. I am not going back to the original version.",
          principle:
            "Asking to restore your original after she has explained the reasoning for her changes reads as not listening. The case for her version got stronger when she named the pipeline data. Reversing now costs you credibility.",
          keywords: ["restore original", "go back", "my version", "my framing", "original was better", "revert"],
        },
        {
          id: "s3c",
          tag: "Ask to be in the room together",
          line:
            "I want to know that you will be in the room when I present this. If someone challenges the recommendation and I need support, I want to know you are there to add context.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "I will be there. I always attend board presentations.",
          principle:
            "Asking to have the senior leader in the room and available to add context is a reasonable safety net. It is not a request to be bailed out but a request for the team to present together.",
          keywords: ["in the room", "together", "support", "challenge", "add context", "you will be there", "team"],
        },
        {
          id: "s3d",
          tag: "Ask for the underlying analysis",
          line:
            "Can you send me the pipeline analysis before I go to bed. I will read it tonight so I walk in tomorrow with the full picture.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "I will send it now. It is a two-page summary.",
          principle:
            "Asking for the underlying analysis to read tonight is a professional request that signals you take your own credibility seriously. It is also preparation that cannot be done after the presentation.",
          keywords: ["pipeline analysis", "send it", "read tonight", "full picture", "before I sleep", "two pages", "underlying"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Tell me what would make you confident walking in tomorrow.",
        principle: "Name one specific thing that closes the preparation gap. Do not ask for permission to revert.",
      },
    },
    {
      id: "s4",
      prompt:
        "We are good on the content. I want to raise one more thing. I should have looped you in before I sent the revision. I did not handle that well.",
      choices: [
        {
          id: "s4a",
          tag: "Accept and name going forward",
          line:
            "I appreciate you saying that. Going forward, if there is a material change to a section I am presenting, I want to know about it before it is finalized so I can present it confidently. That is all I need.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is fair. I will do that. Good luck tomorrow.",
          principle:
            "Accepting the acknowledgment graciously and naming one specific process change converts a tense night into a productive working agreement. It closes the loop without relitigating the decision.",
          keywords: ["appreciate you saying", "going forward", "material change", "before finalized", "present confidently", "that is all", "accept"],
        },
        {
          id: "s4b",
          tag: "Reopen the content",
          line:
            "I appreciate that. While we are on it, I still think the original recommendation was closer to what the data supports.",
          points: -2,
          standing: -10,
          momentum: -5,
          reaction:
            "We resolved the content question. I am not going back to it again.",
          principle:
            "Reopening the content argument after she acknowledged the process error reads as using her vulnerability to relitigate a decision. It destroys the trust her acknowledgment created.",
          keywords: ["still think", "original was better", "reopen", "my version", "while we are on it", "relitgate"],
        },
        {
          id: "s4c",
          tag: "Express how it felt",
          line:
            "It was jarring to receive it from the Chief of Staff rather than from you. I want you to know that.",
          points: 0,
          standing: -2,
          momentum: -1,
          reaction:
            "I understand. I am sorry for how it came through.",
          principle:
            "Naming how the process felt is honest but it does not move anything forward. She already acknowledged it. Accept the acknowledgment and name what you need going forward.",
          keywords: ["jarring", "chief of staff", "how it felt", "want you to know", "express feelings"],
        },
        {
          id: "s4d",
          tag: "Move to tomorrow",
          line:
            "We are good. Let me read the pipeline analysis tonight and I will be ready tomorrow.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "Good. I will see you in the morning.",
          principle:
            "Closing the conversation and moving to preparation signals that you are outcome-focused and not carrying the process grievance into the presentation. That is the right thing to carry into a board room.",
          keywords: ["we are good", "tomorrow", "ready", "move forward", "read tonight", "close it out", "morning"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "I said I should have looped you in. What do you need from me.",
        principle: "Accept the acknowledgment and name one specific process change. That is the only productive close to this conversation.",
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
        "You walk into the board presentation prepared, with a recommendation you understand and can defend. Elena acknowledges the process gap and you have a clear agreement going forward.",
      lessons: [
        "Accept the rewrite on the parts that are fine. Fight only for the specific thing you cannot defend in the room.",
        "Asking what drove the changes before resisting them might reveal that her version is more defensible than yours.",
        "Accept an acknowledgment graciously and name one specific process change. Relitigating after the acknowledgment destroys the trust it created.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You present the revised section but are not fully prepared for the pipeline questions. You get through it but not cleanly.",
      lessons: [
        "The three-minute briefing the night before was the difference between prepared and not. Make the ask.",
        "When a senior leader explains the data behind their changes, ask to understand it rather than defend your original.",
        "A process acknowledgment without a named going-forward agreement is just an apology.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The board asks about the data supporting the timeline acceleration. You cannot answer cleanly. Elena steps in. The room concludes you did not own the work.",
      lessons: [
        "Accepting a version you cannot defend in the room is accepting the risk of someone else rescuing you.",
        "Pushing back on the process before understanding the content is the wrong sequence the night before a board presentation.",
        "Asking to restore your original after she explained her reasoning signals you were not listening.",
      ],
    },
  ],
};
