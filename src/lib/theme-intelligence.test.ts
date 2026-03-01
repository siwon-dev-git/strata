import { describe, it, expect } from 'vitest';
import {
  parseOklch,
  formatOklch,
  generateScale,
  generateScaleCSS,
  checkContrast,
  validateScaleContrast,
} from './theme-intelligence';
import type { OklchColor } from './theme-intelligence';

describe('parseOklch', () => {
  it('parses a valid oklch string', () => {
    const result = parseOklch('oklch(0.62 0.200 250)');
    expect(result).toEqual({ l: 0.62, c: 0.2, h: 250 });
  });

  it('parses oklch with extra whitespace', () => {
    const result = parseOklch('oklch(  0.5  0.15  180  )');
    expect(result).toEqual({ l: 0.5, c: 0.15, h: 180 });
  });

  it('returns undefined for invalid input', () => {
    expect(parseOklch('rgb(255, 0, 0)')).toBeUndefined();
    expect(parseOklch('not a color')).toBeUndefined();
    expect(parseOklch('')).toBeUndefined();
  });
});

describe('formatOklch', () => {
  it('formats an OklchColor to a CSS string', () => {
    const result = formatOklch({ l: 0.62, c: 0.2, h: 250 });
    expect(result).toBe('oklch(0.62 0.200 250)');
  });

  it('rounds hue to nearest integer', () => {
    const result = formatOklch({ l: 0.5, c: 0.15, h: 179.7 });
    expect(result).toBe('oklch(0.50 0.150 180)');
  });

  it('formats lightness to 2 decimal places', () => {
    const result = formatOklch({ l: 0.123456, c: 0.1, h: 90 });
    expect(result).toContain('0.12');
  });
});

describe('generateScale', () => {
  const source: OklchColor = { l: 0.62, c: 0.2, h: 250 };

  it('returns 10 scale steps', () => {
    const scale = generateScale(source);
    const steps = Object.keys(scale);
    expect(steps).toHaveLength(10);
  });

  it('contains expected step keys', () => {
    const scale = generateScale(source);
    const expectedSteps = [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ];
    for (const step of expectedSteps) {
      expect(scale[step]).toBeDefined();
    }
  });

  it('all values are valid oklch strings', () => {
    const scale = generateScale(source);
    for (const value of Object.values(scale)) {
      expect(value).toMatch(/^oklch\(/);
      expect(parseOklch(value)).toBeDefined();
    }
  });

  it('preserves source hue across all steps', () => {
    const scale = generateScale(source);
    for (const value of Object.values(scale)) {
      const parsed = parseOklch(value);
      expect(parsed!.h).toBe(250);
    }
  });

  it('step 500 has peak chroma (full source chroma)', () => {
    const scale = generateScale(source);
    const step500 = parseOklch(scale['500']);
    expect(step500!.c).toBe(source.c); // c * 1.0 = source.c
  });

  it('caps chroma at 0.4 for high-chroma sources', () => {
    const highChroma: OklchColor = { l: 0.5, c: 0.5, h: 120 };
    const scale = generateScale(highChroma);
    for (const value of Object.values(scale)) {
      const parsed = parseOklch(value);
      expect(parsed!.c).toBeLessThanOrEqual(0.4);
    }
  });

  it('step 50 is lightest, step 900 is darkest', () => {
    const scale = generateScale(source);
    const step50 = parseOklch(scale['50']);
    const step900 = parseOklch(scale['900']);
    expect(step50!.l).toBeGreaterThan(step900!.l);
  });
});

describe('generateScaleCSS', () => {
  const source: OklchColor = { l: 0.62, c: 0.2, h: 250 };

  it('generates valid CSS with :root selector', () => {
    const css = generateScaleCSS('brand', source);
    expect(css).toMatch(/^:root \{/);
    expect(css).toMatch(/\}$/);
  });

  it('uses correct custom property names', () => {
    const css = generateScaleCSS('brand', source);
    expect(css).toContain('--sp-brand-50:');
    expect(css).toContain('--sp-brand-500:');
    expect(css).toContain('--sp-brand-900:');
  });

  it('contains all 10 steps', () => {
    const css = generateScaleCSS('brand', source);
    const matches = css.match(/--sp-brand-\d+/g);
    expect(matches).toHaveLength(10);
  });

  it('uses the provided scale name', () => {
    const css = generateScaleCSS('accent', source);
    expect(css).toContain('--sp-accent-');
    expect(css).not.toContain('--sp-brand-');
  });
});

describe('checkContrast', () => {
  it('white on dark passes WCAG AA', () => {
    const white: OklchColor = { l: 0.98, c: 0, h: 0 };
    const dark: OklchColor = { l: 0.25, c: 0, h: 0 };
    const result = checkContrast(white, dark);
    expect(result.passes).toBe(true);
    expect(result.ratio).toBeGreaterThan(4.5);
  });

  it('similar lightness colors fail WCAG AA', () => {
    const a: OklchColor = { l: 0.5, c: 0.1, h: 200 };
    const b: OklchColor = { l: 0.55, c: 0.1, h: 200 };
    const result = checkContrast(a, b);
    expect(result.passes).toBe(false);
    expect(result.ratio).toBeLessThan(4.5);
  });

  it('black on white has high contrast', () => {
    const black: OklchColor = { l: 0.05, c: 0, h: 0 };
    const white: OklchColor = { l: 0.98, c: 0, h: 0 };
    const result = checkContrast(black, white);
    expect(result.passes).toBe(true);
    expect(result.ratio).toBeGreaterThan(10);
  });

  it('returns ratio rounded to 2 decimal places', () => {
    const a: OklchColor = { l: 0.3, c: 0, h: 0 };
    const b: OklchColor = { l: 0.9, c: 0, h: 0 };
    const result = checkContrast(a, b);
    const decimalPlaces = result.ratio.toString().split('.')[1]?.length ?? 0;
    expect(decimalPlaces).toBeLessThanOrEqual(2);
  });
});

describe('validateScaleContrast', () => {
  const source: OklchColor = { l: 0.62, c: 0.2, h: 250 };
  const scale = generateScale(source);

  it('returns results for light and dark steps', () => {
    const results = validateScaleContrast(scale);
    expect(results.length).toBeGreaterThan(0);
  });

  it('checks steps 50-300 with dark text', () => {
    const results = validateScaleContrast(scale);
    const lightSteps = results.filter((r) => r.step <= 300);
    expect(lightSteps.length).toBeGreaterThanOrEqual(4); // steps 50, 100, 200, 300
  });

  it('checks steps 600-900 with white text', () => {
    const results = validateScaleContrast(scale);
    const darkSteps = results.filter((r) => r.step >= 600);
    expect(darkSteps.length).toBeGreaterThanOrEqual(4); // steps 600, 700, 800, 900
  });

  it('does not check mid-range steps (400, 500)', () => {
    const results = validateScaleContrast(scale);
    const midSteps = results.filter((r) => r.step === 400 || r.step === 500);
    expect(midSteps).toHaveLength(0);
  });

  it('each result has step, passes, and ratio', () => {
    const results = validateScaleContrast(scale);
    for (const result of results) {
      expect(result).toHaveProperty('step');
      expect(result).toHaveProperty('passes');
      expect(result).toHaveProperty('ratio');
      expect(typeof result.passes).toBe('boolean');
      expect(typeof result.ratio).toBe('number');
    }
  });
});
