# Architecture Standards

## Overview

This project follows a **feature-first modular architecture** where each feature module maps 1:1 to a backend microservice. Shared infrastructure lives in `src/lib/`, and all UI primitives live in `src/components/ui/`.

## Dependency Rules

```
app/ -> features/ -> lib/, hooks/, helpers/, stores/, types/
         |
         +-> components/ui/   (design system)
         +-> components/layout/ (shell, wrappers)

features/ NEVER import from other features/
lib/ NEVER imports from features/ or components/
helpers/ NEVER imports from React or any stateful module
```

### Import Order

1. React / Next.js
2. Third-party libraries
3. `@/lib/*` (framework adapters)
4. `@/hooks/*` (shared hooks)
5. `@/stores/*` (global stores)
6. `@/components/*` (UI components)
7. `@/helpers/*` (utilities)
8. `@/types/*` (shared types)
9. Relative imports (same feature)

## Feature Module Structure

Each feature in `src/features/<name>/` follows this structure:

```
features/<name>/
├── types/         # Feature-specific types + Zod schemas
├── services/      # API service functions
├── hooks/         # Feature-specific hooks (query + mutation wrappers)
├── components/    # Feature-specific components
├── store/         # Feature-specific Zustand store (if needed)
└── index.ts       # Public API barrel export
```

## Separation of Concerns

| Layer | Responsibility | Example |
|---|---|---|
| Pages (`app/`) | Route definition, layout composition | `app/(dashboard)/campaigns/page.tsx` |
| Features (`features/`) | Business logic, data fetching, feature UI | `features/campaigns/` |
| Components (`components/ui/`) | Reusable, stateless UI primitives | `Button`, `Card`, `DataTable` |
| Lib (`lib/`) | Framework adapters, factories, clients | `createQueryHook`, Axios client |
| Hooks (`hooks/`) | Shared stateful logic | `useDebounce`, `useMediaQuery` |
| Helpers (`helpers/`) | Pure functions, no side effects | `formatDate`, `slugify` |
| Stores (`stores/`) | Global client state | `useAuthStore` |
| Types (`types/`) | Shared type definitions | `ApiResponse<T>`, `PaginatedResult<T>` |

## Key Factories

| Factory | Location | Purpose |
|---|---|---|
| `createAppStore` | `@/lib/store` | Zustand store with immer + devtools |
| `createQueryHook` | `@/lib/query` | React Query query hook |
| `createMutationHook` | `@/lib/query` | React Query mutation hook with toast |

## File Limits

- Max 150 lines per file
- Max 80 lines per hook
- If a file grows beyond the limit, extract into sub-modules
