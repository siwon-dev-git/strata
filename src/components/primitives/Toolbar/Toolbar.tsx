import * as RadixToolbar from '@radix-ui/react-toolbar';
import { cn } from '@/lib/utils';
import type {
  ToolbarRootProps,
  ToolbarButtonProps,
  ToolbarSeparatorProps,
  ToolbarToggleGroupProps,
  ToolbarToggleItemProps,
  ToolbarLinkProps,
} from './Toolbar.type';

/* ----- Root ---------------------------------------------------------------- */

export function ToolbarRoot({
  className,
  children,
  ref,
  ...props
}: ToolbarRootProps) {
  return (
    <RadixToolbar.Root
      ref={ref}
      className={cn(
        'flex items-center gap-1 rounded-md border border-[--menu-border] bg-[--menu-bg] p-1',
        className,
      )}
      {...props}
    >
      {children}
    </RadixToolbar.Root>
  );
}

/* ----- Button -------------------------------------------------------------- */

export function ToolbarButton({
  className,
  children,
  ref,
  ...props
}: ToolbarButtonProps) {
  return (
    <RadixToolbar.Button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-2.5 py-1.5 text-sm font-medium',
        'text-[--menu-item-fg] hover:bg-[--menu-item-hover]',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
    </RadixToolbar.Button>
  );
}

/* ----- Separator ----------------------------------------------------------- */

export function ToolbarSeparator({
  className,
  ref,
  ...props
}: ToolbarSeparatorProps) {
  return (
    <RadixToolbar.Separator
      ref={ref}
      className={cn('w-px h-5 bg-[--border-subtle] mx-1', className)}
      {...props}
    />
  );
}

/* ----- ToggleGroup --------------------------------------------------------- */

export function ToolbarToggleGroup({
  className,
  children,
  ref,
  ...props
}: ToolbarToggleGroupProps) {
  return (
    <RadixToolbar.ToggleGroup
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      {children}
    </RadixToolbar.ToggleGroup>
  );
}

/* ----- ToggleItem ---------------------------------------------------------- */

export function ToolbarToggleItem({
  className,
  children,
  ref,
  ...props
}: ToolbarToggleItemProps) {
  return (
    <RadixToolbar.ToggleItem
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-2.5 py-1.5 text-sm font-medium',
        'text-[--menu-item-fg] hover:bg-[--menu-item-hover]',
        'data-[state=on]:bg-[--toggle-active-bg] data-[state=on]:text-[--toggle-active-fg]',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      {...props}
    >
      {children}
    </RadixToolbar.ToggleItem>
  );
}

/* ----- Link ---------------------------------------------------------------- */

export function ToolbarLink({
  className,
  children,
  ref,
  ...props
}: ToolbarLinkProps) {
  return (
    <RadixToolbar.Link
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-sm px-2.5 py-1.5 text-sm font-medium',
        'text-[--menu-item-fg] hover:bg-[--menu-item-hover]',
        'transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--border-interactive]',
        className,
      )}
      {...props}
    >
      {children}
    </RadixToolbar.Link>
  );
}
