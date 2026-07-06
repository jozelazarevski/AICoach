# Sprechstunde

A German conversation trainer. An AI partner plays realistic Swiss-life roles
(bakery, Kita, SBB, Handwerker, …), improvises, pursues a secret twist, and then
debriefs the learner. Personal tool for one A2–B1 learner in Herrliberg ZH,
deployed on Vercel.

## Stack

- Next.js 14 (App Router), TypeScript
- `@anthropic-ai/sdk` — called **only** from server routes (`claude-sonnet-4-6`)
- `zod` for server-side response validation
- No database — persistence via `localStorage`
- Plain global CSS with the design tokens from the spec (paper/card/ink/pine/terra/sage/gold),
  DM Serif Display + DM Sans via `next/font`

## Architecture rules (enforced)

1. **The API key never reaches the client.** All model calls go through
   `POST /api/chat` and `POST /api/scene`. Verified: `grep -r sk-ant .next/static` is clean.
2. **Access gate.** Env var `ACCESS_CODE`. The entered code is stored in
   `localStorage` and sent as an `x-access-code` header with every API call;
   a wrong/missing code returns `401` and bounces the client back to the gate.
3. **Server-side JSON validation.** The model must return the response schema
   (`lib/schema.ts`). On a parse/validation failure the server retries once with a
   corrective nudge, then returns `502` — the client shows a friendly banner and never crashes.
4. **Turn cap & rate limit.** Each scene is capped at 16 learner turns server-side
   (the model is then told to close the scene and produce the debrief). Per-code
   rate limit of 40 requests/hour (in-memory; per-instance — noted in `lib/rateLimit.ts`).

Secret twists for the built-in scenes live in `lib/twists.ts` (server-only, imported
only by `lib/prompts.ts`), so they never appear in the client bundle.

## Project structure

```
app/
  layout.tsx            // fonts + shell
  page.tsx              // orchestrator: gate / picker / session / notebook
  globals.css           // all styling + design tokens
  api/chat/route.ts     // dialogue turns
  api/scene/route.ts    // custom scene generation
components/
  AccessGate, ScenePicker, Session, DebriefCard, Notebook, Settings, Stars
lib/
  scenes.ts             // SCENES (20), MODES (sanft/echt/schweiz)
  twists.ts             // secret twist instructions (SERVER-ONLY)
  prompts.ts            // system-prompt builders (SERVER-ONLY)
  schema.ts             // zod response + generated-scene schemas
  anthropic.ts          // model call + JSON parse/validate + one retry (SERVER-ONLY)
  rateLimit.ts          // per-code 40/hour (SERVER-ONLY)
  storage.ts            // localStorage helpers, namespaced sprechstunde:
  speech.ts             // TTS (de-CH/de-DE) + mic (webkitSpeechRecognition)
  stars.ts, api.ts, types.ts
```

## Features

- **Picker** — mode chips, custom-scene builder (one-line → playable scene), scene
  cards with best-star badges.
- **Session** — chat with per-message feedback, live goal-progress bar, hint button,
  EN toggle, auto-speak toggle + per-message speaker, mic dictation (feature-detected),
  and a "Nochmal – schwerer" replay that bumps the mode up.
- **Notizbuch** — tap-to-reveal correction cards, collected from every correction and
  every debrief fix; export as JSON and reset from the settings sheet.
- **Persistence** — Notizbuch, per-scene best stars, chosen mode, and access code,
  all in `localStorage` under `sprechstunde:`.
- **Audio** — `speechSynthesis` prefers a `de-CH` voice (falls back to `de-DE`), rate
  0.9 in Sanft mode; mic input fills the text field via the Web Speech API.

## Environment variables

Set in the Vercel dashboard and in `.env.local` (see `.env.local.example`):

```
ANTHROPIC_API_KEY=sk-ant-...
ACCESS_CODE=choose-something
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000, enter your `ACCESS_CODE`, and pick a scene.

## Deploy

```bash
vercel deploy
```

## Note on the reference file

The spec referenced a `reference/Sprechstunde.jsx` prototype, but that file was not
present in the repository. This app was therefore built directly from the CLAUDE.md
specification — porting its described scenes, modes, prompts, response schema, and
design tokens into the structure above.
