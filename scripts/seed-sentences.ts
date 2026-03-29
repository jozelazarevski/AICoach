import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Capitalise first letter */
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Cross-product two arrays into sentences via a template fn */
function cross<A, B>(
  a: A[],
  b: B[],
  fn: (a: A, b: B) => string
): string[] {
  const out: string[] = [];
  for (const x of a) for (const y of b) out.push(fn(x, y));
  return out;
}

// ---------------------------------------------------------------------------
// Word banks — the raw material for sentence generation
// ---------------------------------------------------------------------------

const roles = [
  "your manager",
  "your director",
  "a senior leader",
  "a VP",
  "the CTO",
  "the CEO",
  "a skip-level manager",
  "a board member",
  "your department head",
  "the COO",
];

const reports = [
  "a junior developer",
  "a mid-level engineer",
  "a new hire",
  "a senior individual contributor",
  "a struggling team member",
  "a high performer",
  "a remote employee",
  "an intern",
  "a team lead",
  "a cross-functional partner",
];

const emotions = [
  "frustrated",
  "anxious",
  "overwhelmed",
  "disengaged",
  "excited",
  "uncertain",
  "defensive",
  "burned out",
  "enthusiastic",
  "hesitant",
];

const topics = [
  "project timeline",
  "budget allocation",
  "team restructuring",
  "performance review",
  "product strategy",
  "technical debt",
  "hiring plan",
  "quarterly goals",
  "promotion criteria",
  "work-life balance",
];

const outcomes = [
  "a budget increase",
  "more headcount",
  "a deadline extension",
  "a promotion",
  "executive sponsorship",
  "a new tool or platform",
  "a strategic pivot",
  "cross-team alignment",
  "additional resources",
  "a policy change",
];

const skills = [
  "active listening",
  "empathetic questioning",
  "clear framing",
  "data-driven argumentation",
  "stakeholder mapping",
  "conflict de-escalation",
  "expectation setting",
  "narrative building",
  "strategic silence",
  "open-ended questioning",
];

const feedbackAdj = [
  "constructive",
  "positive",
  "redirective",
  "reinforcing",
  "developmental",
  "corrective",
  "motivational",
  "calibrating",
  "appreciative",
  "forward-looking",
];

const situations = [
  "a missed deadline",
  "a client escalation",
  "a team conflict",
  "a product launch",
  "a reorganisation",
  "an underperforming quarter",
  "a hiring freeze",
  "a major outage",
  "a compliance audit",
  "a merger announcement",
];

const meetingTypes = [
  "a one-on-one",
  "a skip-level",
  "a sprint retrospective",
  "an all-hands",
  "a board presentation",
  "a stakeholder review",
  "a design review",
  "a post-mortem",
  "a planning session",
  "a town hall",
];

const careerStages = [
  "early-career professional",
  "mid-career professional",
  "senior individual contributor",
  "first-time manager",
  "experienced manager",
  "director-level leader",
  "executive",
  "career changer",
  "returning professional",
  "technical lead",
];

const values = [
  "autonomy",
  "recognition",
  "impact",
  "stability",
  "growth",
  "collaboration",
  "innovation",
  "work-life balance",
  "mentorship",
  "mastery",
];

const actions = [
  "schedule a follow-up",
  "document the conversation",
  "share a written summary",
  "ask clarifying questions",
  "propose a trial period",
  "offer specific examples",
  "request written feedback",
  "set a SMART goal",
  "create an action plan",
  "establish check-in cadence",
];

const blockers = [
  "lack of clarity on expectations",
  "competing priorities",
  "limited resources",
  "unclear ownership",
  "political dynamics",
  "remote communication gaps",
  "time zone differences",
  "skill gaps on the team",
  "low psychological safety",
  "organisational silos",
];

const strengths = [
  "technical expertise",
  "communication skills",
  "strategic thinking",
  "relationship building",
  "problem solving",
  "adaptability",
  "execution speed",
  "attention to detail",
  "creativity",
  "resilience",
];

const weaknesses = [
  "public speaking",
  "delegation",
  "saying no",
  "giving feedback",
  "time management",
  "strategic thinking",
  "networking",
  "written communication",
  "conflict resolution",
  "self-promotion",
];

const frameworks = [
  "the BLUF method",
  "the SBI feedback model",
  "the STAR method",
  "the RACI matrix",
  "the Eisenhower matrix",
  "OKRs",
  "the 5 Whys",
  "the Johari Window",
  "the GROW coaching model",
  "the situational leadership model",
];

