export const VARIANT_MAP = {
  default: [
    'bg-[--toggle-bg]',
    'hover:bg-[--toggle-active-bg]',
    'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
  ].join(' '),
  outline: [
    'bg-[--toggle-bg] border border-[--toggle-border]',
    'hover:bg-[--toggle-active-bg]',
    'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
  ].join(' '),
} as const;

export const SIZE_MAP = {
  sm: 'h-7 px-2 text-xs gap-1',
  md: 'h-9 px-3 text-sm gap-1.5',
  lg: 'h-11 px-4 text-base gap-2',
} as const;

export type ToggleVariant = keyof typeof VARIANT_MAP;
export type ToggleSize = keyof typeof SIZE_MAP;
