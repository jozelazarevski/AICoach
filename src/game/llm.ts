import type { Choice, Encounter, Stage } from "./types";
import type { GameState, LogEntry } from "./engine";

export interface LlmJudgement {
  points: number;
  standing: number;
  momentum: number;
  reaction: string;
  principle: string;
  nextPrompt?: string;
}

export interface LlmTurn {
  reaction: string;
  nextPrompt?: string;
}

// Remembered for the session so a missing/unconfigured endpoint is only probed once.
let unavailable = false;

export function llmMarkedUnavailable(): boolean {
  return unavailable;
}

const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 500;

// Optional bring-your-own-key: when set, the browser talks to the Anthropic
// API directly and the server proxy is not needed. The key lives only in the
// player's localStorage.
let clientKey = "";

export function setClientApiKey(key: string) {
  clientKey = key.trim();
  if (clientKey) unavailable = false;
}

function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === "number" ? Math.round(v) : NaN;
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function transcript(log: LogEntry[], opponentName: string): string {
  return log
    .filter((e) => e.type === "opponent" || e.type === "player" || e.type === "reaction")
    .slice(-10)
    .map((e) => (e.type === "player" ? `You: ${e.text}` : `${opponentName}: ${e.text}`))
    .join("\n");
}

function persona(encounter: Encounter): string {
  return [
    `THE OPPONENT YOU PLAY: ${encounter.opponent.name}, ${encounter.opponent.role}. ${encounter.opponent.blurb}`,
    `THE SCENE: ${encounter.scene}`,
    `THE PLAYER'S OBJECTIVE: ${encounter.objective}`,
  ].join("\n");
}

async function callLlm(system: string, user: string): Promise<string> {
  if (!clientKey && unavailable) throw new Error("llm unavailable");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);

  let resp: Response;
  try {
    if (clientKey) {
      // Direct browser call with the player's own key.
      resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": clientKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages: [{ role: "user", content: user }],
        }),
        signal: controller.signal,
      });
    } else {
      resp = await fetch("/api/llm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ system, messages: [{ role: "user", content: user }] }),
        signal: controller.signal,
      });
    }
  } finally {
    clearTimeout(timer);
  }

  if (!clientKey && (resp.status === 503 || resp.status === 404 || resp.status === 405)) {
    unavailable = true;
    throw new Error("llm not configured");
  }
  if (!resp.ok) throw new Error(`llm error ${resp.status}`);

  if (clientKey) {
    const data = (await resp.json()) as { content?: { type: string; text?: string }[] };
    return (data.content ?? [])
      .filter((b) => b.type === "text")
      .map((b) => b.text ?? "")
      .join("");
  }
  const { text } = (await resp.json()) as { text: string };
  return text;
}

function extractJson(text: string): any {
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd <= jsonStart) throw new Error("llm bad output");
  return JSON.parse(text.slice(jsonStart, jsonEnd + 1));
}

const VOICE_RULES = [
  `Voice rules: respond specifically to what the player actually said, not generically. Stay consistent with the conversation so far. Keep the opponent's temperament, knowledge, and stakes exactly as described. Do not invent new facts that change the situation. Do not resolve or end the conversation on your own. Vary sentence rhythm; people interrupt themselves, trail off, get specific. One to three sentences per line.`,
].join("\n");

