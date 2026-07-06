import { NextRequest, NextResponse } from 'next/server';
import { callValidated } from '@/lib/anthropic';
import { buildSystemPrompt } from '@/lib/prompts';
import { chatResponseSchema } from '@/lib/schema';
import { getScene } from '@/lib/scenes';
import { getTwist } from '@/lib/twists';
import { checkRateLimit } from '@/lib/rateLimit';
import type { ModeId, WireMessage } from '@/lib/types';

// Each scene is capped at this many learner turns; when reached, the model is told
// to close the scene and produce the debrief.
const MAX_LEARNER_TURNS = 16;

export const runtime = 'nodejs';

interface ChatBody {
  sceneId?: string;
  customScene?: {
    title: string;
    setting: string;
    role: string;
    goal: string;
    level: 'A2' | 'B1';
    twist: string;
  };
  mode: ModeId;
  messages: WireMessage[];
  turnCount: number; // number of learner turns taken so far, including this one
}

export async function POST(req: NextRequest) {
  // --- Access gate ---
  const code = req.headers.get('x-access-code') || '';
  if (!process.env.ACCESS_CODE || code !== process.env.ACCESS_CODE) {
    return NextResponse.json({ error: 'Falscher oder fehlender Zugangscode.' }, { status: 401 });
  }

  // --- Rate limit ---
  const rl = checkRateLimit(code);
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte später noch einmal versuchen.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    );
  }

  let body: ChatBody;
  try {
    body = (await req.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const { sceneId, customScene, mode, messages, turnCount } = body;
  if (!mode || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  // --- Resolve the scene (built-in twist stays server-side) ---
  let sceneForPrompt;
  if (customScene) {
    sceneForPrompt = customScene;
  } else if (sceneId) {
    const scene = getScene(sceneId);
    const twist = getTwist(sceneId);
    if (!scene || !twist) {
      return NextResponse.json({ error: 'Unbekannte Szene.' }, { status: 400 });
    }
    sceneForPrompt = {
      title: scene.title,
      setting: scene.setting,
      role: scene.role,
      goal: scene.goal,
      level: scene.level,
      twist,
    };
  } else {
    return NextResponse.json({ error: 'Keine Szene angegeben.' }, { status: 400 });
  }

  const forceClose = (turnCount ?? 0) >= MAX_LEARNER_TURNS;
  const system = buildSystemPrompt(sceneForPrompt, mode, forceClose);
  const temperature = 0.8;

  try {
    const result = await callValidated(system, messages, chatResponseSchema, temperature);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    if (message === 'model_invalid_json') {
      return NextResponse.json(
        { error: 'Die Antwort konnte nicht verarbeitet werden. Bitte noch einmal versuchen.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
