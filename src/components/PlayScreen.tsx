import { useEffect, useRef, useState } from "react";
import type { Choice, Encounter } from "../game/types";
import type { GameState } from "../game/engine";
import { applyChoice, peekNextTurn, resolvePrompt, type TurnOverrides } from "../game/engine";
import { resolveFreeform } from "../game/freeform";
import { llmDynamicTurn, llmJudgeLine } from "../game/llm";
import { playVerdict } from "../game/sounds";
import { DialogueLog } from "./DialogueLog";
import { Meters } from "./Meters";
import { ChoiceCard } from "./ChoiceCard";
import { FreeformInput } from "./FreeformInput";

const ARCHETYPE_TELLS: Record<string, string> = {
  "Skeptical Principal":
    "Softens when you name uncertainty before claiming you solved it. Hardens when you lead with confidence you have not yet earned.",
  "Guarded Manager":
    "Opens when you frame the fix as a shared interest, not a credit claim. Closes when they feel accused or undermined.",
  "Territorial Counterpart":
    "Needs to feel they chose to cooperate. Entrenches the moment they sense a power move.",
  "Constrained Sponsor":
    "Can only commit to paths they can see and defend upward. Vague asks leave them with nothing to say yes to.",
  "External Counterpart":
    "Reads your credibility from how specific you are. Vagueness signals weakness. Over-claiming destroys trust permanently.",
  "Deal Maker":
    "Negotiates every day; you do it twice a year. Loses power when you name numbers calmly and look ready to walk away. Feeds on excitement and fake deadlines.",
  "Gatekeeper":
    "Enforces rules they did not write. Fights you if you attack the policy. Helps you if you make it easy to say yes inside it. Ask what they can do, not why they cannot.",
  "Close to Home":
    "The relationship continues after the conversation ends. A win that costs trust is a loss. Softens when you are honest about your own limits. Hardens when you keep score.",
};

interface PlayScreenProps {
  encounter: Encounter;
  state: GameState;
  onStateChange: (next: GameState) => void;
  onExit: () => void;
  apiEnabled: boolean;
}

