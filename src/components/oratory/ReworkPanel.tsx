import { useMemo, useState } from "react";
import { analyze } from "../../oratory/analyze";
import { buildAnchors, renderAnchor, rework, type Anchor } from "../../oratory/rework";
import type { Dimension } from "../../oratory/types";

interface ReworkPanelProps {
  text: string;
  targets: Dimension[];
  /**
   * Hands a new draft back to the drill. openEditor jumps straight into the
   * textarea; without it the draft is saved and the panel stays open, so
   * several anchors can be filled in one sitting.
   */
  onUseDraft: (text: string, openEditor: boolean) => void;
}

function AnchorCard({
  anchor,
  onInsert,
}: {
  anchor: Anchor;
  onInsert: (line: string) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(anchor.fields.map((f) => [f.id, f.seed]))
  );

  const preview = renderAnchor(anchor, values);
  const ready = anchor.fields.every((f) => (values[f.id] ?? "").trim().length > 0);

  return (
    <div className="rounded-lg border border-line bg-ink-2 p-4">
      <h4 className="font-display text-base text-paper">{anchor.title}</h4>
      <p className="mt-1 font-body text-[13px] leading-relaxed text-paper-dim">{anchor.why}</p>

      <div className="mt-3 flex flex-col gap-2">
        {anchor.fields.map((field) => (
          <label key={field.id} className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              {field.placeholder}
            </span>
            <input
              type="text"
              value={values[field.id] ?? ""}
              onChange={(e) => setValues((v) => ({ ...v, [field.id]: e.target.value }))}
              placeholder={field.placeholder}
              className="w-full rounded-md border border-line bg-ink px-3 py-2 font-body text-sm text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
            />
          </label>
        ))}
      </div>

      <div className="mt-3 rounded-md border border-line bg-ink p-3">
        <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Reads as
        </div>
        <p className="mt-1 font-display text-[15px] leading-relaxed text-paper">{preview}</p>
      </div>

      <p className="mt-2 font-body text-[11px] leading-snug text-paper-faint">{anchor.hint}</p>

      <button
        type="button"
        disabled={!ready}
        onClick={() => onInsert(preview)}
        className="mt-3 rounded-lg border px-4 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
        style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
      >
        {ready ? "Add to draft" : "Fill every blank"}
      </button>
    </div>
  );
}

export function ReworkPanel({ text, targets, onUseDraft }: ReworkPanelProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(text);
  const [added, setAdded] = useState(0);

  const { rewritten, edits, prompts } = useMemo(() => rework(draft), [draft]);
  const anchors = useMemo(() => buildAnchors(draft), [draft]);
  const beforeScore = useMemo(() => analyze(draft, targets).overall, [draft, targets]);
  const afterScore = useMemo(() => analyze(rewritten, targets).overall, [rewritten, targets]);

  const changed = rewritten.trim() !== draft.trim();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-lg border p-4 text-left transition-colors hover:bg-accent/5"
        style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--accent)" }}>
          Rework it
        </div>
        <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">
          Apply the cuts to your draft and build the structures it is missing,
          using your own words. {edits.length > 0 && `${edits.length} cut${edits.length === 1 ? "" : "s"} ready.`}{" "}
          {anchors.length > 0 && `${anchors.length} anchor${anchors.length === 1 ? "" : "s"} to fill.`}
        </p>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border p-5" style={{ borderColor: "color-mix(in srgb, var(--accent) 45%, var(--line))" }}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-paper">Rework it</h3>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-[10px] uppercase tracking-wide text-paper-faint hover:text-paper-dim"
        >
          Close
        </button>
      </div>

      {/* ---- the mechanical pass ---- */}
      <section>
        <h4 className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          The cuts, applied
        </h4>

        {changed ? (
          <>
            <div className="mt-2 rounded-md border border-line bg-ink p-4">
              <p className="font-body text-[15px] leading-relaxed text-paper">{rewritten}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[11px] text-paper-faint">
                {beforeScore} → <span style={{ color: "var(--good-2)" }}>{afterScore}</span>
              </span>
              <span className="font-mono text-[11px] text-paper-faint">
                {edits.length} cut{edits.length === 1 ? "" : "s"}
              </span>
            </div>
            <ul className="mt-2 flex flex-col gap-1">
              {edits.slice(0, 8).map((edit, i) => (
                <li key={i} className="font-body text-[12px] leading-snug text-paper-dim">
                  <span className="line-through opacity-60">{edit.before}</span>{" "}
                  <span className="text-paper-faint">— {edit.label}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setDraft(rewritten);
                onUseDraft(rewritten, true);
              }}
              className="mt-3 rounded-lg border px-4 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors hover:bg-accent/10"
              style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              Use this draft
            </button>
          </>
        ) : (
          <p className="mt-2 font-body text-sm leading-relaxed text-paper-dim">
            Nothing mechanical left to cut — no hedges, filler, or padding. What
            is left needs your facts, below.
          </p>
        )}
      </section>

      {/* ---- what only the writer can supply ---- */}
      {prompts.length > 0 && (
        <section className="border-t border-line pt-4">
          <h4 className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            Only you can write these
          </h4>
          <div className="mt-2 flex flex-col gap-3">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="rounded-md border border-line bg-ink-2 p-3">
                <div className="font-body text-sm text-paper">{prompt.label}</div>
                {prompt.quote && (
                  <blockquote className="mt-1 border-l-2 border-line pl-2 font-body text-[12px] italic leading-snug text-paper-faint">
                    {prompt.quote}
                  </blockquote>
                )}
                <p className="mt-1 font-body text-[13px] leading-relaxed text-paper-dim">
                  {prompt.ask}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- the missing structures ---- */}
      {anchors.length > 0 && (
        <section className="border-t border-line pt-4">
          <h4 className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            Anchors this draft is missing
          </h4>
          <p className="mt-1 font-body text-[12px] leading-relaxed text-paper-faint">
            Each one is seeded from your own words. Fill the blanks, then drop it
            into the draft where the argument turns.
          </p>
          <div className="mt-3 flex flex-col gap-3">
            {anchors.map((anchor) => (
              <AnchorCard
                key={anchor.id}
                anchor={anchor}
                onInsert={(line) => {
                  const next = `${draft.trim()}\n\n${line}`;
                  setDraft(next);
                  setAdded((n) => n + 1);
                  onUseDraft(next, false);
                }}
              />
            ))}
          </div>
        </section>
      )}

      {added > 0 && (
        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <span className="font-mono text-[11px] text-paper-faint">
            {added} anchor{added === 1 ? "" : "s"} added to the draft
          </span>
          <button
            type="button"
            onClick={() => onUseDraft(draft, true)}
            className="rounded-lg border px-4 py-2 font-mono text-[10px] uppercase tracking-wide transition-colors hover:bg-accent/10"
            style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
          >
            Open in the editor
          </button>
        </div>
      )}
    </div>
  );
}
