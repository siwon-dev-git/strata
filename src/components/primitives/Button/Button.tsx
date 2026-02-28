'use client';

import type { ComponentPropsWithRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner/Spinner';
import {
  buttonVariants,
  SPINNER_SIZE_MAP,
  type ButtonVariantProps,
} from './Button.variant';

export interface ButtonProps
  extends ComponentPropsWithRef<'button'>, ButtonVariantProps {
  /** Shows a `Spinner` before children, disables the button, and sets `aria-busy`. */
  loading?: boolean;
  /** Delegates rendering to `@radix-ui/react-slot` for polymorphic composition (e.g. wrapping an `<a>`). */
  asChild?: boolean;
  /** Granular class overrides for internal sub-elements. */
  classNames?: {
    /** Classes applied to the loading spinner. */
    spinner?: string;
  };
}

export function Button({
  variant = 'solid',
  size = 'md',
  fullWidth = false,
  loading = false,
  asChild = false,
  disabled,
  className,
  classNames,
  children,
  ref,
  type = 'button',
  ...props
}: ButtonProps) {
  if (
    process.env.NODE_ENV !== 'production' &&
    size === 'icon' &&
    !props['aria-label'] &&
    !props['aria-labelledby']
  ) {
    console.warn(
      'Button: icon-only buttons require an aria-label or aria-labelledby attribute.',
    );
  }

  const Component = asChild ? Slot : 'button';

  return (
    <Component
      ref={ref}
      type={asChild ? undefined : type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      {...props}
    >
      {loading ? (
        <>
          <Spinner
            size={SPINNER_SIZE_MAP[size!]}
            className={cn('shrink-0', classNames?.spinner)}
          />
          {children}
        </>
      ) : (
        children
      )}
    </Component>
  );
}
