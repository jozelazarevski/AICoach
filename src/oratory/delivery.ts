import { wordsOf } from "./analyze";

// Spoken delivery: how it sounded, not what it said. The scoring half of this
// file is pure so it can be tested without a microphone; the capture half
// wraps getUserMedia, an AnalyserNode, and the browser speech recognizer.

export type DeliveryDimension = "pace" | "pauses" | "dynamics" | "fillers";

export const DELIVERY_LABEL: Record<DeliveryDimension, string> = {
  pace: "Pace",
  pauses: "Pauses",
  dynamics: "Range",
  fillers: "Filler",
};

export interface DeliveryCapture {
  /** RMS amplitude per sample, 0..1, evenly spaced. */
  samples: number[];
  /** Samples per second. */
  sampleHz: number;
  /** What the recognizer heard. Empty when the browser has no recognizer. */
  transcript: string;
  /** Used for pace when there is no transcript — e.g. the script's word count. */
  assumedWords?: number;
}

export interface DeliveryMetrics {
  durationSeconds: number;
  /** First word to last word, internal pauses included. */
  speakingSeconds: number;
  words: number;
  wordsPerMinute: number;
  /** Every silence of 0.35s or longer between the first and last word. */
  pauses: number[];
  heldPauses: number;
  longestPause: number;
  pausesPerMinute: number;
  /** Spread between the loud and quiet parts of your speech, in dB. */
  dynamicRangeDb: number;
  fillerCount: number;
  fillersPerMinute: number;
  fillersFound: string[];
  /** Silence after the last word — the landing. */
  trailingSilence: number;
  hasTranscript: boolean;
  /** Nothing above the noise floor: no usable recording. */
  silent: boolean;
}

export interface DeliveryFinding {
  kind: "strength" | "fix";
  dimension: DeliveryDimension;
  label: string;
  note: string;
}

export interface DeliveryScore {
  dimension: DeliveryDimension;
  score: number;
  detail: string;
}

export interface DeliveryReport {
  overall: number;
  metrics: DeliveryMetrics;
  scores: DeliveryScore[];
  findings: DeliveryFinding[];
}

// Recognizers vary in how much disfluency they transcribe, so this list stays
// broad: the verbal tics that survive transcription are worth catching too.
const SPOKEN_FILLERS = [
  "um", "uhm", "uh", "erm", "er", "ah", "hmm", "mmm",
  "you know", "i mean", "sort of", "kind of", "like i said",
  "basically", "actually", "literally", "obviously", "honestly",
];

const MIN_PAUSE = 0.35;
const HELD_PAUSE = 1.0;
/** Below this gap between loud and quiet, the recording holds no speech. */
const MIN_SEPARATION_DB = 8;

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0;
  const idx = clamp(Math.round((p / 100) * (sorted.length - 1)), 0, sorted.length - 1);
  return sorted[idx];
}

function toDb(rms: number): number {
  return 20 * Math.log10(Math.max(rms, 1e-6));
}

/**
 * Otsu's method: split the loudness samples into two classes — room and voice —
 * at the point that maximizes the separation between them. A percentile cannot
 * do this job, because how much of a recording is silence is exactly what
 * varies between a measured delivery and someone talking without breathing.
 */
export function otsuThreshold(values: number[]): number {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max - min < 1e-6) return min;

  const BINS = 64;
  const hist = new Array<number>(BINS).fill(0);
  for (const v of values) {
    const idx = Math.min(BINS - 1, Math.floor(((v - min) / (max - min)) * BINS));
    hist[idx]++;
  }

  const total = values.length;
  let sumAll = 0;
  for (let i = 0; i < BINS; i++) sumAll += i * hist[i];

  let weightLow = 0;
  let sumLow = 0;
  let best = -1;
  let bestBin = 0;
  for (let i = 0; i < BINS; i++) {
    weightLow += hist[i];
    if (weightLow === 0) continue;
    const weightHigh = total - weightLow;
    if (weightHigh === 0) break;
    sumLow += i * hist[i];
    const meanLow = sumLow / weightLow;
    const meanHigh = (sumAll - sumLow) / weightHigh;
    const between = weightLow * weightHigh * (meanLow - meanHigh) ** 2;
    if (between > best) {
      best = between;
      bestBin = i;
    }
  }

  return min + ((bestBin + 1) / BINS) * (max - min);
}

export function countFillers(transcript: string): { count: number; found: string[] } {
  const lower = ` ${transcript.toLowerCase().replace(/[^a-z\s']/g, " ").replace(/\s+/g, " ")} `;
  const found: string[] = [];
  let count = 0;
  for (const filler of SPOKEN_FILLERS) {
    const matches = lower.match(new RegExp(`\\s${filler}\\s`, "g"));
    if (matches) {
      count += matches.length;
      found.push(filler);
    }
  }
  return { count, found };
}

