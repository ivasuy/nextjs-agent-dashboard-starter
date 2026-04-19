'use client';

import { HexColorPicker } from 'react-colorful';
import { cn } from '@/utils/cn';
import { ColorInput } from './ColorInput';
import { ColorSwatch } from './ColorSwatch';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
  className?: string;
}

const DEFAULT_PRESETS = [
  '#4175ff',
  '#8eadff',
  '#16a34a',
  '#f59e0b',
  '#dc2626',
  '#2563eb',
  '#9333ea',
  '#ec4899',
  '#000000',
  '#6b7280',
  '#ffffff',
];

export function ColorPicker({
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  className,
}: ColorPickerProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <HexColorPicker color={value} onChange={onChange} style={{ width: '100%' }} />
      <ColorInput value={value} onChange={onChange} />
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <ColorSwatch
              key={preset}
              color={preset}
              selected={value.toLowerCase() === preset.toLowerCase()}
              onClick={onChange}
              size="sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
