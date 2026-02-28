import { describe, it, expect } from 'vitest';
import { scoreComponent, scoreAll, formatQualityReport } from './quality-score';
import type { QualityInput } from './quality-score';

const PERFECT_INPUT: QualityInput = {
  name: 'Button',
  hasTest: true,
  testLineCount: 150, // 15 (existence) + 15 (depth capped) = 30
  hasStory: true,
  hasPlayFunction: true,
  tokenCompliant: true,
  hasJSDoc: true,
  hasTypeFile: true,
  hasMdFile: true,
};

const MINIMAL_INPUT: QualityInput = {
  name: 'Spacer',
  hasTest: false,
  testLineCount: 0,
  hasStory: false,
  hasPlayFunction: false,
  tokenCompliant: false,
  hasJSDoc: false,
  hasTypeFile: false,
  hasMdFile: false,
};

describe('scoreComponent', () => {
  it('gives perfect score of 100 for fully complete component', () => {
    const result = scoreComponent(PERFECT_INPUT);
    expect(result.total).toBe(100);
    expect(result.grade).toBe('A');
  });

  it('gives score of 0 for minimal component', () => {
    const result = scoreComponent(MINIMAL_INPUT);
    expect(result.total).toBe(0);
    expect(result.grade).toBe('F');
  });

  it('calculates testing score correctly', () => {
    // Has test with 50 lines: 15 + (50/100 * 15) = 15 + 7.5 = 22.5 -> 23
    const input: QualityInput = {
      ...MINIMAL_INPUT,
      hasTest: true,
      testLineCount: 50,
    };
    const result = scoreComponent(input);
    expect(result.breakdown.testing).toBe(23);
  });

  it('caps test depth score at 15 for large test files', () => {
    const input: QualityInput = {
      ...MINIMAL_INPUT,
      hasTest: true,
      testLineCount: 500, // Would be 75 uncapped, but capped at 15
    };
    const result = scoreComponent(input);
    expect(result.breakdown.testing).toBe(30); // 15 + 15
  });

  it('calculates stories score: 10 for story, 10 for play function', () => {
    const storyOnly: QualityInput = { ...MINIMAL_INPUT, hasStory: true };
    const playOnly: QualityInput = { ...MINIMAL_INPUT, hasPlayFunction: true };
    const both: QualityInput = {
      ...MINIMAL_INPUT,
      hasStory: true,
      hasPlayFunction: true,
    };

    expect(scoreComponent(storyOnly).breakdown.stories).toBe(10);
    expect(scoreComponent(playOnly).breakdown.stories).toBe(10);
    expect(scoreComponent(both).breakdown.stories).toBe(20);
  });

  it('calculates token compliance as 20 or 0', () => {
    const compliant: QualityInput = { ...MINIMAL_INPUT, tokenCompliant: true };
    expect(scoreComponent(compliant).breakdown.tokens).toBe(20);
    expect(scoreComponent(MINIMAL_INPUT).breakdown.tokens).toBe(0);
  });

  it('calculates docs score: 8 for JSDoc, 7 for .md', () => {
    const jsdocOnly: QualityInput = { ...MINIMAL_INPUT, hasJSDoc: true };
    const mdOnly: QualityInput = { ...MINIMAL_INPUT, hasMdFile: true };
    const both: QualityInput = {
      ...MINIMAL_INPUT,
      hasJSDoc: true,
      hasMdFile: true,
    };

    expect(scoreComponent(jsdocOnly).breakdown.docs).toBe(8);
    expect(scoreComponent(mdOnly).breakdown.docs).toBe(7);
    expect(scoreComponent(both).breakdown.docs).toBe(15);
  });

  it('calculates type file score as 15 or 0', () => {
    const withType: QualityInput = { ...MINIMAL_INPUT, hasTypeFile: true };
    expect(scoreComponent(withType).breakdown.types).toBe(15);
    expect(scoreComponent(MINIMAL_INPUT).breakdown.types).toBe(0);
  });

  it('assigns grade A for score >= 90', () => {
    expect(scoreComponent(PERFECT_INPUT).grade).toBe('A');
  });

  it('assigns grade B for score 75-89', () => {
    // hasTest(15) + testLines100(15) + story(10) + play(10) + tokens(20) + jsdoc(8) = 78
    const input: QualityInput = {
      ...MINIMAL_INPUT,
      hasTest: true,
      testLineCount: 100,
      hasStory: true,
      hasPlayFunction: true,
      tokenCompliant: true,
      hasJSDoc: true,
    };
    const result = scoreComponent(input);
    expect(result.grade).toBe('B');
  });

  it('assigns grade C for score 60-74', () => {
    // hasTest(15) + testLines100(15) + story(10) + tokens(20) = 60
    const input: QualityInput = {
      ...MINIMAL_INPUT,
      hasTest: true,
      testLineCount: 100,
      hasStory: true,
      tokenCompliant: true,
    };
    const result = scoreComponent(input);
    expect(result.grade).toBe('C');
  });

  it('assigns grade D for score 40-59', () => {
    // hasTest(15) + testLines100(15) + story(10) = 40
    const input: QualityInput = {
      ...MINIMAL_INPUT,
      hasTest: true,
      testLineCount: 100,
      hasStory: true,
    };
    const result = scoreComponent(input);
    expect(result.grade).toBe('D');
  });

  it('assigns grade F for score < 40', () => {
    expect(scoreComponent(MINIMAL_INPUT).grade).toBe('F');
  });
});

