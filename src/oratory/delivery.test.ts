import { describe, it, expect } from "vitest";
import {
  analyzeDelivery,
  countFillers,
  measure,
  otsuThreshold,
  scoreDynamics,
  scoreFillers,
  scorePace,
  scorePauses,
} from "./delivery";

const HZ = 20;

interface Segment {
  /** RMS level: use 0.0005 for silence. */
  level: number;
  seconds: number;
}

function build(segments: Segment[]): number[] {
  const samples: number[] = [];
  for (const seg of segments) {
    const n = Math.round(seg.seconds * HZ);
    for (let i = 0; i < n; i++) {
      // A little jitter so the percentiles behave like real audio.
      samples.push(seg.level * (0.92 + (i % 5) * 0.04));
    }
  }
  return samples;
}

const SILENCE = 0.0005;

/** Sixty seconds of speech with three internal pauses. */
function steadySpeech(): number[] {
  return build([
    { level: SILENCE, seconds: 1 },
    { level: 0.1, seconds: 12 },
    { level: SILENCE, seconds: 1.5 },
    { level: 0.1, seconds: 15 },
    { level: SILENCE, seconds: 0.6 },
    { level: 0.1, seconds: 14 },
    { level: SILENCE, seconds: 0.8 },
    { level: 0.1, seconds: 13 },
    { level: SILENCE, seconds: 2 },
  ]);
}

describe("otsuThreshold", () => {
  it("lands between the two clusters whatever their proportions", () => {
    for (const roomCount of [5, 50, 400]) {
      const values = [
        ...Array.from({ length: roomCount }, () => -66),
        ...Array.from({ length: 300 }, () => -20),
      ];
      const t = otsuThreshold(values);
      expect(t).toBeGreaterThan(-66);
      expect(t).toBeLessThan(-20);
    }
  });

  it("keeps quiet speech on the speech side of a three-level recording", () => {
    const values = [
      ...Array.from({ length: 20 }, () => -66), // room
      ...Array.from({ length: 160 }, () => -26), // quiet delivery
      ...Array.from({ length: 280 }, () => -13), // normal delivery
    ];
    expect(otsuThreshold(values)).toBeLessThan(-26);
  });

  it("returns the value itself when every sample is identical", () => {
    expect(otsuThreshold([-40, -40, -40])).toBe(-40);
  });
});

describe("measure", () => {
  it("reports silence when nothing rises above the room", () => {
    const m = measure({ samples: build([{ level: SILENCE, seconds: 10 }]), sampleHz: HZ, transcript: "" });
    expect(m.silent).toBe(true);
    expect(m.wordsPerMinute).toBe(0);
  });

  it("reports silence for an empty capture", () => {
    expect(measure({ samples: [], sampleHz: HZ, transcript: "" }).silent).toBe(true);
  });

  it("finds internal pauses but not the leading or trailing silence", () => {
    const m = measure({ samples: steadySpeech(), sampleHz: HZ, transcript: "" });
    expect(m.silent).toBe(false);
    expect(m.pauses).toHaveLength(3);
    expect(m.longestPause).toBeCloseTo(1.5, 1);
    expect(m.heldPauses).toBe(1); // only the 1.5s clears a full second
    expect(m.trailingSilence).toBeGreaterThan(1.5);
  });

  it("measures speaking time from first word to last", () => {
    const m = measure({ samples: steadySpeech(), sampleHz: HZ, transcript: "" });
    // 54s of content + 2.9s of internal pause, excluding the 1s and 2s edges.
    expect(m.speakingSeconds).toBeGreaterThan(55);
    expect(m.speakingSeconds).toBeLessThan(58);
    expect(m.durationSeconds).toBeCloseTo(59.9, 0);
  });

  it("computes pace from the transcript when there is one", () => {
    const transcript = Array.from({ length: 120 }, () => "word").join(" ");
    const m = measure({ samples: steadySpeech(), sampleHz: HZ, transcript });
    expect(m.hasTranscript).toBe(true);
    expect(m.words).toBe(120);
    expect(m.wordsPerMinute).toBeGreaterThan(115);
    expect(m.wordsPerMinute).toBeLessThan(135);
  });

  it("falls back to the script's word count with no transcript", () => {
    const m = measure({
      samples: steadySpeech(),
      sampleHz: HZ,
      transcript: "",
      assumedWords: 120,
    });
    expect(m.hasTranscript).toBe(false);
    expect(m.words).toBe(120);
    expect(m.wordsPerMinute).toBeGreaterThan(110);
  });

  it("detects a flat delivery as near-zero range", () => {
    const m = measure({
      samples: build([
        { level: SILENCE, seconds: 1 },
        { level: 0.1, seconds: 20 },
      ]),
      sampleHz: HZ,
      transcript: "",
    });
    expect(m.dynamicRangeDb).toBeLessThan(2);
  });

  it("detects a delivery that moves between loud and quiet", () => {
    const m = measure({
      samples: build([
        { level: SILENCE, seconds: 1 },
        { level: 0.22, seconds: 8 },
        { level: 0.05, seconds: 8 },
        { level: 0.22, seconds: 6 },
      ]),
      sampleHz: HZ,
      transcript: "",
    });
    expect(m.dynamicRangeDb).toBeGreaterThan(8);
  });
});

