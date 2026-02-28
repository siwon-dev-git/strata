'use client';

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const VARIANT_MAP = {
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: 'text-blue-500',
  },
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: 'text-green-500',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-500',
  },
  danger: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: 'text-red-500',
  },
} as const;

interface CalloutProps {
  variant?: keyof typeof VARIANT_MAP;
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({
  variant = 'info',
  icon,
  title,
  children,
  className,
}: CalloutProps) {
  const styles = VARIANT_MAP[variant];

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border p-4',
        styles.bg,
        styles.border,
        className,
      )}
    >
      {icon && (
        <span className={cn('shrink-0 mt-0.5', styles.icon)}>{icon}</span>
      )}
      <div className="flex-1">
        {title && <p className="font-semibold text-sm">{title}</p>}
        <div className={cn('text-sm text-fg-muted', title && 'mt-1')}>
          {children}
        </div>
      </div>
    </div>
  );
}
