import type React from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixToolbar from '@radix-ui/react-toolbar';

export interface ToolbarRootProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Root
> {
  children: ReactNode;
}

export interface ToolbarButtonProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Button
> {
  children: ReactNode;
}

export type ToolbarSeparatorProps = ComponentPropsWithRef<
  typeof RadixToolbar.Separator
>;

export type ToolbarToggleGroupProps = React.ComponentProps<
  typeof RadixToolbar.ToggleGroup
> & {
  ref?: React.Ref<HTMLDivElement>;
};

export interface ToolbarToggleItemProps extends ComponentPropsWithRef<
  typeof RadixToolbar.ToggleItem
> {
  children: ReactNode;
}

export interface ToolbarLinkProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Link
> {
  children: ReactNode;
}
