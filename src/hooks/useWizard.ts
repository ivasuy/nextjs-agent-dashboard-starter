'use client';

import { useState, useCallback } from 'react';

interface UseWizardOptions {
  totalSteps: number;
  storageKey?: string;
  onComplete?: () => void;
}

export function useWizard({ totalSteps, storageKey, onComplete }: UseWizardOptions) {
  const [currentStep, setCurrentStep] = useState(() => {
    if (storageKey && typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(storageKey);
      return saved ? Number(saved) : 0;
    }
    return 0;
  });

  const goNext = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps - 1);
      if (storageKey) sessionStorage.setItem(storageKey, String(next));
      if (next === totalSteps - 1) onComplete?.();
      return next;
    });
  }, [totalSteps, storageKey, onComplete]);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 0);
      if (storageKey) sessionStorage.setItem(storageKey, String(next));
      return next;
    });
  }, [storageKey]);

  const goTo = useCallback(
    (step: number) => {
      const clamped = Math.max(0, Math.min(step, totalSteps - 1));
      setCurrentStep(clamped);
      if (storageKey) sessionStorage.setItem(storageKey, String(clamped));
    },
    [totalSteps, storageKey],
  );

  const reset = useCallback(() => {
    setCurrentStep(0);
    if (storageKey) sessionStorage.removeItem(storageKey);
  }, [storageKey]);

  return {
    currentStep,
    totalSteps,
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    progress: ((currentStep + 1) / totalSteps) * 100,
    goNext,
    goBack,
    goTo,
    reset,
  };
}