const channels = [
  "in a one-on-one meeting",
  "over Slack",
  "via email",
  "during a team standup",
  "in a written proposal",
  "through a shared document",
  "in a video call",
  "at an offsite",
  "during a casual coffee chat",
  "in a formal presentation",
];

const timeframes = [
  "this week",
  "before your next one-on-one",
  "within the next sprint",
  "over the next 30 days",
  "by the end of the quarter",
  "in the next performance cycle",
  "before the project kickoff",
  "during your next team meeting",
  "within 24 hours",
  "over the next 90 days",
];

// ---------------------------------------------------------------------------
// Sentence generators by category and subcategory
// ---------------------------------------------------------------------------

interface SentenceRow {
  category: string;
  subcategory: string;
  type: string;
  text: string;
  context: string | null;
}

const sentences: SentenceRow[] = [];

function add(
  category: string,
  subcategory: string,
  type: string,
  text: string,
  context: string | null = null
) {
  sentences.push({ category, subcategory, type, text, context });
}

// ===== MANAGING UP =====

// -- Conversation starters --
for (const role of roles) {
  for (const topic of topics) {
    add(
      "managing-up",
      "conversation-starters",
      "opener",
      `I'd like to discuss the ${topic} with you — do you have 15 minutes ${pick(timeframes)}?`,
      `Use when approaching ${role} about ${topic}.`
    );
  }
}

// -- BLUF examples --
for (const outcome of outcomes) {
  for (const topic of topics) {
    add(
      "managing-up",
      "bluf-communication",
      "example",
      `Bottom line: I'm requesting ${outcome}. Our ${topic} analysis shows this would reduce risk and accelerate delivery. I have three supporting data points to share.`,
      `BLUF format for requesting ${outcome} related to ${topic}.`
    );
  }
}

// -- Influence phrases --
cross(roles, outcomes, (role, outcome) => {
  const s = `When pitching ${outcome} to ${role}, lead with the business impact: "This would help us ${pick(["reduce costs by", "increase revenue by", "improve retention by", "accelerate delivery by", "decrease risk by"])} an estimated ${pick(["10%", "15%", "20%", "25%", "30%"])}."`;
  add("managing-up", "influence-phrases", "pitch", s, `Pitching to ${role}.`);
  return s;
});

// -- Managing expectations --
for (const situation of situations) {
  for (const role of roles.slice(0, 5)) {
    add(
      "managing-up",
      "managing-expectations",
      "template",
      `I want to flag that ${situation} may affect our timeline. Here's what happened, what we're doing about it, and what I need from you.`,
      `Proactive communication to ${role} about ${situation}.`
    );
  }
}

// -- Asking for feedback --
for (const skill of skills) {
  add(
    "managing-up",
    "asking-for-feedback",
    "question",
    `I'm working on improving my ${skill}. Could you share one thing I did well recently and one area where I could improve?`,
    `Self-development conversation with your manager.`
  );
  add(
    "managing-up",
    "asking-for-feedback",
    "question",
    `On a scale of 1-5, how effective was my ${skill} in the last project? What would make it a 5?`,
    `Targeted feedback request.`
  );
}

// -- Saying no upward --
for (const topic of topics) {
  add(
    "managing-up",
    "saying-no",
    "response",
    `I understand the importance of the ${topic}. To take this on at the level it deserves, I'd need to deprioritise one of these current commitments — which would you prefer I defer?`,
    `Pushing back constructively when overloaded.`
  );
}

// -- Status updates --
for (const topic of topics) {
  for (const timeframe of timeframes.slice(0, 5)) {
    add(
      "managing-up",
      "status-updates",
      "template",
      `${topic} update: We're on track for the milestone ${timeframe}. Key progress: [X]. Risks: [Y]. Decision needed: [Z].`,
      `Concise status update format.`
    );
  }
}

// -- Meeting preparation --
for (const mt of meetingTypes) {
  add(
    "managing-up",
    "meeting-prep",
    "checklist",
    `Before ${mt}: (1) define your goal for the meeting, (2) prepare 2-3 discussion points, (3) anticipate questions, (4) bring data to support your points.`,
    `Preparation framework for ${mt}.`
  );
}

// -- Building credibility --
for (const strength of strengths) {
  add(
    "managing-up",
    "building-credibility",
    "tip",
    `Leverage your ${strength} to build credibility: volunteer for projects where ${strength} is the critical success factor, and make sure key stakeholders see the results.`,
    `Strategic visibility through strengths.`
  );
}

// ===== MANAGING DOWN =====

