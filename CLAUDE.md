# CLAUDE.md - AI Assistant Guide for AICoach

## Project Overview

**AICoach** is a newly initialized project. This document serves as the canonical reference for AI assistants working on this codebase.

- **Repository**: `jozelazarevski/AICoach`
- **Primary branch**: `main`
- **Status**: Early stage — no application code, dependencies, or infrastructure yet

## Repository Structure

```
AICoach/
├── CLAUDE.md          # This file — AI assistant guidance
└── README.md          # Project readme
```

> Update this section as the project grows with new directories and files.

## Development Setup

No build tools, package managers, or dependencies are configured yet. When they are added, document setup steps here:

```bash
# TODO: Add setup instructions when the tech stack is chosen
# e.g., npm install, pip install -r requirements.txt, etc.
```

## Tech Stack

Not yet determined. Update this section when decisions are made:

- **Language**: TBD
- **Framework**: TBD
- **Database**: TBD
- **Testing**: TBD
- **CI/CD**: TBD

## Git Workflow

- Default branch: `main`
- Feature branches: Use descriptive names (e.g., `feature/add-user-auth`, `fix/login-bug`)
- Write clear, concise commit messages focused on the "why"
- Do not force-push to `main`
- Do not commit secrets, credentials, or `.env` files

## Code Conventions

Establish and document conventions here as the project takes shape:

- **Formatting**: TBD (e.g., Prettier, Black, rustfmt)
- **Linting**: TBD (e.g., ESLint, Flake8, Clippy)
- **Naming**: TBD
- **Testing**: TBD

## Key Commands

No commands configured yet. Add them here as the project develops:

```bash
# Build:     TBD
# Test:      TBD
# Lint:      TBD
# Run:       TBD
```

## Guidelines for AI Assistants

1. **Read before editing** — Always read a file before modifying it.
2. **Minimal changes** — Only change what is asked for. Do not refactor surrounding code, add unsolicited comments, or introduce speculative abstractions.
3. **No secrets** — Never commit `.env` files, API keys, passwords, or credentials.
4. **Test your work** — Run tests after making changes (once a test suite exists).
5. **Keep this file updated** — When adding significant structure, dependencies, or conventions to the project, update this CLAUDE.md to reflect the new state.
6. **Security first** — Avoid introducing OWASP top-10 vulnerabilities (injection, XSS, etc.).
7. **Ask when uncertain** — If a task is ambiguous, ask the user rather than guessing.
