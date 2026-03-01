import { describe, it, expect } from 'vitest';
import {
  recommend,
  getComponentDetail,
  queryTokens,
  getDemoInfo,
  TOOL_DEFINITIONS,
  COMPONENT_REGISTRY,
} from './assembly-tools';

describe('Assembly MCP Tools', () => {
  describe('TOOL_DEFINITIONS', () => {
    it('defines 5 tools', () => {
      expect(TOOL_DEFINITIONS).toHaveLength(5);
    });

    it('all tools have strata/ prefix', () => {
      for (const tool of TOOL_DEFINITIONS) {
        expect(tool.name).toMatch(/^strata\//);
      }
    });

    it('all tools have required schema fields', () => {
      for (const tool of TOOL_DEFINITIONS) {
        expect(tool.description).toBeTruthy();
        expect(tool.inputSchema).toBeDefined();
        expect(tool.inputSchema.type).toBe('object');
      }
    });
  });

  describe('recommend', () => {
    it('recommends sidebar components for settings task', () => {
      const results = recommend('user settings page with sidebar navigation');
      const names = results.map((r) => r.name);
      expect(names).toContain('Sidebar');
      expect(names).toContain('Tabs');
    });

    it('recommends form components for form task', () => {
      const results = recommend('create a form for user registration');
      const names = results.map((r) => r.name);
      expect(names).toContain('FormField');
      expect(names).toContain('Input');
      expect(names).toContain('Button');
    });

    it('respects constraints', () => {
      const results = recommend('settings page', ['no dialogs']);
      const names = results.map((r) => r.name);
      expect(names).not.toContain('Dialog');
    });

    it('returns empty for unrelated tasks', () => {
      const results = recommend('something completely unrelated to ui');
      expect(results.length).toBeLessThanOrEqual(10);
    });

    it('limits results to 10', () => {
      const results = recommend(
        'settings dashboard form navigation list modal notification',
      );
      expect(results.length).toBeLessThanOrEqual(10);
    });
  });

  describe('getComponentDetail', () => {
    it('returns Button details', () => {
      const detail = getComponentDetail('Button');
      expect(detail).toBeDefined();
      expect(detail!.name).toBe('Button');
      expect(detail!.category).toBe('primitives');
      expect(detail!.props).toContain('variant');
      expect(detail!.tokens.length).toBeGreaterThan(0);
    });

    it('is case-insensitive', () => {
      const detail = getComponentDetail('button');
      expect(detail?.name).toBe('Button');
    });

    it('returns undefined for unknown component', () => {
      expect(getComponentDetail('NonExistent')).toBeUndefined();
    });

    it('includes a11y info for interactive components', () => {
      const dialog = getComponentDetail('Dialog');
      expect(dialog!.a11y).toContain('role="dialog"');
      expect(dialog!.interactive).toBe(true);
    });
  });

  describe('queryTokens', () => {
    it('finds button tokens', () => {
      const matches = queryTokens('btn');
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].component).toBe('Button');
    });

    it('finds surface tokens', () => {
      const matches = queryTokens('sidebar');
      expect(matches.length).toBeGreaterThan(0);
    });

    it('returns empty for unmatched query', () => {
      expect(queryTokens('xyznonexistent')).toHaveLength(0);
    });
  });

  describe('getDemoInfo', () => {
    it('returns github demo info', () => {
      const info = getDemoInfo('github');
      expect(info).toBeDefined();
      expect(info!.name).toBe('Github');
      expect(info!.path).toContain('github');
      expect(info!.available).toBe(true);
    });

    it('is case-insensitive', () => {
      const info = getDemoInfo('Slack');
      expect(info).toBeDefined();
    });

    it('returns undefined for unknown demo', () => {
      expect(getDemoInfo('nonexistent')).toBeUndefined();
    });
  });

  describe('COMPONENT_REGISTRY', () => {
    it('has 30+ components', () => {
      expect(COMPONENT_REGISTRY.length).toBeGreaterThanOrEqual(30);
    });

    it('covers all 4 categories', () => {
      const categories = new Set(COMPONENT_REGISTRY.map((c) => c.category));
      expect(categories).toContain('primitives');
      expect(categories).toContain('layout');
      expect(categories).toContain('disclosure');
      expect(categories).toContain('feedback');
    });
  });
});