// -- Delegation phrases --
for (const report of reports) {
  for (const topic of topics) {
    add(
      "managing-down",
      "delegation",
      "script",
      `I'd like you to own the ${topic} deliverable. Here's the outcome I need, the boundaries, and when we'll check in. What questions do you have?`,
      `Delegating to ${report}.`
    );
  }
}

// -- SBI Feedback --
for (const adj of feedbackAdj) {
  for (const situation of situations) {
    add(
      "managing-down",
      "sbi-feedback",
      "example",
      `[Situation] During ${situation}, [Behaviour] I noticed you ${pick(["took initiative to", "held back from", "stepped up and", "struggled with", "excelled at"])} ${pick(["communicate the risk", "coordinate with stakeholders", "meet the deadline", "support your teammates", "present the findings"])}. [Impact] This ${pick(["built confidence across the team", "caused delays downstream", "impressed the client", "created confusion about ownership", "demonstrated your growth"])}.`,
      `${cap(adj)} feedback example.`
    );
  }
}

// -- One-on-one questions --
const o3oQuestions = [
  "What's the most important thing we should discuss today?",
  "What's one thing I could do differently to better support you?",
  "What's blocking your progress right now?",
  "Is there anything on your mind that we haven't talked about?",
  "What's one win from this week that you're proud of?",
  "Are you getting enough feedback from me? Too much?",
  "How are you feeling about your workload?",
  "What skill would you most like to develop in the next quarter?",
  "Is there anyone on the team you'd like to collaborate with more?",
  "What's one thing about our team culture you'd change?",
  "Do you feel you have enough context on our team's priorities?",
  "How can I help you grow toward your next role?",
  "What's the most frustrating part of your day-to-day?",
  "What kind of projects would energise you?",
  "Is there a process that's slowing you down?",
  "How do you prefer to receive feedback?",
  "What's something you've learned recently that excited you?",
  "Are there any team dynamics I should be aware of?",
  "What would make our one-on-ones more useful for you?",
  "If you could change one thing about how I manage, what would it be?",
];

for (const q of o3oQuestions) {
  add("managing-down", "one-on-one-questions", "question", q, "One-on-one meeting question.");
}

// -- Motivation phrases --
for (const report of reports) {
  for (const value of values) {
    add(
      "managing-down",
      "motivation",
      "approach",
      `For ${report} who values ${value}: connect their current work to how it supports ${value}. Ask: "How well does your current project align with your need for ${value}?"`,
      `Motivating through ${value}.`
    );
  }
}

// -- Handling underperformance --
for (const report of reports.slice(0, 5)) {
  for (const weakness of weaknesses) {
    add(
      "managing-down",
      "underperformance",
      "script",
      `I've noticed a pattern with ${weakness} over the past few weeks. I want to help you improve because I believe in your potential. Let's set a specific goal: ${pick(actions)}. We'll check in ${pick(timeframes)}.`,
      `Addressing ${weakness} with ${report}.`
    );
  }
}

// -- Recognition phrases --
for (const strength of strengths) {
  add(
    "managing-down",
    "recognition",
    "example",
    `Your ${strength} really made a difference in the last project. Specifically, when you ${pick(["led the technical discussion", "mentored the new hire", "identified the root cause", "presented to the stakeholders", "delivered ahead of schedule"])}, it ${pick(["saved us a week of work", "raised the quality bar for the team", "built trust with the client", "inspired others to step up", "unblocked three downstream teams"])}.`,
    `Specific recognition for ${strength}.`
  );
}

// -- Conflict resolution --
for (const emotion of emotions) {
  add(
    "managing-down",
    "conflict-resolution",
    "response",
    `I can see you're feeling ${emotion}. I want to understand your perspective — can you walk me through what happened from your point of view?`,
    `De-escalating when someone is ${emotion}.`
  );
  add(
    "managing-down",
    "conflict-resolution",
    "response",
    `It sounds like you're ${emotion} about this. That's valid. Let's separate the problem from the people and figure out a path forward together.`,
    `Acknowledging emotion and redirecting.`
  );
}

// -- Setting expectations --
for (const topic of topics) {
  add(
    "managing-down",
    "setting-expectations",
    "template",
    `For the ${topic}: here's what success looks like, the timeline, who's responsible for what, and how we'll measure progress. What's unclear?`,
    `Clear expectation-setting for ${topic}.`
  );
}

// -- Team culture --
const cultureStatements = [
  "On this team, it's safe to say 'I don't know' — asking for help is a strength, not a weakness.",
  "We give feedback because we care about each other's growth, not to criticise.",
  "Mistakes are learning opportunities. We do blameless retrospectives.",
  "We document decisions so everyone has context, especially remote team members.",
  "We celebrate small wins, not just big launches.",
  "Disagreement is welcome — but once we decide, we commit.",
  "We default to transparency. If in doubt, share more context, not less.",
  "We protect focus time. Not every message needs an immediate response.",
  "We own our work end-to-end: if you ship it, you support it.",
  "We invest in onboarding. The first 90 days set the tone for years.",
];

