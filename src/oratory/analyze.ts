import type {
  Analysis,
  Dimension,
  DimensionScore,
  Finding,
  PhraseScore,
  TextStats,
} from "./types";

// Offline rhetorical analysis. Everything here is a heuristic, deliberately:
// it has to run with no network and no API key, and it has to point at a
// specific span of the passage rather than hand back a vague grade.

// ---------------------------------------------------------------- vocabulary

// Abstraction: the suffixes that turn an event into a category, plus the
// stock nouns that corporate speech reaches for instead of saying a thing.
export const ABSTRACT_SUFFIX = /(tion|sion|ment|ity|ness|ance|ence|ism|ship)s?$/;

// Words the suffix rule catches that are perfectly concrete.
export const ABSTRACT_EXCEPTIONS = new Set([
  "moment",
  "comment",
  "cement",
  "garment",
  "basement",
  "apartment",
  "instrument",
  "monument",
  "compartment",
  "station",
  "question",
  "portion",
  "kitchen",
  "witness",
  "ship",
  "friendship",
  "darkness",
  "quietness",
]);

export const ABSTRACT_WORDS = new Set([
  "impact",
  "synergy",
  "leverage",
  "framework",
  "paradigm",
  "ecosystem",
  "landscape",
  "workforce",
  "headcount",
  "stakeholder",
  "stakeholders",
  "bandwidth",
  "learnings",
  "takeaway",
  "takeaways",
  "deliverable",
  "deliverables",
  "workstream",
  "initiative",
  "initiatives",
  "strategy",
  "strategies",
  "objective",
  "objectives",
  "metric",
  "metrics",
  "issue",
  "issues",
  "challenge",
  "challenges",
  "context",
  "space",
  "vertical",
  "journey",
  "narrative",
  "messaging",
  "resource",
  "resources",
  "capability",
  "capabilities",
  "functionality",
  "methodology",
  "infrastructure",
]);

// Concreteness: things with edges. Bodies, rooms, objects, weather, time you
// can point at. Short on purpose — proper nouns and numbers do a lot of work.
export const CONCRETE_WORDS = new Set([
  "hand", "hands", "face", "eyes", "eye", "voice", "back", "shoulder", "shoulders",
  "knee", "knees", "throat", "chest", "mouth", "breath", "skin", "hair", "feet",
  "desk", "chair", "table", "door", "doors", "window", "floor", "wall", "room",
  "hallway", "stairs", "kitchen", "car", "cars", "truck", "phone", "screen",
  "keyboard", "laptop", "box", "boxes", "paper", "envelope", "letter", "note",
  "book", "bag", "coat", "shoes", "badge", "key", "keys", "lock", "clock",
  "light", "lights", "lamp", "glass", "cup", "coffee", "bread", "water", "rain",
  "snow", "wind", "sun", "dark", "cold", "heat", "smoke", "dust", "mud", "road",
  "street", "bus", "train", "field", "tree", "trees", "river", "ice", "blood",
  "bone", "salt", "iron", "steel", "wood", "concrete", "parking", "lot",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "january", "february", "march", "april", "may", "june", "july", "august",
  "september", "october", "november", "december", "morning", "midnight",
  "afternoon", "evening", "night",
]);

// Charge: words with temperature. Not the words that announce emotion, the
// words that carry it.
const CHARGED_WORDS = new Set([
  "broke", "broken", "break", "cost", "cost", "lost", "lose", "losing", "left",
  "quit", "quiet", "silent", "silence", "afraid", "fear", "scared", "ashamed",
  "shame", "proud", "pride", "angry", "anger", "tired", "exhausted", "hungry",
  "alone", "promise", "promised", "betrayed", "trust", "trusted", "lied",
  "lie", "truth", "honest", "wrong", "fault", "blame", "owe", "owed", "debt",
  "fight", "fought", "refuse", "refused", "wait", "waited", "hope", "hoped",
  "care", "cared", "hurt", "ache", "cry", "cried", "tears", "laugh", "smile",
  "hold", "held", "carry", "carried", "give", "gave", "take", "took", "stand",
  "stood", "walk", "walked", "run", "ran", "stop", "stopped", "buried",
  "beg", "begged", "sworn", "swear", "dead", "died", "die", "born", "alive",
]);

// Emotion announced instead of shown. Not banned — just usually a sign the
// speaker skipped the thing that would have produced the feeling.
const TOLD_EMOTION = new Set([
  "devastating", "heartbreaking", "tragic", "inspiring", "incredible",
  "amazing", "passionate", "excited", "thrilled", "delighted", "humbled",
  "profound", "powerful", "meaningful", "impactful", "unprecedented",
  "challenging", "difficult", "exciting", "wonderful", "terrible", "awful",
]);

export const HEDGES = [
  "i think", "i feel like", "i guess", "i believe", "in my opinion",
  "sort of", "kind of", "a bit", "a little bit", "somewhat", "perhaps",
  "maybe", "possibly", "probably", "arguably", "relatively", "fairly",
  "more or less", "to some extent", "it seems", "it would seem",
  "i would say", "i just want to say", "if that makes sense",
];

