import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixContextMenu from '@radix-ui/react-context-menu';

export interface ContextMenuContentProps extends ComponentPropsWithRef<
  typeof RadixContextMenu.Content
> {
  children: ReactNode;
}

export interface ContextMenuItemProps extends ComponentPropsWithRef<
  typeof RadixContextMenu.Item
> {
  icon?: ReactNode;
  shortcut?: string;
  children: ReactNode;
}

export type ContextMenuSeparatorProps = ComponentPropsWithRef<
  typeof RadixContextMenu.Separator
>;

export interface ContextMenuLabelProps extends ComponentPropsWithRef<
  typeof RadixContextMenu.Label
> {
  children: ReactNode;
}
