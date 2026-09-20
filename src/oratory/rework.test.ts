import { describe, it, expect } from "vitest";
import { buildAnchors, renderAnchor, rework } from "./rework";
import { analyze } from "./analyze";

describe("mechanical rework", () => {
  it("cuts hedges and fixes the capitalization behind them", () => {
    const { rewritten, edits } = rework("I think we should wait. Maybe the numbers are wrong.");
    expect(rewritten).toBe("We should wait. The numbers are wrong.");
    expect(edits.map((e) => e.before.toLowerCase())).toEqual(
      expect.arrayContaining(["i think", "maybe"])
    );
  });

  it("cuts filler, intensifiers and clichés", () => {
    const { rewritten } = rework(
      "Basically the project was very late. At the end of the day we honestly need to move the needle."
    );
    expect(rewritten.toLowerCase()).not.toContain("basically");
    expect(rewritten.toLowerCase()).not.toContain("very");
    expect(rewritten.toLowerCase()).not.toContain("at the end of the day");
    expect(rewritten.toLowerCase()).not.toContain("move the needle");
  });

  it("cuts adverbs without touching words that merely end in -ly", () => {
    const { rewritten } = rework("We carefully reviewed the family reply and applied it early.");
    expect(rewritten).not.toContain("carefully");
    expect(rewritten).toContain("family");
    expect(rewritten).toContain("early");
  });

  it("leaves a clean passage untouched", () => {
    const clean = "We cut forty-one people in March. Dave packed his desk into a box.";
    const { rewritten, edits } = rework(clean);
    expect(rewritten).toBe(clean);
    expect(edits).toHaveLength(0);
  });

  it("splits an unbreathable sentence at a conjunction, never mid-clause", () => {
    const long =
      "We spent the entire quarter rebuilding the deployment pipeline for every single team in this company without telling anyone, and nobody outside the room ever noticed.";
    const { rewritten } = rework(long);
    expect(rewritten).toContain("anyone. Nobody");
    expect(rewritten).not.toContain(", and nobody");
  });

  it("does not split a sentence that is already speakable", () => {
    const fine = "We tested it, and it failed.";
    expect(rework(fine).rewritten).toBe(fine);
  });

  it("raises the score of the draft it reworks", () => {
    const flat =
      "I think the situation was very challenging, and honestly we basically need to circle back on this at the end of the day.";
    const before = analyze(flat).overall;
    const after = analyze(rework(flat).rewritten).overall;
    expect(after).toBeGreaterThan(before);
  });

  it("never invents facts — abstractions become questions, not replacements", () => {
    const { rewritten, prompts } = rework(
      "The implementation caused significant disruption for the team."
    );
    // The abstraction survives the machine edit; only the writer can replace it.
    expect(rewritten).toContain("implementation");
    expect(prompts.some((p) => p.label.includes("implementation"))).toBe(true);
  });

  it("asks who acted when the voice is passive", () => {
    const { prompts } = rework("Mistakes were made during the review.");
    const passive = prompts.find((p) => p.id.startsWith("passive"));
    expect(passive?.ask).toContain("actor");
  });

  it("flags a long last line as the landing to cut", () => {
    const { prompts } = rework(
      "We shipped it. That is why this quarter has been such a long and complicated story for all of us."
    );
    expect(prompts.some((p) => p.id === "landing")).toBe(true);
  });
});

