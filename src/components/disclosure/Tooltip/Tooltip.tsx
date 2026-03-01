'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';
import type { TooltipContentProps, SimpleTooltipProps } from './Tooltip.type';

/* ----- Provider / Root / Trigger ----------------------------------------- */

export function TooltipProvider({
  children,
  ...props
}: RadixTooltip.TooltipProviderProps) {
  return (
    <RadixTooltip.Provider delayDuration={200} {...props}>
      {children}
    </RadixTooltip.Provider>
  );
}

export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;

/* ----- Content ----------------------------------------------------------- */

export function TooltipContent({
  className,
  children,
  ref,
  ...props
}: TooltipContentProps) {
  return (
    <RadixTooltip.Content
      ref={ref}
      sideOffset={6}
      className={cn(
        'z-[--elevation-dropdown] rounded-[--tooltip-radius] bg-[--tooltip-bg] px-2.5 py-1.5',
        'text-xs font-medium text-[--tooltip-fg] shadow-sm',
        'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out',
        'data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0',
        'data-[state=delayed-open]:zoom-in-95 data-[state=closed]:zoom-out-95',
        className,
      )}
      {...props}
    >
      {children}
    </RadixTooltip.Content>
  );
}

/* ----- SimpleTooltip convenience ----------------------------------------- */

export function SimpleTooltip({ content, children, side }: SimpleTooltipProps) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  );
}
