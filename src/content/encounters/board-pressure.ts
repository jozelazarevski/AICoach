import type { Encounter } from "../../game/types";

export const boardPressure: Encounter = {
  id: "board-pressure",
  title: "The Break Room",
  difficulty: "adversarial",
  opponent: {
    name: "The Board Member",
    role: "A board member who corners you during the break in a board session to ask about the Q3 miss",
    archetype: "Constrained Sponsor",
    blurb: "She can influence the decision but she cannot make promises the CEO has not agreed to. You have eight minutes before the session resumes.",
  },
  scene:
    "The board session has broken for coffee. Margaret, a board member who sits on the compensation committee, pulls you aside. Her tone is not hostile but it is direct. She says she wants to talk about Q3 before the session reconvenes. You have eight minutes and no one else is listening.",
  objective:
    "Give a credible account of the Q3 miss without committing to numbers the CEO has not signed off on, and leave with her confidence intact.",
  startStanding: 40,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt: "Walk me through what happened in Q3.",
      choices: [
        {
          id: "s1a",
          tag: "Own the miss precisely",
          line:
            "We came in at sixty-eight percent of plan. The gap was a single enterprise deal that slipped to Q4 and a mid-market segment that came in below our model. I am not going to tell you the forecast was hard to make. We made a call and it was wrong.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "Good. What was wrong about the call.",
          principle:
            "Owning the specific number and naming the specific cause before anyone asks disarms the board member before she can become an audience for a defense. Precise ownership is more credible than general accountability.",
          keywords: ["sixty-eight percent", "specific number", "slipped", "call and it was wrong", "own it", "came in at", "wrong call", "not going to tell you"],
        },
        {
          id: "s1b",
          tag: "Lead with context",
          line:
            "Q3 was a challenging environment across the sector. We saw headwinds in enterprise demand that affected most companies at our stage.",
          points: -3,
          standing: -12,
          momentum: -5,
          reaction: "I am not asking about the sector. What happened at your company.",
          principle:
            "Leading with sector context before owning the number reads as excuse-making to a board member who has seen the same macro environment from eight other portfolio companies.",
          keywords: ["challenging environment", "sector", "headwinds", "enterprise demand", "most companies", "context"],
        },
        {
          id: "s1c",
          tag: "Name what you learned",
          line:
            "We missed plan by about thirty percent, and the most honest thing I can tell you is what we did not know when we set the number that we know now.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction: "What did you not know.",
          principle:
            "Framing the miss as a learning moment before anyone asks positions you as reflective rather than defensive. It converts the conversation from what went wrong to what changed.",
          keywords: ["missed plan", "most honest", "did not know", "know now", "what we learned", "thirty percent"],
        },
        {
          id: "s1d",
          tag: "Ask what she already knows",
          line:
            "What is your read on the miss from what you have heard so far? I want to make sure I am addressing the right things.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction: "I am asking you to tell me. I want your account, not my read.",
          principle:
            "Asking what she already knows before giving your own account reads as trying to calibrate your story to match the information in the room. Give your account directly.",
          keywords: ["your read", "what you have heard", "addressing right things", "calibrate", "ask what she knows"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a direct answer on the miss.",
        principle: "Own the miss with the specific number before anything else. One sentence. Then move to the cause.",
      },
    },
    {
      id: "s2",
      prompt: "What is your confidence in Q4.",
      choices: [
        {
          id: "s2a",
          tag: "Give a range with conditions",
          line:
            "I am targeting a range of one hundred to one hundred ten percent of Q4 plan. The top end requires the slipped enterprise deal to close by mid-November. If it does not close by then, I am at the low end. I will not give you a point estimate because I do not want to have this conversation again.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "That is a more useful answer than most founders give me. What does the November close depend on.",
          principle:
            "Naming a range with the specific condition that drives the difference shows you have updated your approach, not just your number. It also pre-empts the next miss by making the condition explicit.",
          keywords: ["range", "one hundred to one hundred ten", "enterprise deal", "mid-November", "low end", "point estimate", "not have this conversation again"],
        },
        {
          id: "s2b",
          tag: "Commit to a number",
          line:
            "I am highly confident we will come in at plan or above for Q4. We have the pipeline.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction: "You said that about Q3.",
          principle:
            "High-confidence point estimates after a miss invite the comparison to the last estimate. You are asking her to believe the same process will produce a different result.",
          keywords: ["highly confident", "at plan or above", "pipeline", "commit", "confident"],
        },
        {
          id: "s2c",
          tag: "Name what you are watching",
          line:
            "The single thing I am watching most closely is the enterprise close we pushed to Q4. Everything else is on track. If that lands, we are ahead of plan. If it slips again, we are not.",
          points: 5,
          standing: 9,
          momentum: 12,
          reaction: "Why are you confident it closes in Q4 if it slipped in Q3.",
          principle:
            "Naming the one variable that determines the outcome gives her a specific thing to monitor rather than a vague confidence claim. It also shows you have isolated the risk.",
          keywords: ["watching most closely", "enterprise close", "on track", "if that lands", "if it slips", "single thing"],
        },
        {
          id: "s2d",
          tag: "Defer to the CEO",
          line:
            "I want to make sure any Q4 numbers I share are aligned with what Marcus is presenting to the full board. I do not want to get ahead of that.",
          points: 0,
          standing: -4,
          momentum: -2,
          reaction: "I am asking your view, not Marcus's view. You run the revenue function.",
          principle:
            "Deferring to the CEO when a board member asks for your direct read on your own function reads as hiding behind process. She is asking what you think. That is a legitimate question.",
          keywords: ["aligned with CEO", "Marcus", "not get ahead", "defer", "full board", "presenting"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Give me a number and tell me how confident you are.",
        principle: "Give a range and name the specific condition that determines the difference. That is more defensible than a point estimate.",
      },
    },
    {
      id: "s3",
      prompt: "I am going to ask you directly. Do you think the team can hit the annual number.",
      choices: [
        {
          id: "s3a",
          tag: "Give a conditional yes",
          line:
            "I believe we can. The path requires two things: the Q4 enterprise close and a mid-market rebound that our October data suggests is happening. If both of those materialize, we are at plan. I want you to hold me to those conditions, not to a yes.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "I appreciate the honesty. What does the October data show.",
          principle:
            "A conditional yes that names the specific conditions is more credible than an unqualified yes because it gives her something to verify. Asking her to hold you to conditions, not to a yes, is the kind of intellectual honesty that builds board trust.",
          keywords: ["I believe we can", "path requires", "enterprise close", "mid-market", "October data", "hold me to conditions", "conditional"],
        },
        {
          id: "s3b",
          tag: "Say yes without conditions",
          line:
            "Yes. The team can hit the annual number.",
          points: -1,
          standing: -5,
          momentum: -2,
          reaction: "That is what you said about Q3. What is different this time.",
          principle:
            "An unqualified yes after a miss is not reassuring. It sounds like the same conviction that produced the miss. Name what is different.",
          keywords: ["yes", "can hit", "annual number", "unqualified", "confident"],
        },
        {
          id: "s3c",
          tag: "Name what you need",
          line:
            "I think we can, but I want to be honest that it is not entirely in my control. What I need is the enterprise segment to cooperate and one internal resource question resolved. I am working both.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction: "What is the resource question.",
          principle:
            "Naming what you need, not just what you are confident in, is honest and invites the board member to help if she can. It also signals that you have mapped the dependencies.",
          keywords: ["I think we can", "not entirely in my control", "enterprise segment", "resource question", "working both", "need"],
        },
        {
          id: "s3d",
          tag: "Hedge without conditions",
          line:
            "It depends on a number of factors that are still in motion. We are cautiously optimistic.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction: "Cautiously optimistic after a thirty percent miss does not tell me anything useful.",
          principle:
            "Vague hedging is the worst of both worlds: it implies doubt without naming what you would need to remove it. A conditional yes with named conditions is both more honest and more useful.",
          keywords: ["depends on factors", "cautiously optimistic", "still in motion", "hedge", "vague"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need a cleaner answer than that.",
        principle: "Give a conditional yes with the specific conditions named. Asking her to hold you to conditions, not to a yes, is what makes it credible.",
      },
    },
    {
      id: "s4",
      prompt: "What do you need from me.",
      choices: [
        {
          id: "s4a",
          tag: "Name one specific ask",
          line:
            "I need the board to hold the Q4 range, not a point estimate. If the conversation in the session moves toward a single number, I want you to help anchor it to the range I described. That is something I cannot do from outside the board room.",
          points: 6,
          standing: 12,
          momentum: 14,
          reaction: "I can do that. That is a reasonable ask.",
          principle:
            "Naming a specific thing she can do within her board role, anchor the range framing in the session, gives her a way to actively support you that does not exceed what a board member can do. Vague asks are impossible to act on.",
          keywords: ["hold the range", "point estimate", "board room", "help anchor", "specific ask", "range I described", "one thing"],
        },
        {
          id: "s4b",
          tag: "Ask her to advocate for you",
          line:
            "I would like you to go to bat for me with the other board members before they form a view on Q3.",
          points: -2,
          standing: -8,
          momentum: -4,
          reaction: "I can share my read but I cannot lobby for you. That is not my role.",
          principle:
            "Asking a board member to lobby other board members on your behalf exceeds her role and makes an uncomfortable ask. Name something she can actually do.",
          keywords: ["go to bat", "advocate", "lobby", "other board members", "form a view"],
        },
        {
          id: "s4c",
          tag: "Say you have it covered",
          line:
            "Nothing. We have it handled.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction: "Then why did you miss Q3.",
          principle:
            "Declining the offer of support from a board member who asked how she can help wastes a real opportunity and sounds overconfident after a miss.",
          keywords: ["nothing", "have it handled", "covered", "no need", "we are fine"],
        },
        {
          id: "s4d",
          tag: "Ask her to send an update",
          line:
            "It would help me if you could send a brief note to the other partners after this session summarizing what you heard from me. I want them to have the direct account, not a filtered version.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction: "I can do a brief note. I cannot promise it will reach all of them.",
          principle:
            "Asking for a note to the partners is a reasonable secondary ask, but it is less actionable than asking her to anchor the range in the live session. The live session is where the damage gets done.",
          keywords: ["brief note", "partners", "summarizing", "direct account", "filtered version", "note to partners"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need to know if there is something useful I can do.",
        principle: "Name one specific thing she can do in her board role. Vague asks are impossible to act on.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 68, standingAtLeast: 45 },
      result: "won",
      baseGrade: "A",
      resolution:
        "Margaret anchors the range framing in the full session when a board member pushes for a single number. She tells you privately afterward that she thinks Q4 will be fine. You walk back into the session with one more person in your corner than you had before the break.",
      lessons: [
        "Own the miss with the precise number before anything else. Board members have seen many founders explain before accounting. Accounting first disarms the room.",
        "Give a range with the specific condition that determines the difference. A conditional estimate is more credible than a confident one after a miss.",
        "Name one specific thing the board member can do within her role. Vague asks give her nothing to act on.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "Margaret is cautiously supportive but not actively in your corner. She tells you the Q4 range framing makes sense and she will keep it in mind. You leave the conversation intact but not stronger.",
      lessons: [
        "Context before accountability always reads as deflection. The board has seen the same macro environment from every other portfolio company.",
        "Deferring to the CEO when asked for your direct read on your own function reads as hiding behind process.",
        "Declining an offer of support after a miss sounds overconfident. Name something she can actually do.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Margaret goes into the full session without a strong view of your account and a board member's pointed question about leadership lands without anyone to help anchor the response. The session does not end well.",
      lessons: [
        "Sector context before the number reads as excuse-making to a board member who has eight other portfolio companies showing the same environment.",
        "Cautious optimism after a miss tells the board nothing. Name what would make you confident and what would not.",
        "Asking a board member to lobby other board members exceeds her role. Ask for something she can actually do.",
      ],
    },
  ],
};
