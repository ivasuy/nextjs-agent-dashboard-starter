'use client';

import { AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SectionErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function SectionError({
  title = 'Something went wrong',
  message = 'Failed to load this section. Please try again.',
  onRetry,
  className,
}: SectionErrorProps) {
  return (
    <div
      className={cn(
        'border-error/20 bg-error/5 flex flex-col items-center justify-center rounded-xl border p-6 text-center',
        className,
      )}
    >
      <AlertCircle className="text-error mb-3 h-6 w-6" />
      <h3 className="text-sm font-semibold text-(--text-primary)">{title}</h3>
      <p className="mt-1 text-sm text-(--text-secondary)">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-error mt-3 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}
