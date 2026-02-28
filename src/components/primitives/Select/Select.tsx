import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '@/lib/utils';
import type {
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectLabelProps,
  SelectSeparatorProps,
} from './Select.type';

/* ------------------------------------------------------------------ */
/*  Re-exports                                                         */
/* ------------------------------------------------------------------ */

export const SelectRoot = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;
export const SelectGroup = SelectPrimitive.Group;

/* ------------------------------------------------------------------ */
/*  SelectTrigger                                                      */
/* ------------------------------------------------------------------ */

export function SelectTrigger({
  className,
  children,
  ref,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-[--density-item-height] w-full items-center justify-between',
        'rounded-[--select-radius]',
        'border border-[--select-border] bg-[--select-bg] px-[--density-padding-x] text-sm text-[--select-fg]',
        'placeholder:text-[--select-placeholder]',
        'transition-colors duration-[--motion-duration-normal]',
        'focus:outline-none focus:ring-2 focus:ring-[--select-border-focus]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <svg
          className="h-4 w-4 opacity-50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/* ------------------------------------------------------------------ */
/*  SelectContent                                                      */
/* ------------------------------------------------------------------ */

export function SelectContent({
  className,
  children,
  ref,
  position = 'popper',
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          'bg-[--select-content-bg] border border-[--select-border]',
          'rounded-[--select-radius] shadow-md overflow-hidden p-1',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/* ------------------------------------------------------------------ */
/*  SelectItem                                                         */
/* ------------------------------------------------------------------ */

export function SelectItem({
  className,
  children,
  ref,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center',
        'rounded-sm px-2 py-1.5 text-sm',
        'outline-none focus:bg-[--select-item-hover]',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 12 10 18 20 6" />
          </svg>
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}

/* ------------------------------------------------------------------ */
/*  SelectLabel                                                        */
/* ------------------------------------------------------------------ */

export function SelectLabel({ className, ref, ...props }: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('px-2 py-1.5 text-xs font-medium text-fg-muted', className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  SelectSeparator                                                    */
/* ------------------------------------------------------------------ */

export function SelectSeparator({
  className,
  ref,
  ...props
}: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-[--select-border]', className)}
      {...props}
    />
  );
}
