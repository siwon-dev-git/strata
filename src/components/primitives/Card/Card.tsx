'use client';

import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardVariant, CardProps } from './Card.type';

const VARIANT_MAP: Record<CardVariant, string> = {
  default: [
    'bg-[--card-bg] border border-[--card-border] rounded-[--card-radius]',
  ].join(' '),
  interactive: [
    'bg-[--card-bg] border border-[--card-border] rounded-[--card-radius]',
    'hover:bg-[--card-bg-hover] hover:border-[--card-border-hover]',
    'cursor-pointer transition-colors duration-[--motion-duration-normal]',
  ].join(' '),
};

export function Card({
  variant = 'default',
  className,
  children,
  ref,
  ...props
}: CardProps) {
  return (
    <div ref={ref} className={cn(VARIANT_MAP[variant], className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardHeader                                                         */
/* ------------------------------------------------------------------ */

export function CardHeader({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div ref={ref} className={cn('px-4 pt-4 pb-0', className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardBody                                                           */
/* ------------------------------------------------------------------ */

export function CardBody({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div ref={ref} className={cn('p-4', className)} {...props}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CardFooter                                                         */
/* ------------------------------------------------------------------ */

export function CardFooter({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return (
    <div ref={ref} className={cn('px-4 pb-4 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
