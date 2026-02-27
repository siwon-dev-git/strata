import type { ComponentPropsWithRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner/Spinner';

const VARIANT_MAP = {
  solid: [
    'bg-[--btn-solid-bg] text-[--btn-solid-fg]',
    'hover:bg-[--btn-solid-bg-hover]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[--btn-ghost-fg]',
    'hover:bg-[--btn-ghost-bg-hover]',
  ].join(' '),
  outline: [
    'border border-[--btn-outline-border] bg-transparent text-fg-default',
    'hover:bg-[--btn-outline-hover]',
  ].join(' '),
  danger: [
    'bg-[--btn-danger-bg] text-[--btn-danger-fg]',
    'hover:bg-[--btn-danger-bg-hover]',
  ].join(' '),
} as const;

const SIZE_MAP = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2.5',
} as const;

const SPINNER_SIZE_MAP = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
} as const;

type ButtonVariant = keyof typeof VARIANT_MAP;
type ButtonSize = keyof typeof SIZE_MAP;

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
}

export function Button({
  variant = 'solid',
  size = 'md',
  loading = false,
  asChild = false,
  disabled,
  className,
  children,
  ref,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'rounded-[--btn-radius]',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={SPINNER_SIZE_MAP[size]} className="shrink-0" />
          {children}
        </>
      ) : (
        children
      )}
    </Component>
  );
}
