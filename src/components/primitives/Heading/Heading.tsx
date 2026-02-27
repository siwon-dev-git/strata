import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const LEVEL_MAP = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-semibold',
  3: 'text-xl font-semibold',
  4: 'text-lg font-medium',
  5: 'text-base font-medium',
  6: 'text-sm font-medium',
} as const;

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: ReactNode;
  className?: string;
  ref?: React.Ref<HTMLHeadingElement>;
}

export function Heading({
  level = 2,
  as,
  children,
  className,
  ref,
}: HeadingProps) {
  const Component = as ?? (`h${level}` as const);

  return (
    <Component
      ref={ref}
      className={cn(
        'text-fg-default tracking-tight',
        LEVEL_MAP[level],
        className,
      )}
    >
      {children}
    </Component>
  );
}
