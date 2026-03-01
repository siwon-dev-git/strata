'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import type {
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from './Tabs.type';

/* ----- Root -------------------------------------------------------------- */

export const TabsRoot = RadixTabs.Root;

/* ----- List -------------------------------------------------------------- */

export function TabsList({
  className,
  children,
  ref,
  ...props
}: TabsListProps) {
  return (
    <RadixTabs.List
      ref={ref}
      className={cn('flex border-b border-[--tabs-border] gap-0', className)}
      {...props}
    >
      {children}
    </RadixTabs.List>
  );
}

/* ----- Trigger ----------------------------------------------------------- */

export function TabsTrigger({
  className,
  children,
  ref,
  ...props
}: TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      ref={ref}
      className={cn(
        'px-4 py-2.5 text-sm font-medium text-[--tabs-trigger-fg] transition-colors relative',
        'hover:text-[--tabs-active-fg] hover:bg-[--tabs-hover-bg]',
        'data-[state=active]:text-[--tabs-active-fg]',
        'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
        'data-[state=active]:after:bg-[--tabs-active-border]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        className,
      )}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  );
}

/* ----- Content ----------------------------------------------------------- */

export function TabsContent({
  className,
  children,
  ref,
  ...props
}: TabsContentProps) {
  return (
    <RadixTabs.Content
      ref={ref}
      className={cn('p-4 focus-visible:outline-none', className)}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  );
}
