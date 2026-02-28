import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixMenubar from '@radix-ui/react-menubar';

export interface MenubarRootProps extends ComponentPropsWithRef<
  typeof RadixMenubar.Root
> {
  children: ReactNode;
}

export interface MenubarTriggerProps extends ComponentPropsWithRef<
  typeof RadixMenubar.Trigger
> {
  children: ReactNode;
}

export interface MenubarContentProps extends ComponentPropsWithRef<
  typeof RadixMenubar.Content
> {
  children: ReactNode;
}

export interface MenubarItemProps extends ComponentPropsWithRef<
  typeof RadixMenubar.Item
> {
  icon?: ReactNode;
  shortcut?: string;
  children: ReactNode;
}

export type MenubarSeparatorProps = ComponentPropsWithRef<
  typeof RadixMenubar.Separator
>;

export interface MenubarLabelProps extends ComponentPropsWithRef<
  typeof RadixMenubar.Label
> {
  children: ReactNode;
}
