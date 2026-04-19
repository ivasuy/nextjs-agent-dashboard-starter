# Performance Standards

## React 19 Optimizations

React 19 includes an automatic compiler that reduces the need for manual memoization. Follow these updated rules:

### Memoization

- **Do not** add `React.memo`, `useMemo`, or `useCallback` by default
- **Do** add them when profiling reveals a measurable performance issue
- React 19's compiler handles most re-render optimization automatically

### When Manual Memoization Is Still Needed

```tsx
// Expensive computation that runs on every render
const sortedItems = useMemo(
  () => items.sort((a, b) => complexSort(a, b)),
  [items]
);

// Callback passed to a large list of child components
const handleItemClick = useCallback(
  (id: string) => selectItem(id),
  [selectItem]
);
```

## Code Splitting

### Route-Level Splitting (Automatic)

Next.js App Router automatically code-splits each route. No manual action needed.

### Component-Level Lazy Loading

Use `next/dynamic` for heavy components not needed on initial render:

```tsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/ui/Chart'), {
  loading: () => <SkeletonCard />,
  ssr: false, // Charts don't need SSR
});
```

### Feature-Level Splitting

Heavy feature components should be lazy-loaded:

```tsx
const CampaignAnalytics = dynamic(
  () => import('@/features/campaigns/components/CampaignAnalytics'),
  { loading: () => <SkeletonCard /> }
);
```

## Data Fetching

### React Query Defaults

- `staleTime: 5 * 60 * 1000` (5 minutes) for most data
- `gcTime: 10 * 60 * 1000` (10 minutes) garbage collection
- Prefetch on hover for navigation links
- Parallel queries where possible

### Pagination

Always paginate list endpoints. Never fetch all records:

```ts
export const useCampaignList = createQueryHook<PaginatedResult<Campaign>, CampaignFilters>({
  queryKey: ['campaigns'],
  queryFn: (filters) => campaignService.getAll(filters),
});
```

## Image Optimization

- Use `next/image` for all images
- Set explicit `width` and `height` to prevent layout shift
- Use `priority` for above-the-fold images
- Use `ImageWithFallback` component for user-uploaded content

## Bundle Size

- Import only what you need from libraries:

```ts
// GOOD: Tree-shakeable import
import { format, parseISO } from 'date-fns';

// BAD: Imports entire library
import * as dateFns from 'date-fns';
```

- Use `npm run analyze` to inspect bundle size

## Animation Performance

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (trigger layout)
- Use `will-change` sparingly and only when measured
- Use centralized presets from `@/lib/animations`

## Rendering Rules

| Rule | Detail |
|---|---|
| Server Components | Default for pages and layouts |
| Client Components | Only when interactivity is needed (`'use client'`) |
| Streaming | Use `loading.tsx` for route-level suspense |
| Skeleton loading | Use Skeleton components for component-level loading |
