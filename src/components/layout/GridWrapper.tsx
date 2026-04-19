import { cn } from '@/utils/cn';
import { gridVariants, type GridLayout } from './GridWrapper.variants';

interface GridWrapperProps {
  layout?: GridLayout;
  children: React.ReactNode;
  className?: string;
}

export function GridWrapper({ layout = 'cards', children, className }: GridWrapperProps) {
  return <div className={cn(gridVariants({ layout }), className)}>{children}</div>;
}
