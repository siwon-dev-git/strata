'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Input                                                              */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: 'h-7 text-xs px-2',
  md: 'h-[--density-item-height] text-sm px-[--density-padding-x]',
  lg: 'h-11 text-base px-4',
} as const;

type InputSize = keyof typeof SIZE_MAP;

interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  /** Input height variant: `sm` (28px), `md` (density-aware, default), `lg` (44px). */
  size?: InputSize;
  /** Applies error border (`--input-border-error`) and sets `aria-invalid`. */
  error?: boolean;
  /** Called when Enter is pressed (without Shift). Convenience for chat/search inputs. */
  onPressEnter?: () => void;
}

export function Input({
  size = 'md',
  error = false,
  onPressEnter,
  onKeyDown,
  className,
  ref,
  ...props
}: InputProps) {
  const handleKeyDown = onPressEnter
    ? (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onPressEnter();
        }
        onKeyDown?.(e);
      }
    : onKeyDown;

  return (
    <input
      ref={ref}
      onKeyDown={handleKeyDown}
      className={cn(
        'w-full rounded-[--input-radius]',
        'bg-[--input-bg] text-[--input-fg] border border-[--input-border]',
        'placeholder:text-[--input-placeholder]',
        'transition-colors duration-[--motion-duration-normal]',
        'focus-visible:outline-none focus-visible:ring-[length:--focus-ring-width] focus-visible:ring-[--focus-ring-color] focus-visible:ring-offset-[length:--focus-ring-offset] focus-visible:ring-offset-[--surface-base]',
        'disabled:pointer-events-none disabled:opacity-40',
        error && 'border-[--input-border-error]',
        SIZE_MAP[size],
        className,
      )}
      aria-invalid={error || undefined}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  InputGroup                                                         */
/* ------------------------------------------------------------------ */

interface InputGroupProps {
  children: ReactNode;
  /** Absolutely-positioned left adornment (icon, label). Non-interactive (`pointer-events-none`). */
  prefix?: ReactNode;
  /** Absolutely-positioned right adornment (icon, label). Non-interactive (`pointer-events-none`). */
  suffix?: ReactNode;
  className?: string;
}

export function InputGroup({
  children,
  prefix,
  suffix,
  className,
}: InputGroupProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      {prefix && (
        <span className="pointer-events-none absolute left-3 flex items-center text-fg-muted">
          {prefix}
        </span>
      )}
      {children}
      {suffix && (
        <span className="pointer-events-none absolute right-3 flex items-center text-fg-muted">
          {suffix}
        </span>
      )}
    </div>
  );
}
