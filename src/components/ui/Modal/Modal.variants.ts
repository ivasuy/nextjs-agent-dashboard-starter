import { cva, type VariantProps } from 'class-variance-authority';

export const modalOverlayVariants = cva([
  'fixed inset-0 z-50 bg-black/50',
  'animate-in fade-in-0',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
]);

export const modalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full rounded-xl border bg-(--surface-bg-card)',
    'border-(--border-default) shadow-xl',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[calc(100vw-2rem)]',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export const modalHeaderVariants = cva([
  'flex items-center justify-between',
  'border-b border-(--border-default)',
  'px-6 py-4',
]);

export const modalFooterVariants = cva([
  'flex items-center justify-end gap-3',
  'border-t border-(--border-default)',
  'px-6 py-4',
]);

export type ModalContentVariants = VariantProps<typeof modalContentVariants>;
