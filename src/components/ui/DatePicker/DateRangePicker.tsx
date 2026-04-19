'use client';

import { cn } from '@/utils/cn';
import { DatePicker } from './DatePicker';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  disabled = false,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <DatePicker
        value={value.from}
        onChange={(from) => onChange({ ...value, from })}
        placeholder="Start date"
        disabled={disabled}
        className="flex-1"
      />
      <span className="text-sm text-(--text-muted)">to</span>
      <DatePicker
        value={value.to}
        onChange={(to) => onChange({ ...value, to })}
        placeholder="End date"
        disabled={disabled}
        className="flex-1"
      />
    </div>
  );
}
