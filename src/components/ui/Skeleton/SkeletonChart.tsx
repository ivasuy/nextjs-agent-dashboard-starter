/* eslint-disable react/no-array-index-key -- static decorative skeleton elements that never reorder */
import { Skeleton } from './Skeleton';

const BAR_HEIGHTS = [40, 65, 45, 80, 55, 70, 50, 75, 60, 85, 45, 70];

export function SkeletonChart() {
  return (
    <div className="space-y-4">
      <div className="flex h-48 items-end gap-2">
        {BAR_HEIGHTS.map((h, i) => (
          <Skeleton key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%` }} />
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
}
