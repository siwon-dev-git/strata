import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  DataListRoot                                                       */
/* ------------------------------------------------------------------ */

export function DataListRoot({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'dl'>) {
  return (
    <dl ref={ref} className={cn('grid gap-3', className)} {...props}>
      {children}
    </dl>
  );
}

/* ------------------------------------------------------------------ */
/*  DataListItem                                                       */
/* ------------------------------------------------------------------ */

export function DataListItem({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-[140px_1fr] gap-2 items-start text-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DataListLabel                                                      */
/* ------------------------------------------------------------------ */

export function DataListLabel({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'dt'>) {
  return (
    <dt
      ref={ref}
      className={cn('text-fg-muted font-medium', className)}
      {...props}
    >
      {children}
    </dt>
  );
}

/* ------------------------------------------------------------------ */
/*  DataListValue                                                      */
/* ------------------------------------------------------------------ */

export function DataListValue({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'dd'>) {
  return (
    <dd ref={ref} className={cn('text-fg-default', className)} {...props}>
      {children}
    </dd>
  );
}
