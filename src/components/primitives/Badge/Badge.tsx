'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { badgeVariants, type BadgeVariantProps } from './Badge.variant';

interface BadgeProps extends BadgeVariantProps {
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {children}
    </span>
  );
}
