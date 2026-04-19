'use client';

import { cn } from '@/utils/cn';
import type { ColumnDef, BulkAction } from './DataTable.types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { DataTablePagination } from './DataTablePagination';
import { DataTableFilters } from './DataTableFilters';
import { DataTableBulkActions } from './DataTableBulkActions';
import { DataTableEmpty } from './DataTableEmpty';

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  sort?: { key: keyof T; direction: 'asc' | 'desc' } | null;
  onSort?: (key: keyof T) => void;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  selectable?: boolean;
  selected?: Set<number>;
  onToggleSelect?: (index: number) => void;
  onToggleAll?: () => void;
  bulkActions?: BulkAction[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  pageSize?: number;
}

function getRowKey<T extends Record<string, unknown>>(row: T, columns: ColumnDef<T>[]) {
  const id = row.id;
  if (typeof id === 'string' || typeof id === 'number') {
    return String(id);
  }

  return columns.map((column) => String(row[column.key] ?? '')).join('|');
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sort,
  onSort,
  page,
  totalPages,
  totalItems,
  onPageChange,
  selectable,
  selected,
  onToggleSelect,
  onToggleAll,
  bulkActions,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  emptyTitle,
  emptyDescription,
  className,
  pageSize,
}: DataTableProps<T>) {
  const hasSelection = selectable && selected && selected.size > 0;

  return (
    <div className={cn('space-y-4', className)}>
      {(onSearchChange || (hasSelection && bulkActions)) && (
        <div className="flex items-center justify-between gap-4">
          {onSearchChange && (
            <DataTableFilters
              value={searchValue ?? ''}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
            />
          )}
          {hasSelection && bulkActions && (
            <DataTableBulkActions selected={selected} actions={bulkActions} count={selected.size} />
          )}
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-neutral-200">
        <table className="w-full text-left text-sm">
          <DataTableHeader
            columns={columns}
            sort={sort}
            onSort={onSort}
            selectable={selectable}
            allSelected={selected?.size === data.length && data.length > 0}
            onToggleAll={onToggleAll}
          />
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  <DataTableEmpty title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <DataTableRow
                  key={getRowKey(row, columns)}
                  row={row}
                  columns={columns}
                  index={index}
                  selectable={selectable}
                  isSelected={selected?.has(index)}
                  onToggleSelect={onToggleSelect}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {onPageChange && totalPages && totalPages > 1 && (
        <DataTablePagination
          page={page ?? 1}
          totalPages={totalPages}
          totalItems={totalItems ?? 0}
          pageSize={pageSize ?? 10}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
