import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Textarea                                                           */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: 'text-xs px-2 py-1.5',
  md: 'text-sm px-3 py-2',
  lg: 'text-base px-4 py-3',
} as const;

type TextareaSize = keyof typeof SIZE_MAP;

interface TextareaProps extends Omit<
  ComponentPropsWithRef<'textarea'>,
  'size'
> {
  size?: TextareaSize;
  error?: boolean;
}

export function Textarea({
  size = 'md',
  error = false,
  className,
  ref,
  ...props
}: TextareaProps) {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full min-h-[80px] rounded-[--input-radius]',
        'bg-[--input-bg] text-[--input-fg] border border-[--input-border]',
        'placeholder:text-[--input-placeholder]',
        'transition-colors duration-[--motion-duration-normal]',
        'focus-visible:outline-none focus-visible:ring-[length:--focus-ring-width] focus-visible:ring-[--focus-ring-color] focus-visible:ring-offset-[length:--focus-ring-offset] focus-visible:ring-offset-[--surface-base]',
        'disabled:pointer-events-none disabled:opacity-40',
        'resize-y',
        error && 'border-[--input-border-error]',
        SIZE_MAP[size],
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}
