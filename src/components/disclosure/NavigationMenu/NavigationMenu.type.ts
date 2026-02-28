import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';

export interface NavigationMenuRootProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Root
> {
  children: ReactNode;
}

export interface NavigationMenuListProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.List
> {
  children: ReactNode;
}

export interface NavigationMenuTriggerProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Trigger
> {
  children: ReactNode;
}

export interface NavigationMenuContentProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Content
> {
  children: ReactNode;
}

export interface NavigationMenuLinkProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Link
> {
  children: ReactNode;
}

export type NavigationMenuViewportProps = ComponentPropsWithRef<
  typeof RadixNavigationMenu.Viewport
>;
