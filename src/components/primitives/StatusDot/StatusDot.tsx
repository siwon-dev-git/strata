'use client';

import { cn } from '@/lib/utils';
import {
  statusDotVariants,
  type StatusDotVariantProps,
} from './StatusDot.variant';

interface StatusDotProps extends StatusDotVariantProps {
  status: NonNullable<StatusDotVariantProps['status']>;
  className?: string;
}

export function StatusDot({ status, size = 'md', className }: StatusDotProps) {
  return (
    <span
      role="status"
      aria-label={status}
      className={cn(statusDotVariants({ status, size }), className)}
    />
  );
}
