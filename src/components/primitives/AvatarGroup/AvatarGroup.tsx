import { Children, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  AvatarGroup                                                        */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
} as const;

type AvatarGroupSize = keyof typeof SIZE_MAP;

interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  size?: AvatarGroupSize;
  className?: string;
}

export function AvatarGroup({
  children,
  max,
  size = 'md',
  className,
}: AvatarGroupProps) {
  const items = Children.toArray(children);
  const visible =
    max != null && items.length > max ? items.slice(0, max) : items;
  const overflow = max != null ? items.length - visible.length : 0;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visible.map((child, i) => (
        <div key={i} className="ring-2 ring-[--surface-default] rounded-full">
          {child}
        </div>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'bg-[--avatar-bg] text-[--avatar-fg] font-medium select-none',
            'ring-2 ring-[--surface-default]',
            SIZE_MAP[size],
          )}
          aria-label={`${overflow} more`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
