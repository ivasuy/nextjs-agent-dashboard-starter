# Styling Standards

This is the primary reference for all styling in the project. Every developer and AI agent must follow these rules.

## The 3-Layer Styling System

```
Layer 1: Design Tokens (CSS Custom Properties)
    |
    v
Layer 2: CVA Variants (styling logic in .variants.ts files)
    |
    v
Layer 3: Component JSX (applies variants via props)
```

**Zero raw Tailwind classes in feature code.** Feature components use UI components with CVA variant props.

## Tailwind v4 Syntax

> **CRITICAL:** This project uses Tailwind CSS v4. Never use v3 bracket syntax. This is the single most important styling rule.

### v4 Syntax Reference

| Category | v3 (WRONG) | v4 (CORRECT) |
|---|---|---|
| CSS variable | `text-[var(--text-muted)]` | `text-(--text-muted)` |
| Theme token | `bg-[var(--color-error)]` | `bg-error` |
| Opacity | `border-black/[.08]` | `border-black/8` |
| Gradient | `bg-gradient-to-br` | `bg-linear-to-br` |
| Z-index | `z-[100]` | `z-100` |
| Arbitrary value | `w-[calc(100%-2rem)]` | `w-(calc(100%-2rem))` |

### CSS Variable Usage

**Theme-mapped tokens** (defined in Tailwind config) use the token directly:

```tsx
// Colors mapped in theme
className="bg-error text-primary border-warning"
```

**Non-theme CSS variables** use the `()` syntax:

```tsx
// Custom tokens from design system
className="bg-(--surface-bg-card) text-(--text-primary) border-(--border-default)"
```

### Opacity

```tsx
// CORRECT: Numeric shorthand
className="bg-black/5 border-black/8 text-white/90"

// WRONG: Bracket notation
className="bg-black/[.05] border-black/[.08] text-white/[.90]"
```

### Gradients

```tsx
// CORRECT: v4 linear gradient
className="bg-linear-to-br from-(--brand-primary) to-(--brand-secondary)"

// WRONG: v3 gradient
className="bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)]"
```

### Z-Index

```tsx
// CORRECT: Direct numeric
className="z-10 z-50 z-100"

// WRONG: Arbitrary bracket
className="z-[10] z-[50] z-[100]"
```

## Layer 1: Design Tokens

Tokens are defined as CSS custom properties in `src/styles/tokens/`:

```css
/* styles/tokens/colors.css */
:root {
  --color-primary: #6366f1;
  --color-error: #ef4444;
  --surface-bg-card: #ffffff;
  --text-primary: #111827;
  --text-muted: #6b7280;
  --border-default: #e5e7eb;
}
```

## Layer 2: CVA Variants

All styling logic lives in `.variants.ts` files:

```ts
// Button.variants.ts
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-(--radius-md) font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-hover)',
        secondary: 'bg-(--surface-bg-card) text-(--text-primary) border border-(--border-default)',
        danger: 'bg-error text-white hover:bg-error/90',
        ghost: 'text-(--text-secondary) hover:bg-(--surface-bg-hover)',
      },
      size: {
        sm: 'h-8 px-3 text-sm gap-1.5',
        md: 'h-10 px-4 text-sm gap-2',
        lg: 'h-12 px-6 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

## Layer 3: Component JSX

Components apply variants through props. Feature code never writes raw Tailwind:

```tsx
// Feature component — NO raw Tailwind
function CampaignActions({ onSave, onCancel }: Props) {
  return (
    <div className="flex gap-3">
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onSave}>Save Campaign</Button>
    </div>
  );
}
```

The only Tailwind classes allowed in feature code are layout utilities (`flex`, `gap-*`, `grid`, `p-*`, `m-*`). All visual styling (colors, borders, shadows, typography) must come from UI component variants.

## className Merging

Always use `cn()` from `@/utils/cn`:

```tsx
import { cn } from '@/utils/cn';

<div className={cn(cardVariants({ variant }), className)} />
```

`cn()` wraps `clsx` + `tailwind-merge` to properly handle conflicting classes.

## Responsive Design

Use Tailwind's responsive prefixes, mobile-first:

```tsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
```

## Dark Mode

Design tokens handle dark mode via CSS variables. Components do not need dark mode classes:

```css
:root {
  --surface-bg-card: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface-bg-card: #1f2937;
  }
}
```

## Rules Summary

1. Never use Tailwind v3 bracket syntax -- use v4 `()` syntax
2. Never put raw Tailwind in feature components -- use UI components with CVA
3. All visual styles in `.variants.ts` files via CVA
4. Use `cn()` for className merging
5. Design tokens in `src/styles/tokens/` as CSS custom properties
6. Theme-mapped tokens directly: `bg-error`, `text-primary`
7. Non-theme tokens with `()`: `bg-(--surface-bg-card)`
8. Opacity shorthand: `border-black/8` not `border-black/[.08]`
9. Gradients: `bg-linear-to-br` not `bg-gradient-to-br`
10. Layout utilities (`flex`, `grid`, `gap`, `p`, `m`) are allowed in feature code
