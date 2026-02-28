import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center font-medium rounded-[--badge-radius]',
  {
    variants: {
      variant: {
        default: 'bg-surface-overlay text-fg-default',
        success: 'bg-[--color-success-subtle] text-success',
        warning: 'bg-[--color-warning-subtle] text-warning',
        danger: 'bg-[--color-danger-subtle] text-danger',
        interactive: 'bg-[--color-interactive-subtle] text-interactive',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0',
        md: 'text-xs px-2 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
