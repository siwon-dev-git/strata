export const VARIANT_MAP = {
  default: 'bg-surface-overlay text-fg-default',
  success: 'bg-[--color-success-subtle] text-success',
  warning: 'bg-[--color-warning-subtle] text-warning',
  danger: 'bg-[--color-danger-subtle] text-danger',
  interactive: 'bg-[--color-interactive-subtle] text-interactive',
} as const;

export const SIZE_MAP = {
  sm: 'text-[10px] px-1.5 py-0',
  md: 'text-xs px-2 py-0.5',
} as const;

export type BadgeVariant = keyof typeof VARIANT_MAP;
export type BadgeSize = keyof typeof SIZE_MAP;
