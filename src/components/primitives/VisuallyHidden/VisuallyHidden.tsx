'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
}

export function VisuallyHidden({
  children,
  className,
  ref,
  ...props
}: VisuallyHiddenProps) {
  return (
    <span
      ref={ref}
      className={cn(
        'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
