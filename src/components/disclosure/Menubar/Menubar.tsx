import * as RadixMenubar from '@radix-ui/react-menubar';
import { cn } from '@/lib/utils';
import type {
  MenubarRootProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
  MenubarLabelProps,
} from './Menubar.type';

/* ----- Root -------------------------------------------------------------- */

export function MenubarRoot({
  className,
  children,
  ref,
  ...props
}: MenubarRootProps) {
  return (
    <RadixMenubar.Root
      ref={ref}
      className={cn(
        'flex items-center gap-1 rounded-md border border-[--menu-border] bg-[--menu-bg] p-1',
        className,
      )}
      {...props}
    >
      {children}
    </RadixMenubar.Root>
  );
}

/* ----- Menu -------------------------------------------------------------- */

export const MenubarMenu = RadixMenubar.Menu;

/* ----- Trigger ----------------------------------------------------------- */

export function MenubarTrigger({
  className,
  children,
  ref,
  ...props
}: MenubarTriggerProps) {
  return (
    <RadixMenubar.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-sm px-2.5 py-1 text-sm font-medium',
        'text-[--menu-item-fg] cursor-pointer outline-none',
        'hover:bg-[--menu-item-hover] data-[state=open]:bg-[--menu-item-hover]',
        className,
      )}
      {...props}
    >
      {children}
    </RadixMenubar.Trigger>
  );
}

/* ----- Content ----------------------------------------------------------- */

export function MenubarContent({
  className,
  children,
  ref,
  ...props
}: MenubarContentProps) {
  return (
    <RadixMenubar.Portal>
      <RadixMenubar.Content
        ref={ref}
        sideOffset={4}
        align="start"
        className={cn(
          'z-[--elevation-dropdown] min-w-[180px]',
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
      </RadixMenubar.Content>
    </RadixMenubar.Portal>
  );
}

/* ----- Item -------------------------------------------------------------- */

export function MenubarItem({
  className,
  icon,
  shortcut,
  children,
  ref,
  ...props
}: MenubarItemProps) {
  return (
    <RadixMenubar.Item
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
    </RadixMenubar.Item>
  );
}

/* ----- Separator --------------------------------------------------------- */

export function MenubarSeparator({
  className,
  ref,
  ...props
}: MenubarSeparatorProps) {
  return (
    <RadixMenubar.Separator
      ref={ref}
      className={cn('h-px my-1 bg-[--border-subtle]', className)}
      {...props}
    />
  );
}

/* ----- Label ------------------------------------------------------------- */

export function MenubarLabel({
  className,
  children,
  ref,
  ...props
}: MenubarLabelProps) {
  return (
    <RadixMenubar.Label
      ref={ref}
      className={cn(
        'px-2.5 py-1 text-xs font-semibold text-fg-subtle',
        className,
      )}
      {...props}
    >
      {children}
    </RadixMenubar.Label>
  );
}
