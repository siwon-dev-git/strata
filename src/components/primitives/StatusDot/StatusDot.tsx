import { cn } from '@/lib/utils';
import { STATUS_MAP, SIZE_MAP } from './StatusDot.variant';

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
