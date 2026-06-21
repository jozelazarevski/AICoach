interface MetersProps {
  standing: number;
  momentum: number;
  sceneScore: number;
  pop?: { points: number; key: number } | null;
}

function standingColor(value: number): string {
  if (value >= 66) return "#6FA56B";
  if (value >= 33) return "#C98A3A";
  return "#C2584A";
}

function Bar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          {label}
        </span>
        <span className="font-mono text-xs text-paper-dim">
          {Math.round(value)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-ink-3">
        <div
          className="h-full rounded-full transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }}
        />
      </div>
    </div>
  );
}

export function Meters({ standing, momentum, sceneScore, pop }: MetersProps) {
  return (
    <div className="relative flex flex-col gap-3 rounded-lg border border-line bg-ink-2 p-4">
      <Bar label="Standing" value={standing} color={standingColor(standing)} />
      <Bar label="Momentum" value={momentum} color="var(--accent)" />
      <div className="flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Scene score
        </span>
        <div className="relative">
          <span className="font-display text-lg text-paper">{sceneScore}</span>
          {pop && (
            <span
              key={pop.key}
              className="points-pop pointer-events-none absolute -right-1 top-0 font-mono text-sm font-medium"
              style={{
                color: pop.points >= 0 ? "#7BC47F" : "#C2584A",
              }}
            >
              {pop.points >= 0 ? `+${pop.points}` : pop.points}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
