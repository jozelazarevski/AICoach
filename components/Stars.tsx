// Small ★★★ display, filled up to `value` (0–3).
export default function Stars({ value, className }: { value: number; className?: string }) {
  const filled = Math.max(0, Math.min(3, Math.round(value)));
  return (
    <span className={className ?? 'stars'} aria-label={`${filled} von 3 Sternen`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < filled ? '' : 'empty'}>
          {i < filled ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}
