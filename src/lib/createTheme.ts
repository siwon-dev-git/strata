/**
 * Generates a CSS custom property block for a custom Strata theme.
 * The generated CSS can be injected as a <style> tag or used with StrataProvider.
 */

export interface ThemeTokenOverrides {
  // Surface tokens
  'surface-base'?: string;
  'surface-raised'?: string;
  'surface-overlay'?: string;
  'surface-inset'?: string;

  // Interactive tokens
  'color-accent'?: string;
  'color-accent-hover'?: string;
  'color-accent-active'?: string;
  'color-accent-subtle'?: string;

  // Foreground tokens
  'fg-default'?: string;
  'fg-muted'?: string;
  'fg-on-accent'?: string;

  // Border tokens
  'border-default'?: string;
  'border-subtle'?: string;
  'border-interactive'?: string;

  // Focus
  'focus-ring-color'?: string;

  // Allow arbitrary token overrides
  [key: string]: string | undefined;
}

export function createTheme(
  name: string,
  overrides: ThemeTokenOverrides,
): string {
  const declarations = Object.entries(overrides)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  return `[data-theme='${name}'] {\n${declarations}\n}`;
}

/**
 * Injects a theme CSS block into the document head.
 * Returns a cleanup function to remove the style element.
 */
export function injectTheme(
  name: string,
  overrides: ThemeTokenOverrides,
): () => void {
  const css = createTheme(name, overrides);
  const style = document.createElement('style');
  style.setAttribute('data-strata-theme', name);
  style.textContent = css;
  document.head.appendChild(style);

  return () => {
    style.remove();
  };
}
