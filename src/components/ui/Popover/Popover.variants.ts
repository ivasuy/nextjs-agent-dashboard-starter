import { cva } from 'class-variance-authority';

export const popoverContentVariants = cva([
  'z-50 w-72 rounded-lg border p-4',
  'bg-(--surface-bg-card) border-(--border-default)',
  'text-(--text-primary) shadow-lg',
  'outline-none',
  'animate-in fade-in-0 zoom-in-95',
  'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  'data-[side=top]:slide-in-from-bottom-2',
  'data-[side=bottom]:slide-in-from-top-2',
  'data-[side=left]:slide-in-from-right-2',
  'data-[side=right]:slide-in-from-left-2',
]);
