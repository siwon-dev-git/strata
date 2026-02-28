import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/utils';
import type {
  AlertDialogContentProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from './AlertDialog.type';

/* ----- Root / Trigger — pass-through -------------------------------------- */

export const AlertDialogRoot = RadixAlertDialog.Root;
export const AlertDialogTrigger = RadixAlertDialog.Trigger;

/* ----- Content (Portal + Overlay + Content) ------------------------------- */

export function AlertDialogContent({
  className,
  children,
  ref,
  ...props
}: AlertDialogContentProps) {
  return (
    <RadixAlertDialog.Portal>
      <RadixAlertDialog.Overlay
        className={cn(
          'fixed inset-0 z-50 bg-[--overlay-bg]',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        )}
      />
      <RadixAlertDialog.Content
        ref={ref}
        className={cn(
          'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
          'w-full max-w-md',
          'rounded-[--dialog-radius] bg-[--dialog-bg] border border-[--dialog-border] shadow-[--dialog-shadow]',
          'p-6',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
      </RadixAlertDialog.Content>
    </RadixAlertDialog.Portal>
  );
}

/* ----- Title -------------------------------------------------------------- */

export function AlertDialogTitle({
  className,
  children,
  ref,
  ...props
}: AlertDialogTitleProps) {
  return (
    <RadixAlertDialog.Title
      ref={ref}
      className={cn('text-lg font-semibold text-fg-default', className)}
      {...props}
    >
      {children}
    </RadixAlertDialog.Title>
  );
}

/* ----- Description -------------------------------------------------------- */

export function AlertDialogDescription({
  className,
  children,
  ref,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <RadixAlertDialog.Description
      ref={ref}
      className={cn('text-sm text-fg-muted mt-2', className)}
      {...props}
    >
      {children}
    </RadixAlertDialog.Description>
  );
}

/* ----- Action ------------------------------------------------------------- */

export function AlertDialogAction({
  className,
  children,
  ref,
  ...props
}: AlertDialogActionProps) {
  return (
    <RadixAlertDialog.Action
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center h-9 px-4 rounded-[--btn-radius] text-sm font-medium transition-colors',
        'bg-[--btn-danger-bg] text-[--btn-danger-fg] hover:bg-[--btn-danger-bg-hover]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        className,
      )}
      {...props}
    >
      {children}
    </RadixAlertDialog.Action>
  );
}

/* ----- Cancel ------------------------------------------------------------- */

export function AlertDialogCancel({
  className,
  children,
  ref,
  ...props
}: AlertDialogCancelProps) {
  return (
    <RadixAlertDialog.Cancel
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center h-9 px-4 rounded-[--btn-radius] text-sm font-medium transition-colors',
        'bg-transparent text-fg-default border border-[--btn-outline-border]',
        'hover:bg-[--btn-ghost-bg-hover]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        className,
      )}
      {...props}
    >
      {children}
    </RadixAlertDialog.Cancel>
  );
}