export const FILLER = [
  "um", "uh", "er", "you know", "like i said", "basically", "actually",
  "literally", "obviously", "honestly", "essentially", "at the end of the day",
  "going forward", "in terms of", "as it were", "if you will", "right?",
];

export const INTENSIFIERS = [
  "very", "really", "extremely", "truly", "quite", "so much", "totally",
  "absolutely", "completely", "definitely", "certainly", "super",
];

export const CLICHES = [
  "at the end of the day",
  "think outside the box",
  "move the needle",
  "circle back",
  "low-hanging fruit",
  "drink from the firehose",
  "boil the ocean",
  "new normal",
  "journey of growth",
  "give 110",
  "take it to the next level",
  "push the envelope",
  "hit the ground running",
  "singing from the same hymn sheet",
  "all hands on deck",
  "paradigm shift",
  "win-win",
  "synergy",
  "step change",
  "double down",
  "north star",
  "lessons learned",
  "best practice",
  "in these unprecedented times",
];

export const LY_EXCEPTIONS = new Set([
  "only", "family", "reply", "supply", "apply", "early", "ally", "rally",
  "silly", "holy", "july", "italy", "belly", "jelly", "ugly", "likely",
  "daily", "weekly", "monthly", "yearly", "assembly", "anomaly",
]);

const PASSIVE = /\b(was|were|is|are|been|being|be)\s+(?:\w+ed|made|given|taken|done|seen|told|held|known|shown|built|left|kept|sent|brought|written|driven|chosen|found|put|set)\b/gi;

// ------------------------------------------------------------------- parsing

export interface Sentence {
  text: string;
  words: string[];
  /** Longest run of words with no internal punctuation to breathe on. */
  longestRun: number;
}

export function splitSentences(input: string): Sentence[] {
  const chunks = input
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => wordsOf(s).length > 0);

  return chunks.map((text) => ({
    text,
    words: wordsOf(text),
    longestRun: longestUnbrokenRun(text),
  }));
}

