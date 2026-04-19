import { cva } from 'class-variance-authority';

export const gridVariants = cva('grid', {
  variants: {
    layout: {
      cards: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-(--gap-card-grid)',
      metrics: 'grid-cols-2 md:grid-cols-4 gap-(--gap-card-grid)',
      splitView: 'grid-cols-1 lg:grid-cols-[1fr_400px] gap-6',
      equal2: 'grid-cols-1 md:grid-cols-2 gap-(--gap-card-grid)',
      equal3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--gap-card-grid)',
    },
  },
  defaultVariants: {
    layout: 'cards',
  },
});

export type GridLayout = NonNullable<Parameters<typeof gridVariants>[0]>['layout'];
