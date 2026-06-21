import type { Encounter, Difficulty } from "../game/types";
import type { Progress } from "../hooks/useProgress";
import { Hud } from "./Hud";

interface StartScreenProps {
  encounters: Encounter[];
  progress: Progress;
  onStart: (encounter: Encounter) => void;
}

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  measured: "#4F8FB5",
  pointed: "#C98A3A",
  adversarial: "#D9633C",
};

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

export function StartScreen({ encounters, progress, onStart }: StartScreenProps) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="font-display text-4xl text-paper">Closed Door</h1>
        <p className="mt-1 font-body text-sm text-paper-dim">
          Win the rooms that decide your career. Read the person, pick the move.
        </p>
      </header>

      <div className="mb-8">
        <Hud lifetimeXp={progress.lifetimeXp} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {encounters.map((enc) => {
          const record = progress.completed[enc.id];
          return (
            <button
              key={enc.id}
              type="button"
              onClick={() => onStart(enc)}
              className="group flex flex-col rounded-lg border border-line bg-ink-2 p-5 text-left transition-all hover:border-paper-faint"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <DifficultyBadge difficulty={enc.difficulty} />
                <span
                  className="font-mono text-xs"
                  style={{
                    color: record ? "#6FA56B" : "var(--paper-faint)",
                  }}
                >
                  {record ? `Best ${record.bestGrade}` : "New"}
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
