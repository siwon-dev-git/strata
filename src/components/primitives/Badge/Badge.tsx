import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import {
  VARIANT_MAP,
  SIZE_MAP,
  type BadgeVariant,
  type BadgeSize,
} from './Badge.variant';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
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
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-[--badge-radius]',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