export function wordsOf(input: string): string[] {
  return (input.toLowerCase().match(/[a-z0-9][a-z0-9'’-]*/g) ?? []).filter(Boolean);
}

function longestUnbrokenRun(sentence: string): number {
  return sentence
    .split(/[,;:—–(){}\-]{1,}/)
    .reduce((max, part) => Math.max(max, wordsOf(part).length), 0);
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function round(n: number): number {
  return Math.round(n);
}

function sd(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((a, b) => a + (b - mean) * (b - mean), 0) / values.length;
  return Math.sqrt(variance);
}

function countPhrases(lower: string, phrases: string[]): { total: number; hits: string[] } {
  const hits: string[] = [];
  let total = 0;
  for (const phrase of phrases) {
    // Phrases with punctuation (e.g. "right?") can't use a word boundary tail.
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = /[a-z0-9]$/.test(phrase)
      ? new RegExp(`\\b${escaped}\\b`, "g")
      : new RegExp(`\\b${escaped}`, "g");
    const found = lower.match(pattern);
    if (found) {
      total += found.length;
      hits.push(phrase);
    }
  }
  return { total, hits };
}

export function textStats(sentences: Sentence[]): TextStats {
  const lengths = sentences.map((s) => s.words.length);
  const words = lengths.reduce((a, b) => a + b, 0);
  return {
    words,
    sentences: sentences.length,
    meanSentenceWords: sentences.length ? words / sentences.length : 0,
    sentenceWordSd: sd(lengths),
    longestSentenceWords: lengths.length ? Math.max(...lengths) : 0,
    shortestSentenceWords: lengths.length ? Math.min(...lengths) : 0,
    shortSentences: lengths.filter((n) => n <= 5).length,
    spokenSeconds: Math.round((words / 130) * 60),
  };
}

// ------------------------------------------------------------------- devices

export interface DeviceReport {
  anaphora: string[]; // the repeated openings found
  epistrophe: string[];
  tricolon: string[]; // the sentence containing it
  antithesis: string[];
  questions: number;
  address: number;
  images: string[];
}

function openingKey(s: Sentence, n: number): string {
  return s.words.slice(0, n).join(" ");
}

export function detectDevices(sentences: Sentence[], lower: string): DeviceReport {
  const anaphora: string[] = [];
  const epistrophe: string[] = [];
  const tricolon: string[] = [];
  const antithesis: string[] = [];

  // Anaphora: two or more consecutive sentences opening on the same two words.
  let run: string[] = [];
  let runKey = "";
  for (const s of sentences) {
    const key = openingKey(s, 2);
    if (key && key === runKey && s.words.length > 2) {
      run.push(s.text);
    } else {
      if (run.length >= 2 && runKey) anaphora.push(runKey);
      runKey = key;
      run = [s.text];
    }
  }
  if (run.length >= 2 && runKey) anaphora.push(runKey);

  // Epistrophe: consecutive sentences closing on the same two words.
  for (let i = 1; i < sentences.length; i++) {
    const a = sentences[i - 1].words.slice(-2).join(" ");
    const b = sentences[i].words.slice(-2).join(" ");
    if (a && a === b && sentences[i].words.length > 2 && !epistrophe.includes(a)) {
      epistrophe.push(a);
    }
  }

  // Tricolon: "a, b, and c" inside one sentence.
  for (const s of sentences) {
    if (/[^,]+,[^,]+,\s*(?:and|or)\s+[^,]+/i.test(s.text)) tricolon.push(s.text);
  }

  // Antithesis: a matched turn inside a sentence, or a negated claim answered
  // by the next sentence opening the same way.
  for (const s of sentences) {
    if (/\bnot\b[^.!?]*\bbut\b/i.test(s.text)) antithesis.push(s.text);
  }
  // The negation has to sit in the frame itself — "We are not behind" — not in
  // the object of the sentence, or every drumbeat run reads as a turn.
  const negatedFrame = (s: Sentence) =>
    s.words.slice(0, 4).some((w) => w === "not" || w === "never" || w === "no");

  for (let i = 1; i < sentences.length; i++) {
    const prev = sentences[i - 1];
    const cur = sentences[i];
    const sameOpening =
      openingKey(prev, 2) && openingKey(prev, 2) === openingKey(cur, 2);
    if (sameOpening && negatedFrame(prev) && !negatedFrame(cur) && !antithesis.includes(cur.text)) {
      antithesis.push(cur.text);
    }
  }

  const images = (lower.match(/\b(?:like a|like the|as if|as though)\b[^.!?,]*/g) ?? [])
    .map((m) => m.trim())
    .slice(0, 3);

  return {
    anaphora,
    epistrophe,
    tricolon,
    antithesis,
    questions: sentences.filter((s) => s.text.trim().endsWith("?")).length,
    address: (lower.match(/\b(you|your|yours)\b/g) ?? []).length,
    images,
  };
}

// ------------------------------------------------------------------- scoring

function scoreConcrete(words: string[], raw: string): { score: number; abstractHits: string[]; concreteHits: string[] } {
  const abstractHits: string[] = [];
  const concreteHits: string[] = [];

  // Walk the raw text so words come back the way the student wrote them —
  // quoting "march" back at someone who wrote "March" reads as a typo.
  for (const original of raw.match(/[A-Za-z0-9][A-Za-z0-9'’-]*/g) ?? []) {
    const w = original.toLowerCase();
    if (ABSTRACT_WORDS.has(w) || (ABSTRACT_SUFFIX.test(w) && !ABSTRACT_EXCEPTIONS.has(w))) {
      abstractHits.push(original);
    } else if (CONCRETE_WORDS.has(w)) {
      concreteHits.push(original);
    }
  }

  // Numbers and names are concrete by construction.
  const numbers = raw.match(/\b\d[\d,.]*\b/g) ?? [];
  const names = raw.match(/(?<!^)(?<![.!?]\s)(?<!["“])\b[A-Z][a-z]{2,}\b/g) ?? [];
  const specifics = numbers.length + Math.min(names.length, 4);

  const per100 = (n: number) => (words.length ? (n / words.length) * 100 : 0);
  const score = clamp(
    50 + 5 * per100(concreteHits.length + specifics) - 7 * per100(abstractHits.length)
  );

  return { score, abstractHits, concreteHits };
}

function scoreRhythm(sentences: Sentence[]): number {
  if (sentences.length === 0) return 0;
  if (sentences.length === 1) {
    // One sentence has no rhythm to speak of; a short one at least lands.
    return sentences[0].words.length <= 8 ? 45 : 20;
  }

  const lengths = sentences.map((s) => s.words.length);
  const spread = sd(lengths);
  const hasShort = lengths.some((n) => n <= 5);
  const hasMedium = lengths.some((n) => n > 5 && n <= 9);
  const hasLong = lengths.some((n) => n >= 18);

  let score = clamp((spread / 8) * 65, 0, 65);
  if (hasShort) score += 20;
  else if (hasMedium) score += 8;
  if (hasShort && hasLong) score += 12;

  // All-short is its own kind of monotone.
  const allShort = lengths.every((n) => n <= 7);
  if (allShort && lengths.length > 2) score = Math.min(score, 55);

  return clamp(score);
}

function scoreDevices(devices: DeviceReport, sentenceCount: number): number {
  let score = 0;
  score += Math.min(devices.anaphora.length, 2) * 30;
  score += Math.min(devices.epistrophe.length, 1) * 24;
  score += Math.min(devices.tricolon.length, 2) * 20;
  score += Math.min(devices.antithesis.length, 2) * 24;
  score += Math.min(devices.questions, 1) * 10;
  score += devices.address > 0 ? 8 : 0;
  score += Math.min(devices.images.length, 1) * 12;

  // A single sentence cannot carry structural devices; do not punish it to zero.
  if (sentenceCount <= 1) score = Math.max(score, 25);

  return clamp(score);
}

function scoreCharge(words: string[]): { score: number; charged: string[]; told: string[] } {
  const charged = words.filter((w) => CHARGED_WORDS.has(w));
  const told = words.filter((w) => TOLD_EMOTION.has(w));
  const per100 = (n: number) => (words.length ? (n / words.length) * 100 : 0);

  const score = clamp(
    35 + 7 * per100(charged.length) - 6 * per100(told.length)
  );
  return { score, charged: [...new Set(charged)], told: [...new Set(told)] };
}

interface EconomyReport {
  score: number;
  hedges: string[];
  filler: string[];
  intensifiers: string[];
  cliches: string[];
  adverbs: string[];
  passive: string[];
}

function scoreEconomy(words: string[], lower: string, raw: string): EconomyReport {
  const hedges = countPhrases(lower, HEDGES);
  const filler = countPhrases(lower, FILLER);
  const intens = countPhrases(lower, INTENSIFIERS);
  const cliches = countPhrases(lower, CLICHES);

  const adverbs = [
    ...new Set(words.filter((w) => w.endsWith("ly") && w.length > 4 && !LY_EXCEPTIONS.has(w))),
  ];
  const passive = [...new Set(raw.match(PASSIVE) ?? [])].map((m) => m.toLowerCase());

  const per100 = (n: number) => (words.length ? (n / words.length) * 100 : 0);
  const score = clamp(
    100 -
      9 * per100(hedges.total) -
      10 * per100(filler.total) -
      6 * per100(intens.total) -
      5 * per100(adverbs.length) -
      4 * per100(passive.length) -
      12 * cliches.total
  );

  return {
    score,
    hedges: hedges.hits,
    filler: filler.hits,
    intensifiers: intens.hits,
    cliches: cliches.hits,
    adverbs,
    passive,
  };
}

function scoreBreath(sentences: Sentence[]): { score: number; unspeakable: Sentence[] } {
  if (sentences.length === 0) return { score: 0, unspeakable: [] };

  const unspeakable = sentences.filter((s) => s.longestRun > 18 || s.words.length > 30);
  const worstRun = Math.max(...sentences.map((s) => s.longestRun));
  const mean = sentences.reduce((a, s) => a + s.words.length, 0) / sentences.length;

  let score = 100;
  score -= Math.max(0, worstRun - 16) * 5;
  score -= unspeakable.length * 12;
  score -= Math.max(0, mean - 22) * 3;

  return { score: clamp(score), unspeakable };
}

// ------------------------------------------------------------------ findings

function quoteOf(s: string, max = 90): string {
  const t = s.trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

/** Matched in lowercase; restore the standalone "I" before showing it back. */
function spoken(phrase: string): string {
  return phrase.replace(/\bi\b/g, "I");
}

/** Phrase lists are matched in lowercase; show them the way they are spoken. */
function quoteList(phrases: string[], limit = 3): string {
  return phrases
    .slice(0, limit)
    .map((p) => `“${p.replace(/\bi\b/g, "I")}”`)
    .join(", ");
}

function buildFindings(
  sentences: Sentence[],
  concrete: ReturnType<typeof scoreConcrete>,
  rhythmScore: number,
  devices: DeviceReport,
  charge: ReturnType<typeof scoreCharge>,
  economy: EconomyReport,
  breath: ReturnType<typeof scoreBreath>,
  stats: TextStats
): Finding[] {
  const findings: Finding[] = [];

  // --- concreteness
  if (concrete.abstractHits.length > 0) {
    const worst = [...new Set(concrete.abstractHits)].slice(0, 4);
    const carrier = sentences.find((s) =>
      worst.some((w) => s.words.includes(w.toLowerCase()))
    );
    findings.push({
      kind: "fix",
      dimension: "concrete",
      label: `Abstractions doing the work: ${worst.join(", ")}`,
      quote: carrier ? quoteOf(carrier.text) : undefined,
      note: "Each of these is a category standing in for an event. Replace it with what actually happened, to whom, holding what.",
    });
  }
  if (concrete.score >= 70 && concrete.concreteHits.length > 0) {
    findings.push({
      kind: "strength",
      dimension: "concrete",
      label: "The room can see this",
      note: `You gave them things with edges — ${[...new Set(concrete.concreteHits)].slice(0, 4).join(", ")}. That is where the feeling comes from.`,
    });
  }

  // --- rhythm
  const lengths = sentences.map((s) => s.words.length);
  if (sentences.length >= 3 && stats.sentenceWordSd < 4) {
    findings.push({
      kind: "fix",
      dimension: "rhythm",
      label: "Every sentence is the same length",
      quote: sentences[1] ? quoteOf(sentences[1].text) : undefined,
      note: `Your sentences run ${lengths.join(", ")} words. Pick the most important one and cut it to four words. The drop is what the room hears.`,
    });
  } else if (rhythmScore >= 70) {
    const shortest = sentences.reduce((a, b) => (b.words.length < a.words.length ? b : a));
    findings.push({
      kind: "strength",
      dimension: "rhythm",
      label: "The lengths move",
      quote: quoteOf(shortest.text),
      note: "You built and then dropped. That short line carries more than the long ones around it.",
    });
  }
  const flaggedMonotone = sentences.length >= 3 && stats.sentenceWordSd < 4;
  if (sentences.length >= 3 && !flaggedMonotone && !lengths.some((n) => n <= 6)) {
    findings.push({
      kind: "fix",
      dimension: "rhythm",
      label: "No short sentence anywhere",
      note: "Nothing here is under seven words, so nothing lands. One short sentence, placed after your longest, does more than any adjective.",
    });
  }

  // --- devices
  if (devices.anaphora.length > 0) {
    findings.push({
      kind: "strength",
      dimension: "device",
      label: `Anaphora on "${devices.anaphora[0]}"`,
      note: "The repetition builds a floor. Make the last one in the run the shortest, then break the pattern.",
    });
  }
  if (devices.antithesis.length > 0) {
    findings.push({
      kind: "strength",
      dimension: "device",
      label: "There is a turn in here",
      quote: quoteOf(devices.antithesis[0]),
      note: "The contrast is doing the persuading. Tighten the two halves until they have the same rhythm and it will land harder.",
    });
  }
  if (devices.tricolon.length > 0) {
    findings.push({
      kind: "strength",
      dimension: "device",
      label: "A list of three",
      quote: quoteOf(devices.tricolon[0]),
      note: "Check the order: shortest first, heaviest last. If the item you actually mean is not at the end, move it.",
    });
  }
  if (
    devices.anaphora.length === 0 &&
    devices.antithesis.length === 0 &&
    devices.tricolon.length === 0 &&
    sentences.length >= 3
  ) {
    findings.push({
      kind: "fix",
      dimension: "device",
      label: "No structure carrying the feeling",
      note: "Nothing repeats, nothing turns, nothing arrives in three. Pick one: open three sentences the same way, or write a \"not this — that\" turn at the hinge.",
    });
  }
  if (devices.address === 0 && sentences.length >= 3) {
    findings.push({
      kind: "fix",
      dimension: "device",
      label: "You never address the room",
      note: "Not one \"you\" in the whole passage. One direct address changes it from a report into something said to people.",
    });
  }

  // --- charge
  if (charge.told.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "charge",
      label: `Emotion announced, not shown: ${charge.told.slice(0, 3).join(", ")}`,
      quote: sentences.find((s) => charge.told.some((w) => s.words.includes(w)))?.text,
      note: "These words tell the room what to feel, which is the one thing that reliably stops them feeling it. Cut the word and put the event in its place.",
    });
  }
  if (charge.score >= 65) {
    findings.push({
      kind: "strength",
      dimension: "charge",
      label: "The words have weight",
      note: `Words like ${charge.charged.slice(0, 3).join(", ")} carry temperature without announcing it.`,
    });
  }

  // --- economy
  if (economy.hedges.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "economy",
      label: `Hedging: ${quoteList(economy.hedges)}`,
      quote: sentences.find((s) =>
        economy.hedges.some((h) => s.text.toLowerCase().includes(h))
      )?.text,
      note: "A hedge asks permission to have said the sentence. Delete it and the claim gets stronger without changing a word of substance.",
    });
  }
  if (economy.filler.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "economy",
      label: `Filler: ${quoteList(economy.filler)}`,
      note: "These are the written equivalent of um. They buy time you do not need on the page.",
    });
  }
  if (economy.cliches.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "economy",
      label: `Phrases the room has heard: ${quoteList(economy.cliches, 2)}`,
      note: "A cliché is a sentence the audience can finish for you, so they stop listening at the halfway point.",
    });
  }
  if (economy.adverbs.length >= 3) {
    findings.push({
      kind: "fix",
      dimension: "economy",
      label: `Adverb padding: ${economy.adverbs.slice(0, 4).join(", ")}`,
      note: "Adverbs prop up verbs that are not strong enough. Change the verb instead and the adverb disappears.",
    });
  }
  if (economy.passive.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "economy",
      label: "Passive voice hides who did it",
      quote: economy.passive.slice(0, 2).join(" / "),
      note: "Passive construction removes the actor. If the actor is you, that removal is the part the room will notice.",
    });
  }
  if (economy.score >= 85) {
    findings.push({
      kind: "strength",
      dimension: "economy",
      label: "Nothing padded",
      note: "No hedges, no filler, no borrowed phrases. Every word is carrying something.",
    });
  }

  // --- breath
  if (breath.unspeakable.length > 0) {
    findings.push({
      kind: "fix",
      dimension: "breath",
      label: "You will run out of air here",
      quote: quoteOf(breath.unspeakable[0].text, 110),
      note: `That is ${breath.unspeakable[0].longestRun} words with nowhere to breathe. Break it at the natural turn, or cut it in two.`,
    });
  } else if (breath.score >= 85 && sentences.length >= 2) {
    findings.push({
      kind: "strength",
      dimension: "breath",
      label: "Speakable throughout",
      note: "Every sentence fits in one breath, which means you can deliver it looking at the room instead of the page.",
    });
  }

  return findings;
}

