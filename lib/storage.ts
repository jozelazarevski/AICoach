import type { ModeId, NotebookEntry } from './types';

// localStorage persistence. All keys namespaced under "sprechstunde:".
const NS = 'sprechstunde:';
const K = {
  code: NS + 'access-code',
  mode: NS + 'mode',
  notebook: NS + 'notebook',
  stars: NS + 'stars', // Record<sceneId, bestStars>
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full or unavailable — ignore for a personal tool
  }
}

// --- Access code (also sent as a header with every API call) ---
export function getAccessCode(): string {
  return read<string>(K.code, '');
}
export function setAccessCode(code: string): void {
  write(K.code, code);
}

// --- Chosen mode ---
export function getMode(): ModeId {
  return read<ModeId>(K.mode, 'sanft');
}
export function setMode(mode: ModeId): void {
  write(K.mode, mode);
}

// --- Notebook (tap-to-reveal correction cards) ---
export function getNotebook(): NotebookEntry[] {
  return read<NotebookEntry[]>(K.notebook, []);
}
export function addNotebookEntries(entries: NotebookEntry[]): NotebookEntry[] {
  if (entries.length === 0) return getNotebook();
  const next = [...entries, ...getNotebook()];
  write(K.notebook, next);
  return next;
}
export function clearNotebook(): void {
  write(K.notebook, []);
}

// --- Per-scene best stars ---
export function getBestStars(): Record<string, number> {
  return read<Record<string, number>>(K.stars, {});
}
export function recordStars(sceneId: string, stars: number): Record<string, number> {
  const all = getBestStars();
  if (!all[sceneId] || stars > all[sceneId]) {
    all[sceneId] = stars;
    write(K.stars, all);
  }
  return all;
}

// --- Export & reset ---
export function exportNotebookBlob(): { filename: string; url: string } {
  const data = {
    exported_at: new Date().toISOString(),
    entries: getNotebook(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  return { filename: 'sprechstunde-notizbuch.json', url: URL.createObjectURL(blob) };
}

export function resetAll(): void {
  if (typeof window === 'undefined') return;
  for (const key of Object.values(K)) {
    window.localStorage.removeItem(key);
  }
}

// A small stable id generator for notebook entries (no Date-based collisions issue
// here because entries are appended in a single browser).
export function newId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
