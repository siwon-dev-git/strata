import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixDialog from '@radix-ui/react-dialog';

export interface DialogContentProps extends ComponentPropsWithRef<
  typeof RadixDialog.Content
> {
  children: ReactNode;
}

export interface DialogSectionProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export interface DialogTitleProps extends ComponentPropsWithRef<
  typeof RadixDialog.Title
> {
  children: ReactNode;
}

export interface DialogDescriptionProps extends ComponentPropsWithRef<
  typeof RadixDialog.Description
> {
  children: ReactNode;
}
