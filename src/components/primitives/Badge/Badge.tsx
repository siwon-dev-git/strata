import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const VARIANT_MAP = {
  default: 'bg-surface-overlay text-fg-default',
  success: 'bg-[--color-success-subtle] text-success',
  warning: 'bg-[--color-warning-subtle] text-warning',
  danger: 'bg-[--color-danger-subtle] text-danger',
  interactive: 'bg-[--color-interactive-subtle] text-interactive',
} as const;

const SIZE_MAP = {
  sm: 'text-[10px] px-1.5 py-0',
  md: 'text-xs px-2 py-0.5',
} as const;

type BadgeVariant = keyof typeof VARIANT_MAP;
type BadgeSize = keyof typeof SIZE_MAP;

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
