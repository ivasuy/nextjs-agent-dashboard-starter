import type { ReactNode } from 'react';

export interface ColumnDef<T> {
  key: keyof T & string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T, index: number) => ReactNode;
  className?: string;
}

export interface SortState<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export interface BulkAction {
  label: string;
  icon?: ReactNode;
  onClick: (selectedIndices: Set<number>) => void;
  variant?: 'default' | 'danger';
}
