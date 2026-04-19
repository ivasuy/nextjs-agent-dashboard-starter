import { cn } from '@/utils/cn';

interface PageWrapperProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({
  title,
  description,
  actions,
  children,
  className,
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-(--content-max-width)',
        'px-4 py-6 md:px-6 md:py-8',
        className,
      )}
    >
      {(title || actions) && (
        <div className="mb-(--gap-page-sections) flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h1 className="text-2xl font-bold text-(--text-primary)">{title}</h1>}
            {description && <p className="mt-1 text-sm text-(--text-secondary)">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
