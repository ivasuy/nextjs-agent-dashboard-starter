'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackText?: string;
}

export function ImageWithFallback({
  fallbackText,
  className,
  alt,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const initials = (fallbackText ?? alt ?? '?')
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    return (
      <div
        className={cn(
          'bg-primary-100 text-primary-700 flex items-center justify-center rounded-full text-sm font-semibold',
          className,
        )}
        style={{ width: props.width as number, height: props.height as number }}
        role="img"
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return <Image className={className} alt={alt} onError={() => setHasError(true)} {...props} />;
}
