import type { Lesson } from "../../oratory/types";
import { UNITS } from "../../oratory/types";
import { LESSONS } from "../../oratory/curriculum";
import type { DrillRecord } from "../../hooks/useProgress";
import { Hud } from "../Hud";

interface OratoryHomeProps {
  records: Record<string, DrillRecord>;
  lifetimeXp: number;
  onOpenLesson: (lesson: Lesson) => void;
  onExit: () => void;
}

function lessonProgress(lesson: Lesson, records: Record<string, DrillRecord>) {
  const done = lesson.drills.filter((d) => records[d.id]).length;
  const best = lesson.drills
    .map((d) => records[d.id]?.bestScore)
    .filter((n): n is number => typeof n === "number");
  return {
    done,
    total: lesson.drills.length,
    best: best.length ? Math.max(...best) : null,
  };
}

/** The next thing to do: first lesson with an unattempted drill. */
function nextLesson(records: Record<string, DrillRecord>): Lesson | null {
  return LESSONS.find((l) => l.drills.some((d) => !records[d.id])) ?? null;
}

export function OratoryHome({ records, lifetimeXp, onOpenLesson, onExit }: OratoryHomeProps) {
  const next = nextLesson(records);
  const attempted = Object.keys(records).length;
  const totalDrills = LESSONS.reduce((a, l) => a + l.drills.length, 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-4xl text-paper">The Oratory Class</h1>
          <p className="mt-1 max-w-xl font-body text-sm leading-relaxed text-paper-dim">
            Ten lessons on making people feel something, and drills that score
            what you write and how you say it out loud.
          </p>
        </div>
        <button
          type="button"
          onClick={onExit}
          className="mt-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-paper-faint transition-colors hover:border-paper-faint hover:text-paper-dim"
        >
          Conversations
        </button>
      </header>

      <div className="mb-6 flex flex-col gap-3">
        <Hud lifetimeXp={lifetimeXp} />

        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-ink-2 px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            Drills
          </span>
          <span className="font-body text-xs text-paper-dim">
            {attempted} of {totalDrills} attempted
          </span>
          {next && (
            <button
              type="button"
              onClick={() => onOpenLesson(next)}
              className="ml-auto font-mono text-[11px] uppercase tracking-wide transition-colors hover:underline"
              style={{ color: "var(--accent)" }}
            >
              Next up: {next.title} →
            </button>
          )}
        </div>
      </div>

      {UNITS.map((unit) => {
        const lessons = LESSONS.filter((l) => l.unit === unit.id);
        return (
          <section key={unit.id} className="mb-8">
            <h2 className="font-display text-2xl text-paper">{unit.label}</h2>
            <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">{unit.blurb}</p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {lessons.map((lesson) => {
                const p = lessonProgress(lesson, records);
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    onClick={() => onOpenLesson(lesson)}
                    className="flex flex-col rounded-lg border border-line bg-ink-2 p-5 text-left transition-colors hover:border-paper-faint"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
                        {p.done}/{p.total} drills
                      </span>
                      {p.best !== null && (
                        <span className="font-mono text-xs" style={{ color: "var(--good)" }}>
                          Best {p.best}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-xl leading-snug text-paper">{lesson.title}</h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-paper-dim">
                      {lesson.oneLine}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
