import { cn } from '@/lib/utils';

const STATUS_MAP = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
} as const;

const SIZE_MAP = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
} as const;

interface StatusDotProps {
  status: keyof typeof STATUS_MAP;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusDot({ status, size = 'md', className }: StatusDotProps) {
  return (
    <span
      role="status"
      aria-label={status}
      className={cn(
        'inline-block rounded-full',
        STATUS_MAP[status],
        SIZE_MAP[size],
        className,
      )}
    />
  );
}
