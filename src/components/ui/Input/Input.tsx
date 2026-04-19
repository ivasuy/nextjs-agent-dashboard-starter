import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { inputVariants, type InputVariants } from './Input.variants';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ state, size, className, ...props }, ref) => (
    <input ref={ref} className={cn(inputVariants({ state, size }), className)} {...props} />
  ),
);

Input.displayName = 'Input';
