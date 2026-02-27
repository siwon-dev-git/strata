import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

/* ----- Root / Trigger / Close — pass-through ----------------------------- */

export const DialogRoot = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogClose = RadixDialog.Close;

/* ----- Content (Portal + Overlay + Content) ------------------------------ */

interface DialogContentProps extends ComponentPropsWithRef<
  typeof RadixDialog.Content
> {
  children: ReactNode;
}

export function DialogContent({
  className,
  children,
  ref,
  ...props
}: DialogContentProps) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-[--overlay-bg]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        )}
      />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'w-full max-w-lg',
          'rounded-[--dialog-radius] bg-[--dialog-bg] border border-[--dialog-border] shadow-[--dialog-shadow]',
          'p-0',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

/* ----- Header / Body / Footer -------------------------------------------- */

interface DialogSectionProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export function DialogHeader({
  className,
  children,
  ref,
  ...props
}: DialogSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-b border-[--border-subtle] px-5 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogBody({
  className,
  children,
  ref,
  ...props
}: DialogSectionProps) {
  return (
    <div ref={ref} className={cn('px-5 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({
  className,
  children,
  ref,
  ...props
}: DialogSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-2 border-t border-[--border-subtle] px-5 py-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ----- Title / Description ----------------------------------------------- */

interface DialogTitleProps extends ComponentPropsWithRef<
  typeof RadixDialog.Title
> {
  children: ReactNode;
}

export function DialogTitle({
  className,
  children,
  ref,
  ...props
}: DialogTitleProps) {
  return (
    <RadixDialog.Title
      ref={ref}
      className={cn('text-base font-semibold text-fg-default', className)}
      {...props}
    >
      {children}
    </RadixDialog.Title>
  );
}

interface DialogDescriptionProps extends ComponentPropsWithRef<
  typeof RadixDialog.Description
> {
  children: ReactNode;
}

export function DialogDescription({
  className,
  children,
  ref,
  ...props
}: DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      ref={ref}
      className={cn('text-sm text-fg-muted', className)}
      {...props}
    >
      {children}
    </RadixDialog.Description>
  );
}
