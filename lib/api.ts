// Client-side API wrapper. Attaches the access code header and surfaces a typed
// error (including 401) so the UI can react.
import { getAccessCode } from './storage';
import type { ChatResponse, CustomScene, ModeId, WireMessage } from './types';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-code': getAccessCode(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let message = 'Etwas ist schiefgelaufen.';
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // ignore body parse errors
    }
    throw new ApiError(res.status, message);
  }
  return (await res.json()) as T;
}

export function postChat(input: {
  sceneId?: string;
  customScene?: Pick<CustomScene, 'title' | 'setting' | 'role' | 'goal' | 'level' | 'twist'>;
  mode: ModeId;
  messages: WireMessage[];
  turnCount: number;
}): Promise<ChatResponse> {
  return post<ChatResponse>('/api/chat', input);
}

export function postScene(description: string): Promise<{
  title: string;
  emoji: string;
  setting: string;
  role: string;
  goal: string;
  twist: string;
  level: 'A2' | 'B1';
}> {
  return post('/api/scene', { description });
}
