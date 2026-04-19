'use client';

import { cn } from '@/utils/cn';
import type { ColumnDef } from './DataTable.types';

interface DataTableRowProps<T> {
  row: T;
  columns: ColumnDef<T>[];
  index: number;
  selectable?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (index: number) => void;
}

export function DataTableRow<T extends Record<string, unknown>>({
  row,
  columns,
  index,
  selectable,
  isSelected,
  onToggleSelect,
}: DataTableRowProps<T>) {
  return (
    <tr
      className={cn(
        'border-b border-neutral-100 transition-colors last:border-0',
        isSelected ? 'bg-primary-500/5' : 'hover:bg-neutral-50',
      )}
    >
      {selectable && (
        <td className="w-12 px-4 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect?.(index)}
            className="h-4 w-4 rounded border-neutral-300"
          />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className={cn('px-4 py-3 text-(--text-primary)', col.className)}>
          {col.render ? col.render(row[col.key], row, index) : String(row[col.key] ?? '')}
        </td>
      ))}
    </tr>
  );
}