describe('scoreAll', () => {
  it('returns scores, average, and grade distribution', () => {
    const inputs = [PERFECT_INPUT, MINIMAL_INPUT];
    const result = scoreAll(inputs);

    expect(result.scores).toHaveLength(2);
    expect(result.average).toBe(50); // (100 + 0) / 2
    expect(result.gradeDistribution.A).toBe(1);
    expect(result.gradeDistribution.F).toBe(1);
  });

  it('returns 0 average for empty input', () => {
    const result = scoreAll([]);
    expect(result.average).toBe(0);
    expect(result.scores).toHaveLength(0);
  });

  it('initializes all grades to 0', () => {
    const result = scoreAll([]);
    expect(result.gradeDistribution).toEqual({ A: 0, B: 0, C: 0, D: 0, F: 0 });
  });

  it('correctly distributes multiple components across grades', () => {
    const inputs: QualityInput[] = [
      PERFECT_INPUT,
      { ...PERFECT_INPUT, name: 'Button2' },
      MINIMAL_INPUT,
    ];
    const result = scoreAll(inputs);
    expect(result.gradeDistribution.A).toBe(2);
    expect(result.gradeDistribution.F).toBe(1);
  });
});

describe('formatQualityReport', () => {
  it('generates a markdown report with header and table', () => {
    const inputs = [PERFECT_INPUT, MINIMAL_INPUT];
    const report = formatQualityReport(inputs);

    expect(report).toContain('# Component Quality Report');
    expect(report).toContain('**Average Score:**');
    expect(report).toContain('**Grade Distribution:**');
    expect(report).toContain('| Component | Score | Grade |');
    expect(report).toContain('| Button |');
    expect(report).toContain('| Spacer |');
  });

  it('sorts components by score descending', () => {
    const inputs = [MINIMAL_INPUT, PERFECT_INPUT];
    const report = formatQualityReport(inputs);

    const buttonIndex = report.indexOf('Button');
    const spacerIndex = report.indexOf('Spacer');
    expect(buttonIndex).toBeLessThan(spacerIndex);
  });

  it('includes breakdown columns', () => {
    const report = formatQualityReport([PERFECT_INPUT]);
    expect(report).toContain('/30'); // testing max
    expect(report).toContain('/20'); // stories or tokens max
    expect(report).toContain('/15'); // docs or types max
  });

  it('handles empty input', () => {
    const report = formatQualityReport([]);
    expect(report).toContain('**Average Score:** 0/100');
  });
});