export function measure(capture: DeliveryCapture): DeliveryMetrics {
  const { samples, sampleHz, transcript } = capture;
  const duration = sampleHz > 0 ? samples.length / sampleHz : 0;
  const filler = countFillers(transcript);
  const transcriptWords = wordsOf(transcript).length;
  const hasTranscript = transcriptWords > 0;
  const words = hasTranscript ? transcriptWords : capture.assumedWords ?? 0;

  const empty: DeliveryMetrics = {
    durationSeconds: duration,
    speakingSeconds: 0,
    words,
    wordsPerMinute: 0,
    pauses: [],
    heldPauses: 0,
    longestPause: 0,
    pausesPerMinute: 0,
    dynamicRangeDb: 0,
    fillerCount: filler.count,
    fillersPerMinute: 0,
    fillersFound: filler.found,
    trailingSilence: duration,
    hasTranscript,
    silent: true,
  };

  if (samples.length < 4 || sampleHz <= 0) return empty;

  const dbs = samples.map(toDb);
  const sorted = [...dbs].sort((a, b) => a - b);
  const peak = percentile(sorted, 95);
  const floor = sorted[0];

  // Without separation between loud and quiet there is no speech here, only
  // room tone.
  if (peak - floor < MIN_SEPARATION_DB) return empty;

  // Sit just above the room class, so that deliberately quiet delivery still
  // counts as speech rather than registering as a pause.
  const threshold = Math.min(otsuThreshold(dbs) + 1, peak - 3);
  const speaking = dbs.map((db) => db >= threshold);

  const first = speaking.indexOf(true);
  const last = speaking.lastIndexOf(true);
  if (first === -1 || last <= first) return empty;

  const speakingSeconds = (last - first + 1) / sampleHz;

  // Internal silences only: leading and trailing silence are not pauses.
  const pauses: number[] = [];
  let runStart = -1;
  for (let i = first; i <= last; i++) {
    if (!speaking[i]) {
      if (runStart === -1) runStart = i;
    } else if (runStart !== -1) {
      const seconds = (i - runStart) / sampleHz;
      if (seconds >= MIN_PAUSE) pauses.push(seconds);
      runStart = -1;
    }
  }

  const speechDbs = dbs.filter((_, i) => i >= first && i <= last && speaking[i]).sort((a, b) => a - b);
  const dynamicRangeDb = Math.max(0, percentile(speechDbs, 90) - percentile(speechDbs, 20));

  const minutes = speakingSeconds / 60;
  return {
    durationSeconds: duration,
    speakingSeconds,
    words,
    wordsPerMinute: minutes > 0 ? words / minutes : 0,
    pauses,
    heldPauses: pauses.filter((p) => p >= HELD_PAUSE).length,
    longestPause: pauses.length ? Math.max(...pauses) : 0,
    pausesPerMinute: minutes > 0 ? pauses.length / minutes : 0,
    dynamicRangeDb,
    fillerCount: filler.count,
    fillersPerMinute: minutes > 0 ? filler.count / minutes : 0,
    fillersFound: filler.found,
    trailingSilence: (samples.length - 1 - last) / sampleHz,
    hasTranscript,
    silent: false,
  };
}

/** 105-145 words a minute is the band where a room can follow you. */
export function scorePace(wpm: number): number {
  if (wpm <= 0) return 0;
  if (wpm >= 105 && wpm <= 145) return 100;
  if (wpm < 105) return clamp(100 - (105 - wpm) * 1.6);
  return clamp(100 - (wpm - 145) * 1.7);
}

/** A pause every five to ten seconds, and at least one you actually held. */
export function scorePauses(pausesPerMinute: number, heldPauses: number): number {
  let base: number;
  if (pausesPerMinute >= 6 && pausesPerMinute <= 14) base = 70;
  else if (pausesPerMinute < 6) base = clamp(70 - (6 - pausesPerMinute) * 11, 0, 70);
  else base = clamp(70 - (pausesPerMinute - 14) * 6, 0, 70);

  return clamp(base + Math.min(heldPauses, 2) * 15);
}

/** Below about 4 dB of range the voice is a monotone, whatever the words do. */
export function scoreDynamics(rangeDb: number): number {
  if (rangeDb <= 0) return 0;
  return clamp(((rangeDb - 3) / 11) * 80 + 20);
}

export function scoreFillers(fillersPerMinute: number): number {
  return clamp(100 - fillersPerMinute * 13);
}

