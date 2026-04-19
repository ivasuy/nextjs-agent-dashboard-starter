'use client';

import { useCallback } from 'react';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  min,
  max,
  disabled = false,
  className,
}: DatePickerProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateStr = e.target.value;
      onChange(dateStr ? new Date(dateStr + 'T00:00:00') : null);
    },
    [onChange],
  );

  const formattedValue = value ? format(value, 'yyyy-MM-dd') : '';

  return (
    <div className={cn('relative', className)}>
      <input
        type="date"
        value={formattedValue}
        onChange={handleChange}
        min={min}
        max={max}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-lg border border-(--border-default) bg-(--surface-bg-card) px-3 pr-10 text-sm text-(--text-primary) transition-colors outline-none',
          'focus:border-primary-500 focus:ring-primary-500/20 focus:ring-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
        )}
        aria-label={placeholder}
      />
      <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-(--text-muted)" />
    </div>
  );
}
