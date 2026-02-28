import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixDialog from '@radix-ui/react-dialog';

export type Side = 'left' | 'right' | 'top' | 'bottom';

export interface SheetContentProps extends ComponentPropsWithRef<
  typeof RadixDialog.Content
> {
  children: ReactNode;
  side?: Side;
}

export interface SheetSectionProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export interface SheetTitleProps extends ComponentPropsWithRef<
  typeof RadixDialog.Title
> {
  children: ReactNode;
}

export interface SheetDescriptionProps extends ComponentPropsWithRef<
  typeof RadixDialog.Description
> {
  children: ReactNode;
}
