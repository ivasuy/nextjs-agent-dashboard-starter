# Type Standards

## General Rules

- Use `interface` for object shapes that may be extended
- Use `type` for unions, intersections, and mapped types
- Use Zod schemas as the source of truth, infer TypeScript types from them
- Never use `any` -- use `unknown` and narrow with type guards
- Enable `noUncheckedIndexedAccess` in tsconfig (already configured)

## Naming Conventions

| Kind | Pattern | Example |
|---|---|---|
| Interface | PascalCase | `Campaign`, `User` |
| Type alias | PascalCase | `CampaignStatus`, `ApiResponse<T>` |
| Zod schema | camelCase + `Schema` suffix | `campaignSchema`, `createCampaignSchema` |
| Enum-like | PascalCase const object | `CampaignStatus` |
| Props | `<Component>Props` | `ButtonProps`, `CampaignCardProps` |

## Zod-First Pattern

Define Zod schemas first, then infer types:

```ts
// features/campaigns/types/campaign.schema.ts
import { z } from 'zod';

export const campaignStatusSchema = z.enum([
  'draft',
  'active',
  'paused',
  'completed',
  'archived',
]);

export const campaignSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  status: campaignStatusSchema,
  budget: z.number().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().nullable(),
  workspaceId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createCampaignSchema = campaignSchema.pick({
  name: true,
  budget: true,
  startDate: true,
  endDate: true,
});

// features/campaigns/types/campaign.types.ts
import type { z } from 'zod';
import type { campaignSchema, createCampaignSchema, campaignStatusSchema } from './campaign.schema';

export type Campaign = z.infer<typeof campaignSchema>;
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type CampaignStatus = z.infer<typeof campaignStatusSchema>;
```

## Shared Types

Generic types used across features live in `src/types/`:

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

## Generics

Use descriptive generic names for complex types:

```ts
// GOOD
type QueryResult<TData, TError = ApiError> = {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
};

// BAD
type QueryResult<T, U> = { /* ... */ };
```

## Discriminated Unions

Use for state machines and variant types:

```ts
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: ApiError };
```

## Const Objects Over Enums

Prefer const objects with `as const` over TypeScript enums:

```ts
// GOOD
export const Permission = {
  CampaignRead: 'campaign:read',
  CampaignWrite: 'campaign:write',
  CampaignDelete: 'campaign:delete',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

// BAD: TypeScript enum
enum Permission {
  CampaignRead = 'campaign:read',
}
```

## Barrel Exports

Each feature's types directory has a barrel:

```ts
// features/campaigns/types/index.ts
export type { Campaign, CreateCampaignInput, CampaignStatus } from './campaign.types';
export { campaignSchema, createCampaignSchema } from './campaign.schema';
```
