import type { Encounter } from "../../game/types";

export const handshakeDeal: Encounter = {
  id: "handshake-deal",
  title: "The Stolen Close",
  difficulty: "adversarial",
  opponent: {
    name: "The Manager",
    role: "Your direct manager, who is claiming your closed deal as his initiative in writing",
    archetype: "Guarded Manager",
    blurb: "You closed a verbal deal with a major internal customer. Your manager is now claiming it in writing as his initiative. Reset the record without a war.",
  },
  scene:
    "Three weeks ago you spent six sessions negotiating with the head of the Operations division to move their data pipeline onto your team's platform. It was a difficult deal and you closed it on the strength of a technical pitch you built and delivered alone. This morning you saw an email from your manager, Derek, to the VP of Partnerships describing the Operations deal as 'an initiative I launched to expand our platform footprint.' You were not CC'd and your name does not appear. Derek is in the office today.",
  objective:
    "Reset the public record on the deal without creating a public confrontation or a permanent enemy, and make sure the VP of Partnerships knows the deal was yours.",
  startStanding: 35,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "Hey, I wanted to catch up on the Operations deal. We had a productive week with them.",
      choices: [
        {
          id: "s1a",
          tag: "Name what you saw",
          line:
            "I saw your email to the VP of Partnerships. I want to talk about it because the way the deal was described does not match how it happened, and I think it creates a problem we should fix before it goes further.",
          points: 4,
          standing: 7,
          momentum: 11,
          reaction:
            "I sent a summary to keep the VP updated. What is the problem with how it was described.",
          principle:
            "Naming what you saw directly and framing it as a problem to fix together is the most professional opening. It gives him the chance to correct it rather than defend a public position.",
          keywords: ["saw your email", "described", "does not match", "problem we should fix", "name what I saw", "before it goes further"],
        },
        {
          id: "s1b",
          tag: "Stay indirect",
          line:
            "I wanted to make sure you had a full picture of how the deal came together. There were some things I handled that are worth documenting.",
          points: -1,
          standing: -4,
          momentum: -2,
          reaction:
            "Sure, happy to document the details. Send me a summary.",
          principle:
            "Staying indirect lets him interpret your discomfort as a documentation request rather than a concern about credit. He will accept the summary and the email stands.",
          keywords: ["full picture", "document", "things I handled", "worth noting", "indirect", "summary", "vague"],
        },
        {
          id: "s1c",
          tag: "Start with what you did",
          line:
            "I built the pitch and ran all six sessions solo. I wanted to make sure that is visible to the VP of Partnerships as we report on this deal.",
          points: 3,
          standing: 5,
          momentum: 8,
          reaction:
            "The VP is focused on outcomes, not who ran the sessions. Why does visibility matter to you here.",
          principle:
            "Stating what you did is accurate but it opens with a credit claim before addressing what happened. He can dismiss the credit question as self-promotion rather than engaging with the actual problem.",
          keywords: ["I built", "ran all six", "solo", "visible to VP", "what I did", "credit", "my work"],
        },
        {
          id: "s1d",
          tag: "Frame it as a shared interest",
          line:
            "I want to make sure the VP of Partnerships has an accurate picture of how the Operations deal was built. I think it matters for both of us going forward, because the next time we pitch a similar deal, the VP should know what approach worked.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "That is a reasonable thing to do. What does the accurate picture look like.",
          principle:
            "Framing accuracy as a shared interest, because it builds the pattern of what works, gives your manager a reason to correct the record that is not about your ego. It converts a conflict into a shared project.",
          keywords: ["accurate picture", "both of us", "next time", "what worked", "shared interest", "going forward", "correct the record"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "What specifically did you want to discuss.",
        principle: "Name what you saw directly. Indirect approaches let him interpret it as a documentation request and move on.",
      },
    },
    {
      id: "s2",
      prompt:
        "I described it as an initiative I launched because I set the strategic direction. You executed it. I am not sure what the issue is.",
      choices: [
        {
          id: "s2a",
          tag: "Name the distinction",
          line:
            "The strategic direction for platform expansion has been team-wide for a year. The Operations deal specifically was not scoped or assigned to me. I identified the opportunity, built the pitch from scratch, and closed it in six sessions. That is the part that is not in the email and it is the part that matters for the VP's picture.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "You think the email undercredits your contribution.",
          principle:
            "Distinguishing between a standing team strategy and a specific initiative you originated and closed is a factual argument, not a credit argument. Make it fact-based.",
          keywords: ["team-wide strategy", "not assigned", "I identified", "pitch from scratch", "six sessions", "not in the email", "distinction", "specific deal"],
        },
        {
          id: "s2b",
          tag: "Accept his framing partially",
          line:
            "I understand you set the direction. I just want to make sure my role in executing it is documented somewhere.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "I can add a line about you leading the execution. Would that work.",
          principle:
            "Accepting the 'strategic direction' framing and asking for execution credit concedes the narrative. He initiated it, you ran the meetings. That is the lesser story and it will not change the VP's read.",
          keywords: ["understand you", "accept his framing", "documented somewhere", "execution", "add a line", "concede"],
        },
        {
          id: "s2c",
          tag: "Disagree directly",
          line:
            "With respect, Derek, there was no initiative scoped and assigned to me. I found the opportunity independently and closed it. Describing it as something you launched is not accurate.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "I do not think that is a fair characterization. This is my team and the platform strategy is mine.",
          principle:
            "Telling your manager he is inaccurate in a direct conversation puts him in a defensive position from which he has to either admit the error or hold his ground. He will almost always hold his ground.",
          keywords: ["not accurate", "disagree", "I found independently", "no initiative", "directly", "with respect", "not fair"],
        },
        {
          id: "s2d",
          tag: "Ask what he would say to the VP",
          line:
            "I want to make sure the VP has a full picture. If the VP asked you directly how the Operations deal came together, what would you say.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "I would say you led the client sessions and built the technical pitch.",
          principle:
            "Asking what he would say to the VP surfaces his own account and creates an opening to align on a version before the email stands alone. It also reveals whether his omission was intentional or incidental.",
          keywords: ["what would you say", "VP asks", "how it came together", "his account", "directly to VP", "align on version"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "What specifically do you think is missing from the description.",
        principle: "Name the specific things that are missing, not your general concern about credit. Specifics are harder to dismiss.",
      },
    },
    {
      id: "s3",
      prompt:
        "Look, I acknowledge you did the heavy lifting on the sessions. But the VP of Partnerships is not going to know the details of who ran what. He cares about outcomes.",
      choices: [
        {
          id: "s3a",
          tag: "Name why it matters for you",
          line:
            "I want to be honest with you about why this matters to me. I am building a promotion case and the Operations deal is the centerpiece of it. If the VP of Partnerships does not have an accurate picture of my contribution, it affects my case in ways that are hard to undo. I am not asking you to diminish what you contributed. I am asking for my contribution to also be visible.",
          points: 5,
          standing: 9,
          momentum: 13,
          reaction:
            "I did not know you were building a promotion case around this deal. That changes the picture.",
          principle:
            "Naming the personal stake, your promotion case, is more persuasive than a general argument about accuracy. It gives him a concrete reason to care about your visibility and it is honest.",
          keywords: ["honest", "promotion case", "centerpiece", "hard to undo", "my contribution", "not asking you to diminish", "also visible"],
        },
        {
          id: "s3b",
          tag: "Invoke the principle",
          line:
            "The VP of Partnerships is going to hear about this deal from Operations as well. If those accounts differ, it is a problem. Getting the record right protects both of us.",
          points: 4,
          standing: 7,
          momentum: 10,
          reaction:
            "The Operations head is not going to talk to the VP of Partnerships about who ran the sessions.",
          principle:
            "Invoking potential inconsistency as a protection argument is a reasonable angle, but it only works if the inconsistency is plausible. If he dismisses it, you lose the thread.",
          keywords: ["hear from operations", "accounts differ", "protects both", "record right", "inconsistency", "protection", "principle"],
        },
        {
          id: "s3c",
          tag: "Ask him to send a follow-up",
          line:
            "Would you be willing to send a brief follow-up to the VP that names my specific role. Something like 'to add detail, the technical sessions were built and led by [you], which was key to the close.'",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "I can do that. I would want to frame it as adding context, not as a correction.",
          principle:
            "Proposing the exact language for a follow-up gives him something concrete to do that does not require him to admit an error. He can send it as additional context and the record is corrected.",
          keywords: ["follow-up", "brief", "specific role", "names me", "would you be willing", "add context", "exact language"],
        },
        {
          id: "s3d",
          tag: "Propose to send your own note",
          line:
            "What if I sent a note to the VP directly, copying you, that gives the technical background on how the deal came together. That way it reads as an update from the team, not a correction.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "I would want to see the note before it goes. Make sure it is not written as a correction.",
          principle:
            "Proposing to send your own note with him copied gives you direct access to the VP without going around your manager. It is transparent and it puts your name in the thread.",
          keywords: ["my own note", "copying you", "technical background", "team update", "not correction", "direct access", "send myself"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "Tell me what you actually want me to do here.",
        principle: "Name one specific action that would correct the record. Vague concerns are easy to set aside.",
      },
    },
    {
      id: "s4",
      prompt:
        "I will send a follow-up. But I want you to understand that I do not like having this kind of conversation. I expect you to come to me with things like this before they become a problem.",
      choices: [
        {
          id: "s4a",
          tag: "Accept and name going forward",
          line:
            "I want the same thing. Going forward, if a deal I am working on is being reported to the VP, I would like to know before the email goes out so I can make sure the description is right. That is a small ask and it prevents this conversation from happening again.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is reasonable. I will loop you in before I report on deals that you own the execution on.",
          principle:
            "Turning a tense closing into a going-forward agreement converts the conversation from a complaint into a working practice. You leave with the follow-up and a process commitment.",
          keywords: ["going forward", "before email goes", "description is right", "small ask", "loop me in", "prevents this again", "agreement"],
        },
        {
          id: "s4b",
          tag: "Take the blame",
          line:
            "You are right, I should have come to you sooner. I will do that going forward.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "Good. I appreciate you understanding that.",
          principle:
            "Taking the blame for a process he controlled hands him the moral high ground without getting the going-forward agreement you need. You leave with an apology and no change.",
          keywords: ["you are right", "should have", "sooner", "my fault", "take blame", "I should have said something"],
        },
        {
          id: "s4c",
          tag: "Name the inversion",
          line:
            "I want to name something carefully. I am coming to you now because I saw the email after it was sent. The sequence that would have prevented this is the email not going out without checking with me first. I am glad we are talking now but I want to name the direction.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "That is fair. It goes both ways.",
          principle:
            "Naming the inversion, that the process break was his, not yours, is accurate but risks reopening the confrontation. Name it once, gently, and move to the going-forward ask.",
          keywords: ["name the inversion", "sequence", "email after it was sent", "checking with me", "direction", "fair", "both ways"],
        },
        {
          id: "s4d",
          tag: "Thank him and close",
          line:
            "I appreciate you sending the follow-up. I know it was not a comfortable conversation. I think we handled it the right way.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "Agreed. Let us move forward.",
          principle:
            "Closing a difficult conversation with genuine thanks and a positive framing leaves the relationship in better shape than it would be if you ended on the process argument. You got the follow-up. Bank it.",
          keywords: ["thank him", "close", "uncomfortable conversation", "right way", "handled it", "move forward", "appreciate"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "I need to know this is resolved between us.",
        principle: "Close on the going-forward agreement. You got the follow-up. The relationship is the thing to protect now.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 42 },
      result: "won",
      baseGrade: "A",
      resolution:
        "Derek sends a follow-up to the VP of Partnerships naming your specific role in the deal. You leave with a corrected record, a going-forward agreement, and a working relationship intact.",
      lessons: [
        "Frame the correction as a shared interest in accuracy, not a credit argument. It gives your manager a reason to act that is not about your ego.",
        "Naming your promotion case specifically is more persuasive than a general accuracy argument. Give him a concrete reason to care about your visibility.",
        "Propose the exact language for a follow-up. It gives him something concrete to do without requiring him to admit an error.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 50 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "Derek acknowledges your contribution verbally but does not send a follow-up. The VP of Partnerships' picture is still incomplete.",
      lessons: [
        "A verbal acknowledgment that stays in the room is not the same as a corrected record. Get the follow-up in writing.",
        "Accepting the execution-credit framing concedes the narrative. He initiated it, you ran the meetings. That is the lesser story.",
        "The going-forward agreement matters. Without it, this conversation happens again.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "Derek is defensive and the conversation ends without resolution. The email stands and you have created an adversary who is now wary of you.",
      lessons: [
        "Telling your manager he is inaccurate forces him to either admit error or hold his ground. He will almost always hold his ground.",
        "Indirect approaches let him interpret the conversation as a documentation request. Name what you saw.",
        "Staying on the credit argument without proposing a concrete fix gives him nothing to agree to.",
      ],
    },
  ],
};
