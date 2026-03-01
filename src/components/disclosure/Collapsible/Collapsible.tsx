'use client';

import type { ComponentPropsWithRef } from 'react';
import * as RadixCollapsible from '@radix-ui/react-collapsible';
import { cn } from '@/lib/utils';

/* ----- Root / Trigger ---------------------------------------------------- */

export const CollapsibleRoot = RadixCollapsible.Root;
export const CollapsibleTrigger = RadixCollapsible.Trigger;

/* ----- Content ----------------------------------------------------------- */

export function CollapsibleContent({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof RadixCollapsible.Content>) {
  return (
    <RadixCollapsible.Content
      ref={ref}
      className={cn(
        'overflow-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:slide-in-from-top-1 data-[state=closed]:slide-out-to-top-1',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    >
      {children}
    </RadixCollapsible.Content>
  );
}
