# CLAUDE.md - AI Assistant Guide for AICoach

## Project Overview

**AICoach** is an AI-powered vocational career trainer that helps professionals master managing up, managing down, and career growth. It combines structured training modules with a conversational AI coach powered by Claude.

- **Repository**: `jozelazarevski/AICoach`
- **Primary branch**: `main`
- **Status**: MVP — core features implemented (training modules, AI chat coach, progress dashboard)

## Repository Structure

```
AICoach/
├── CLAUDE.md                        # This file — AI assistant guidance
├── README.md                        # Project readme
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration
├── postcss.config.mjs               # PostCSS / Tailwind CSS v4
├── eslint.config.mjs                # ESLint (flat config, next/core-web-vitals)
├── .env.example                     # Required environment variables
├── .gitignore
├── public/                          # Static assets
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout with nav
    │   ├── page.tsx                 # Landing page
    │   ├── globals.css              # Global styles (Tailwind + CSS vars)
    │   ├── api/
    │   │   └── chat/
    │   │       └── route.ts         # Claude API chat endpoint
    │   ├── coach/
    │   │   └── page.tsx             # AI chat coach interface
    │   ├── dashboard/
    │   │   └── page.tsx             # Progress tracking dashboard
    │   └── modules/
    │       ├── page.tsx             # Module listing page
    │       └── [slug]/
    │           └── page.tsx         # Individual module detail page
    ├── components/
    │   ├── nav.tsx                  # Top navigation bar
    │   └── lesson-accordion.tsx     # Expandable lesson component
    └── data/
        └── modules.ts              # Training module content and types
```

## Tech Stack

- **Language**: TypeScript
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4
- **AI**: Anthropic Claude API (`@anthropic-ai/sdk`)
- **Styling**: CSS custom properties + Tailwind, dark mode via `prefers-color-scheme`
- **State**: React `useState` + `localStorage` for progress tracking
- **Deployment**: Vercel-ready (standard Next.js)

## Development Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY

# 3. Run development server
npm run dev
```

## Key Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Pages
- **`/`** — Landing page with feature cards and CTAs
- **`/modules`** — Lists all training modules grouped by category (managing up, managing down, career growth)
- **`/modules/[slug]`** — Individual module with expandable lessons and exercises (statically generated)
- **`/coach`** — Real-time chat interface with Claude-powered AI career coach
- **`/dashboard`** — Progress tracker with checkboxes, per-module and overall progress bars

### API Routes
- **`POST /api/chat`** — Proxies messages to the Anthropic Claude API with a career coaching system prompt. Expects `{ messages: Array<{ role, content }> }`, returns `{ role, content }`.

### Data Model
- Training content lives in `src/data/modules.ts` as a typed array of `Module` objects
- Each module has a `slug`, `category`, `title`, `description`, and array of `Lesson` objects
- Each lesson has `title`, `content`, and `exercise`
- User progress is stored in `localStorage` (key: `aicoach-progress`)

### Adding New Modules
1. Add a new `Module` object to the `modules` array in `src/data/modules.ts`
2. Use one of the three categories: `"managing-up"`, `"managing-down"`, or `"career-growth"`
3. The module will automatically appear in the listing and get its own page via `[slug]`

## Git Workflow

- Default branch: `main`
- Feature branches: Use descriptive names (e.g., `feature/add-user-auth`, `fix/login-bug`)
- Write clear, concise commit messages focused on the "why"
- Do not force-push to `main`
- Do not commit secrets, credentials, or `.env` files

## Code Conventions

- **Formatting**: Tailwind CSS utility classes; no inline styles except CSS variables
- **Linting**: ESLint with `next/core-web-vitals` preset
- **Components**: Client components use `"use client"` directive; server components by default
- **Naming**: kebab-case for files, PascalCase for components, camelCase for functions/variables
- **Imports**: Use `@/*` alias for `src/` imports
- **Types**: Co-locate types with data (`src/data/modules.ts` exports both data and types)

## Guidelines for AI Assistants

1. **Read before editing** — Always read a file before modifying it.
2. **Minimal changes** — Only change what is asked for. Do not refactor surrounding code, add unsolicited comments, or introduce speculative abstractions.
3. **No secrets** — Never commit `.env` files, API keys, passwords, or credentials.
4. **Test your work** — Run `npm run build` after making changes to verify the build passes.
5. **Keep this file updated** — When adding significant structure, dependencies, or conventions, update this CLAUDE.md.
6. **Security first** — Avoid OWASP top-10 vulnerabilities. The `/api/chat` route handles API keys server-side only.
7. **Ask when uncertain** — If a task is ambiguous, ask the user rather than guessing.
8. **Module content** — When adding training content, follow the existing `Lesson` structure with practical, actionable advice and a practice exercise for each lesson.
