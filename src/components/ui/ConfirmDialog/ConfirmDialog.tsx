'use client';

import { cn } from '@/utils/cn';
import { confirmButtonVariants } from './ConfirmDialog.variants';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'info',
  onConfirm,
  onCancel,
  className,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <div
        className={cn(
          'shadow-modal relative z-10 w-full max-w-md rounded-xl bg-(--surface-bg-card) p-6',
          className,
        )}
      >
        <h2 className="text-lg font-semibold text-(--text-primary)">{title}</h2>
        {description && <p className="mt-2 text-sm text-(--text-secondary)">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:bg-neutral-100"
          >
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className={confirmButtonVariants({ variant })}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
