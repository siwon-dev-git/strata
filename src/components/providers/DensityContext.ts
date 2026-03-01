'use client';

import { createContext, useContext } from 'react';

export type Density = 'compact' | 'comfortable' | 'spacious';

export interface DensityContextValue {
  density: Density;
  setDensity: (d: Density) => void;
}

export const DensityContext = createContext<DensityContextValue | null>(null);

export function useDensity(): DensityContextValue {
  const ctx = useContext(DensityContext);
  if (!ctx) throw new Error('useDensity must be used within StrataProvider');
  return ctx;
}
