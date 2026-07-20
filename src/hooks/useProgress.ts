import { useCallback, useState } from "react";

export interface CompletedRecord {
  bestGrade: string;
  bestScore: number;
  won: boolean;
  playCount: number;
}

export interface Progress {
  lifetimeXp: number;
  completed: Record<string, CompletedRecord>;
  settings: { apiEnabled: boolean; introSeen: boolean; theme: "dark" | "light" };
  weaknesses: Record<string, number>; // archetype name → loss/partial count
  dailyChallengeDate: string; // ISO date string of last daily completion
}

const STORAGE_KEY = "closed-door-progress";

const DEFAULT_PROGRESS: Progress = {
  lifetimeXp: 0,
  completed: {},
  settings: { apiEnabled: false, introSeen: false, theme: "dark" },
  weaknesses: {},
  dailyChallengeDate: "",
};

const GRADE_ORDER = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
];

function gradeRank(grade: string): number {
  const idx = GRADE_ORDER.indexOf(grade);
  return idx === -1 ? GRADE_ORDER.length : idx;
}

function loadProgress(): Progress {
  if (typeof localStorage === "undefined") return { ...DEFAULT_PROGRESS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      lifetimeXp: parsed.lifetimeXp ?? 0,
      completed: parsed.completed ?? {},
      settings: {
        apiEnabled: parsed.settings?.apiEnabled ?? false,
        introSeen: parsed.settings?.introSeen ?? false,
        theme: parsed.settings?.theme === "light" ? "light" : "dark",
      },
      weaknesses: parsed.weaknesses ?? {},
      dailyChallengeDate: parsed.dailyChallengeDate ?? "",
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

function save(progress: Progress) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore write failures
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => loadProgress());

  const updateProgress = useCallback(
    (
      encounterId: string,
      grade: string,
      score: number,
      won: boolean,
      xpGained: number,
      archetype: string,
      result: "won" | "partial" | "lost",
      isDaily: boolean
    ) => {
      setProgress((prev) => {
        const prior = prev.completed[encounterId];
        const bestGrade =
          prior && gradeRank(prior.bestGrade) <= gradeRank(grade)
            ? prior.bestGrade
            : grade;
        const bestScore = prior ? Math.max(prior.bestScore, score) : score;

        // Track weaknesses: partial or loss increments the archetype counter.
        const weaknesses = { ...prev.weaknesses };
        if (result !== "won") {
          weaknesses[archetype] = (weaknesses[archetype] ?? 0) + 1;
        } else if (weaknesses[archetype] && weaknesses[archetype] > 0) {
          // Win reduces weakness count slowly.
          weaknesses[archetype] = Math.max(0, weaknesses[archetype] - 1);
        }

        // Daily bonus XP: extra 10 for completing today's daily challenge.
        const _d = new Date();
        const today = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, "0")}-${String(_d.getDate()).padStart(2, "0")}`;
        const dailyBonus =
          isDaily && prev.dailyChallengeDate !== today ? 10 : 0;
        const dailyChallengeDate =
          isDaily && prev.dailyChallengeDate !== today
            ? today
            : prev.dailyChallengeDate;

        const next: Progress = {
          ...prev,
          lifetimeXp: prev.lifetimeXp + Math.max(0, xpGained) + dailyBonus,
          completed: {
            ...prev.completed,
            [encounterId]: {
              bestGrade,
              bestScore,
              won: (prior?.won ?? false) || won,
              playCount: (prior?.playCount ?? 0) + 1,
            },
          },
          weaknesses,
          dailyChallengeDate,
        };
        save(next);
        return next;
      });
    },
    []
  );

  const setApiEnabled = useCallback((apiEnabled: boolean) => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        settings: { ...prev.settings, apiEnabled },
      };
      save(next);
      return next;
    });
  }, []);

  const setTheme = useCallback((theme: "dark" | "light") => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        settings: { ...prev.settings, theme },
      };
      save(next);
      return next;
    });
  }, []);

  const dismissIntro = useCallback(() => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        settings: { ...prev.settings, introSeen: true },
      };
      save(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const next: Progress = { ...DEFAULT_PROGRESS };
    save(next);
    setProgress(next);
  }, []);

  return { progress, updateProgress, setApiEnabled, setTheme, dismissIntro, resetProgress };
}
