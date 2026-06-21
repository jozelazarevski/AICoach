import { rankFor, nextRank } from "../game/ranks";

interface HudProps {
  lifetimeXp: number;
}

export function Hud({ lifetimeXp }: HudProps) {
  const rank = rankFor(lifetimeXp);
  const next = nextRank(lifetimeXp);

  let fillPct = 100;

  // Compute floor as the highest rank xp <= lifetimeXp.
  const RANKS_XP = [0, 35, 85, 150, 240];
  let currentFloor = 0;
  for (const x of RANKS_XP) if (lifetimeXp >= x) currentFloor = x;
  if (next) {
    const span = next.xp - currentFloor;
    fillPct = span > 0 ? ((lifetimeXp - currentFloor) / span) * 100 : 100;
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-line bg-ink-2 px-4 py-3">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Rank
        </span>
        <span className="font-mono text-sm text-paper">{rank}</span>
      </div>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-ink-3">
          <div
            className="h-full rounded-full transition-[width] duration-500 ease-out"
            style={{
              width: `${Math.max(0, Math.min(100, fillPct))}%`,
              background: "var(--accent)",
            }}
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-paper-faint">
          <span>{lifetimeXp} XP</span>
          {next ? (
            <span>
              {next.name} at {next.xp}
            </span>
          ) : (
            <span>Top rank</span>
          )}
        </div>
      </div>
    </div>
  );
}
