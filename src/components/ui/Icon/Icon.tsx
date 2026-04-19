import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

const ICON_SIZES = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

type IconSize = keyof typeof ICON_SIZES;

interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  'aria-label'?: string;
}

export function Icon({ icon: LucideIcon, size = 'md', className, ...props }: IconProps) {
  const pixelSize = ICON_SIZES[size];
  return (
    <LucideIcon
      width={pixelSize}
      height={pixelSize}
      className={cn('shrink-0', className)}
      {...props}
    />
  );
}
