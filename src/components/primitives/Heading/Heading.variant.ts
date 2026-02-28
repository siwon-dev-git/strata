import { cva, type VariantProps } from 'class-variance-authority';

export const headingVariants = cva('text-fg-default tracking-tight', {
  variants: {
    level: {
      1: 'text-[length:--type-display] font-bold',
      2: 'text-[length:--type-title] font-semibold',
      3: 'text-[length:--type-heading] font-semibold',
      4: 'text-[length:--type-body] font-medium',
      5: 'text-[length:--type-label] font-medium',
      6: 'text-[length:--type-caption] font-medium',
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export type HeadingVariantProps = VariantProps<typeof headingVariants>;
