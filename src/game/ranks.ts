export interface Rank {
  name: string;
  xp: number;
}

export const RANKS: Rank[] = [
  { name: "Senior Director", xp: 0 },
  { name: "On the Radar", xp: 35 },
  { name: "In the Room", xp: 85 },
  { name: "VP Shortlist", xp: 150 },
  { name: "Vice President", xp: 240 },
];

export function rankFor(xp: number): string {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xp) current = rank;
  }
  return current.name;
}

export function nextRank(xp: number): { name: string; xp: number } | null {
  for (const rank of RANKS) {
    if (xp < rank.xp) return { name: rank.name, xp: rank.xp };
  }
  return null;
}
