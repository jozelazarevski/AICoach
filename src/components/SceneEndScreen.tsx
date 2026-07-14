import { useState } from "react";
import type { Encounter, Ending } from "../game/types";
import type { StageChoice } from "../game/engine";

interface SceneEndScreenProps {
  ending: Ending;
  grade: string;
  sceneScore: number;
  xpGained: number;
  dailyBonus?: boolean;
  encounter?: Encounter;
  stageChoices?: StageChoice[];
  onPlayAgain: () => void;
  onPickNew: () => void;
}

type Tab = "resolution" | "debrief" | "lessons";

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

function DebriefTab({
  stageChoices,
}: {
  stageChoices: StageChoice[];
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (stageChoices.length === 0) {
    return (
      <p className="font-body text-sm text-paper-faint">No choices recorded.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {stageChoices.map((sc, si) => {
        const isFreeform = sc.choiceId === "freeform";
        const bestPoints = Math.max(...sc.allChoices.map((c) => c.points));
        return (
          <div key={sc.stageId}>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              Stage {si + 1}
            </div>
            <div className="mb-3 rounded-lg bg-ink-2 px-3 py-2">
              <p className="font-body text-sm leading-relaxed text-paper-dim">
                {sc.stagePrompt}
              </p>
            </div>
            {isFreeform && sc.freeformText && (
              <div
                className="mb-2 rounded-lg border px-3 py-2"
                style={{
                  borderColor: "var(--accent)",
                  background: "color-mix(in srgb, var(--accent) 8%, var(--ink-2))",
                }}
              >
                <div className="mb-1 font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--accent)" }}>
                  Your response · {sc.choiceTag}
                </div>
                <p className="font-body text-xs leading-relaxed text-paper-dim">
                  {sc.freeformText}
                </p>
                {sc.choicePoints !== 0 && (
                  <p className="mt-1 font-mono text-xs" style={{ color: sc.choicePoints > 0 ? "#6FA56B" : "#C2584A" }}>
                    {sc.choicePoints > 0 ? `+${sc.choicePoints}` : sc.choicePoints} pts
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2">
              {sc.allChoices.map((choice) => {
                const isYours = !isFreeform && choice.id === sc.choiceId;
                const isBest = choice.points === bestPoints;
                const isExpanded = expanded === `${sc.stageId}-${choice.id}`;

                return (
                  <div
                    key={choice.id}
                    className="rounded-lg border"
                    style={{
                      borderColor: isYours
                        ? "var(--accent)"
                        : isBest && !isYours
                        ? "#6FA56B44"
                        : "var(--line)",
                      background: isYours
                        ? "color-mix(in srgb, var(--accent) 8%, var(--ink-2))"
                        : "var(--ink-2)",
                    }}
                  >
                    <button
                      type="button"
                      className="w-full p-3 text-left"
                      onClick={() =>
                        setExpanded(isExpanded ? null : `${sc.stageId}-${choice.id}`)
                      }
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className="font-mono text-[10px] uppercase tracking-wide"
                          style={{
                            color: isYours ? "var(--accent)" : "var(--paper-faint)",
                          }}
                        >
                          {choice.tag}
                          {isYours && " · your choice"}
                          {isBest && !isYours && " · best move"}
                        </span>
                        <span
                          className="font-mono text-xs"
                          style={{
                            color:
                              choice.points >= 4
                                ? "#6FA56B"
                                : choice.points >= 1
                                ? "var(--paper-dim)"
                                : "#C2584A",
                          }}
                        >
                          {choice.points >= 0 ? `+${choice.points}` : choice.points}
                        </span>
                      </div>
                      <p className="mt-1 font-body text-xs leading-relaxed text-paper-dim">
                        {choice.line}
                      </p>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-line px-3 pb-3 pt-2">
                        <p className="font-body text-xs italic leading-relaxed text-paper-faint">
                          {choice.principle}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SceneEndScreen({
  ending,
  grade,
  sceneScore,
  xpGained,
  dailyBonus,
  encounter,
  stageChoices,
  onPlayAgain,
  onPickNew,
}: SceneEndScreenProps) {
  const [tab, setTab] = useState<Tab>("resolution");

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        {encounter && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-paper-faint">
            {encounter.opponent.name} · {encounter.opponent.archetype}
          </p>
        )}
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
          <span>Score {sceneScore}</span>
          {xpGained > 0 ? (
            <span>+{xpGained} XP</span>
          ) : (
            <span className="text-paper-faint">No XP</span>
          )}
          {dailyBonus && (
            <span style={{ color: "#C98A3A" }}>+10 daily</span>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-lg border border-line bg-ink-2 p-1">
        {(["resolution", "debrief", "lessons"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="flex-1 rounded-md py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors"
            style={{
              background: tab === t ? "var(--ink-3)" : "transparent",
              color: tab === t ? "var(--paper)" : "var(--paper-faint)",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "resolution" && (
        <div className="rounded-lg border border-line bg-ink-2 p-5">
          <p className="font-body text-base leading-relaxed text-paper">
            {ending.resolution}
          </p>
        </div>
      )}

      {tab === "debrief" && (
        <DebriefTab stageChoices={stageChoices ?? []} />
      )}

      {tab === "lessons" && (
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
      )}

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
