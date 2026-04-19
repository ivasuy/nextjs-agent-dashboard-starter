'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

interface ColorInputProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export function ColorInput({ value, onChange, className }: ColorInputProps) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);
    if (HEX_REGEX.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    if (!HEX_REGEX.test(inputValue)) {
      setInputValue(value);
    }
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="h-8 w-8 shrink-0 rounded-md border border-(--border-default)"
        style={{ backgroundColor: value }}
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder="#000000"
        maxLength={7}
        className="focus:border-primary-500 focus:ring-primary-500/20 h-9 w-full rounded-lg border border-(--border-default) bg-(--surface-bg-card) px-3 text-sm text-(--text-primary) transition-colors outline-none focus:ring-2"
        aria-label="Hex color value"
      />
    </div>
  );
}
