# Responsiveness Standards

## Mobile-First Approach

All styles are written mobile-first. Add complexity at larger breakpoints:

```tsx
// CORRECT: Mobile-first
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

// WRONG: Desktop-first
className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
```

## Breakpoints

| Name | Min Width | Usage |
|---|---|---|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops, landscape tablets |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

## Responsive Patterns

### Navigation

- Mobile: Bottom navigation or hamburger menu
- Tablet: Collapsed sidebar (icons only)
- Desktop: Full sidebar with labels

```tsx
// Sidebar responsive behavior
<aside className="hidden lg:flex lg:w-64 lg:flex-col">
  {/* Full sidebar */}
</aside>
<aside className="flex w-16 flex-col md:flex lg:hidden">
  {/* Icon-only sidebar */}
</aside>
```

### Data Tables

- Mobile: Card layout or horizontally scrollable table
- Tablet: Reduced columns
- Desktop: Full table

```tsx
// Hide non-essential columns on mobile
<th className="hidden md:table-cell">Created</th>
<th className="hidden lg:table-cell">Updated</th>
```

### Forms

- Mobile: Single column, full-width inputs
- Desktop: Two-column layout where appropriate

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Input label="First Name" />
  <Input label="Last Name" />
</div>
```

### Metric Cards

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {metrics.map((m) => <MetricCard key={m.id} {...m} />)}
</div>
```

## Container Queries

Use container queries for component-level responsive behavior:

```tsx
// Parent marks itself as a container
<div className="@container">
  <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-4">
    {/* Responds to container width, not viewport */}
  </div>
</div>
```

## Touch Targets

- Minimum touch target: 44x44px
- Add `min-h-11 min-w-11` for interactive elements on mobile
- Use `p-3` or larger for tap-friendly padding

```tsx
// GOOD: Touch-friendly
<button className="min-h-11 min-w-11 p-3">
  <Icon name="menu" />
</button>
```

## Typography Scaling

```tsx
// Headings scale with viewport
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Page Title</h1>
<h2 className="text-xl md:text-2xl font-semibold">Section Title</h2>
```

## Hide/Show Utilities

```tsx
// Show only on mobile
<div className="block md:hidden">Mobile only</div>

// Show only on desktop
<div className="hidden lg:block">Desktop only</div>
```

## Testing Responsive Layouts

Test at these widths:
- 375px (iPhone SE)
- 768px (iPad portrait)
- 1024px (iPad landscape / small laptop)
- 1440px (Desktop)
- 1920px (Large desktop)

## Rules

1. Always start with mobile styles, add breakpoint prefixes for larger screens
2. Never use fixed pixel widths for containers -- use `max-w-*` utilities
3. Use `w-full` as the default, constrain with `max-w-*`
4. Test every component at all five breakpoints
5. Use container queries (`@container`) for components in variable-width parents
