import { forwardRef } from 'react';
import { Badge, type BadgeVariants } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const STATUS_VARIANT_MAP = {
  draft: 'default',
  active: 'success',
  paused: 'warning',
  completed: 'primary',
  archived: 'default',
} as const;

type CampaignStatus = keyof typeof STATUS_VARIANT_MAP;

interface StatusBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>, Pick<BadgeVariants, 'size'> {
  status: CampaignStatus;
  label?: string;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, label, size, className, ...props }, ref) => {
    const variant = STATUS_VARIANT_MAP[status];
    const displayLabel = label ?? status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        className={cn('gap-1.5', className)}
        {...props}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {displayLabel}
      </Badge>
    );
  },
);

StatusBadge.displayName = 'StatusBadge';
