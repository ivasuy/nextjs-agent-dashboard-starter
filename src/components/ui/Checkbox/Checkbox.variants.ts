import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
  [
    'peer h-5 w-5 shrink-0 rounded border',
    'border-(--border-default)',
    'transition-colors duration-150',
    'hover:border-primary-400',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 data-[state=checked]:text-white',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
