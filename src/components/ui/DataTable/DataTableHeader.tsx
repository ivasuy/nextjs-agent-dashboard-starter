'use client';

import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { ColumnDef } from './DataTable.types';

interface DataTableHeaderProps<T> {
  columns: ColumnDef<T>[];
  sort?: { key: keyof T; direction: 'asc' | 'desc' } | null;
  onSort?: (key: keyof T) => void;
  selectable?: boolean;
  allSelected?: boolean;
  onToggleAll?: () => void;
}

export function DataTableHeader<T>({
  columns,
  sort,
  onSort,
  selectable,
  allSelected,
  onToggleAll,
}: DataTableHeaderProps<T>) {
  return (
    <thead className="border-b border-neutral-200 bg-neutral-50">
      <tr>
        {selectable && (
          <th className="w-12 px-4 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onToggleAll}
              className="h-4 w-4 rounded border-neutral-300"
            />
          </th>
        )}
        {columns.map((col) => {
          const isSorted = sort?.key === col.key;
          const SortIcon = isSorted
            ? sort.direction === 'asc'
              ? ArrowUp
              : ArrowDown
            : ArrowUpDown;

          return (
            <th
              key={col.key}
              className={cn(
                'px-4 py-3 text-xs font-semibold tracking-wider text-(--text-muted) uppercase',
                col.sortable && 'cursor-pointer select-none hover:text-(--text-primary)',
                col.className,
              )}
              style={col.width ? { width: col.width } : undefined}
              onClick={() => col.sortable && onSort?.(col.key)}
            >
              <span className="inline-flex items-center gap-1.5">
                {col.header}
                {col.sortable && (
                  <SortIcon
                    className={cn('h-3.5 w-3.5', isSorted ? 'text-primary-500' : 'opacity-40')}
                  />
                )}
              </span>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
