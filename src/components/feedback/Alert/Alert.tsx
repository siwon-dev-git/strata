import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const VARIANT_MAP = {
  info: 'border-[--border-interactive] bg-[--color-interactive-subtle] text-fg-default',
  success:
    'border-[--color-success] bg-[--color-success-subtle] text-fg-default',
  warning:
    'border-[--color-warning] bg-[--color-warning-subtle] text-fg-default',
  danger: 'border-[--color-danger] bg-[--color-danger-subtle] text-fg-default',
} as const;

type AlertVariant = keyof typeof VARIANT_MAP;

interface AlertProps extends ComponentPropsWithRef<'div'> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
}

export function Alert({
  variant = 'info',
  title,
  children,
  className,
  onDismiss,
  ref,
  ...props
}: AlertProps) {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-[--alert-radius] border-l-4 p-4',
        VARIANT_MAP[variant],
        className,
      )}
      {...props}
    >
      <div className="flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        <div className="text-sm">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-fg-muted hover:text-fg-default"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
