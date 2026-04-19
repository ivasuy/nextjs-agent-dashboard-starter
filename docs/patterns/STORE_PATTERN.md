# Store Pattern

Template for creating Zustand stores using the `createAppStore` factory.

## Global Store (src/stores/)

For state shared across the entire application:

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

## Feature Store (src/features/<name>/store/)

For UI state specific to a feature:

```ts
// features/campaigns/store/useCampaignUIStore.ts
import { createAppStore } from '@/lib/store';

interface CampaignUIState {
  selectedIds: string[];
  viewMode: 'grid' | 'list';
  isFilterPanelOpen: boolean;
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleFilterPanel: () => void;
}

export const useCampaignUIStore = createAppStore<CampaignUIState>(
  (set) => ({
    selectedIds: [],
    viewMode: 'list',
    isFilterPanelOpen: false,

    toggleSelection: (id) =>
      set((state) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),

    selectAll: (ids) =>
      set((state) => {
        state.selectedIds = ids;
      }),

    clearSelection: () =>
      set((state) => {
        state.selectedIds = [];
      }),

    setViewMode: (mode) =>
      set((state) => {
        state.viewMode = mode;
      }),

    toggleFilterPanel: () =>
      set((state) => {
        state.isFilterPanelOpen = !state.isFilterPanelOpen;
      }),
  }),
  { name: 'campaign-ui-store' }
);
```

## Usage in Components

Always use selectors to subscribe to specific slices:

```tsx
// GOOD: Selective subscription
function CampaignToolbar() {
  const viewMode = useCampaignUIStore((s) => s.viewMode);
  const setViewMode = useCampaignUIStore((s) => s.setViewMode);
  const selectedCount = useCampaignUIStore((s) => s.selectedIds.length);

  return (
    <div className="flex items-center gap-3">
      <ToggleGroup value={viewMode} onValueChange={setViewMode}>
        <ToggleItem value="grid">Grid</ToggleItem>
        <ToggleItem value="list">List</ToggleItem>
      </ToggleGroup>
      {selectedCount > 0 && (
        <Badge variant="info">{selectedCount} selected</Badge>
      )}
    </div>
  );
}
```

## State Shape Rules

1. **Flat state** -- max 2 levels of nesting
2. **Actions co-located** -- mutations live in the store, not in components
3. **No async** -- use React Query for async operations, not store actions
4. **No derived state** -- compute in selectors or components
5. **Immer mutations** -- mutate state directly inside `set()` callbacks

```ts
// GOOD: Flat state with co-located actions
interface UIState {
  sidebar: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// BAD: Deep nesting
interface UIState {
  layout: {
    sidebar: {
      isOpen: boolean;
      width: number;
      sections: { /* ... */ };
    };
  };
}
```

## When to Use a Store

| Scenario | Use Store? | Alternative |
|---|---|---|
| Auth state (user, tokens) | Yes (global) | -- |
| UI preferences (theme, sidebar) | Yes (global) | -- |
| Feature UI state (selections, view mode) | Yes (feature) | -- |
| Form input values | No | React Hook Form |
| API data (lists, details) | No | React Query |
| Ephemeral toggle | No | useState |
| URL-persisted filters | No | useURLState |

## Checklist

- [ ] Uses `createAppStore` factory (not raw `create()`)
- [ ] State interface defined with explicit types
- [ ] `{ name: '<descriptive>-store' }` provided for DevTools
- [ ] State is flat (max 2 levels)
- [ ] All mutations are co-located actions
- [ ] No async operations in store
- [ ] Consumers use selectors, not full-store subscription
- [ ] File under 150 lines
