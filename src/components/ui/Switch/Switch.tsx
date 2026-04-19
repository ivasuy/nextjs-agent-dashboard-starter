'use client';

import { forwardRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/utils/cn';
import { switchRootVariants, switchThumbVariants, type SwitchVariants } from './Switch.variants';

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, SwitchVariants {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ size, className, ...props }, ref) => (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchRootVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  ),
);

Switch.displayName = 'Switch';
