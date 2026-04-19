import { cn } from '@/utils/cn';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: { value: number; label?: string };
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, icon, className }: MetricCardProps) {
  const trendColor = trend
    ? trend.value > 0
      ? 'text-success'
      : trend.value < 0
        ? 'text-error'
        : 'text-(--text-muted)'
    : '';

  const TrendIcon = trend
    ? trend.value > 0
      ? TrendingUp
      : trend.value < 0
        ? TrendingDown
        : Minus
    : null;

  return (
    <div
      className={cn(
        'rounded-xl border border-(--border-default) bg-(--surface-bg-card) p-4',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-(--text-secondary)">{title}</p>
        {icon}
      </div>
      <p className="mt-2 text-2xl font-bold text-(--text-primary)">{value}</p>
      {trend && TrendIcon && (
        <div className={cn('mt-1 flex items-center gap-1 text-xs', trendColor)}>
          <TrendIcon className="h-3 w-3" />
          <span>{Math.abs(trend.value)}%</span>
          {trend.label && <span className="text-(--text-muted)">{trend.label}</span>}
        </div>
      )}
    </div>
  );
}
