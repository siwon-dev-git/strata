import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as ToastPrimitive from '@radix-ui/react-toast';

export type ToastViewportProps = ComponentPropsWithRef<
  typeof ToastPrimitive.Viewport
>;

export interface ToastRootProps extends ComponentPropsWithRef<
  typeof ToastPrimitive.Root
> {
  children: ReactNode;
}

export interface ToastTitleProps extends ComponentPropsWithRef<
  typeof ToastPrimitive.Title
> {
  children: ReactNode;
}

export interface ToastDescriptionProps extends ComponentPropsWithRef<
  typeof ToastPrimitive.Description
> {
  children: ReactNode;
}

export interface ToastActionProps extends ComponentPropsWithRef<
  typeof ToastPrimitive.Action
> {
  children: ReactNode;
}

export type ToastCloseProps = ComponentPropsWithRef<
  typeof ToastPrimitive.Close
>;
