import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';
import { VARIANT_MAP, SIZE_MAP } from './ToggleGroup.variant';
import type {
  ToggleProps,
  ToggleGroupRootProps,
  ToggleGroupItemProps,
} from './ToggleGroup.type';

/* ----- Toggle (single) -------------------------------------------------- */

export function Toggle({
  variant = 'default',
  size = 'md',
  className,
  children,
  ref,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-[--toggle-radius]',
        'font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive.Root>
  );
}

/* ----- ToggleGroupRoot --------------------------------------------------- */

export function ToggleGroupRoot({
  className,
  children,
  ref,
  ...props
}: ToggleGroupRootProps) {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

/* ----- ToggleGroupItem --------------------------------------------------- */

export function ToggleGroupItem({
  variant = 'default',
  size = 'md',
  className,
  children,
  ref,
  ...props
}: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-[--toggle-radius]',
        'font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
