import { cn } from '@/utils/cn';

interface SectionWrapperProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionWrapper({
  title,
  description,
  actions,
  children,
  className,
}: SectionWrapperProps) {
  return (
    <section className={cn('space-y-4', className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>}
            {description && <p className="mt-0.5 text-sm text-(--text-secondary)">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
