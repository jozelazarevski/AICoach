import type { Encounter } from "../../game/types";

export const managerCredit: Encounter = {
  id: "manager-credit",
  title: "The Stolen Credit",
  difficulty: "pointed",
  opponent: {
    name: "The Manager",
    role: "Your manager who took public credit for your work",
    archetype: "Guarded Manager",
    blurb: "He claimed your result in front of leadership. Reset the record without a war.",
  },
  scene:
    "In a leadership review your manager presented your result as his own work and took the praise in the room. You need to reset the record and protect your visibility without triggering him or starting a war you cannot win from below.",
  objective:
    "Reset the credit record and protect your visibility without making him an enemy.",
  startStanding: 35,
  startMomentum: 20,
  stages: [
    {
      id: "s1",
      prompt:
        "Good session in there today, right. Leadership really responded to the results. I think it landed well for the team.",
      choices: [
        {
          id: "s1a",
          tag: "Accuse him directly",
          line:
            "It landed well for you. That was my project and my analysis, and you stood up there and took the credit like it was yours.",
          points: -3,
          standing: -16,
          momentum: -4,
          reaction:
            "Whoa. That is a serious accusation and it is not how I saw it at all. I presented team work as a manager presents team work. I would watch that tone.",
          principle:
            "A direct accusation forces a guarded manager to defend himself, and he will dig in rather than concede. You win the moral point and lose the relationship.",
          keywords: ["my project", "took the credit", "you stood up there", "accuse", "stole", "not yours", "tone"],
        },
        {
          id: "s1b",
          tag: "Assume good intent, ask to co-own",
          line:
            "It did land well, and I was glad to see leadership engaged. I would love to be more visible on it going forward so I can field the follow-ups directly. Can we co-own how it gets presented from here.",
          points: 5,
          standing: 11,
          momentum: 14,
          reaction:
            "Sure, that is reasonable. You know the detail better than anyone, so it makes sense for you to be in the room on the follow-ups. Let us do that.",
          principle:
            "Assuming good intent and asking to co-own forward gives him no attack to defend against and quietly puts your name back on the work.",
          keywords: ["co-own", "more visible", "going forward", "good intent", "follow-ups", "in the room", "present together"],
        },
        {
          id: "s1c",
          tag: "Acknowledge then steer to the future",
          line:
            "Glad it resonated. Since the questions are going to keep coming, I think it would help if I am the one fielding them. Can we line that up.",
          points: 2,
          standing: 5,
          momentum: 6,
          reaction:
            "That is fair. You are closest to it, so you fielding the questions makes sense. We can line that up.",
          principle:
            "Skipping the grievance and steering straight to future visibility avoids a fight and still moves your name closer to the work.",
          keywords: ["resonated", "fielding questions", "line that up", "future", "closest to it", "no grievance"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Not sure where you are going with this. Was there a problem in there.",
        principle: "A vague opening invites him to fill the silence with his own story. Steer to a concrete forward ask instead.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "I mean, that is how leadership reviews work. The manager carries the story up. It is not personal, it is just the structure.",
        ifStandingBelow: [
          25,
          "And honestly, the way you are coming at this is making me think you have a chip on your shoulder about visibility.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Propose a surfacing system",
          line:
            "Totally, and I want to make your story up easy to tell. What if our deck names the workstream lead on each result. You still carry it, and leadership sees the bench depth you have built. Good for both of us.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "Naming the lead on each result. I actually like that, it shows I have built a strong bench. Yeah, let us put that in the template.",
          principle:
            "A standing system that surfaces contributors solves your credit problem permanently and frames it as a benefit to him. Structure beats a one-time correction.",
          keywords: ["names the lead", "template", "bench depth", "surfacing system", "good for both", "deck", "structural"],
        },
        {
          id: "s2b",
          tag: "Complain to others",
          line:
            "Maybe. Although a few people noticed it was really my work. I have had others mention it to me too.",
          points: -3,
          standing: -14,
          momentum: -5,
          reaction:
            "Others have mentioned it. So you have been talking about this around the floor. That is the kind of thing that gets back to me and it does not make me want to help you.",
          principle:
            "Hinting that you have aired it to others reads as a campaign against him. A guarded manager treats that as disloyalty and shuts down.",
          keywords: ["others noticed", "people mentioned", "around the floor", "campaign", "talking", "complain", "back channel"],
        },
        {
          id: "s2c",
          tag: "Accept the frame, add a tweak",
          line:
            "Fair enough, you carry the story. Could we just add the contributor names as a footer so the detail is traceable. Small thing.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "A footer with contributor names, sure. That costs me nothing and it is more complete. Easy yes.",
          principle:
            "Accepting his frame and adding a small, low-threat tweak gets your name on the record without challenging his role.",
          keywords: ["you carry the story", "contributor names", "footer", "traceable", "small thing", "accept the frame"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "I hear you, but I am not going to rewrite how reviews work over this. Give me something workable.",
        principle: "Arguing the principle of credit loses. Offer a concrete mechanism that fits his frame and surfaces your work.",
      },
    },
    {
      id: "s3",
      prompt:
        "Look, between us, I probably could have name-checked you in there. I did not mean to cut you out. It just moves fast up there.",
      choices: [
        {
          id: "s3a",
          tag: "Give him a face-saving exit",
          line:
            "I never thought you meant to. Those rooms move fast, I get it. Let us just build the habit of naming leads so neither of us has to think about it in the moment. No big deal, easy fix.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "Appreciate you not making it a thing. Yeah, let us build the habit so it is automatic. That is a clean way to handle it.",
          principle:
            "Handing him a graceful exit when he half-admits it converts a near-conflict into a shared fix. Let him save face and he becomes your ally.",
          keywords: ["never thought you meant to", "moves fast", "build the habit", "no big deal", "face-saving", "easy fix", "automatic"],
        },
        {
          id: "s3b",
          tag: "Demand a public correction",
          line:
            "I appreciate that, but it needs fixing properly. Can you send a note to leadership clarifying that the work was mine.",
          points: -2,
          standing: -12,
          momentum: -3,
          reaction:
            "Send a correction note to leadership. That would make me look like I misled them and make you look like you are keeping score. Hard no.",
          principle:
            "A public correction forces him to humiliate himself in front of his bosses. He will refuse, and the ask itself marks you as someone who escalates.",
          keywords: ["send a note", "clarify to leadership", "public correction", "the work was mine", "keep score", "fix it properly"],
        },
        {
          id: "s3c",
          tag: "Accept and pin the fix",
          line:
            "No harm done, it moves fast. Going forward, can we just make naming the lead our standard. That settles it for me.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Naming the lead as standard, done. Glad we are on the same page about it.",
          principle:
            "Accepting his soft apology and pinning a simple forward rule closes the issue without cost to either of you.",
          keywords: ["no harm done", "naming the lead", "standard", "going forward", "settles it", "pin the fix"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Okay. So what do you actually want me to do about it.",
        principle: "When he half-concedes, take the opening to lock a forward fix, not to extract an admission.",
      },
    },
    {
      id: "s4",
      prompt: "Alright. So what do we lock in here so we are both good.",
      choices: [
        {
          id: "s4a",
          tag: "Lock the system and your seat",
          line:
            "Two things. Our review template names the workstream lead on every result starting next cycle, and I join you in the room for the follow-ups on this one. I will update the template today. You good with that.",
          points: 6,
          standing: 11,
          momentum: 18,
          reaction:
            "Template names leads from next cycle, you in the room on the follow-ups. Good with both. Update it and send it round. We are square.",
          principle:
            "Close on a durable rule plus a concrete seat for yourself, with a date. A system protects your visibility long after this one slight.",
          keywords: ["template names leads", "next cycle", "in the room", "update today", "two things", "system", "follow-ups"],
        },
        {
          id: "s4b",
          tag: "Re-litigate the slight",
          line:
            "We are good once you acknowledge that this time the credit really should have been mine.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "We were almost there and you pulled it back to scoring the point. I am not going to grovel over one slide. Let us just drop it.",
          principle:
            "Reaching back for an admission at the close reopens the wound and tells him you care more about being right than moving forward.",
          keywords: ["acknowledge", "should have been mine", "this time", "re-litigate", "score the point", "admit it", "credit"],
        },
        {
          id: "s4c",
          tag: "Leave it as goodwill",
          line:
            "I think we are good. I trust you will keep me visible from here.",
          points: 1,
          standing: 2,
          momentum: 4,
          reaction:
            "Yeah, I will keep you in mind. We are good.",
          principle:
            "Relying on his goodwill leaves your visibility to his memory and convenience. Without a mechanism, the same thing happens next quarter.",
          keywords: ["we are good", "trust you", "keep me visible", "goodwill", "in mind", "no mechanism", "leave it"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "That is a bit open-ended. Tell me the specific thing and I will say yes or no.",
        principle: "At the close, name the durable rule and your concrete seat, or the credit problem returns next cycle.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 35 },
      result: "won",
      baseGrade: "A",
      resolution:
        "You leave with a standing rule that names the workstream lead on every result and a seat next to him on the follow-ups for this one. Your visibility is restored and protected by structure, and he sees it as proof of the bench he has built rather than a rebuke. No war, no enemy.",
      lessons: [
        "Assume good intent and ask to co-own forward. It gives a guarded manager nothing to defend against.",
        "Solve credit with a standing system that surfaces contributors, framed as a benefit to him, not a one-time correction.",
        "Close on a durable rule plus a concrete seat for yourself, with a date.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He softens and agrees to keep you visible, but you leave it on goodwill with no mechanism. The relationship is intact and the mood is warm, yet nothing stops the same thing from happening next quarter.",
      lessons: [
        "You avoided a war but relied on his memory. Goodwill is not a system.",
        "Without a naming rule, your visibility depends on his convenience.",
        "Pin a concrete forward mechanism so the credit problem does not recur.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He digs in and the temperature rises. Whether you accused him, hinted you had aired it to others, or demanded a public correction, he now sees you as a scorekeeper and a loyalty risk. You may have been right, but you made an enemy of your own manager.",
      lessons: [
        "A direct accusation or a demand for public correction forces a guarded manager to defend himself and dig in.",
        "Hinting you have complained to others reads as a campaign and triggers his loyalty alarm.",
        "Win the future, not the argument: assume good intent and offer a face-saving fix.",
      ],
    },
  ],
};
