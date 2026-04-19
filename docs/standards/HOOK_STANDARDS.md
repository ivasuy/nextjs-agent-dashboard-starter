# Hook Standards

## Naming Convention

All hooks follow the pattern: `use<Context><Action>`

```
useDebounce          # shared utility hook
useCampaignList      # feature query hook
useCampaignCreate    # feature mutation hook
useAuthStore         # store hook
```

## File Structure

- Shared hooks: `src/hooks/use<Name>.ts`
- Feature hooks: `src/features/<name>/hooks/use<Feature><Action>.ts`
- Each hook in its own file

## Limits

| Metric | Limit |
|---|---|
| Hook file length | 80 lines max |
| useState calls | 3 max |
| useEffect calls | 1 max |
| Parameters | Prefer object param for 3+ args |

## Return Type

Always define an explicit return type or return a well-typed object:

```ts
// GOOD: Named return type
interface UseClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
  reset: () => void;
}

export function useClipboard(timeout = 2000): UseClipboardReturn {
  const [copied, setCopied] = useState(false);
  // ...
  return { copied, copy, reset };
}
```

## Query Hooks (Feature Data)

Use the factory pattern for all server-state hooks:

```ts
// features/campaigns/hooks/useCampaignList.ts
import { createQueryHook } from '@/lib/query';
import { campaignService } from '../services/campaign.service';
import type { Campaign, CampaignFilters } from '../types';

export const useCampaignList = createQueryHook<Campaign[], CampaignFilters>({
  queryKey: ['campaigns'],
  queryFn: (filters) => campaignService.getAll(filters),
});
```

## Mutation Hooks

```ts
// features/campaigns/hooks/useCampaignCreate.ts
import { createMutationHook } from '@/lib/query';
import { campaignService } from '../services/campaign.service';
import type { Campaign, CreateCampaignInput } from '../types';

export const useCampaignCreate = createMutationHook<Campaign, CreateCampaignInput>({
  mutationFn: (data) => campaignService.create(data),
  invalidateKeys: [['campaigns']],
  successMessage: 'Campaign created successfully',
});
```

## Custom Hook Rules

1. **Single responsibility** -- one hook does one thing
2. **No JSX** -- hooks return data and callbacks, never elements
3. **Memoize callbacks** with `useCallback` when passed as props
4. **Memoize computed values** with `useMemo` only when expensive
5. **Extract effects** -- if a hook needs 2+ effects, split into separate hooks
6. **Avoid prop drilling** -- prefer Zustand stores for cross-component state
7. **Clean up** -- every `useEffect` that subscribes must return a cleanup function

## Anti-Patterns

```ts
// BAD: Hook doing too much
function useCampaign() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  // VIOLATION: 4 useState calls
}

// GOOD: Use factory hook + separate filter state
const { data, isLoading, error } = useCampaignList(filters);
```
