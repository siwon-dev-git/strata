/**
 * Generates llms.md and llms-full.md from component .md files.
 *
 * Usage: node scripts/generate-llms-txt.js
 *
 * llms.md      — Lightweight index (~5K tokens)
 * llms-full.md — Full documentation content for large-context AI tools
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const COMPONENTS_DIR = join(ROOT, 'src/components');
const TOKENS_DIR = join(ROOT, 'src/tokens');
const DEMOS_DIR = join(ROOT, 'src/demos');

async function findMdFiles(dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findMdFiles(full)));
    } else if (entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results.sort();
}

function parseComponentMd(content) {
  const roleMatch = content.match(/## Role\s*\n\s*\n(.+)/);
  const tierMatch = content.match(/## Tier\s*\n\s*\n(\d)/);
  return {
    role: roleMatch?.[1]?.trim() ?? '',
    tier: tierMatch ? parseInt(tierMatch[1], 10) : 0,
  };
}

function categoryFromPath(mdPath) {
  const rel = relative(COMPONENTS_DIR, mdPath);
  return rel.split('/')[0];
}

async function collectComponents() {
  const mdFiles = await findMdFiles(COMPONENTS_DIR);
  const entries = [];

  for (const mdPath of mdFiles) {
    const content = await readFile(mdPath, 'utf-8');
    const { role, tier } = parseComponentMd(content);
    const name = mdPath.split('/').at(-2) ?? '';
    entries.push({
      name,
      category: categoryFromPath(mdPath),
      role,
      tier,
      mdPath: relative(ROOT, mdPath),
      mdContent: content,
    });
  }

  return entries;
}

async function collectDemos() {
  try {
    const entries = await readdir(DEMOS_DIR, { withFileTypes: true });
    return entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

function groupByCategory(entries) {
  const groups = {};
  for (const entry of entries) {
    (groups[entry.category] ??= []).push(entry);
  }
  return groups;
}

const CATEGORY_ORDER = ['primitives', 'layout', 'disclosure', 'feedback'];
const CATEGORY_LABELS = {
  primitives: 'Primitives',
  layout: 'Layout',
  disclosure: 'Disclosure',
  feedback: 'Feedback',
};

function generateLlmsTxt(components, demos) {
  const grouped = groupByCategory(components);
  const lines = [];

  lines.push('# Strata Design System');
  lines.push('');
  lines.push(
    '> React 19 + TypeScript 5.9 + Tailwind CSS v4.2 + Radix UI headless design system.',
  );
  lines.push(
    `> ${components.length} components across 4 categories (primitives, layout, disclosure, feedback).`,
  );
  lines.push(
    '> 3-layer OKLch design tokens: primitives → semantic → component. Dark/light theme.',
  );
  lines.push('');

  lines.push('## Getting Started');
  lines.push('');
  lines.push(
    '- [README](README.md): Installation, quick start, and project overview',
  );
  lines.push(
    '- [CLAUDE.md](CLAUDE.md): AI development conventions and skill commands',
  );
  lines.push('');

  lines.push('## Design Tokens');
  lines.push('');
  lines.push(
    '- [Layer 1: Primitives](src/tokens/layer1-primitive.css): OKLch color scales, spacing, typography, radius. Prefix `--sp-*`',
  );
  lines.push(
    '- [Layer 2: Semantic](src/tokens/layer2-semantic.css): Intent-based aliases (`--surface-*`, `--fg-*`, `--border-*`, `--color-*`)',
  );
  lines.push(
    '- [Layer 3: Component](src/tokens/layer3-component.css): Component-scoped overrides (`--btn-*`, `--dialog-*`, `--menu-*`)',
  );
  lines.push('');

  for (const cat of CATEGORY_ORDER) {
    const group = grouped[cat];
    if (!group) continue;
    lines.push(`## ${CATEGORY_LABELS[cat]} (${group.length})`);
    lines.push('');
    for (const c of group) {
      const roleSuffix = c.role ? `: ${c.role}` : '';
      lines.push(`- [${c.name}](${c.mdPath})${roleSuffix}`);
    }
    lines.push('');
  }

  if (demos.length > 0) {
    lines.push(`## Demo Applications (${demos.length})`);
    lines.push('');
    for (const demo of demos) {
      lines.push(`- [${demo}](src/demos/${demo}/): Reference implementation`);
    }
    lines.push('');
  }

  lines.push('## Utilities');
  lines.push('');
  lines.push(
    '- [cn()](src/lib/utils.ts): Class merging utility using clsx + tailwind-merge',
  );
  lines.push('');

  return lines.join('\n');
}

async function generateLlmsFullTxt(components) {
  const sections = [];

  sections.push('# Strata Design System — Full Documentation');
  sections.push('');
  sections.push(
    '> Complete component documentation for AI tools with large context windows.',
  );
  sections.push('');

  const tokenFiles = [
    'layer1-primitive.css',
    'layer2-semantic.css',
    'layer3-component.css',
  ];
  sections.push('## Design Tokens');
  sections.push('');
  for (const tf of tokenFiles) {
    try {
      const content = await readFile(join(TOKENS_DIR, tf), 'utf-8');
      sections.push(`### ${tf}`);
      sections.push('');
      sections.push('```css');
      sections.push(content.trim());
      sections.push('```');
      sections.push('');
    } catch {
      // skip if file doesn't exist
    }
  }

  const grouped = groupByCategory(components);
  for (const cat of CATEGORY_ORDER) {
    const group = grouped[cat];
    if (!group) continue;
    sections.push(`## ${CATEGORY_LABELS[cat]}`);
    sections.push('');
    for (const c of group) {
      sections.push(`### ${c.name} (Tier ${c.tier})`);
      sections.push('');
      sections.push(c.mdContent.trim());
      sections.push('');
      sections.push('---');
      sections.push('');
    }
  }

  return sections.join('\n');
}

async function main() {
  const components = await collectComponents();
  const demos = await collectDemos();

  const llmsTxt = generateLlmsTxt(components, demos);
  const llmsFullTxt = await generateLlmsFullTxt(components);

  await writeFile(join(ROOT, 'llms.md'), llmsTxt, 'utf-8');
  await writeFile(join(ROOT, 'llms-full.md'), llmsFullTxt, 'utf-8');

  const llmsTokens = Math.round(llmsTxt.length / 4);
  const fullTokens = Math.round(llmsFullTxt.length / 4);

  console.log(`llms.md      → ${llmsTxt.length} chars (~${llmsTokens} tokens)`);
  console.log(
    `llms-full.md → ${llmsFullTxt.length} chars (~${fullTokens} tokens)`,
  );
  console.log(`Components: ${components.length}`);
  console.log(`Demos: ${demos.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
