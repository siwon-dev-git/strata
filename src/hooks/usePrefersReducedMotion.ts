import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Detects `prefers-reduced-motion: reduce` for JS-driven animations.
 *
 * CSS transitions/animations are handled globally via the motion token
 * gate in layer1-primitive.css. This hook covers rAF-based animations
 * that bypass CSS (per ADR global-css-motion-gate).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
