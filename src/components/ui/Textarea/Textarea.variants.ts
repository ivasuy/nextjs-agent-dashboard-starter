import { cva, type VariantProps } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    'w-full rounded-lg border px-3 py-2',
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
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
      },
    },
    defaultVariants: { state: 'default', resize: 'vertical' },
  },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
