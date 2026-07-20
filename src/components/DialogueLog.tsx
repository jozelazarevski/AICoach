import { useEffect, useRef } from "react";
import type { LogEntry } from "../game/engine";

interface DialogueLogProps {
  log: LogEntry[];
  opponentName: string;
}

function Entry({ entry, opponentName }: { entry: LogEntry; opponentName: string }) {
  switch (entry.type) {
    case "opponent":
      return (
        <div className="ml-4 rounded-lg rounded-tl-sm bg-ink-2 px-4 py-3">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            {opponentName}
          </div>
          <p className="font-body text-sm leading-relaxed text-paper">
            {entry.text}
          </p>
        </div>
      );
    case "player":
      return (
        <div className="rounded-lg rounded-tr-sm bg-ink-3 px-4 py-3">
          <div className="mb-1 text-right font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            You
          </div>
          <p className="font-body text-sm leading-relaxed text-paper">
            {entry.text}
          </p>
        </div>
      );
    case "verdict":
      return (
        <div className="flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] font-medium"
            style={{
              color: entry.color,
              border: `1px solid ${entry.color}`,
              background: `color-mix(in srgb, ${entry.color} 10%, transparent)`,
            }}
          >
            {entry.label}
            {typeof entry.points === "number" && (
              <span>
                {entry.points >= 0 ? `+${entry.points}` : entry.points}
              </span>
            )}
          </span>
        </div>
      );
    case "reaction":
      return (
        <div className="ml-4 rounded-lg bg-ink-2/70 px-4 py-2">
          <p className="font-body text-sm italic leading-relaxed text-paper-dim">
            {entry.text}
          </p>
        </div>
      );
    case "principle":
      return (
        <div className="px-2">
          <p className="font-body text-xs italic leading-relaxed text-paper-faint">
            {entry.text}
          </p>
        </div>
      );
    case "resolution":
      return (
        <div className="rounded-lg border border-accent/60 bg-ink-2 px-4 py-4">
          <div className="mb-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            How it landed
          </div>
          <p className="font-display text-base leading-relaxed text-paper">
            {entry.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export function DialogueLog({ log, opponentName }: DialogueLogProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [log.length]);

  return (
    <div className="flex flex-col gap-3">
      {log.map((entry, i) => (
        <Entry key={i} entry={entry} opponentName={opponentName} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
