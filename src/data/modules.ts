export interface Lesson {
  title: string;
  content: string;
  exercise: string;
}

export interface Module {
  slug: string;
  title: string;
  category: "managing-up" | "managing-down" | "career-growth";
  description: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  // --- Managing Up ---
  {
    slug: "communicating-with-leadership",
    title: "Communicating with Leadership",
    category: "managing-up",
    description:
      "Learn how to structure your communication to resonate with senior leaders and executives.",
    lessons: [
      {
        title: "Lead with the Bottom Line",
        content:
          "Executives are time-constrained. Start every communication with the conclusion or recommendation, then provide supporting details. Use the BLUF (Bottom Line Up Front) format: state your ask or key insight first, follow with 2-3 supporting points, and close with the specific action you need from them.",
        exercise:
          "Rewrite this message using BLUF: 'Hi, I've been looking at our Q3 metrics and there are some interesting trends. Our customer acquisition cost went up 15%, but lifetime value also increased by 22%. I ran some models and I think we should increase our marketing budget by 10%. The data suggests we'd see positive ROI within two quarters. Can we discuss this at the next leadership meeting?'",
      },
      {
        title: "Speaking the Language of Impact",
        content:
          "Leaders think in terms of revenue, risk, customer impact, and strategic alignment. Frame every proposal in terms of business outcomes, not technical details. Instead of 'We need to refactor the auth module,' say 'Reducing login failures by 40% would recover an estimated $200K in annual revenue.' Always tie your message to what they care about most.",
        exercise:
          "You want to propose adopting a new project management tool. Frame this request in terms of business impact rather than features. Write a 3-sentence pitch to your VP.",
      },
      {
        title: "Managing Expectations Proactively",
        content:
          "Never let your boss be surprised by bad news. When a project is at risk, communicate early with three things: (1) what happened, (2) what you're doing about it, and (3) what you need from them. This builds trust far more than pretending everything is fine. Set realistic timelines and update regularly, especially when things change.",
        exercise:
          "Your team's major deliverable will be two weeks late. Draft a message to your director that communicates the delay, your mitigation plan, and what you need from them.",
      },
    ],
  },
  {
    slug: "building-influence-without-authority",
    title: "Building Influence Without Authority",
    category: "managing-up",
    description:
      "Develop the skills to influence decisions and drive change even when you don't have formal authority.",
    lessons: [
      {
        title: "The Currency of Trust",
        content:
          "Influence is built on trust, and trust is built through consistent delivery and reliability. Before you can influence, you need a track record. Follow through on every commitment, no matter how small. When you say you'll send something by Friday, send it by Thursday. This credibility becomes the foundation of your influence.",
        exercise:
          "List three commitments you've made recently. Rate your follow-through on each (1-5). Identify one area where improving reliability would increase your influence with a key stakeholder.",
      },
      {
        title: "Strategic Visibility",
        content:
          "Doing great work isn't enough — the right people need to know about it. This isn't about self-promotion; it's about keeping stakeholders informed. Share wins and learnings in team channels, volunteer to present at all-hands meetings, and write brief summaries of project outcomes. The goal is making your contributions visible without being obnoxious about it.",
        exercise:
          "Identify one recent accomplishment that key stakeholders may not know about. Draft a brief, natural-sounding message to share it in an appropriate forum (team standup, Slack channel, email update).",
      },
      {
        title: "Building Alliances Across Teams",
        content:
          "Cross-functional relationships multiply your influence. Seek out people in adjacent teams — product, design, sales, ops — and understand their challenges. Offer help before asking for favors. When you need support for an initiative, these relationships become your coalition. The most influential people in any organization are the ones who bridge silos.",
        exercise:
          "Map out three people in other teams whose work intersects with yours. For each, write down one way you could help them this month and one thing you might need from them in the future.",
      },
    ],
  },

