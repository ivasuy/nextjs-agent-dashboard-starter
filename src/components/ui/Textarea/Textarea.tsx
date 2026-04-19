import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { textareaVariants, type TextareaVariants } from './Textarea.variants';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ state, resize, className, ...props }, ref) => (
    <textarea ref={ref} className={cn(textareaVariants({ state, resize }), className)} {...props} />
  ),
);

Textarea.displayName = 'Textarea';
