'use client';

import { Check, Copy } from 'lucide-react';
import { useClipboard } from '@/hooks';
import { cn } from '@/utils/cn';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const { copy, copied } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className={cn(
        'inline-flex items-center gap-1 rounded-md p-1.5 text-(--text-muted) transition-colors hover:bg-neutral-100 hover:text-(--text-primary)',
        className,
      )}
      aria-label={copied ? 'Copied' : 'Copy'}
    >
      {copied ? <Check className="text-success h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}
