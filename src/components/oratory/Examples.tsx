import { useState } from "react";
import type { Drill } from "../../oratory/types";
import { analyze } from "../../oratory/analyze";

interface ExamplesProps {
  drill: Drill;
  /** Drops an example into the editor as a starting point. */
  onUseAsStart: (text: string) => void;
  /** Offered only while the editor is empty, so nobody's draft is overwritten. */
  editorEmpty: boolean;
}

export function Examples({ drill, onUseAsStart, editorEmpty }: ExamplesProps) {
  const [open, setOpen] = useState(false);
  const examples = drill.examples ?? [];

  if (examples.length === 0) return null;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-lg border p-4 text-left transition-colors hover:bg-accent/5"
        style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))" }}
      >
        <div
          className="font-mono text-[10px] uppercase tracking-wide"
          style={{ color: "var(--accent)" }}
        >
          Stuck on the blank page?
        </div>
        <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">
          {examples.length} worked answers to this drill, each from a different
          situation, with a line on what to notice in it.
        </p>
      </button>
    );
  }

  return (
    <div
      className="mt-4 rounded-lg border p-5"
      style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-paper">Worked answers</h3>
          <p className="mt-1 font-body text-[13px] leading-relaxed text-paper-dim">
            Do not copy them. Find the one closest to something that actually
            happened to you, then write yours the same shape.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-[10px] uppercase tracking-wide text-paper-faint hover:text-paper-dim"
        >
          Hide
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {examples.map((example) => {
          const score = analyze(example.passage, drill.targets).overall;
          return (
            <div key={example.context} className="rounded-lg border border-line bg-ink-2 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
                  {example.context}
                </span>
                <span className="font-mono text-xs" style={{ color: "var(--good)" }}>
                  scores {score}
                </span>
              </div>

              <p className="mt-2 font-display text-[15px] leading-relaxed text-paper">
                {example.passage}
              </p>

              <p className="mt-2 border-t border-line pt-2 font-body text-[12px] leading-relaxed text-paper-faint">
                {example.notice}
              </p>

              {editorEmpty && (
                <button
                  type="button"
                  onClick={() => onUseAsStart(example.passage)}
                  className="mt-3 font-mono text-[10px] uppercase tracking-wide transition-colors hover:underline"
                  style={{ color: "var(--accent)" }}
                >
                  Open in the editor to rewrite as yours →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
