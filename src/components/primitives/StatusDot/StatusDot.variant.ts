import { cva, type VariantProps } from 'class-variance-authority';

export const statusDotVariants = cva('inline-block rounded-full', {
  variants: {
    status: {
      online: 'bg-[--color-success]',
      idle: 'bg-[--color-warning]',
      dnd: 'bg-[--color-danger]',
      offline: 'bg-fg-subtle',
    },
    size: {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    status: 'offline',
    size: 'md',
  },
});

export type StatusDotVariantProps = VariantProps<typeof statusDotVariants>;
