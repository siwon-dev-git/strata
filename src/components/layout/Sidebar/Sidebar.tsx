import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

interface SidebarProps {
  collapsed?: boolean;
  width?: string;
  className?: string;
  children?: ReactNode;
}

export function Sidebar({
  collapsed = false,
  width = 'var(--sidebar-width)',
  className,
  children,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col bg-[--sidebar-bg] border-r border-[--sidebar-border] transition-[width] duration-200',
        collapsed ? 'overflow-hidden' : 'overflow-y-auto',
        className,
      )}
      style={{
        width: collapsed ? 'var(--sidebar-width-collapsed, 0px)' : width,
      }}
    >
      {children}
    </aside>
  );
}

// ---------------------------------------------------------------------------
// SidebarSection
// ---------------------------------------------------------------------------

interface SidebarSectionProps {
  title: string;
  children?: ReactNode;
}

export function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-[--fg-muted] px-3 py-2">
        {title}
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// SidebarItem
// ---------------------------------------------------------------------------

interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 w-full px-3 py-1.5 rounded-md text-sm transition-colors',
        active
          ? 'bg-[--sidebar-item-active-bg] text-[--sidebar-item-active-fg] font-medium'
          : 'text-[--fg-muted] hover:bg-[--sidebar-item-hover] hover:text-[--fg-default]',
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{label}</span>
      {badge != null && <span className="ml-auto text-xs">{badge}</span>}
    </button>
  );
}
