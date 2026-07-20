export interface Rank {
  name: string;
  xp: number;
}

export const RANKS: Rank[] = [
  { name: "Finding Your Voice", xp: 0 },
  { name: "Holding Your Own", xp: 35 },
  { name: "Reading the Room", xp: 85 },
  { name: "Smooth Operator", xp: 150 },
  { name: "Silver Tongue", xp: 240 },
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