export function analyzeDelivery(capture: DeliveryCapture): DeliveryReport {
  const metrics = measure(capture);

  if (metrics.silent) {
    return {
      overall: 0,
      metrics,
      scores: [],
      findings: [
        {
          kind: "fix",
          dimension: "dynamics",
          label: "Nothing came through",
          note: "The recording has no speech above the room noise. Check the microphone permission, get closer to the mic, and try again.",
        },
      ],
    };
  }

  // With no transcript the word count is the script's, not what was actually
  // said, so a part-read looks like a sprint. Trust the number enough to report
  // it, not enough to fail someone on it.
  const paceScore = metrics.hasTranscript
    ? scorePace(metrics.wordsPerMinute)
    : Math.max(40, scorePace(metrics.wordsPerMinute));

  // No transcript and no script means no word count, and a pace of zero would
  // be a measurement we never made.
  const paceMeasurable = metrics.words > 0;

  const scores: DeliveryScore[] = [
    ...(paceMeasurable
      ? [
          {
            dimension: "pace" as const,
            score: Math.round(paceScore),
            detail: `${Math.round(metrics.wordsPerMinute)} words a minute${metrics.hasTranscript ? "" : " (estimated: assumes you read the whole script)"}`,
          },
        ]
      : []),
    {
      dimension: "pauses",
      score: Math.round(scorePauses(metrics.pausesPerMinute, metrics.heldPauses)),
      detail: `${metrics.pauses.length} pause${metrics.pauses.length === 1 ? "" : "s"}, longest ${metrics.longestPause.toFixed(1)}s`,
    },
    {
      dimension: "dynamics",
      score: Math.round(scoreDynamics(metrics.dynamicRangeDb)),
      detail: `${metrics.dynamicRangeDb.toFixed(1)} dB between your loud and quiet`,
    },
  ];

  if (metrics.hasTranscript) {
    scores.push({
      dimension: "fillers",
      score: Math.round(scoreFillers(metrics.fillersPerMinute)),
      detail: metrics.fillerCount
        ? `${metrics.fillerCount} heard: ${metrics.fillersFound.slice(0, 4).join(", ")}`
        : "none heard",
    });
  }

  const findings: DeliveryFinding[] = [];

  // --- pace
  const estimateCaveat = metrics.hasTranscript
    ? ""
    : " This one is estimated from the script's length, so it only holds if you delivered the whole thing.";

  if (!paceMeasurable) {
    findings.push({
      kind: "fix",
      dimension: "pace",
      label: "Pace could not be measured",
      note: "This browser gave no transcript and the drill has no script, so there is no word count to time. Pauses and range below are measured from the audio and stand on their own; for pace, use a browser with speech recognition, such as Chrome or Safari.",
    });
  } else if (metrics.wordsPerMinute > 165) {
    findings.push({
      kind: "fix",
      dimension: "pace",
      label: `Rushing at ${Math.round(metrics.wordsPerMinute)} words a minute`,
      note: `Above about 160 the room stops hearing individual sentences. Slow down on the part that costs you something to say — that is usually where the speeding starts.${estimateCaveat}`,
    });
  } else if (metrics.wordsPerMinute > 0 && metrics.wordsPerMinute < 95) {
    findings.push({
      kind: "fix",
      dimension: "pace",
      label: `Dragging at ${Math.round(metrics.wordsPerMinute)} words a minute`,
      note: `Slow is only weighty after something fast. Pick up the context and save the slowness for the consequence.${estimateCaveat}`,
    });
  } else {
    findings.push({
      kind: "strength",
      dimension: "pace",
      label: `${Math.round(metrics.wordsPerMinute)} words a minute`,
      note: "That is inside the band where a room can follow you without effort.",
    });
  }

  // --- pauses
  if (metrics.heldPauses === 0) {
    findings.push({
      kind: "fix",
      dimension: "pauses",
      label: "No pause longer than a second",
      note: `Your longest silence was ${metrics.longestPause.toFixed(1)}s. Stop before the most important phrase and count two. It will feel like a collapse and sound like composure.`,
    });
  } else {
    findings.push({
      kind: "strength",
      dimension: "pauses",
      label: `${metrics.heldPauses} held pause${metrics.heldPauses === 1 ? "" : "s"}`,
      note: `The longest ran ${metrics.longestPause.toFixed(1)}s. That silence is doing more work than any adjective you could have put there.`,
    });
  }
  if (metrics.pausesPerMinute > 20) {
    findings.push({
      kind: "fix",
      dimension: "pauses",
      label: "Broken into fragments",
      note: "You stopped every couple of seconds. That reads as searching for the line rather than choosing to wait. Write the sentence you want and run it whole.",
    });
  }

  // --- dynamics
  if (metrics.dynamicRangeDb < 5) {
    findings.push({
      kind: "fix",
      dimension: "dynamics",
      label: `Flat: ${metrics.dynamicRangeDb.toFixed(1)} dB of range`,
      note: "You stayed in a narrow band the whole way through. Pick one sentence and deliver it quieter than everything around it — dropping works better than pushing.",
    });
  } else if (metrics.dynamicRangeDb >= 9) {
    findings.push({
      kind: "strength",
      dimension: "dynamics",
      label: `${metrics.dynamicRangeDb.toFixed(1)} dB of range`,
      note: "Your voice moved. That range is what stops a room habituating to you.",
    });
  }

  // --- filler
  if (metrics.hasTranscript && metrics.fillersPerMinute >= 4) {
    findings.push({
      kind: "fix",
      dimension: "fillers",
      label: `${metrics.fillerCount} filler word${metrics.fillerCount === 1 ? "" : "s"}`,
      note: `${metrics.fillersFound.slice(0, 3).join(", ")} — each one is a pause you were too uncomfortable to take. Close your mouth instead and let the gap happen.`,
    });
  } else if (metrics.hasTranscript && metrics.fillerCount === 0) {
    findings.push({
      kind: "strength",
      dimension: "fillers",
      label: "No filler",
      note: "Nothing padding the gaps. That is the difference people hear as authority.",
    });
  }

  findings.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "fix" ? -1 : 1));

  const overall = Math.round(
    scores.reduce((a, s) => a + s.score, 0) / (scores.length || 1)
  );

  return { overall, metrics, scores, findings };
}

