# State Standards

## State Categories

| Type | Tool | When to Use |
|---|---|---|
| Server state | React Query (via factory hooks) | API data, cache, pagination |
| Global client state | Zustand (via `createAppStore`) | Auth, workspace, UI preferences |
| Feature client state | Zustand (feature store) | Feature-specific UI state (filters, selections) |
| Local component state | `useState` | Form inputs, toggles, ephemeral UI |
| URL state | `useURLState` hook | Filters, tabs, pagination visible in URL |

## Decision Tree

1. Does the data come from an API? -> **React Query**
2. Is the state shared across features? -> **Zustand global store** (`src/stores/`)
3. Is the state shared across feature components? -> **Zustand feature store** (`src/features/<name>/store/`)
4. Should the state persist in the URL? -> **`useURLState`**
5. Is it ephemeral, single-component state? -> **`useState`**

## Zustand Factory

Always use `createAppStore` -- never raw Zustand `create()`:

```ts
// stores/useAuthStore.ts
import { createAppStore } from '@/lib/store';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = createAppStore<AuthState>(
  (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) =>
      set((state) => {
        state.user = user;
        state.isAuthenticated = !!user;
      }),
    logout: () =>
      set((state) => {
        state.user = null;
        state.isAuthenticated = false;
      }),
  }),
  { name: 'auth-store' }
);
```

## Factory Benefits

`createAppStore` provides:
- **immer middleware** -- mutate state directly in `set()` callbacks
- **devtools** -- automatic Redux DevTools integration with store name
- **Type safety** -- full TypeScript inference

## Store Rules

1. **Use selectors** -- never subscribe to the entire store
2. **Flat state** -- avoid deep nesting (max 2 levels)
3. **Derived data** -- compute in selectors or components, not in store
4. **Actions in store** -- keep mutations co-located with state
5. **No async in stores** -- use React Query for async operations

## Selector Pattern

```tsx
// GOOD: Selective subscription
const user = useAuthStore((s) => s.user);
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

// BAD: Full store subscription (re-renders on any change)
const store = useAuthStore();
```

## Feature Store Example

```ts
// features/campaigns/store/useCampaignUIStore.ts
import { createAppStore } from '@/lib/store';

interface CampaignUIState {
  selectedIds: string[];
  viewMode: 'grid' | 'list';
  toggleSelection: (id: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  clearSelection: () => void;
}

export const useCampaignUIStore = createAppStore<CampaignUIState>(
  (set) => ({
    selectedIds: [],
    viewMode: 'list',
    toggleSelection: (id) =>
      set((state) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),
    setViewMode: (mode) => set((state) => { state.viewMode = mode; }),
    clearSelection: () => set((state) => { state.selectedIds = []; }),
  }),
  { name: 'campaign-ui-store' }
);
```

## useState Limits

- Max **3 `useState`** calls per component
- If you need more, extract into a custom hook or Zustand store
