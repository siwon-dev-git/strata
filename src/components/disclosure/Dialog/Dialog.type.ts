import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixDialog from '@radix-ui/react-dialog';

/** Renders portal + overlay + centered modal panel with fade/zoom transitions. */
export interface DialogContentProps extends ComponentPropsWithRef<
  typeof RadixDialog.Content
> {
  children: ReactNode;
}

/** Shared base for DialogHeader, DialogBody, and DialogFooter sections. */
export interface DialogSectionProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

/** Accessible dialog heading rendered via Radix `Title`. Required for screen readers. */
export interface DialogTitleProps extends ComponentPropsWithRef<
  typeof RadixDialog.Title
> {
  children: ReactNode;
}

/** Optional dialog description for additional context below the title. */
export interface DialogDescriptionProps extends ComponentPropsWithRef<
  typeof RadixDialog.Description
> {
  children: ReactNode;
}
