import { cva } from 'class-variance-authority';

export const confirmButtonVariants = cva(
  'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        danger: 'bg-error text-white hover:bg-red-700',
        warning: 'bg-warning text-white hover:bg-amber-600',
        info: 'bg-primary-500 text-white hover:bg-primary-600',
      },
    },
    defaultVariants: { variant: 'info' },
  },
);

export type ConfirmButtonVariants = Parameters<typeof confirmButtonVariants>[0];
