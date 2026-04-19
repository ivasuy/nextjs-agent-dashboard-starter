# Anti-Patterns

Things to **never** do in this codebase, with corrected alternatives.

## 1. Raw Tailwind in Feature Code

```tsx
// BAD: Raw Tailwind in a feature component
function CampaignCard({ campaign }: Props) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
    </div>
  );
}

// GOOD: Use UI components with CVA variants
function CampaignCard({ campaign }: Props) {
  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>{campaign.name}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

## 2. Tailwind v3 Bracket Syntax

```tsx
// BAD: v3 bracket syntax
<div className="text-[var(--text-muted)] bg-[var(--color-error)] border-black/[.08]" />

// GOOD: v4 parenthesis syntax
<div className="text-(--text-muted) bg-error border-black/8" />
```

## 3. Direct API Calls in Components

```tsx
// BAD: Axios in component
function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    axios.get('/api/v1/campaigns').then((r) => setCampaigns(r.data));
  }, []);
}

// GOOD: React Query factory hook
function CampaignList() {
  const { data: campaigns, isLoading } = useCampaignList();
}
```

## 4. Raw Zustand `create()`

```ts
// BAD: Raw Zustand
import { create } from 'zustand';
const useStore = create((set) => ({ count: 0 }));

// GOOD: Factory with immer + devtools
import { createAppStore } from '@/lib/store';
const useStore = createAppStore<State>(
  (set) => ({ count: 0, increment: () => set((s) => { s.count++; }) }),
  { name: 'counter-store' }
);
```

## 5. Full Store Subscription

```tsx
// BAD: Subscribes to entire store, re-renders on any change
const { user, theme, sidebar } = useAuthStore();

// GOOD: Subscribe to specific slices
const user = useAuthStore((s) => s.user);
```

## 6. Exceeding State Limits

```tsx
// BAD: Too many useState calls
function Component() {
  const [a, setA] = useState('');
  const [b, setB] = useState(0);
  const [c, setC] = useState(false);
  const [d, setD] = useState(null); // VIOLATION: 4th useState
}

// GOOD: Extract to hook or store
function Component() {
  const { a, b, c, d, actions } = useComponentState();
}
```

## 7. Multiple useEffect Calls

```tsx
// BAD: Multiple effects in one component
useEffect(() => { /* fetch data */ }, [id]);
useEffect(() => { /* sync URL */ }, [filters]);

// GOOD: Extract into separate hooks
const data = useCampaignDetail(id);
useURLSync(filters);
```

## 8. Cross-Feature Imports

```ts
// BAD: Feature importing from another feature
import { useCampaignList } from '@/features/campaigns/hooks/useCampaignList';
// inside features/analytics/components/AnalyticsDashboard.tsx

// GOOD: Shared types in @/types, or lift shared logic to @/hooks or @/lib
import { useCampaignList } from '@/hooks/useCampaignList';
```

## 9. Inline Animation Values

```tsx
// BAD: Inline Framer Motion values
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} />

// GOOD: Centralized animation presets
import { fadeInUp } from '@/lib/animations';
<motion.div {...fadeInUp} />
```

## 10. Business Logic in UI Components

```tsx
// BAD: API logic in a UI component
// components/ui/Button/Button.tsx
function Button({ onClick }) {
  const handleClick = async () => {
    await fetch('/api/campaigns', { method: 'POST' });
    onClick?.();
  };
}

// GOOD: UI components are pure presentation
// Button accepts onClick from parent, feature component handles logic
```

## 11. TypeScript `any`

```ts
// BAD
function processData(data: any) { return data.items; }

// GOOD
function processData<T>(data: PaginatedResult<T>): T[] { return data.items; }
```

## 12. Oversized Files

```
// BAD: 300-line component file
// components/ui/DataTable/DataTable.tsx (300 lines)

// GOOD: Split into sub-components
// DataTable.tsx (100 lines)
// DataTableHeader.tsx (50 lines)
// DataTableRow.tsx (60 lines)
// DataTablePagination.tsx (40 lines)
```

## 13. Gradient Syntax

```tsx
// BAD: v3 gradient
<div className="bg-gradient-to-br from-blue-500 to-purple-600" />

// GOOD: v4 gradient
<div className="bg-linear-to-br from-blue-500 to-purple-600" />
```
