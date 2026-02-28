import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** IDs exposed to render-prop children for ARIA linking. */
export interface FormFieldIds {
  inputId: string;
  descriptionId: string | undefined;
  errorId: string | undefined;
  /** Space-separated ID string for aria-describedby. */
  describedBy: string | undefined;
}

interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  /** Override the auto-generated input ID. */
  htmlFor?: string;
  /** Plain ReactNode or render-prop receiving auto-generated ARIA IDs. */
  children: ReactNode | ((ids: FormFieldIds) => ReactNode);
  className?: string;
}

export function FormField({
  label,
  description,
  error,
  required,
  htmlFor,
  children,
  className,
}: FormFieldProps) {
  const autoId = useId();
  const inputId = htmlFor ?? autoId;
  const descriptionId = description && !error ? `${inputId}-desc` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy =
    [descriptionId, errorId].filter(Boolean).join(' ') || undefined;

  const ids: FormFieldIds = { inputId, descriptionId, errorId, describedBy };

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-fg-default"
        >
          {label}
          {required && (
            <span className="ml-1 text-danger" aria-hidden="true">
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
      )}
      {typeof children === 'function' ? children(ids) : children}
      {description && !error && (
        <p id={descriptionId} className="text-xs text-fg-muted">
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
