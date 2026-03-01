'use client';

import { cn } from '@/lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  className,
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px self-stretch',
        'bg-border-subtle',
        className,
      )}
    />
  );
}
