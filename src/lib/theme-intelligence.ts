/**
 * Theme Intelligence — Generate complete OKLch color scales from a single brand color.
 *
 * Given a single hex/oklch color, generates an 11-step scale following
 * Strata's L1 primitive pattern (50-900, matching lightness/chroma curves).
 */

// OKLch color type
export interface OklchColor {
  l: number; // Lightness 0-1
  c: number; // Chroma 0-0.4
  h: number; // Hue 0-360
}

// Scale step definition
export interface ScaleStep {
  step: number; // 50, 100, 200...900
  l: number; // Target lightness
  c: number; // Target chroma (relative to peak)
}

// Generated scale output
export interface ColorScale {
  [step: string]: string; // step → oklch() value
}

// Lightness/chroma curve based on Strata's blue scale pattern
const SCALE_CURVE: ScaleStep[] = [
  { step: 50, l: 0.97, c: 0.07 }, // Very light, low chroma
  { step: 100, l: 0.93, c: 0.15 },
  { step: 200, l: 0.87, c: 0.3 },
  { step: 300, l: 0.79, c: 0.5 },
  { step: 400, l: 0.7, c: 0.75 },
  { step: 500, l: 0.62, c: 1.0 }, // Peak chroma at 500
  { step: 600, l: 0.54, c: 0.95 },
  { step: 700, l: 0.45, c: 0.8 },
  { step: 800, l: 0.35, c: 0.6 },
  { step: 900, l: 0.25, c: 0.4 },
];

/**
 * Parse an OKLch string to its components.
 */
export function parseOklch(value: string): OklchColor | undefined {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (!match) return undefined;
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
}

/**
 * Format OKLch components to a CSS string.
 */
export function formatOklch(color: OklchColor): string {
  return `oklch(${color.l.toFixed(2)} ${color.c.toFixed(3)} ${Math.round(color.h)})`;
}

/**
 * Generate a full 10-step color scale from a single source color.
 * The source color's chroma becomes the peak (step 500).
 */
export function generateScale(source: OklchColor): ColorScale {
  const scale: ColorScale = {};

  for (const { step, l, c } of SCALE_CURVE) {
    const adjustedChroma = Math.min(source.c * c, 0.4); // Cap at OKLch gamut
    scale[step] = formatOklch({ l, c: adjustedChroma, h: source.h });
  }

  return scale;
}

/**
 * Generate CSS custom properties for a color scale.
 * @param name - Scale name (e.g., 'brand')
 * @param source - Source color in OKLch
 * @returns CSS string with custom properties
 */
export function generateScaleCSS(name: string, source: OklchColor): string {
  const scale = generateScale(source);
  const declarations = Object.entries(scale)
    .map(([step, value]) => `  --sp-${name}-${step}: ${value};`)
    .join('\n');

  return `:root {\n${declarations}\n}`;
}

/**
 * Check WCAG AA contrast ratio between two OKLch colors.
 * Uses approximate luminance calculation from OKLch lightness.
 * Returns true if contrast ratio >= 4.5:1 for normal text.
 */
export function checkContrast(
  fg: OklchColor,
  bg: OklchColor,
): { ratio: number; passes: boolean } {
  // Approximate relative luminance from OKLch lightness
  // This is simplified — true WCAG requires sRGB conversion
  const fgLum = fg.l * fg.l; // Approximate gamma
  const bgLum = bg.l * bg.l;

  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);

  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passes: ratio >= 4.5,
  };
}

/**
 * Validate a generated scale for WCAG AA text contrast.
 * Checks light text on dark steps and dark text on light steps.
 */
export function validateScaleContrast(
  scale: ColorScale,
): { step: number; passes: boolean; ratio: number }[] {
  const results: { step: number; passes: boolean; ratio: number }[] = [];

  // White text on dark steps (600-900)
  const white: OklchColor = { l: 0.98, c: 0, h: 0 };
  // Dark text on light steps (50-300)
  const dark: OklchColor = { l: 0.15, c: 0, h: 0 };

  for (const [stepStr, value] of Object.entries(scale)) {
    const step = parseInt(stepStr, 10);
    const color = parseOklch(value);
    if (!color) continue;

    if (step >= 600) {
      const result = checkContrast(white, color);
      results.push({ step, ...result });
    } else if (step <= 300) {
      const result = checkContrast(dark, color);
      results.push({ step, ...result });
    }
  }

  return results;
}
