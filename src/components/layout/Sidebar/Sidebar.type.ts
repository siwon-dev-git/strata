import type { ReactNode } from 'react';

export interface SidebarProps {
  collapsed?: boolean;
  width?: string;
  className?: string;
  children?: ReactNode;
}

export interface SidebarSectionProps {
  title: string;
  children?: ReactNode;
}

export interface SidebarItemProps {
  icon?: ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}
