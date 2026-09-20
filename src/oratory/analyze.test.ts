import { describe, it, expect } from "vitest";
import {
  analyze,
  splitSentences,
  wordsOf,
  textStats,
  detectDevices,
  bandFor,
} from "./analyze";
import type { Dimension } from "./types";

function scoreOf(text: string, dim: Dimension): number {
  const a = analyze(text);
  return a.scores.find((s) => s.dimension === dim)!.score;
}

function hasFinding(text: string, dim: Dimension, kind: "fix" | "strength"): boolean {
  return analyze(text).findings.some((f) => f.dimension === dim && f.kind === kind);
}

describe("parsing", () => {
  it("splits on sentence terminators and newlines", () => {
    const s = splitSentences("One two. Three four!\nFive six? Seven.");
    expect(s.map((x) => x.words.length)).toEqual([2, 2, 2, 1]);
  });

  it("ignores empty fragments and stray punctuation", () => {
    expect(splitSentences("   ...   ")).toHaveLength(0);
    expect(splitSentences("")).toHaveLength(0);
  });

  it("keeps hyphenated and apostrophed words whole", () => {
    expect(wordsOf("copier-paper box, don't")).toEqual(["copier-paper", "box", "don't"]);
  });

  it("measures the longest run between breathing points", () => {
    const [s] = splitSentences(
      "We spent three weeks going through every line of the forecast, hunting for it."
    );
    // 11 words before the comma, 4 after.
    expect(s.longestRun).toBe(11);
  });
});

describe("stats", () => {
  it("reports spread and short-sentence count", () => {
    const stats = textStats(
      splitSentences("We tested nine of them. None of them held. We were wrong.")
    );
    expect(stats.sentences).toBe(3);
    expect(stats.words).toBe(12);
    expect(stats.shortSentences).toBe(3);
    expect(stats.longestSentenceWords).toBe(5);
    expect(stats.spokenSeconds).toBeGreaterThan(0);
  });
});

describe("concreteness", () => {
  const flat =
    "The implementation of the restructuring initiative resulted in considerable hardship for a significant portion of our workforce.";
  const charged =
    "We cut forty-one people in March. Dave trained half this room. He packed his desk in a copier-paper box, and nobody could look at him.";

  it("scores abstraction far below specifics", () => {
    expect(scoreOf(flat, "concrete")).toBeLessThan(30);
    expect(scoreOf(charged, "concrete")).toBeGreaterThan(70);
  });

  it("names the abstractions it found", () => {
    const finding = analyze(flat).findings.find((f) => f.dimension === "concrete");
    expect(finding?.kind).toBe("fix");
    expect(finding?.label).toMatch(/implementation|initiative|portion|workforce/);
  });

  it("does not flag concrete words that merely end in an abstract suffix", () => {
    const a = analyze("She waited a moment at the basement door. The apartment was cold.");
    const concrete = a.findings.find((f) => f.dimension === "concrete" && f.kind === "fix");
    expect(concrete).toBeUndefined();
  });
});

describe("rhythm", () => {
  it("rewards variance and a short landing", () => {
    const varied =
      "We spent three weeks going through every line of the forecast, hunting for the assumption that would make it work. We tested nine of them. None of them held. We were wrong.";
    expect(scoreOf(varied, "rhythm")).toBeGreaterThan(70);
  });

  it("punishes uniform sentence lengths", () => {
    const monotone =
      "We have been working on this problem for several months. We have tried a number of different approaches to it. The results have fallen short of what we hoped.";
    expect(scoreOf(monotone, "rhythm")).toBeLessThan(45);
    expect(hasFinding(monotone, "rhythm", "fix")).toBe(true);
  });

  it("does not treat an all-short passage as good rhythm", () => {
    const staccato = "We failed. We lost it. It is gone. I was wrong. It hurt.";
    expect(scoreOf(staccato, "rhythm")).toBeLessThanOrEqual(55);
  });

  it("flags a passage with no short sentence", () => {
    const noShort =
      "We reviewed every line of the quarterly forecast together last week. The numbers did not support the plan we had already promised. Leadership asked for another pass at it.";
    expect(hasFinding(noShort, "rhythm", "fix")).toBe(true);
  });
});

