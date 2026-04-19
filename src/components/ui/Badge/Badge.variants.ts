import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  ['inline-flex items-center rounded-full font-medium', 'transition-colors duration-150'],
  {
    variants: {
      variant: {
        default: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
        primary: 'bg-primary-50 text-primary-700 border border-primary-200',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        warning: 'bg-amber-50 text-amber-700 border border-amber-200',
        error: 'bg-red-50 text-red-700 border border-red-200',
        info: 'bg-blue-50 text-blue-700 border border-blue-200',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
