import { cva, type VariantProps } from 'class-variance-authority';

export const toggleVariants = cva(
  [
    'inline-flex items-center justify-center rounded-[--toggle-radius]',
    'font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
    'disabled:pointer-events-none disabled:opacity-40',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-[--toggle-bg]',
          'hover:bg-[--toggle-active-bg]',
          'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
        ],
        outline: [
          'bg-[--toggle-bg] border border-[--toggle-border]',
          'hover:bg-[--toggle-active-bg]',
          'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
        ],
      },
      size: {
        sm: 'h-7 px-2 text-xs gap-1',
        md: 'h-9 px-3 text-sm gap-1.5',
        lg: 'h-11 px-4 text-base gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export type ToggleVariant = VariantProps<typeof toggleVariants>['variant'];
export type ToggleSize = VariantProps<typeof toggleVariants>['size'];
export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
