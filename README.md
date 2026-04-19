# Next.js Agent-Ready Dashboard Starter

> Ship a production dashboard fast. Keep it clean forever — with or without an LLM writing the code.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## What This Is

Most dashboard starters give you a pretty UI and walk away.

This one ships with **two things working together**:

1. **A production-grade Next.js dashboard** — auth shell, sidebar, routing, state, API layer, and placeholder screens ready out of the box.
2. **An agent instruction layer** — documented standards, patterns, and a structured `AGENTS.md` that tells any LLM exactly how to work in this codebase without breaking it.

If you use Claude, Cursor, Copilot, or Codex to write code, this starter is designed to make that workflow actually reliable. The agent reads the rules. The rules enforce the architecture. The architecture stays clean as the codebase grows.

---

## Why This Exists

AI coding agents are fast. They are also very good at producing code that looks right but slowly makes a codebase unmaintainable — inconsistent patterns, wrong abstractions, bloated components, and drift from the conventions you set on day one.

This starter solves that with a **machine-readable contract** baked into the repo:

- `AGENTS.md` is the single entry point every agent reads before touching anything
- `docs/standards/` encodes the non-negotiable rules (naming, file limits, styling layers, hook constraints)
- `docs/patterns/` gives agents copy-paste-ready templates for features, queries, stores, and components
- `docs/guides/` covers task-specific workflows so agents know exactly where to put new code

The result: agents produce code that matches your architecture on the first pass, not after three rounds of review.

---

## The Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CVA + clsx + tailwind-merge |
| Server State | TanStack React Query v5 |
| Client State | Zustand v5 + Immer |
| Forms | React Hook Form + Zod |
| UI Primitives | Radix UI |
| Animation | Framer Motion |
| Charts | Recharts |
| HTTP Client | Axios |
| Notifications | Sonner |

---

## What You Get on Day One

**App shell**
- Responsive sidebar with collapse, mobile drawer, and active route highlighting
- Header with mobile menu trigger and action slots
- Page wrapper and grid wrapper for consistent layout composition

**Auth layer**
- Mock-first auth so the app runs instantly with no backend
- Token storage, session monitoring, and route guard wired up
- Swap in real auth incrementally — the structure is already there

**Starter screens**
- `/dashboard` — metric cards and nav to all feature pages
- `/integrations` — provider card grid with connect flow placeholder
- `/billing` — plan comparison and invoice history placeholder
- `/settings` — profile, workspace, and danger zone placeholder
- `/login` — split-panel auth shell with branding panel

**Infrastructure**
- API client factory with interceptors, retry, and error handling
- React Query hook factory (`createQueryHook`, `createMutationHook`)
- Zustand store factory (`createAppStore`) with Immer and devtools
- Zod-validated environment config
- WebSocket client and file upload utilities
- Toast/notification system via Sonner

---

## Agent Workflow

Every LLM that works in this repo follows the same loop:

```
READ → PLAN → IMPLEMENT → REVIEW
```

**READ** — The agent reads `AGENTS.md`, the relevant standard, and the nearest existing code before writing a single line.

**PLAN** — The agent maps the work to the architecture before touching files. No guessing where code goes.

**IMPLEMENT** — The agent reuses existing patterns. No reinventing primitives. No raw Tailwind in feature code.

**REVIEW** — The agent runs `npm run check` and validates against the post-implementation checklist before calling the work done.

This is enforced by the structure of the docs, not just by hoping the agent behaves.

---

## Code Limits (Enforced by AGENTS.md)

| Metric | Limit |
|---|---|
| File length | 150 lines |
| Hook length | 80 lines |
| `useState` per component | 3 |
| `useEffect` per component | 1 |
| Props per component | < 8 |
| Nesting depth | 3 levels |

Small, focused files. Easy for humans to review. Easy for agents to reason about.

---

## Getting Started

### 1. Clone

```bash
git clone https://github.com/your-username/nextjs-agent-dashboard-starter
cd nextjs-agent-dashboard-starter
npm install
```

### 2. Environment

```bash
cp .env.example .env.local
```

`.env.local` defaults:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dashboard Starter
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ENABLE_MOCK_API=true
```

`NEXT_PUBLIC_ENABLE_MOCK_API=true` lets the entire app run — auth, routing, data — with no backend on day one.

### 3. Run

```bash
npm run dev
```

Open `http://localhost:3000`. You land on the login screen, click **Open Dashboard**, and have a working multi-page dashboard with sidebar navigation.

---

## Project Structure

```
src/
├── app/                    # Next.js routes and layouts
│   ├── (auth)/             # Login and auth screens
│   └── (dashboard)/        # Protected dashboard pages
├── components/
│   ├── layout/             # App shell, sidebar, header, page wrappers
│   └── ui/                 # Design-system primitives (Button, Card, etc.)
├── features/               # Domain modules (types → services → hooks → components)
├── hooks/                  # Shared reusable hooks
├── lib/                    # API, auth, query, store, animations, websocket, upload
├── providers/              # App-level React providers
├── stores/                 # Global Zustand stores
├── styles/tokens/          # Design tokens (colors, spacing, radii, shadows)
└── types/                  # Shared TypeScript types
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run check` | Lint + typecheck + format check (run before every commit) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Format with Prettier |
| `npm run analyze` | Bundle analysis |

---

## Using With an Agent

Point your LLM at `AGENTS.md` as the entry document. It contains:

- the architecture map (where each type of code lives)
- the mandatory read order before any task
- Tailwind v4 syntax rules
- implementation limits
- pre- and post-implementation checklists
- escalation rules for when to stop and ask

The `docs/` folder extends it:

- `docs/standards/` — naming conventions, hook rules, styling layers, data flow
- `docs/patterns/` — ready-to-use templates for features, queries, and stores
- `docs/guides/` — step-by-step guidance for specific task types

Agents that follow this structure produce code that fits the codebase on the first pass. You spend your review time on product logic, not cleanup.

---

## Best For

- Founders building a SaaS dashboard who want to ship fast and stay clean
- Teams using AI coding agents and tired of architectural drift
- Developers who want a Next.js starter that enforces real conventions
- Agencies shipping client admin panels on a deadline

---

## License

MIT
