'use client';

import type { ComponentPropsWithRef, ElementType } from 'react';
import { cn } from '@/lib/utils';

type As = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'code';

type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';

type Weight = 'normal' | 'medium' | 'semibold' | 'bold';

type Color =
  | 'default'
  | 'muted'
  | 'subtle'
  | 'interactive'
  | 'danger'
  | 'success';

const DEFAULT_SIZE_MAP: Record<As, Size> = {
  h1: '3xl',
  h2: '2xl',
  h3: 'xl',
  h4: 'lg',
  p: 'base',
  span: 'base',
  label: 'base',
  code: 'sm',
};

const SIZE_CLASS_MAP: Record<Size, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const WEIGHT_CLASS_MAP: Record<Weight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const COLOR_CLASS_MAP: Record<Color, string> = {
  default: 'text-fg-default',
  muted: 'text-fg-muted',
  subtle: 'text-fg-subtle',
  interactive: 'text-interactive',
  danger: 'text-danger',
  success: 'text-success',
};

type TextProps<T extends As = 'p'> = {
  as?: T;
  size?: Size;
  weight?: Weight;
  color?: Color;
  className?: string;
} & Omit<ComponentPropsWithRef<T>, 'color'>;

export function Text<T extends As = 'p'>({
  as,
  size,
  weight,
  color = 'default',
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? 'p') as ElementType;
  const resolvedAs = as ?? 'p';
  const resolvedSize = size ?? DEFAULT_SIZE_MAP[resolvedAs];

  return (
    <Component
      className={cn(
        SIZE_CLASS_MAP[resolvedSize],
        weight && WEIGHT_CLASS_MAP[weight],
        COLOR_CLASS_MAP[color],
        resolvedAs === 'code' &&
          'font-mono bg-surface-inset px-1.5 py-0.5 rounded-sm',
        className,
      )}
      {...props}
    />
  );
}
