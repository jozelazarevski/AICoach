import { NextRequest, NextResponse } from 'next/server';
import { callValidated } from '@/lib/anthropic';
import { buildScenePrompt } from '@/lib/prompts';
import { generatedSceneSchema } from '@/lib/schema';
import { checkRateLimit } from '@/lib/rateLimit';

export const runtime = 'nodejs';

interface SceneBody {
  description?: string;
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

  let body: SceneBody;
  try {
    body = (await req.json()) as SceneBody;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const description = (body.description || '').trim();
  if (!description) {
    return NextResponse.json({ error: 'Bitte eine Situation beschreiben.' }, { status: 400 });
  }

  const system = buildScenePrompt(description);
  // Scene generation is a one-shot: no prior conversation, just a kick-off message.
  const messages = [{ role: 'user' as const, content: 'Erstelle die Szene.' }];

  try {
    const scene = await callValidated(system, messages, generatedSceneSchema, 0.9);
    return NextResponse.json(scene);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown';
    if (message === 'model_invalid_json') {
      return NextResponse.json(
        { error: 'Die Szene konnte nicht erstellt werden. Bitte noch einmal versuchen.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: 'Serverfehler.' }, { status: 500 });
  }
}
