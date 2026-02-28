import * as TogglePrimitive from '@radix-ui/react-toggle';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cn } from '@/lib/utils';
import { toggleVariants } from './ToggleGroup.variant';
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
      className={cn(toggleVariants({ variant, size }), className)}
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
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}
