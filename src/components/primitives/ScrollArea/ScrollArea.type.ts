import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixScrollArea from '@radix-ui/react-scroll-area';

export interface ScrollAreaRootProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Root
> {
  children: ReactNode;
}

export interface ScrollAreaViewportProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Viewport
> {
  children: ReactNode;
}

export type ScrollAreaScrollbarProps = ComponentPropsWithRef<
  typeof RadixScrollArea.Scrollbar
>;

export type ScrollAreaThumbProps = ComponentPropsWithRef<
  typeof RadixScrollArea.Thumb
>;

export interface ScrollAreaProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Root
> {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'both';
}
