import { useEffect } from "react";

interface RankUpBannerProps {
  rankName: string;
  onDismiss: () => void;
}

export function RankUpBanner({ rankName, onDismiss }: RankUpBannerProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className="banner-in fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div
        className="rounded-lg border bg-ink-2 px-6 py-3 text-center shadow-lg"
        style={{ borderColor: "var(--accent)" }}
      >
        <div className="font-mono text-[10px] uppercase tracking-wide text-paper-faint">
          Promoted
        </div>
        <div
          className="font-display text-lg"
          style={{ color: "var(--accent)" }}
        >
          {rankName}
        </div>
      </div>
    </div>
  );
}
