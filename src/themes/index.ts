export const THEME_NAMES = ['default', 'blue', 'green'] as const;
export type ThemeName = (typeof THEME_NAMES)[number];
export type ThemeMode = 'light' | 'dark';
