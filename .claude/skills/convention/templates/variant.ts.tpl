// {ComponentName}.variant.ts
// Tier 1+ — style variant maps and derived types

export const VARIANT_MAP = {
  // {variant}: '{tailwind classes}',
} as const;

export const SIZE_MAP = {
  // sm: '{tailwind classes}',
  // md: '{tailwind classes}',
  // lg: '{tailwind classes}',
} as const;

export type {ComponentName}Variant = keyof typeof VARIANT_MAP;
export type {ComponentName}Size = keyof typeof SIZE_MAP;
