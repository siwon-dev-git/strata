'use client';

import type { ComponentPropsWithRef } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

const SIZE_MAP = {
  sm: {
    root: 'w-7 h-4',
    thumb: 'h-3 w-3 data-[state=checked]:translate-x-3',
  },
  md: {
    root: 'w-9 h-5',
    thumb: 'h-4 w-4 data-[state=checked]:translate-x-4',
  },
} as const;

type SwitchSize = keyof typeof SIZE_MAP;

interface SwitchProps extends Omit<
  ComponentPropsWithRef<typeof SwitchPrimitive.Root>,
  'asChild'
> {
  size?: SwitchSize;
}

export function Switch({ size = 'md', className, ref, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex shrink-0 items-center rounded-full',
        'bg-[--switch-bg]',
        'data-[state=checked]:bg-[--switch-bg-checked]',
        'transition-colors duration-[--motion-duration-normal]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        SIZE_MAP[size].root,
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'block rounded-full bg-[--switch-thumb]',
          'transition-transform duration-[--motion-duration-normal]',
          'data-[state=unchecked]:translate-x-0.5',
          SIZE_MAP[size].thumb,
        )}
      />
    </SwitchPrimitive.Root>
  );
}
