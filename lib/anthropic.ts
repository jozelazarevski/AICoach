// SERVER-ONLY. Wraps the Anthropic call, extracts text, parses + validates JSON,
// and retries once with a corrective nudge before giving up.
import Anthropic from '@anthropic-ai/sdk';
import type { z } from 'zod';
import { SCENE_JSON_NUDGE } from './prompts';

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1000;

let client: Anthropic | null = null;
function getClient(): Anthropic {
  if (!client) client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
  return client;
}

interface WireMessage {
  role: 'user' | 'assistant';
  content: string;
}

function extractText(message: Anthropic.Message): string {
  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
}

// The model is told to return only JSON, but be forgiving of stray fences or prose.
function parseJson(text: string): unknown | null {
  const cleaned = text.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    // fall back to the first {...} block
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

// Call the model and validate against `schema`. On a parse/validation failure,
// retry ONCE with a corrective user turn appended. Throws on a second failure.
export async function callValidated<T>(
  system: string,
  messages: WireMessage[],
  schema: z.ZodType<T>,
  temperature: number,
): Promise<T> {
  const attempt = async (msgs: WireMessage[]): Promise<{ ok: true; value: T } | { ok: false; text: string }> => {
    const resp = await getClient().messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      temperature,
      system,
      messages: msgs.map((m) => ({ role: m.role, content: m.content })),
    });
    const text = extractText(resp);
    const json = parseJson(text);
    if (json === null) return { ok: false, text };
    const result = schema.safeParse(json);
    if (result.success) return { ok: true, value: result.data };
    return { ok: false, text };
  };

  const first = await attempt(messages);
  if (first.ok) return first.value;

  // Corrective retry: echo the bad output back and ask again.
  const retryMessages: WireMessage[] = [
    ...messages,
    { role: 'assistant', content: first.text || '(keine Antwort)' },
    { role: 'user', content: SCENE_JSON_NUDGE },
  ];
  const second = await attempt(retryMessages);
  if (second.ok) return second.value;

  throw new Error('model_invalid_json');
}