for (const stmt of cultureStatements) {
  add("managing-down", "team-culture", "norm", stmt, "Team norm to establish and reinforce.");
}

// ===== CAREER GROWTH =====

// -- Self-assessment prompts --
for (const strength of strengths) {
  for (const weakness of weaknesses) {
    add(
      "career-growth",
      "self-assessment",
      "prompt",
      `My core strength is ${strength} and the skill I most need to develop is ${weakness}. This quarter, I'll leverage ${strength} on high-visibility projects while spending 30 minutes daily practising ${weakness}.`,
      `Self-assessment and development planning.`
    );
  }
}

// -- Brag document entries --
for (const topic of topics) {
  add(
    "career-growth",
    "brag-document",
    "template",
    `[Date] Led the ${topic} initiative. Impact: ${pick(["reduced costs by $50K", "improved delivery speed by 30%", "increased team satisfaction by 15 points", "eliminated 20 hours/week of manual work", "grew revenue pipeline by $200K"])}. Stakeholders involved: ${pick(roles)}, ${pick(reports)}.`,
    `Brag document entry for ${topic}.`
  );
}

// -- Promotion conversation --
for (const careerStage of careerStages) {
  add(
    "career-growth",
    "promotion-conversation",
    "opener",
    `As a ${careerStage}, I'd like to discuss my path to the next level. I've prepared examples of how I'm already operating at that level and where I still have gaps. Can we review them together?`,
    `Opening a promotion conversation as a ${careerStage}.`
  );
  add(
    "career-growth",
    "promotion-conversation",
    "follow-up",
    `Thank you for the feedback. To confirm: you'd like me to demonstrate more ${pick(weaknesses)} and ${pick(weaknesses)} before the next cycle. I'll ${pick(actions)} and we can revisit ${pick(timeframes)}.`,
    `Following up after promotion discussion.`
  );
}

// -- Networking phrases --
for (const channel of channels) {
  add(
    "career-growth",
    "networking",
    "opener",
    `I've been following your work on [topic] and found it really insightful. I'd love to learn more about your approach — would you be open to a 20-minute chat ${channel.replace("in ", "").replace("during ", "")}?`,
    `Reaching out to build your network ${channel}.`
  );
}

// -- Navigating politics --
for (const blocker of blockers) {
  add(
    "career-growth",
    "navigating-politics",
    "strategy",
    `When facing ${blocker}, map the stakeholders: who benefits from the status quo, who wants change, and who's neutral. Build your coalition with the change-seekers, address the concerns of the neutral parties, and ${pick(actions)}.`,
    `Political navigation strategy.`
  );
}

// -- Frameworks in practice --
for (const framework of frameworks) {
  add(
    "career-growth",
    "frameworks",
    "application",
    `Apply ${framework} to your current challenge: identify the core problem, map it to the framework's structure, and present your findings ${pick(channels)}. This demonstrates structured thinking to ${pick(roles)}.`,
    `Using ${framework} for career growth.`
  );
}

// -- Handling rejection --
const rejectionScenarios = [
  "passed over for a promotion",
  "denied a raise",
  "rejected from an internal transfer",
  "not selected for a high-profile project",
  "given a lower performance rating than expected",
  "told you're not ready for the next level",
  "lost a project to another team",
  "had your proposal turned down",
  "received critical 360 feedback",
  "missed out on a leadership opportunity",
];

for (const scenario of rejectionScenarios) {
  add(
    "career-growth",
    "handling-rejection",
    "response",
    `After being ${scenario}: take 24 hours to process. Then ask for specific, actionable feedback: "What would I need to demonstrate to get a different outcome next time?" ${cap(pick(actions))}.`,
    `Recovering from ${scenario}.`
  );
  add(
    "career-growth",
    "handling-rejection",
    "mindset",
    `Being ${scenario} is a data point, not a verdict. Use it to recalibrate: is the gap in perception, skills, or politics? Each requires a different strategy.`,
    `Reframing ${scenario}.`
  );
}

// -- Knowing when to leave --
const leaveSignals = [
  "your values consistently clash with leadership decisions",
  "you've stopped learning and feel stagnant",
  "promotion criteria keep shifting with no clear path",
  "your manager doesn't invest in your growth",
  "the culture has become toxic or exclusionary",
  "you're consistently doing next-level work without recognition",
  "re-orgs keep resetting your progress",
  "you dread Monday mornings more often than not",
  "your health is suffering due to work stress",
  "the company's direction no longer excites you",
];

