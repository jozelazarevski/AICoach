export interface Verdict {
  label: string;
  color: string;
}

export function verdictFor(points: number): Verdict {
  if (points >= 5) return { label: "Masterstroke", color: "#7BC47F" };
  if (points === 4) return { label: "Strong", color: "#6FA56B" };
  if (points >= 2) return { label: "Solid", color: "#9FB36A" };
  if (points >= 0) return { label: "Flat", color: "#9AA1AD" };
  if (points >= -2) return { label: "Misstep", color: "#C98A3A" };
  return { label: "Costly", color: "#C2584A" };
}
