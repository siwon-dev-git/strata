import type { ComponentPropsWithRef, ReactNode } from 'react';
import type * as RadixTooltip from '@radix-ui/react-tooltip';

export interface TooltipContentProps extends ComponentPropsWithRef<
  typeof RadixTooltip.Content
> {
  children: ReactNode;
}

export interface SimpleTooltipProps {
  content: string;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
}