// ------------------------------------------------------------------- capture

export interface RecorderHandle {
  stop: () => Promise<DeliveryCapture>;
}

export interface RecorderOptions {
  /** Called ~20x a second with the current level, 0..1, for the meter. */
  onLevel?: (level: number) => void;
  /** Called as the recognizer produces text, when one is available. */
  onTranscript?: (text: string) => void;
}

export function speechRecognitionAvailable(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return Boolean(w.SpeechRecognition || w.webkitSpeechRecognition);
}

export function micAvailable(): boolean {
  return (
    typeof navigator !== "undefined" &&
    Boolean(navigator.mediaDevices?.getUserMedia) &&
    typeof window !== "undefined" &&
    Boolean((window as any).AudioContext || (window as any).webkitAudioContext)
  );
}

const SAMPLE_HZ = 20;

/**
 * Starts the microphone and, where the browser has one, the speech recognizer.
 * Resolves once recording is live; the returned handle stops it and hands back
 * everything measured.
 */
export async function startRecording(options: RecorderOptions = {}): Promise<RecorderHandle> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
  const ctx: AudioContext = new AudioCtx();
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  source.connect(analyser);

  const buffer = new Float32Array(analyser.fftSize);
  const samples: number[] = [];

  const tick = () => {
    analyser.getFloatTimeDomainData(buffer);
    let sum = 0;
    for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
    const rms = Math.sqrt(sum / buffer.length);
    samples.push(rms);
    options.onLevel?.(Math.min(1, rms * 8));
  };

  const timer = setInterval(tick, 1000 / SAMPLE_HZ);

  // Speech recognition is best-effort: Chrome and Safari have it, Firefox does
  // not, and none of them transcribe every disfluency. Audio analysis carries
  // the drill either way.
  let recognition: any = null;
  let transcript = "";
  const w = window as any;
  const Recognition = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (Recognition) {
    try {
      recognition = new Recognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = navigator.language || "en-US";
      recognition.onresult = (event: any) => {
        let finalText = "";
        let interim = "";
        for (let i = 0; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) finalText += `${result[0].transcript} `;
          else interim += result[0].transcript;
        }
        transcript = finalText.trim();
        options.onTranscript?.(`${finalText}${interim}`.trim());
      };
      recognition.onerror = () => {
        // Permission or network trouble: leave the transcript empty and let the
        // audio metrics stand on their own.
      };
      recognition.start();
    } catch {
      recognition = null;
    }
  }

  let stopped = false;

  return {
    stop: async () => {
      if (stopped) return { samples, sampleHz: SAMPLE_HZ, transcript };
      stopped = true;
      clearInterval(timer);

      if (recognition) {
        // The recognizer often emits its last final result after stop().
        await new Promise<void>((resolve) => {
          const done = () => resolve();
          recognition.onend = done;
          try {
            recognition.stop();
          } catch {
            resolve();
          }
          setTimeout(done, 900);
        });
      }

      stream.getTracks().forEach((t) => t.stop());
      try {
        await ctx.close();
      } catch {
        // already closed
      }

      return { samples, sampleHz: SAMPLE_HZ, transcript };
    },
  };
}
