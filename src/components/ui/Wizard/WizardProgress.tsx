'use client';

import { cn } from '@/utils/cn';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export function WizardProgress({
  currentStep,
  totalSteps,
  stepLabels,
  className,
}: WizardProgressProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Step indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNumber = i + 1;

          return (
            <div key={`step-${stepNumber}`} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  i < currentStep && 'bg-primary-500 text-white',
                  i === currentStep && 'bg-primary-500 ring-primary-500/20 text-white ring-4',
                  i > currentStep && 'bg-neutral-200 text-(--text-muted)',
                )}
              >
                {stepNumber}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 transition-colors',
                    i < currentStep ? 'bg-primary-500' : 'bg-neutral-200',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      {stepLabels && (
        <div className="flex">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1 text-center">
              <span
                className={cn(
                  'text-xs font-medium',
                  i <= currentStep ? 'text-(--text-primary)' : 'text-(--text-muted)',
                )}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <div className="h-1 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="bg-primary-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
