import { cn } from '@/utils/cn';

export function SkipLink({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className={cn(
        'bg-primary-500 fixed top-4 left-4 z-50 -translate-y-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-transform',
        'focus:translate-y-0',
      )}
    >
      Skip to main content
    </a>
  );
}
