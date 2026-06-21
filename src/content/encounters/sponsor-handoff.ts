import type { Encounter } from "../../game/types";

export const sponsorHandoff: Encounter = {
  id: "sponsor-handoff",
  title: "The Handoff",
  difficulty: "measured",
  opponent: {
    name: "The Sponsor",
    role: "Your departing champion who can pass you on",
    archetype: "Constrained Sponsor",
    blurb: "He is leaving. Get him to transfer his backing to a named successor before he goes.",
  },
  scene:
    "Your departing sponsor still carries real standing on his way out. For two years he opened doors for you. Now he is leaving, and his backing leaves with him unless he hands it off. You want him to transfer his sponsorship of you to a specific named successor leader before he goes, with a concrete introduction.",
  objective:
    "Get him to hand off his sponsorship of you to a named successor with a concrete introduction, not a vague good word.",
  startStanding: 58,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "I am going to miss working with you. I have always thought highly of what you do, and I want to make sure that does not just evaporate when I walk out the door.",
      choices: [
        {
          id: "s1a",
          tag: "Name the successor",
          line:
            "That means a lot. The person I would want to inherit your read on me is Dana. She is taking your portfolio, and your word to her would carry more than anything I could say myself.",
          points: 5,
          standing: 11,
          momentum: 15,
          reaction:
            "Dana is exactly the right call. She trusts my judgment on people, and she will be the one making these decisions next year. Good instinct.",
          principle:
            "A handoff needs a named recipient. Pointing your sponsor at the specific person who inherits his power makes the transfer concrete.",
          keywords: ["dana", "named", "successor", "inherit", "your word", "specific", "portfolio", "introduce"],
        },
        {
          id: "s1b",
          tag: "Voice the anxiety",
          line:
            "Honestly I am worried. Once you are gone I am not sure anyone up there has my back, and that keeps me up at night.",
          points: -2,
          standing: -10,
          momentum: -2,
          reaction:
            "I understand the worry, but you cannot lead from that place. People can smell anxiety, and it is not the note you want me leaving on.",
          principle:
            "Framing the ask around your fear makes it about your need, not his judgment. It also signals the very insecurity you want him to vouch against.",
          keywords: ["worried", "anxiety", "back", "scared", "keeps me up", "need", "alone", "exposed"],
        },
        {
          id: "s1c",
          tag: "Ask him to point the way",
          line:
            "I would value that. Who, on your way out, do you think is the right person for me to be connected to so your read on me does not get lost?",
          points: 2,
          standing: 5,
          momentum: 7,
          reaction:
            "Good question. Let me think about who is actually going to be in the room. There are a couple of names, but one stands out.",
          principle:
            "When you do not yet have a name, let the sponsor surface the right one. His pick is the one he will most readily back.",
          keywords: ["who", "right person", "connected", "your read", "guidance", "point", "lost", "successor"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "I want to help, but you will need to tell me what that actually looks like for you.",
        principle: "A sponsor will not invent the handoff for you. Bring him a specific person and a specific action.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "Alright, say I talk to Dana. What exactly do you want me to convey. I do not want to oversell and have it ring hollow when you are not in the room.",
        ifStandingBelow: [
          40,
          "I will be honest, after that last note I am not sure how strongly I can put myself behind this.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Frame it as continuity",
          line:
            "Just tell her what you have seen with your own eyes. Frame it as continuity: the same judgment you have been applying to me is the judgment you are handing her. She is inheriting a vetted bet, not a stranger.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "That is the right framing. I am not asking her to take a flier. I am telling her the work is already done. That I can say with full conviction.",
          principle:
            "Frame the handoff as continuity of the sponsor's own judgment. He vouches for his track record, which is far easier than vouching for your future.",
          keywords: ["continuity", "your eyes", "judgment", "vetted", "inheriting", "track record", "conviction", "seen"],
        },
        {
          id: "s2b",
          tag: "Leave it vague",
          line:
            "Just put in a good word generally. Tell her I am one of the strong ones and she should keep an eye on me.",
          points: -2,
          standing: -9,
          momentum: -3,
          reaction:
            "A good word is what I say about half the team on my way out. If that is all this is, it will not move her an inch.",
          principle:
            "A generic good word is forgettable. Vagueness wastes the one piece of standing your sponsor has left to spend on you.",
          keywords: ["good word", "generally", "keep an eye", "strong", "vague", "mention", "one of", "sometime"],
        },
        {
          id: "s2c",
          tag: "Give him specifics",
          line:
            "Point to the platform launch and the retention turnaround. Concrete wins she can verify give your endorsement something to stand on.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Specifics help. If I can hang it on real outcomes she can check, the endorsement holds weight after I am gone.",
          principle:
            "Arm your sponsor with verifiable specifics. An endorsement anchored to checkable facts survives his departure.",
          keywords: ["specifics", "platform", "retention", "verify", "concrete", "outcomes", "anchor", "checkable"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Help me out here. Give me something specific I can actually say to her.",
        principle: "Do not make your sponsor guess his own script. Hand him the exact message and the proof behind it.",
      },
    },
    {
      id: "s3",
      prompt:
        "There is one thing. I do not have unlimited capital left, and there are a few people asking me for favors on my way out. Make the case for why this is the one worth spending it on.",
      choices: [
        {
          id: "s3a",
          tag: "Make the intro easy",
          line:
            "Spend the least, not the most. A two line note to Dana and a fifteen minute warm intro is all I need. I will carry it from there. You do the connect, I do the work.",
          points: 5,
          standing: 10,
          momentum: 15,
          reaction:
            "That I can do without blinking. A note and one introduction. If you take it from there, this costs me almost nothing and helps you a lot.",
          principle:
            "Lower the cost of the favor. A handoff your sponsor can complete in minutes is one he will actually finish before he leaves.",
          keywords: ["easy", "two line", "warm intro", "fifteen minutes", "low cost", "i carry it", "connect", "minimal"],
        },
        {
          id: "s3b",
          tag: "Ask him to pressure her",
          line:
            "Lean on her a bit. You still have pull, so make it clear to Dana that backing me is what you expect of her.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "I am not going to strong-arm my successor on my way out. That poisons the well for her and for you. She would resent the pressure and aim it at you.",
          principle:
            "Asking a sponsor to pressure your future backer turns a gift into an imposition. The successor resents coercion and turns it on you.",
          keywords: ["lean on", "pressure", "pull", "expect", "strong-arm", "demand", "force", "make her"],
        },
        {
          id: "s3c",
          tag: "Tie it to his legacy",
          line:
            "Think of it as the last thing you build here. The people you elevated on your way out become part of how this place remembers you.",
          points: 2,
          standing: 5,
          momentum: 7,
          reaction:
            "There is something to that. I would rather be remembered for who I lifted than for any one project. Fine. This is worth it.",
          principle:
            "Tie the handoff to what your sponsor cares about as he leaves. Legacy is a reason of his own to spend the favor.",
          keywords: ["legacy", "last thing", "elevated", "remembered", "lifted", "build", "leave behind", "reputation"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "I hear you, but tell me plainly why this is the favor worth my last bit of capital.",
        principle: "When a sponsor weighs his remaining capital, make your ask the cheapest and the most meaningful one on his list.",
      },
    },
    {
      id: "s4",
      prompt: "Good. So how do we actually do this before I am out of here next week.",
      choices: [
        {
          id: "s4a",
          tag: "Lock the concrete intro",
          line:
            "Send Dana a short note today copying me, frame it as continuity of your judgment, and ask her for a fifteen minute intro before Friday. I will take it from there.",
          points: 6,
          standing: 10,
          momentum: 18,
          reaction:
            "Done. Note to Dana today, you copied, intro on the calendar before I leave. That is clean and I will send it now.",
          principle:
            "Close a handoff on a dated, concrete introduction. A scheduled intro with you copied is a transfer that actually happens.",
          keywords: ["today", "note", "copy me", "intro", "friday", "calendar", "concrete", "before you go"],
        },
        {
          id: "s4b",
          tag: "Leave it loose",
          line: "However you want to play it. I trust you to find the right moment to mention me.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "I will try to remember. Though the right moment has a way of never quite arriving once I am buried in offboarding.",
          principle:
            "A handoff left to the right moment dies in the departure rush. Leaving it loose forfeits the transfer.",
          keywords: ["however", "trust you", "right moment", "mention", "sometime", "loose", "no rush", "whenever"],
        },
        {
          id: "s4c",
          tag: "Over-ask at the close",
          line:
            "And while you are at it, can you also flag me to the other two division heads. Might as well cover all the bases.",
          points: -2,
          standing: -11,
          momentum: -4,
          reaction:
            "Now you are turning one clean favor into a campaign. Let us do Dana well rather than three of them badly. Do not overreach.",
          principle:
            "Over-asking at the close dilutes a clean handoff into a scattered one. Bank the focused transfer and stop.",
          keywords: ["also", "while you are at it", "division heads", "cover the bases", "more", "everyone", "as well", "campaign"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Give me the one concrete thing to do, and I will do it before I leave.",
        principle: "At the close, name the single dated action. A handoff without a date is a goodbye without a bridge.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 58 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He sends Dana a note today, copies you, frames you as continuity of his own judgment, and puts a fifteen minute intro on the calendar before he leaves. His backing transfers to a named successor with a concrete bridge.",
      lessons: [
        "Name the specific successor who inherits the power. A handoff needs a recipient, not a vague good word.",
        "Frame the ask as continuity of the sponsor's judgment so he vouches for his own track record.",
        "Make the favor cheap and dated. A short note and a scheduled intro is a transfer that actually happens.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He agrees to put in a word with Dana but leaves the timing and the wording loose. You have his goodwill but no concrete introduction on the calendar before he goes.",
      lessons: [
        "A warm intention is not a handoff. Push for the named person and the dated introduction.",
        "You aligned the ask with his judgment but left the close open, so the bridge stayed unbuilt.",
        "Always end on a concrete, scheduled introduction with you copied.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He leaves without making the connection. His standing walks out the door with him, and the successor never hears your name from the one voice that mattered.",
      lessons: [
        "Leading with your anxiety makes the handoff about your need and signals the insecurity you want him to vouch against.",
        "Asking him to pressure the successor turns a gift into an imposition the successor resents and aims at you.",
        "Keep the ask specific, cheap, and dated, or the departure rush swallows it whole.",
      ],
    },
  ],
};
