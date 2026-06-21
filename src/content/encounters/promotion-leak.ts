import type { Encounter } from "../../game/types";

export const promotionLeak: Encounter = {
  id: "promotion-leak",
  title: "The Incoming Change",
  difficulty: "pointed",
  opponent: {
    name: "The Division Head",
    role: "The executive who controls the promotion decision you just learned about",
    archetype: "Skeptical Principal",
    blurb: "You heard through the grapevine that a peer is being promoted above you. Two weeks before the announcement. Handle it without blocking it or getting caught flat-footed.",
  },
  scene:
    "A trusted colleague mentioned quietly that James, a peer at your level, is being promoted to a role that will sit above you in the hierarchy. The announcement is expected in two weeks. You have no official confirmation. You have a standing one-on-one with the Division Head tomorrow. You can either raise it or not. If you raise it poorly, you look threatened and political. If you do not raise it at all, you will be caught reacting to the announcement in two weeks with no prior signal. The right conversation is narrow and precise.",
  objective:
    "Position yourself constructively before the announcement without looking like you are trying to block it or leverage inside information.",
  startStanding: 50,
  startMomentum: 24,
  stages: [
    {
      id: "s1",
      prompt:
        "Good to see you. I know you have a few things on your agenda. What is on your mind.",
      choices: [
        {
          id: "s1a",
          tag: "Raise it with a legitimate frame",
          line:
            "I want to bring up something forward-looking. There is a conversation I think would be useful to have before any changes to the org structure happen, rather than after. I am not asking about specifics, but I want to share what I am working toward so you have context.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "What changes are you anticipating.",
          principle:
            "Framing a proactive conversation about your goals as something you want to have before org changes rather than after is a legitimate way to surface your ambition without proving you have inside information.",
          keywords: ["forward-looking", "before changes", "not asking about specifics", "share what I am working toward", "context", "useful conversation", "anticipating"],
        },
        {
          id: "s1b",
          tag: "Name what you heard",
          line:
            "I heard through the grapevine that James is being promoted above me. I wanted to talk to you about it before the announcement.",
          points: -3,
          standing: -15,
          momentum: -6,
          reaction:
            "Where did you hear that. That is not something that has been announced.",
          principle:
            "Naming leaked information in front of the executive who controls it confirms that you have a source, creates concern about your judgment, and makes the conversation about the leak rather than your career.",
          keywords: ["heard through grapevine", "James", "promoted above me", "before announcement", "name what I heard", "tell you what I know"],
        },
        {
          id: "s1c",
          tag: "Use the regular agenda",
          line:
            "I want to use this meeting to talk about my development plan for the next twelve months. I have been thinking about where I want to go and I want your perspective.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "That is a great use of this time. Tell me what you are thinking.",
          principle:
            "Using the regular agenda for a development conversation is always legitimate. It may not fully address the situation but it plants your ambition on the record before the announcement.",
          keywords: ["development plan", "twelve months", "where I want to go", "your perspective", "regular agenda", "forward looking", "career"],
        },
        {
          id: "s1d",
          tag: "Name the thing you want to avoid",
          line:
            "I want to make sure I am not in a reactive position if there are org changes coming. I would rather share what I am focused on now so that if anything changes, you have a picture of where I am and what I am building toward.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is a smart way to think about it. Tell me what you are building toward.",
          principle:
            "Naming that you want to avoid a reactive position without naming the specific change signals awareness and forward-planning without proving you have inside information.",
          keywords: ["reactive position", "org changes", "share what I am focused on", "picture of where I am", "building toward", "not reactive", "ahead of it"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "What specifically did you want to talk about.",
        principle: "Lead with a legitimate reason to have the conversation. Do not name the leak.",
      },
    },
    {
      id: "s2",
      prompt:
        "Tell me what you are working toward over the next twelve months.",
      choices: [
        {
          id: "s2a",
          tag: "Name the specific level",
          line:
            "I am working toward a VP-level scope by the end of the year. I am not putting a timeline pressure on anything, I just want you to know that is the horizon I am building toward so our conversations can take that into account.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is a reasonable ambition. What is the case for VP level by end of year.",
          principle:
            "Naming the specific level you are working toward without putting timeline pressure on it gives the executive a reference point for your ambition that is on the record before any announcement.",
          keywords: ["VP level", "end of year", "not timeline pressure", "horizon", "building toward", "specific level", "you know"],
        },
        {
          id: "s2b",
          tag: "Stay vague about level",
          line:
            "I want to grow into a larger leadership scope. I am looking for opportunities to expand my impact.",
          points: 0,
          standing: -1,
          momentum: 1,
          reaction:
            "That is good to hear. What does larger scope look like for you.",
          principle:
            "Vague ambition language gives the executive nothing to remember. 'VP level by end of year' is information. 'Larger scope' is not.",
          keywords: ["vague", "larger scope", "expand impact", "opportunities", "growth", "general ambition"],
        },
        {
          id: "s2c",
          tag: "Ask about the org direction",
          line:
            "What I am working toward partly depends on where the org is heading. Can you share what the structure looks like over the next twelve months.",
          points: -1,
          standing: -5,
          momentum: -3,
          reaction:
            "I cannot share specifics on the org structure right now. Tell me about what you are working toward.",
          principle:
            "Asking about the org structure in a one-on-one when you already have grapevine information reads as trying to get official confirmation of the leak. It makes the conversation about the org change rather than your development.",
          keywords: ["where org is heading", "structure", "next twelve months", "share what", "ask about org", "direction"],
        },
        {
          id: "s2d",
          tag: "Name the work and the gap",
          line:
            "I am building toward VP-level accountability. The work I am doing on the platform expansion is my main case. The gap I am working on is external visibility, which is something I have been thinking about how to address.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "The external visibility gap is real. What are you doing about it.",
          principle:
            "Naming both the work and the gap demonstrates self-awareness. It also invites coaching rather than just approval, which is what a productive one-on-one looks like.",
          keywords: ["VP level", "platform expansion", "main case", "gap", "external visibility", "working on", "self-aware"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "I need something more specific to give you useful feedback.",
        principle: "Name the level, the main evidence, and the gap. Those three things give the executive something to work with.",
      },
    },
    {
      id: "s3",
      prompt:
        "The VP case is strong on execution. The thing I would want to see is whether you can hold a strategic conversation at the VP level, not just deliver at that level.",
      choices: [
        {
          id: "s3a",
          tag: "Ask what that looks like",
          line:
            "Can you be more specific about what a strategic conversation at the VP level looks like from where you sit. I want to understand what you are actually testing for, not just the general concept.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "A VP-level strategic conversation is one where you are anticipating what I am thinking before I say it and offering a perspective I had not considered. It is not status updates and it is not execution summaries.",
          principle:
            "Asking for specifics on what a VP-level conversation looks like gives you the criteria you need to perform against. It also signals that you are serious about understanding the bar rather than just claiming to meet it.",
          keywords: ["more specific", "what does it look like", "what you are testing for", "criteria", "not general", "tell me exactly", "specific"],
        },
        {
          id: "s3b",
          tag: "Give an example now",
          line:
            "I want to give you an example. Last month I flagged to you that the Operations migration would create a dependency bottleneck before the dependency existed. That is the kind of forward-looking read I think of as a strategic contribution.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "That was a useful flag. What else are you seeing that you have not told me.",
          principle:
            "Citing a specific past example shifts the conversation from an abstract capability claim to a data point. One example is not enough but it opens the door to more.",
          keywords: ["give an example", "last month", "flagged", "before it existed", "forward-looking", "strategic contribution", "specific", "example"],
        },
        {
          id: "s3c",
          tag: "Concede the gap",
          line:
            "That is fair. I have been heads down on execution and I have not been present enough in strategic conversations. I am going to change that.",
          points: 1,
          standing: -2,
          momentum: 2,
          reaction:
            "Tell me what changing it looks like in practice.",
          principle:
            "Conceding a gap without evidence that it is actually a gap is accepting a characterization you have not validated. Ask what strategic VP-level looks like, then assess whether you already do it.",
          keywords: ["concede", "fair", "heads down", "not present", "change that", "admit the gap", "you are right"],
        },
        {
          id: "s3d",
          tag: "Name a current strategic view",
          line:
            "Here is one I have not told you: I think our platform expansion into the Operations segment opens a path to the Finance division that none of us have drawn yet. I have been thinking about how to make that case to the CFO. Is that the kind of conversation you mean.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is exactly the kind of conversation I mean. Say more.",
          principle:
            "Offering a specific forward-looking strategic view in response to the capability question demonstrates it live rather than arguing you have it. It changes the dynamic from evaluation to collaboration.",
          keywords: ["here is one", "current strategic view", "not told you", "Finance division", "draw the path", "CFO", "demonstrate", "strategic", "say more"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need you to show me, not tell me.",
        principle: "When an executive says they want to see you hold a strategic conversation, hold one right now.",
      },
    },
    {
      id: "s4",
      prompt:
        "I want to tell you something. There will be some org changes in the next few weeks. I want to make sure you hear it from me before it is announced.",
      choices: [
        {
          id: "s4a",
          tag: "Receive it cleanly",
          line:
            "I appreciate you telling me. What does that mean for my scope.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Your scope stays the same for now. What changes is who you are aligned with structurally. I want to make sure you see this as an opportunity and not a setback.",
          principle:
            "Receiving news of a peer's promotion without showing that you already knew it is the most important thing to get right in this moment. Ask what it means for you, not what it means about them.",
          keywords: ["appreciate", "receive it", "what does it mean for me", "my scope", "not show I knew", "opportunity", "cleanly"],
        },
        {
          id: "s4b",
          tag: "Show you already knew",
          line:
            "I had heard something along those lines. I was waiting for the official word.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "You had heard. From whom.",
          principle:
            "Confirming you already knew the news puts you in a worse position than before the meeting. She now knows you have an informal source and used this conversation to position before the announcement.",
          keywords: ["heard something", "along those lines", "waiting for official", "knew", "grapevine", "already knew"],
        },
        {
          id: "s4c",
          tag: "Ask about James specifically",
          line:
            "Is this about James.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "How did you know it was about James.",
          principle:
            "Naming the person before they name them proves you had the information already and used the meeting to front-run the announcement. It destroys your credibility.",
          keywords: ["is this about james", "james specifically", "name him", "already know who"],
        },
        {
          id: "s4d",
          tag: "Ask how to position",
          line:
            "I appreciate you telling me directly. What would you like me to do between now and the announcement.",
          points: 4,
          standing: 8,
          momentum: 11,
          reaction:
            "Nothing publicly. Privately, I want you to think about how this new structure sets you up for the next step. I think it is an opportunity.",
          principle:
            "Asking what she wants you to do positions you as cooperative and forward-looking. It also gives her the chance to orient the news as something that helps you, which is the read you want to leave with.",
          keywords: ["appreciate", "what would you like me to do", "between now and announcement", "how to position", "cooperative"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -2,
        reaction: "I want to make sure you are hearing this the right way.",
        principle: "Receive the news without showing you already knew. The conversation you just had is the one she should remember.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 55 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You leave the meeting with your VP ambition on the record, a live strategic view that impressed her, and the news received well. You are positioned as someone who plans rather than reacts.",
      lessons: [
        "Name the leaked information to no one. Your advantage is using the time to plant your ambition, not to prove you knew.",
        "When an executive says they want to see you hold a strategic conversation, hold one right now. Do not argue you have the capability.",
        "Receive news without showing you already knew it. The conversation before the announcement is the one she will remember.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 52 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "You planted your ambition and received the news cleanly. The strategic conversation did not materialize. You are better positioned than you were but not definitively ahead.",
      lessons: [
        "The strategic conversation is the test. When the executive names the gap, demonstrate it live, not with a claim.",
        "Vague ambition language is information-free. Name the level, the evidence, and the gap.",
        "Using the regular agenda is fine. Using it well means arriving with a specific development narrative.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "You confirmed you had inside information and the conversation about your career is now secondary to a conversation about your judgment.",
      lessons: [
        "Naming the leaked information in front of the executive creates concern about your judgment. The leak cannot be used.",
        "Confirming you already knew names your source and proves you used the meeting to position. It is worse than saying nothing.",
        "Naming the person before they name them proves you had the information. It destroys the credibility of the conversation you just had.",
      ],
    },
  ],
};
