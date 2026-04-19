import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  subDays,
  startOfWeek,
  startOfMonth,
} from 'date-fns';

export function dateFormat(date: Date | string, pattern = 'MMM d, yyyy'): string {
  return format(new Date(date), pattern);
}

export function relativeDate(date: Date | string): string {
  const d = new Date(date);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return formatDistanceToNow(d, { addSuffix: true });
}

export const DATE_RANGE_PRESETS = [
  { label: 'Today', from: () => new Date(), to: () => new Date() },
  {
    label: 'Last 7 days',
    from: () => subDays(new Date(), 7),
    to: () => new Date(),
  },
  {
    label: 'Last 30 days',
    from: () => subDays(new Date(), 30),
    to: () => new Date(),
  },
  {
    label: 'This week',
    from: () => startOfWeek(new Date()),
    to: () => new Date(),
  },
  {
    label: 'This month',
    from: () => startOfMonth(new Date()),
    to: () => new Date(),
  },
] as const;
