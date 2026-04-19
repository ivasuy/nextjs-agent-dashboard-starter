'use client';

import { subDays, subMonths, startOfMonth, endOfMonth, subYears } from 'date-fns';
import { cn } from '@/utils/cn';

interface DateRange {
  from: Date | null;
  to: Date | null;
}

interface RelativeDatePreset {
  label: string;
  getValue: () => DateRange;
}

export const DATE_RANGE_PRESETS: RelativeDatePreset[] = [
  {
    label: 'Last 7 days',
    getValue: () => ({ from: subDays(new Date(), 7), to: new Date() }),
  },
  {
    label: 'Last 14 days',
    getValue: () => ({ from: subDays(new Date(), 14), to: new Date() }),
  },
  {
    label: 'Last 30 days',
    getValue: () => ({ from: subDays(new Date(), 30), to: new Date() }),
  },
  {
    label: 'Last 90 days',
    getValue: () => ({ from: subDays(new Date(), 90), to: new Date() }),
  },
  {
    label: 'This month',
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    }),
  },
  {
    label: 'Last month',
    getValue: () => ({
      from: startOfMonth(subMonths(new Date(), 1)),
      to: endOfMonth(subMonths(new Date(), 1)),
    }),
  },
  {
    label: 'Last 6 months',
    getValue: () => ({ from: subMonths(new Date(), 6), to: new Date() }),
  },
  {
    label: 'Last year',
    getValue: () => ({ from: subYears(new Date(), 1), to: new Date() }),
  },
];

interface RelativeDateSelectProps {
  onSelect: (range: DateRange) => void;
  presets?: RelativeDatePreset[];
  className?: string;
}

export function RelativeDateSelect({
  onSelect,
  presets = DATE_RANGE_PRESETS,
  className,
}: RelativeDateSelectProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {presets.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset.getValue())}
          className="rounded-md px-3 py-1.5 text-left text-sm text-(--text-secondary) transition-colors hover:bg-neutral-100 hover:text-(--text-primary)"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
