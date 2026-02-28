import type { ComponentPropsWithRef } from 'react';

export type CardVariant = 'default' | 'interactive';

export interface CardProps extends ComponentPropsWithRef<'div'> {
  variant?: CardVariant;
}
