'use client';

import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface WizardNavigationProps {
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  className?: string;
}

export function WizardNavigation({
  isFirst,
  isLast,
  onNext,
  onBack,
  nextLabel = 'Next',
  backLabel = 'Back',
  submitLabel = 'Submit',
  isSubmitting,
  className,
}: WizardNavigationProps) {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <button
        type="button"
        onClick={onBack}
        disabled={isFirst}
        className={cn(
          'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
          isFirst
            ? 'cursor-not-allowed text-(--text-muted)'
            : 'text-(--text-secondary) hover:bg-neutral-100',
        )}
      >
        {backLabel}
      </button>

      <button
        type={isLast ? 'submit' : 'button'}
        onClick={onNext}
        disabled={isSubmitting}
        className="bg-primary-500 hover:bg-primary-600 flex items-center gap-2 rounded-lg px-6 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLast ? submitLabel : nextLabel}
      </button>
    </div>
  );
}
