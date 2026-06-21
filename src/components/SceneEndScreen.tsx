import type { Ending } from "../game/types";

interface SceneEndScreenProps {
  ending: Ending;
  grade: string;
  sceneScore: number;
  xpGained: number;
  onPlayAgain: () => void;
  onPickNew: () => void;
}

const OUTCOME_LABEL: Record<Ending["result"], string> = {
  won: "Won",
  partial: "Partial",
  lost: "Lost",
};

const OUTCOME_COLOR: Record<Ending["result"], string> = {
  won: "#6FA56B",
  partial: "#C98A3A",
  lost: "#C2584A",
};

export function SceneEndScreen({
  ending,
  grade,
  sceneScore,
  xpGained,
  onPlayAgain,
  onPickNew,
}: SceneEndScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: OUTCOME_COLOR[ending.result] }}
        >
          {OUTCOME_LABEL[ending.result]}
        </span>
        <div
          className="font-display text-7xl leading-none"
          style={{ color: OUTCOME_COLOR[ending.result] }}
        >
          {grade}
        </div>
        <div className="mt-2 flex gap-6 font-mono text-sm text-paper-dim">
          <span>Scene score {sceneScore}</span>
          <span>+{xpGained} XP</span>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-ink-2 p-5">
        <p className="font-body text-base leading-relaxed text-paper">
          {ending.resolution}
        </p>
      </div>

      <div>
        <h3 className="mb-3 font-mono text-xs uppercase tracking-wide text-paper-faint">
          What to take from it
        </h3>
        <ul className="flex flex-col gap-2">
          {ending.lessons.map((lesson, i) => (
            <li
              key={i}
              className="rounded-md border-l-2 bg-ink-2 px-4 py-2 font-body text-sm leading-relaxed text-paper-dim"
              style={{ borderColor: "var(--accent)" }}
            >
              {lesson}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPlayAgain}
          className="flex-1 rounded-lg border border-accent px-4 py-3 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-accent/10"
          style={{ color: "var(--accent)" }}
        >
          Play again
        </button>
        <button
          type="button"
          onClick={onPickNew}
          className="flex-1 rounded-lg border border-line bg-ink-2 px-4 py-3 font-mono text-xs uppercase tracking-wide text-paper transition-colors hover:border-paper-faint"
        >
          Pick new opponent
        </button>
      </div>
    </div>
  );
}
