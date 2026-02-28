import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva('text-fg-default tracking-tight', {
  variants: {
    level: {
      1: 'text-3xl font-bold',
      2: 'text-2xl font-semibold',
      3: 'text-xl font-semibold',
      4: 'text-lg font-medium',
      5: 'text-base font-medium',
      6: 'text-sm font-medium',
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
