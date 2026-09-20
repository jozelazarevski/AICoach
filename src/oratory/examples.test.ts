import { describe, it, expect } from "vitest";
import { LESSONS } from "./curriculum";
import { analyze } from "./analyze";
import { detectDevices, splitSentences } from "./analyze";

const drills = LESSONS.flatMap((lesson) =>
  lesson.drills.map((drill) => ({ lesson, drill }))
);

const writingDrills = drills.filter(({ drill }) => drill.kind !== "speak");

describe("every writing drill ships worked examples", () => {
  it.each(writingDrills.map(({ lesson, drill }) => [`${lesson.title} / ${drill.title}`, drill]))(
    "%s has three or more",
    (_name, drill: any) => {
      expect(drill.examples?.length ?? 0).toBeGreaterThanOrEqual(3);
    }
  );
});

const examples = writingDrills.flatMap(({ lesson, drill }) =>
  (drill.examples ?? []).map((example) => ({ lesson, drill, example }))
);

describe("the examples hold up against the app's own scoring", () => {
  it.each(
    examples.map((e) => [`${e.drill.title}: ${e.example.context}`, e])
  )("%s clears the bar it is teaching", (_name, entry: any) => {
    const { drill, example } = entry;
    const analysis = analyze(example.passage, drill.targets);
    expect(analysis.overall).toBeGreaterThanOrEqual(70);
  });

  it.each(
    examples.map((e) => [`${e.drill.title}: ${e.example.context}`, e])
  )("%s is long enough for the drill it answers", (_name, entry: any) => {
    const { drill, example } = entry;
    expect(analyze(example.passage).stats.words).toBeGreaterThanOrEqual(drill.minWords);
  });
});

describe("the examples demonstrate the technique they claim", () => {
  it("the drumbeat examples all contain anaphora", () => {
    const drill = drills.find((d) => d.drill.id === "drumbeat-write")!.drill;
    for (const example of drill.examples ?? []) {
      const sentences = splitSentences(example.passage);
      const devices = detectDevices(sentences, example.passage.toLowerCase());
      expect(devices.anaphora.length).toBeGreaterThan(0);
    }
  });

  it("the turn examples all contain an antithesis", () => {
    const drill = drills.find((d) => d.drill.id === "turn-write")!.drill;
    for (const example of drill.examples ?? []) {
      const sentences = splitSentences(example.passage);
      const devices = detectDevices(sentences, example.passage.toLowerCase());
      expect(devices.antithesis.length).toBeGreaterThan(0);
    }
  });

  it("the rhythm examples vary sentence length sharply", () => {
    for (const id of ["rhythm-write", "rhythm-rewrite"]) {
      const drill = drills.find((d) => d.drill.id === id)!.drill;
      for (const example of drill.examples ?? []) {
        const stats = analyze(example.passage).stats;
        expect(stats.sentenceWordSd).toBeGreaterThan(5);
        expect(stats.shortestSentenceWords).toBeLessThanOrEqual(6);
      }
    }
  });

  it("the camera examples carry no abstractions", () => {
    const drill = drills.find((d) => d.drill.id === "camera-write")!.drill;
    for (const example of drill.examples ?? []) {
      const concrete = analyze(example.passage).scores.find((s) => s.dimension === "concrete")!;
      expect(concrete.score).toBeGreaterThanOrEqual(80);
    }
  });

  it("no example hedges, pads, or reaches for a cliché", () => {
    for (const { example } of examples) {
      const economy = analyze(example.passage).scores.find((s) => s.dimension === "economy")!;
      expect(economy.score).toBeGreaterThanOrEqual(80);
    }
  });

  it("every example names its situation and what to notice", () => {
    for (const { example } of examples) {
      expect(example.context.length).toBeGreaterThan(8);
      expect(example.notice.length).toBeGreaterThan(20);
    }
  });
});
