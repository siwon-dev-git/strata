import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import { cn } from '@/lib/utils';

/* ----- Root -------------------------------------------------------------- */

interface NavigationMenuRootProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Root
> {
  children: ReactNode;
}

export function NavigationMenuRoot({
  className,
  children,
  ref,
  ...props
}: NavigationMenuRootProps) {
  return (
    <RadixNavigationMenu.Root
      ref={ref}
      className={cn('relative z-10 flex items-center', className)}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Root>
  );
}

/* ----- List -------------------------------------------------------------- */

interface NavigationMenuListProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.List
> {
  children: ReactNode;
}

export function NavigationMenuList({
  className,
  children,
  ref,
  ...props
}: NavigationMenuListProps) {
  return (
    <RadixNavigationMenu.List
      ref={ref}
      className={cn('flex items-center gap-1 list-none', className)}
      {...props}
    >
      {children}
    </RadixNavigationMenu.List>
  );
}

/* ----- Item -------------------------------------------------------------- */

export const NavigationMenuItem = RadixNavigationMenu.Item;

/* ----- Trigger ----------------------------------------------------------- */

interface NavigationMenuTriggerProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Trigger
> {
  children: ReactNode;
}

export function NavigationMenuTrigger({
  className,
  children,
  ref,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <RadixNavigationMenu.Trigger
      ref={ref}
      className={cn(
        'group inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium',
        'text-fg-default hover:bg-[--menu-item-hover] transition-colors',
        className,
      )}
      {...props}
    >
      {children}
      {/* Chevron — rotates on open */}
      <svg
        aria-hidden
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="relative top-px transition-transform duration-200 data-[state=open]:rotate-180 group-data-[state=open]:rotate-180"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </RadixNavigationMenu.Trigger>
  );
}

/* ----- Content ----------------------------------------------------------- */

interface NavigationMenuContentProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Content
> {
  children: ReactNode;
}

export function NavigationMenuContent({
  className,
  children,
  ref,
  ...props
}: NavigationMenuContentProps) {
  return (
    <RadixNavigationMenu.Content
      ref={ref}
      className={cn(
        'absolute top-full left-0 w-max',
        'rounded-[--menu-radius] bg-[--menu-bg] border border-[--menu-border] shadow-[--menu-shadow]',
        'p-2',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        'data-[state=open]:slide-in-from-top-2',
        className,
      )}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Content>
  );
}

/* ----- Link -------------------------------------------------------------- */

interface NavigationMenuLinkProps extends ComponentPropsWithRef<
  typeof RadixNavigationMenu.Link
> {
  children: ReactNode;
}

export function NavigationMenuLink({
  className,
  children,
  ref,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <RadixNavigationMenu.Link
      ref={ref}
      className={cn(
        'block rounded-sm px-3 py-2 text-sm text-[--menu-item-fg]',
        'hover:bg-[--menu-item-hover] transition-colors no-underline',
        className,
      )}
      {...props}
    >
      {children}
    </RadixNavigationMenu.Link>
  );
}

/* ----- Viewport (optional) ----------------------------------------------- */

type NavigationMenuViewportProps = ComponentPropsWithRef<
  typeof RadixNavigationMenu.Viewport
>;

export function NavigationMenuViewport({
  className,
  ref,
  ...props
}: NavigationMenuViewportProps) {
  return (
    <RadixNavigationMenu.Viewport
      ref={ref}
      className={cn(
        'relative mt-1 w-full overflow-hidden',
        'rounded-[--menu-radius] bg-[--menu-bg] border border-[--menu-border] shadow-[--menu-shadow]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        className,
      )}
      {...props}
    />
  );
}
