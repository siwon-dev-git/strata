/* ═══════════════════════════════════════════════════════════════
   @siwon-dev-npm/strata — Public API
   ═══════════════════════════════════════════════════════════════ */

// Components
export * from './components';

// Hooks
export * from './hooks';

// Utilities
export { cn } from './lib/utils';
export { createTheme, injectTheme } from './lib/createTheme';
export type { ThemeTokenOverrides } from './lib/createTheme';

// Intent Vocabulary System
export {
  resolveIntent,
  getIntentNames,
  getIntentProfile,
  registerIntent,
} from './lib/resolveIntent';
export type {
  IntentProfile,
  TokenOverrideSet,
  IntentDensity,
  IntentRadius,
  IntentPalette,
  IntentMotion,
} from './lib/resolveIntent';

// Screen Analysis Schema
export { analysisToJSX, validateAnalysis } from './lib/screen-analysis';
export type {
  ScreenAnalysis,
  RecognizedComponent,
  ThemeAnalysis,
  LayoutPattern,
  BoundingBox,
} from './lib/screen-analysis';

// Phase 4: AI Intelligence Layer
export {
  generateScale,
  generateScaleCSS,
  parseOklch,
  formatOklch,
  checkContrast,
  validateScaleContrast,
} from './lib/theme-intelligence';
export type {
  OklchColor,
  ColorScale,
  ScaleStep,
} from './lib/theme-intelligence';
export {
  detectGaps,
  prioritizeGaps,
  formatSprintQueue,
} from './lib/self-improve';
export type {
  UsageEvent,
  GapCandidate,
  PrioritizedGap,
} from './lib/self-improve';
export {
  scoreComponent,
  scoreAll,
  formatQualityReport,
} from './lib/quality-score';
export type { QualityInput, QualityScore } from './lib/quality-score';
