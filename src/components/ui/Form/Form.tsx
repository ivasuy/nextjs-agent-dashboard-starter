'use client';

import { FormProvider, type UseFormReturn, type FieldValues } from 'react-hook-form';
import { cn } from '@/utils/cn';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  className?: string;
}

export function Form<T extends FieldValues>({ form, onSubmit, children, className }: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
