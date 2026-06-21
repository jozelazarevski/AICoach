import { useCallback, useState } from "react";

export interface Progress {
  lifetimeXp: number;
  completed: Record<
    string,
    { bestGrade: string; bestScore: number; won: boolean }
  >;
  settings: { apiEnabled: boolean };
}

const STORAGE_KEY = "closed-door-progress";

const DEFAULT_PROGRESS: Progress = {
  lifetimeXp: 0,
  completed: {},
  settings: { apiEnabled: false },
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
      settings: { apiEnabled: parsed.settings?.apiEnabled ?? false },
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
      xpGained: number
    ) => {
      setProgress((prev) => {
        const prior = prev.completed[encounterId];
        const bestGrade =
          prior && gradeRank(prior.bestGrade) <= gradeRank(grade)
            ? prior.bestGrade
            : grade;
        const bestScore = prior ? Math.max(prior.bestScore, score) : score;
        const next: Progress = {
          ...prev,
          lifetimeXp: prev.lifetimeXp + Math.max(0, xpGained),
          completed: {
            ...prev.completed,
            [encounterId]: {
              bestGrade,
              bestScore,
              won: (prior?.won ?? false) || won,
            },
          },
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

  const resetProgress = useCallback(() => {
    const next = { ...DEFAULT_PROGRESS, completed: {} };
    save(next);
    setProgress(next);
  }, []);

  return { progress, updateProgress, setApiEnabled, resetProgress };
}
