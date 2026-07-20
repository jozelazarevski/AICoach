import type { Encounter, Stage } from "./types";
import type { GameState, LogEntry } from "./engine";

export interface LlmJudgement {
  points: number;
  standing: number;
  momentum: number;
  reaction: string;
  principle: string;
}

// Remembered for the session so a missing/unconfigured endpoint is only probed once.
let unavailable = false;

export function llmMarkedUnavailable(): boolean {
  return unavailable;
}

function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" ? Math.round(v) : NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function transcript(log: LogEntry[], opponentName: string): string {
  return log
    .filter((e) => e.type === "opponent" || e.type === "player" || e.type === "reaction")
    .slice(-8)
    .map((e) => (e.type === "player" ? `You: ${e.text}` : `${opponentName}: ${e.text}`))
    .join("\n");
}

function buildSystem(encounter: Encounter, stage: Stage, stagePrompt: string): string {
  const refs = stage.choices
    .map(
      (c) =>
        `- "${c.tag}" (points ${c.points}, respect ${c.standing}, progress ${c.momentum}): ${c.line}`
    )
    .join("\n");

  return [
    `You are the scoring engine and the opponent in a conversation practice game.`,
    ``,
    `THE OPPONENT YOU PLAY: ${encounter.opponent.name}, ${encounter.opponent.role}. ${encounter.opponent.blurb}`,
    `THE SCENE: ${encounter.scene}`,
    `THE PLAYER'S OBJECTIVE: ${encounter.objective}`,
    `THE OPPONENT JUST SAID: "${stagePrompt}"`,
    ``,
    `The player typed their own reply. Judge it against these reference moves for this beat:`,
    refs,
    ``,
    `Score the player's actual words on the same scale: points -3 to 6, respect delta -14 to 12, progress delta -6 to 14. A reply as strong as the best reference earns similar numbers; a reply that walks into the trap earns similar penalties. Vague or evasive replies land near zero with a small respect penalty. Judge what they actually said, not what they meant.`,
    ``,
    `Then reply IN CHARACTER as ${encounter.opponent.name}, responding directly to the player's actual words, one to three sentences, matching the opponent's temperament.`,
    ``,
    `Finally write one or two sentences of coaching: the principle behind why the player's line worked or failed, in plain language, second person.`,
    ``,
    `Respond with ONLY this JSON, no markdown fences:`,
    `{"points": <int>, "respect": <int>, "progress": <int>, "reaction": "<in-character reply>", "principle": "<coaching>"}`,
  ].join("\n");
}

export async function llmJudgeLine(
  encounter: Encounter,
  stage: Stage,
  stagePrompt: string,
  state: GameState,
  playerText: string
): Promise<LlmJudgement> {
  if (unavailable) throw new Error("llm unavailable");

  const system = buildSystem(encounter, stage, stagePrompt);
  const convo = transcript(state.log, encounter.opponent.name);
  const user = [
    convo ? `Conversation so far:\n${convo}\n` : "",
    `The player says: "${playerText}"`,
  ].join("\n");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  let resp: Response;
  try {
    resp = await fetch("/api/llm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ system, messages: [{ role: "user", content: user }] }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }

  if (resp.status === 503 || resp.status === 404 || resp.status === 405) {
    unavailable = true;
    throw new Error("llm not configured");
  }
  if (!resp.ok) throw new Error(`llm error ${resp.status}`);

  const { text } = (await resp.json()) as { text: string };
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd <= jsonStart) throw new Error("llm bad output");
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));

  const reaction = typeof parsed.reaction === "string" ? parsed.reaction.trim() : "";
  const principle = typeof parsed.principle === "string" ? parsed.principle.trim() : "";
  if (!reaction || !principle) throw new Error("llm incomplete output");

  return {
    points: clampInt(parsed.points, -3, 6, 0),
    standing: clampInt(parsed.respect, -14, 12, -2),
    momentum: clampInt(parsed.progress, -6, 14, 0),
    reaction,
    principle,
  };
}
