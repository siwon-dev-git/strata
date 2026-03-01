'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { cn } from '@/lib/utils';
import type {
  ToastViewportProps,
  ToastRootProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from './Toast.type';

/* ----- Provider — pass-through ------------------------------------------- */

export const ToastProvider = ToastPrimitive.Provider;

/* ----- Viewport ---------------------------------------------------------- */

export function ToastViewport({
  className,
  ref,
  ...props
}: ToastViewportProps) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(
        'fixed bottom-4 right-4 z-[--elevation-toast] flex max-h-screen w-full max-w-sm flex-col gap-2',
        className,
      )}
      {...props}
    />
  );
}

/* ----- Root -------------------------------------------------------------- */

export function ToastRoot({
  className,
  children,
  ref,
  ...props
}: ToastRootProps) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        'bg-[--toast-bg] border border-[--toast-border] rounded-[--toast-radius] shadow-[--toast-shadow]',
        'p-4 pr-6',
        'transition-opacity data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Root>
  );
}

/* ----- Title ------------------------------------------------------------- */

export function ToastTitle({
  className,
  children,
  ref,
  ...props
}: ToastTitleProps) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      className={cn('text-sm font-semibold text-fg-default', className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Title>
  );
}

/* ----- Description ------------------------------------------------------- */

export function ToastDescription({
  className,
  children,
  ref,
  ...props
}: ToastDescriptionProps) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      className={cn('mt-1 text-sm text-fg-muted', className)}
      {...props}
    >
      {children}
    </ToastPrimitive.Description>
  );
}

/* ----- Action ------------------------------------------------------------ */

export function ToastAction({
  className,
  children,
  ref,
  ...props
}: ToastActionProps) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      className={cn(
        'inline-flex h-7 items-center justify-center rounded-md border border-border-default bg-transparent px-3 text-xs font-medium',
        'hover:bg-interactive-subtle transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </ToastPrimitive.Action>
  );
}

/* ----- Close ------------------------------------------------------------- */

export function ToastClose({ className, ref, ...props }: ToastCloseProps) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      className={cn(
        'absolute right-2 top-2 rounded-md p-1 text-fg-muted hover:text-fg-default',
        className,
      )}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </ToastPrimitive.Close>
  );
}