describe("devices", () => {
  it("finds anaphora across three sentences", () => {
    const d = detectDevices(
      splitSentences(
        "They told us there was no budget. They told us there were no people. They told us to wait."
      ),
      "they told us there was no budget. they told us there were no people. they told us to wait."
    );
    expect(d.anaphora).toContain("they told");
  });

  it("does not report anaphora for a single pair of unrelated openings", () => {
    const d = detectDevices(
      splitSentences("We shipped in April. Support tickets went up."),
      "we shipped in april. support tickets went up."
    );
    expect(d.anaphora).toHaveLength(0);
  });

  it("finds a three-part list", () => {
    const d = detectDevices(
      splitSentences("It will cost money, time, and the story we tell ourselves."),
      "it will cost money, time, and the story we tell ourselves."
    );
    expect(d.tricolon).toHaveLength(1);
  });

  it("finds a not/but turn inside one sentence", () => {
    const d = detectDevices(
      splitSentences("This is not a cost problem but a trust problem."),
      "this is not a cost problem but a trust problem."
    );
    expect(d.antithesis).toHaveLength(1);
  });

  it("finds a turn across two matched sentences", () => {
    const d = detectDevices(
      splitSentences("We are not behind because we lack people. We are behind because we do not agree."),
      "we are not behind because we lack people. we are behind because we do not agree."
    );
    expect(d.antithesis.length).toBeGreaterThan(0);
  });

  it("counts questions and direct address", () => {
    const d = detectDevices(
      splitSentences("What did you expect? You were there."),
      "what did you expect? you were there."
    );
    expect(d.questions).toBe(1);
    expect(d.address).toBe(2);
  });

  it("flags a passage with no structure at all", () => {
    const plain =
      "The migration finished on Tuesday. Two services needed a rollback. The team worked through Thursday to finish it.";
    expect(hasFinding(plain, "device", "fix")).toBe(true);
  });
});

describe("charge", () => {
  it("rewards words with temperature", () => {
    const hot =
      "I promised them it would hold. It broke. Two people quit, and I lied to the rest about why.";
    expect(scoreOf(hot, "charge")).toBeGreaterThan(60);
  });

  it("penalizes announced emotion and says so", () => {
    const told =
      "This has been an incredibly challenging and devastating quarter, and I am humbled and truly inspired by this amazing team.";
    expect(scoreOf(told, "charge")).toBeLessThan(40);
    expect(hasFinding(told, "charge", "fix")).toBe(true);
  });
});

describe("economy", () => {
  it("flags hedges", () => {
    expect(hasFinding("I think maybe we should perhaps look at it again.", "economy", "fix")).toBe(
      true
    );
  });

  it("flags clichés hard", () => {
    const cliche =
      "At the end of the day we need to move the needle, circle back on the low-hanging fruit, and double down.";
    expect(scoreOf(cliche, "economy")).toBeLessThan(45);
  });

  it("flags passive voice", () => {
    const passive = "Mistakes were made. The decision was taken by the committee last spring.";
    expect(analyze(passive).findings.some((f) => f.label.includes("Passive"))).toBe(true);
  });

  it("does not flag -ly words that are not adverbs", () => {
    const a = analyze("The family reply came early. We apply it only once.");
    const adverbFinding = a.findings.find((f) => f.label.startsWith("Adverb padding"));
    expect(adverbFinding).toBeUndefined();
  });

  it("gives a clean passage full marks", () => {
    const clean = "We cut forty-one people in March. Dave packed his desk in a box.";
    expect(scoreOf(clean, "economy")).toBeGreaterThan(85);
  });
});

