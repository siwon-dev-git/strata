import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Table                                                              */
/* ------------------------------------------------------------------ */

export function Table({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'table'>) {
  return (
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    >
      {children}
    </table>
  );
}

/* ------------------------------------------------------------------ */
/*  TableHeader                                                        */
/* ------------------------------------------------------------------ */

export function TableHeader({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'thead'>) {
  return (
    <thead
      ref={ref}
      className={cn('border-b border-border-subtle', className)}
      {...props}
    >
      {children}
    </thead>
  );
}

/* ------------------------------------------------------------------ */
/*  TableBody                                                          */
/* ------------------------------------------------------------------ */

export function TableBody({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'tbody'>) {
  return (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    >
      {children}
    </tbody>
  );
}

/* ------------------------------------------------------------------ */
/*  TableFooter                                                        */
/* ------------------------------------------------------------------ */

export function TableFooter({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'tfoot'>) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-border-subtle bg-surface-raised font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
}

/* ------------------------------------------------------------------ */
/*  TableRow                                                           */
/* ------------------------------------------------------------------ */

export function TableRow({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'tr'>) {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b border-border-subtle transition-colors hover:bg-surface-raised',
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  TableHead                                                          */
/* ------------------------------------------------------------------ */

export function TableHead({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'th'>) {
  return (
    <th
      ref={ref}
      className={cn(
        'h-10 px-3 text-left align-middle font-medium text-fg-muted',
        className,
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/* ------------------------------------------------------------------ */
/*  TableCell                                                          */
/* ------------------------------------------------------------------ */

export function TableCell({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'td'>) {
  return (
    <td
      ref={ref}
      className={cn('px-3 py-2.5 align-middle', className)}
      {...props}
    >
      {children}
    </td>
  );
}

/* ------------------------------------------------------------------ */
/*  TableCaption                                                       */
/* ------------------------------------------------------------------ */

export function TableCaption({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'caption'>) {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-fg-muted', className)}
      {...props}
    >
      {children}
    </caption>
  );
}