describe("filler counting", () => {
  it("catches spoken tics with surrounding words", () => {
    const { count, found } = countFillers(
      "so um I think we should, you know, basically start over, uh, today"
    );
    expect(count).toBeGreaterThanOrEqual(4);
    expect(found).toContain("um");
    expect(found).toContain("you know");
  });

  it("does not match filler inside longer words", () => {
    expect(countFillers("the umbrella erupted and the alumni arrived").count).toBe(0);
  });

  it("returns zero for clean speech", () => {
    expect(countFillers("We were wrong. Next quarter we do one thing.").count).toBe(0);
  });
});

describe("dimension scoring", () => {
  it("scores the conversational pace band at full marks", () => {
    expect(scorePace(120)).toBe(100);
    expect(scorePace(105)).toBe(100);
    expect(scorePace(145)).toBe(100);
  });

  it("penalizes rushing more than dragging at the same distance", () => {
    expect(scorePace(185)).toBeLessThan(scorePace(65));
    expect(scorePace(0)).toBe(0);
  });

  it("rewards held pauses on top of a reasonable rate", () => {
    expect(scorePauses(9, 0)).toBe(70);
    expect(scorePauses(9, 2)).toBe(100);
    expect(scorePauses(0, 0)).toBe(4);
    expect(scorePauses(30, 0)).toBeLessThan(40);
  });

  it("treats a narrow band as a monotone", () => {
    expect(scoreDynamics(2)).toBeLessThan(20);
    expect(scoreDynamics(14)).toBe(100);
  });

  it("scales filler penalties per minute", () => {
    expect(scoreFillers(0)).toBe(100);
    expect(scoreFillers(4)).toBe(48);
    expect(scoreFillers(10)).toBe(0);
  });
});

describe("analyzeDelivery", () => {
  it("explains a silent recording instead of scoring it", () => {
    const report = analyzeDelivery({
      samples: build([{ level: SILENCE, seconds: 5 }]),
      sampleHz: HZ,
      transcript: "",
    });
    expect(report.overall).toBe(0);
    expect(report.findings[0].label).toMatch(/Nothing came through/);
  });

  it("will not fail someone on a pace it only estimated", () => {
    // Stopped a third of the way through a 200-word script: the estimate says
    // 300 wpm, but nobody actually spoke 200 words here.
    const report = analyzeDelivery({
      samples: build([
        { level: SILENCE, seconds: 0.5 },
        { level: 0.1, seconds: 40 },
      ]),
      sampleHz: HZ,
      transcript: "",
      assumedWords: 200,
    });
    const pace = report.scores.find((s) => s.dimension === "pace")!;
    expect(pace.score).toBe(40);
    expect(pace.detail).toContain("estimated");
    expect(
      report.findings.find((f) => f.dimension === "pace")?.note
    ).toContain("estimated from the script");
  });

  it("omits pace entirely when there is no word count at all", () => {
    const report = analyzeDelivery({
      samples: steadySpeech(),
      sampleHz: HZ,
      transcript: "",
    });
    expect(report.scores.map((s) => s.dimension)).not.toContain("pace");
    expect(report.findings.some((f) => f.label === "Pace could not be measured")).toBe(true);
    // The audio measurements still stand on their own.
    expect(report.scores.map((s) => s.dimension)).toContain("pauses");
    expect(report.overall).toBeGreaterThan(0);
  });

  it("omits the filler dimension when there is no transcript", () => {
    const report = analyzeDelivery({
      samples: steadySpeech(),
      sampleHz: HZ,
      transcript: "",
      assumedWords: 115,
    });
    expect(report.scores.map((s) => s.dimension)).not.toContain("fillers");
    expect(report.scores).toHaveLength(3);
  });

  it("scores a measured delivery well and names its strengths", () => {
    const transcript = Array.from({ length: 115 }, () => "word").join(" ");
    const report = analyzeDelivery({
      samples: build([
        { level: SILENCE, seconds: 1 },
        { level: 0.2, seconds: 14 },
        { level: SILENCE, seconds: 1.4 },
        { level: 0.07, seconds: 12 },
        { level: SILENCE, seconds: 1.2 },
        { level: 0.2, seconds: 13 },
        { level: SILENCE, seconds: 0.7 },
        { level: 0.09, seconds: 14 },
        { level: SILENCE, seconds: 2 },
      ]),
      sampleHz: HZ,
      transcript,
    });
    expect(report.overall).toBeGreaterThan(70);
    expect(report.findings.some((f) => f.kind === "strength" && f.dimension === "pauses")).toBe(true);
    expect(report.findings.some((f) => f.kind === "strength" && f.dimension === "dynamics")).toBe(true);
  });

  it("flags a fast, flat, filler-heavy run", () => {
    const transcript = `${Array.from({ length: 200 }, () => "word").join(" ")} um you know uh basically um uh`;
    const report = analyzeDelivery({
      samples: build([
        { level: SILENCE, seconds: 0.5 },
        { level: 0.1, seconds: 59 },
      ]),
      sampleHz: HZ,
      transcript,
    });
    const fixes = report.findings.filter((f) => f.kind === "fix").map((f) => f.dimension);
    expect(fixes).toContain("pace");
    expect(fixes).toContain("pauses");
    expect(fixes).toContain("dynamics");
    expect(fixes).toContain("fillers");
    expect(report.overall).toBeLessThan(45);
  });

  it("puts fixes ahead of strengths", () => {
    const report = analyzeDelivery({
      samples: steadySpeech(),
      sampleHz: HZ,
      transcript: "um um um " + Array.from({ length: 300 }, () => "word").join(" "),
    });
    const kinds = report.findings.map((f) => f.kind);
    const firstStrength = kinds.indexOf("strength");
    if (firstStrength !== -1) {
      expect(kinds.slice(firstStrength).every((k) => k === "strength")).toBe(true);
    }
  });
});
