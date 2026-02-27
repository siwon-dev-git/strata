import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { IconX } from '@/components/primitives/Icon/Icon';

/* ----- Root / Trigger / Close — pass-through ----------------------------- */

export const SheetRoot = RadixDialog.Root;
export const SheetTrigger = RadixDialog.Trigger;
export const SheetClose = RadixDialog.Close;

/* ----- Content (Portal + Overlay + Content) ------------------------------ */

type Side = 'left' | 'right' | 'top' | 'bottom';

const SIDE_CLASSES: Record<Side, string> = {
  right:
    'inset-y-0 right-0 w-full max-w-sm data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  left: 'inset-y-0 left-0 w-full max-w-sm data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
  top: 'inset-x-0 top-0 h-auto max-h-[50vh] data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  bottom:
    'inset-x-0 bottom-0 h-auto max-h-[50vh] data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
};

interface SheetContentProps extends ComponentPropsWithRef<
  typeof RadixDialog.Content
> {
  children: ReactNode;
  side?: Side;
}

export function SheetContent({
  side = 'right',
  className,
  children,
  ref,
  ...props
}: SheetContentProps) {
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
          'fixed z-50',
          'bg-[--dialog-bg] border border-[--dialog-border] shadow-[--dialog-shadow] p-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          SIDE_CLASSES[side],
          className,
        )}
        {...props}
      >
        {children}
        <RadixDialog.Close
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70',
            'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[--input-ring]',
            'transition-opacity',
          )}
        >
          <IconX size="sm" />
          <span className="sr-only">Close</span>
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}

/* ----- Header / Body / Footer -------------------------------------------- */

interface SheetSectionProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode;
}

export function SheetHeader({
  className,
  children,
  ref,
  ...props
}: SheetSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-b border-[--border-subtle] pb-4 mb-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SheetBody({
  className,
  children,
  ref,
  ...props
}: SheetSectionProps) {
  return (
    <div ref={ref} className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  );
}

export function SheetFooter({
  className,
  children,
  ref,
  ...props
}: SheetSectionProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-2 border-t border-[--border-subtle] pt-4 mt-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ----- Title / Description ----------------------------------------------- */

interface SheetTitleProps extends ComponentPropsWithRef<
  typeof RadixDialog.Title
> {
  children: ReactNode;
}

export function SheetTitle({
  className,
  children,
  ref,
  ...props
}: SheetTitleProps) {
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

interface SheetDescriptionProps extends ComponentPropsWithRef<
  typeof RadixDialog.Description
> {
  children: ReactNode;
}

export function SheetDescription({
  className,
  children,
  ref,
  ...props
}: SheetDescriptionProps) {
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
