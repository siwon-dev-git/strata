import type React from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixToolbar from '@radix-ui/react-toolbar';
import { cn } from '@/lib/utils';

/* ----- Root ---------------------------------------------------------------- */

interface ToolbarRootProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Root
> {
  children: ReactNode;
}

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

interface ToolbarButtonProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Button
> {
  children: ReactNode;
}

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

type ToolbarSeparatorProps = ComponentPropsWithRef<
  typeof RadixToolbar.Separator
>;

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

type ToolbarToggleGroupProps = React.ComponentProps<
  typeof RadixToolbar.ToggleGroup
> & {
  ref?: React.Ref<HTMLDivElement>;
};

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

interface ToolbarToggleItemProps extends ComponentPropsWithRef<
  typeof RadixToolbar.ToggleItem
> {
  children: ReactNode;
}

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

interface ToolbarLinkProps extends ComponentPropsWithRef<
  typeof RadixToolbar.Link
> {
  children: ReactNode;
}

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
