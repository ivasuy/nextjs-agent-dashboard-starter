'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function useConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useConfirm must be used within ConfirmProvider');
  return context.confirm;
}

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<(ConfirmOptions & { isOpen: boolean }) | null>(null);
  const resolveRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve;
      setState({ ...options, isOpen: true });
    });
  }, []);

  const handleClose = useCallback((result: boolean) => {
    resolveRef.current?.(result);
    resolveRef.current = null;
    setState(null);
  }, []);

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {state?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => handleClose(false)} />
          <div className="shadow-modal relative z-10 w-full max-w-md rounded-xl bg-(--surface-bg-card) p-6">
            <h2 className="text-lg font-semibold text-(--text-primary)">{state.title}</h2>
            {state.description && (
              <p className="mt-2 text-sm text-(--text-secondary)">{state.description}</p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:bg-neutral-100"
              >
                {state.cancelLabel ?? 'Cancel'}
              </button>
              <button
                onClick={() => handleClose(true)}
                className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                  state.variant === 'danger'
                    ? 'bg-error hover:bg-red-700'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
              >
                {state.confirmLabel ?? 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
