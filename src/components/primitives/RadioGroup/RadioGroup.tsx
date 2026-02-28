'use client';

import type { ComponentPropsWithRef } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '@/lib/utils';

/* ----- Root -------------------------------------------------------------- */

type RadioGroupRootProps = ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Root
>;

export function RadioGroupRoot({
  className,
  ref,
  ...props
}: RadioGroupRootProps) {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  );
}

/* ----- Item -------------------------------------------------------------- */

type RadioGroupItemProps = ComponentPropsWithRef<
  typeof RadioGroupPrimitive.Item
>;

export function RadioGroupItem({
  className,
  ref,
  ...props
}: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'h-4 w-4 shrink-0 rounded-full',
        'border border-[--checkbox-border] bg-transparent',
        'data-[state=checked]:border-[--checkbox-border-checked]',
        'transition-colors duration-[--motion-duration-normal]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span className="block h-2 w-2 rounded-full bg-[--checkbox-bg-checked]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}