export function PlayScreen({
  encounter,
  state,
  onStateChange,
  onExit,
  apiEnabled,
}: PlayScreenProps) {
  const [pop, setPop] = useState<{ points: number; key: number } | null>(null);
  const [resolving, setResolving] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [pending, setPending] = useState<string | null>(null);
  const [aiFallback, setAiFallback] = useState(false);
  const [tellOpen, setTellOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const pendingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pending) {
      pendingRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [pending]);

  const stage = encounter.stages[state.stageIndex];

  const triggerPop = (points: number) => {
    setPop({ points, key: Date.now() });
  };

  const handleChoice = async (choice: Choice) => {
    if (resolving || state.status !== "playing") return;
    setResolving(true);

    let overrides: TurnOverrides | undefined;
    if (apiEnabled) {
      setThinking(true);
      setPending(choice.line);
      try {
        const peek = peekNextTurn(encounter, state, choice);
        const turn = await llmDynamicTurn(encounter, state, choice, peek?.prompt ?? null);
        overrides = { reaction: turn.reaction, nextPrompt: turn.nextPrompt };
      } catch {
        overrides = undefined; // fall back to scripted dialogue
        setAiFallback(true);
      } finally {
        setThinking(false);
        setPending(null);
      }
    }

    triggerPop(choice.points);
    playVerdict(choice.points);
    const next = applyChoice(encounter, state, choice, overrides);
    onStateChange(next);
    setResolving(false);
  };

  const handleFreeform = async (text: string) => {
    if (resolving || state.status !== "playing" || !stage) return;
    setResolving(true);

    let synthetic: Choice;
    let overrides: TurnOverrides | undefined;
    if (apiEnabled) {
      setThinking(true);
      setPending(text);
      try {
        // Peek with a neutral probe first; re-peek with real deltas after judging.
        const judged = await llmJudgeLine(
          encounter,
          stage,
          resolvePrompt(stage, state),
          state,
          text,
          peekNextTurn(encounter, state, {
            id: "probe",
            tag: "",
            line: "",
            points: 0,
            standing: 0,
            momentum: 0,
            reaction: "",
            principle: "",
          })?.prompt ?? null
        );
        synthetic = {
          id: "freeform",
          tag: "your words",
          line: text,
          points: judged.points,
          standing: judged.standing,
          momentum: judged.momentum,
          reaction: judged.reaction,
          principle: judged.principle,
        };
        // Only keep the generated next line if the judged deltas do not end the game.
        const realNext = peekNextTurn(encounter, state, synthetic);
        overrides = {
          reaction: judged.reaction,
          nextPrompt: realNext ? judged.nextPrompt : undefined,
        };
      } catch {
        setAiFallback(true);
        const result = resolveFreeform(text, stage, state, { apiEnabled });
        synthetic = {
          id: "freeform",
          tag: result.label,
          line: text,
          points: result.points,
          standing: result.standing,
          momentum: result.momentum,
          reaction: result.reaction,
          principle: result.principle,
        };
      } finally {
        setThinking(false);
        setPending(null);
      }
    } else {
      const result = resolveFreeform(text, stage, state, { apiEnabled });
      synthetic = {
        id: "freeform",
        tag: result.label,
        line: text,
        points: result.points,
        standing: result.standing,
        momentum: result.momentum,
        reaction: result.reaction,
        principle: result.principle,
      };
    }

    triggerPop(synthetic.points);
    playVerdict(synthetic.points);
    const next = applyChoice(encounter, state, synthetic, overrides);
    onStateChange(next);
    setResolving(false);
  };

  // Swipe right on the choices area selects first choice; swipe left selects last.
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!stage || resolving || state.status !== "playing") return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 80 || Math.abs(dy) > Math.abs(dx) * 0.8) return;
    // Horizontal swipe: pick first or last choice.
    const choice = dx > 0 ? stage.choices[0] : stage.choices[stage.choices.length - 1];
    if (choice) handleChoice(choice);
  };

  const tell = ARCHETYPE_TELLS[encounter.opponent.archetype];

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onExit}
              className="mt-0.5 flex-shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-paper-faint transition-colors hover:border-paper-faint hover:text-paper-dim"
              title="Leave this conversation"
              aria-label="Back to all conversations"
            >
              ← Back
            </button>
            <h1 className="font-display text-2xl text-paper">{encounter.title}</h1>
          </div>
          {tell && (
            <button
              type="button"
              onClick={() => setTellOpen((o) => !o)}
              className="mt-1 flex-shrink-0 rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-paper-faint transition-colors hover:border-paper-faint hover:text-paper-dim"
              title="Opponent tell"
            >
              {tellOpen ? "Hide tell" : "Show tell"}
            </button>
          )}
        </div>
        <p className="font-body text-xs leading-relaxed text-paper-faint">
          {encounter.objective}
        </p>
      </div>

      {tellOpen && tell && (
        <div className="rounded-lg border border-line bg-ink-2 px-4 py-3">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            {encounter.opponent.archetype}
          </div>
          <p className="font-body text-sm leading-relaxed text-paper-dim">{tell}</p>
        </div>
      )}

      <Meters
        standing={state.standing}
        momentum={state.momentum}
        sceneScore={state.sceneScore}
        pop={pop}
      />

      <div className="max-h-[40vh] overflow-y-auto rounded-lg border border-line bg-ink px-1 py-2 sm:max-h-[46vh]">
        <div className="mx-3 mb-3 mt-1 border-l-2 border-line py-1 pl-3">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            The scene
          </div>
          <p className="font-body text-xs italic leading-relaxed text-paper-dim">
            {encounter.scene}
          </p>
        </div>
        <DialogueLog log={state.log} opponentName={encounter.opponent.name} />
        {pending && (
          <div ref={pendingRef} className="mt-3 flex flex-col gap-3">
            <div className="rounded-lg rounded-tr-sm bg-ink-3 px-4 py-3">
              <div className="mb-1 text-right font-mono text-[10px] uppercase tracking-wide text-paper-faint">
                You
              </div>
              <p className="font-body text-sm leading-relaxed text-paper">{pending}</p>
            </div>
            {thinking && (
              <div className="ml-4 flex w-fit items-center gap-1.5 rounded-lg rounded-tl-sm bg-ink-2 px-4 py-3">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
          </div>
        )}
      </div>

      {aiFallback && apiEnabled && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-line bg-ink-2 px-4 py-2.5">
          <p className="font-body text-xs leading-relaxed text-paper-dim">
            Live AI is not reachable right now, so the scripted dialogue is
            playing instead. If you run this game, set ANTHROPIC_API_KEY on the
            server to turn live conversations on.
          </p>
          <button
            type="button"
            onClick={() => setAiFallback(false)}
            className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wide text-paper-faint hover:text-paper-dim"
          >
            Dismiss
          </button>
        </div>
      )}

      {state.status === "playing" && stage && (
        <div
          className="flex flex-col gap-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
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
            aiLive={apiEnabled}
            onSubmit={handleFreeform}
          />
        </div>
      )}
    </div>
  );
}
