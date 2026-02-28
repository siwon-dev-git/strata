import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';

export interface DropdownMenuContentProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Content
> {
  children: ReactNode;
}

export interface DropdownMenuItemProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Item
> {
  icon?: ReactNode;
  shortcut?: string;
  children: ReactNode;
}

export type DropdownMenuSeparatorProps = ComponentPropsWithRef<
  typeof RadixDropdownMenu.Separator
>;

export interface DropdownMenuLabelProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Label
> {
  children: ReactNode;
}
