# Service Pattern

Template for creating an API service and its associated React Query hooks.

## Service File

```ts
// features/<name>/services/<name>.service.ts
import { apiClient } from '@/lib/api';
import type {
  <Entity>,
  <Entity>Filters,
  Create<Entity>Input,
  Update<Entity>Input,
} from '../types';
import type { ApiResponse, PaginatedResult } from '@/types';

const BASE = '/api/v1/<entities>';

export const <entity>Service = {
  getAll: async (filters?: <Entity>Filters) => {
    const { data } = await apiClient.get<ApiResponse<PaginatedResult<<Entity>>>>(BASE, {
      params: filters,
    });
    return data.data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<ApiResponse<<Entity>>>(`${BASE}/${id}`);
    return data.data;
  },

  create: async (input: Create<Entity>Input) => {
    const { data } = await apiClient.post<ApiResponse<<Entity>>>(BASE, input);
    return data.data;
  },

  update: async ({ id, ...input }: Update<Entity>Input & { id: string }) => {
    const { data } = await apiClient.patch<ApiResponse<<Entity>>>(`${BASE}/${id}`, input);
    return data.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${BASE}/${id}`);
  },
};
```

## Query Hooks

### List Query

```ts
// features/<name>/hooks/use<Entity>List.ts
import { createQueryHook } from '@/lib/query';
import { <entity>Service } from '../services/<name>.service';
import type { <Entity>, <Entity>Filters } from '../types';
import type { PaginatedResult } from '@/types';

export const use<Entity>List = createQueryHook<PaginatedResult<<Entity>>, <Entity>Filters>({
  queryKey: ['<entities>'],
  queryFn: (filters) => <entity>Service.getAll(filters),
});
```

### Detail Query

```ts
// features/<name>/hooks/use<Entity>Detail.ts
import { createQueryHook } from '@/lib/query';
import { <entity>Service } from '../services/<name>.service';
import type { <Entity> } from '../types';

export const use<Entity>Detail = createQueryHook<Entity, string>({
  queryKey: ['<entities>'],
  queryFn: (id) => <entity>Service.getById(id),
});
```

### Create Mutation

```ts
// features/<name>/hooks/use<Entity>Create.ts
import { createMutationHook } from '@/lib/query';
import { <entity>Service } from '../services/<name>.service';
import type { <Entity>, Create<Entity>Input } from '../types';

export const use<Entity>Create = createMutationHook<<Entity>, Create<Entity>Input>({
  mutationFn: (data) => <entity>Service.create(data),
  invalidateKeys: [['<entities>']],
  successMessage: '<Entity> created successfully',
});
```

### Update Mutation

```ts
// features/<name>/hooks/use<Entity>Update.ts
import { createMutationHook } from '@/lib/query';
import { <entity>Service } from '../services/<name>.service';
import type { <Entity>, Update<Entity>Input } from '../types';

export const use<Entity>Update = createMutationHook<<Entity>, Update<Entity>Input & { id: string }>({
  mutationFn: (data) => <entity>Service.update(data),
  invalidateKeys: [['<entities>']],
  successMessage: '<Entity> updated successfully',
});
```

### Delete Mutation

```ts
// features/<name>/hooks/use<Entity>Delete.ts
import { createMutationHook } from '@/lib/query';
import { <entity>Service } from '../services/<name>.service';

export const use<Entity>Delete = createMutationHook<void, string>({
  mutationFn: (id) => <entity>Service.delete(id),
  invalidateKeys: [['<entities>']],
  successMessage: '<Entity> deleted successfully',
});
```

## Rules

1. Services are stateless function objects -- no classes
2. Services never import React
3. Always type request and response
4. Return unwrapped data (extract from `ApiResponse<T>`)
5. Never handle errors in services -- React Query handles them
6. One service per feature, mapped to one backend microservice
7. Each hook in its own file, under 80 lines
8. Always invalidate related query keys on mutation success

## Hooks Barrel Export

```ts
// features/<name>/hooks/index.ts
export { use<Entity>List } from './use<Entity>List';
export { use<Entity>Detail } from './use<Entity>Detail';
export { use<Entity>Create } from './use<Entity>Create';
export { use<Entity>Update } from './use<Entity>Update';
export { use<Entity>Delete } from './use<Entity>Delete';
```

## Checklist

- [ ] Service uses `apiClient` from `@/lib/api`
- [ ] All endpoints typed with `ApiResponse<T>`
- [ ] Data unwrapped before returning
- [ ] Query hooks use `createQueryHook` factory
- [ ] Mutation hooks use `createMutationHook` factory
- [ ] Mutation hooks invalidate correct query keys
- [ ] Success/error messages provided for mutations
- [ ] Each hook in its own file, under 80 lines
- [ ] Barrel exports in `hooks/index.ts`
