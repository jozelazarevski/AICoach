import { useState } from "react";
import type { Choice, Encounter } from "../game/types";
import type { GameState } from "../game/engine";
import { applyChoice } from "../game/engine";
import { resolveFreeform } from "../game/freeform";
import { DialogueLog } from "./DialogueLog";
import { Meters } from "./Meters";
import { ChoiceCard } from "./ChoiceCard";
import { FreeformInput } from "./FreeformInput";

interface PlayScreenProps {
  encounter: Encounter;
  state: GameState;
  onStateChange: (next: GameState) => void;
  apiEnabled: boolean;
}

export function PlayScreen({
  encounter,
  state,
  onStateChange,
  apiEnabled,
}: PlayScreenProps) {
  const [pop, setPop] = useState<{ points: number; key: number } | null>(null);
  const [resolving, setResolving] = useState(false);

  const stage = encounter.stages[state.stageIndex];

  const triggerPop = (points: number) => {
    setPop({ points, key: Date.now() });
  };

  const handleChoice = (choice: Choice) => {
    if (resolving || state.status !== "playing") return;
    setResolving(true);
    triggerPop(choice.points);
    const next = applyChoice(encounter, state, choice);
    onStateChange(next);
    setResolving(false);
  };

  const handleFreeform = (text: string) => {
    if (resolving || state.status !== "playing" || !stage) return;
    setResolving(true);
    const result = resolveFreeform(text, stage, state, { apiEnabled });
    const synthetic: Choice = {
      id: "freeform",
      tag: result.label,
      line: text,
      points: result.points,
      standing: result.standing,
      momentum: result.momentum,
      reaction: result.reaction,
      principle: result.principle,
    };
    triggerPop(result.points);
    const next = applyChoice(encounter, state, synthetic);
    onStateChange(next);
    setResolving(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-paper">{encounter.title}</h1>
        <p className="font-body text-xs leading-relaxed text-paper-faint">
          {encounter.objective}
        </p>
      </div>

      <Meters
        standing={state.standing}
        momentum={state.momentum}
        sceneScore={state.sceneScore}
        pop={pop}
      />

      <div className="max-h-[46vh] overflow-y-auto rounded-lg border border-line bg-ink px-1 py-2">
        <DialogueLog log={state.log} opponentName={encounter.opponent.name} />
      </div>

      {state.status === "playing" && stage && (
        <div className="flex flex-col gap-3">
          {stage.choices.map((choice) => (
            <ChoiceCard
              key={choice.id}
              choice={choice}
              disabled={resolving}
              onSelect={handleChoice}
            />
          ))}
          <FreeformInput
            key={stage.id}
            disabled={resolving}
            onSubmit={handleFreeform}
          />
        </div>
      )}
    </div>
  );
}
