import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    'relative inline-flex items-center justify-center font-medium',
    'rounded-[--btn-radius]',
    'transition-colors duration-[--motion-duration-normal]',
    'active:duration-[--motion-duration-fast]',
    'focus-visible:outline-none focus-visible:ring-[length:--btn-focus-ring-width] focus-visible:ring-[--btn-focus-ring-color] focus-visible:ring-offset-[length:--btn-focus-ring-offset] focus-visible:ring-offset-[--surface-base]',
    'disabled:pointer-events-none disabled:opacity-[--btn-disabled-opacity]',
    'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:min-h-[--btn-touch-target] before:min-w-[--btn-touch-target]',
  ],
  {
    variants: {
      variant: {
        solid:
          'bg-[--btn-solid-bg] text-[--btn-solid-fg] hover:bg-[--btn-solid-bg-hover] active:bg-[--btn-solid-bg-active]',
        ghost:
          'bg-transparent text-[--btn-ghost-fg] hover:bg-[--btn-ghost-bg-hover] active:bg-[--btn-ghost-bg-active]',
        outline:
          'border border-[--btn-outline-border] bg-transparent text-[--fg-default] hover:bg-[--btn-outline-hover] active:bg-[--btn-outline-bg-active]',
        danger:
          'bg-[--btn-danger-bg] text-[--btn-danger-fg] hover:bg-[--btn-danger-bg-hover] active:bg-[--btn-danger-bg-active]',
      },
      size: {
        sm: 'h-7 px-3 text-xs gap-1.5',
        md: 'h-[--density-item-height] px-[--density-padding-x] text-sm gap-[--density-gap]',
        lg: 'h-11 px-5 text-base gap-2.5',
        icon: 'h-[--density-item-height] w-[--density-item-height] p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      fullWidth: false,
    },
  },
);

export const SPINNER_SIZE_MAP: Record<string, 'sm' | 'md'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  icon: 'sm',
};

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
