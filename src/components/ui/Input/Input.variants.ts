import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    'w-full rounded-lg border px-3',
    'text-sm text-(--text-primary)',
    'bg-(--surface-bg-primary)',
    'border-(--border-default)',
    'placeholder:text-(--text-muted)',
    'transition-colors duration-150',
    'hover:border-(--border-hover)',
    'focus:outline-none focus:border-(--border-focus) focus:ring-2 focus:ring-primary-500/20',
    'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
  ],
  {
    variants: {
      state: {
        default: '',
        error: 'border-error focus:border-error focus:ring-error/20',
        success: 'border-success focus:border-success focus:ring-success/20',
      },
      size: {
        sm: 'h-8 text-xs',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: { state: 'default', size: 'md' },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
