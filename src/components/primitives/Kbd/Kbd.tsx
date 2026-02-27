import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface KbdProps extends ComponentPropsWithRef<'kbd'> {
  children: ReactNode;
}

export function Kbd({ children, className, ref, ...props }: KbdProps) {
  return (
    <kbd
      ref={ref}
      className={cn(
        'inline-flex items-center gap-0.5 rounded border border-[--border-default] bg-[--surface-raised] px-1.5 py-0.5 text-[10px] font-mono font-medium text-fg-muted shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}
