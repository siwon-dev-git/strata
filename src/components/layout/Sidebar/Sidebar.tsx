import { cn } from '@/lib/utils';
import type {
  SidebarProps,
  SidebarSectionProps,
  SidebarItemProps,
} from './Sidebar.type';

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export function Sidebar({
  collapsed = false,
  width = 'var(--sidebar-width)',
  className,
  children,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col bg-[--sidebar-bg] border-r border-[--sidebar-border] transition-[width] duration-[--motion-duration-entrance]',
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
