import { cn } from '@/utils/cn';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={cn('space-y-(--gap-form-fields)', className)}>
      {title && (
        <div>
          <h3 className="text-base font-semibold text-(--text-primary)">{title}</h3>
          {description && <p className="text-sm text-(--text-secondary)">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
