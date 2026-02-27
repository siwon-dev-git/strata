import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type Direction = 'row' | 'col';
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between';

interface StackProps extends ComponentPropsWithoutRef<'div'> {
  direction?: Direction;
  gap?: Gap;
  align?: Align;
  justify?: Justify;
  wrap?: boolean;
}

const directionMap: Record<Direction, string> = {
  row: 'flex-row',
  col: 'flex-col',
};

const gapMap: Record<Gap, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
};

const alignMap: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export function Stack({
  direction = 'col',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  children,
  ...rest
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        directionMap[direction],
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        wrap && 'flex-wrap',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
