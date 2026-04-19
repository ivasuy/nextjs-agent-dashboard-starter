import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva('rounded-xl border bg-(--surface-bg-card)', {
  variants: {
    variant: {
      default: 'border-(--border-default) shadow-sm',
      interactive: [
        'border-(--border-default) shadow-sm cursor-pointer',
        'transition-all duration-200',
        'hover:shadow-hover hover:-translate-y-0.5 hover:border-(--border-hover)',
        'active:translate-y-0 active:shadow-sm',
      ].join(' '),
      selected: 'border-primary-500 shadow-sm ring-1 ring-primary-500/20',
    },
    padding: {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: { variant: 'default', padding: 'md' },
});

export const cardHeaderVariants = cva(
  'flex items-center justify-between border-b border-(--border-default)',
  {
    variants: {
      padding: {
        none: '',
        sm: 'px-3 py-2',
        md: 'px-4 py-3',
        lg: 'px-6 py-4',
      },
    },
    defaultVariants: { padding: 'md' },
  },
);

export const cardBodyVariants = cva('', {
  variants: {
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: { padding: 'md' },
});

export const cardFooterVariants = cva('flex items-center border-t border-(--border-default)', {
  variants: {
    padding: {
      none: '',
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    },
  },
  defaultVariants: { padding: 'md' },
});

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;
export type CardBodyVariants = VariantProps<typeof cardBodyVariants>;
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>;
