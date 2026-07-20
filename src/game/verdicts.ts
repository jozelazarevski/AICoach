export interface Verdict {
  label: string;
  color: string;
}

// Colors are CSS variables so verdict badges stay readable in every theme,
// including entries already stored in the dialogue log when the theme changes.
export function verdictFor(points: number): Verdict {
  if (points >= 5) return { label: "Masterstroke", color: "var(--good-2)" };
  if (points === 4) return { label: "Strong", color: "var(--good)" };
  if (points >= 2) return { label: "Solid", color: "var(--solid)" };
  if (points >= 0) return { label: "Flat", color: "var(--neutral)" };
  if (points >= -2) return { label: "Misstep", color: "var(--warn)" };
  return { label: "Costly", color: "var(--bad)" };
}