// Rewrites the scripted beat as living dialogue after the player picks a choice.
// The scripted reaction and next prompt define the substance; the model makes
// them respond naturally to the actual flow of the conversation.
export async function llmDynamicTurn(
  encounter: Encounter,
  state: GameState,
  choice: Choice,
  nextBeat: string | null
): Promise<LlmTurn> {
  const system = [
    `You write the opponent's dialogue in a conversation practice game.`,
    ``,
    persona(encounter),
    ``,
    `The scripted version of the opponent's response carries the required meaning and stance. Your job is to deliver the same substance as natural, specific dialogue that flows from this exact conversation. The player must face the same pressure the script intends; only the wording and texture change.`,
    ``,
    VOICE_RULES,
    ``,
    nextBeat
      ? `Respond with ONLY this JSON, no markdown fences:\n{"reaction": "<the opponent's immediate response to the player's line>", "next": "<the opponent's follow-up that moves the conversation to the next pressure point>"}`
      : `Respond with ONLY this JSON, no markdown fences:\n{"reaction": "<the opponent's immediate response to the player's line>"}`,
  ].join("\n");

  const convo = transcript(state.log, encounter.opponent.name);
  const user = [
    convo ? `Conversation so far:\n${convo}\n` : "",
    `The player says: "${choice.line}"`,
    ``,
    `Scripted reaction (keep this meaning and stance): "${choice.reaction}"`,
    nextBeat
      ? `\nScripted next pressure point (your "next" line must land here): "${nextBeat}"`
      : "",
  ].join("\n");

  const parsed = extractJson(await callLlm(system, user));
  const reaction = typeof parsed.reaction === "string" ? parsed.reaction.trim() : "";
  if (!reaction) throw new Error("llm incomplete output");
  const next = typeof parsed.next === "string" ? parsed.next.trim() : "";

  return {
    reaction,
    nextPrompt: nextBeat && next ? next : undefined,
  };
}

// Judges a freeform line the player typed: scores it against the stage's
// reference moves, answers in character, coaches, and writes the next beat.
export async function llmJudgeLine(
  encounter: Encounter,
  stage: Stage,
  stagePrompt: string,
  state: GameState,
  playerText: string,
  nextBeat: string | null
): Promise<LlmJudgement> {
  const refs = stage.choices
    .map(
      (c) =>
        `- "${c.tag}" (points ${c.points}, respect ${c.standing}, progress ${c.momentum}): ${c.line}`
    )
    .join("\n");

  const system = [
    `You are the scoring engine and the opponent in a conversation practice game.`,
    ``,
    persona(encounter),
    `THE OPPONENT JUST SAID: "${stagePrompt}"`,
    ``,
    `The player typed their own reply. Judge it against these reference moves for this beat:`,
    refs,
    ``,
    `Score the player's actual words on the same scale: points -3 to 6, respect delta -14 to 12, progress delta -6 to 14. A reply as strong as the best reference earns similar numbers; a reply that walks into the trap earns similar penalties. Vague or evasive replies land near zero with a small respect penalty. Judge what they actually said, not what they meant.`,
    ``,
    `Then reply IN CHARACTER as ${encounter.opponent.name}, responding directly to the player's actual words.`,
    nextBeat
      ? `Then write the opponent's follow-up line that moves the conversation to this scripted next pressure point: "${nextBeat}". Same substance, natural delivery, flowing from what was just said.`
      : "",
    ``,
    VOICE_RULES,
    ``,
    `Finally write one or two sentences of coaching: the principle behind why the player's line worked or failed, in plain language, second person.`,
    ``,
    `Respond with ONLY this JSON, no markdown fences:`,
    nextBeat
      ? `{"points": <int>, "respect": <int>, "progress": <int>, "reaction": "<in-character reply>", "next": "<in-character follow-up landing on the next pressure point>", "principle": "<coaching>"}`
      : `{"points": <int>, "respect": <int>, "progress": <int>, "reaction": "<in-character reply>", "principle": "<coaching>"}`,
  ].join("\n");

  const convo = transcript(state.log, encounter.opponent.name);
  const user = [
    convo ? `Conversation so far:\n${convo}\n` : "",
    `The player says: "${playerText}"`,
  ].join("\n");

  const parsed = extractJson(await callLlm(system, user));

  const reaction = typeof parsed.reaction === "string" ? parsed.reaction.trim() : "";
  const principle = typeof parsed.principle === "string" ? parsed.principle.trim() : "";
  if (!reaction || !principle) throw new Error("llm incomplete output");
  const next = typeof parsed.next === "string" ? parsed.next.trim() : "";

  return {
    points: clampInt(parsed.points, -3, 6, 0),
    standing: clampInt(parsed.respect, -14, 12, -2),
    momentum: clampInt(parsed.progress, -6, 14, 0),
    reaction,
    principle,
    nextPrompt: nextBeat && next ? next : undefined,
  };
}
