import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CodeProps extends ComponentPropsWithRef<'code'> {
  children: ReactNode;
}

export function Code({ children, className, ref, ...props }: CodeProps) {
  return (
    <code
      ref={ref}
      className={cn(
        'rounded bg-[--surface-inset] px-1.5 py-0.5 text-sm font-mono text-fg-default border border-[--border-subtle]',
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}
