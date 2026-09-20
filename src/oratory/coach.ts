import { callLlm, extractJson } from "../game/llm";
import type { Analysis } from "./types";
import type { Drill, Lesson } from "./types";
import type { DeliveryMetrics } from "./delivery";

// The optional second opinion. The analyzer measures; the coach reads. They are
// deliberately kept apart: only one of them produces the score, so the student
// never gets two numbers that disagree.

export interface Coaching {
  /** How the passage lands on a listener. */
  read: string;
  /** The strongest line, quoted back. */
  strongest: string;
  /** The line that costs the passage the most. */
  weakest: string;
  /** The weak part, rewritten. */
  rewrite: string;
  /** The single change to make in the next draft. */
  next: string;
}

const COACH_TOKENS = 1100;

const CRAFT_RULES = [
  `You teach oratory the way a good director gives notes: specific, unsentimental, and always about the next draft.`,
  `What you believe about emotional speech: feeling comes from concrete detail, not from words that name feelings. Rhythm carries emotion — long sentences build, short ones land. Repetition, three-part lists, and matched contrasts are the structures that make a true thing hit. Admitted cost is what makes emotion read as earned rather than performed. Announced emotion ("devastating", "incredibly proud") is the mark of a speaker who skipped the work.`,
  `Quote the student's actual words back to them. Never praise in general terms. Never use the words "powerful", "impactful", or "compelling" — if you cannot say what a line does to a listener, you have not read it closely enough.`,
  `Your rewrite must use the student's own material: their situation, their facts, their voice. You are showing them what their draft was reaching for, not replacing it with yours.`,
].join("\n");

function describeMetrics(metrics: DeliveryMetrics): string {
  return [
    `Measured delivery: ${Math.round(metrics.wordsPerMinute)} words a minute`,
    `${metrics.pauses.length} pauses, longest ${metrics.longestPause.toFixed(1)}s`,
    `${metrics.dynamicRangeDb.toFixed(1)} dB of dynamic range`,
    metrics.hasTranscript ? `${metrics.fillerCount} filler words` : `no transcript available`,
  ].join("; ");
}

function summarizeAnalysis(analysis: Analysis): string {
  return analysis.scores.map((s) => `${s.dimension} ${s.score}/100 (${s.detail})`).join("; ");
}

/**
 * Asks the model to read a written passage against the lesson the student is
 * working on. Throws when no key is configured — callers fall back to the
 * offline analysis, which is complete on its own.
 */
export async function coachPassage(
  lesson: Lesson,
  drill: Drill,
  text: string,
  analysis: Analysis
): Promise<Coaching> {
  const system = [
    CRAFT_RULES,
    ``,
    `THE LESSON THE STUDENT IS WORKING ON: "${lesson.title}" — ${lesson.oneLine}`,
    `WHAT THE LESSON TEACHES: ${lesson.body[0]}`,
    `THE ASSIGNMENT: ${drill.brief}`,
    drill.source ? `THE FLAT PASSAGE THEY WERE REWRITING: "${drill.source}"` : ``,
    ``,
    `A mechanical analyzer already scored the draft, so do not give a score of your own. Read it instead.`,
    ``,
    `Respond with ONLY this JSON, no markdown fences:`,
    `{"read": "<one or two sentences on how this lands on a listener, and whether it does the thing the lesson asks>", "strongest": "<quote their best line verbatim, then one sentence on what it does>", "weakest": "<quote the line that costs them most, then one sentence on what it is doing wrong>", "rewrite": "<the weak part rewritten in their voice with their facts; two to four sentences>", "next": "<the single change to make in the next draft, one sentence, imperative>"}`,
  ].join("\n");

  const user = [
    `Analyzer scores: ${summarizeAnalysis(analysis)}`,
    ``,
    `The student's draft:`,
    `"""`,
    text.slice(0, 3000),
    `"""`,
  ].join("\n");

  return parseCoaching(await callLlm(system, user, COACH_TOKENS));
}

/**
 * Reads a spoken attempt: the transcript if the browser produced one, plus the
 * measurements taken from the audio itself.
 */
export async function coachDelivery(
  lesson: Lesson,
  drill: Drill,
  transcript: string,
  metrics: DeliveryMetrics
): Promise<Coaching> {
  const system = [
    CRAFT_RULES,
    ``,
    `THE LESSON: "${lesson.title}" — ${lesson.oneLine}`,
    `THE SPEAKING DRILL: ${drill.brief}`,
    drill.script ? `THE SCRIPT THEY WERE GIVEN: "${drill.script}"` : `They spoke their own words.`,
    ``,
    `You are reading a spoken attempt. The numbers come from the audio and are reliable; the transcript comes from a browser recognizer and drops most "um"s, mangles proper nouns, and has no punctuation, so read through its errors rather than commenting on them.`,
    ``,
    `Respond with ONLY this JSON, no markdown fences:`,
    `{"read": "<one or two sentences on how this delivery would land in a room, reading the numbers together>", "strongest": "<the one thing they did well, named specifically>", "weakest": "<the habit costing them most>", "rewrite": "<how to deliver the key line differently: where to slow, where to drop, where to stop; two to four sentences>", "next": "<the single thing to change on the next take, one sentence, imperative>"}`,
  ].join("\n");

  const user = [
    describeMetrics(metrics),
    ``,
    transcript
      ? `What the recognizer heard:\n"""\n${transcript.slice(0, 3000)}\n"""`
      : `No transcript is available — judge from the measurements alone.`,
  ].join("\n");

  return parseCoaching(await callLlm(system, user, COACH_TOKENS));
}

function parseCoaching(raw: string): Coaching {
  const parsed = extractJson(raw);
  const field = (key: keyof Coaching): string =>
    typeof parsed[key] === "string" ? parsed[key].trim() : "";

  const coaching: Coaching = {
    read: field("read"),
    strongest: field("strongest"),
    weakest: field("weakest"),
    rewrite: field("rewrite"),
    next: field("next"),
  };

  if (!coaching.read || !coaching.next) throw new Error("coach incomplete output");
  return coaching;
}
