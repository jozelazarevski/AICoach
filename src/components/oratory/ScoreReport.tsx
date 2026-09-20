import { bandFor } from "../../oratory/analyze";
import type { Coaching } from "../../oratory/coach";
import { useSpring } from "../../hooks/useSpring";

export interface ReportItem {
  label: string;
  score: number;
  detail: string;
  blurb?: string;
}

export interface ReportFinding {
  kind: "strength" | "fix";
  tag: string;
  label: string;
  quote?: string;
  note: string;
}

export type CoachState =
  | { status: "off" }
  | { status: "loading" }
  | { status: "ready"; coaching: Coaching }
  | { status: "failed"; reason: string };

interface ScoreReportProps {
  overall: number;
  headline: string;
  items: ReportItem[];
  findings: ReportFinding[];
  xpGained: number;
  previousBest?: number;
  coachNote: string;
  coach: CoachState;
  onRetry: () => void;
  onBack: () => void;
}

function scoreColor(score: number): string {
  if (score >= 85) return "var(--good-2)";
  if (score >= 70) return "var(--good)";
  if (score >= 55) return "var(--solid)";
  if (score >= 40) return "var(--warn)";
  return "var(--bad)";
}

function ScoreBar({ item }: { item: ReportItem }) {
  const animated = useSpring(Math.max(0, Math.min(100, item.score)));
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          {item.label}
        </span>
        <span className="font-mono text-xs" style={{ color: scoreColor(item.score) }}>
          {item.score}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink-3">
        <div
          className="h-full rounded-full"
          style={{ width: `${animated}%`, background: scoreColor(item.score) }}
        />
      </div>
      <div className="mt-1 font-body text-[11px] leading-snug text-paper-faint">{item.detail}</div>
    </div>
  );
}

function FindingCard({ finding }: { finding: ReportFinding }) {
  const isFix = finding.kind === "fix";
  const color = isFix ? "var(--warn)" : "var(--good)";
  return (
    <div
      className="rounded-lg border bg-ink-2 p-4"
      style={{ borderColor: `color-mix(in srgb, ${color} 35%, var(--line))` }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
          style={{ color, border: `1px solid ${color}`, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
        >
          {isFix ? "Fix" : "Working"}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          {finding.tag}
        </span>
      </div>
      <div className="mt-2 font-display text-base text-paper">{finding.label}</div>
      {finding.quote && (
        <blockquote
          className="mt-2 border-l-2 pl-3 font-body text-sm italic leading-relaxed text-paper-dim"
          style={{ borderColor: color }}
        >
          {finding.quote}
        </blockquote>
      )}
      <p className="mt-2 font-body text-sm leading-relaxed text-paper-dim">{finding.note}</p>
    </div>
  );
}

function CoachPanel({ coach }: { coach: CoachState }) {
  if (coach.status === "off") return null;

  if (coach.status === "loading") {
    return (
      <div className="rounded-lg border border-line bg-ink-2 p-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
          <span className="font-body text-sm text-paper-dim">The coach is reading it.</span>
        </div>
      </div>
    );
  }

  if (coach.status === "failed") {
    return (
      <div className="rounded-lg border border-line bg-ink-2 p-4">
        <p className="font-body text-xs leading-relaxed text-paper-faint">
          The coach could not be reached ({coach.reason}), so this is the offline
          read. It measures everything above on its own — the coach only adds a
          rewrite.
        </p>
      </div>
    );
  }

  const { coaching } = coach;
  const rows: [string, string][] = [
    ["What lands", coaching.strongest],
    ["What costs you", coaching.weakest],
  ];

  return (
    <div className="rounded-lg border border-accent/40 bg-ink-2 p-5" style={{ borderColor: "color-mix(in srgb, var(--accent) 40%, var(--line))" }}>
      <h3 className="font-mono text-[10px] uppercase tracking-wide" style={{ color: "var(--accent)" }}>
        The coach's read
      </h3>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-paper">{coaching.read}</p>

      <div className="mt-4 flex flex-col gap-3">
        {rows
          .filter(([, value]) => value)
          .map(([label, value]) => (
            <div key={label}>
              <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
                {label}
              </div>
              <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">{value}</p>
            </div>
          ))}
      </div>

      {coaching.rewrite && (
        <div className="mt-4 rounded-md border border-line bg-ink p-4">
          <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            Rewritten
          </div>
          <p className="mt-2 font-display text-[15px] leading-relaxed text-paper">
            {coaching.rewrite}
          </p>
        </div>
      )}

      {coaching.next && (
        <div className="mt-4 border-t border-line pt-3">
          <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            Next draft
          </div>
          <p className="mt-1 font-body text-sm leading-relaxed text-paper">{coaching.next}</p>
        </div>
      )}
    </div>
  );
}

export function ScoreReport({
  overall,
  headline,
  items,
  findings,
  xpGained,
  previousBest,
  coachNote,
  coach,
  onRetry,
  onBack,
}: ScoreReportProps) {
  const band = bandFor(overall);
  const beatBest = previousBest !== undefined && overall > previousBest;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="rounded-lg border border-line bg-ink-2 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              {headline}
            </div>
            <div className="mt-1 font-display text-3xl" style={{ color: band.color }}>
              {band.label}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-5xl text-paper">{overall}</div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
              out of 100
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ScoreBar key={item.label} item={item} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-4">
          <span className="font-mono text-xs" style={{ color: "var(--good-2)" }}>
            +{xpGained} XP
          </span>
          {previousBest !== undefined && (
            <span className="font-mono text-[11px] text-paper-faint">
              {beatBest ? `New best — was ${previousBest}` : `Your best: ${previousBest}`}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {findings.map((finding, i) => (
          <FindingCard key={`${finding.label}-${i}`} finding={finding} />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <CoachPanel coach={coach} />

        <div className="rounded-lg border border-line bg-ink-2 p-4">
          <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
            From the lesson
          </div>
          <p className="mt-1 font-body text-sm leading-relaxed text-paper-dim">{coachNote}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg border px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors hover:bg-accent/10"
          style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
        >
          Another pass
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-paper-dim transition-colors hover:border-paper-faint"
        >
          Back to the lesson
        </button>
      </div>
    </div>
  );
}
