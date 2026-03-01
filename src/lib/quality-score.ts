/**
 * Component Quality Scoring — Automated quality metrics per component.
 *
 * Scores components on: test coverage, test depth, story coverage,
 * token compliance, play functions, and documentation completeness.
 */

export interface QualityInput {
  name: string;
  hasTest: boolean;
  testLineCount: number;
  hasStory: boolean;
  hasPlayFunction: boolean;
  tokenCompliant: boolean; // No hardcoded colors
  hasJSDoc: boolean;
  hasTypeFile: boolean; // .type.ts exists
  hasMdFile: boolean; // .md documentation
}

export interface QualityScore {
  name: string;
  total: number; // 0-100
  breakdown: {
    testing: number; // 0-30 (test existence + depth)
    stories: number; // 0-20 (story + play function)
    tokens: number; // 0-20 (token compliance)
    docs: number; // 0-15 (JSDoc + .md)
    types: number; // 0-15 (type file)
  };
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

/**
 * Score a single component's quality.
 */
export function scoreComponent(input: QualityInput): QualityScore {
  const testing =
    (input.hasTest ? 15 : 0) + Math.min((input.testLineCount / 100) * 15, 15);
  const stories = (input.hasStory ? 10 : 0) + (input.hasPlayFunction ? 10 : 0);
  const tokens = input.tokenCompliant ? 20 : 0;
  const docs = (input.hasJSDoc ? 8 : 0) + (input.hasMdFile ? 7 : 0);
  const types = input.hasTypeFile ? 15 : 0;

  const total = Math.round(testing + stories + tokens + docs + types);

  let grade: QualityScore['grade'];
  if (total >= 90) grade = 'A';
  else if (total >= 75) grade = 'B';
  else if (total >= 60) grade = 'C';
  else if (total >= 40) grade = 'D';
  else grade = 'F';

  return {
    name: input.name,
    total,
    breakdown: {
      testing: Math.round(testing),
      stories: Math.round(stories),
      tokens: Math.round(tokens),
      docs: Math.round(docs),
      types: Math.round(types),
    },
    grade,
  };
}

/**
 * Score multiple components and return a summary report.
 */
export function scoreAll(inputs: QualityInput[]): {
  scores: QualityScore[];
  average: number;
  gradeDistribution: Record<QualityScore['grade'], number>;
} {
  const scores = inputs.map(scoreComponent);
  const average =
    scores.length > 0
      ? Math.round(scores.reduce((sum, s) => sum + s.total, 0) / scores.length)
      : 0;

  const gradeDistribution: Record<QualityScore['grade'], number> = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };
  for (const score of scores) {
    gradeDistribution[score.grade]++;
  }

  return { scores, average, gradeDistribution };
}

/**
 * Format quality scores as a markdown report.
 */
export function formatQualityReport(inputs: QualityInput[]): string {
  const { scores, average, gradeDistribution } = scoreAll(inputs);

  const sorted = [...scores].sort((a, b) => b.total - a.total);

  const lines = [
    `# Component Quality Report`,
    ``,
    `**Average Score:** ${average}/100`,
    `**Grade Distribution:** A:${gradeDistribution.A} B:${gradeDistribution.B} C:${gradeDistribution.C} D:${gradeDistribution.D} F:${gradeDistribution.F}`,
    ``,
    `| Component | Score | Grade | Test | Story | Token | Docs | Types |`,
    `|-----------|-------|-------|------|-------|-------|------|-------|`,
  ];

  for (const s of sorted) {
    const { breakdown: b } = s;
    lines.push(
      `| ${s.name} | ${s.total} | ${s.grade} | ${b.testing}/30 | ${b.stories}/20 | ${b.tokens}/20 | ${b.docs}/15 | ${b.types}/15 |`,
    );
  }

  return lines.join('\n');
}
