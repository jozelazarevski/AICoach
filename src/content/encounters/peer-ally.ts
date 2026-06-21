import type { Encounter } from "../../game/types";

export const peerAlly: Encounter = {
  id: "peer-ally",
  title: "The Alliance",
  difficulty: "measured",
  opponent: {
    name: "The Counterpart",
    role: "A capable rival who could become a partner",
    archetype: "Territorial Counterpart",
    blurb: "He guards his turf but wants to win. Turn rivalry into a shared win.",
  },
  scene:
    "A capable rival has been competing with you for the same scope and budget. He guards his turf, but he is sharp and he wants to win something real. You see a chance to convert the rivalry into a partnership with a shared win that is bigger than what either of you would get alone.",
  objective:
    "Convert a rival into a partner with a credible shared-win proposal.",
  startStanding: 50,
  startMomentum: 25,
  stages: [
    {
      id: "s1",
      prompt:
        "Let me guess, you are here to talk about the platform scope. I know we are both circling it, so say your piece.",
      choices: [
        {
          id: "s1a",
          tag: "Lecture him",
          line:
            "Honestly, you should see that fighting me on this is a waste of your time. I have the stronger claim and you would be smart to back off now.",
          points: -3,
          standing: -15,
          momentum: -4,
          reaction:
            "Wow. You came in here to tell me to back off and call it advice. That is a hard no, and now I am paying closer attention to that scope, not less.",
          principle:
            "Telling a rival he should concede insults his judgment and hardens his position. You cannot lecture someone into an alliance.",
          keywords: ["you should see", "waste of time", "stronger claim", "back off", "smart to", "lecture", "concede"],
        },
        {
          id: "s1b",
          tag: "Name the mutual win",
          line:
            "I am here because I think we are both about to fight over a slice when there is a much bigger pie if we go in together. I would rather we split a win than split the scope.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "A bigger pie. Okay, you have my attention. I will admit fighting you for scraps was not my idea of winning either. What does together look like.",
          principle:
            "Lead with the shared win, not your claim. Framing the choice as a bigger pie versus a fought-over slice reorients a rival from defense to interest.",
          keywords: ["bigger pie", "together", "split a win", "mutual", "shared win", "both", "not the scope"],
        },
        {
          id: "s1c",
          tag: "Open with respect",
          line:
            "First, you are good at this, which is exactly why I came to you and not around you. I think there is a version where we both come out ahead. Can I lay it out.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "I appreciate that you came to me directly. Sure, lay it out. I am listening.",
          principle:
            "Opening with genuine respect lowers a territorial rival's guard and signals you see him as a partner, not a target to be managed.",
          keywords: ["you are good", "came to you", "both ahead", "respect", "directly", "lay it out", "not around you"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "Get to the point. Are you proposing something or staking a claim.",
        principle: "A rival reads ambiguity as positioning. Open with a clear, mutual frame so he knows this is an offer, not a grab.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "Alright, together. But I have been burned before. People say partnership and mean I do the work and they take the visibility. So what is actually in it for me.",
        ifStandingBelow: [
          40,
          "And I will be honest, after how you opened, I am not sure I trust that this is a real partnership.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Offer him a real piece",
          line:
            "You own the platform architecture and present it as your half at the steering review. That is the most visible part and it is genuinely yours. I take delivery and integration. We are equals on the masthead.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "You are handing me the architecture and the steering review slot. That is real, not a consolation prize. Okay, this is starting to feel like an actual deal.",
          principle:
            "Offer your rival a genuinely valuable and visible piece, not the leftovers. Real partners give up something real, and that is what earns trust.",
          keywords: ["you own", "architecture", "your half", "steering review", "equals", "visible part", "real piece"],
        },
        {
          id: "s2b",
          tag: "Take the bigger slice",
          line:
            "I would lead it and own the relationship with the VP, and you would run a solid chunk underneath. It is still a great spot for you.",
          points: -3,
          standing: -14,
          momentum: -5,
          reaction:
            "Underneath. So this whole bigger pie speech was you finding a polite way to make me your number two. No thanks. I would rather compete.",
          principle:
            "Quietly taking the larger share confirms the rival's worst fear. A partnership that makes him your subordinate is not a partnership, and he knows it.",
          keywords: ["i would lead", "own the relationship", "underneath", "chunk", "great spot", "number two", "bigger slice"],
        },
        {
          id: "s2c",
          tag: "Ask what he values",
          line:
            "Fair, you have been burned. So tell me what a real win looks like for you here, and I will build the split around that rather than guess.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Honestly. I want the architecture and a seat at the steering review. If that is on the table, I am in a very different mood.",
          principle:
            "Asking what the rival actually values lets you trade on what is cheap to you and dear to him. You cannot design a shared win blind.",
          keywords: ["what a win looks like", "build around that", "you have been burned", "what you value", "ask", "tell me"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "That is fuzzy. Tell me the actual split, not the vibe.",
        principle: "Trust is built on specifics. Name who owns what, or a wary rival assumes the worst about the gaps.",
      },
    },
    {
      id: "s3",
      prompt:
        "This could work. But talk is cheap. How do I know you will not quietly walk back the architecture piece once we are committed and the VP is watching.",
      choices: [
        {
          id: "s3a",
          tag: "Build trust with a commitment",
          line:
            "Then I go first. I will email the VP today proposing you lead architecture, copy you on it, before you commit anything. If I am asking you to trust me, I should put it in writing first.",
          points: 6,
          standing: 11,
          momentum: 17,
          reaction:
            "You will put it in writing to the VP before I commit. That is the move that convinces me. Send it and I am all in.",
          principle:
            "A small, concrete, costly-to-reverse commitment made first proves intent better than any promise. Go first to make trust cheap for the other side.",
          keywords: ["i go first", "email the VP", "in writing", "before you commit", "today", "small commitment", "prove it"],
        },
        {
          id: "s3b",
          tag: "Hide your real aim",
          line:
            "Look, you do not need all the details. Just trust me, commit publicly, and the specifics will sort themselves out as we go.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "Sort themselves out. That is exactly the line people use right before they take the visibility and leave me the work. Show me the specifics or there is no deal.",
          principle:
            "Asking a burned rival to commit blind on trust triggers the very suspicion you need to disarm. Vagueness reads as a setup.",
          keywords: ["do not need details", "trust me", "commit publicly", "sort itself out", "vague", "hide", "no specifics"],
        },
        {
          id: "s3c",
          tag: "Offer a written split",
          line:
            "Let us write the split down right now, one page, who owns what and who presents what. We both sign off before anyone talks to the VP.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "A signed one pager before we go public. That works. I am more comfortable when it is on paper than in a handshake.",
          principle:
            "Putting the agreement on paper before going public protects both sides and signals you are not planning to renegotiate later.",
          keywords: ["write it down", "one page", "who owns what", "both sign off", "on paper", "before the VP", "documented"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "Words. Give me something concrete I can hold you to.",
        principle: "When a rival asks for proof, supply a commitment, not reassurance. Trust follows verifiable action.",
      },
    },
    {
      id: "s4",
      prompt: "Okay. I am close. Tell me exactly what we walk out of here having agreed to.",
      choices: [
        {
          id: "s4a",
          tag: "Lock the shared win",
          line:
            "We co-sponsor the platform. You own and present architecture, I own delivery, both names on the proposal to the VP this week. I send the draft today, you redline it, and we go in together Thursday.",
          points: 6,
          standing: 12,
          momentum: 18,
          reaction:
            "Co-sponsors, my name on architecture, both of us in the room Thursday. That is a real partnership. Send the draft, I will redline it tonight. Glad we did this.",
          principle:
            "Close a shared win on a specific joint deliverable, named owners, and a date. Concrete and mutual is what turns a rival into a co-sponsor.",
          keywords: ["co-sponsor", "both names", "this week", "you own architecture", "send the draft", "thursday", "together"],
        },
        {
          id: "s4b",
          tag: "Keep it a handshake",
          line:
            "Let us just agree in spirit that we are partners on this and figure out the details as it develops.",
          points: 1,
          standing: 2,
          momentum: 4,
          reaction:
            "In spirit. I want to believe it, but you know spirit is the thing that evaporates the first time scope gets tight.",
          principle:
            "A handshake with no artifact leaves the partnership exposed to the next pressure point. Spirit is not a structure.",
          keywords: ["in spirit", "partners", "figure it out", "handshake", "as it develops", "loose", "no detail"],
        },
        {
          id: "s4c",
          tag: "Reserve an out",
          line:
            "We partner for now, and if the architecture piece gets complicated I may need to pull it back under me. Just being honest.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "So I get the architecture until the moment it actually matters, then you reclaim it. That is not a partnership, that is a leash. I am out.",
          principle:
            "Carving out an escape hatch at the close tells your rival the partnership is conditional on your convenience. It undoes everything you built.",
          keywords: ["for now", "pull it back", "may need to", "reclaim", "an out", "conditional", "under me"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "That is still vague. Give me the exact deliverable and the date or I stay independent.",
        principle: "At the close, name the joint artifact, the owners, and the date. Anything looser invites the rivalry back.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 50 },
      result: "won",
      baseGrade: "A",
      resolution:
        "He signs on as a co-sponsor. He owns and presents the architecture, you own delivery, and both names go on the proposal to the VP this week. A rivalry that was about to burn budget on both sides is now a shared win bigger than either of you would have landed alone.",
      lessons: [
        "Lead with the shared win, not your claim. A bigger pie reorients a rival from defense to interest.",
        "Offer a genuinely valuable and visible piece, and go first with a costly-to-reverse commitment to make trust cheap for him.",
        "Close on a specific joint deliverable with named owners and a date so the alliance survives the next pressure point.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He warms to the idea and you agree to partner in principle, but you leave it as a handshake with no artifact. The goodwill is real, yet the first time scope gets tight there is nothing on paper to hold it together.",
      lessons: [
        "You sold the shared win but did not structure it. Spirit evaporates under pressure.",
        "A partnership without a written split and a date is exposed to the next tight moment.",
        "Convert the agreement into a named, dated joint artifact before you leave the room.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He walks away warier than when he arrived. Whether you lectured him, quietly grabbed the bigger slice, hid your aim, or reserved an escape hatch, he concluded this was a takeover dressed as a partnership and chose to keep competing.",
      lessons: [
        "You cannot lecture or out-maneuver a rival into an alliance. Real partners give up something real.",
        "Vagueness and reserved outs read as a setup to a rival who has been burned before.",
        "Build trust with a concrete commitment made first, and offer a piece that is genuinely his.",
      ],
    },
  ],
};
