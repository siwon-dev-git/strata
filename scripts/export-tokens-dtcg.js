#!/usr/bin/env node

/**
 * Export Strata Design Tokens to W3C DTCG format.
 *
 * Reads Layer 1 (primitive) and Layer 2 (semantic) CSS files and
 * outputs a spec-compliant tokens.json following the W3C Design
 * Token Community Group format.
 *
 * Spec: https://tr.designtokens.org/format/
 *
 * Usage: node scripts/export-tokens-dtcg.js
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/* ── Helpers ──────────────────────────────────────────────────── */

function parseCssVars(source) {
  const vars = [];
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(source)) !== null) {
    vars.push({ name: match[1], value: match[2].trim() });
  }
  return vars;
}

function inferType(name, value) {
  if (name.includes('duration') || value.endsWith('ms')) return 'duration';
  if (name.includes('ease') || value.startsWith('cubic-bezier'))
    return 'cubicBezier';
  if (name.includes('radius') || name.includes('space')) return 'dimension';
  if (name.includes('text-') && !name.includes('fg')) return 'dimension';
  if (name.startsWith('sp-z-') || name.includes('elevation')) return 'number';
  if (value.startsWith('oklch')) return 'color';
  if (value.startsWith('0 ') || value.includes('oklch(0 0 0')) return 'shadow';
  if (value === '0' || value.endsWith('rem') || value.endsWith('px'))
    return 'dimension';
  if (value.startsWith('var(')) return 'reference';
  return 'string';
}

function resolveReference(value) {
  const refMatch = value.match(/^var\(--([\w-]+)\)$/);
  if (refMatch) {
    const parts = refMatch[1].split('-');
    return `{${parts.join('.')}}`;
  }
  return value;
}

function groupName(varName, prefix) {
  // Remove prefix and split by '-'
  const stripped = varName.replace(new RegExp(`^${prefix}-`), '');
  const parts = stripped.split('-');

  // Group: first part is group, rest is token name
  if (parts.length >= 2) {
    return { group: parts[0], name: parts.slice(1).join('-') };
  }
  return { group: '_root', name: parts[0] };
}

/* ── Parse CSS ────────────────────────────────────────────────── */

const layer1 = readFileSync(
  resolve(root, 'src/tokens/layer1-primitive.css'),
  'utf-8',
);
const layer2 = readFileSync(
  resolve(root, 'src/tokens/layer2-semantic.css'),
  'utf-8',
);

// Extract only :root block from layer2 (dark mode defaults)
const layer2RootMatch = layer2.match(/:root\s*\{([\s\S]*?)\n\}/);
const layer2Root = layer2RootMatch ? layer2RootMatch[1] : '';

const primitiveVars = parseCssVars(layer1);
const semanticVars = parseCssVars(layer2Root);

/* ── Group descriptions (DTCG $description) ──────────────────── */

const GROUP_DESCRIPTIONS = {
  // Primitive groups
  'primitive.gray': 'Neutral gray scale (12 steps). Hue 250.',
  'primitive.blue': 'Primary blue scale (10 steps). Hue 260.',
  'primitive.red': 'Danger/error red scale. Hue 25.',
  'primitive.green': 'Success green scale. Hue 155.',
  'primitive.yellow': 'Warning yellow scale (10 steps). Hue 85.',
  'primitive.purple': 'Accent purple scale (10 steps). Hue 305.',
  'primitive.orange': 'Accent orange scale (10 steps). Hue 55.',
  'primitive.space': 'Spacing scale (0–16). Base unit: 0.25rem.',
  'primitive.text': 'Font size scale (xs–4xl).',
  'primitive.leading': 'Line-height scale (none–loose).',
  'primitive.duration': 'Animation duration scale (0–500ms).',
  'primitive.ease': 'Easing functions (default, in, out, in-out, spring).',
  'primitive.z': 'Z-index scale (0–60).',
  'primitive.radius': 'Border radius scale (none–full).',
  // Semantic groups
  'semantic.color': 'Interactive and status colors. References primitive hues.',
  'semantic.surface': 'Background surface hierarchy (base → overlay).',
  'semantic.fg': 'Foreground/text color hierarchy (default → disabled).',
  'semantic.border': 'Border color hierarchy (subtle → danger).',
  'semantic.shadow': 'Elevation shadows (sm, md, lg).',
  'semantic.elevation': 'Z-index aliases for UI layers.',
  'semantic.density': 'Density mode tokens (gap, padding, item height).',
  'semantic.type': 'Typography semantic scale (display → caption).',
  'semantic.focus': 'Focus ring system (WCAG 2.2 AA compliant).',
  'semantic.motion': 'Motion/animation semantic tokens.',
};

/* ── Build DTCG structure ─────────────────────────────────────── */

const dtcg = {
  $schema: 'https://tr.designtokens.org/format/',
  primitive: {},
  semantic: {},
};

// Layer 1: Primitive tokens
for (const { name, value } of primitiveVars) {
  if (!name.startsWith('sp-')) continue;
  const { group, name: tokenName } = groupName(name, 'sp');
  const type = inferType(name, value);

  if (!dtcg.primitive[group]) {
    const desc = GROUP_DESCRIPTIONS[`primitive.${group}`];
    dtcg.primitive[group] = {
      $type: type,
      ...(desc ? { $description: desc } : {}),
    };
  }

  dtcg.primitive[group][tokenName] = {
    $value: value,
    ...(type !== dtcg.primitive[group].$type ? { $type: type } : {}),
  };
}

// Layer 2: Semantic tokens
for (const { name, value } of semanticVars) {
  // Skip sp- prefixed (these are primitive)
  if (name.startsWith('sp-')) continue;

  const parts = name.split('-');
  const group = parts[0];
  const tokenName = parts.slice(1).join('-') || parts[0];
  const type = inferType(name, value);

  if (!dtcg.semantic[group]) {
    const desc = GROUP_DESCRIPTIONS[`semantic.${group}`];
    dtcg.semantic[group] = {
      ...(desc ? { $description: desc } : {}),
    };
  }

  const resolved = resolveReference(value);
  const isRef = resolved.startsWith('{');

  dtcg.semantic[group][tokenName] = {
    $value: isRef ? resolved : value,
    $type: type,
  };
}

/* ── Write output ─────────────────────────────────────────────── */

const output = JSON.stringify(dtcg, null, 2);
const outPath = resolve(root, 'tokens.json');
writeFileSync(outPath, output + '\n');

// Stats
const primitiveCount = primitiveVars.filter((v) =>
  v.name.startsWith('sp-'),
).length;
const semanticCount = semanticVars.filter(
  (v) => !v.name.startsWith('sp-'),
).length;
const groups = new Set([
  ...Object.keys(dtcg.primitive),
  ...Object.keys(dtcg.semantic),
]);

console.log('');
console.log('  Strata DTCG Token Export');
console.log('  ═══════════════════════════════════════════');
console.log(`  Output:     ${outPath}`);
console.log(`  Primitives: ${primitiveCount} tokens`);
console.log(`  Semantic:   ${semanticCount} tokens`);
console.log(`  Groups:     ${groups.size}`);
console.log(`  Format:     W3C DTCG (https://tr.designtokens.org/format/)`);
console.log('');
