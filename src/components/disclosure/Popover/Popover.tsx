'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

/* ----- Root / Trigger ---------------------------------------------------- */

export const PopoverRoot = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

/* ----- Content ----------------------------------------------------------- */

interface PopoverContentProps extends ComponentPropsWithRef<
  typeof PopoverPrimitive.Content
> {
  children: ReactNode;
}

export function PopoverContent({
  className,
  children,
  ref,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        sideOffset={4}
        className={cn(
          'z-[--elevation-dropdown] w-72 outline-none',
          'rounded-[--menu-radius] bg-[--menu-bg] border border-[--menu-border] shadow-[--menu-shadow]',
          'p-4',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  );
}

/* ----- Close ------------------------------------------------------------- */

interface PopoverCloseProps extends ComponentPropsWithRef<
  typeof PopoverPrimitive.Close
> {
  children?: ReactNode;
}

export function PopoverClose({
  className,
  children,
  ref,
  ...props
}: PopoverCloseProps) {
  return (
    <PopoverPrimitive.Close
      ref={ref}
      className={cn(
        'absolute right-2 top-2',
        'inline-flex items-center justify-center rounded-sm p-1',
        'text-fg-muted hover:text-fg-default',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'transition-colors',
        className,
      )}
      {...props}
    >
      {children ?? (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </PopoverPrimitive.Close>
  );
}
