<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing code, and follow deprecation notices.
<!-- END:nextjs-agent-rules -->
## Single Entry Point

`AGENTS.md` is the only agent-entry document in this repo.

This file contains the starter overview, workflow, structure guidance, and review checklist.

## Starter Overview

This repo is a reusable frontend dashboard starter.

- Primary starter route: `/dashboard`
- Default starter pages: `/dashboard`, `/integrations`, `/billing`, `/settings`
- Mock-first startup is enabled so the app works before a backend is wired
- `src/features/` may contain optional sample code, but agents should not assume those domains are the main product surface

## Architecture Overview

Use this high-level map when deciding where work belongs:

| Area | Purpose |
|---|---|
| `src/app/` | Next.js routes, layouts, and route-level wrappers |
| `src/components/layout/` | Shell, sidebar, header, wrappers, page structure |
| `src/components/ui/` | Reusable design-system primitives |
| `src/features/` | Domain modules: types, services, hooks, components, optional store |
| `src/lib/` | Shared infrastructure: api, auth, query, store, upload, websocket, animations |
| `src/hooks/` | Shared reusable hooks |
| `src/providers/` | App-wide React providers |
| `src/stores/` | Global Zustand stores |
| `src/styles/tokens/` | Design tokens |
| `docs/standards/` | Rules and constraints |
| `docs/patterns/` | Templates and implementation patterns |
| `docs/guides/` | Task-oriented guidance |

## Mandatory Read Order

Before implementing anything:

1. Read this file.
2. Read the relevant file(s) in `docs/standards/`.
3. Read the relevant file(s) in `docs/patterns/`.
4. Read the closest existing code in `src/app/`, `src/components/`, or `src/features/`.
5. Read the relevant Next.js guide in `node_modules/next/dist/docs/` if the task touches routing, layouts, metadata, rendering, or app structure.

## Tailwind v4 Rules

This project uses Tailwind CSS v4. Never use v3 bracket syntax.

| v3 (WRONG) | v4 (CORRECT) |
|---|---|
| `text-[var(--text-muted)]` | `text-(--text-muted)` |
| `bg-[var(--color-error)]` | `bg-error` |
| `border-black/[.08]` | `border-black/8` |
| `bg-gradient-to-br` | `bg-linear-to-br` |
| `z-[100]` | `z-100` |

Styling must follow the 3-layer rule:

1. Design tokens
2. CVA variants
3. Component JSX

No raw visual Tailwind in feature code.

## Core Implementation Rules

- Use `createAppStore`, `createQueryHook`, and `createMutationHook`.
- Use Zod schemas with inferred types.
- Components should follow `Component.tsx` + `Component.variants.ts` + `index.ts` when they are reusable UI primitives.
- Keep route files thin. Business logic belongs in features, hooks, services, or shared libraries.
- Use `@/lib/animations` presets rather than inline animation values.
- Prefer existing UI components before creating new ones.
- Do not assume campaigns, brand, or any old domain model is the main starter use case.
- `/dashboard` is the main starter landing page. Do not switch the starter back to a domain-specific entry route unless explicitly asked.

## Mandatory Workflow

Every implementation task follows:

```
READ -> PLAN -> IMPLEMENT -> REVIEW
```

### 1. READ

- Identify the user goal and the affected domain.
- Read the relevant standards and patterns first.
- Inspect similar existing code before changing anything.
- Identify all files likely to be created, removed, or modified.

### 2. PLAN

- Keep the plan consistent with the current architecture in `ARCHITECTURE.md`.
- Decide whether the work belongs in `app`, `components`, `features`, `lib`, or `stores`.
- Check naming against `docs/standards/NAMING_CONVENTIONS.md`.
- Flag shared-infrastructure changes before making them.

### 3. IMPLEMENT

- Reuse existing patterns.
- Keep code changes scoped to the task.
- Preserve mock-first behavior unless the task explicitly wires a real backend.
- Keep starter docs aligned with any structural change.

### 4. REVIEW

- Run verification commands.
- Check limits and styling rules.
- Confirm the user-visible routes and docs still match the repo’s current shape.

## Pre-Implementation Checklist

- Read the relevant `docs/standards/` file(s).
- Read the relevant `docs/patterns/` file(s).
- Inspect similar files already in the repo.
- Identify affected routes, components, hooks, services, stores, and docs.
- Check loading, empty, error, accessibility, and responsive states.
- Confirm whether the change affects shared infrastructure.

## Build Checklist

- Feature structure should follow `types -> services -> hooks -> components -> page`.
- Shared UI components go in `src/components/ui/`.
- Layout/shell components go in `src/components/layout/`.
- Global state goes in `src/stores/`.
- Feature state only gets a feature store if React Query cache is not enough.
- Route pages live in `src/app/(dashboard)/` or `src/app/(auth)/`.

## Post-Implementation Checklist

- `npm run check` passes.
- No file exceeds 150 lines when a clean extraction is possible.
- No hook exceeds 80 lines when a clean extraction is possible.
- No component has more than 3 `useState` calls.
- No component has more than 1 `useEffect`.
- Tailwind uses v4 syntax only.
- Feature code does not contain raw visual Tailwind classes.
- Loading, error, and empty states are handled where relevant.
- Keyboard navigation and ARIA labeling are present where relevant.
- Docs are updated when routes, setup, or workflow expectations change.

## Escalation Rules

Stop and ask for clarification when:

- The task requires a new architecture pattern not covered in `docs/patterns/`
- The requested change conflicts with a documented standard
- The task requires modifying shared infrastructure in `src/lib/` and the impact is unclear
- A clean implementation would exceed the file/hook limits without an obvious extraction path
- The route or domain ownership is ambiguous

## Code Limits

| Metric | Limit |
|---|---|
| File length | 150 lines max |
| Hook length | 80 lines max |
| `useState` per component | 3 max |
| `useEffect` per component | 1 max |
| Component props | Prefer fewer than 8 |
| Nesting depth | 3 levels max |

## Agent Prompt

When starting work in this repo, assume the following:

- You are working on a brand dashboard product.
- `/dashboard` is the main starter surface.
- `AGENTS.md` is the only agent instruction entry point.
- Docs, routes, and starter copy should stay generic unless the user explicitly asks for domain-specific branding.