describe("breath", () => {
  it("flags a sentence with nowhere to breathe", () => {
    const long =
      "We have been working through the entire quarterly planning process with every single team in the organization in order to make sure that nothing at all was missed anywhere.";
    expect(scoreOf(long, "breath")).toBeLessThan(50);
    expect(hasFinding(long, "breath", "fix")).toBe(true);
  });

  it("passes short speakable lines", () => {
    const easy = "We were wrong. I signed off on it. Next quarter we do one thing.";
    expect(scoreOf(easy, "breath")).toBeGreaterThan(85);
  });
});

describe("overall", () => {
  it("weights the drill's target dimensions", () => {
    const text =
      "They told us there was no budget. They told us there were no people. They told us to wait. We stopped asking.";
    const deviceWeighted = analyze(text, ["device"]).overall;
    const economyWeighted = analyze(text, ["breath"]).overall;
    expect(deviceWeighted).not.toBe(economyWeighted);
  });

  it("ranks a charged passage above a corporate one", () => {
    const flat =
      "Following a comprehensive review of our operational efficiency, leadership has determined that a reduction in headcount is necessary, and we remain committed to supporting affected individuals throughout the transition process.";
    const charged =
      "We are cutting forty-one jobs. I argued for this in January and I was wrong about what it would cost. Dave trained half of you. On Friday he packed his desk into a copier-paper box, and not one of us could look at him.";
    expect(analyze(charged).overall).toBeGreaterThan(analyze(flat).overall + 20);
  });

  it("returns an empty analysis for empty input", () => {
    const a = analyze("   ");
    expect(a.overall).toBe(0);
    expect(a.findings).toHaveLength(0);
    expect(a.stats.words).toBe(0);
  });

  it("caps the feedback on a draft that trips every rule", () => {
    const awful =
      "I think the implementation of our restructuring initiative resulted in considerable hardship for a significant portion of our workforce. Basically the situation was very challenging for everyone involved here. Mistakes were made and lessons learned throughout the process. At the end of the day we need to move the needle on our key deliverables.";
    const findings = analyze(awful).findings;
    expect(findings.filter((f) => f.kind === "fix").length).toBeLessThanOrEqual(6);
    expect(findings.filter((f) => f.kind === "strength").length).toBeLessThanOrEqual(3);
  });

  it("leads with the dimension that scored worst", () => {
    const abstractButOtherwiseFine =
      "The implementation of the initiative caused significant disruption. We tested it. It failed. The organization must reconsider its approach to the transformation.";
    const [first] = analyze(abstractButOtherwiseFine).findings;
    expect(first.kind).toBe("fix");
    expect(first.dimension).toBe("concrete");
  });

  it("does not repeat itself about rhythm", () => {
    const monotone =
      "We have been working on this problem for several months. We have tried a number of different approaches to it. The results have fallen short of what we hoped.";
    const rhythmFixes = analyze(monotone).findings.filter(
      (f) => f.dimension === "rhythm" && f.kind === "fix"
    );
    expect(rhythmFixes).toHaveLength(1);
  });

  it("quotes hedges the way they are spoken", () => {
    const finding = analyze("I think we should maybe wait, in my opinion.").findings.find((f) =>
      f.label.startsWith("Hedging")
    );
    expect(finding?.label).toContain("“I think”");
  });

  it("keeps the student's capitalization when quoting their words back", () => {
    const strength = analyze(
      "On Friday in March we packed the desk into a box in the room."
    ).findings.find((f) => f.label === "The room can see this");
    expect(strength?.note).toContain("Friday");
    expect(strength?.note).not.toContain("friday");
  });

  it("puts fixes before strengths", () => {
    const mixed =
      "I think the implementation of our new process was very successful. We shipped it. The team was extremely tired by Friday.";
    const kinds = analyze(mixed).findings.map((f) => f.kind);
    const firstStrength = kinds.indexOf("strength");
    const lastFix = kinds.lastIndexOf("fix");
    if (firstStrength !== -1 && lastFix !== -1) expect(firstStrength).toBeGreaterThan(lastFix);
  });

  it("bands scores with a label and a color", () => {
    expect(bandFor(90).label).toBe("It lands");
    expect(bandFor(10).color).toBe("var(--bad)");
  });
});
