import type { Rating } from './types';

// Turn the ratings collected over a scene plus the final goal progress into a
// 1–3 star score. Accuracy is weighted 60%, goal completion 40%.
export function computeStars(ratings: Rating[], goalProgress: number): 1 | 2 | 3 {
  const total = ratings.length || 1;
  const good = ratings.filter((r) => r === 'gut').length;
  const small = ratings.filter((r) => r === 'kleiner_fehler').length;
  const accuracy = (good + small * 0.5) / total;
  const combined = accuracy * 0.6 + (Math.min(100, Math.max(0, goalProgress)) / 100) * 0.4;

  if (combined >= 0.8) return 3;
  if (combined >= 0.5) return 2;
  return 1;
}

export function starString(n: number): string {
  const filled = Math.max(0, Math.min(3, Math.round(n)));
  return '★'.repeat(filled) + '☆'.repeat(3 - filled);
}
