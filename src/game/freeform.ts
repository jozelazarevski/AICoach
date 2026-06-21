import type { Choice, Stage } from "./types";
import type { GameState } from "./engine";

export interface FreeformResult {
  matchedChoice: Choice | null; // null if fell back
  points: number;
  standing: number;
  momentum: number;
  reaction: string;
  principle: string;
  label: string; // "your words, read as: {tag}" or "Off script"
}

const NEUTRAL_REACTION =
  "That did not clearly land as any recognizable play, so it slid past without moving the room.";
const NEUTRAL_PRINCIPLE =
  "Name the move you want to make. A vague line gives the room nothing to react to.";

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function scoreChoice(tokens: string[], rawInput: string, choice: Choice): number {
  const target = new Set<string>();
  for (const kw of choice.keywords ?? []) {
    for (const w of tokenize(kw)) target.add(w);
  }
  for (const w of tokenize(choice.tag)) target.add(w);

  let score = 0;
  const seen = new Set<string>();
  for (const t of tokens) {
    if (target.has(t) && !seen.has(t)) {
      score += 1;
      seen.add(t);
    }
  }

  // Small weight for multi-word phrase hits.
  const lowerInput = rawInput.toLowerCase();
  for (const kw of choice.keywords ?? []) {
    const k = kw.toLowerCase();
    if (k.includes(" ") && lowerInput.includes(k)) {
      score += 0.5;
    }
  }
  return score;
}

const THRESHOLD = 1;

export function resolveFreeform(
  input: string,
  stage: Stage,
  _state: GameState,
  _opts?: { apiEnabled?: boolean }
): FreeformResult {
  const tokens = tokenize(input);

  let best: Choice | null = null;
  let bestScore = 0;
  for (const choice of stage.choices) {
    const s = scoreChoice(tokens, input, choice);
    if (s > bestScore) {
      bestScore = s;
      best = choice;
    }
  }

  if (best && bestScore >= THRESHOLD) {
    return {
      matchedChoice: best,
      points: best.points,
      standing: best.standing,
      momentum: best.momentum,
      reaction: best.reaction,
      principle: best.principle,
      label: `your words, read as: ${best.tag}`,
    };
  }

  if (stage.freeformFallback) {
    const f = stage.freeformFallback;
    return {
      matchedChoice: null,
      points: f.points,
      standing: f.standing,
      momentum: f.momentum,
      reaction: f.reaction,
      principle: f.principle,
      label: "Off script",
    };
  }

  return {
    matchedChoice: null,
    points: 0,
    standing: -2,
    momentum: 0,
    reaction: NEUTRAL_REACTION,
    principle: NEUTRAL_PRINCIPLE,
    label: "Off script",
  };
}
