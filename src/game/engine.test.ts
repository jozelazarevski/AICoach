import { describe, it, expect } from "vitest";
import {
  startEncounter,
  applyChoice,
  checkEnding,
  gradeFor,
  xpForOutcome,
  type GameState,
} from "./engine";
import { rankFor, nextRank } from "./ranks";
import { verdictFor } from "./verdicts";
import type { Choice, Encounter } from "./types";

function makeChoice(over: Partial<Choice>): Choice {
  return {
    id: "c",
    tag: "t",
    line: "l",
    points: 0,
    standing: 0,
    momentum: 0,
    reaction: "r",
    principle: "p",
    ...over,
  };
}

function makeEncounter(over: Partial<Encounter> = {}): Encounter {
  return {
    id: "test",
    title: "Test",
    difficulty: "pointed",
    opponent: { name: "O", role: "r", archetype: "a", blurb: "b" },
    scene: "s",
    objective: "o",
    startStanding: 50,
    startMomentum: 20,
    stages: [
      {
        id: "s1",
        prompt: "p1",
        choices: [makeChoice({ id: "a" })],
      },
      {
        id: "s2",
        prompt: "p2",
        choices: [makeChoice({ id: "b" })],
      },
    ],
    endings: [
      {
        id: "win",
        when: { momentumAtLeast: 78, standingAtLeast: 45 },
        result: "won",
        baseGrade: "A",
        resolution: "won",
        lessons: ["a", "b"],
      },
      {
        id: "partial",
        when: { momentumAtLeast: 50 },
        result: "partial",
        baseGrade: "C",
        resolution: "partial",
        lessons: ["a", "b"],
      },
      {
        id: "lost",
        when: {},
        result: "lost",
        baseGrade: "D",
        resolution: "lost",
        lessons: ["a", "b"],
      },
    ],
    ...over,
  };
}

describe("meter clamping", () => {
  it("clamps standing and momentum to 0..100", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    state = applyChoice(
      enc,
      state,
      makeChoice({ standing: 999, momentum: 999 })
    );
    expect(state.standing).toBeLessThanOrEqual(100);
    expect(state.momentum).toBeLessThanOrEqual(100);
    expect(state.standing).toBeGreaterThanOrEqual(0);
    expect(state.momentum).toBeGreaterThanOrEqual(0);

    const enc2 = makeEncounter();
    let s2 = startEncounter(enc2, 0);
    s2 = applyChoice(enc2, s2, makeChoice({ standing: -999, momentum: -999 }));
    expect(s2.standing).toBeGreaterThanOrEqual(0);
    expect(s2.momentum).toBeGreaterThanOrEqual(0);
  });
});

describe("monotonic XP", () => {
  it("negative points never reduce lifetimeXp", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 100);
    const before = state.lifetimeXp;
    state = applyChoice(enc, state, makeChoice({ points: -3 }));
    expect(state.lifetimeXp).toBeGreaterThanOrEqual(before);
  });

  it("positive points add to lifetimeXp", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    state = applyChoice(enc, state, makeChoice({ points: 5 }));
    expect(state.lifetimeXp).toBeGreaterThanOrEqual(5);
  });
});

describe("early endings", () => {
  it("momentum >= 100 ends as highest win", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    state = applyChoice(
      enc,
      state,
      makeChoice({ momentum: 999, standing: 10, points: 6 })
    );
    expect(state.status).toBe("won");
  });

  it("standing <= 0 ends as lost", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    state = applyChoice(enc, state, makeChoice({ standing: -999 }));
    expect(state.status).toBe("lost");
  });
});

describe("ending selection", () => {
  it("selects first matching ending top-to-bottom at end of stages", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    // Bump momentum into partial range but not win.
    state = applyChoice(enc, state, makeChoice({ momentum: 35 })); // 20+35=55
    expect(state.status).toBe("playing");
    state = applyChoice(enc, state, makeChoice({})); // advance to end
    expect(state.status).toBe("partial");
  });

  it("empty when always matches as catch-all", () => {
    const enc = makeEncounter();
    let state: GameState = startEncounter(enc, 0);
    // keep momentum low so only lost matches
    state = applyChoice(enc, state, makeChoice({ momentum: 5, standing: 10 }));
    state = applyChoice(enc, state, makeChoice({ momentum: 0 }));
    expect(state.status).toBe("lost");
  });

  it("win ending when both thresholds met", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    state = applyChoice(enc, state, makeChoice({ momentum: 50, standing: 5 })); // mom 70, stand 55
    state = applyChoice(enc, state, makeChoice({ momentum: 10 })); // mom 80
    expect(state.status).toBe("won");
  });
});

