import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center font-medium',
    'rounded-[--btn-radius]',
    'transition-colors duration-[--motion-duration-normal]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        solid:
          'bg-[--btn-solid-bg] text-[--btn-solid-fg] hover:bg-[--btn-solid-bg-hover]',
        ghost:
          'bg-transparent text-[--btn-ghost-fg] hover:bg-[--btn-ghost-bg-hover]',
        outline:
          'border border-[--btn-outline-border] bg-transparent text-fg-default hover:bg-[--btn-outline-hover]',
        danger:
          'bg-[--btn-danger-bg] text-[--btn-danger-fg] hover:bg-[--btn-danger-bg-hover]',
      },
      size: {
        sm: 'h-7 px-3 text-xs gap-1.5',
        md: 'h-[--density-item-height] px-[--density-padding-x] text-sm gap-[--density-gap]',
        lg: 'h-11 px-5 text-base gap-2.5',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  },
);

export const SPINNER_SIZE_MAP = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
} as const;

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
