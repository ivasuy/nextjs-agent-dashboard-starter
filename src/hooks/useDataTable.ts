'use client';

import { useState, useMemo, useCallback } from 'react';

interface SortState<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

interface UseDataTableOptions<T> {
  data: T[];
  pageSize?: number;
  initialSort?: SortState<T>;
}

export function useDataTable<T extends Record<string, unknown>>({
  data,
  pageSize = 10,
  initialSort,
}: UseDataTableOptions<T>) {
  const [sort, setSort] = useState<SortState<T> | null>(initialSort ?? null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filters, setFiltersState] = useState<Record<string, string>>({});

  const setFilter = useCallback((key: string, value: string) => {
    setFiltersState((prev) => {
      if (!value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
    setPage(1);
  }, []);

  const filteredData = useMemo(() => {
    if (Object.keys(filters).length === 0) return data;
    return data.filter((item) =>
      Object.entries(filters).every(([key, value]) => {
        const itemValue = String(item[key] ?? '').toLowerCase();
        return itemValue.includes(value.toLowerCase());
      }),
    );
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sort) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      return sort.direction === 'asc' ? cmp : -cmp;
    });
  }, [filteredData, sort]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize]);

  const toggleSort = useCallback((key: keyof T) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return prev.direction === 'asc' ? { key, direction: 'desc' } : null;
      }
      return { key, direction: 'asc' };
    });
  }, []);

  const toggleSelect = useCallback((index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      if (prev.size === paginatedData.length) return new Set();
      return new Set(paginatedData.map((_, i) => i));
    });
  }, [paginatedData]);

  const clearSelection = useCallback(() => setSelected(new Set()), []);

  return {
    sortedData,
    paginatedData,
    sort,
    setSort,
    toggleSort,
    page,
    setPage,
    totalPages,
    totalItems: sortedData.length,
    selected,
    toggleSelect,
    toggleAll,
    clearSelection,
    filters,
    setFilter,
    pageSize,
  };
}
