'use client';

import { useCallback, useMemo, useState } from 'react';
import type { ThemeName, ThemeMode } from '@/themes';
import { ThemeContext } from './ThemeContext';
import { DensityContext, type Density } from './DensityContext';

export function StrataProvider({
  children,
  defaultTheme = 'default',
  defaultMode = 'dark',
  defaultDensity = 'comfortable',
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: ThemeMode;
  defaultDensity?: Density;
}) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);
  const [density, setDensity] = useState<Density>(defaultDensity);

  const handleSetTheme = useCallback((t: ThemeName) => setTheme(t), []);
  const handleSetMode = useCallback((m: ThemeMode) => setMode(m), []);
  const handleToggleMode = useCallback(
    () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );
  const handleSetDensity = useCallback((d: Density) => setDensity(d), []);

  const themeValue = useMemo(
    () => ({
      theme,
      mode,
      setTheme: handleSetTheme,
      setMode: handleSetMode,
      toggleMode: handleToggleMode,
    }),
    [theme, mode, handleSetTheme, handleSetMode, handleToggleMode],
  );

  const densityValue = useMemo(
    () => ({ density, setDensity: handleSetDensity }),
    [density, handleSetDensity],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <DensityContext.Provider value={densityValue}>
        <div
          data-theme={theme}
          data-density={density}
          className={`${mode === 'dark' ? 'dark' : ''} bg-surface-base text-fg-default min-h-screen`}
        >
          {children}
        </div>
      </DensityContext.Provider>
    </ThemeContext.Provider>
  );
}
