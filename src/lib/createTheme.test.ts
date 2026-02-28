import { describe, it, expect } from 'vitest';
import { createTheme } from './createTheme';

describe('createTheme', () => {
  it('generates CSS custom property block with theme selector', () => {
    const css = createTheme('brand', {
      'color-accent': 'oklch(0.6 0.2 250)',
    });
    expect(css).toContain("[data-theme='brand']");
    expect(css).toContain('--color-accent: oklch(0.6 0.2 250)');
  });

  it('handles multiple overrides', () => {
    const css = createTheme('custom', {
      'surface-base': 'oklch(0.1 0 0)',
      'fg-default': 'oklch(0.95 0 0)',
    });
    expect(css).toContain('--surface-base');
    expect(css).toContain('--fg-default');
  });

  it('skips undefined values', () => {
    const css = createTheme('partial', {
      'color-accent': 'oklch(0.5 0.2 200)',
      'surface-base': undefined,
    });
    expect(css).toContain('--color-accent');
    expect(css).not.toContain('--surface-base');
  });

  it('produces valid CSS block structure', () => {
    const css = createTheme('test', { 'color-accent': 'red' });
    expect(css).toMatch(/^\[data-theme='test'\] \{/);
    expect(css).toMatch(/\}$/);
  });
});
