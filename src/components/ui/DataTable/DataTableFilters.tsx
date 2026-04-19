'use client';

import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DataTableFiltersProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DataTableFilters({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: DataTableFiltersProps) {
  return (
    <div className={cn('relative max-w-sm flex-1', className)}>
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="focus:border-primary-500 focus:ring-primary-500/20 w-full rounded-lg border border-neutral-200 bg-(--surface-bg-card) py-2 pr-3 pl-9 text-sm text-(--text-primary) placeholder:text-(--text-muted) focus:ring-2 focus:outline-none"
      />
    </div>
  );
}
