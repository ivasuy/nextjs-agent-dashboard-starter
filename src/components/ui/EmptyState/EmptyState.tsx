import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {Icon && (
        <div className="mb-4 rounded-full bg-neutral-100 p-3">
          <Icon className="h-6 w-6 text-(--text-muted)" />
        </div>
      )}
      <h3 className="text-base font-semibold text-(--text-primary)">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-(--text-secondary)">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
