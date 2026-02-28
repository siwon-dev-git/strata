/**
 * Intent Vocabulary System
 * Maps mood/feeling descriptions to concrete Strata token override sets.
 * "Describe the feeling, get the tokens."
 */

export type IntentDensity = 'compact' | 'comfortable' | 'spacious';
export type IntentRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type IntentPalette =
  | 'gray'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'red'
  | 'yellow';
export type IntentMotion = 'instant' | 'fast' | 'normal' | 'slow' | 'spring';

export interface IntentProfile {
  density: IntentDensity;
  radius: IntentRadius;
  palette: IntentPalette;
  motion: IntentMotion;
}

export interface TokenOverrideSet {
  /** Data attributes to apply */
  attributes: {
    'data-density'?: IntentDensity;
    'data-theme'?: string;
  };
  /** CSS custom property overrides */
  tokenOverrides: Record<string, string>;
  /** Human-readable description */
  description: string;
}

const INTENT_PROFILES: Record<string, IntentProfile> = {
  professional: {
    density: 'comfortable',
    radius: 'md',
    palette: 'blue',
    motion: 'fast',
  },
  playful: {
    density: 'spacious',
    radius: 'xl',
    palette: 'purple',
    motion: 'spring',
  },
  minimal: {
    density: 'compact',
    radius: 'none',
    palette: 'gray',
    motion: 'fast',
  },
  bold: {
    density: 'comfortable',
    radius: 'lg',
    palette: 'orange',
    motion: 'spring',
  },
  calm: {
    density: 'spacious',
    radius: 'lg',
    palette: 'green',
    motion: 'slow',
  },
};

const PALETTE_TO_ACCENT: Record<
  IntentPalette,
  { dark: string; light: string }
> = {
  gray: { dark: 'var(--sp-gray-400)', light: 'var(--sp-gray-600)' },
  blue: { dark: 'var(--sp-blue-500)', light: 'var(--sp-blue-600)' },
  green: { dark: 'var(--sp-green-500)', light: 'var(--sp-green-600)' },
  purple: { dark: 'var(--sp-purple-500)', light: 'var(--sp-purple-600)' },
  orange: { dark: 'var(--sp-orange-500)', light: 'var(--sp-orange-600)' },
  red: { dark: 'var(--sp-red-500)', light: 'var(--sp-red-600)' },
  yellow: { dark: 'var(--sp-yellow-500)', light: 'var(--sp-yellow-600)' },
};

const RADIUS_MAP: Record<IntentRadius, string> = {
  none: 'var(--sp-radius-none)',
  sm: 'var(--sp-radius-sm)',
  md: 'var(--sp-radius-md)',
  lg: 'var(--sp-radius-lg)',
  xl: 'var(--sp-radius-xl)',
  full: 'var(--sp-radius-full)',
};

const MOTION_MAP: Record<IntentMotion, { duration: string; easing: string }> = {
  instant: {
    duration: 'var(--sp-duration-0)',
    easing: 'var(--sp-ease-default)',
  },
  fast: { duration: 'var(--sp-duration-fast)', easing: 'var(--sp-ease-out)' },
  normal: {
    duration: 'var(--sp-duration-normal)',
    easing: 'var(--sp-ease-default)',
  },
  slow: {
    duration: 'var(--sp-duration-slow)',
    easing: 'var(--sp-ease-in-out)',
  },
  spring: {
    duration: 'var(--sp-duration-normal)',
    easing: 'var(--sp-ease-spring)',
  },
};

/**
 * Get all registered intent names.
 */
export function getIntentNames(): string[] {
  return Object.keys(INTENT_PROFILES);
}

/**
 * Get the profile for a named intent.
 */
export function getIntentProfile(intent: string): IntentProfile | undefined {
  return INTENT_PROFILES[intent];
}

/**
 * Resolve a mood/intent string to a concrete token override set.
 * Returns undefined if the intent is not recognized.
 */
export function resolveIntent(
  intent: string,
  mode: 'dark' | 'light' = 'dark',
): TokenOverrideSet | undefined {
  const profile = INTENT_PROFILES[intent];
  if (!profile) return undefined;

  const accent = PALETTE_TO_ACCENT[profile.palette];
  const radius = RADIUS_MAP[profile.radius];
  const motion = MOTION_MAP[profile.motion];

  const tokenOverrides: Record<string, string> = {
    '--color-interactive': accent[mode],
    '--color-interactive-hover': accent[mode],
    '--btn-radius': radius,
    '--input-radius': radius,
    '--card-radius': radius,
    '--dialog-radius': radius,
    '--motion-duration-entrance': motion.duration,
    '--motion-duration-exit': motion.duration,
    '--motion-ease-entrance': motion.easing,
    '--motion-ease-exit': motion.easing,
  };

  return {
    attributes: {
      'data-density': profile.density,
    },
    tokenOverrides,
    description: `${intent}: ${profile.palette} palette, ${profile.radius} radius, ${profile.density} density, ${profile.motion} motion`,
  };
}

/**
 * Register a custom intent profile.
 */
export function registerIntent(name: string, profile: IntentProfile): void {
  INTENT_PROFILES[name] = profile;
}
