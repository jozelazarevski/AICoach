// Types for the oratory trainer: a class on emotional speech plus the drills
// that make you practice it, in writing and out loud.

/** The six things the analyzer measures in a passage. */
export type Dimension =
  | "concrete" // specifics a listener can see, instead of abstractions
  | "rhythm" // sentence-length variation, and short lines that land
  | "device" // anaphora, tricolon, antithesis, address, question, image
  | "charge" // sensory and emotional weight of the words themselves
  | "economy" // hedges, filler, adverb padding, cliché, passive voice
  | "breath"; // whether a human can actually say it in one lungful

export const DIMENSIONS: Dimension[] = [
  "concrete",
  "rhythm",
  "device",
  "charge",
  "economy",
  "breath",
];

export const DIMENSION_LABEL: Record<Dimension, string> = {
  concrete: "Concreteness",
  rhythm: "Rhythm",
  device: "Devices",
  charge: "Emotional charge",
  economy: "Economy",
  breath: "Breath",
};

export const DIMENSION_BLURB: Record<Dimension, string> = {
  concrete: "Things a listener can picture, instead of ideas they have to decode.",
  rhythm: "Sentences of different lengths, and a short one where it counts.",
  device: "Repetition, threes, contrast, direct address — the shapes that carry feeling.",
  charge: "Words with heat and texture, not neutral report language.",
  economy: "No hedging, no padding, no phrases the room has heard a thousand times.",
  breath: "Lines short enough to say out loud without running out of air.",
};

/** A single observation about the passage, tied to the text that caused it. */
export interface Finding {
  kind: "strength" | "fix";
  dimension: Dimension;
  label: string;
  /** The exact span of the passage this is about, when there is one. */
  quote?: string;
  /** What to do about it, in second person. */
  note: string;
}

export interface DimensionScore {
  dimension: Dimension;
  /** 0-100. */
  score: number;
  detail: string;
}

export interface Analysis {
  /** 0-100, weighted toward the drill's target dimensions. */
  overall: number;
  scores: DimensionScore[];
  findings: Finding[];
  stats: TextStats;
}

export interface TextStats {
  words: number;
  sentences: number;
  meanSentenceWords: number;
  /** Standard deviation of sentence length — the rhythm signal. */
  sentenceWordSd: number;
  longestSentenceWords: number;
  shortestSentenceWords: number;
  /** Sentences of five words or fewer. */
  shortSentences: number;
  /** Rough spoken length at 130 words per minute. */
  spokenSeconds: number;
}

/** A worked answer, so nobody has to start a drill from a blank page. */
export interface DrillExample {
  /** The situation, so a writer can find one near their own. */
  context: string;
  passage: string;
  /** What to notice in it — one line, pointing at the technique. */
  notice: string;
}

export type DrillKind = "write" | "rewrite" | "speak";

export interface Drill {
  id: string;
  kind: DrillKind;
  title: string;
  /** The assignment, in second person. */
  brief: string;
  /** For rewrite drills: the flat passage to fix. */
  source?: string;
  /** For speak drills: the passage to deliver, when one is given. */
  script?: string;
  /** Dimensions this drill is graded hardest on. */
  targets: Dimension[];
  /** Shown after an attempt, whatever the score. */
  coachNote: string;
  minWords: number;
  /** Worked answers for the drill, shown on request. */
  examples?: DrillExample[];
}

export interface Lesson {
  id: string;
  unit: "substance" | "shape" | "delivery";
  title: string;
  /** One line, the promise of the lesson. */
  oneLine: string;
  /** The teaching itself, a few paragraphs. */
  body: string[];
  /** Concrete moves the student can make tomorrow. */
  moves: string[];
  /** A flat line and the same line with the technique applied. */
  example: { flat: string; charged: string; why: string };
  drills: Drill[];
}

export interface UnitInfo {
  id: Lesson["unit"];
  label: string;
  blurb: string;
}

export const UNITS: UnitInfo[] = [
  {
    id: "substance",
    label: "Substance",
    blurb: "What you say. Emotion comes from the thing itself, not the adjectives around it.",
  },
  {
    id: "shape",
    label: "Shape",
    blurb: "How the sentences are built. Form is what makes a true thing land.",
  },
  {
    id: "delivery",
    label: "Delivery",
    blurb: "The voice. Pace, silence, volume — and how you end.",
  },
];

/** What a finished attempt records. */
export interface DrillAttempt {
  drillId: string;
  lessonId: string;
  score: number;
  at: number;
}

/** One sentence of a draft, scored and ranked against the others. */
export interface PhraseScore {
  /** Position in the draft, from 0. */
  index: number;
  /** 1 is the strongest line in the passage. */
  rank: number;
  text: string;
  score: number;
  words: number;
  /** What this line is doing right, in two or three words each. */
  working: string[];
  /** What is costing it. */
  dragging: string[];
  /** Its job in the rhythm of the passage. */
  role: "build" | "drop" | "flat";
  note: string;
}
