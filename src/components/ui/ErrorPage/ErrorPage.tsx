import { cn } from '@/utils/cn';
import { type LucideIcon, AlertCircle } from 'lucide-react';

interface ErrorPageProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function ErrorPage({
  icon: Icon = AlertCircle,
  title,
  description,
  action,
  className,
}: ErrorPageProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4 text-center',
        className,
      )}
    >
      <div className="bg-error/10 mb-6 rounded-full p-4">
        <Icon className="text-error h-8 w-8" />
      </div>
      <h1 className="text-2xl font-bold text-(--text-primary)">{title}</h1>
      <p className="mt-2 max-w-md text-(--text-secondary)">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