// --------------------------------------------------------------------- entry

const BASE_WEIGHT = 1;
const TARGET_WEIGHT = 2.2;

export function analyze(input: string, targets: Dimension[] = []): Analysis {
  const raw = input.trim();
  const sentences = splitSentences(raw);
  const words = sentences.flatMap((s) => s.words);
  const lower = raw.toLowerCase();
  const stats = textStats(sentences);

  if (words.length === 0) {
    return {
      overall: 0,
      scores: [],
      findings: [],
      stats,
    };
  }

  const concrete = scoreConcrete(words, raw);
  const rhythm = scoreRhythm(sentences);
  const devices = detectDevices(sentences, lower);
  const deviceScore = scoreDevices(devices, sentences.length);
  const charge = scoreCharge(words);
  const economy = scoreEconomy(words, lower, raw);
  const breath = scoreBreath(sentences);

  const scores: DimensionScore[] = [
    {
      dimension: "concrete",
      score: round(concrete.score),
      detail: concrete.abstractHits.length
        ? `${concrete.abstractHits.length} abstraction${concrete.abstractHits.length === 1 ? "" : "s"}, ${concrete.concreteHits.length} concrete noun${concrete.concreteHits.length === 1 ? "" : "s"}`
        : `${concrete.concreteHits.length} concrete noun${concrete.concreteHits.length === 1 ? "" : "s"}, no abstractions`,
    },
    {
      dimension: "rhythm",
      score: round(rhythm),
      detail: `sentences of ${sentences.map((s) => s.words.length).join(", ")} words`,
    },
    {
      dimension: "device",
      score: round(deviceScore),
      detail: describeDevices(devices),
    },
    {
      dimension: "charge",
      score: round(charge.score),
      detail: charge.told.length
        ? `${charge.charged.length} charged words, ${charge.told.length} announced`
        : `${charge.charged.length} charged words`,
    },
    {
      dimension: "economy",
      score: round(economy.score),
      detail: describeEconomy(economy),
    },
    {
      dimension: "breath",
      score: round(breath.score),
      detail: `longest unbroken run ${Math.max(0, ...sentences.map((s) => s.longestRun))} words, about ${stats.spokenSeconds}s spoken`,
    },
  ];

  const targetSet = new Set(targets);
  const weighted = scores.reduce(
    (acc, s) => {
      const w = targetSet.has(s.dimension) ? TARGET_WEIGHT : BASE_WEIGHT;
      return { sum: acc.sum + s.score * w, weight: acc.weight + w };
    },
    { sum: 0, weight: 0 }
  );

  const findings = buildFindings(
    sentences,
    concrete,
    rhythm,
    devices,
    charge,
    economy,
    breath,
    stats
  );

  return {
    overall: round(weighted.weight ? weighted.sum / weighted.weight : 0),
    scores,
    findings: prioritize(findings, scores, targetSet),
    stats,
  };
}

