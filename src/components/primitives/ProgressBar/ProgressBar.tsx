import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const SIZE_MAP = {
  sm: 'h-1.5',
  md: 'h-2',
} as const;

type ProgressBarSize = keyof typeof SIZE_MAP;

interface ProgressBarProps {
  value?: number;
  max?: number;
  size?: ProgressBarSize;
  className?: string;
}

export function ProgressBar({
  value = 0,
  max = 100,
  size = 'md',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      className={cn(
        'relative w-full overflow-hidden rounded-full',
        'bg-[--progress-track]',
        SIZE_MAP[size],
        className,
      )}
    >
      <ProgressPrimitive.Indicator
        className="h-full rounded-full bg-[--progress-bar] transition-transform duration-[--motion-duration-slow]"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
