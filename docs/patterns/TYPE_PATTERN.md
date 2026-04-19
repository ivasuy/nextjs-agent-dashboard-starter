# Type Pattern

Template for defining types with Zod schemas.

## Schema File

Define Zod schemas first -- they are the source of truth:

```ts
// features/<name>/types/<name>.schema.ts
import { z } from 'zod';

// --- Enums ---

export const campaignStatusSchema = z.enum([
  'draft',
  'active',
  'paused',
  'completed',
  'archived',
]);

// --- Entity Schema ---

export const campaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(500).optional(),
  status: campaignStatusSchema,
  budget: z.number().positive('Budget must be positive'),
  spent: z.number().nonnegative().default(0),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullable(),
  brandId: z.string().uuid(),
  workspaceId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// --- Input Schemas ---

export const createCampaignSchema = campaignSchema.pick({
  name: true,
  description: true,
  budget: true,
  startDate: true,
  endDate: true,
  brandId: true,
});

export const updateCampaignSchema = createCampaignSchema.partial();

// --- Filter Schema ---

export const campaignFiltersSchema = z.object({
  search: z.string().optional(),
  status: campaignStatusSchema.optional(),
  brandId: z.string().uuid().optional(),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
  sortBy: z.enum(['name', 'createdAt', 'budget', 'status']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
```

## Types File

Infer TypeScript types from Zod schemas:

```ts
// features/<name>/types/<name>.types.ts
import type { z } from 'zod';
import type {
  campaignSchema,
  createCampaignSchema,
  updateCampaignSchema,
  campaignFiltersSchema,
  campaignStatusSchema,
} from './<name>.schema';

export type Campaign = z.infer<typeof campaignSchema>;
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;
export type CampaignFilters = z.infer<typeof campaignFiltersSchema>;
export type CampaignStatus = z.infer<typeof campaignStatusSchema>;
```

## Barrel Export

```ts
// features/<name>/types/index.ts
export type {
  Campaign,
  CreateCampaignInput,
  UpdateCampaignInput,
  CampaignFilters,
  CampaignStatus,
} from './<name>.types';

export {
  campaignSchema,
  createCampaignSchema,
  updateCampaignSchema,
  campaignFiltersSchema,
  campaignStatusSchema,
} from './<name>.schema';
```

## Shared Types

Types used across features live in `src/types/`:

```ts
// types/api.types.ts
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}
```

## Form Integration

Schemas integrate directly with React Hook Form:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCampaignSchema } from '../types';
import type { CreateCampaignInput } from '../types';

function CampaignForm() {
  const form = useForm<CreateCampaignInput>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: { name: '', budget: 0 },
  });
  // ...
}
```

## Rules

1. **Zod first** -- always define schemas before types
2. **Infer types** -- use `z.infer<typeof schema>` instead of manual types
3. **No `any`** -- use `unknown` with type guards
4. **No enums** -- use `z.enum()` or const objects with `as const`
5. **Validation messages** -- include user-friendly messages in schemas
6. **Pick/Omit** -- derive input schemas from entity schemas
7. **Barrel exports** -- export types and schemas from `index.ts`

## Checklist

- [ ] Zod schemas defined with validation messages
- [ ] TypeScript types inferred from schemas
- [ ] Input schemas derived via `.pick()` / `.partial()` / `.omit()`
- [ ] Filter schema includes pagination and sorting
- [ ] Barrel export in `types/index.ts`
- [ ] No `any` types
- [ ] No TypeScript enums (use Zod enums or const objects)
