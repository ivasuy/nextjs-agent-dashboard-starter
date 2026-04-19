import { cva, type VariantProps } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  [
    'inline-flex items-center justify-between rounded-lg border px-3',
    'text-sm text-(--text-primary)',
    'bg-(--surface-bg-primary)',
    'border-(--border-default)',
    'transition-colors duration-150',
    'hover:border-(--border-hover)',
    'focus:outline-none focus:border-(--border-focus) focus:ring-2 focus:ring-primary-500/20',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
    'data-[placeholder]:text-(--text-muted)',
  ],
  {
    variants: {
      size: {
        sm: 'h-8 text-xs gap-1',
        md: 'h-10 text-sm gap-2',
        lg: 'h-12 text-base gap-2',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const selectContentVariants = cva([
  'overflow-hidden rounded-lg border bg-(--surface-bg-card)',
  'border-(--border-default) shadow-lg',
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
]);

export const selectItemVariants = cva([
  'relative flex w-full cursor-pointer select-none items-center',
  'rounded-md px-3 py-2 text-sm text-(--text-primary)',
  'outline-none transition-colors',
  'hover:bg-neutral-100',
  'focus:bg-neutral-100',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'data-[state=checked]:text-primary-600 data-[state=checked]:font-medium',
]);

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
