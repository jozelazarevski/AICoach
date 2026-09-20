import { describe, it, expect } from "vitest";
import { rankPhrases } from "./analyze";

const byIndex = (text: string) => rankPhrases(text);
const best = (text: string) => rankPhrases(text).find((p) => p.rank === 1)!;
const worst = (text: string) => {
  const all = rankPhrases(text);
  return all.find((p) => p.rank === all.length)!;
};

describe("ranking phrases", () => {
  it("ranks every sentence exactly once", () => {
    const phrases = byIndex("We were wrong. I signed off on it. Next quarter we do one thing.");
    expect(phrases).toHaveLength(3);
    expect([...phrases].map((p) => p.rank).sort()).toEqual([1, 2, 3]);
    expect(phrases.map((p) => p.index)).toEqual([0, 1, 2]);
  });

  it("returns nothing for an empty draft", () => {
    expect(rankPhrases("   ")).toHaveLength(0);
  });

  it("puts the concrete line above the abstract one", () => {
    const text =
      "The implementation of the initiative created significant operational disruption. Dave packed his desk into a copier-paper box on Friday.";
    expect(best(text).text).toContain("Dave");
    expect(worst(text).text).toContain("implementation");
  });

  it("names what is working on the line that is working", () => {
    const text =
      "The restructuring initiative caused disruption. Dave packed his desk into a box on Friday.";
    const dave = byIndex(text)[1];
    expect(dave.working.some((w) => /specific/.test(w))).toBe(true);
    expect(dave.note).toMatch(/Keep this one/);
  });

  it("names what is dragging, specifically", () => {
    const text = "I think the situation was very challenging for everyone. We shipped it in March.";
    const first = byIndex(text)[0];
    expect(first.dragging.join(" ")).toMatch(/hedge/);
    expect(first.dragging.join(" ")).toMatch(/I think/i);
    expect(first.note).toMatch(/Fix the/);
  });

  it("credits every line in a drumbeat, not just the last", () => {
    const text =
      "They told us there was no budget. They told us there were no people. They told us to wait.";
    const phrases = byIndex(text);
    expect(phrases.every((p) => p.working.includes("drumbeat"))).toBe(true);
  });

  it("does not call two unrelated sentences a drumbeat", () => {
    const phrases = byIndex("We shipped in April. Support tickets went up in June.");
    expect(phrases.some((p) => p.working.includes("drumbeat"))).toBe(false);
  });

  it("credits both halves of a turn", () => {
    const text = "We are not behind because we lack people. We are behind because we do not agree.";
    expect(byIndex(text).every((p) => p.working.includes("a turn"))).toBe(true);
  });

  it("recognizes a short line after a long one as the drop", () => {
    const text =
      "We spent three weeks going through every line of the forecast, hunting for the assumption that would make it work. We were wrong.";
    const phrases = byIndex(text);
    expect(phrases[0].role).toBe("build");
    expect(phrases[1].role).toBe("drop");
    expect(phrases[1].working).toContain("the drop");
  });

  it("does not call an opening short line a drop", () => {
    const phrases = byIndex("We were wrong. We spent three weeks going through every single line of that forecast together.");
    expect(phrases[0].role).not.toBe("drop");
  });

  it("marks a middling-length line as flat", () => {
    const phrases = byIndex("The team reviewed the numbers again last week. The team reviewed them twice.");
    expect(phrases.some((p) => p.role === "flat")).toBe(true);
  });

  it("does not let a short line win on density alone", () => {
    // One charged word in a five-word sentence would be a huge per-100 rate;
    // ranking counts occurrences instead, so the richer line still wins.
    const text =
      "We lost. Dave packed his desk into a copier-paper box on Friday while nobody spoke.";
    expect(best(text).text).toContain("Dave");
  });

  it("flags a sentence with nowhere to breathe", () => {
    const text =
      "We have been working through the entire quarterly planning process with every single team in the organization to make sure nothing was missed. It worked.";
    expect(byIndex(text)[0].dragging.some((d) => /no air/.test(d))).toBe(true);
  });

  it("scores within bounds", () => {
    const text =
      "I think basically at the end of the day the implementation was very challenging. They told us no. They told us to wait. Dave packed his desk into a box on Friday.";
    for (const p of byIndex(text)) {
      expect(p.score).toBeGreaterThanOrEqual(0);
      expect(p.score).toBeLessThanOrEqual(100);
    }
  });
});

describe("labels a writer would trust", () => {
  it("treats a short line after a mid-length one as the drop", () => {
    const text =
      "The current implementation creates significant friction and the retention numbers have been declining. We were wrong.";
    const phrases = rankPhrases(text);
    expect(phrases[1].role).toBe("drop");
    expect(phrases[1].working).toContain("the drop");
  });

  it("never calls a three-word line the length that disappears", () => {
    const phrases = rankPhrases("The team reviewed it. We were wrong.");
    const short = phrases[1];
    expect(short.words).toBeLessThanOrEqual(4);
    expect(short.note).not.toMatch(/disappears/);
  });

  it("capitalizes the standalone I when quoting a hedge back", () => {
    const phrases = rankPhrases("I think we should wait. March came and went.");
    expect(phrases[0].dragging.join(" ")).toContain("I think");
    expect(phrases[0].dragging.join(" ")).not.toContain("i think");
  });

  it("names a word once, as filler rather than twice as an adverb too", () => {
    const phrases = rankPhrases("Honestly we shipped it in March without telling anyone at all.");
    const tags = phrases[0].dragging.join(" ");
    expect(tags).toContain("honestly");
    expect(tags.match(/honestly/g) ?? []).toHaveLength(1);
  });

  it("still reports a genuine adverb that is not filler", () => {
    const phrases = rankPhrases("We steadily reviewed the numbers across every single team we had.");
    expect(phrases[0].dragging.join(" ")).toContain("steadily");
  });
});
