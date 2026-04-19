'use client';

import { cn } from '@/utils/cn';

interface WizardStepProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function WizardStep({ children, className, title, description }: WizardStepProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {title && (
        <div>
          <h3 className="text-lg font-semibold text-(--text-primary)">{title}</h3>
          {description && <p className="mt-1 text-sm text-(--text-secondary)">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
