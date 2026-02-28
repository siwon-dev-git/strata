#!/usr/bin/env node

/**
 * Demo Coverage Report
 *
 * Reads the demo-schema.ts COMPONENT_CATALOG and demo-registry.ts
 * to produce a coverage report showing which components are
 * demonstrated and which are missing coverage.
 *
 * Usage: node scripts/demo-coverage.js
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

/* ── Parse catalog from demo-schema.ts ────────────────────────── */

const schemaSource = readFileSync(
  resolve(root, 'src/demos/demo-schema.ts'),
  'utf-8',
);

// Extract all component names from the COMPONENT_CATALOG
const catalogMatch = schemaSource.match(
  /COMPONENT_CATALOG\s*=\s*\{([\s\S]*?)\}\s*as\s*const/,
);
if (!catalogMatch) {
  console.error('Could not parse COMPONENT_CATALOG from demo-schema.ts');
  process.exit(1);
}

function extractNames(block, key) {
  const regex = new RegExp(`${key}:\\s*\\[([\\s\\S]*?)\\]`);
  const match = block.match(regex);
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
}

const catalog = {
  primitives: extractNames(catalogMatch[1], 'primitives'),
  layout: extractNames(catalogMatch[1], 'layout'),
  disclosure: extractNames(catalogMatch[1], 'disclosure'),
  feedback: extractNames(catalogMatch[1], 'feedback'),
};

const allComponents = [
  ...catalog.primitives,
  ...catalog.layout,
  ...catalog.disclosure,
  ...catalog.feedback,
];

/* ── Parse registry from demo-registry.ts ─────────────────────── */

const registrySource = readFileSync(
  resolve(root, 'src/demos/demo-registry.ts'),
  'utf-8',
);

// Extract component arrays from each demo entry
const demoBlocks = [
  ...registrySource.matchAll(
    /id:\s*'([^']+)'[\s\S]*?components:\s*\{([\s\S]*?)\},\s*\n\s*layout:/g,
  ),
];

const demos = demoBlocks.map((match) => {
  const id = match[1];
  const block = match[2];
  return {
    id,
    primitives: extractNames(block, 'primitives'),
    layout: extractNames(block, 'layout'),
    disclosure: extractNames(block, 'disclosure'),
    feedback: extractNames(block, 'feedback'),
  };
});

/* ── Build coverage matrix ────────────────────────────────────── */

const usedSet = new Set();
const componentDemos = {}; // component -> demo IDs

for (const demo of demos) {
  const all = [
    ...demo.primitives,
    ...demo.layout,
    ...demo.disclosure,
    ...demo.feedback,
  ];
  for (const name of all) {
    usedSet.add(name);
    componentDemos[name] = componentDemos[name] || [];
    componentDemos[name].push(demo.id);
  }
}

const covered = allComponents.filter((c) => usedSet.has(c));
const uncovered = allComponents.filter((c) => !usedSet.has(c));
const pct = Math.round((covered.length / allComponents.length) * 100);

/* ── Output ───────────────────────────────────────────────────── */

console.log('');
console.log('  Strata Demo Coverage Report');
console.log('  ═══════════════════════════════════════════');
console.log('');
console.log(`  Total components:  ${allComponents.length}`);
console.log(`  Covered:           ${covered.length} (${pct}%)`);
console.log(`  Uncovered:         ${uncovered.length}`);
console.log(`  Demos:             ${demos.length}`);
console.log('');

// Coverage by category
for (const [cat, names] of Object.entries(catalog)) {
  const catCovered = names.filter((n) => usedSet.has(n));
  const catPct = Math.round((catCovered.length / names.length) * 100);
  console.log(
    `  ${cat.padEnd(12)} ${catCovered.length}/${names.length} (${catPct}%)`,
  );
}

console.log('');
console.log('  ── Uncovered Components ──');
console.log('');

for (const [cat, names] of Object.entries(catalog)) {
  const missing = names.filter((n) => !usedSet.has(n));
  if (missing.length > 0) {
    console.log(`  ${cat}:`);
    for (const name of missing) {
      console.log(`    - ${name}`);
    }
  }
}

console.log('');
console.log('  ── Component × Demo Matrix ──');
console.log('');

for (const name of covered.sort()) {
  const demoList = (componentDemos[name] || []).join(', ');
  console.log(`  ${name.padEnd(20)} ${demoList}`);
}

console.log('');
