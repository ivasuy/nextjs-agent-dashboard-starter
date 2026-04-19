import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { badgeVariants, type BadgeVariants } from './Badge.variants';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariants {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, className, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  ),
);

Badge.displayName = 'Badge';
