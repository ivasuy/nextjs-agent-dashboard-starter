'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import { usePagination } from '@/hooks/usePagination';

interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function DataTablePagination({
  page,
  totalPages: _totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: DataTablePaginationProps) {
  const { pages, hasNext, hasPrev } = usePagination({
    totalItems,
    pageSize,
    currentPage: page,
  });

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <p className="text-sm text-(--text-muted)">
        Showing {start}--{end} of {totalItems}
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="rounded-md p-1.5 text-(--text-secondary) transition-colors hover:bg-neutral-100 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) => {
          if (p === 'dots') {
            const previousPage = pages[i - 1];
            const nextPage = pages[i + 1];

            return (
              <span
                key={`dots-${String(previousPage)}-${String(nextPage)}`}
                className="px-2 text-(--text-muted)"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn(
                'h-8 min-w-8 rounded-md px-2 text-sm font-medium transition-colors',
                p === page
                  ? 'bg-primary-500 text-white'
                  : 'text-(--text-secondary) hover:bg-neutral-100',
              )}
            >
              {p}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="rounded-md p-1.5 text-(--text-secondary) transition-colors hover:bg-neutral-100 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
