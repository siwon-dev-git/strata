import { useCallback, useMemo, useState } from 'react';
import type { ThemeName, ThemeMode } from '@/themes';
import { ThemeContext } from './ThemeContext';

export function StrataProvider({
  children,
  defaultTheme = 'default',
  defaultMode = 'dark',
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
  defaultMode?: ThemeMode;
}) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  const handleSetTheme = useCallback((t: ThemeName) => setTheme(t), []);
  const handleSetMode = useCallback((m: ThemeMode) => setMode(m), []);

  const value = useMemo(
    () => ({ theme, mode, setTheme: handleSetTheme, setMode: handleSetMode }),
    [theme, mode, handleSetTheme, handleSetMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div
        data-theme={theme}
        className={`${mode === 'dark' ? 'dark' : ''} bg-surface-base text-fg-default min-h-screen`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
