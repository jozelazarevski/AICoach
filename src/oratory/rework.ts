import {
  ABSTRACT_EXCEPTIONS,
  ABSTRACT_SUFFIX,
  ABSTRACT_WORDS,
  CLICHES,
  CONCRETE_WORDS,
  FILLER,
  HEDGES,
  INTENSIFIERS,
  LY_EXCEPTIONS,
  detectDevices,
  splitSentences,
  wordsOf,
  type Sentence,
} from "./analyze";

// Turning findings into a next draft. Two halves, and the split between them
// matters: the machine only performs edits it can make without knowing
// anything the writer has not already said. Everything that needs a fact —
// what actually happened, who did it, what it really cost — becomes a prompt
// or a blank, never an invention.

export interface Edit {
  /** What was taken out, verbatim. */
  before: string;
  label: string;
}

export interface Prompt {
  id: string;
  label: string;
  /** The span of their draft this is about. */
  quote?: string;
  ask: string;
}

export interface Rework {
  rewritten: string;
  edits: Edit[];
  prompts: Prompt[];
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Cleans up the wreckage left by cutting words out of a sentence. */
function tidy(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/,\s*,/g, ",")
    .replace(/,\s*\./g, ".")
    .replace(/\(\s*\)/g, "")
    .replace(/\s+\n/g, "\n")
    .replace(/(^|[.!?…]\s+|\n)([a-z])/g, (_m, lead: string, ch: string) => lead + ch.toUpperCase())
    .trim();
}

function cutPhrases(text: string, phrases: string[], label: string, edits: Edit[]): string {
  let out = text;
  for (const phrase of phrases) {
    const tail = /[a-z0-9]$/.test(phrase) ? "\\b" : "";
    const re = new RegExp(`\\b${escapeRe(phrase)}${tail},?\\s*`, "gi");
    const found = out.match(re);
    if (!found) continue;
    for (const hit of found) edits.push({ before: hit.trim().replace(/,$/, ""), label });
    out = out.replace(re, "");
  }
  return out;
}

function cutAdverbs(text: string, edits: Edit[]): string {
  return text.replace(/\b(\w+ly)\b\s*/gi, (match, word: string) => {
    if (word.length <= 4 || LY_EXCEPTIONS.has(word.toLowerCase())) return match;
    edits.push({ before: word, label: "adverb propping up a weak verb" });
    return "";
  });
}

/**
 * Splits a sentence nobody could say in one breath, but only at a coordinating
 * conjunction joining two independent clauses — the one split that cannot
 * strand a fragment.
 */
function breakLongSentences(text: string, edits: Edit[]): string {
  const sentences = splitSentences(text);
  let out = text;

  for (const sentence of sentences) {
    if (sentence.longestRun <= 18 && sentence.words.length <= 30) continue;

    const match = sentence.text.match(/^(.{40,}?),\s+(and|but|so)\s+(\w)/i);
    if (!match) continue;

    const replacement = `${match[1]}. ${match[3].toUpperCase()}`;
    const original = `${match[1]}, ${match[2]} ${match[3]}`;
    if (!out.includes(original)) continue;

    out = out.replace(original, replacement);
    edits.push({
      before: `…${match[2]}…`,
      label: `split a ${sentence.words.length}-word sentence you could not say in one breath`,
    });
  }

  return out;
}

const PASSIVE_SPAN = /\b(?:was|were|is|are|been|being|be)\s+(?:\w+ed|made|given|taken|done|seen|told|held|known|shown|built|left|kept|sent|brought|written|driven|chosen|found|put|set)\b/gi;

