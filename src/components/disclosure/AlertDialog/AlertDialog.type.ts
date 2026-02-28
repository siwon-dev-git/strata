import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixAlertDialog from '@radix-ui/react-alert-dialog';

export interface AlertDialogContentProps extends ComponentPropsWithRef<
  typeof RadixAlertDialog.Content
> {
  children: ReactNode;
}

export interface AlertDialogTitleProps extends ComponentPropsWithRef<
  typeof RadixAlertDialog.Title
> {
  children: ReactNode;
}

export interface AlertDialogDescriptionProps extends ComponentPropsWithRef<
  typeof RadixAlertDialog.Description
> {
  children: ReactNode;
}

export interface AlertDialogActionProps extends ComponentPropsWithRef<
  typeof RadixAlertDialog.Action
> {
  children: ReactNode;
}

export interface AlertDialogCancelProps extends ComponentPropsWithRef<
  typeof RadixAlertDialog.Cancel
> {
  children: ReactNode;
}
