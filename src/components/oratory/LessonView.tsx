import type { Drill, Lesson } from "../../oratory/types";
import type { DrillRecord } from "../../hooks/useProgress";

interface LessonViewProps {
  lesson: Lesson;
  records: Record<string, DrillRecord>;
  onStartDrill: (drill: Drill) => void;
  onBack: () => void;
}

const KIND_LABEL: Record<Drill["kind"], string> = {
  write: "Write",
  rewrite: "Rewrite",
  speak: "Speak",
};

export function LessonView({ lesson, records, onStartDrill, onBack }: LessonViewProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 font-mono text-[11px] uppercase tracking-wide text-paper-faint transition-colors hover:text-paper-dim"
      >
        ← All lessons
      </button>

      <h1 className="font-display text-4xl leading-tight text-paper">{lesson.title}</h1>
      <p className="mt-2 font-body text-[15px] italic leading-relaxed text-paper-dim">
        {lesson.oneLine}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {lesson.body.map((para, i) => (
          <p key={i} className="font-body text-[15px] leading-[1.75] text-paper-dim">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-7 rounded-lg border border-line bg-ink-2 p-5">
        <h2 className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Before and after
        </h2>
        <div className="mt-3 flex flex-col gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--bad)" }}>
              Flat
            </div>
            <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">
              {lesson.example.flat}
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--good-2)" }}>
              Charged
            </div>
            <p className="mt-1 font-display text-[17px] leading-relaxed text-paper">
              {lesson.example.charged}
            </p>
          </div>
          <p className="border-t border-line pt-3 font-body text-[13px] leading-relaxed text-paper-faint">
            {lesson.example.why}
          </p>
        </div>
      </div>

      <div className="mt-7">
        <h2 className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          What to actually do
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {lesson.moves.map((move, i) => (
            <li key={i} className="flex gap-3 font-body text-sm leading-relaxed text-paper-dim">
              <span className="font-mono text-xs text-paper-faint">{i + 1}</span>
              <span>{move}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="font-display text-xl text-paper">Drills</h2>
        <div className="mt-3 flex flex-col gap-3">
          {lesson.drills.map((drill) => {
            const record = records[drill.id];
            return (
              <button
                key={drill.id}
                type="button"
                onClick={() => onStartDrill(drill)}
                className="group flex flex-col rounded-lg border border-line bg-ink-2 p-5 text-left transition-colors hover:border-paper-faint"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                    style={{
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                    }}
                  >
                    {KIND_LABEL[drill.kind]}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: record ? "var(--good)" : "var(--paper-faint)" }}
                  >
                    {record ? `Best ${record.bestScore} · ${record.attempts} tries` : "Not attempted"}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg text-paper">{drill.title}</h3>
                <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">
                  {drill.brief}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
