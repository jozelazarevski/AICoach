import type { Encounter } from "../../game/types";

export const juniorEndRun: Encounter = {
  id: "junior-end-run",
  title: "The End Run Up",
  difficulty: "adversarial",
  opponent: {
    name: "The VP",
    role: "A VP who is now asking you about a concern your junior raised directly with her",
    archetype: "Skeptical Principal",
    blurb: "Your junior went around you to the VP with a concern about your project direction. The VP is asking you about it now. Respond without punishing the junior or undermining your own authority.",
  },
  scene:
    "A junior member of your team, Tej, sent a message directly to the VP of Product last week raising concerns about the technical direction of your project. He did not tell you he was doing it and you found out from the VP. The VP now wants to discuss it. The concern Tej raised has some merit, but the way he raised it also created a political problem for you. You need to handle the substance and the process question at the same time, without looking defensive, without punishing Tej visibly, and without losing your authority over the project.",
  objective:
    "Address the VP's concern about project direction honestly and handle the process breach without making it the center of the conversation.",
  startStanding: 35,
  startMomentum: 16,
  stages: [
    {
      id: "s1",
      prompt:
        "Tej reached out to me directly last week with some concerns about the project's technical direction. I want to hear your perspective on what he raised before I form a view.",
      choices: [
        {
          id: "s1a",
          tag: "Lead with the substance",
          line:
            "I want to address what Tej raised on the technical side first, because the concern has merit and I should answer it directly. After that I want to say one thing about the process, because I think it is worth naming.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is the right order. Tell me about the technical direction.",
          principle:
            "Addressing the substance before the process signals to the VP that you are not trying to protect your territory first. Leaders who lead with the process breach look like they are more concerned with hierarchy than with getting it right.",
          keywords: ["substance first", "merit", "technical side", "then process", "right order", "address what he raised", "answer directly"],
        },
        {
          id: "s1b",
          tag: "Address the breach first",
          line:
            "I want to first say that I was not aware Tej was going to reach out to you directly. That is not how I run my team and I am going to address it with him.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "I am less interested in who told me and more interested in whether the concern is valid. Is it.",
          principle:
            "Leading with the process breach tells the VP that your first instinct is to protect your authority rather than answer the concern. It also confirms that you see Tej's action as the primary problem, which signals the wrong set of priorities.",
          keywords: ["not aware", "breach", "address with him", "not how I run", "process first", "going around", "told me"],
        },
        {
          id: "s1c",
          tag: "Defend the direction",
          line:
            "I am confident in the direction we are heading. The technical choices we made were deliberate and the team has full visibility into the reasoning.",
          points: -3,
          standing: -12,
          momentum: -5,
          reaction:
            "I am not asking whether you are confident. I am asking whether the concern Tej raised is valid.",
          principle:
            "Defending your direction before answering the concern reads as defensive and avoids the actual question. The VP is testing your willingness to engage, not your confidence level.",
          keywords: ["confident", "deliberate", "full visibility", "defend", "team knows", "I am sure", "correct direction"],
        },
        {
          id: "s1d",
          tag: "Acknowledge complexity",
          line:
            "The concern Tej raised is real. We have been making bets on an approach that carries risk and I have not fully socialized the trade behind it. I want to walk you through it and I also want to hear what specifically worried Tej.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "Tell me the trade you were making and why.",
          principle:
            "Acknowledging that the concern has a basis before being asked to concede it demonstrates independent judgment. It also reframes you as someone who owns the decision rather than someone caught without an explanation.",
          keywords: ["real", "bets", "risk", "not fully socialized", "trade", "walk you through", "what worried Tej", "acknowledge"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -4,
        momentum: -1,
        reaction: "I need you to engage with the concern, not with who raised it.",
        principle: "Lead with the substance. The process concern is real but it is secondary to whether the technical direction is correct.",
      },
    },
    {
      id: "s2",
      prompt:
        "Walk me through the technical direction and what trade you are making.",
      choices: [
        {
          id: "s2a",
          tag: "Explain the bet clearly",
          line:
            "We chose to build on a microservices architecture rather than extend the monolith. The short-term cost is higher complexity and slower initial delivery. The bet is that we will have a system that can absorb the scale we expect by Q3 without a rebuild. If the scale does not materialize, the bet looks expensive. I believe it will, but it is a bet.",
          points: 6,
          standing: 12,
          momentum: 15,
          reaction:
            "That is a credible bet. What does Tej think we should do instead.",
          principle:
            "Explaining your technical decision as a bet with a clear upside and a named downside signals that you are a principled decision-maker, not someone winging it. VPs fund bets made by people who can name the risk.",
          keywords: ["bet", "microservices", "monolith", "scale", "short-term cost", "Q3", "rebuild", "named risk", "clear upside"],
        },
        {
          id: "s2b",
          tag: "Avoid specifics",
          line:
            "There are technical trade-offs in every architecture decision. I believe our team has the right capabilities to execute on the path we have chosen.",
          points: -2,
          standing: -9,
          momentum: -4,
          reaction:
            "That does not tell me anything. What specifically is the trade-off.",
          principle:
            "Avoiding specifics when a VP asks about a technical trade-off reads as not knowing the details of your own project. It hands credibility to the person who surfaced the concern.",
          keywords: ["trade-offs", "capabilities", "path chosen", "believe", "vague", "avoid specifics", "right team", "general"],
        },
        {
          id: "s2c",
          tag: "Question Tej's framing",
          line:
            "I think Tej's concern is coming from a different risk appetite than I have. He tends to be more conservative technically and I think that is coloring how he is framing the risk.",
          points: -1,
          standing: -6,
          momentum: -3,
          reaction:
            "Maybe. Or maybe he has a point you have not fully addressed. Tell me the substance.",
          principle:
            "Attributing the concern to your junior's risk appetite before explaining the actual decision reads as dismissing the concern by dismissing the person.",
          keywords: ["Tej's framing", "his risk appetite", "conservative", "coloring", "his perspective", "question his view"],
        },
        {
          id: "s2d",
          tag: "Name the uncertainty",
          line:
            "The core trade is between time-to-market on the existing architecture and scalability on the new one. I am betting on the second. Where I have uncertainty is the migration timeline. That is the specific thing Tej is probably worried about and honestly it is the thing I am watching most closely.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "What is the current migration estimate and how confident are you in it.",
          principle:
            "Naming the exact uncertainty in your own plan demonstrates intellectual honesty and shows the VP that you are monitoring the right thing. It is more credible than a fully confident answer.",
          keywords: ["uncertainty", "migration timeline", "watching closely", "time-to-market", "scalability", "Tej worried about", "name the risk"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "Be more specific. I need the actual trade, not the general concept.",
        principle: "Name the specific architectural decision, the specific risk, and the specific bet. That is what a VP needs to evaluate.",
      },
    },
    {
      id: "s3",
      prompt:
        "Tej's concern, specifically, was that you are not listening to technical dissent on the team. That is a different issue than the architecture. What do you say to that.",
      choices: [
        {
          id: "s3a",
          tag: "Take it seriously",
          line:
            "That is a more serious concern than the architecture question and I want to take it seriously. If Tej felt he could not raise this with me, that is something I need to understand. I would like to talk to him directly and then come back to you with what I find.",
          points: 5,
          standing: 10,
          momentum: 12,
          reaction:
            "That is the right response. I want to hear what you learn from that conversation.",
          principle:
            "Taking a team culture concern seriously in front of a VP, rather than dismissing it, is the kind of leadership signal that matters more than any architecture decision.",
          keywords: ["take it seriously", "more serious", "talk to him directly", "need to understand", "come back to you", "what I find", "culture"],
        },
        {
          id: "s3b",
          tag: "Dispute the characterization",
          line:
            "I strongly disagree with that characterization. I have regular technical reviews and I actively seek dissenting views from the team. If Tej felt unheard, I want to understand why, but I do not accept the framing that I am not listening.",
          points: -2,
          standing: -10,
          momentum: -4,
          reaction:
            "Tej felt strongly enough to come to me directly. That is evidence of something. What is your read on why he did not come to you first.",
          principle:
            "Disputing a leadership concern with a claim about your own behavior is not evidence. The VP does not have data on your team culture. Tej's action is the evidence she is weighing.",
          keywords: ["strongly disagree", "dispute", "actively seek", "not accept the framing", "not listening is wrong", "defend myself"],
        },
        {
          id: "s3c",
          tag: "Ask what Tej said specifically",
          line:
            "Can you tell me exactly what Tej said about not being listened to. I want to understand the specific situation he was describing, not just the general characterization.",
          points: 3,
          standing: 5,
          momentum: 7,
          reaction:
            "He said that when he raised concerns in technical reviews, they were acknowledged and then not acted on. He felt the architecture decision was already made before the reviews happened.",
          principle:
            "Getting specifics before responding to a vague leadership concern prevents you from defending against the wrong charge. It also gives you real information to work with.",
          keywords: ["specifically", "what did he say", "exact situation", "general characterization", "not vague", "real words", "tell me exactly"],
        },
        {
          id: "s3d",
          tag: "Name the design pattern",
          line:
            "I made the architecture call after a review. I asked for input and I got it. What I did not do was make the input binding on the decision. I believe that is my job. What I hear in what you are describing is that Tej wanted a different process, maybe a vote or a consensus model. That is a real disagreement about how decisions get made, and I want to have that conversation with him directly.",
          points: 4,
          standing: 8,
          momentum: 10,
          reaction:
            "That is a reasonable distinction. The question is whether Tej's concern was about the process or the outcome.",
          principle:
            "Distinguishing between input that is binding and input that informs the decision is a legitimate leadership position. Naming it explicitly gives the VP a framework to evaluate the situation rather than just Tej's characterization.",
          keywords: ["design pattern", "not binding", "consensus", "my job", "how decisions get made", "real disagreement", "process", "input vs vote"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "That is not a full answer. If a team member went around you, something prompted that.",
        principle: "A junior who goes around you is sending a signal. Taking that signal seriously is more important than defending your process.",
      },
    },
    {
      id: "s4",
      prompt:
        "I want to ask you about Tej directly. How are you going to handle this with him.",
      choices: [
        {
          id: "s4a",
          tag: "Have the conversation, not a reprimand",
          line:
            "I am going to have a direct conversation with him, but I want to be clear: it is going to be a conversation about how to raise concerns effectively, not a reprimand for raising them. If I punish him for surfacing a real concern, I will have a team that stops surfacing concerns. That would be the real failure.",
          points: 6,
          standing: 14,
          momentum: 15,
          reaction:
            "That is exactly the right approach. I was a little worried about what you were going to do.",
          principle:
            "Naming your intent not to punish the junior for surfacing a concern is the highest signal you can give a VP about your leadership. It shows you understand the difference between process and outcome.",
          keywords: ["conversation not reprimand", "how to raise concerns", "not punish", "stop surfacing", "real failure", "direct conversation", "clear intent"],
        },
        {
          id: "s4b",
          tag: "Address the breach directly",
          line:
            "I will tell him that going directly to you without coming to me first is not appropriate and that it cannot happen again. He needs to understand the chain of communication.",
          points: -2,
          standing: -12,
          momentum: -5,
          reaction:
            "If you focus on the chain of communication, you will teach your team to be quiet. That is not what I want and it is not what you want.",
          principle:
            "Focusing on the communication chain rather than on how to raise concerns productively converts a leadership opportunity into a hierarchy enforcement. The VP will see this as the wrong lesson.",
          keywords: ["breach", "chain of communication", "not appropriate", "cannot happen again", "address", "tell him off", "hierarchy"],
        },
        {
          id: "s4c",
          tag: "Say you will think about it",
          line:
            "I want to think carefully about the right approach before I talk to him. I do not want to make it worse.",
          points: 0,
          standing: -2,
          momentum: -1,
          reaction:
            "Think fast. Leaving this unaddressed is also a choice.",
          principle:
            "Saying you will think about it when a VP asks how you are going to handle a team member reads as either indecision or avoidance. Name your intent clearly even if the conversation has not happened yet.",
          keywords: ["think carefully", "right approach", "not sure", "will consider", "delay", "unsure", "need time"],
        },
        {
          id: "s4d",
          tag: "Invite him to collaborate",
          line:
            "I am going to ask him to help me design a better process for technical dissent on the team. He has a real concern about how decisions get made and I would rather put that energy into building something better than into a conversation about what he should not have done.",
          points: 5,
          standing: 10,
          momentum: 13,
          reaction:
            "That is a generous response. I hope he takes you up on it.",
          principle:
            "Inviting your junior to co-design the process he was protesting converts a political breach into a leadership moment. It is a generous read of the situation and it signals serious maturity.",
          keywords: ["collaborate", "better process", "help me design", "his energy", "technical dissent", "co-design", "invite", "generous"],
        },
      ],
      freeformFallback: {
        points: 0,
        standing: -3,
        momentum: -1,
        reaction: "I need to know your intent with Tej before this is done.",
        principle: "Name your intent with the junior clearly. The VP is evaluating whether you will create a team that stops surfacing concerns.",
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
        "The VP ends the conversation saying she now has confidence in the direction and in how you lead. She will not be taking any further action on Tej's concern.",
      lessons: [
        "Address the substance before the process breach. Leaders who lead with hierarchy signal they care more about authority than outcomes.",
        "If a junior felt they had to go around you, something created that feeling. Take the signal seriously rather than defending against it.",
        "Naming your intent not to punish the junior for surfacing a concern is the single most powerful leadership signal in this conversation.",
      ],
    },
    {
      id: "partial",
      when: { momentumAtLeast: 48 },
      result: "partial",
      baseGrade: "C",
      resolution:
        "The VP is reassured on the technical direction but still uncertain about how you lead your team. She will check in after your conversation with Tej.",
      lessons: [
        "Getting the architecture explanation right is not enough if the leadership question remains open.",
        "The conversation with Tej is more important than the technical discussion. The VP knows this.",
        "Taking the culture concern seriously in front of the VP is different from having a process explanation ready.",
      ],
    },
    {
      id: "lost",
      when: {},
      result: "lost",
      baseGrade: "D",
      resolution:
        "The VP decides to have a broader conversation about project leadership. She describes your response as 'more defensive than curious.' The project remains on track but your leadership of it is now in question.",
      lessons: [
        "Defending your process before addressing the concern hands credibility to the person who surfaced it.",
        "Disputing a leadership concern with claims about your own behavior is not evidence. The junior's action is the evidence the VP is weighing.",
        "Focusing on the communication chain teaches your team to be quiet. The VP will see that as the wrong lesson.",
      ],
    },
  ],
};
