# Figma to Code Guide

How to implement Figma designs in this project.

## Workflow

```
1. Analyze the Figma design
2. Map to existing UI components
3. Map colors/spacing to design tokens
4. Build with CVA variants
5. Verify responsiveness
6. Check accessibility
```

## Step 1: Analyze the Design

Before writing any code:

- Identify the page layout (single column, sidebar + content, grid)
- List all UI elements (buttons, cards, inputs, tables, modals)
- Note interactive behaviors (hover, focus, active states)
- Identify repeated patterns (card grids, list items)
- Note responsive breakpoints if specified

## Step 2: Map to Existing Components

Check `src/components/ui/` for components that match the design:

| Figma Element | UI Component |
|---|---|
| Button | `Button` with variant prop |
| Input field | `Input` |
| Select dropdown | `Select` |
| Checkbox | `Checkbox` |
| Toggle | `Switch` |
| Card | `Card` + `CardHeader` + `CardContent` |
| Table | `DataTable` |
| Modal/Dialog | `Modal` |
| Tooltip | `Tooltip` |
| Badge/Tag | `Badge` or `StatusBadge` |
| Loading skeleton | `Skeleton` / `SkeletonCard` |
| Empty state | `EmptyState` |
| Error state | `SectionError` |
| File upload | `FileUpload` |
| Date picker | `DatePicker` / `DateRangePicker` |
| Color picker | `ColorPicker` |
| Form | `Form` + `FormField` |
| Popover | `Popover` |
| Metric card | `MetricCard` |
| Wizard/Stepper | `Wizard` |

If a component does not exist, create it following `docs/patterns/COMPONENT_PATTERN.md`.

## Step 3: Map Design Tokens

### Colors

Map Figma colors to CSS custom properties in `src/styles/tokens/`:

```
Figma: #6366f1 (Primary)      -> bg-(--brand-primary) or text-(--brand-primary)
Figma: #ef4444 (Error/Red)     -> bg-error or text-error
Figma: #111827 (Text)          -> text-(--text-primary)
Figma: #6b7280 (Muted text)   -> text-(--text-muted)
Figma: #e5e7eb (Border)       -> border-(--border-default)
Figma: #ffffff (Card bg)      -> bg-(--surface-bg-card)
```

### Spacing

Map Figma spacing to Tailwind utilities:

```
Figma: 4px   -> p-1, gap-1, m-1
Figma: 8px   -> p-2, gap-2, m-2
Figma: 12px  -> p-3, gap-3
Figma: 16px  -> p-4, gap-4
Figma: 24px  -> p-6, gap-6
Figma: 32px  -> p-8, gap-8
Figma: 48px  -> p-12, gap-12
```

### Typography

```
Figma: 12px  -> text-xs
Figma: 14px  -> text-sm
Figma: 16px  -> text-base
Figma: 18px  -> text-lg
Figma: 20px  -> text-xl
Figma: 24px  -> text-2xl
Figma: 30px  -> text-3xl
```

### Border Radius

```
Figma: 4px   -> rounded-(--radius-sm)
Figma: 6px   -> rounded-(--radius-md)
Figma: 8px   -> rounded-(--radius-lg)
Figma: 12px  -> rounded-(--radius-xl)
Figma: Full  -> rounded-full
```

### Shadows

```
Figma: Small shadow   -> shadow-(--shadow-sm)
Figma: Medium shadow  -> shadow-(--shadow-md)
Figma: Large shadow   -> shadow-(--shadow-lg)
```

## Step 4: Build with CVA Variants

If the design requires a new component variant, add it to the `.variants.ts` file:

```ts
// If the Figma design shows a "compact" card style
export const cardVariants = cva('...base', {
  variants: {
    variant: {
      default: 'bg-(--surface-bg-card) border border-(--border-default)',
      elevated: 'bg-(--surface-bg-card) shadow-(--shadow-md)',
      compact: 'bg-(--surface-bg-card) border border-(--border-default) p-3',
    },
  },
});
```

Then use the variant in JSX -- never add raw visual Tailwind in feature code:

```tsx
<Card variant="compact">
  <CardContent>{content}</CardContent>
</Card>
```

## Step 5: Verify Responsiveness

Test at all breakpoints:

| Width | Device |
|---|---|
| 375px | Mobile |
| 768px | Tablet |
| 1024px | Small desktop |
| 1440px | Desktop |
| 1920px | Large desktop |

Use responsive Tailwind prefixes, mobile-first:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Step 6: Check Accessibility

- [ ] All images have `alt` text
- [ ] Icon-only buttons have `aria-label`
- [ ] Form inputs have associated labels
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Interactive elements are keyboard accessible
- [ ] Focus indicators are visible

## Common Patterns

### Dashboard Page

```tsx
<PageWrapper title="Dashboard">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <MetricCard title="Total" value={100} icon="box" />
    <MetricCard title="Active" value={42} icon="activity" trend={5.2} />
  </div>
  <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
    <Card><Chart /></Card>
    <Card><RecentActivity /></Card>
  </div>
</PageWrapper>
```

### List Page

```tsx
<PageWrapper title="Campaigns">
  <div className="flex items-center justify-between mb-6">
    <SearchInput value={search} onChange={setSearch} />
    <Button variant="primary" onClick={onCreate}>Create Campaign</Button>
  </div>
  <CampaignList />
</PageWrapper>
```

### Detail Page

```tsx
<PageWrapper title={campaign.name} back="/campaigns">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
    <main className="space-y-6">
      <CampaignOverview campaign={campaign} />
      <CampaignMetrics campaign={campaign} />
    </main>
    <aside className="space-y-4">
      <CampaignStatus campaign={campaign} />
      <CampaignActions campaign={campaign} />
    </aside>
  </div>
</PageWrapper>
```
