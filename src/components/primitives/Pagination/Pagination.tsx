import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ----- Root ---------------------------------------------------------------- */

interface PaginationRootProps extends ComponentPropsWithRef<'nav'> {
  children: ReactNode;
}

export function PaginationRoot({
  className,
  children,
  ref,
  ...props
}: PaginationRootProps) {
  return (
    <nav
      ref={ref}
      aria-label="pagination"
      className={cn('flex justify-center', className)}
      {...props}
    >
      {children}
    </nav>
  );
}

/* ----- Content ------------------------------------------------------------- */

interface PaginationContentProps extends ComponentPropsWithRef<'ul'> {
  children: ReactNode;
}

export function PaginationContent({
  className,
  children,
  ref,
  ...props
}: PaginationContentProps) {
  return (
    <ul
      ref={ref}
      className={cn('flex items-center gap-1 list-none', className)}
      {...props}
    >
      {children}
    </ul>
  );
}

/* ----- Item ---------------------------------------------------------------- */

interface PaginationItemProps extends ComponentPropsWithRef<'li'> {
  children: ReactNode;
}

export function PaginationItem({
  className,
  children,
  ref,
  ...props
}: PaginationItemProps) {
  return (
    <li ref={ref} className={cn(className)} {...props}>
      {children}
    </li>
  );
}

/* ----- Link ---------------------------------------------------------------- */

interface PaginationLinkProps extends ComponentPropsWithRef<'button'> {
  isActive?: boolean;
  children: ReactNode;
}

export function PaginationLink({
  isActive = false,
  className,
  children,
  ref,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center h-9 min-w-9 rounded-[--btn-radius] text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        isActive
          ? 'bg-[--btn-solid-bg] text-[--btn-solid-fg]'
          : 'text-fg-muted hover:bg-[--btn-ghost-bg-hover]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* ----- Previous ------------------------------------------------------------ */

type PaginationPreviousProps = ComponentPropsWithRef<'button'>;

export function PaginationPrevious({
  className,
  ref,
  ...props
}: PaginationPreviousProps) {
  return (
    <button
      ref={ref}
      aria-label="Go to previous page"
      className={cn(
        'inline-flex items-center justify-center h-9 px-3 gap-1 rounded-[--btn-radius] text-sm font-medium transition-colors',
        'text-fg-muted hover:bg-[--btn-ghost-bg-hover]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <span aria-hidden>←</span>
      <span>Previous</span>
    </button>
  );
}

/* ----- Next ---------------------------------------------------------------- */

type PaginationNextProps = ComponentPropsWithRef<'button'>;

export function PaginationNext({
  className,
  ref,
  ...props
}: PaginationNextProps) {
  return (
    <button
      ref={ref}
      aria-label="Go to next page"
      className={cn(
        'inline-flex items-center justify-center h-9 px-3 gap-1 rounded-[--btn-radius] text-sm font-medium transition-colors',
        'text-fg-muted hover:bg-[--btn-ghost-bg-hover]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      <span>Next</span>
      <span aria-hidden>→</span>
    </button>
  );
}

/* ----- Ellipsis ------------------------------------------------------------ */

type PaginationEllipsisProps = ComponentPropsWithRef<'span'>;

export function PaginationEllipsis({
  className,
  ref,
  ...props
}: PaginationEllipsisProps) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={cn(
        'flex h-9 w-9 items-center justify-center text-fg-muted',
        className,
      )}
      {...props}
    >
      ...
    </span>
  );
}
