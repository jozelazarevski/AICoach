import { z } from 'zod';

// The response schema the model must return for a dialogue turn.
export const feedbackSchema = z.object({
  rating: z.enum(['gut', 'kleiner_fehler', 'fehler']),
  better: z.string().nullable(),
  note_en: z.string().nullable(),
});

export const debriefFixSchema = z.object({
  said: z.string(),
  better: z.string(),
  why: z.string(),
});

export const debriefSchema = z.object({
  result: z.string(),
  strengths: z.array(z.string()),
  fixes: z.array(debriefFixSchema),
  next_drill: z.string(),
});

export const chatResponseSchema = z.object({
  reply_de: z.string(),
  reply_en: z.string(),
  feedback: feedbackSchema,
  hint_de: z.string(),
  goal_progress: z.number().min(0).max(100),
  scene_over: z.boolean(),
  debrief: debriefSchema.nullable(),
});

export type ChatResponseParsed = z.infer<typeof chatResponseSchema>;

// The schema for a generated custom scene.
export const generatedSceneSchema = z.object({
  title: z.string().min(1),
  emoji: z.string().min(1),
  setting: z.string().min(1),
  role: z.string().min(1),
  goal: z.string().min(1),
  twist: z.string().min(1),
  level: z.enum(['A2', 'B1']),
});

export type GeneratedSceneParsed = z.infer<typeof generatedSceneSchema>;
