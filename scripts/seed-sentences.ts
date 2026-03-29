import Anthropic from "@anthropic-ai/sdk";
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
  console.error("Run: export ANTHROPIC_API_KEY=sk-ant-...");
  process.exit(1);
}

const MODEL = "claude-sonnet-4-20250514";
const SENTENCES_PER_BATCH = 40;
const CONCURRENT_REQUESTS = 3; // parallel batches to avoid rate limits
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;

const client = new Anthropic({ apiKey: API_KEY });

// ---------------------------------------------------------------------------
// Subcategory definitions — what to generate
// ---------------------------------------------------------------------------

interface SubcategorySpec {
  category: string;
  subcategory: string;
  count: number; // how many sentences to generate
  prompt: string; // detailed instructions for Claude
}

const specs: SubcategorySpec[] = [
  // ===== MANAGING UP =====
  {
    category: "managing-up",
    subcategory: "conversation-starters",
    count: 50,
    prompt: `Generate professional conversation-starter sentences for employees approaching their manager, director, VP, CTO, or other senior leader. Each sentence should open a discussion about a workplace topic (strategy, timelines, resources, priorities, feedback, career, team issues, etc.). Vary the tone from formal to friendly-but-professional. Include the specific role being addressed when natural.

For each sentence, provide:
- type: "opener"
- text: the conversation-starter sentence
- context: a brief note on when/why to use this opener`,
  },
  {
    category: "managing-up",
    subcategory: "bluf-communication",
    count: 50,
    prompt: `Generate Bottom Line Up Front (BLUF) communication examples — messages where the key point/ask comes first, followed by supporting details. Cover scenarios like: requesting budget, proposing changes, reporting results, flagging risks, recommending tools, sharing metrics, proposing hires, etc.

For each sentence, provide:
- type: "example"
- text: a complete BLUF-formatted message (2-4 sentences: lead with the ask/conclusion, then supporting points)
- context: what business situation this BLUF message addresses`,
  },
  {
    category: "managing-up",
    subcategory: "influence-phrases",
    count: 50,
    prompt: `Generate persuasive phrases and sentences for influencing senior stakeholders without formal authority. Include data-driven pitches, reframing techniques, coalition-building language, and ways to align proposals with executive priorities (revenue, risk, customer impact, speed, competitive advantage).

For each sentence, provide:
- type: one of "pitch", "reframe", "alignment"
- text: the influence phrase or sentence (ready to use in conversation)
- context: the situation where this phrase is most effective`,
  },
  {
    category: "managing-up",
    subcategory: "managing-expectations",
    count: 40,
    prompt: `Generate proactive communication templates for managing expectations upward — flagging delays, changing scope, reporting problems early, setting realistic timelines, and delivering bad news constructively. Follow the pattern: what happened, what we're doing, what we need from you.

For each sentence, provide:
- type: "template"
- text: the expectation-management message (2-4 sentences)
- context: the specific scenario (missed deadline, scope creep, resource gap, etc.)`,
  },
  {
    category: "managing-up",
    subcategory: "asking-for-feedback",
    count: 30,
    prompt: `Generate specific, thoughtful questions for asking your manager or senior leader for feedback on your performance, skills, and growth areas. Go beyond generic "how am I doing?" — target specific skills like communication, strategic thinking, execution, stakeholder management, presentations, writing, etc.

For each sentence, provide:
- type: "question"
- text: the feedback question
- context: what skill or area this question targets`,
  },
  {
    category: "managing-up",
    subcategory: "saying-no",
    count: 30,
    prompt: `Generate professional ways to push back, say no, or redirect requests from senior leaders when you're overloaded, the request conflicts with priorities, or the approach is wrong. Be respectful but firm — offer alternatives, ask for prioritisation help, or propose trade-offs.

For each sentence, provide:
- type: "response"
- text: the pushback sentence or short script (1-3 sentences)
- context: the scenario (overloaded, conflicting priorities, unrealistic deadline, etc.)`,
  },
  {
    category: "managing-up",
    subcategory: "status-updates",
    count: 40,
    prompt: `Generate concise, well-structured status update templates for reporting to leadership. Cover various formats: weekly updates, project milestones, risk flags, decision requests, win announcements. Use clear structure: what's done, what's next, what's blocked, what's needed.

For each sentence, provide:
- type: "template"
- text: the status update (2-4 sentences, structured)
- context: the type of update and audience`,
  },
  {
    category: "managing-up",
    subcategory: "meeting-prep",
    count: 20,
    prompt: `Generate practical preparation checklists and tips for high-stakes meetings with leadership — one-on-ones, skip-levels, board presentations, strategy reviews, budget discussions, performance reviews. Include what to prepare, what to anticipate, and how to follow up.

For each sentence, provide:
- type: "checklist"
- text: the preparation advice (2-4 specific action items)
- context: the type of meeting this prepares you for`,
  },
  {
    category: "managing-up",
    subcategory: "building-credibility",
    count: 30,
    prompt: `Generate actionable strategies for building credibility and trust with senior leadership — through delivery, communication, visibility, reliability, and strategic contribution. Include specific behaviours and habits, not abstract advice.

For each sentence, provide:
- type: "tip"
- text: the credibility-building strategy (1-3 sentences, specific and actionable)
- context: what aspect of credibility this builds (reliability, expertise, judgement, etc.)`,
  },

  // ===== MANAGING DOWN =====
  {
    category: "managing-down",
    subcategory: "delegation",
    count: 50,
    prompt: `Generate delegation scripts — what a manager actually says when assigning work to a team member. Cover the full spectrum: defining the outcome, explaining the why, setting boundaries, agreeing on check-ins, clarifying success criteria. Vary by seniority of the delegate (junior, mid, senior) and task complexity.

For each sentence, provide:
- type: "script"
- text: what the manager says when delegating (2-4 sentences)
- context: who they're delegating to and what kind of task`,
  },
  {
    category: "managing-down",
    subcategory: "sbi-feedback",
    count: 50,
    prompt: `Generate Situation-Behaviour-Impact (SBI) feedback examples — both positive/reinforcing AND constructive/redirective. Cover real workplace behaviours: meeting contributions, code quality, client interactions, collaboration, communication, initiative, deadlines, presentations, documentation, etc. Make them specific and realistic.

For each sentence, provide:
- type: one of "positive", "constructive"
- text: the full SBI feedback (clearly labelled [Situation] [Behaviour] [Impact])
- context: what behaviour pattern this addresses`,
  },
  {
    category: "managing-down",
    subcategory: "one-on-one-questions",
    count: 40,
    prompt: `Generate thoughtful one-on-one meeting questions a manager can ask their direct reports. Cover: career development, blockers, team dynamics, workload, feedback, motivation, well-being, skill growth, project concerns, and relationship building. Make them open-ended and specific, not generic.

For each sentence, provide:
- type: "question"
- text: the one-on-one question
- context: what topic area this question explores`,
  },
  {
    category: "managing-down",
    subcategory: "motivation",
    count: 40,
    prompt: `Generate approaches for motivating different types of team members based on what they value (autonomy, recognition, impact, mastery, stability, growth, collaboration, innovation, mentorship, work-life balance). Include what to say and what to do — connect tasks to their intrinsic motivators.

For each sentence, provide:
- type: "approach"
- text: the motivational approach (2-3 sentences: what the person values and how to tap into it)
- context: the type of team member and their primary motivator`,
  },
  {
    category: "managing-down",
    subcategory: "underperformance",
    count: 40,
    prompt: `Generate scripts for addressing underperformance — first conversations, follow-ups, escalations, and PIP discussions. Be direct but empathetic. Cover: missed deadlines, quality issues, attitude problems, skill gaps, disengagement, absenteeism, interpersonal conflicts.

For each sentence, provide:
- type: one of "first-conversation", "follow-up", "escalation"
- text: what the manager says (2-4 sentences)
- context: the specific performance issue being addressed`,
  },
  {
    category: "managing-down",
    subcategory: "recognition",
    count: 30,
    prompt: `Generate specific, meaningful recognition statements that go beyond "good job." Reference the exact behaviour, its impact, and why it matters. Cover: technical excellence, teamwork, leadership moments, client work, mentoring, initiative, resilience, creativity, thoroughness.

For each sentence, provide:
- type: "example"
- text: the recognition statement (2-3 sentences, specific)
- context: what behaviour or achievement is being recognised`,
  },
  {
    category: "managing-down",
    subcategory: "conflict-resolution",
    count: 30,
    prompt: `Generate manager responses for mediating team conflicts — between two reports, between a report and a stakeholder, or addressing a report who's frustrated/angry/defensive. Include de-escalation language, empathy statements, and structured resolution approaches.

For each sentence, provide:
- type: "response"
- text: what the manager says to de-escalate or resolve (2-3 sentences)
- context: the conflict scenario and emotional state`,
  },
  {
    category: "managing-down",
    subcategory: "setting-expectations",
    count: 30,
    prompt: `Generate clear expectation-setting statements a manager uses when starting a project, onboarding someone, or clarifying roles. Cover: success criteria, decision authority, communication cadence, quality standards, escalation triggers, and timeline milestones.

For each sentence, provide:
- type: "template"
- text: the expectation-setting statement (2-4 sentences)
- context: when this is used (project kickoff, onboarding, role clarification, etc.)`,
  },
  {
    category: "managing-down",
    subcategory: "team-culture",
    count: 20,
    prompt: `Generate team norms and culture statements that a manager can establish and reinforce — covering psychological safety, feedback culture, decision-making, remote work, documentation, accountability, learning from failure, celebrating wins, work-life boundaries, and inclusive practices.

For each sentence, provide:
- type: "norm"
- text: the team norm statement (1-2 sentences, declarative)
- context: what aspect of team culture this establishes`,
  },

  // ===== CAREER GROWTH =====
  {
    category: "career-growth",
    subcategory: "self-assessment",
    count: 50,
    prompt: `Generate self-assessment prompts and example self-assessment statements for career development. Cover: strengths/weaknesses inventory, career values clarification, skill gap analysis, role satisfaction evaluation, and development goal setting. Mix prompts (questions to reflect on) and example statements (how someone might write about their own growth).

For each sentence, provide:
- type: one of "prompt", "example"
- text: the self-assessment question or statement
- context: what dimension of self-assessment this covers`,
  },
  {
    category: "career-growth",
    subcategory: "brag-document",
    count: 30,
    prompt: `Generate realistic brag document entries — the kind of accomplishment log entries a professional would keep for promotion discussions. Include: date references, specific accomplishments, quantified impact (percentages, dollar amounts, time saved, people impacted), and stakeholders involved. Cover technical work, leadership, cross-functional collaboration, process improvements, mentoring, etc.

For each sentence, provide:
- type: "entry"
- text: a complete brag document entry (2-3 sentences with specific metrics)
- context: the type of accomplishment and how it maps to career progression`,
  },
  {
    category: "career-growth",
    subcategory: "promotion-conversation",
    count: 30,
    prompt: `Generate scripts for promotion conversations — opening the discussion, presenting your case, handling pushback, negotiating timeline, and following up. Cover different career stages: IC to senior IC, IC to manager, manager to director, etc.

For each sentence, provide:
- type: one of "opener", "case", "pushback-response", "follow-up"
- text: what to say (2-3 sentences)
- context: the career transition and conversation stage`,
  },
  {
    category: "career-growth",
    subcategory: "networking",
    count: 25,
    prompt: `Generate professional networking messages and conversation starters for building relationships inside and outside your organisation. Cover: cold outreach, warm introductions, following up after meetings, reconnecting with old contacts, asking for introductions, and building cross-functional relationships.

For each sentence, provide:
- type: one of "outreach", "follow-up", "introduction"
- text: the networking message (2-3 sentences, natural and not salesy)
- context: the relationship stage and channel (email, Slack, LinkedIn, in-person)`,
  },
  {
    category: "career-growth",
    subcategory: "navigating-politics",
    count: 25,
    prompt: `Generate strategies for navigating organisational politics ethically — stakeholder mapping, building coalitions, handling blockers, managing competing interests, reading power dynamics, and positioning yourself strategically. Be practical and specific, not cynical.

For each sentence, provide:
- type: "strategy"
- text: the political navigation advice (2-3 sentences, actionable)
- context: the political dynamic being addressed`,
  },
  {
    category: "career-growth",
    subcategory: "salary-negotiation",
    count: 25,
    prompt: `Generate salary and compensation negotiation scripts — for initial offers, annual reviews, promotion bumps, and counter-offers. Include data-driven arguments, alternatives to base salary (equity, bonus, title, flexibility), and ways to handle "we can't do that" responses.

For each sentence, provide:
- type: "script"
- text: what to say in the negotiation (2-3 sentences)
- context: the negotiation scenario (new offer, annual review, counter-offer, etc.)`,
  },
  {
    category: "career-growth",
    subcategory: "handling-rejection",
    count: 25,
    prompt: `Generate responses and mindset reframes for career setbacks — being passed over for promotion, denied a raise, rejected from a role, receiving harsh feedback, losing a project, being laid off. Include both what to say in the moment and how to think about it strategically.

For each sentence, provide:
- type: one of "response", "mindset"
- text: the response or reframe (1-3 sentences)
- context: the specific setback scenario`,
  },
  {
    category: "career-growth",
    subcategory: "skill-development",
    count: 30,
    prompt: `Generate structured skill development plans for common career skills: public speaking, delegation, strategic thinking, writing, negotiation, conflict resolution, time management, networking, giving feedback, data analysis, executive presence, technical leadership, etc.

For each sentence, provide:
- type: "plan"
- text: a specific development plan for one skill (2-4 sentences with concrete steps)
- context: the skill being developed and the career level it targets`,
  },
  {
    category: "career-growth",
    subcategory: "personal-branding",
    count: 20,
    prompt: `Generate actionable personal branding strategies for professionals — how to become known for a specific expertise, build visibility inside your company, establish thought leadership, and differentiate yourself. Include internal strategies (presentations, mentoring, project selection) and external ones (writing, speaking, community).

For each sentence, provide:
- type: "strategy"
- text: the personal branding strategy (2-3 sentences, specific)
- context: what aspect of personal brand this builds`,
  },
  {
    category: "career-growth",
    subcategory: "knowing-when-to-leave",
    count: 20,
    prompt: `Generate signals, decision frameworks, and advice for knowing when it's time to leave a job — covering stagnation, values misalignment, toxic culture, career ceiling, burnout, better opportunities, manager issues, and re-org fatigue. Include both "red flag" signals and the conversation to have before deciding.

For each sentence, provide:
- type: one of "signal", "framework", "advice"
- text: the guidance (2-3 sentences)
- context: the scenario or decision factor being evaluated`,
  },
  {
    category: "career-growth",
    subcategory: "frameworks",
    count: 20,
    prompt: `Generate practical applications of well-known career and management frameworks: BLUF, SBI, STAR, RACI, Eisenhower Matrix, OKRs, 5 Whys, GROW model, Johari Window, Situational Leadership, etc. Show how to apply each framework to a real career scenario — not just define it.

For each sentence, provide:
- type: "application"
- text: how to apply the framework to a specific career situation (2-4 sentences)
- context: which framework and what scenario`,
  },
];

