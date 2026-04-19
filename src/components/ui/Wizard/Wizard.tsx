'use client';

import { Children, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { WizardProgress } from './WizardProgress';
import { WizardNavigation } from './WizardNavigation';

interface WizardProps {
  currentStep: number;
  totalSteps: number;
  isFirst: boolean;
  isLast: boolean;
  onNext: () => void;
  onBack: () => void;
  children: ReactNode;
  className?: string;
  stepLabels?: string[];
  nextLabel?: string;
  backLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  hideProgress?: boolean;
  hideNavigation?: boolean;
}

export function Wizard({
  currentStep,
  totalSteps,
  isFirst,
  isLast,
  onNext,
  onBack,
  children,
  className,
  stepLabels,
  nextLabel = 'Next',
  backLabel = 'Back',
  submitLabel = 'Submit',
  isSubmitting,
  hideProgress,
  hideNavigation,
}: WizardProps) {
  const steps = Children.toArray(children);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {!hideProgress && (
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} stepLabels={stepLabels} />
      )}

      <div className="min-h-0 flex-1">{steps[currentStep]}</div>

      {!hideNavigation && (
        <WizardNavigation
          isFirst={isFirst}
          isLast={isLast}
          onNext={onNext}
          onBack={onBack}
          nextLabel={nextLabel}
          backLabel={backLabel}
          submitLabel={submitLabel}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}
