# Hook Pattern

Template for creating custom hooks.

## Shared Hook (src/hooks/)

For reusable logic shared across features:

```ts
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

interface UseDebounceReturn<T> {
  debouncedValue: T;
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## Feature Hook (src/features/<name>/hooks/)

For feature-specific logic:

```ts
// features/campaigns/hooks/useCampaignFilters.ts
import { useState, useCallback } from 'react';
import { useURLState } from '@/hooks/useURLState';
import { useDebounce } from '@/hooks/useDebounce';
import type { CampaignFilters } from '../types';

interface UseCampaignFiltersReturn {
  filters: CampaignFilters;
  search: string;
  setSearch: (value: string) => void;
  setStatus: (status: string | undefined) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: CampaignFilters = {
  page: 1,
  pageSize: 20,
};

export function useCampaignFilters(): UseCampaignFiltersReturn {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [urlState, setURLState] = useURLState(DEFAULT_FILTERS);

  const filters: CampaignFilters = {
    ...urlState,
    search: debouncedSearch || undefined,
  };

  const setStatus = useCallback(
    (status: string | undefined) => {
      setURLState((prev) => ({ ...prev, status, page: 1 }));
    },
    [setURLState]
  );

  const resetFilters = useCallback(() => {
    setSearch('');
    setURLState(DEFAULT_FILTERS);
  }, [setURLState]);

  return { filters, search, setSearch, setStatus, resetFilters };
}
```

## Composition Hook

For combining multiple hooks into a single interface:

```ts
// features/campaigns/hooks/useCampaignPage.ts
import { useCampaignList } from './useCampaignList';
import { useCampaignFilters } from './useCampaignFilters';
import { useCampaignUIStore } from '../store/useCampaignUIStore';

export function useCampaignPage() {
  const { filters, search, setSearch, setStatus, resetFilters } = useCampaignFilters();
  const { data, isLoading, error } = useCampaignList(filters);
  const viewMode = useCampaignUIStore((s) => s.viewMode);
  const setViewMode = useCampaignUIStore((s) => s.setViewMode);

  return {
    campaigns: data?.items ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
    filters,
    search,
    setSearch,
    setStatus,
    resetFilters,
    viewMode,
    setViewMode,
  };
}
```

## Rules

| Rule | Detail |
|---|---|
| Naming | `use<Context><Action>` |
| Max lines | 80 per file |
| Max useState | 3 per hook |
| Max useEffect | 1 per hook |
| Return type | Always explicit or well-typed object |
| No JSX | Hooks return data and callbacks, never elements |
| Single responsibility | One hook = one concern |
| Cleanup | Every subscribe/listener effect returns a cleanup |

## When to Extract a Hook

Extract logic into a hook when:
- The same stateful logic is used in 2+ components
- A component exceeds 3 useState calls
- A component exceeds 1 useEffect call
- Complex logic obscures the component's render logic

## Checklist

- [ ] Hook follows `use<Context><Action>` naming
- [ ] Return type is explicit
- [ ] Under 80 lines
- [ ] Max 3 useState, max 1 useEffect
- [ ] No JSX returned
- [ ] Uses factories for API hooks (createQueryHook, createMutationHook)
- [ ] Callbacks memoized with useCallback when passed as props
- [ ] Effects have cleanup functions for subscriptions
