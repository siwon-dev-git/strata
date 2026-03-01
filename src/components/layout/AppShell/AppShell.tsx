'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface AppShellProps {
  className?: string;
  children?: ReactNode;
}

export function AppShell({ className, children }: AppShellProps) {
  return (
    <div className={cn('flex h-screen w-screen overflow-hidden', className)}>
      {children}
    </div>
  );
}
