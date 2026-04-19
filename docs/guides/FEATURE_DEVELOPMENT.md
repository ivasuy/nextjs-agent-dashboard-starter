# Feature Development Guide

Step-by-step guide for adding a new feature module to the application.

## Before You Start

1. Read `docs/patterns/FEATURE_PATTERN.md` for the full template
2. Read `docs/standards/ARCHITECTURE.md` for dependency rules
3. Identify which backend microservice this feature maps to
4. Review the closest existing module under `src/features/`
5. Review the dashboard route composition in `src/app/(dashboard)/dashboard/page.tsx`

## Step-by-Step Process

### Step 1: Create Directory Structure

```
src/features/<name>/
├── types/
│   ├── <name>.schema.ts
│   ├── <name>.types.ts
│   └── index.ts
├── services/
│   └── <name>.service.ts
├── hooks/
│   ├── use<Name>List.ts
│   ├── use<Name>Create.ts
│   └── index.ts
├── components/
│   ├── <Name>List.tsx
│   ├── <Name>Card.tsx
│   └── index.ts
├── store/              # Optional, only if feature needs UI state
│   └── use<Name>UIStore.ts
└── index.ts
```

### Step 2: Define Types

Start with Zod schemas. Infer TypeScript types from them.

```ts
// types/<name>.schema.ts
import { z } from 'zod';

export const entitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  // ... fields matching the API response
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createEntitySchema = entitySchema.pick({
  name: true,
  // ... input fields
});
```

### Step 3: Create API Service

Map each backend endpoint to a service method.

```ts
// services/<name>.service.ts
import { apiClient } from '@/lib/api';

const BASE = '/api/v1/<entities>';

export const entityService = {
  getAll: async (filters) => { /* ... */ },
  getById: async (id) => { /* ... */ },
  create: async (input) => { /* ... */ },
  update: async (data) => { /* ... */ },
  delete: async (id) => { /* ... */ },
};
```

### Step 4: Create React Query Hooks

One hook per operation, using the factory functions.

```ts
// hooks/use<Name>List.ts
export const useEntityList = createQueryHook({ queryKey: ['entities'], queryFn: ... });

// hooks/use<Name>Create.ts
export const useEntityCreate = createMutationHook({ mutationFn: ..., invalidateKeys: [['entities']] });
```

### Step 5: Build Components

Components consume hooks and render UI primitives:

```tsx
// components/<Name>List.tsx
function EntityList() {
  const { data, isLoading, error } = useEntityList();

  if (isLoading) return <SkeletonCard count={6} />;
  if (error) return <SectionError error={error} />;
  if (!data?.items.length) return <EmptyState message="No items yet" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map((item) => <EntityCard key={item.id} entity={item} />)}
    </div>
  );
}
```

### Step 6: Create Store (If Needed)

Only create a store if you need UI state shared across feature components (selections, view modes, filter panel state).

### Step 7: Create Route Page

```tsx
// app/(dashboard)/<entities>/page.tsx
import { PageWrapper } from '@/components/layout/PageWrapper';
import { EntityList } from '@/features/<name>/components/EntityList';

export default function EntitiesPage() {
  return (
    <PageWrapper title="Entities" description="Manage your entities">
      <EntityList />
    </PageWrapper>
  );
}
```

### Step 8: Verify

Run all checks before considering the feature complete:

```bash
npm run check
```

## Component Guidelines

### Feature components CAN use:

- Layout Tailwind utilities: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `space-*`
- UI component variant props: `<Button variant="primary" size="md">`
- Shared hooks: `useDebounce`, `useMediaQuery`, etc.
- Feature hooks: `useEntityList`, `useEntityCreate`, etc.

### Feature components CANNOT use:

- Visual Tailwind classes (colors, borders, shadows, typography)
- Raw Zustand `create()`
- Direct Axios/fetch calls
- Inline Framer Motion values
- Cross-feature imports

## Error Handling Checklist

Every feature page must handle:

- [ ] **Loading state** -- Skeleton components
- [ ] **Error state** -- ErrorBoundary + SectionError
- [ ] **Empty state** -- EmptyState with contextual message
- [ ] **Form validation** -- Zod schema + error messages
- [ ] **Mutation errors** -- handled by createMutationHook (auto-toast)
- [ ] **Mutation success** -- handled by createMutationHook (auto-toast + invalidation)
