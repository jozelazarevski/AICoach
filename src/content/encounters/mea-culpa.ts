import type { Encounter } from "../../game/types";

export const meaCulpa: Encounter = {
  id: "mea-culpa",
  title: "The War Room",
  difficulty: "adversarial",
  opponent: {
    name: "The CTO",
    role: "The technical executive who controls your team's future after this incident",
    archetype: "Skeptical Principal",
    blurb: "Your team's deployment broke production for ninety minutes. You are in the war room. How you handle the next twenty minutes decides whether you are the problem or the solution.",
  },
  scene:
    "A deployment your team owned broke the main checkout flow at peak traffic. The site was down for ninety minutes. Revenue impact is estimated at six hundred thousand dollars. You are in a video call with the CTO, the VP of Infrastructure, and three other executives. The CTO opens: 'Walk me through what happened.' There are nine people on the call. Everyone is watching how you handle this.",
  objective:
    "Give a clear account, take appropriate ownership, and leave the call with the next step owned by you, not assigned to a committee.",
  startStanding: 30,
  startMomentum: 15,
  stages: [
    {
      id: "s1",
      prompt:
        "Walk me through what happened. I want facts, not a narrative.",
      choices: [
        {
          id: "s1a",
          tag: "Lead with the timeline",
          line:
            "At 2:14 PM we deployed a change to the payment service. At 2:17 PM the first errors appeared in the checkout flow. At 2:31 PM we identified the root cause: a config value was not promoted to production. By 4:02 PM the rollback was complete and all services were nominal. I own the deployment, and I own the gap in the promotion process.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "Good. What is the config promotion process and why did it fail.",
          principle:
            "A clean timeline followed by clear ownership is the only opener that works in a war room. It signals that you have command of the facts and are not going to deflect.",
          keywords: ["timeline", "2:14", "root cause", "rollback", "nominal", "config", "I own", "specific time", "facts"],
        },
        {
          id: "s1b",
          tag: "Explain the context first",
          line:
            "Before I walk through the timeline, I want to give you some context. This deployment was part of a larger initiative that was under tight timeline pressure, and the team had been working around the clock.",
          points: -3,
          standing: -14,
          momentum: -6,
          reaction:
            "I did not ask for context. I asked for what happened. Start with what happened.",
          principle:
            "Opening with context in a war room reads as building an excuse before admitting the fact. Executives in a room with a six-hundred-thousand-dollar problem do not want mitigation first.",
          keywords: ["context", "larger initiative", "timeline pressure", "working around the clock", "before I", "background", "why it happened"],
        },
        {
          id: "s1c",
          tag: "Ask what he already knows",
          line:
            "Before I walk through it, what information do you already have. I want to make sure I am adding signal, not repeating what is already in the room.",
          points: -2,
          standing: -10,
          momentum: -3,
          reaction:
            "I know there was a deployment and the site went down for ninety minutes. Tell me the rest.",
          principle:
            "Asking what the executive knows before giving your account looks like you are calibrating your story to the room. In a crisis, it reads as evasion.",
          keywords: ["what do you know", "what you already have", "before I walk through", "signal", "calibrate", "not repeating"],
        },
        {
          id: "s1d",
          tag: "Name the team clearly",
          line:
            "My team owned this deployment. Here is what happened: a config change was not promoted to production before the deployment ran. That gap is on our process, and I am responsible for the process. Here is the timeline.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Go on. What was in the config change.",
          principle:
            "Starting with clear ownership before the facts signals confidence, not defensiveness. It positions you as the person solving the problem rather than the person facing the interrogation.",
          keywords: ["my team owned", "here is what happened", "responsible", "process", "timeline", "config change", "gap"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -5,
        momentum: -2,
        reaction: "I need more precision. When exactly, what exactly, and who found it.",
        principle: "In a war room, the only acceptable account starts with a specific time, a specific cause, and a specific owner.",
      },
    },
    {
      id: "s2",
      prompt:
        "Why did it take fourteen minutes to identify the root cause. That is a long time for something this basic.",
      choices: [
        {
          id: "s2a",
          tag: "Own the detection gap",
          line:
            "Fourteen minutes is too long. Our alert threshold was set for a five-percent error rate, not a one-percent rate, which meant the first alert did not fire until the problem had been running for seven minutes. That threshold is wrong and I am changing it tonight.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "Change it tonight. What is the right threshold.",
          principle:
            "Naming the specific process failure and committing to a specific fix in the same breath demonstrates the kind of operational ownership that converts a post-incident interrogation into a confidence signal.",
          keywords: ["alert threshold", "fourteen minutes", "too long", "five percent", "changing tonight", "detection", "specific fix", "own"],
        },
        {
          id: "s2b",
          tag: "Defend the time",
          line:
            "Fourteen minutes is actually within our SLA for P1 incidents. The detection and response were within the normal parameters.",
          points: -3,
          standing: -16,
          momentum: -7,
          reaction:
            "Your SLA might be wrong. You lost six hundred thousand dollars in fourteen minutes. That is not a SLA problem, that is a values problem.",
          principle:
            "Citing SLA compliance in a war room about a six-hundred-thousand-dollar outage is the wrong metric. The executive is not evaluating your process documentation, they are evaluating your judgment.",
          keywords: ["SLA", "parameters", "within normal", "actually", "acceptable", "fourteen minutes is fine", "within range"],
        },
        {
          id: "s2c",
          tag: "Explain the tooling gap",
          line:
            "The monitoring tooling we have does not surface config-layer errors quickly. We have been asking for better observability for two quarters. This is a symptom of that gap.",
          points: -1,
          standing: -6,
          momentum: -3,
          reaction:
            "We can talk about tooling investment later. Right now I want to know what you are going to do with the tooling you have.",
          principle:
            "Blaming tooling limitations in a war room reads as deflecting responsibility onto a system. Even when it is true, it signals that you are more interested in explaining than in solving.",
          keywords: ["tooling", "monitoring", "observability", "asked for", "two quarters", "symptom", "gap", "investment"],
        },
        {
          id: "s2d",
          tag: "Describe the exact sequence",
          line:
            "The on-call engineer saw error rate rise at 2:17 but did not have enough signal to isolate the deployment as the cause until 2:31. He was correlating across three dashboards manually. The manual step was the failure point. I am automating that correlation tonight.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "Show me the automation plan before you ship it.",
          principle:
            "Describing the exact human decision point where the delay occurred and the specific fix prevents the interrogation from escalating to systemic concerns. It shows you understand the causal chain, not just the outcome.",
          keywords: ["on-call engineer", "error rate", "isolate", "three dashboards", "manually", "failure point", "automating", "tonight"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -4,
        momentum: -2,
        reaction: "That does not tell me how you are going to prevent fourteen minutes from becoming forty minutes next time.",
        principle: "When a specific failure is surfaced in a war room, the expected response is a specific fix with a specific owner and a specific date.",
      },
    },
    {
      id: "s3",
      prompt:
        "I am concerned this is not a one-time failure. This is the third deployment issue in eight weeks. I want to know why.",
      choices: [
        {
          id: "s3a",
          tag: "Accept the pattern",
          line:
            "You are right to name the pattern. Three incidents in eight weeks is not a run of bad luck, it is a signal that something structural in our deploy process is broken. I have a hypothesis about what it is, but I want to share it with you after I have validated it today, not before.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "What is the hypothesis.",
          principle:
            "Accepting the pattern while distinguishing between a hypothesis and a validated answer signals intellectual honesty. It prevents you from defending a root cause you have not yet confirmed.",
          keywords: ["pattern", "three incidents", "structural", "broken", "hypothesis", "validate", "not a coincidence", "accept"],
        },
        {
          id: "s3b",
          tag: "Contextualize the incidents",
          line:
            "The previous two incidents were different in nature. One was an infrastructure change that my team did not control, and one was a vendor certificate expiry. This is the first deployment issue that is directly attributable to my team's process.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "So your team is responsible for one of three. That is different from what it looked like from where I sit. Send me a written breakdown.",
          principle:
            "Contextualizing past incidents in a current war room reads as distributing blame. Even when accurate, it signals that your first instinct is to narrow your responsibility rather than solve the problem.",
          keywords: ["different", "previous two", "vendor", "infrastructure", "not my team", "first one", "directly attributable", "contextualize"],
        },
        {
          id: "s3c",
          tag: "Name the structural cause",
          line:
            "I have been watching this pattern too. My read is that we have a discipline problem at the pre-deploy gate: engineers are approving changes without completing the checklist because the checklist takes twenty minutes and the checklist tooling is slow. The incentive is to skip it. I want to fix the tooling, not add more process.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "Now that is an interesting diagnosis. Have you proposed this to your VP of Infrastructure.",
          principle:
            "Naming a structural incentive failure rather than an individual failure demonstrates systems thinking. Skeptical principals promote people who diagnose at that level.",
          keywords: ["structural", "discipline", "checklist", "incentive", "skip", "tooling slow", "fix the tool", "pre-deploy", "pattern"],
        },
        {
          id: "s3d",
          tag: "Ask for time to investigate",
          line:
            "I want to give you an honest answer and not a quick one. Can I come back to you by end of day tomorrow with a written root cause analysis that covers all three incidents.",
          points: 3,
          standing: 6,
          momentum: 7,
          reaction:
            "End of day tomorrow is acceptable. I want a written document, not a slide.",
          principle:
            "Asking for time to give an honest answer is acceptable when you genuinely do not have the answer yet. It signals rigor, not avoidance, as long as you name the deliverable.",
          keywords: ["honest answer", "not quick", "end of day", "written", "root cause", "all three", "investigate", "tomorrow"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -4,
        momentum: -2,
        reaction: "That does not explain the pattern. I need you to explain the pattern.",
        principle: "When a skeptical principal identifies a pattern, the only credible response is to accept the pattern and offer a structural explanation, not to defend individual incidents.",
      },
    },
    {
      id: "s4",
      prompt:
        "What do you need from me and what are you committing to doing in the next forty-eight hours.",
      choices: [
        {
          id: "s4a",
          tag: "Name three specific things",
          line:
            "In forty-eight hours: alert thresholds are fixed, the pre-deploy checklist is mandatory with no override, and I will send you a written root cause document covering all three incidents. I need one thing from you: air cover with the product team so they know a feature freeze is in place for one week while we stabilize.",
          points: 6,
          standing: 12,
          momentum: 16,
          reaction:
            "Forty-eight hours. I will hold you to that. I will talk to the product team.",
          principle:
            "Three specific commitments with one specific ask converts a war room into a recovery plan. You leave as the person running the solution, not the person who caused the problem.",
          keywords: ["forty-eight hours", "alert thresholds", "checklist", "written", "air cover", "feature freeze", "one week", "stabilize", "three things"],
        },
        {
          id: "s4b",
          tag: "Propose a full review",
          line:
            "I think what this needs is a full process review with the infrastructure team and an external audit of our deployment pipeline. That will take four to six weeks.",
          points: -2,
          standing: -10,
          momentum: -6,
          reaction:
            "I do not need an audit. I need you to stop breaking production. Tell me what you are doing in the next forty-eight hours.",
          principle:
            "Proposing a four-to-six-week review after an acute incident reads as delaying accountability, not taking it. The next forty-eight hours are the only thing the CTO is evaluating right now.",
          keywords: ["full review", "audit", "four to six weeks", "external", "infrastructure team", "process review", "thorough"],
        },
        {
          id: "s4c",
          tag: "Commit to everything",
          line:
            "I will fix everything. Alert thresholds, checklist compliance, deploy process documentation, team training, monitoring dashboards, and a full incident report. You will have all of it by end of week.",
          points: -1,
          standing: -4,
          momentum: -3,
          reaction:
            "End of week is five days. That is not forty-eight hours. And listing everything you can think of is not the same as a plan.",
          principle:
            "Committing to everything signals panic rather than command. Over-promising after an incident sets up a second failure when deliverables slip.",
          keywords: ["everything", "all of it", "end of week", "full", "all problems", "commit to all", "everything fixed"],
        },
        {
          id: "s4d",
          tag: "Ask what he needs most",
          line:
            "Tell me what you care most about in the next forty-eight hours. I have a list but I want to make sure I am working on the thing that matters most to you, not just the thing that matters most to me.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "No more outages. That is what I care about. After that, the written root cause document. Those two things.",
          principle:
            "Asking what the executive cares most about before naming your commitments aligns your work to their measure of success. It also surfaces whether your list matches their priorities.",
          keywords: ["what matters most", "forty-eight hours", "your priority", "care about", "not just my list", "align", "most important to you"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -2,
        reaction: "I need specifics, not a category. What exactly and by when.",
        principle: "A CTO in a war room is not asking for a category of response. They are asking for a named action, a date, and an owner.",
      },
    },
  ],
  endings: [
    {
      id: "win",
      when: { momentumAtLeast: 70, standingAtLeast: 38 },
      result: "won",
      baseGrade: "A",
      resolution:
        "The CTO closes with: 'I want the written root cause on Thursday. Feature freeze approved. Let me know if the product team pushes back.' You leave as the person running the recovery.",
      lessons: [
        "A clean timeline with clear ownership is the only opener that works in a war room. Context before facts reads as building an excuse.",
        "Name the structural incentive failure, not the individual one. Skeptical principals promote people who diagnose at that level.",
        "Three specific forty-eight-hour commitments and one ask converts a post-incident interrogation into a recovery plan.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 45 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The CTO ends the call without assigning recovery ownership. You are expected to send a document by end of week. The feature freeze is still in discussion.",
      lessons: [
        "You survived the interrogation but did not convert it into a recovery plan. The difference is one specific ask.",
        "Forty-eight-hour commitments, not end-of-week commitments. The window of high attention is narrow.",
        "When a skeptical principal asks what you need, they are offering to help. Name the one thing that changes your odds.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The CTO ends the call by saying he is bringing in the infrastructure VP to own the remediation. You are removed from the recovery process.",
      lessons: [
        "Opening with context in a war room builds an excuse before admitting the fact. It costs you the room in the first sixty seconds.",
        "Citing SLA compliance against a six-hundred-thousand-dollar outage evaluates the wrong thing. The executive is measuring judgment, not process adherence.",
        "Over-committing to everything signals panic. Commit to three things you can actually deliver in forty-eight hours.",
      ],
    },
  ],
};
