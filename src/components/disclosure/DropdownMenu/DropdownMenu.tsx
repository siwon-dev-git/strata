import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

/* ----- Root / Trigger ---------------------------------------------------- */

export const DropdownMenuRoot = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;

/* ----- Content ----------------------------------------------------------- */

interface DropdownMenuContentProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Content
> {
  children: ReactNode;
}

export function DropdownMenuContent({
  className,
  children,
  ref,
  ...props
}: DropdownMenuContentProps) {
  return (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        ref={ref}
        sideOffset={4}
        className={cn(
          'z-50 min-w-[180px]',
          'rounded-[--menu-radius] bg-[--menu-bg] border border-[--menu-border] shadow-[--menu-shadow]',
          'p-1',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2',
          className,
        )}
        {...props}
      >
        {children}
      </RadixDropdownMenu.Content>
    </RadixDropdownMenu.Portal>
  );
}

/* ----- Item -------------------------------------------------------------- */

interface DropdownMenuItemProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Item
> {
  icon?: ReactNode;
  shortcut?: string;
  children: ReactNode;
}

export function DropdownMenuItem({
  className,
  icon,
  shortcut,
  children,
  ref,
  ...props
}: DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-sm px-2.5 py-1.5',
        'text-sm text-[--menu-item-fg] cursor-pointer outline-none transition-colors',
        'focus:bg-[--menu-item-hover]',
        'data-[highlighted]:bg-[--menu-item-hover]',
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0 size-4">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="ml-auto text-xs text-fg-subtle tracking-widest">
          {shortcut}
        </span>
      )}
    </RadixDropdownMenu.Item>
  );
}

/* ----- Separator --------------------------------------------------------- */

type DropdownMenuSeparatorProps = ComponentPropsWithRef<
  typeof RadixDropdownMenu.Separator
>;

export function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <RadixDropdownMenu.Separator
      ref={ref}
      className={cn('h-px my-1 bg-[--border-subtle]', className)}
      {...props}
    />
  );
}

/* ----- Label ------------------------------------------------------------- */

interface DropdownMenuLabelProps extends ComponentPropsWithRef<
  typeof RadixDropdownMenu.Label
> {
  children: ReactNode;
}

export function DropdownMenuLabel({
  className,
  children,
  ref,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <RadixDropdownMenu.Label
      ref={ref}
      className={cn(
        'px-2.5 py-1 text-xs font-semibold text-fg-subtle',
        className,
      )}
      {...props}
    >
      {children}
    </RadixDropdownMenu.Label>
  );
}
