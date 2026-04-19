import { Skeleton } from './Skeleton';
import { SkeletonText } from './SkeletonText';
import { SkeletonAvatar } from './SkeletonAvatar';

export function SkeletonCard() {
  return (
    <div className="space-y-3 rounded-xl border border-(--border-default) bg-(--surface-bg-card) p-4">
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}
