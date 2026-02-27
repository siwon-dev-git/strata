import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ----- Breadcrumb (nav wrapper) ------------------------------------------ */

interface BreadcrumbProps extends ComponentPropsWithRef<'nav'> {
  children: ReactNode;
}

export function Breadcrumb({
  className,
  children,
  ref,
  ...props
}: BreadcrumbProps) {
  return (
    <nav ref={ref} aria-label="breadcrumb" className={cn(className)} {...props}>
      {children}
    </nav>
  );
}

/* ----- BreadcrumbList ---------------------------------------------------- */

interface BreadcrumbListProps extends ComponentPropsWithRef<'ol'> {
  children: ReactNode;
}

export function BreadcrumbList({
  className,
  children,
  ref,
  ...props
}: BreadcrumbListProps) {
  return (
    <ol
      ref={ref}
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    >
      {children}
    </ol>
  );
}

/* ----- BreadcrumbItem ---------------------------------------------------- */

interface BreadcrumbItemProps extends ComponentPropsWithRef<'li'> {
  children: ReactNode;
}

export function BreadcrumbItem({
  className,
  children,
  ref,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      ref={ref}
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    >
      {children}
    </li>
  );
}

/* ----- BreadcrumbLink ---------------------------------------------------- */

interface BreadcrumbLinkProps extends ComponentPropsWithRef<'a'> {
  children: ReactNode;
}

export function BreadcrumbLink({
  className,
  children,
  ref,
  ...props
}: BreadcrumbLinkProps) {
  return (
    <a
      ref={ref}
      className={cn(
        'text-sm text-fg-muted hover:text-fg-default',
        'transition-colors',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

/* ----- BreadcrumbSeparator ----------------------------------------------- */

interface BreadcrumbSeparatorProps extends ComponentPropsWithRef<'li'> {
  children?: ReactNode;
}

export function BreadcrumbSeparator({
  className,
  children,
  ref,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li
      ref={ref}
      role="presentation"
      aria-hidden="true"
      className={cn('text-fg-subtle', className)}
      {...props}
    >
      {children ?? (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 6" />
        </svg>
      )}
    </li>
  );
}

/* ----- BreadcrumbPage ---------------------------------------------------- */

interface BreadcrumbPageProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
}

export function BreadcrumbPage({
  className,
  children,
  ref,
  ...props
}: BreadcrumbPageProps) {
  return (
    <span
      ref={ref}
      role="link"
      aria-current="page"
      aria-disabled="true"
      className={cn('text-sm text-fg-default font-medium', className)}
      {...props}
    >
      {children}
    </span>
  );
}
