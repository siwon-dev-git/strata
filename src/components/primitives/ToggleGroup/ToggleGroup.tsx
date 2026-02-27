import type React from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';

/* ----- Variant / Size maps ---------------------------------------------- */

const VARIANT_MAP = {
  default: [
    'bg-[--toggle-bg]',
    'hover:bg-[--toggle-active-bg]',
    'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
  ].join(' '),
  outline: [
    'bg-[--toggle-bg] border border-[--toggle-border]',
    'hover:bg-[--toggle-active-bg]',
    'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
  ].join(' '),
} as const;

const SIZE_MAP = {
  sm: 'h-7 px-2 text-xs gap-1',
  md: 'h-9 px-3 text-sm gap-1.5',
  lg: 'h-11 px-4 text-base gap-2',
} as const;

type ToggleVariant = keyof typeof VARIANT_MAP;
type ToggleSize = keyof typeof SIZE_MAP;

/* ----- Toggle (single) -------------------------------------------------- */

interface ToggleProps extends ComponentPropsWithRef<
  typeof TogglePrimitive.Root
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: ReactNode;
}

export function Toggle({
  variant = 'default',
  size = 'md',
  className,
  children,
  ref,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-[--toggle-radius]',
        'font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive.Root>
  );
}

/* ----- ToggleGroupRoot --------------------------------------------------- */

type ToggleGroupRootProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Root
> & {
  ref?: React.Ref<HTMLDivElement>;
};

export function ToggleGroupRoot({
  className,
  children,
  ref,
  ...props
}: ToggleGroupRootProps) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/* ----- ToggleGroupItem --------------------------------------------------- */

interface ToggleGroupItemProps extends ComponentPropsWithRef<
  typeof ToggleGroupPrimitive.Item
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: ReactNode;
}

export function ToggleGroupItem({
  variant = 'default',
  size = 'md',
  className,
  children,
  ref,
  ...props
}: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-[--toggle-radius]',
        'font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
