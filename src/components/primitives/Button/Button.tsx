import type { ComponentPropsWithRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner/Spinner';
import {
  VARIANT_MAP,
  SIZE_MAP,
  SPINNER_SIZE_MAP,
  type ButtonVariant,
  type ButtonSize,
} from './Button.variant';

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
