'use client';

import type { ComponentPropsWithRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

type SliderProps = ComponentPropsWithRef<typeof SliderPrimitive.Root>;

export function Slider({ className, ref, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        'h-5 cursor-pointer',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full rounded-full bg-[--slider-track]">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-[--slider-range]" />
      </SliderPrimitive.Track>
      {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className={cn(
            'block h-4 w-4 rounded-full',
            'bg-[--slider-thumb] border-2 border-[--slider-range]',
            'shadow-sm',
            'transition-colors duration-[--motion-duration-normal]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}
