import { cn } from '@/lib/utils';

const SIZE_MAP = {
  sm: 'h-6 w-6 text-xs',
  md: 'h-8 w-8 text-sm',
  lg: 'h-10 w-10 text-base',
} as const;

interface AvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
  return (first + last).toUpperCase();
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  className,
}: AvatarProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center overflow-hidden rounded-[--avatar-radius]',
        SIZE_MAP[size],
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center bg-[--avatar-bg] text-[--avatar-fg] font-medium select-none"
          aria-label={alt}
        >
          {getInitials(name)}
        </span>
      )}
    </span>
  );
}