const MAX_FIXES = 6;
const MAX_STRENGTHS = 3;

/**
 * A weak draft can trip every rule at once, and a list of eleven problems is a
 * list nobody acts on. Keep the fixes for the dimensions that scored worst —
 * weighting whatever this drill is actually teaching — and a few strengths so
 * the student knows what not to throw away in the rewrite.
 */
function prioritize(
  findings: Finding[],
  scores: DimensionScore[],
  targets: Set<Dimension>
): Finding[] {
  const scoreOf = new Map(scores.map((s) => [s.dimension, s.score]));
  const rank = (f: Finding) =>
    (scoreOf.get(f.dimension) ?? 50) - (targets.has(f.dimension) ? 30 : 0);

  const fixes = findings
    .filter((f) => f.kind === "fix")
    .sort((a, b) => rank(a) - rank(b))
    .slice(0, MAX_FIXES);

  const strengths = findings
    .filter((f) => f.kind === "strength")
    .sort((a, b) => rank(b) - rank(a))
    .slice(0, MAX_STRENGTHS);

  // Fixes first: the point of the trainer is the next draft, not the grade.
  return [...fixes, ...strengths];
}

function describeDevices(d: DeviceReport): string {
  const parts: string[] = [];
  if (d.anaphora.length) parts.push(`anaphora (${d.anaphora.length})`);
  if (d.epistrophe.length) parts.push("epistrophe");
  if (d.tricolon.length) parts.push(`three-part list (${d.tricolon.length})`);
  if (d.antithesis.length) parts.push(`turn (${d.antithesis.length})`);
  if (d.questions) parts.push("question");
  if (d.images.length) parts.push("image");
  if (d.address) parts.push("direct address");
  return parts.length ? parts.join(", ") : "none detected";
}

