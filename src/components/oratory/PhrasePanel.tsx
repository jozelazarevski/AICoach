import { useMemo, useState } from "react";
import { rankPhrases } from "../../oratory/analyze";
import type { PhraseScore } from "../../oratory/types";

interface PhrasePanelProps {
  text: string;
}

const ROLE_LABEL: Record<PhraseScore["role"], string> = {
  build: "builds",
  drop: "lands",
  flat: "flat",
};

function scoreColor(score: number): string {
  if (score >= 80) return "var(--good-2)";
  if (score >= 65) return "var(--good)";
  if (score >= 50) return "var(--solid)";
  if (score >= 35) return "var(--warn)";
  return "var(--bad)";
}

function PhraseRow({ phrase, total }: { phrase: PhraseScore; total: number }) {
  const color = scoreColor(phrase.score);
  const isBest = phrase.rank === 1;
  const isWorst = phrase.rank === total && total > 1;

  return (
    <div
      className="rounded-lg border bg-ink-2 p-4"
      style={{
        borderColor: isBest
          ? "color-mix(in srgb, var(--good) 45%, var(--line))"
          : isWorst
          ? "color-mix(in srgb, var(--warn) 40%, var(--line))"
          : "var(--line)",
      }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-display text-lg" style={{ color }}>
          #{phrase.rank}
        </span>
        <span className="font-mono text-xs" style={{ color }}>
          {phrase.score}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          sentence {phrase.index + 1} · {phrase.words} words · {ROLE_LABEL[phrase.role]}
        </span>
        {isBest && (
          <span
            className="ml-auto rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
            style={{
              color: "var(--good)",
              border: "1px solid var(--good)",
              background: "color-mix(in srgb, var(--good) 12%, transparent)",
            }}
          >
            Strongest
          </span>
        )}
      </div>

      <p className="mt-2 font-body text-[15px] leading-relaxed text-paper">{phrase.text}</p>

      {(phrase.working.length > 0 || phrase.dragging.length > 0) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {phrase.working.map((tag) => (
            <span
              key={`w-${tag}`}
              className="rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide"
              style={{
                color: "var(--good)",
                border: "1px solid color-mix(in srgb, var(--good) 45%, transparent)",
              }}
            >
              {tag}
            </span>
          ))}
          {phrase.dragging.map((tag) => (
            <span
              key={`d-${tag}`}
              className="rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide"
              style={{
                color: "var(--warn)",
                border: "1px solid color-mix(in srgb, var(--warn) 45%, transparent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-2 font-body text-[12px] leading-snug text-paper-faint">{phrase.note}</p>
    </div>
  );
}

export function PhrasePanel({ text }: PhrasePanelProps) {
  const [order, setOrder] = useState<"rank" | "draft">("rank");
  const phrases = useMemo(() => rankPhrases(text), [text]);

  if (phrases.length === 0) return null;

  const shown =
    order === "rank" ? [...phrases].sort((a, b) => a.rank - b.rank) : phrases;
  const keepers = phrases.filter((p) => p.score >= 75).length;

  return (
    <div className="rounded-lg border border-line bg-ink p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-paper">Line by line</h3>
          <p className="mt-1 font-body text-[13px] leading-relaxed text-paper-dim">
            Every sentence ranked against the others in this draft.{" "}
            {keepers > 0
              ? `${keepers} of ${phrases.length} ${keepers === 1 ? "is" : "are"} already working — keep ${keepers === 1 ? "it" : "them"} when you rewrite.`
              : "Nothing here clears 75 yet, so rewrite from the top-ranked line rather than keeping any of it whole."}
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-line bg-ink-2 p-1">
          {(
            [
              ["rank", "By rank"],
              ["draft", "In order"],
            ] as ["rank" | "draft", string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setOrder(key)}
              className="rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide transition-colors"
              style={{
                background: order === key ? "var(--ink-3)" : "transparent",
                color: order === key ? "var(--paper)" : "var(--paper-faint)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {shown.map((phrase) => (
          <PhraseRow key={phrase.index} phrase={phrase} total={phrases.length} />
        ))}
      </div>
    </div>
  );
}
