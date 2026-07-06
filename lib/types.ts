// Shared types used across client and server.

export type Level = 'A2' | 'B1';
export type ModeId = 'sanft' | 'echt' | 'schweiz';
export type Rating = 'gut' | 'kleiner_fehler' | 'fehler';

// A scene as shown to the learner. The secret `twist` instruction is NOT part of
// this type — for built-in scenes it lives server-side in lib/twists.ts.
export interface Scene {
  id: string;
  title: string;
  emoji: string;
  setting: string; // where it takes place, learner-facing
  role: string; // who the AI plays
  goal: string; // the learner's objective, German, learner-facing
  level: Level;
}

// A custom scene generated from a one-line description. It carries its own twist,
// because there is no server-side table to look it up in.
export interface CustomScene extends Scene {
  twist: string;
  custom: true;
}

// The scene as handed to a running session. `id` is set for built-in scenes (the
// server resolves the twist); `twist` is set for custom scenes (carried inline).
export interface SessionScene {
  id?: string;
  title: string;
  emoji: string;
  setting: string;
  role: string;
  goal: string;
  level: Level;
  twist?: string;
}

export interface Mode {
  id: ModeId;
  label: string;
  blurb: string; // one line shown under the chip
  rate: number; // speechSynthesis rate
}

export interface Feedback {
  rating: Rating;
  better: string | null;
  note_en: string | null;
}

export interface DebriefFix {
  said: string;
  better: string;
  why: string;
}

export interface Debrief {
  result: string;
  strengths: string[];
  fixes: DebriefFix[];
  next_drill: string;
}

export interface ChatResponse {
  reply_de: string;
  reply_en: string;
  feedback: Feedback;
  hint_de: string;
  goal_progress: number; // 0-100
  scene_over: boolean;
  debrief: Debrief | null;
}

// A single message in the conversation as sent to the server. Assistant content is
// the German the character said (reply_de), so the model stays in character.
export interface WireMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface NotebookEntry {
  id: string;
  scene: string; // scene title
  said: string; // what the learner said (or "—")
  better: string; // the corrected form
  note: string | null; // English note
  ts: number;
}
