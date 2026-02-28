import type React from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as TogglePrimitive from '@radix-ui/react-toggle';
import type * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import type { ToggleVariant, ToggleSize } from './ToggleGroup.variant';

export interface ToggleProps extends ComponentPropsWithRef<
  typeof TogglePrimitive.Root
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: ReactNode;
}

export type ToggleGroupRootProps = React.ComponentProps<
  typeof ToggleGroupPrimitive.Root
> & {
  ref?: React.Ref<HTMLDivElement>;
};

export interface ToggleGroupItemProps extends ComponentPropsWithRef<
  typeof ToggleGroupPrimitive.Item
> {
  variant?: ToggleVariant;
  size?: ToggleSize;
  children: ReactNode;
}
