import { useEffect, useMemo, useRef, useState } from "react";
import type { Drill, Lesson } from "../../oratory/types";
import { analyze, splitSentences } from "../../oratory/analyze";
import { Examples } from "./Examples";

interface WriteDrillProps {
  lesson: Lesson;
  drill: Drill;
  initialText: string;
  onDraftChange: (text: string) => void;
  onSubmit: (text: string) => void;
  onBack: () => void;
}

/** The live gauge while typing: enough to steer by, not the full verdict. */
function LiveShape({ text }: { text: string }) {
  const { lengths, words, seconds } = useMemo(() => {
    const sentences = splitSentences(text);
    const lens = sentences.map((s) => s.words.length);
    const total = lens.reduce((a, b) => a + b, 0);
    return { lengths: lens, words: total, seconds: Math.round((total / 130) * 60) };
  }, [text]);

  if (words === 0) return null;

  const max = Math.max(...lengths, 1);

  return (
    <div className="rounded-lg border border-line bg-ink-2 p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Shape
        </span>
        <span className="font-mono text-[11px] text-paper-faint">
          {words} words · about {seconds}s spoken
        </span>
      </div>
      <div className="mt-3 flex items-end gap-1" style={{ height: 48 }}>
        {lengths.map((len, i) => (
          <div
            key={i}
            title={`Sentence ${i + 1}: ${len} words`}
            className="flex-1 rounded-sm transition-all"
            style={{
              height: `${Math.max(6, (len / max) * 100)}%`,
              background: len <= 5 ? "var(--accent)" : "var(--ink-3)",
              border: len <= 5 ? "none" : "1px solid var(--line)",
            }}
          />
        ))}
      </div>
      <p className="mt-2 font-body text-[11px] leading-snug text-paper-faint">
        One bar per sentence. The tall ones build; the highlighted short ones land.
        A flat row of equal bars is a report.
      </p>
    </div>
  );
}

export function WriteDrill({
  lesson,
  drill,
  initialText,
  onDraftChange,
  onSubmit,
  onBack,
}: WriteDrillProps) {
  const [text, setText] = useState(initialText);
  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    areaRef.current?.focus();
  }, [drill.id]);

  // Persist the draft a beat after typing stops, not on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => onDraftChange(text), 600);
    return () => clearTimeout(timer);
  }, [text, onDraftChange]);

  const wordCount = analyze(text).stats.words;
  const short = wordCount < drill.minWords;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 font-mono text-[11px] uppercase tracking-wide text-paper-faint transition-colors hover:text-paper-dim"
      >
        ← {lesson.title}
      </button>

      <h1 className="font-display text-3xl text-paper">{drill.title}</h1>
      <p className="mt-3 font-body text-[15px] leading-relaxed text-paper-dim">{drill.brief}</p>

      {drill.source && (
        <div className="mt-4 rounded-lg border border-line bg-ink-2 p-4">
          <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            The passage to fix
          </div>
          <p className="mt-2 font-body text-sm italic leading-relaxed text-paper-dim">
            {drill.source}
          </p>
        </div>
      )}

      <textarea
        ref={areaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={10}
        placeholder="Write it here. Say it out loud as you go — if you cannot say it, it is not a speech."
        className="mt-4 w-full resize-y rounded-lg border border-line bg-ink-2 p-4 font-body text-[15px] leading-relaxed text-paper placeholder:text-paper-faint focus:border-accent focus:outline-none"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-paper-faint">
          {wordCount} words{short ? ` · ${drill.minWords} needed` : ""}
        </span>
        <button
          type="button"
          disabled={short}
          onClick={() => onSubmit(text)}
          className="rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
        >
          Score it
        </button>
      </div>

      <div className="mt-4">
        <LiveShape text={text} />
      </div>

      <Examples
        drill={drill}
        editorEmpty={text.trim().length === 0}
        onUseAsStart={(passage) => {
          setText(passage);
          areaRef.current?.focus();
          areaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />
    </div>
  );
}
