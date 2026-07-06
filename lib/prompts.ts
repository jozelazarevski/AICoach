// SERVER-ONLY prompt builders. Imported by the API routes.
import type { ModeId } from './types';

interface SceneForPrompt {
  title: string;
  setting: string;
  role: string;
  goal: string;
  level: 'A2' | 'B1';
  twist: string;
}

const MODE_INSTRUCTIONS: Record<ModeId, string> = {
  sanft:
    'MODUS SANFT: Sprich langsam und in klarem, einfachem Hochdeutsch. Sei besonders geduldig und ermutigend. Benutze kurze Sätze und vermeide seltene Wörter. Korrigiere Fehler sanft.',
  echt:
    'MODUS ECHT: Sprich in normalem, natürlichem Hochdeutsch mit realistischem Tempo. Sei freundlich, aber nicht übertrieben nachsichtig.',
  schweiz:
    'MODUS SCHWEIZ: Sprich Schweizer Hochdeutsch (nicht Dialekt). Verwende schweizerische Ausdrücke und Höflichkeiten wie „Grüezi“, „Merci vilmal“, „Velo“, „Billett“, „Znüni“, „es guets Nöis“ wo es passt. Bleib aber verständlich für einen Lernenden.',
};

const SCHEMA_BLOCK = `Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt (kein Markdown, kein Text davor oder danach) mit genau diesem Schema:
{
  "reply_de": string,        // was deine Figur auf Deutsch sagt (1–3 kurze Sätze, in der Rolle bleiben)
  "reply_en": string,        // eine einfache englische Übersetzung von reply_de
  "feedback": {
    "rating": "gut" | "kleiner_fehler" | "fehler",  // Bewertung der LETZTEN Nachricht des Lernenden
    "better": string | null,  // eine bessere/korrekte Formulierung, oder null wenn "gut"
    "note_en": string | null  // kurze englische Erklärung des Fehlers, oder null
  },
  "hint_de": string,         // ein hilfreicher deutscher Hinweis, was der Lernende als Nächstes sagen könnte
  "goal_progress": number,   // 0–100, wie weit der Lernende sein Ziel erreicht hat
  "scene_over": boolean,     // true, wenn die Szene abgeschlossen ist
  "debrief": null | {        // null, ausser scene_over ist true
    "result": string,        // 1–2 Sätze auf Englisch: wurde das Ziel erreicht?
    "strengths": string[],   // 1–3 Dinge auf Englisch, die gut liefen
    "fixes": [ { "said": string, "better": string, "why": string } ],  // bis zu 3 Korrekturen (why auf Englisch)
    "next_drill": string     // ein konkreter Übungstipp auf Englisch für nächstes Mal
  }
}`;

const RATING_STYLE = `Bewertungsregeln für "feedback.rating" (bewerte NUR die letzte Nachricht des Lernenden):
- "gut": verständlich und natürlich genug. better = null, note_en = null.
- "kleiner_fehler": verständlich, aber mit einem kleinen Fehler (Artikel, Wortstellung, Endung). Gib in "better" die verbesserte Fassung an. note_en optional.
- "fehler": ein echter Fehler, der die Bedeutung stört oder unhöflich wirkt. Gib "better" UND eine kurze englische Erklärung in "note_en".
Sei ermutigend. Verbessere nur echte Fehler, nicht jeden Stil. Wenn die erste Nachricht des Lernenden nur eine Begrüssung ist, ist das meistens "gut".`;

export function buildSystemPrompt(
  scene: SceneForPrompt,
  mode: ModeId,
  forceClose: boolean,
): string {
  const closing = forceClose
    ? `\nWICHTIG: Die Unterhaltung hat die maximale Länge erreicht. Bringe die Szene JETZT höflich zu einem natürlichen Ende, setze "scene_over" auf true und fülle das "debrief"-Objekt aus.`
    : `\nBeende die Szene (scene_over = true) natürlich, sobald das Ziel des Lernenden erreicht ist und ein passender Abschluss erreicht wurde. Erzwinge das Ende nicht zu früh.`;

  return `Du bist ein deutschsprachiger Gesprächspartner für einen Deutschlernenden (Niveau ${scene.level}, wohnt in Herrliberg im Kanton Zürich). Du spielst eine Rolle in einer realistischen Alltagssituation in der Schweiz und hilfst dabei, das Gespräch zu üben.

SZENE: ${scene.title}
ORT: ${scene.setting}
DEINE ROLLE: ${scene.role}
ZIEL DES LERNENDEN: ${scene.goal}

GEHEIME REGIE-ANWEISUNG (dem Lernenden NICHT verraten): ${scene.twist}
Verfolge diese Anweisung natürlich im Verlauf des Gesprächs.

${MODE_INSTRUCTIONS[mode]}

VERHALTEN:
- Bleib immer in deiner Rolle. Improvisiere realistisch und freundlich.
- Halte "reply_de" kurz (1–3 Sätze), passend zum Niveau ${scene.level}.
- Reagiere natürlich auf das, was der Lernende sagt.
- Gib bei jeder Runde Feedback zur letzten Nachricht des Lernenden.
${closing}

${RATING_STYLE}

${SCHEMA_BLOCK}`;
}

export function buildScenePrompt(description: string): string {
  return `Du erstellst eine Übungsszene für einen Deutschlernenden (Niveau A2–B1) in der Schweiz (Region Zürich). Der Lernende hat diese Situation beschrieben:

"${description}"

Erstelle daraus eine realistische, spielbare Alltagsszene. Antworte AUSSCHLIESSLICH mit einem gültigen JSON-Objekt (kein Markdown) mit genau diesem Schema:
{
  "title": string,   // kurzer deutscher Titel, z. B. "Beim Zahnarzt"
  "emoji": string,   // ein einzelnes passendes Emoji
  "setting": string, // wo die Szene spielt, kurz auf Deutsch
  "role": string,    // welche Rolle die KI spielt, auf Deutsch
  "goal": string,    // das Ziel des Lernenden, ein einfacher deutscher Satz
  "twist": string,   // eine geheime Regie-Anweisung auf Deutsch: eine kleine Komplikation oder Wendung, die die KI verfolgt
  "level": "A2" | "B1"
}
Halte alles einfach und passend zum Alltag in der Schweiz.`;
}

export const SCENE_JSON_NUDGE =
  'Deine letzte Antwort war kein gültiges JSON im geforderten Schema. Antworte JETZT erneut mit AUSSCHLIESSLICH dem JSON-Objekt, ohne Text davor oder danach.';
