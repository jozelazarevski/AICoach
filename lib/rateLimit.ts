// SERVER-ONLY. Per-access-code rate limiting: 40 requests/hour.
//
// NOTE: This is an in-memory sliding window. It is per-instance, so on a scaled-out
// deployment each Vercel instance keeps its own counter and the effective limit is
// higher. That is fine for this single-user tool — the goal is only to stop a leaked
// URL from burning a lot of API credits, not to be a precise global limiter.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 40;

const hits = new Map<string, number[]>();

export function checkRateLimit(code: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const key = code || 'anon';
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    hits.set(key, recent);
    return { ok: false, retryAfterSec };
  }

  recent.push(now);
  hits.set(key, recent);
  return { ok: true, retryAfterSec: 0 };
}
