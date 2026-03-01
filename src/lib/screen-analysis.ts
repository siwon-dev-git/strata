/**
 * ScreenAnalysis — Standard schema for image-to-component analysis.
 *
 * Vision models (Claude, GPT-4V) output this schema when analyzing UI screenshots.
 * `analysisToJSX()` converts the analysis into valid Strata JSX.
 */

// --- Layout Patterns ---

export type LayoutPattern =
  | 'sidebar-main' // AppShell + Sidebar + main content
  | 'topbar-main' // TopBar + main content
  | 'sidebar-topbar-main' // AppShell + Sidebar + TopBar + main
  | 'centered' // Centered content (auth pages, landing)
  | 'dashboard' // Grid-based dashboard layout
  | 'list-detail' // Master-detail pattern
  | 'full-bleed'; // Full-width content

// --- Bounding Box ---

export interface BoundingBox {
  x: number; // 0-1 normalized (left edge)
  y: number; // 0-1 normalized (top edge)
  width: number; // 0-1 normalized
  height: number; // 0-1 normalized
}

// --- Component Recognition ---

export interface RecognizedComponent {
  /** Strata component name (e.g., 'Button', 'Card', 'Input') */
  name: string;
  /** Bounding box in normalized coordinates */
  region: BoundingBox;
  /** Inferred props */
  props: Record<string, unknown>;
  /** Confidence score 0-1 */
  confidence: number;
  /** Nested children components */
  children?: RecognizedComponent[];
}

// --- Theme Analysis ---

export type DensityHint = 'compact' | 'comfortable' | 'spacious';

export interface ThemeAnalysis {
  mode: 'light' | 'dark';
  density: DensityHint;
  /** Dominant accent hue in OKLch degrees (0-360) */
  accentHue: number;
  /** Estimated border radius style */
  radiusStyle: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Closest matching Strata intent (if recognizable) */
  matchedIntent?: string;
}

// --- Full Analysis ---

export interface ScreenAnalysis {
  /** Detected layout pattern */
  layout: {
    type: LayoutPattern;
    /** Additional layout metadata */
    columns?: number;
    hasSidebar?: boolean;
    hasTopBar?: boolean;
  };
  /** Recognized Strata components */
  components: RecognizedComponent[];
  /** Inferred theme properties */
  theme: ThemeAnalysis;
  /** Overall confidence score 0-1 */
  confidence: number;
  /** Raw description from vision model */
  description?: string;
}

// --- JSX Generation ---

/**
 * Convert a ScreenAnalysis result into a Strata JSX code string.
 * This is a best-effort generation — the output should be reviewed by a developer.
 */
export function analysisToJSX(analysis: ScreenAnalysis): string {
  const imports = new Set<string>();
  const jsxParts: string[] = [];

  // Collect component imports
  for (const comp of analysis.components) {
    imports.add(comp.name);
    if (comp.children) {
      for (const child of comp.children) {
        imports.add(child.name);
      }
    }
  }

  // Generate import statement
  const importLine = `import { ${[...imports].sort().join(', ')} } from '@siwon-dev-npm/strata';`;

  // Generate component JSX
  for (const comp of analysis.components) {
    const propsStr = Object.entries(comp.props)
      .map(([key, value]) => {
        if (typeof value === 'string') return `${key}="${value}"`;
        if (typeof value === 'boolean') return value ? key : `${key}={false}`;
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(' ');

    if (comp.children && comp.children.length > 0) {
      const childrenJSX = comp.children
        .map((child) => {
          const childProps = Object.entries(child.props)
            .map(([k, v]) =>
              typeof v === 'string'
                ? `${k}="${v}"`
                : `${k}={${JSON.stringify(v)}}`,
            )
            .join(' ');
          return `    <${child.name} ${childProps} />`;
        })
        .join('\n');
      jsxParts.push(
        `  <${comp.name} ${propsStr}>\n${childrenJSX}\n  </${comp.name}>`,
      );
    } else {
      jsxParts.push(`  <${comp.name} ${propsStr} />`);
    }
  }

  // Determine wrapper based on layout
  const wrapper = getLayoutWrapper(analysis.layout.type);

  return `${importLine}\n\nexport function GeneratedPage() {\n  return (\n    <${wrapper}>\n${jsxParts.join('\n')}\n    </${wrapper}>\n  );\n}`;
}

function getLayoutWrapper(layout: LayoutPattern): string {
  switch (layout) {
    case 'sidebar-main':
    case 'sidebar-topbar-main':
      return 'AppShell';
    case 'centered':
      return 'Container';
    case 'dashboard':
    case 'topbar-main':
    case 'list-detail':
    case 'full-bleed':
    default:
      return 'div';
  }
}

/**
 * Validate a ScreenAnalysis object for required fields and value ranges.
 */
export function validateAnalysis(
  analysis: unknown,
): analysis is ScreenAnalysis {
  if (!analysis || typeof analysis !== 'object') return false;
  const a = analysis as Record<string, unknown>;

  if (!a.layout || typeof a.layout !== 'object') return false;
  if (!a.components || !Array.isArray(a.components)) return false;
  if (!a.theme || typeof a.theme !== 'object') return false;
  if (typeof a.confidence !== 'number' || a.confidence < 0 || a.confidence > 1)
    return false;

  return true;
}
