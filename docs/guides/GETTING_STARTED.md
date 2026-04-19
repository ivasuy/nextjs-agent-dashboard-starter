# Getting Started

## Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | >= 20 | `node -v` |
| npm | >= 10 | `npm -v` |
| Git | Latest | `git --version` |

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd frontend-dashboard-starter

# Install dependencies
npm install
```

## Environment Setup

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Dashboard Starter
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws
NEXT_PUBLIC_ENABLE_MOCK_API=true
```

Never commit this file. It is already in `.gitignore`.

With `NEXT_PUBLIC_ENABLE_MOCK_API=true`, the dashboard starts with mock auth and reference data. Turn it off when you connect real auth and APIs.

## First Run

```bash
# Start development server with Turbopack
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint (zero-warning policy) |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | TypeScript type checking |
| `npm run check` | Run all checks (lint + typecheck + format) |
| `npm run analyze` | Bundle analyzer |

## IDE Setup

### VS Code (Recommended)

Install these extensions:
- **ESLint** -- lint on save
- **Prettier** -- format on save
- **Tailwind CSS IntelliSense** -- class autocomplete
- **TypeScript Nightly** -- latest TS features

Recommended settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### Cursor / Windsurf

Same extensions apply. Additionally, read `AGENTS.md` for repo-specific AI rules.

## Project Orientation

Read these files in order to understand the codebase:

1. `AGENTS.md` -- workflow, constraints, structure overview, and agent checklist
2. `docs/standards/ARCHITECTURE.md` -- architecture overview
3. `docs/standards/STYLING_STANDARDS.md` -- the styling system (Tailwind v4)
4. `docs/patterns/FEATURE_PATTERN.md` -- how features are built
5. `src/app/(dashboard)/dashboard/page.tsx` -- starter route composition example

## Key Concepts

### Feature-First Architecture

Each feature module maps 1:1 to a backend microservice:

```
features/auth/         -> auth-service
features/<domain>/     -> <domain>-service
features/billing/      -> billing-service
```

### 3-Layer Styling

```
Design Tokens (CSS vars) -> CVA Variants -> Component JSX
```

No raw Tailwind in feature code. All visual styling goes through UI component variants.

### Factory Patterns

```ts
// Server state
const useEntityList = createQueryHook({ ... });
const useEntityCreate = createMutationHook({ ... });

// Client state
const useEntityStore = createAppStore(initializer, { name: '...' });
```

### File Limits

- 150 lines max per file
- 80 lines max per hook
- 3 useState max per component
- 1 useEffect max per component
