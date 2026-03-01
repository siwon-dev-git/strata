/**
 * Self-Improvement Cycle — Gap detection and priority scoring.
 *
 * Analyzes usage patterns and identifies gaps in the design system.
 * Generates prioritized improvement suggestions for the sprint queue.
 */

export interface UsageEvent {
  type:
    | 'component_not_found'
    | 'token_overridden'
    | 'recipe_miss'
    | 'intent_miss';
  name: string;
  timestamp: number;
  context?: string;
}

export interface GapCandidate {
  type: UsageEvent['type'];
  name: string;
  frequency: number;
  firstSeen: number;
  lastSeen: number;
}

export interface PrioritizedGap extends GapCandidate {
  impact: number; // 1-10
  effort: number; // 1-10
  priority: number; // (impact x frequency) / effort
  suggestion: string;
}

const IMPACT_WEIGHTS: Record<UsageEvent['type'], number> = {
  component_not_found: 8,
  token_overridden: 5,
  recipe_miss: 6,
  intent_miss: 4,
};

const EFFORT_ESTIMATES: Record<UsageEvent['type'], number> = {
  component_not_found: 8,
  token_overridden: 3,
  recipe_miss: 5,
  intent_miss: 2,
};

/**
 * Aggregate usage events into gap candidates.
 * A gap is recognized when the same name appears 3+ times.
 */
export function detectGaps(
  events: UsageEvent[],
  threshold = 3,
): GapCandidate[] {
  const grouped = new Map<string, UsageEvent[]>();

  for (const event of events) {
    const key = `${event.type}:${event.name}`;
    const group = grouped.get(key) ?? [];
    group.push(event);
    grouped.set(key, group);
  }

  return Array.from(grouped.entries())
    .filter(([, group]) => group.length >= threshold)
    .map(([, group]) => ({
      type: group[0].type,
      name: group[0].name,
      frequency: group.length,
      firstSeen: Math.min(...group.map((e) => e.timestamp)),
      lastSeen: Math.max(...group.map((e) => e.timestamp)),
    }));
}

/**
 * Score and prioritize gaps.
 * Priority = (impact x frequency) / effort
 */
export function prioritizeGaps(gaps: GapCandidate[]): PrioritizedGap[] {
  return gaps
    .map((gap) => {
      const impact = IMPACT_WEIGHTS[gap.type] ?? 5;
      const effort = EFFORT_ESTIMATES[gap.type] ?? 5;
      const priority = (impact * gap.frequency) / effort;

      const suggestions: Record<UsageEvent['type'], string> = {
        component_not_found: `Create new component: ${gap.name}`,
        token_overridden: `Add semantic token or variant for: ${gap.name}`,
        recipe_miss: `Create recipe pattern for: ${gap.name}`,
        intent_miss: `Register new intent profile: ${gap.name}`,
      };

      return {
        ...gap,
        impact,
        effort,
        priority: Math.round(priority * 100) / 100,
        suggestion: suggestions[gap.type],
      };
    })
    .sort((a, b) => b.priority - a.priority);
}

/**
 * Format prioritized gaps as a sprint queue report.
 */
export function formatSprintQueue(gaps: PrioritizedGap[]): string {
  if (gaps.length === 0) return 'No gaps detected. System is healthy.';

  const lines = gaps.map(
    (gap, i) =>
      `${i + 1}. [P${gap.priority.toFixed(1)}] ${gap.suggestion} (seen ${gap.frequency}x, impact: ${gap.impact}/10, effort: ${gap.effort}/10)`,
  );

  return `Sprint Queue (${gaps.length} items):\n${lines.join('\n')}`;
}
