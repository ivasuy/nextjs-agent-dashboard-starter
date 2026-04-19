'use client';

import { useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

export function usePagination({
  totalItems,
  pageSize,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const pages = useMemo(() => {
    const range: (number | 'dots')[] = [];
    const left = Math.max(2, currentPage - siblingCount);
    const right = Math.min(totalPages - 1, currentPage + siblingCount);

    range.push(1);
    if (left > 2) range.push('dots');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('dots');
    if (totalPages > 1) range.push(totalPages);

    return range;
  }, [totalPages, currentPage, siblingCount]);

  return {
    pages,
    totalPages,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
  };
}
