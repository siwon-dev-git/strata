import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface BreadcrumbProps extends ComponentPropsWithRef<'nav'> {
  children: ReactNode;
}

export interface BreadcrumbListProps extends ComponentPropsWithRef<'ol'> {
  children: ReactNode;
}

export interface BreadcrumbItemProps extends ComponentPropsWithRef<'li'> {
  children: ReactNode;
}

export interface BreadcrumbLinkProps extends ComponentPropsWithRef<'a'> {
  children: ReactNode;
}

export interface BreadcrumbSeparatorProps extends ComponentPropsWithRef<'li'> {
  children?: ReactNode;
}

export interface BreadcrumbPageProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
}