describe("anchors", () => {
  const flat =
    "The migration finished on Tuesday. Two services needed a rollback. The team worked through Thursday to finish the remaining work.";

  it("offers scaffolds only for the devices the draft lacks", () => {
    const ids = buildAnchors(flat).map((a) => a.id);
    expect(ids).toContain("anaphora");
    expect(ids).toContain("antithesis");
    expect(ids).toContain("tricolon");
    expect(ids).toContain("address");
  });

  it("does not offer an anchor for a device already present", () => {
    const withDrumbeat =
      "They told us there was no budget. They told us there were no people. They told us to wait. We stopped asking.";
    expect(buildAnchors(withDrumbeat).map((a) => a.id)).not.toContain("anaphora");
  });

  it("seeds the drumbeat with the writer's own sentence opening", () => {
    const text = "We lost the quarter. We missed the date. The board asked why.";
    const anaphora = buildAnchors(text).find((a) => a.id === "anaphora");
    expect(anaphora?.fields.find((f) => f.id === "phrase")?.seed).toBe("We");
  });

  it("seeds the three-part list with the draft's own nouns, lightest first", () => {
    const text =
      "The rollback cost money. The rollback cost weekends. The rollback cost credibility with the board.";
    const tricolon = buildAnchors(text).find((a) => a.id === "tricolon");
    const seeds = tricolon!.fields.filter((f) => ["a", "b", "c"].includes(f.id)).map((f) => f.seed);
    expect(seeds.filter(Boolean).length).toBeGreaterThan(0);
    // Heaviest last: syllable count must not decrease across the three.
    const syl = (w: string) => (w.match(/[aeiouy]+/g) ?? []).length;
    const filled = seeds.filter(Boolean);
    for (let i = 1; i < filled.length; i++) {
      expect(syl(filled[i])).toBeGreaterThanOrEqual(syl(filled[i - 1]));
    }
  });

  it("offers the drop when no sentence is short", () => {
    const noShort =
      "We reviewed every line of the quarterly forecast together last week. The numbers did not support the plan we had promised.";
    expect(buildAnchors(noShort).map((a) => a.id)).toContain("drop");
  });

  it("returns nothing for an empty draft", () => {
    expect(buildAnchors("   ")).toHaveLength(0);
  });

  it("renders a scaffold with visible blanks until it is filled", () => {
    const anchor = buildAnchors(flat).find((a) => a.id === "antithesis")!;
    const empty = renderAnchor(anchor, {});
    expect(empty).toContain("___");

    const filled = renderAnchor(anchor, { wrong: "a staffing problem", right: "a trust problem" });
    expect(filled).toBe("This is not a staffing problem. It is a trust problem.");
  });
});

describe("anchor seeds come from what the draft is about", () => {
  const draft =
    "I think we should honestly rebuild the onboarding flow this quarter. The current implementation creates significant friction for new users, and the retention numbers have been steadily declining since March without anyone really owning the problem. We need to basically start again from the beginning.";

  it("seeds the list with nouns, not with frequent filler", () => {
    const tricolon = buildAnchors(draft).find((a) => a.id === "tricolon")!;
    const seeds = tricolon.fields
      .filter((f) => ["a", "b", "c"].includes(f.id))
      .map((f) => f.seed)
      .filter(Boolean);

    expect(seeds.length).toBeGreaterThan(0);
    for (const bad of ["again", "anyone", "basically", "really", "honestly", "need"]) {
      expect(seeds).not.toContain(bad);
    }
  });

  it("picks words the draft is actually about", () => {
    const tricolon = buildAnchors(draft).find((a) => a.id === "tricolon")!;
    const seeds = tricolon.fields
      .filter((f) => ["a", "b", "c"].includes(f.id))
      .map((f) => f.seed);
    const subject = ["implementation", "friction", "retention", "onboarding", "problem", "flow", "numbers", "users", "quarter", "beginning", "march"];
    expect(seeds.some((s) => subject.includes(s))).toBe(true);
  });

  it("orders the three by weight, lightest first", () => {
    const tricolon = buildAnchors(draft).find((a) => a.id === "tricolon")!;
    const seeds = tricolon.fields
      .filter((f) => ["a", "b", "c"].includes(f.id))
      .map((f) => f.seed)
      .filter(Boolean);
    const syl = (w: string) => (w.replace(/e$/, "").match(/[aeiouy]+/g) ?? []).length;
    for (let i = 1; i < seeds.length; i++) {
      expect(syl(seeds[i])).toBeGreaterThanOrEqual(syl(seeds[i - 1]));
    }
  });
});
