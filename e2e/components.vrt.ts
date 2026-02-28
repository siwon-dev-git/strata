import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Strata components.
 *
 * Captures screenshots of Storybook stories and compares against baselines.
 * Run: npx playwright test
 * Update baselines: npx playwright test --update-snapshots
 */

// Primitive components
const PRIMITIVE_STORIES = [
  { name: 'Button', id: 'primitives-button--default' },
  { name: 'Input', id: 'primitives-input--default' },
  { name: 'Select', id: 'primitives-select--default' },
  { name: 'Checkbox', id: 'primitives-checkbox--default' },
  { name: 'Switch', id: 'primitives-switch--default' },
  { name: 'Slider', id: 'primitives-slider--default' },
  { name: 'Badge', id: 'primitives-badge--default' },
  { name: 'Avatar', id: 'primitives-avatar--default' },
  { name: 'Card', id: 'primitives-card--default' },
  { name: 'Table', id: 'primitives-table--default' },
  { name: 'Spinner', id: 'primitives-spinner--default' },
  { name: 'Icon', id: 'primitives-icon--default' },
];

// Layout components
const LAYOUT_STORIES = [
  { name: 'Sidebar', id: 'layout-sidebar--default' },
  { name: 'TopBar', id: 'layout-topbar--default' },
  { name: 'Container', id: 'layout-container--default' },
  { name: 'Stack', id: 'layout-stack--default' },
];

// Disclosure components
const DISCLOSURE_STORIES = [
  { name: 'Dialog', id: 'disclosure-dialog--default' },
  { name: 'Sheet', id: 'disclosure-sheet--right' },
  { name: 'Accordion', id: 'disclosure-accordion--single' },
  { name: 'Tabs', id: 'disclosure-tabs--default' },
  { name: 'Tooltip', id: 'disclosure-tooltip--default' },
];

// Feedback components
const FEEDBACK_STORIES = [
  { name: 'Alert', id: 'feedback-alert--default' },
  { name: 'Toast', id: 'feedback-toast--default' },
  { name: 'Skeleton', id: 'feedback-skeleton--default' },
  { name: 'EmptyState', id: 'feedback-emptystate--default' },
];

const ALL_STORIES = [
  ...PRIMITIVE_STORIES,
  ...LAYOUT_STORIES,
  ...DISCLOSURE_STORIES,
  ...FEEDBACK_STORIES,
];

for (const { name, id } of ALL_STORIES) {
  test(`${name} — dark mode`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&globals=mode:dark`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name.toLowerCase()}-dark.png`, {
      maxDiffPixelRatio: 0.01,
    });
  });

  test(`${name} — light mode`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${id}&globals=mode:light`);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`${name.toLowerCase()}-light.png`, {
      maxDiffPixelRatio: 0.01,
    });
  });
}