function describeEconomy(e: EconomyReport): string {
  const parts: string[] = [];
  if (e.hedges.length) parts.push(`${e.hedges.length} hedge${e.hedges.length === 1 ? "" : "s"}`);
  if (e.filler.length) parts.push(`${e.filler.length} filler`);
  if (e.cliches.length) parts.push(`${e.cliches.length} cliché${e.cliches.length === 1 ? "" : "s"}`);
  if (e.adverbs.length) parts.push(`${e.adverbs.length} -ly adverb${e.adverbs.length === 1 ? "" : "s"}`);
  if (e.passive.length) parts.push("passive voice");
  return parts.length ? parts.join(", ") : "clean";
}

/** Grade band for a 0-100 score, reusing the game's vocabulary of verdicts. */
export function bandFor(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "It lands", color: "var(--good-2)" };
  if (score >= 70) return { label: "Close", color: "var(--good)" };
  if (score >= 55) return { label: "Workable", color: "var(--solid)" };
  if (score >= 40) return { label: "Flat", color: "var(--warn)" };
  return { label: "A report, not a speech", color: "var(--bad)" };
}

// ------------------------------------------------------- ranking the phrases

// Passage-level scoring normalizes per hundred words, which is meaningless on
// a six-word sentence: one charged word would read as a rate of sixteen per
// hundred and score full marks. Ranking single lines therefore counts
// occurrences directly and saturates, so a short line and a long one are
// judged on what they contain rather than on their density.

