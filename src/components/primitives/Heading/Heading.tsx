'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { headingVariants } from './Heading.variant';

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
    <Component ref={ref} className={cn(headingVariants({ level }), className)}>
      {children}
    </Component>
  );
}
