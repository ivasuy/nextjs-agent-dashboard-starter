# Component Pattern

Template for creating a new UI component in `src/components/ui/`.

## File Structure

```
components/ui/<ComponentName>/
├── <ComponentName>.tsx           # Component implementation
├── <ComponentName>.variants.ts   # CVA variant definitions
└── index.ts                      # Barrel export
```

## Step 1: Define Variants

```ts
// components/ui/Alert/Alert.variants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const alertVariants = cva(
  // Base styles using design tokens
  'flex items-start gap-3 rounded-(--radius-md) border p-4',
  {
    variants: {
      variant: {
        info: 'border-(--border-info) bg-(--surface-bg-info) text-(--text-info)',
        success: 'border-success/20 bg-success/5 text-success',
        warning: 'border-warning/20 bg-warning/5 text-warning',
        error: 'border-error/20 bg-error/5 text-error',
      },
      size: {
        sm: 'p-3 text-sm',
        md: 'p-4 text-sm',
        lg: 'p-5 text-base',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  }
);

export type AlertVariants = VariantProps<typeof alertVariants>;
```

## Step 2: Implement Component

```tsx
// components/ui/Alert/Alert.tsx
'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { Icon } from '@/components/ui/Icon';
import { alertVariants, type AlertVariants } from './Alert.variants';

const iconMap = {
  info: 'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error: 'alert-circle',
} as const;

type AlertProps = HTMLAttributes<HTMLDivElement> &
  AlertVariants & {
    title?: string;
    onClose?: () => void;
  };

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', size, title, children, onClose, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      <Icon name={iconMap[variant ?? 'info']} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        {title && <p className="font-medium">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss alert" className="shrink-0">
          <Icon name="x" size="sm" aria-hidden="true" />
        </button>
      )}
    </div>
  )
);
Alert.displayName = 'Alert';
```

## Step 3: Barrel Export

```ts
// components/ui/Alert/index.ts
export { Alert } from './Alert';
export { alertVariants, type AlertVariants } from './Alert.variants';
```

## Step 4: Register in UI Index

Add the export to `src/components/ui/index.ts`:

```ts
export { Alert, alertVariants } from './Alert';
```

## Checklist

- [ ] Variants file uses CVA with design tokens (Tailwind v4 syntax)
- [ ] Component extends appropriate HTML element attributes
- [ ] `forwardRef` used for DOM element access
- [ ] `displayName` set
- [ ] `cn()` used for className merging
- [ ] Accessibility: ARIA attributes, keyboard support
- [ ] Props are minimal (< 8 custom props)
- [ ] No business logic in the component
- [ ] File under 150 lines
- [ ] Barrel export in `index.ts`