describe("gradeFor", () => {
  it("nudges up on high score", () => {
    expect(gradeFor("C", 20)).not.toBe("C");
    const high = gradeFor("C", 20);
    expect(["B-", "B", "B+", "A-", "A", "A+"]).toContain(high);
  });
  it("nudges down on low score", () => {
    const low = gradeFor("C", -8);
    expect(low).not.toBe("C");
  });
  it("clamps to A+ at top", () => {
    expect(gradeFor("A+", 50)).toBe("A+");
  });
  it("clamps to F at bottom", () => {
    expect(gradeFor("F", -50)).toBe("F");
  });
});

describe("ranks", () => {
  it("rankFor returns correct tier", () => {
    expect(rankFor(0)).toBe("Senior Director");
    expect(rankFor(40)).toBe("On the Radar");
    expect(rankFor(90)).toBe("In the Room");
    expect(rankFor(300)).toBe("Vice President");
  });
  it("nextRank detects rank-up boundary", () => {
    expect(nextRank(0)).toEqual({ name: "On the Radar", xp: 35 });
    expect(nextRank(300)).toBeNull();
  });
  it("rank-up detection across a gain", () => {
    const before = rankFor(30);
    const after = rankFor(40);
    expect(before).not.toBe(after);
  });
});

describe("verdictFor", () => {
  it("maps points to labels", () => {
    expect(verdictFor(6).label).toBe("Masterstroke");
    expect(verdictFor(4).label).toBe("Strong");
    expect(verdictFor(3).label).toBe("Solid");
    expect(verdictFor(1).label).toBe("Flat");
    expect(verdictFor(-2).label).toBe("Misstep");
    expect(verdictFor(-3).label).toBe("Costly");
  });
});

describe("xpForOutcome", () => {
  it("won 20, partial 8, lost floor", () => {
    expect(xpForOutcome("won", 0)).toBe(20);
    expect(xpForOutcome("partial", 0)).toBe(8);
    expect(xpForOutcome("lost", 12)).toBe(2);
    expect(xpForOutcome("lost", -5)).toBe(0);
  });
});

describe("checkEnding direct", () => {
  it("does not end mid-stage while playing", () => {
    const enc = makeEncounter();
    const state = startEncounter(enc, 0);
    const after = checkEnding(enc, { ...state });
    expect(after.status).toBe("playing");
  });
});

describe("stageChoices tracking", () => {
  it("records each choice made for debrief", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    expect(state.stageChoices).toHaveLength(0);
    state = applyChoice(enc, state, makeChoice({ id: "c1", tag: "My tag", points: 3 }));
    expect(state.stageChoices).toHaveLength(1);
    expect(state.stageChoices[0].choiceTag).toBe("My tag");
    expect(state.stageChoices[0].choicePoints).toBe(3);
  });

  it("tracks prevChoiceTags for opponent memory", () => {
    const enc = makeEncounter();
    let state = startEncounter(enc, 0);
    expect(state.prevChoiceTags).toHaveLength(0);
    state = applyChoice(enc, state, makeChoice({ tag: "First move" }));
    expect(state.prevChoiceTags).toContain("First move");
  });
});

describe("prompt variant", () => {
  it("startEncounter respects promptVariant seed", () => {
    const enc = makeEncounter({
      stages: [
        {
          id: "s1",
          prompt: "default prompt",
          prompts: ["variant A", "variant B"],
          choices: [makeChoice({ id: "a" })],
        },
      ],
    });
    const s0 = startEncounter(enc, 0, 0);
    const s1 = startEncounter(enc, 0, 1);
    // First log entry is the opponent's opening line.
    expect(s0.log[0].text).toBe("variant A");
    expect(s1.log[0].text).toBe("variant B");
  });
});
