'use client';

import { cn } from '@/utils/cn';
import type { BulkAction } from './DataTable.types';

interface DataTableBulkActionsProps {
  selected: Set<number>;
  actions: BulkAction[];
  count: number;
  className?: string;
}

export function DataTableBulkActions({
  selected,
  actions,
  count,
  className,
}: DataTableBulkActionsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm font-medium text-(--text-secondary)">{count} selected</span>
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => action.onClick(selected)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            action.variant === 'danger'
              ? 'text-error hover:bg-red-50'
              : 'text-(--text-secondary) hover:bg-neutral-100',
          )}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
}
