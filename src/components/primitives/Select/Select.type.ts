import type { ComponentPropsWithRef } from 'react';
import type * as SelectPrimitive from '@radix-ui/react-select';

export type SelectTriggerProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Trigger
>;

export type SelectContentProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Content
>;

export type SelectItemProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Item
>;

export type SelectLabelProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Label
>;

export type SelectSeparatorProps = ComponentPropsWithRef<
  typeof SelectPrimitive.Separator
>;