interface PhraseDevices {
  drumbeat: boolean;
  epistrophe: boolean;
  tricolon: boolean;
  turn: boolean;
  question: boolean;
  address: boolean;
  image: boolean;
}

function devicesPerSentence(sentences: Sentence[]): PhraseDevices[] {
  const tags: PhraseDevices[] = sentences.map((s) => ({
    drumbeat: false,
    epistrophe: false,
    tricolon: /[^,]+,[^,]+,\s*(?:and|or)\s+[^,]+/i.test(s.text),
    turn: /\bnot\b[^.!?]*\bbut\b/i.test(s.text),
    question: s.text.trim().endsWith("?"),
    address: /\b(?:you|your|yours)\b/i.test(s.text),
    image: /\b(?:like a|like the|as if|as though)\b/i.test(s.text),
  }));

  // A repetition device belongs to every line in the run, not just the last.
  const markRuns = (key: (s: Sentence) => string, field: "drumbeat" | "epistrophe") => {
    let start = 0;
    for (let i = 1; i <= sentences.length; i++) {
      const same =
        i < sentences.length && key(sentences[i]) !== "" && key(sentences[i]) === key(sentences[start]);
      if (same) continue;
      if (i - start >= 2) {
        for (let j = start; j < i; j++) tags[j][field] = true;
      }
      start = i;
    }
  };

  markRuns((s) => s.words.slice(0, 2).join(" "), "drumbeat");
  markRuns((s) => s.words.slice(-2).join(" "), "epistrophe");

  // A matched frame answering a negated one is a turn across two lines.
  for (let i = 1; i < sentences.length; i++) {
    const prev = sentences[i - 1];
    const cur = sentences[i];
    const sameOpening =
      prev.words.slice(0, 2).join(" ") !== "" &&
      prev.words.slice(0, 2).join(" ") === cur.words.slice(0, 2).join(" ");
    const negatedFrame = prev.words
      .slice(0, 4)
      .some((w) => w === "not" || w === "never" || w === "no");
    if (sameOpening && negatedFrame) {
      tags[i - 1].turn = true;
      tags[i].turn = true;
    }
  }

  return tags;
}

function roleOf(sentences: Sentence[], index: number): "build" | "drop" | "flat" {
  const words = sentences[index].words.length;
  const previous = index > 0 ? sentences[index - 1].words.length : 0;
  if (words <= 6 && previous >= 12) return "drop";
  if (words >= 15) return "build";
  return "flat";
}

