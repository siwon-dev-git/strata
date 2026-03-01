'use client';

/* eslint-disable react-refresh/only-export-components -- Icon base + createIcon factory are co-located by design */
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const SIZE_MAP = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

interface IconProps {
  children: ReactNode;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}

export function Icon({ children, size = 'md', className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(SIZE_MAP[size], 'shrink-0', className)}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function createIcon(name: string, paths: ReactNode) {
  function IconComponent({
    size,
    className,
  }: {
    size?: keyof typeof SIZE_MAP;
    className?: string;
  }) {
    return (
      <Icon size={size} className={className}>
        {paths}
      </Icon>
    );
  }
  IconComponent.displayName = name;
  return IconComponent;
}
