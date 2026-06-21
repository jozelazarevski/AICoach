import type { Choice, Ending, Encounter, Stage } from "./types";
import { verdictFor } from "./verdicts";
import { rankFor, nextRank } from "./ranks";

export interface LogEntry {
  type:
    | "opponent"
    | "player"
    | "verdict"
    | "reaction"
    | "resolution"
    | "principle";
  text: string;
  points?: number;
  label?: string;
  color?: string;
}

export interface GameState {
  encounterId: string;
  stageIndex: number;
  standing: number;
  momentum: number;
  sceneScore: number;
  lifetimeXp: number;
  flags: Record<string, boolean>;
  log: LogEntry[];
  status: "playing" | "won" | "partial" | "lost";
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function resolvePrompt(stage: Stage, state: GameState): string {
  const prompt = stage.prompt;
  if (typeof prompt === "string") return prompt;
  if (prompt.ifFlag) {
    const [flag, text] = prompt.ifFlag;
    if (state.flags[flag]) return text;
  }
  if (prompt.ifStandingBelow) {
    const [threshold, text] = prompt.ifStandingBelow;
    if (state.standing < threshold) return text;
  }
  return prompt.default;
}

export function startEncounter(
  encounter: Encounter,
  lifetimeXp: number
): GameState {
  const state: GameState = {
    encounterId: encounter.id,
    stageIndex: 0,
    standing: encounter.startStanding,
    momentum: encounter.startMomentum,
    sceneScore: 0,
    lifetimeXp,
    flags: {},
    log: [],
    status: "playing",
  };
  const firstStage = encounter.stages[0];
  if (firstStage) {
    state.log.push({ type: "opponent", text: resolvePrompt(firstStage, state) });
  }
  return state;
}

function stageIndexForGoto(encounter: Encounter, goto: string): number {
  const idx = encounter.stages.findIndex((s) => s.id === goto);
  return idx >= 0 ? idx : encounter.stages.length;
}

export function applyChoice(
  encounter: Encounter,
  state: GameState,
  choice: Choice
): GameState {
  const next: GameState = {
    ...state,
    flags: { ...state.flags },
    log: [...state.log],
  };

  next.standing = clamp(next.standing + choice.standing, 0, 100);
  next.momentum = clamp(next.momentum + choice.momentum, 0, 100);
  next.sceneScore += choice.points;
  next.lifetimeXp += Math.max(0, choice.points);
  if (choice.setFlag) next.flags[choice.setFlag] = true;

  const verdict = verdictFor(choice.points);
  next.log.push({ type: "player", text: choice.line });
  next.log.push({
    type: "verdict",
    text: verdict.label,
    label: verdict.label,
    points: choice.points,
    color: verdict.color,
  });
  next.log.push({ type: "reaction", text: choice.reaction });
  next.log.push({ type: "principle", text: choice.principle });

  if (choice.goto) {
    next.stageIndex = stageIndexForGoto(encounter, choice.goto);
  } else {
    next.stageIndex = state.stageIndex + 1;
  }

  const advanced = checkEnding(encounter, next);
  if (advanced.status === "playing") {
    const upcoming = encounter.stages[advanced.stageIndex];
    if (upcoming) {
      advanced.log.push({
        type: "opponent",
        text: resolvePrompt(upcoming, advanced),
      });
    }
  }
  return advanced;
}

function endingMatches(ending: Ending, state: GameState): boolean {
  const w = ending.when;
  if (w.momentumAtLeast !== undefined && state.momentum < w.momentumAtLeast)
    return false;
  if (w.standingAtLeast !== undefined && state.standing < w.standingAtLeast)
    return false;
  if (w.momentumBelow !== undefined && state.momentum >= w.momentumBelow)
    return false;
  if (w.standingBelow !== undefined && state.standing >= w.standingBelow)
    return false;
  if (w.flag !== undefined && !state.flags[w.flag]) return false;
  return true;
}

function selectEnding(ending: Ending, state: GameState) {
  state.status = ending.result;
  state.log.push({ type: "resolution", text: ending.resolution });
  state.lifetimeXp += xpForOutcome(ending.result, state.sceneScore);
}

export function checkEnding(
  encounter: Encounter,
  state: GameState
): GameState {
  // Early endings.
  if (state.momentum >= 100) {
    const wins = encounter.endings.filter((e) => e.result === "won");
    const best =
      wins.sort(
        (a, b) =>
          (b.when.momentumAtLeast ?? 0) - (a.when.momentumAtLeast ?? 0)
      )[0] ?? encounter.endings[encounter.endings.length - 1];
    if (best) selectEnding(best, state);
    return state;
  }
  if (state.standing <= 0) {
    const lost = encounter.endings.find((e) => e.result === "lost");
    const ending = lost ?? encounter.endings[encounter.endings.length - 1];
    if (ending) selectEnding(ending, state);
    return state;
  }

  if (state.stageIndex >= encounter.stages.length) {
    for (const ending of encounter.endings) {
      if (endingMatches(ending, state)) {
        selectEnding(ending, state);
        return state;
      }
    }
    // Fallback to last ending if nothing matched.
    const last = encounter.endings[encounter.endings.length - 1];
    if (last) selectEnding(last, state);
  }
  return state;
}

const GRADE_LADDER = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];

export function gradeFor(baseGrade: string, sceneScore: number): string {
  let idx = GRADE_LADDER.indexOf(baseGrade);
  if (idx === -1) idx = GRADE_LADDER.indexOf("C");
  let shift = 0;
  if (sceneScore >= 18) shift = -2;
  else if (sceneScore >= 10) shift = -1;
  else if (sceneScore <= -6) shift = 2;
  else if (sceneScore < 0) shift = 1;
  const target = clamp(idx + shift, 0, GRADE_LADDER.length - 1);
  return GRADE_LADDER[target];
}

export function xpForOutcome(
  result: "won" | "partial" | "lost",
  sceneScore: number
): number {
  if (result === "won") return 20;
  if (result === "partial") return 8;
  return Math.max(0, Math.floor(sceneScore / 5));
}

export { verdictFor, rankFor, nextRank };
