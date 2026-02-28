'use client';

import * as RadixContextMenu from '@radix-ui/react-context-menu';
import { cn } from '@/lib/utils';
import type {
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
} from './ContextMenu.type';

/* ----- Root / Trigger ---------------------------------------------------- */

export const ContextMenuRoot = RadixContextMenu.Root;
export const ContextMenuTrigger = RadixContextMenu.Trigger;

/* ----- Content ----------------------------------------------------------- */

export function ContextMenuContent({
  className,
  children,
  ref,
  ...props
}: ContextMenuContentProps) {
  return (
    <RadixContextMenu.Portal>
      <RadixContextMenu.Content
        ref={ref}
        className={cn(
          'z-[--elevation-dropdown] min-w-45',
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
      </RadixContextMenu.Content>
    </RadixContextMenu.Portal>
  );
}

/* ----- Item -------------------------------------------------------------- */

export function ContextMenuItem({
  className,
  icon,
  shortcut,
  children,
  ref,
  ...props
}: ContextMenuItemProps) {
  return (
    <RadixContextMenu.Item
      ref={ref}
      className={cn(
        'flex items-center gap-2 rounded-sm px-2.5 py-1.5',
        'text-sm text-[--menu-item-fg] cursor-pointer outline-none transition-colors',
        'focus:bg-[--menu-item-hover]',
        'data-highlighted:bg-[--menu-item-hover]',
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
    </RadixContextMenu.Item>
  );
}

/* ----- Separator --------------------------------------------------------- */

export function ContextMenuSeparator({
  className,
  ref,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <RadixContextMenu.Separator
      ref={ref}
      className={cn('h-px my-1 bg-[--border-subtle]', className)}
      {...props}
    />
  );
}

/* ----- Label ------------------------------------------------------------- */

export function ContextMenuLabel({
  className,
  children,
  ref,
  ...props
}: ContextMenuLabelProps) {
  return (
    <RadixContextMenu.Label
      ref={ref}
      className={cn(
        'px-2.5 py-1 text-xs font-semibold text-fg-subtle',
        className,
      )}
      {...props}
    >
      {children}
    </RadixContextMenu.Label>
  );
}
