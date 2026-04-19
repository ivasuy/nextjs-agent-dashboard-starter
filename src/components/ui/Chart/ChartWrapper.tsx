'use client';

import { SkeletonChart } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { SectionError } from '@/components/ui/SectionError';
import { BarChart3 } from 'lucide-react';

interface ChartWrapperProps {
  isLoading?: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  title?: string;
  children: React.ReactNode;
}

export function ChartWrapper({
  isLoading,
  isEmpty,
  isError,
  onRetry,
  title,
  children,
}: ChartWrapperProps) {
  if (isLoading) return <SkeletonChart />;
  if (isError) return <SectionError onRetry={onRetry} />;
  if (isEmpty)
    return (
      <EmptyState icon={BarChart3} title="No data" description="There's no data to display yet" />
    );

  return (
    <div>
      {title && <h3 className="mb-3 text-sm font-semibold text-(--text-primary)">{title}</h3>}
      {children}
    </div>
  );
}