  // --- Managing Down ---
  {
    slug: "effective-delegation",
    title: "Effective Delegation",
    category: "managing-down",
    description:
      "Master the art of delegating work that develops your team while maintaining quality and accountability.",
    lessons: [
      {
        title: "The Delegation Framework",
        content:
          "Effective delegation has five components: (1) clearly define the outcome, not the process; (2) explain the 'why' — connect the task to the bigger picture; (3) set explicit boundaries — what they can decide vs. what needs your input; (4) agree on check-in points; (5) define what success looks like. Most delegation fails because managers skip steps 1 and 3.",
        exercise:
          "You need to delegate a quarterly report to a mid-level team member. Using the five-component framework, write out exactly how you would delegate this task.",
      },
      {
        title: "Matching Tasks to Growth",
        content:
          "The best delegation develops people. Match tasks slightly above someone's current skill level — challenging enough to grow, but achievable with support. Consider each person's career goals when assigning stretch work. A report who wants to move into product management should get stakeholder-facing tasks. Delegation is a development tool, not just a workload tool.",
        exercise:
          "Think of two team members with different career goals. For each, identify one task you currently do that would both help you and develop them. Explain why the match works.",
      },
      {
        title: "Letting Go Without Losing Control",
        content:
          "Micromanaging kills motivation and doesn't scale. Instead, establish clear check-in cadences: daily for new or risky work, weekly for standard projects. Ask open questions at check-ins: 'What's blocking you?' rather than 'Did you do X?' Focus on outcomes, not methods. If the result meets the bar, the approach doesn't matter. Reserve detailed oversight for high-stakes or new-to-role situations only.",
        exercise:
          "Reflect on a recent task you closely monitored. Was the level of oversight appropriate? Write down what you would change and what check-in questions you'd use instead.",
      },
    ],
  },
  {
    slug: "giving-feedback-that-lands",
    title: "Giving Feedback That Lands",
    category: "managing-down",
    description:
      "Deliver feedback that people actually hear, internalize, and act on — both positive and constructive.",
    lessons: [
      {
        title: "The SBI Model",
        content:
          "Use the Situation-Behavior-Impact (SBI) model for clear, non-judgmental feedback. Situation: describe when and where. Behavior: describe the specific observable action (not your interpretation). Impact: describe the effect on you, the team, or the outcome. Example: 'In yesterday's client call (S), when you interrupted the client twice (B), it made them visibly frustrated and we lost momentum in the negotiation (I).'",
        exercise:
          "A team member consistently delivers work at the last minute, causing stress for reviewers. Write SBI feedback for this behavior. Then write SBI feedback for something they do well.",
      },
      {
        title: "Creating Psychological Safety for Feedback",
        content:
          "People can only hear feedback when they feel safe. Build a feedback culture by: (1) giving positive feedback publicly and frequently — aim for 5:1 positive to constructive; (2) asking for feedback on yourself first; (3) framing constructive feedback as investment in their growth; (4) choosing the right moment — never give tough feedback when someone is stressed or in front of others.",
        exercise:
          "Draft a message asking your team for feedback on your own management style. Include 2-3 specific questions that make it easy for them to be honest.",
      },
      {
        title: "Following Up on Feedback",
        content:
          "Feedback without follow-up is just noise. After giving constructive feedback: (1) agree on specific actions together; (2) schedule a follow-up conversation; (3) notice and acknowledge improvement immediately; (4) if the behavior doesn't change, escalate the conversation — repeat the feedback with more direct framing and discuss consequences. Document the pattern if needed.",
        exercise:
          "You gave feedback two weeks ago about meeting preparation, but nothing has changed. Write out how you would re-approach this conversation, including what you'd say and what next steps you'd propose.",
      },
    ],
  },