function buildPrompts(text: string, sentences: Sentence[]): Prompt[] {
  const prompts: Prompt[] = [];

  // Abstractions: only the writer knows the event underneath.
  const abstractions = [
    ...new Set(
      (text.match(/[A-Za-z][A-Za-z'’-]*/g) ?? []).filter((w) => {
        const lower = w.toLowerCase();
        return (
          ABSTRACT_WORDS.has(lower) ||
          (ABSTRACT_SUFFIX.test(lower) && !ABSTRACT_EXCEPTIONS.has(lower))
        );
      })
    ),
  ].slice(0, 4);

  for (const word of abstractions) {
    const carrier = sentences.find((s) => s.words.includes(word.toLowerCase()));
    prompts.push({
      id: `abstract-${word.toLowerCase()}`,
      label: `Replace “${word}”`,
      quote: carrier?.text,
      ask: `What actually happened, that you are calling ${word.toLowerCase()}? Name the day, the person, and the object in their hands. Write that instead.`,
    });
  }

  // Passive voice: the actor is missing and only they know who it is.
  for (const span of [...new Set(text.match(PASSIVE_SPAN) ?? [])].slice(0, 2)) {
    const carrier = sentences.find((s) => s.text.toLowerCase().includes(span.toLowerCase()));
    prompts.push({
      id: `passive-${span.toLowerCase().replace(/\s+/g, "-")}`,
      label: `Who did it? “${span}”`,
      quote: carrier?.text,
      ask: "Passive voice removes the actor. Put the name back in front of the verb — especially if the name is yours.",
    });
  }

  // A landing: the last line is the one they will remember.
  const last = sentences[sentences.length - 1];
  if (last && last.words.length > 6) {
    prompts.push({
      id: "landing",
      label: `Your last line runs ${last.words.length} words`,
      quote: last.text,
      ask: "Endings carry more weight than anything in the middle. Cut this to four words, and make the final word a noun or a verb.",
    });
  }

  return prompts;
}

export function rework(text: string): Rework {
  const edits: Edit[] = [];
  const sentences = splitSentences(text);

  let out = text;
  out = cutPhrases(out, HEDGES, "hedge asking permission for the sentence", edits);
  out = cutPhrases(out, FILLER, "filler buying time you do not need", edits);
  out = cutPhrases(out, INTENSIFIERS, "intensifier doing the verb's job", edits);
  out = cutPhrases(out, CLICHES, "phrase the room can finish for you", edits);
  out = cutAdverbs(out, edits);
  out = breakLongSentences(out, edits);

  return {
    rewritten: tidy(out),
    edits,
    prompts: buildPrompts(text, sentences),
  };
}

// ------------------------------------------------------------------- anchors

export interface AnchorField {
  id: string;
  placeholder: string;
  seed: string;
}

export interface Anchor {
  id: string;
  title: string;
  why: string;
  /** Lines holding {fieldId} markers. */
  lines: string[];
  fields: AnchorField[];
  hint: string;
}

const STOPWORDS = new Set([
  "the", "and", "for", "that", "this", "with", "from", "have", "has", "had",
  "was", "were", "are", "our", "their", "they", "them", "you", "your", "his",
  "her", "its", "not", "but", "all", "any", "can", "will", "would", "could",
  "should", "been", "being", "into", "than", "then", "when", "what", "who",
  "how", "why", "did", "does", "done", "get", "got", "out", "about", "over",
  "just", "one", "two", "more", "most", "some", "such", "only", "own", "same",
  "too", "very", "now", "also", "because", "after", "before", "while", "here",
  "there", "these", "those", "which", "were", "each", "every", "off",
]);

function syllables(word: string): number {
  const groups = word.toLowerCase().replace(/e$/, "").match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

// Frequent words are not the same as the words a draft is about: "again",
// "anyone" and "basically" all rank high and none of them can head a list.
const NOT_A_NOUN = new Set([
  "again", "anyone", "anything", "someone", "something", "everyone",
  "everything", "nothing", "nobody", "really", "basically", "honestly",
  "actually", "literally", "obviously", "need", "needs", "want", "wants",
  "going", "make", "makes", "made", "take", "takes", "start", "starts",
  "come", "comes", "know", "knows", "think", "thinks", "said", "says",
  "without", "still", "even", "much", "many", "since", "around", "though",
  "always", "never", "better", "worse", "enough", "whole", "another",
]);

/**
 * The words a draft is actually about. Two cheap signals stand in for a
 * part-of-speech tagger: a word straight after a determiner is nearly always
 * a noun, and so is one carrying a noun suffix. Words hit by both rank
 * highest, since the two signals agreeing is the strongest evidence there is
 * without parsing the sentence.
 */
function keyNouns(text: string, limit: number): string[] {
  const candidates: string[] = [];

  const determiner =
    /\b(?:the|a|an|our|their|its|his|her|my|your|this|that|these|those)\s+(?:[a-z]+\s+)?([a-z][a-z'’-]{3,})\b/gi;
  for (const match of text.matchAll(determiner)) candidates.push(match[1].toLowerCase());

  for (const w of wordsOf(text)) {
    if (ABSTRACT_WORDS.has(w)) candidates.push(w);
    else if (ABSTRACT_SUFFIX.test(w) && !ABSTRACT_EXCEPTIONS.has(w)) candidates.push(w);
    if (CONCRETE_WORDS.has(w)) candidates.push(w);
  }

  const counts = new Map<string, number>();
  for (const w of candidates) {
    if (w.length < 4 || STOPWORDS.has(w) || NOT_A_NOUN.has(w)) continue;
    if (w.endsWith("ly") && !LY_EXCEPTIONS.has(w)) continue;
    counts.set(w, (counts.get(w) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([w]) => w)
    .sort((a, b) => syllables(a) - syllables(b) || a.length - b.length);
}

/** However they already start their sentences — the drumbeat should sound like them. */
function dominantOpening(sentences: Sentence[]): string {
  const tally = (wordCount: number) => {
    const counts = new Map<string, number>();
    for (const s of sentences) {
      const opening = s.text
        .split(/\s+/)
        .slice(0, wordCount)
        .join(" ")
        .replace(/[,.;:]$/, "");
      if (opening) counts.set(opening, (counts.get(opening) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  };

  // Prefer an opening they already repeat; a two-word phrase only counts when
  // it actually recurs, otherwise the seed is just their first two words.
  const pair = tally(2);
  if (pair && pair[1] >= 2) return pair[0];

  const single = tally(1);
  if (single && single[1] >= 2) return single[0];

  return single ? single[0] : "We were told";
}

/**
 * Builds a scaffold for each device the draft is missing, seeded with the
 * writer's own subject and nouns so it slots into what they already wrote
 * instead of replacing it.
 */
export function buildAnchors(text: string): Anchor[] {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return [];

  const lower = text.toLowerCase();
  const devices = detectDevices(sentences, lower);
  const nouns = keyNouns(text, 3);
  const opening = dominantOpening(sentences);
  const anchors: Anchor[] = [];

  if (devices.anaphora.length === 0) {
    anchors.push({
      id: "anaphora",
      title: "A drumbeat",
      why: "Three sentences opening the same way. The first reads as coincidence, the second as pattern; by the third the room is ahead of you.",
      lines: ["{phrase} {one}.", "{phrase} {two}.", "{phrase} {three}.", "{break}"],
      fields: [
        { id: "phrase", placeholder: "the repeated opening", seed: opening },
        { id: "one", placeholder: "the first thing", seed: "" },
        { id: "two", placeholder: "the second thing", seed: "" },
        { id: "three", placeholder: "the third — make it the shortest", seed: "" },
        { id: "break", placeholder: "then break the pattern", seed: "" },
      ],
      hint: "Keep the repeated phrase plain. The fourth line is where this is won: it must not use the phrase.",
    });
  }

  if (devices.antithesis.length === 0) {
    anchors.push({
      id: "antithesis",
      title: "A turn",
      why: "Name what the room already believes, kill it, and install yours — in two matched frames.",
      lines: ["This is not {wrong}.", "It is {right}."],
      fields: [
        { id: "wrong", placeholder: "what they assume it is", seed: nouns[nouns.length - 1] ?? "" },
        { id: "right", placeholder: "what it actually is", seed: "" },
      ],
      hint: "Make both halves nearly the same length. The more the frames match, the harder the turn lands.",
    });
  }

  if (devices.tricolon.length === 0) {
    anchors.push({
      id: "tricolon",
      title: "Three, heaviest last",
      why: "Two items is a pair and four is a list. Three closes, and the last one is the one you actually mean.",
      lines: ["{frame} {a}, {b}, and {c}."],
      fields: [
        { id: "frame", placeholder: "the frame", seed: "It cost us" },
        { id: "a", placeholder: "lightest", seed: nouns[0] ?? "" },
        { id: "b", placeholder: "heavier", seed: nouns[1] ?? "" },
        { id: "c", placeholder: "the one that costs most to say", seed: nouns[2] ?? "" },
      ],
      hint: "Order by weight, shortest first. If the item you mean is not last, move it.",
    });
  }

  if (devices.address === 0) {
    anchors.push({
      id: "address",
      title: "Speak to them",
      why: "Not one “you” in the draft, which is what makes it read as a report rather than something said to people.",
      lines: ["{line}"],
      fields: [
        {
          id: "line",
          placeholder: "one sentence addressed to the room",
          seed: sentences[0] ? sentences[0].text : "",
        },
      ],
      hint: "Rewrite one sentence you already have so it speaks to them directly.",
    });
  }

  const hasShort = sentences.some((s) => s.words.length <= 5);
  if (!hasShort) {
    const longest = sentences.reduce((a, b) => (b.words.length > a.words.length ? b : a));
    anchors.push({
      id: "drop",
      title: "The drop",
      why: `Nothing here is under six words, so nothing lands. Your longest runs ${longest.words.length}.`,
      lines: ["{line}"],
      fields: [
        { id: "line", placeholder: "four words, no more", seed: "" },
      ],
      hint: "Put it immediately after your longest sentence. Build, build, then drop.",
    });
  }

  return anchors;
}

/** Fills a scaffold in, leaving visible blanks for anything still empty. */
export function renderAnchor(anchor: Anchor, values: Record<string, string>): string {
  return anchor.lines
    .map((line) =>
      line.replace(/\{(\w+)\}/g, (_m, id: string) => {
        const value = (values[id] ?? "").trim();
        if (value) return value;
        const field = anchor.fields.find((f) => f.id === id);
        return `___${field ? ` (${field.placeholder})` : ""}`;
      })
    )
    .map((line) => line.replace(/\s+([,.])/g, "$1").trim())
    .filter((line) => line !== "___" && line.length > 0)
    .join(" ");
}
