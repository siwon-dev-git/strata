import { describe, it, expect } from 'vitest';
import {
  resolveIntent,
  getIntentNames,
  getIntentProfile,
  registerIntent,
} from './resolveIntent';

describe('resolveIntent', () => {
  it('resolves "professional" intent', () => {
    const result = resolveIntent('professional');
    expect(result).toBeDefined();
    expect(result!.attributes['data-density']).toBe('comfortable');
    expect(result!.tokenOverrides['--color-interactive']).toContain('blue');
  });

  it('resolves "playful" intent with spring easing', () => {
    const result = resolveIntent('playful');
    expect(result).toBeDefined();
    expect(result!.tokenOverrides['--motion-ease-entrance']).toContain(
      'spring',
    );
    expect(result!.attributes['data-density']).toBe('spacious');
  });

  it('resolves "minimal" intent with no radius', () => {
    const result = resolveIntent('minimal');
    expect(result).toBeDefined();
    expect(result!.tokenOverrides['--btn-radius']).toContain('none');
    expect(result!.attributes['data-density']).toBe('compact');
  });

  it('returns undefined for unknown intent', () => {
    expect(resolveIntent('nonexistent')).toBeUndefined();
  });

  it('respects light mode', () => {
    const dark = resolveIntent('professional', 'dark');
    const light = resolveIntent('professional', 'light');
    expect(dark!.tokenOverrides['--color-interactive']).not.toBe(
      light!.tokenOverrides['--color-interactive'],
    );
  });

  it('getIntentNames returns all registered intents', () => {
    const names = getIntentNames();
    expect(names).toContain('professional');
    expect(names).toContain('playful');
    expect(names).toContain('minimal');
    expect(names).toContain('bold');
    expect(names).toContain('calm');
    expect(names.length).toBeGreaterThanOrEqual(5);
  });

  it('getIntentProfile returns profile for known intent', () => {
    const profile = getIntentProfile('bold');
    expect(profile).toEqual({
      density: 'comfortable',
      radius: 'lg',
      palette: 'orange',
      motion: 'spring',
    });
  });

  it('registerIntent adds a custom intent', () => {
    registerIntent('corporate', {
      density: 'comfortable',
      radius: 'sm',
      palette: 'blue',
      motion: 'fast',
    });
    const result = resolveIntent('corporate');
    expect(result).toBeDefined();
    expect(result!.description).toContain('corporate');
  });
});
