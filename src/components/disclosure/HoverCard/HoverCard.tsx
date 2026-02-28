import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { cn } from '@/lib/utils';

/* ----- Root / Trigger ---------------------------------------------------- */

export const HoverCardRoot = RadixHoverCard.Root;
export const HoverCardTrigger = RadixHoverCard.Trigger;

/* ----- Content ----------------------------------------------------------- */

interface HoverCardContentProps extends ComponentPropsWithRef<
  typeof RadixHoverCard.Content
> {
  children: ReactNode;
}

export function HoverCardContent({
  className,
  children,
  ref,
  ...props
}: HoverCardContentProps) {
  return (
    <RadixHoverCard.Portal>
      <RadixHoverCard.Content
        ref={ref}
        sideOffset={4}
        className={cn(
          'z-[--elevation-dropdown] min-w-55',
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
      </RadixHoverCard.Content>
    </RadixHoverCard.Portal>
  );
}
