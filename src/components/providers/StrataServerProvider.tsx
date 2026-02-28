// NO 'use client' directive — this is server-safe

import type { ReactNode } from 'react';
import type { ThemeName, ThemeMode } from '@/themes';
import type { Density } from './DensityContext';

export interface StrataServerProviderProps {
  theme?: ThemeName;
  mode?: ThemeMode;
  density?: Density;
  className?: string;
  children: ReactNode;
}

/**
 * Server-safe Strata provider for RSC environments.
 * Applies theme, mode, and density via data attributes without client-side state.
 * Use StrataProvider for full client-side interactivity (theme switching, etc.).
 */
export function StrataServerProvider({
  theme = 'default',
  mode = 'dark',
  density = 'comfortable',
  className,
  children,
}: StrataServerProviderProps) {
  return (
    <div
      data-theme={theme}
      data-density={density}
      className={[
        mode === 'dark' ? 'dark' : '',
        'bg-[--surface-base] text-[--fg-default]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
