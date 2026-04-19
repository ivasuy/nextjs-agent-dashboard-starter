# Feature Pattern

Template for scaffolding a new feature module in `src/features/`.

## Directory Structure

```
features/<name>/
├── types/
│   ├── <name>.schema.ts      # Zod schemas
│   ├── <name>.types.ts       # Inferred TypeScript types
│   └── index.ts              # Barrel export
├── services/
│   └── <name>.service.ts     # API service functions
├── hooks/
│   ├── use<Name>List.ts      # Query hook (list)
│   ├── use<Name>Detail.ts    # Query hook (detail)
│   ├── use<Name>Create.ts    # Mutation hook (create)
│   ├── use<Name>Update.ts    # Mutation hook (update)
│   ├── use<Name>Delete.ts    # Mutation hook (delete)
│   └── index.ts              # Barrel export
├── components/
│   ├── <Name>List.tsx        # List view component
│   ├── <Name>Card.tsx        # Card component
│   ├── <Name>Form.tsx        # Create/Edit form
│   ├── <Name>Detail.tsx      # Detail view
│   └── index.ts              # Barrel export
├── store/
│   └── use<Name>UIStore.ts   # Feature UI state (optional)
└── index.ts                  # Public API barrel
```

## Implementation Order

Follow this exact order:

### 1. Types

```ts
// features/brand/types/brand.schema.ts
import { z } from 'zod';

export const brandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  logoUrl: z.string().url().nullable(),
  description: z.string().max(500).optional(),
  workspaceId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createBrandSchema = brandSchema.pick({
  name: true,
  description: true,
});

export const updateBrandSchema = createBrandSchema.partial();

export const brandFiltersSchema = z.object({
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(20),
});
```

```ts
// features/brand/types/brand.types.ts
import type { z } from 'zod';
import type { brandSchema, createBrandSchema, updateBrandSchema, brandFiltersSchema } from './brand.schema';

export type Brand = z.infer<typeof brandSchema>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;
export type BrandFilters = z.infer<typeof brandFiltersSchema>;
```

### 2. Service

```ts
// features/brand/services/brand.service.ts
import { apiClient } from '@/lib/api';
import type { Brand, BrandFilters, CreateBrandInput, UpdateBrandInput } from '../types';
import type { ApiResponse, PaginatedResult } from '@/types';

const BASE = '/api/v1/brands';

export const brandService = {
  getAll: async (filters?: BrandFilters) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResult<Brand>>>(BASE, {
      params: filters,
    });
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Brand>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (input: CreateBrandInput) => {
    const { data } = await apiClient.post<ApiResponse<Brand>>(BASE, input);
    return data.data;
  },

  update: async ({ id, ...input }: UpdateBrandInput & { id: string }) => {
    const { data } = await apiClient.patch<ApiResponse<Brand>>(`${BASE}/${id}`, input);
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
```

### 3. Hooks

```ts
// features/brand/hooks/useBrandList.ts
import { createQueryHook } from '@/lib/query';
import { brandService } from '../services/brand.service';
import type { Brand, BrandFilters } from '../types';
import type { PaginatedResult } from '@/types';

export const useBrandList = createQueryHook<PaginatedResult<Brand>, BrandFilters>({
  queryKey: ['brands'],
  queryFn: (filters) => brandService.getAll(filters),
});
```

```ts
// features/brand/hooks/useBrandCreate.ts
import { createMutationHook } from '@/lib/query';
import { brandService } from '../services/brand.service';
import type { Brand, CreateBrandInput } from '../types';

export const useBrandCreate = createMutationHook<Brand, CreateBrandInput>({
  mutationFn: (data) => brandService.create(data),
  invalidateKeys: [['brands']],
  successMessage: 'Brand created successfully',
});
```

### 4. Components

```tsx
// features/brand/components/BrandList.tsx
'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useBrandList } from '../hooks';
import { BrandCard } from './BrandCard';

export function BrandList() {
  const { data, isLoading, error } = useBrandList();

  if (isLoading) return <SkeletonCard count={6} />;
  if (error) return <SectionError error={error} />;
  if (!data?.items.length) return <EmptyState icon="box" message="No brands yet" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.items.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
```

### 5. Store (Optional)

```ts
// features/brand/store/useBrandUIStore.ts
import { createAppStore } from '@/lib/store';

interface BrandUIState {
  selectedIds: string[];
  viewMode: 'grid' | 'list';
  toggleSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
}

export const useBrandUIStore = createAppStore<BrandUIState>(
  (set) => ({
    selectedIds: [],
    viewMode: 'grid',
    toggleSelection: (id) =>
      set((state) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),
    setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
  }),
  { name: 'brand-ui-store' }
);
```

### 6. Page

```tsx
// app/(dashboard)/brands/page.tsx
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BrandList } from '@/features/brand/components/BrandList';

export default function BrandsPage() {
  return (
    <PageWrapper title="Brands" description="Manage your brand profiles">
      <BrandList />
    </PageWrapper>
  );
}
```

## Checklist

- [ ] Types defined with Zod schemas, TypeScript types inferred
- [ ] Service uses `apiClient`, maps 1:1 to a backend microservice
- [ ] Hooks use `createQueryHook` / `createMutationHook` factories
- [ ] Components use UI primitives with CVA variants -- no raw Tailwind
- [ ] Store (if needed) uses `createAppStore` factory
- [ ] Barrel exports at each level
- [ ] All files under 150 lines
- [ ] All hooks under 80 lines
- [ ] Loading, error, and empty states handled
