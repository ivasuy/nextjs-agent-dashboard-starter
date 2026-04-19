'use client';

import { useFormContext } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';

interface FormFieldProps {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ name, label, helperText, required, children }: FormFieldProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="text-sm font-medium text-(--text-primary)">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-error text-xs"
          >
            {error.message as string}
          </motion.p>
        )}
      </AnimatePresence>
      {helperText && !error && <p className="text-xs text-(--text-muted)">{helperText}</p>}
    </div>
  );
}
