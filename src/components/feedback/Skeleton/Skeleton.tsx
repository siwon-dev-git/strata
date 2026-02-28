'use client';

import { cn } from '@/lib/utils';

const VARIANT_MAP = {
  text: 'h-4 w-full rounded',
  circle: 'rounded-full',
  rect: 'rounded-md',
} as const;

type SkeletonVariant = keyof typeof VARIANT_MAP;

interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[--skeleton-bg]',
        VARIANT_MAP[variant],
        className,
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