  // --- Career Growth ---
  {
    slug: "promotion-readiness",
    title: "Promotion Readiness",
    category: "career-growth",
    description:
      "Understand what it takes to get promoted and build a deliberate strategy for career advancement.",
    lessons: [
      {
        title: "Understanding the Real Criteria",
        content:
          "Promotions are rarely about doing your current job well — they're about consistently demonstrating you already operate at the next level. Study your company's leveling framework. Talk to your manager about what 'next level' looks like specifically for you. Identify the gaps between where you are and where you need to be. The biggest mistake people make is optimizing for their current role instead of the one they want.",
        exercise:
          "Find your company's career ladder or leveling guide. List the top 3 criteria for the next level above yours. For each, rate yourself honestly (1-5) and identify one specific thing you could do in the next month to close the gap.",
      },
      {
        title: "Building Your Promotion Case",
        content:
          "Don't rely on your manager to track your accomplishments — they're too busy. Keep a running 'brag document' with: date, what you did, the measurable impact, and who was involved. Update it weekly. When promotion time comes, you'll have concrete evidence organized by the criteria that matter. Quantify everything: 'reduced deploy time by 60%' beats 'improved the deploy process.'",
        exercise:
          "Start your brag document now. Write down your top 5 accomplishments from the past 6 months. For each, include the measurable impact and how it maps to next-level expectations.",
      },
      {
        title: "Sponsors vs. Mentors",
        content:
          "Mentors give advice. Sponsors advocate for you in rooms you're not in. You need both, but sponsors are what get you promoted. A sponsor is a senior leader who knows your work and is willing to put their reputation on the line for you. You earn sponsors by delivering visible, high-impact work and building genuine relationships — not by asking someone to be your sponsor.",
        exercise:
          "Identify one potential sponsor in your organization — someone senior who has seen your work. Write a plan for how you'd strengthen this relationship over the next 3 months through specific actions (not by asking them to sponsor you).",
      },
    ],
  },
  {
    slug: "navigating-organizational-politics",
    title: "Navigating Organizational Politics",
    category: "career-growth",
    description:
      "Learn to read organizational dynamics and navigate them ethically to advance your career.",
    lessons: [
      {
        title: "Mapping Power and Influence",
        content:
          "Every organization has a formal hierarchy and an informal influence network. The two rarely overlap completely. Identify who actually makes decisions (not just who has the title), who influences the decision-makers, and what motivates each person. This isn't manipulative — it's understanding your environment. Pay attention to who gets cc'd on emails, who speaks first in meetings, and whose opinions shift the room.",
        exercise:
          "Draw an influence map for a recent decision in your organization. Who had the final say? Who influenced them? Were there informal influencers who didn't have formal authority? What can you learn from this for next time?",
      },
      {
        title: "Handling Difficult Stakeholders",
        content:
          "Some people will block you, compete with you, or undermine your work. Don't take it personally — understand their incentives. The blocker may fear losing resources. The competitor may feel threatened. The best strategy is usually empathy and alignment: find out what they care about and show how your proposal helps them too. When that fails, document everything and escalate factually, not emotionally.",
        exercise:
          "Think of a stakeholder who has been difficult to work with. Write down what you think their core motivation or fear is. Then draft a brief approach for your next interaction that addresses their underlying concern.",
      },
      {
        title: "Knowing When to Move On",
        content:
          "Sometimes the best career move is leaving. Signs it might be time: you've stopped learning, your values don't align with leadership, there's no clear path forward despite your efforts, or you're consistently passed over without actionable feedback. Before leaving, try an honest conversation with your manager. But if the environment is fundamentally misaligned with your goals, staying too long is a career risk in itself.",
        exercise:
          "Rate your current role on these dimensions (1-5): learning, alignment with values, career path clarity, recognition, and work-life balance. For any score below 3, write one concrete thing you could do to improve it — and one signal that would tell you it's time to look elsewhere.",
      },
    ],
  },
];

export function getModulesByCategory(
  category: Module["category"]
): Module[] {
  return modules.filter((m) => m.category === category);
}

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}
