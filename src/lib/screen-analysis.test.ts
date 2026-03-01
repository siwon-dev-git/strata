import { describe, it, expect } from 'vitest';
import { analysisToJSX, validateAnalysis } from './screen-analysis';
import type { ScreenAnalysis } from './screen-analysis';

describe('screen-analysis', () => {
  const sampleAnalysis: ScreenAnalysis = {
    layout: { type: 'sidebar-main', hasSidebar: true },
    components: [
      {
        name: 'Sidebar',
        region: { x: 0, y: 0, width: 0.2, height: 1 },
        props: { collapsed: false },
        confidence: 0.9,
        children: [
          {
            name: 'SidebarItem',
            region: { x: 0, y: 0.1, width: 0.2, height: 0.05 },
            props: { label: 'Home', active: true },
            confidence: 0.85,
          },
        ],
      },
      {
        name: 'Card',
        region: { x: 0.25, y: 0.1, width: 0.7, height: 0.3 },
        props: { variant: 'elevated' },
        confidence: 0.8,
      },
    ],
    theme: {
      mode: 'dark',
      density: 'comfortable',
      accentHue: 250,
      radiusStyle: 'md',
    },
    confidence: 0.85,
  };

  describe('analysisToJSX', () => {
    it('generates valid JSX with imports', () => {
      const jsx = analysisToJSX(sampleAnalysis);
      expect(jsx).toContain('import {');
      expect(jsx).toContain("from '@siwon-dev-npm/strata'");
      expect(jsx).toContain('Sidebar');
      expect(jsx).toContain('Card');
    });

    it('uses AppShell wrapper for sidebar-main layout', () => {
      const jsx = analysisToJSX(sampleAnalysis);
      expect(jsx).toContain('<AppShell>');
    });

    it('uses Container wrapper for centered layout', () => {
      const centered: ScreenAnalysis = {
        ...sampleAnalysis,
        layout: { type: 'centered' },
      };
      const jsx = analysisToJSX(centered);
      expect(jsx).toContain('<Container>');
    });

    it('renders component props', () => {
      const jsx = analysisToJSX(sampleAnalysis);
      expect(jsx).toContain('collapsed={false}');
    });
  });

  describe('validateAnalysis', () => {
    it('validates correct analysis object', () => {
      expect(validateAnalysis(sampleAnalysis)).toBe(true);
    });

    it('rejects null', () => {
      expect(validateAnalysis(null)).toBe(false);
    });

    it('rejects missing layout', () => {
      const invalid = { ...sampleAnalysis, layout: undefined };
      expect(validateAnalysis(invalid)).toBe(false);
    });

    it('rejects confidence out of range', () => {
      const invalid = { ...sampleAnalysis, confidence: 1.5 };
      expect(validateAnalysis(invalid)).toBe(false);
    });
  });
});
