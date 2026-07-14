import type { Encounter, Difficulty } from "../game/types";
import type { Progress } from "../hooks/useProgress";
import { Hud } from "./Hud";

interface StartScreenProps {
  encounters: Encounter[];
  progress: Progress;
  dailyEncounterId: string;
  onStart: (encounter: Encounter) => void;
}

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  measured: "#4F8FB5",
  pointed: "#C98A3A",
  adversarial: "#D9633C",
};

const UNLOCK_NEEDED: Record<Difficulty, { need: number; fromDifficulty: Difficulty | null }> = {
  measured: { need: 0, fromDifficulty: null },
  pointed: { need: 3, fromDifficulty: "measured" },
  adversarial: { need: 3, fromDifficulty: "pointed" },
};

function countCompleted(encounters: Encounter[], progress: Progress, difficulty: Difficulty): number {
  return encounters.filter((e) => e.difficulty === difficulty && !!progress.completed[e.id]).length;
}

function isUnlocked(enc: Encounter, encounters: Encounter[], progress: Progress): boolean {
  const rule = UNLOCK_NEEDED[enc.difficulty];
  if (!rule.fromDifficulty) return true;
  return countCompleted(encounters, progress, rule.fromDifficulty) >= rule.need;
}

function topWeakness(weaknesses: Record<string, number>): string | null {
  let top: string | null = null;
  let max = 1; // only show if at least 2 losses against an archetype
  for (const [archetype, count] of Object.entries(weaknesses)) {
    if (count > max) {
      max = count;
      top = archetype;
    }
  }
  return top;
}

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const color = DIFFICULTY_COLOR[difficulty];
  return (
    <span
      className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
      style={{ color, border: `1px solid ${color}`, background: `${color}1A` }}
    >
      {difficulty}
    </span>
  );
}

export function StartScreen({ encounters, progress, dailyEncounterId, onStart }: StartScreenProps) {
  const weakness = topWeakness(progress.weaknesses);
  const today = new Date().toISOString().split("T")[0];
  const dailyDone = progress.dailyChallengeDate === today;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-6">
        <h1 className="font-display text-4xl text-paper">Closed Door</h1>
        <p className="mt-1 font-body text-sm text-paper-dim">
          Win the rooms that decide your career. Read the person, pick the move.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3">
        <Hud lifetimeXp={progress.lifetimeXp} />

        {weakness && (
          <div className="flex items-center gap-3 rounded-lg border border-line bg-ink-2 px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              Pattern
            </span>
            <span className="font-body text-xs text-paper-dim">
              You tend to struggle against <span className="text-paper">{weakness}</span>. Look for those encounters below.
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {encounters.map((enc) => {
          const record = progress.completed[enc.id];
          const unlocked = isUnlocked(enc, encounters, progress);
          const rule = UNLOCK_NEEDED[enc.difficulty];
          const isDaily = enc.id === dailyEncounterId;

          return (
            <button
              key={enc.id}
              type="button"
              onClick={() => {
                if (unlocked) onStart(enc);
              }}
              disabled={!unlocked}
              className="group flex flex-col rounded-lg border border-line bg-ink-2 p-5 text-left transition-all hover:border-paper-faint disabled:cursor-not-allowed disabled:opacity-50"
              style={
                unlocked
                  ? undefined
                  : { filter: "saturate(0.4)" }
              }
            >
              <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <DifficultyBadge difficulty={enc.difficulty} />
                  {isDaily && !dailyDone && (
                    <span className="rounded-full bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber-400 border border-amber-500/30">
                      Daily
                    </span>
                  )}
                  {isDaily && dailyDone && (
                    <span className="font-mono text-[10px] text-paper-faint">
                      Daily done
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-xs"
                  style={{
                    color: record
                      ? "#6FA56B"
                      : unlocked
                      ? "var(--paper-faint)"
                      : "var(--paper-faint)",
                  }}
                >
                  {!unlocked
                    ? `Locked — complete ${rule.need} ${rule.fromDifficulty}`
                    : record
                    ? `Best ${record.bestGrade}`
                    : "New"}
                </span>
              </div>
              <h2 className="font-display text-xl text-paper">{enc.title}</h2>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-paper-faint">
                {enc.opponent.name} · {enc.opponent.archetype}
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-paper-dim">
                {enc.opponent.blurb}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
