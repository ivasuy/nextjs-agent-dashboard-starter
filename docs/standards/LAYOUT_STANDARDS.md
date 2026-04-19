# Layout Standards

## AppShell Architecture

The application uses a shell layout with sidebar navigation:

```
+--------------------------------------------------+
|                    Header                          |
+----------+---------------------------------------+
|          |                                         |
| Sidebar  |              Main Content               |
|          |                                         |
|          |   +-------------------------------+     |
|          |   |         PageWrapper           |     |
|          |   |                               |     |
|          |   |   Page content goes here      |     |
|          |   |                               |     |
|          |   +-------------------------------+     |
|          |                                         |
+----------+---------------------------------------+
```

## Layout Components

| Component | Location | Purpose |
|---|---|---|
| `AppShell` | `components/layout/AppShell` | Root shell with sidebar + header + main |
| `Sidebar` | `components/layout/Sidebar` | Navigation sidebar |
| `Header` | `components/layout/Header` | Top header bar |
| `PageWrapper` | `components/layout/PageWrapper` | Content area with max-width + padding |
| `SectionWrapper` | `components/layout/SectionWrapper` | Section within a page |

## Page Structure

Every dashboard page follows this pattern:

```tsx
// app/(dashboard)/campaigns/page.tsx
import { PageWrapper } from '@/components/layout/PageWrapper';
import { CampaignList } from '@/features/campaigns/components/CampaignList';

export default function CampaignsPage() {
  return (
    <PageWrapper
      title="Campaigns"
      description="Manage your marketing campaigns"
    >
      <CampaignList />
    </PageWrapper>
  );
}
```

## Grid Patterns

### Dashboard Grids

```tsx
// Metric cards grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <MetricCard title="Total" value={100} />
  <MetricCard title="Active" value={42} />
  <MetricCard title="Draft" value={28} />
  <MetricCard title="Completed" value={30} />
</div>
```

### Content + Sidebar Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
  <main>{/* Primary content */}</main>
  <aside>{/* Side panel */}</aside>
</div>
```

### Form Layout

```tsx
<div className="mx-auto max-w-2xl space-y-6">
  <FormSection title="Basic Info">
    {/* Form fields */}
  </FormSection>
  <FormSection title="Settings">
    {/* More fields */}
  </FormSection>
</div>
```

## Spacing Scale

Use Tailwind spacing utilities that map to design tokens:

| Use Case | Class |
|---|---|
| Between sections | `gap-8` or `space-y-8` |
| Between cards | `gap-4` or `gap-6` |
| Card padding | `p-4` or `p-6` |
| Page padding | Handled by `PageWrapper` |
| Between form fields | `space-y-4` |

## Z-Index Scale

| Layer | Value | Usage |
|---|---|---|
| Base content | `z-0` | Default |
| Sticky header | `z-40` | Header |
| Sidebar | `z-30` | Sidebar |
| Dropdown | `z-50` | Dropdown menus, popovers |
| Modal backdrop | `z-100` | Modal overlay |
| Modal content | `z-110` | Modal panel |
| Toast | `z-200` | Toast notifications |

Use direct numeric values: `z-50`, `z-100` -- never `z-[50]`.