for (const signal of leaveSignals) {
  add(
    "career-growth",
    "knowing-when-to-leave",
    "signal",
    `It may be time to explore new opportunities when ${signal}. Before deciding, have one honest conversation with your manager about it. If nothing changes in ${pick(timeframes)}, start your search.`,
    `Evaluating whether to stay or go.`
  );
}

// -- Skill development --
for (const weakness of weaknesses) {
  add(
    "career-growth",
    "skill-development",
    "plan",
    `To improve ${weakness}: (1) find a role model who excels at it, (2) ask them for one concrete tip, (3) practise it ${pick(timeframes)} in a low-stakes setting, (4) ask for feedback, (5) iterate.`,
    `Structured approach to developing ${weakness}.`
  );
  add(
    "career-growth",
    "skill-development",
    "plan",
    `${cap(weakness)} development: dedicate 20 minutes daily to deliberate practice. Track your progress weekly. Share your goal with your manager so they can provide opportunities to practise.`,
    `Daily practice plan for ${weakness}.`
  );
}

// -- Personal branding --
for (const strength of strengths) {
  add(
    "career-growth",
    "personal-branding",
    "strategy",
    `Build your brand around ${strength}: write internal blog posts about it, volunteer to present on the topic, mentor others in this area, and make it the thing people come to you for.`,
    `Establishing expertise in ${strength}.`
  );
}

// -- Salary negotiation --
const negotiationPhrases = [
  "Based on my research and the value I've delivered, I'd like to discuss adjusting my compensation to reflect my contributions.",
  "I've benchmarked my role against market data and I'd like to share what I've found.",
  "I'm excited about my impact here. I'd like to make sure my compensation reflects the level I'm operating at.",
  "Before I accept this offer, I'd like to discuss the compensation package. I have some data to share.",
  "I appreciate the offer. Based on my experience and the scope of this role, I was expecting something closer to [X]. Can we discuss?",
  "I understand budget constraints. Could we explore other forms of compensation — equity, signing bonus, or a review in 6 months?",
  "I want to be transparent: I have another offer at [X]. I'd prefer to stay here, but I want to make sure we're in the right range.",
  "My contributions this year include [X, Y, Z], which delivered [impact]. I believe a compensation adjustment of [X%] reflects this.",
  "I've been performing at the next level for [N] months. Can we align my title and compensation with the work I'm already doing?",
  "Rather than a one-time bonus, I'd prefer a base salary adjustment so my compensation grows with me over time.",
];

for (const phrase of negotiationPhrases) {
  add(
    "career-growth",
    "salary-negotiation",
    "script",
    phrase,
    "Salary and compensation negotiation."
  );
}

// ---------------------------------------------------------------------------
// DB setup and insert
// ---------------------------------------------------------------------------

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const DB_PATH = path.join(dbDir, "sentences.db");

// Remove old DB if exists so we start fresh
if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS sentences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    type TEXT NOT NULL,
    text TEXT NOT NULL,
    context TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_sentences_category ON sentences(category);
  CREATE INDEX IF NOT EXISTS idx_sentences_subcategory ON sentences(subcategory);
  CREATE INDEX IF NOT EXISTS idx_sentences_type ON sentences(type);
`);

const insert = db.prepare(`
  INSERT INTO sentences (category, subcategory, type, text, context)
  VALUES (@category, @subcategory, @type, @text, @context)
`);

const insertMany = db.transaction((rows: SentenceRow[]) => {
  for (const row of rows) insert.run(row);
});

insertMany(sentences);

// Stats
const total = db.prepare("SELECT COUNT(*) as count FROM sentences").get() as {
  count: number;
};
const byCat = db
  .prepare(
    "SELECT category, COUNT(*) as count FROM sentences GROUP BY category ORDER BY category"
  )
  .all() as { category: string; count: number }[];
const bySub = db
  .prepare(
    "SELECT category, subcategory, COUNT(*) as count FROM sentences GROUP BY category, subcategory ORDER BY category, subcategory"
  )
  .all() as { category: string; subcategory: string; count: number }[];

console.log(`\nSeeded ${total.count} sentences into ${DB_PATH}\n`);
console.log("By category:");
for (const row of byCat) {
  console.log(`  ${row.category}: ${row.count}`);
}
console.log("\nBy subcategory:");
for (const row of bySub) {
  console.log(`  ${row.category} / ${row.subcategory}: ${row.count}`);
}

db.close();
