import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
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
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-fg-default"
        >
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </label>
      )}
      {children}
      {description && !error && (
        <p className="text-xs text-fg-muted">{description}</p>
      )}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
