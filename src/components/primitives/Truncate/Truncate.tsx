'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TruncateProps {
  children: ReactNode;
  maxLines?: number;
  className?: string;
}

export function Truncate({ children, maxLines = 1, className }: TruncateProps) {
  if (maxLines === 1) {
    return <span className={cn('truncate block', className)}>{children}</span>;
  }

  return (
    <span
      className={cn('overflow-hidden block', className)}
      style={{
        display: '-webkit-box',
        WebkitLineClamp: maxLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </span>
  );
}
