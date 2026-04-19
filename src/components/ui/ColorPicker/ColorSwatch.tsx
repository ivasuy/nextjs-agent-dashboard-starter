import { cn } from '@/utils/cn';

interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick?: (color: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-10 w-10',
} as const;

export function ColorSwatch({
  color,
  selected = false,
  onClick,
  size = 'md',
  className,
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(color)}
      className={cn(
        'rounded-full border-2 transition-transform hover:scale-110',
        selected ? 'border-primary-500 ring-primary-500/20 ring-2' : 'border-transparent',
        sizeClasses[size],
        className,
      )}
      style={{ backgroundColor: color }}
      aria-label={`Select color ${color}`}
      aria-pressed={selected}
    />
  );
}
