'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TopBarProps {
  className?: string;
  children?: ReactNode;
}

export function TopBar({ className, children }: TopBarProps) {
  return (
    <header
      className={cn(
        'flex items-center h-[--topbar-height] px-4 gap-3 border-b border-[--topbar-border] bg-[--topbar-bg] shrink-0',
        className,
      )}
    >
      {children}
    </header>
  );
}
