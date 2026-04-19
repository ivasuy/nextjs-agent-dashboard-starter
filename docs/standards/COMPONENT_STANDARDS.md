# Component Standards

## File Structure

Every UI component follows the three-file pattern:

```
components/ui/Button/
├── Button.tsx           # Component implementation
├── Button.variants.ts   # CVA variant definitions
└── index.ts             # Barrel export
```

## CVA Pattern

All styling logic lives in `.variants.ts` files using `cva`:

```ts
// Button.variants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base classes using design tokens
  'inline-flex items-center justify-center rounded-(--radius-md) font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-(--brand-primary) text-white hover:bg-(--brand-primary-hover)',
        secondary: 'bg-(--surface-bg-card) text-(--text-primary) border border-(--border-default)',
        ghost: 'text-(--text-secondary) hover:bg-(--surface-bg-hover)',
        danger: 'bg-error text-white hover:bg-error/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## Component Implementation

```tsx
// Button.tsx
'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { buttonVariants, type ButtonVariants } from './Button.variants';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    isLoading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className="animate-spin mr-2">...</span> : null}
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

## Barrel Export

```ts
// index.ts
export { Button } from './Button';
export { buttonVariants, type ButtonVariants } from './Button.variants';
```

## Props Rules

- Extend native HTML element props via `ButtonHTMLAttributes`, `InputHTMLAttributes`, etc.
- Use `VariantProps<typeof variants>` for CVA variant props
- Keep custom props to a minimum (< 8 total)
- Use `forwardRef` for all components that render DOM elements
- Always set `displayName`

## Composition Over Configuration

Prefer composing smaller components over adding more props:

```tsx
// GOOD: Composition
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// BAD: Prop overload
<Card title="Title" content="Content" headerClassName="..." />
```

## Rules

1. No business logic in UI components -- they are pure presentation
2. No direct API calls -- data comes through props
3. No feature-specific code -- components are generic and reusable
4. Always use `cn()` from `@/utils/cn` for className merging
5. Max 150 lines per component file
6. Prefer `'use client'` only when the component needs interactivity
