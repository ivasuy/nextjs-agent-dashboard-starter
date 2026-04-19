# Service Standards

## Overview

API services are pure functions that wrap Axios calls. They live in `src/features/<name>/services/` and are consumed exclusively through React Query factory hooks.

## File Naming

```
features/<name>/services/<name>.service.ts
```

## Service Template

```ts
// features/campaigns/services/campaign.service.ts
import { apiClient } from '@/lib/api';
import type {
  Campaign,
  CampaignFilters,
  CreateCampaignInput,
  UpdateCampaignInput,
} from '../types';
import type { ApiResponse, PaginatedResult } from '@/types';

const BASE = '/api/v1/campaigns';

export const campaignService = {
  getAll: async (filters?: CampaignFilters) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResult<Campaign>>>(BASE, {
      params: filters,
    });
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<Campaign>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (input: CreateCampaignInput) => {
    const { data } = await apiClient.post<ApiResponse<Campaign>>(BASE, input);
    return data.data;
  },

  update: async ({ id, ...input }: UpdateCampaignInput & { id: string }) => {
    const { data } = await apiClient.patch<ApiResponse<Campaign>>(`${BASE}/${id}`, input);
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
```

## Rules

1. **No state** -- services are stateless function objects
2. **No React** -- services never import React or use hooks
3. **Typed responses** -- always type both request and response
4. **Use `apiClient`** -- never create raw Axios instances
5. **Return unwrapped data** -- extract from `ApiResponse<T>` wrapper
6. **One service per feature** -- maps 1:1 to a backend microservice
7. **No error handling** -- let React Query handle errors via the mutation/query hooks

## Backend Service Map

| Feature | Service | Base Path |
|---|---|---|
| auth | auth-service | `/api/v1/auth/*` |
| workspace | tenant-service | `/api/v1/workspaces/*` |
| brand | brand-service | `/api/v1/brands/*` |
| campaigns | campaign-service | `/api/v1/campaigns/*` |
| creative | creative-service | `/api/v1/creatives/*` |
| analytics | analytics-service | `/api/v1/analytics/*` |
| integrations | integration-service | `/api/v1/integrations/*` |
| billing | billing-service | `/api/v1/billing/*` |
| notifications | notification-service | `/api/v1/notifications/*` |

## Consuming Services via Hooks

Services are never called directly in components. Always wrap with factory hooks:

```ts
// Query hook (read)
export const useCampaignList = createQueryHook<PaginatedResult<Campaign>, CampaignFilters>({
  queryKey: ['campaigns'],
  queryFn: (filters) => campaignService.getAll(filters),
});

// Mutation hook (write)
export const useCampaignCreate = createMutationHook<Campaign, CreateCampaignInput>({
  mutationFn: (data) => campaignService.create(data),
  invalidateKeys: [['campaigns']],
  successMessage: 'Campaign created',
});
```

## Error Handling

The Axios client in `@/lib/api` handles:
- Auth token injection via interceptors
- 401 responses trigger token refresh or logout
- Network errors surface through React Query's `error` state
- Mutation hooks auto-display toast messages on success/failure
