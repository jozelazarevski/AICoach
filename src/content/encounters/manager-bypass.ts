import type { Encounter } from "../../game/types";

export const managerBypass: Encounter = {
  id: "manager-bypass",
  title: "The Bypass",
  difficulty: "adversarial",
  opponent: {
    name: "The Manager",
    role: "Your insecure manager who fears being skipped",
    archetype: "Guarded Manager",
    blurb: "You must bring in his boss. Get his blessing instead of his resentment.",
  },
  scene:
    "You genuinely need to involve your manager's boss on a decision that has outgrown your manager's authority. Your manager is touchy and suspicious, and he fears being bypassed more than almost anything. You must get his buy-in so the two of you bring in his boss together, not as an end run around him.",
  objective:
    "Get his blessing to involve his boss, framed as a joint move, not an end run.",
  startStanding: 35,
  startMomentum: 18,
  stages: [
    {
      id: "s1",
      prompt:
        "You wanted to talk. Make it quick, I have got a lot on. What is this about.",
      choices: [
        {
          id: "s1a",
          tag: "Present it as decided",
          line:
            "I have decided we need to take this decision up to your boss. It is past our level now, so I am going to set up the meeting.",
          points: -3,
          standing: -16,
          momentum: -5,
          reaction:
            "You have decided. On my chain, without me. That is not how this works, and the answer is no. I will decide what goes to my boss.",
          principle:
            "Announcing a decision about his chain treats him as a formality and triggers the exact fear you are managing. He blocks you on instinct.",
          keywords: ["i have decided", "going up", "set up the meeting", "past our level", "fait accompli", "announce", "decided"],
        },
        {
          id: "s1b",
          tag: "Frame it as protecting him",
          line:
            "Something has grown past our authority, and I do not want it landing on you alone if it goes sideways. I think we need your boss in the loop, and I wanted to figure that out with you, not around you.",
          points: 5,
          standing: 11,
          momentum: 14,
          reaction:
            "Okay. At least you came to me first. Tell me what has grown, and why you think it needs to go up. I am listening, carefully.",
          principle:
            "Framing the escalation as cover for him, and explicitly with him, converts a threat into protection. He can engage because his standing is safe.",
          keywords: ["past our authority", "protect you", "with you not around you", "in the loop", "came to you first", "cover"],
        },
        {
          id: "s1c",
          tag: "Ask his read first",
          line:
            "I have got a decision that I think has outgrown our level, and before I do anything I wanted your read on whether it needs to go to your boss. What do you think.",
          points: 2,
          standing: 5,
          momentum: 6,
          reaction:
            "Before you do anything. Good. At least you are asking. Walk me through it and I will tell you if it needs to go up.",
          principle:
            "Asking his read first puts him in charge of the call and signals you are not moving without him, which lowers a suspicious manager's guard.",
          keywords: ["your read", "before i do anything", "outgrown our level", "what do you think", "ask first", "your call"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: 0,
        reaction: "You are being cagey. Just tell me straight what you are angling for.",
        principle: "With a suspicious manager, ambiguity reads as scheming. Open by putting him in control of the decision.",
      },
    },
    {
      id: "s2",
      prompt: {
        default:
          "So you want my boss involved. Why. Why can you and I not just handle this ourselves like we always do.",
        ifStandingBelow: [
          25,
          "And I will be straight with you, this smells like you trying to get face time with my boss off the back of my work.",
        ],
      },
      choices: [
        {
          id: "s2a",
          tag: "Invite him to co-present",
          line:
            "Because the call needs an owner above us, and I want you to be the one who frames it to her. You lead the conversation, I bring the detail. It is your relationship and your win to manage.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "I lead it, you bring the detail. So this is me taking something important to my boss, with you backing me up. That I can get behind.",
          principle:
            "Offering to put him in front and yourself in support removes the fear of being upstaged. A guarded manager will carry an escalation he gets to lead.",
          keywords: ["you frame it", "you lead", "i bring the detail", "co-present", "your relationship", "your win", "support"],
        },
        {
          id: "s2b",
          tag: "Imply he is the blocker",
          line:
            "Honestly, because we keep stalling at your level and I think we need someone with more authority to actually move it.",
          points: -3,
          standing: -15,
          momentum: -4,
          reaction:
            "So I am the bottleneck. Got it. You want to go over me because I am not good enough to decide. That is going nowhere, fast.",
          principle:
            "Implying he is the obstacle confirms that the escalation is a verdict on him. He will fight to prove you wrong by blocking it.",
          keywords: ["we keep stalling", "your level", "more authority", "you are the blocker", "not good enough", "bottleneck"],
        },
        {
          id: "s2c",
          tag: "Give a concrete reason",
          line:
            "Because it commits budget across two orgs beyond what either of us can sign off, so it structurally needs her. It is not about us, it is about who holds the authority.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "Two orgs and budget over our line. Okay, that is a real reason, not a power play. If it is structural, fine.",
          principle:
            "A concrete structural reason depersonalizes the escalation. When the facts demand it, it is not about him, and he can accept that.",
          keywords: ["budget across two orgs", "beyond our sign off", "structural", "authority", "concrete reason", "not about us"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 1,
        reaction: "That is not a reason, that is a vibe. Give me the actual why.",
        principle: "A suspicious manager needs a concrete, non-personal reason. Vagueness lets him assume you are angling around him.",
      },
    },
    {
      id: "s3",
      prompt:
        "Alright, maybe it does need to go up. But I want to control how this is framed to her. I am not having you walk in and make me look like I lost the plot.",
      choices: [
        {
          id: "s3a",
          tag: "Hand him the framing",
          line:
            "It is your call entirely. You write the framing, you decide what we say and what we hold back. I will not say a word to her that you have not seen first. Send me your version and I will fit my part around it.",
          points: 6,
          standing: 12,
          momentum: 17,
          reaction:
            "I write the framing and you fit around it. That is exactly the assurance I needed. Okay, I am in. I will draft how we position it.",
          principle:
            "Handing him total control of the framing is the strongest trust signal you can send a manager who fears being made to look bad. Control cures suspicion.",
          keywords: ["your call entirely", "you write the framing", "nothing she has not seen", "fit around it", "control", "you decide"],
        },
        {
          id: "s3b",
          tag: "Go behind his back",
          line:
            "Sure, you frame it. Though I should mention I already gave her a quick heads up so she is expecting us.",
          points: -3,
          standing: -16,
          momentum: -5,
          reaction:
            "You already talked to her. So while you sat here pretending to ask my permission, you had already gone around me. We are done here.",
          principle:
            "Any sign you have already contacted his boss is the cardinal betrayal for this manager. It proves the consultation was theater and ends his trust.",
          keywords: ["already gave her a heads up", "expecting us", "behind his back", "went around", "talked to her", "already contacted"],
        },
        {
          id: "s3c",
          tag: "Agree to review together",
          line:
            "Deal. You own the framing and we walk through it together before the meeting so we are aligned. I will not freelance in the room.",
          points: 3,
          standing: 6,
          momentum: 8,
          reaction:
            "You own the framing, we align first, no freelancing. That works for me. Let us prep it together.",
          principle:
            "Committing to align on the framing in advance and not to improvise reassures him you will not undercut him live in front of his boss.",
          keywords: ["you own the framing", "walk through together", "aligned", "no freelancing", "review together", "prep"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: 0,
        reaction: "I need to hear that I am the one steering this with her. Are you giving me that or not.",
        principle: "When he asks for control of the framing, give it plainly. Hedging keeps his suspicion alive.",
      },
    },
    {
      id: "s4",
      prompt: "Fine. So how do we actually do this without it looking like an end run.",
      choices: [
        {
          id: "s4a",
          tag: "Lock the joint move",
          line:
            "We go to her together. You request the meeting from your account, you open and frame it, I am there for the detail. We prep your framing this week and book her for next. Your name on the invite, not mine.",
          points: 6,
          standing: 11,
          momentum: 18,
          reaction:
            "My invite, I open it, you on detail, we prep this week. That is a joint move, not an end run. Good. Set aside time and let us build it.",
          principle:
            "Close on a joint move where his name leads every visible step, with a date. When the optics are unmistakably his, the bypass fear is fully defused.",
          keywords: ["together", "your invite", "you open", "i bring detail", "prep this week", "your account", "joint move"],
        },
        {
          id: "s4b",
          tag: "Take the lead slot",
          line:
            "I will set up the meeting and kick it off since I know the detail best, and you can jump in wherever you want to add color.",
          points: -2,
          standing: -12,
          momentum: -4,
          reaction:
            "You set it up and you kick it off and I add color. So I am a supporting act at my own boss's table. No. If that is the plan, we are not doing this.",
          principle:
            "Reclaiming the lead slot at the close undoes the whole reassurance and recasts him as a bit player in front of his own boss. He pulls his blessing.",
          keywords: ["i will set up", "i kick it off", "add color", "lead slot", "i know the detail", "supporting act", "take the lead"],
        },
        {
          id: "s4c",
          tag: "Leave the logistics vague",
          line:
            "Let us just both agree it needs to go up and sort out who does what closer to the time.",
          points: 1,
          standing: 1,
          momentum: 3,
          reaction:
            "Closer to the time. I would rather nail down who leads now, because that vagueness is exactly where I start to get nervous again.",
          principle:
            "Leaving the logistics open lets his suspicion creep back, because the unresolved question is precisely who controls the room.",
          keywords: ["both agree", "sort out later", "closer to the time", "who does what", "vague logistics", "loose"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -2,
        momentum: -1,
        reaction: "That is too loose. Tell me exactly who requests the meeting and who leads it.",
        principle: "At the close, spell out the joint mechanics with his name on the visible steps, or the bypass fear returns.",
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
        "He gives you his blessing and you go to his boss together. He requests the meeting from his own account, opens and frames it, and you bring the detail. The escalation that could have detonated the relationship instead reads as a manager taking a real decision up, with you backing him.",
      lessons: [
        "Frame the escalation as cover for him and explicitly with him, so it protects his standing instead of threatening it.",
        "Hand him control of the framing. For a manager who fears looking bad, control cures suspicion.",
        "Close on a joint move where his name leads every visible step, with a date.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "He agrees in principle that it needs to go up, but you leave the logistics loose. He is uneasy because the one thing that matters to him, who controls the room, is still unresolved, and that gap is where his suspicion can creep back.",
      lessons: [
        "Agreement in principle is not blessing. For this manager the optics of who leads are the whole game.",
        "Loose logistics reopen the bypass fear because the unresolved question is who controls the room.",
        "Spell out the joint mechanics with his name on the visible steps before you leave.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "He pulls his blessing and digs in. Whether you presented it as decided, cast him as the blocker, took the lead slot, or let slip that you had already contacted his boss, he concluded this was an end run dressed up as consultation. Now he will resist the escalation and watch you closely.",
      lessons: [
        "Announcing a decision about his chain, or implying he is the blocker, triggers the exact bypass fear you are managing.",
        "Any sign you already contacted his boss is the cardinal betrayal and ends his trust outright.",
        "Make every visible step his and the move explicitly joint, so it can never read as going around him.",
      ],
    },
  ],
};
