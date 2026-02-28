export const VARIANT_MAP = {
  solid: [
    'bg-[--btn-solid-bg] text-[--btn-solid-fg]',
    'hover:bg-[--btn-solid-bg-hover]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[--btn-ghost-fg]',
    'hover:bg-[--btn-ghost-bg-hover]',
  ].join(' '),
  outline: [
    'border border-[--btn-outline-border] bg-transparent text-fg-default',
    'hover:bg-[--btn-outline-hover]',
  ].join(' '),
  danger: [
    'bg-[--btn-danger-bg] text-[--btn-danger-fg]',
    'hover:bg-[--btn-danger-bg-hover]',
  ].join(' '),
} as const;

export const SIZE_MAP = {
  sm: 'h-7 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-base gap-2.5',
} as const;

export const SPINNER_SIZE_MAP = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
} as const;

export type ButtonVariant = keyof typeof VARIANT_MAP;
export type ButtonSize = keyof typeof SIZE_MAP;
