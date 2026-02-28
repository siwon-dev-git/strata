import type { ComponentPropsWithRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from '../Spinner/Spinner';
import {
  buttonVariants,
  SPINNER_SIZE_MAP,
  type ButtonVariantProps,
} from './Button.variant';

interface ButtonProps
  extends ComponentPropsWithRef<'button'>, ButtonVariantProps {
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
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={SPINNER_SIZE_MAP[size!]} className="shrink-0" />
          {children}
        </>
      ) : (
        children
      )}
    </Component>
  );
}
