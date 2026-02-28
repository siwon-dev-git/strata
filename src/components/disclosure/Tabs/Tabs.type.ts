import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixTabs from '@radix-ui/react-tabs';

export interface TabsListProps extends ComponentPropsWithRef<
  typeof RadixTabs.List
> {
  children: ReactNode;
}

export interface TabsTriggerProps extends ComponentPropsWithRef<
  typeof RadixTabs.Trigger
> {
  children: ReactNode;
}

export interface TabsContentProps extends ComponentPropsWithRef<
  typeof RadixTabs.Content
> {
  children: ReactNode;
}
