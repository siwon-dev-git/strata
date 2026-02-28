import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface PaginationRootProps extends ComponentPropsWithRef<'nav'> {
  children: ReactNode;
}

export interface PaginationContentProps extends ComponentPropsWithRef<'ul'> {
  children: ReactNode;
}

export interface PaginationItemProps extends ComponentPropsWithRef<'li'> {
  children: ReactNode;
}

export interface PaginationLinkProps extends ComponentPropsWithRef<'button'> {
  isActive?: boolean;
  children: ReactNode;
}

export type PaginationPreviousProps = ComponentPropsWithRef<'button'>;

export type PaginationNextProps = ComponentPropsWithRef<'button'>;

export type PaginationEllipsisProps = ComponentPropsWithRef<'span'>;