// ---------------------------------------------------------------------------
// LLM generation
// ---------------------------------------------------------------------------

interface GeneratedSentence {
  type: string;
  text: string;
  context: string;
}

async function generateBatch(
  spec: SubcategorySpec,
  batchNum: number,
  batchSize: number
): Promise<GeneratedSentence[]> {
  const systemPrompt = `You are an expert career coach and leadership trainer. You generate realistic, practical example sentences and scripts that professionals can use in real workplace situations.

IMPORTANT: Return ONLY a valid JSON array. No markdown, no code fences, no explanation. Just the raw JSON array.`;

  const userPrompt = `Generate exactly ${batchSize} unique example sentences for the category "${spec.category}", subcategory "${spec.subcategory}".

${spec.prompt}

Return a JSON array of objects, each with these exact keys:
- "type": string (as specified above)
- "text": string (the actual sentence or script)
- "context": string (when/why to use it)

Requirements:
- Every sentence must be unique — no duplicates or near-duplicates
- Be specific and realistic, not generic or platitudinous
- Vary the scenarios, roles, industries, and contexts
- Use natural professional language, not academic or robotic
- Batch ${batchNum}: ensure variety from earlier batches by covering different scenarios

Return ONLY the JSON array, nothing else.`;

  for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 4096,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      });

      const text = response.content
        .filter(
          (block): block is Anthropic.TextBlock => block.type === "text"
        )
        .map((block) => block.text)
        .join("");

      // Strip markdown code fences if present
      const cleaned = text
        .replace(/^```(?:json)?\s*\n?/m, "")
        .replace(/\n?```\s*$/m, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      if (!Array.isArray(parsed)) {
        throw new Error("Response is not an array");
      }

      // Validate and clean each sentence
      const valid: GeneratedSentence[] = [];
      for (const item of parsed) {
        if (
          typeof item.type === "string" &&
          typeof item.text === "string" &&
          typeof item.context === "string" &&
          item.text.length > 10
        ) {
          valid.push({
            type: item.type.trim(),
            text: item.text.trim(),
            context: item.context.trim(),
          });
        }
      }

      if (valid.length === 0) {
        throw new Error("No valid sentences in response");
      }

      return valid;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(
        `  [Attempt ${attempt}/${RETRY_ATTEMPTS}] Error for ${spec.subcategory} batch ${batchNum}: ${msg}`
      );
      if (attempt < RETRY_ATTEMPTS) {
        await sleep(RETRY_DELAY_MS * attempt);
      }
    }
  }

  console.error(
    `  FAILED: ${spec.category}/${spec.subcategory} batch ${batchNum} after ${RETRY_ATTEMPTS} attempts`
  );
  return [];
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Run promises with limited concurrency */
async function pool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const i = index++;
      results[i] = await tasks[i]();
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () =>
    worker()
  );
  await Promise.all(workers);
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const totalSentences = specs.reduce((sum, s) => sum + s.count, 0);
  console.log(
    `\nGenerating ~${totalSentences} sentences across ${specs.length} subcategories using ${MODEL}...\n`
  );

  // Build list of all batch tasks
  const tasks: {
    spec: SubcategorySpec;
    batchNum: number;
    batchSize: number;
  }[] = [];

  for (const spec of specs) {
    const numBatches = Math.ceil(spec.count / SENTENCES_PER_BATCH);
    for (let b = 0; b < numBatches; b++) {
      const remaining = spec.count - b * SENTENCES_PER_BATCH;
      const batchSize = Math.min(SENTENCES_PER_BATCH, remaining);
      tasks.push({ spec, batchNum: b + 1, batchSize });
    }
  }

  console.log(`Total API calls needed: ${tasks.length}\n`);

  // Run with concurrency control
  let completed = 0;
  const allSentences: {
    category: string;
    subcategory: string;
    type: string;
    text: string;
    context: string;
  }[] = [];

  const taskFns = tasks.map((task) => async () => {
    console.log(
      `[${completed + 1}/${tasks.length}] ${task.spec.category}/${task.spec.subcategory} (batch ${task.batchNum}, ${task.batchSize} sentences)...`
    );

    const results = await generateBatch(
      task.spec,
      task.batchNum,
      task.batchSize
    );

    for (const r of results) {
      allSentences.push({
        category: task.spec.category,
        subcategory: task.spec.subcategory,
        type: r.type,
        text: r.text,
        context: r.context,
      });
    }

    completed++;
    console.log(
      `  -> Got ${results.length} sentences (total so far: ${allSentences.length})`
    );

    return results;
  });

  await pool(taskFns, CONCURRENT_REQUESTS);

  // ---------------------------------------------------------------------------
  // Deduplicate — remove near-identical sentences
  // ---------------------------------------------------------------------------
  const seen = new Set<string>();
  const deduped = allSentences.filter((s) => {
    // Normalise for dedup: lowercase, strip punctuation, collapse whitespace
    const key = s.text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  console.log(
    `\nDeduplication: ${allSentences.length} -> ${deduped.length} unique sentences`
  );

  // ---------------------------------------------------------------------------
  // Write to SQLite
  // ---------------------------------------------------------------------------
  const dbDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

  const DB_PATH = path.join(dbDir, "sentences.db");
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

  const insertMany = db.transaction(
    (
      rows: {
        category: string;
        subcategory: string;
        type: string;
        text: string;
        context: string;
      }[]
    ) => {
      for (const row of rows) insert.run(row);
    }
  );

  insertMany(deduped);

  // Stats
  const total = db
    .prepare("SELECT COUNT(*) as count FROM sentences")
    .get() as { count: number };
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

  console.log(`\n✓ Seeded ${total.count} sentences into ${DB_PATH}\n`);
  console.log("By category:");
  for (const row of byCat) {
    console.log(`  ${row.category}: ${row.count}`);
  }
  console.log("\nBy subcategory:");
  for (const row of bySub) {
    console.log(`  ${row.category} / ${row.subcategory}: ${row.count}`);
  }

  db.close();
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