export function rankPhrases(text: string): PhraseScore[] {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return [];

  const deviceTags = devicesPerSentence(sentences);

  const scored = sentences.map((sentence, index) => {
    const lower = sentence.text.toLowerCase();
    const working: string[] = [];
    const dragging: string[] = [];

    // --- what it is made of
    const concreteHits = sentence.words.filter((w) => CONCRETE_WORDS.has(w));
    const properNouns = (sentence.text.match(/(?<!^)(?<!["“])\b[A-Z][a-z]{2,}\b/g) ?? []).length;
    const numbers = (sentence.text.match(/\b\d[\d,.]*\b/g) ?? []).length;
    const specifics = concreteHits.length + Math.min(properNouns, 2) + numbers;
    const abstractHits = sentence.words.filter(
      (w) => ABSTRACT_WORDS.has(w) || (ABSTRACT_SUFFIX.test(w) && !ABSTRACT_EXCEPTIONS.has(w))
    );
    const concrete = clamp(45 + 18 * Math.min(specifics, 3) - 20 * Math.min(abstractHits.length, 3));

    const chargedHits = sentence.words.filter((w) => CHARGED_WORDS.has(w));
    const toldHits = sentence.words.filter((w) => TOLD_EMOTION.has(w));
    const charge = clamp(40 + 20 * Math.min(chargedHits.length, 3) - 18 * Math.min(toldHits.length, 2));

    const hedges = countPhrases(lower, HEDGES);
    const filler = countPhrases(lower, FILLER);
    const intensifiers = countPhrases(lower, INTENSIFIERS);
    const cliches = countPhrases(lower, CLICHES);
    const adverbs = sentence.words.filter(
      (w) => w.endsWith("ly") && w.length > 4 && !LY_EXCEPTIONS.has(w)
    );
    const passive = (sentence.text.match(PASSIVE) ?? []).length;

    // "honestly" is filler and an adverb both; report it once.
    const alreadyNamed = new Set(
      [...hedges.hits, ...filler.hits, ...intensifiers.hits, ...cliches.hits].flatMap((phrase) =>
        phrase.split(/\s+/)
      )
    );
    const unflaggedAdverbs = adverbs.filter((w) => !alreadyNamed.has(w));
    const economy = clamp(
      100 -
        22 * hedges.total -
        18 * filler.total -
        12 * intensifiers.total -
        25 * cliches.total -
        10 * adverbs.length -
        14 * passive
    );

    const breath = clamp(
      100 - Math.max(0, sentence.longestRun - 16) * 6 - (sentence.words.length > 28 ? 20 : 0)
    );

    // --- what it does
    const tags = deviceTags[index];
    let deviceBonus = 0;
    if (tags.drumbeat) deviceBonus += 15;
    if (tags.turn) deviceBonus += 15;
    if (tags.tricolon) deviceBonus += 12;
    if (tags.epistrophe) deviceBonus += 10;
    if (tags.image) deviceBonus += 8;
    if (tags.question) deviceBonus += 5;
    if (tags.address) deviceBonus += 5;
    deviceBonus = Math.min(deviceBonus, 28);

    const role = roleOf(sentences, index);
    const roleBonus =
      role === "drop" ? 15 : role === "build" && sentence.longestRun <= 16 ? 5 : 0;

    const base = (concrete + charge + economy * 1.2 + breath * 0.8) / 4;
    const score = clamp(Math.round(base + deviceBonus + roleBonus));

    // --- the labels
    if (specifics > 0) working.push(`${specifics} specific${specifics === 1 ? "" : "s"}`);
    if (chargedHits.length > 0) working.push("words with weight");
    if (tags.drumbeat) working.push("drumbeat");
    if (tags.turn) working.push("a turn");
    if (tags.tricolon) working.push("three-part list");
    if (tags.epistrophe) working.push("epistrophe");
    if (tags.image) working.push("an image");
    if (tags.question) working.push("a question");
    if (tags.address) working.push("speaks to them");
    if (role === "drop") working.push("the drop");
    if (economy === 100 && sentence.words.length > 3) working.push("nothing padded");

    if (abstractHits.length > 0) dragging.push(`abstraction: ${abstractHits.slice(0, 2).join(", ")}`);
    if (hedges.total > 0) dragging.push(`hedge: ${spoken(hedges.hits[0])}`);
    if (filler.total > 0) dragging.push(`filler: ${spoken(filler.hits[0])}`);
    if (cliches.total > 0) dragging.push(`cliché: ${spoken(cliches.hits[0])}`);
    if (intensifiers.total > 0) dragging.push(`intensifier: ${spoken(intensifiers.hits[0])}`);
    if (unflaggedAdverbs.length > 0) dragging.push(`adverb: ${unflaggedAdverbs[0]}`);
    if (passive > 0) dragging.push("passive voice");
    if (toldHits.length > 0) dragging.push(`announced: ${toldHits[0]}`);
    if (sentence.longestRun > 18) dragging.push(`${sentence.longestRun} words with no air`);

    return {
      index,
      rank: 0,
      text: sentence.text,
      score,
      words: sentence.words.length,
      working,
      dragging,
      role,
      note: phraseNote(score, working, dragging, role, sentence.words.length),
    } satisfies PhraseScore;
  });

  const order = [...scored].sort((a, b) => b.score - a.score || a.index - b.index);
  order.forEach((phrase, i) => {
    phrase.rank = i + 1;
  });

  return scored;
}

function phraseNote(
  score: number,
  working: string[],
  dragging: string[],
  role: "build" | "drop" | "flat",
  words: number
): string {
  if (score >= 80 && working.length > 0) {
    return `Keep this one. ${working[0][0].toUpperCase()}${working[0].slice(1)} is carrying it.`;
  }
  if (dragging.length > 0) {
    return `Fix the ${dragging[0]} and this line comes up with the rest.`;
  }
  if (role === "build" && words >= 20) {
    return "Long, and doing nothing but carrying information. Follow it with something short.";
  }
  if (words <= 6) {
    return "Short enough to land, but the line before it is too short to make it feel like one. Put it after your longest sentence.";
  }
  if (role === "flat") {
    return "Neither building nor landing. This is the length that disappears in a room.";
  }
  return "Nothing wrong with it, and nothing in it the room will remember.";
}
