import { describe, it, expect } from 'vitest';
import { detectGaps, prioritizeGaps, formatSprintQueue } from './self-improve';
import type { UsageEvent, GapCandidate } from './self-improve';

describe('detectGaps', () => {
  const baseTimestamp = 1709260800000; // 2024-03-01

  function makeEvents(
    type: UsageEvent['type'],
    name: string,
    count: number,
  ): UsageEvent[] {
    return Array.from({ length: count }, (_, i) => ({
      type,
      name,
      timestamp: baseTimestamp + i * 1000,
    }));
  }

  it('detects gaps meeting the default threshold of 3', () => {
    const events: UsageEvent[] = [
      ...makeEvents('component_not_found', 'DatePicker', 5),
      ...makeEvents('token_overridden', 'card-shadow', 2), // Below threshold
    ];

    const gaps = detectGaps(events);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].name).toBe('DatePicker');
    expect(gaps[0].frequency).toBe(5);
  });

  it('supports custom threshold', () => {
    const events = makeEvents('token_overridden', 'card-shadow', 2);
    const gaps = detectGaps(events, 2);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].name).toBe('card-shadow');
  });

  it('groups events by type and name', () => {
    const events: UsageEvent[] = [
      ...makeEvents('component_not_found', 'DatePicker', 3),
      ...makeEvents('recipe_miss', 'DatePicker', 3),
    ];

    const gaps = detectGaps(events);
    expect(gaps).toHaveLength(2);
  });

  it('tracks firstSeen and lastSeen correctly', () => {
    const events: UsageEvent[] = [
      { type: 'intent_miss', name: 'dark-mode', timestamp: 1000 },
      { type: 'intent_miss', name: 'dark-mode', timestamp: 3000 },
      { type: 'intent_miss', name: 'dark-mode', timestamp: 2000 },
    ];

    const gaps = detectGaps(events);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].firstSeen).toBe(1000);
    expect(gaps[0].lastSeen).toBe(3000);
  });

  it('returns empty array when no events meet threshold', () => {
    const events = makeEvents('component_not_found', 'Rare', 1);
    const gaps = detectGaps(events);
    expect(gaps).toHaveLength(0);
  });

  it('returns empty array for empty input', () => {
    expect(detectGaps([])).toHaveLength(0);
  });
});

describe('prioritizeGaps', () => {
  it('scores component_not_found with impact 8, effort 8', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'component_not_found',
        name: 'DatePicker',
        frequency: 5,
        firstSeen: 0,
        lastSeen: 1000,
      },
    ];

    const result = prioritizeGaps(gaps);
    expect(result).toHaveLength(1);
    expect(result[0].impact).toBe(8);
    expect(result[0].effort).toBe(8);
    expect(result[0].priority).toBe(5); // (8 * 5) / 8 = 5
  });

  it('scores intent_miss with impact 4, effort 2', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'intent_miss',
        name: 'dark-mode',
        frequency: 10,
        firstSeen: 0,
        lastSeen: 1000,
      },
    ];

    const result = prioritizeGaps(gaps);
    expect(result[0].impact).toBe(4);
    expect(result[0].effort).toBe(2);
    expect(result[0].priority).toBe(20); // (4 * 10) / 2 = 20
  });

  it('sorts by priority descending', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'component_not_found',
        name: 'A',
        frequency: 3,
        firstSeen: 0,
        lastSeen: 1000,
      },
      {
        type: 'intent_miss',
        name: 'B',
        frequency: 10,
        firstSeen: 0,
        lastSeen: 1000,
      },
      {
        type: 'token_overridden',
        name: 'C',
        frequency: 6,
        firstSeen: 0,
        lastSeen: 1000,
      },
    ];

    const result = prioritizeGaps(gaps);
    expect(result[0].name).toBe('B'); // (4*10)/2 = 20
    expect(result[1].name).toBe('C'); // (5*6)/3 = 10
    expect(result[2].name).toBe('A'); // (8*3)/8 = 3
  });

  it('generates correct suggestions per type', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'component_not_found',
        name: 'DatePicker',
        frequency: 3,
        firstSeen: 0,
        lastSeen: 0,
      },
      {
        type: 'token_overridden',
        name: 'card-shadow',
        frequency: 3,
        firstSeen: 0,
        lastSeen: 0,
      },
      {
        type: 'recipe_miss',
        name: 'data-table',
        frequency: 3,
        firstSeen: 0,
        lastSeen: 0,
      },
      {
        type: 'intent_miss',
        name: 'corporate',
        frequency: 3,
        firstSeen: 0,
        lastSeen: 0,
      },
    ];

    const result = prioritizeGaps(gaps);
    const suggestions = result.map((r) => r.suggestion);
    expect(suggestions).toContain('Create new component: DatePicker');
    expect(suggestions).toContain(
      'Add semantic token or variant for: card-shadow',
    );
    expect(suggestions).toContain('Create recipe pattern for: data-table');
    expect(suggestions).toContain('Register new intent profile: corporate');
  });

  it('returns empty array for empty input', () => {
    expect(prioritizeGaps([])).toHaveLength(0);
  });
});

describe('formatSprintQueue', () => {
  it('returns healthy message for empty gaps', () => {
    const result = formatSprintQueue([]);
    expect(result).toBe('No gaps detected. System is healthy.');
  });

  it('formats gaps as numbered list with priority', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'intent_miss',
        name: 'dark-mode',
        frequency: 10,
        firstSeen: 0,
        lastSeen: 1000,
      },
      {
        type: 'component_not_found',
        name: 'DatePicker',
        frequency: 5,
        firstSeen: 0,
        lastSeen: 1000,
      },
    ];

    const prioritized = prioritizeGaps(gaps);
    const report = formatSprintQueue(prioritized);

    expect(report).toContain('Sprint Queue (2 items):');
    expect(report).toContain('1.');
    expect(report).toContain('2.');
    expect(report).toContain('seen 10x');
    expect(report).toContain('impact:');
    expect(report).toContain('effort:');
  });

  it('includes item count in header', () => {
    const gaps: GapCandidate[] = [
      {
        type: 'recipe_miss',
        name: 'form-layout',
        frequency: 4,
        firstSeen: 0,
        lastSeen: 0,
      },
    ];

    const prioritized = prioritizeGaps(gaps);
    const report = formatSprintQueue(prioritized);
    expect(report).toContain('Sprint Queue (1 items):');
  });
});
