import type { ComponentPropsWithRef } from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';

/** Button that opens the dropdown. Shows selected value and a chevron icon. */
export type SelectTriggerProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Trigger
>;

/** Portal-based dropdown panel. Default position is `popper` with fade animations. */
export type SelectContentProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Content
>;

/** Individual option with checkmark indicator. Supports `disabled` state. */
export type SelectItemProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Item
>;

/** Group label displayed inside the dropdown (non-selectable). */
export type SelectLabelProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Label
>;

/** Horizontal divider between option groups. */
export type SelectSeparatorProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Separator
>;
