import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Heading } from './Heading';

describe('Heading', () => {
  it('renders correct heading level', () => {
    render(<Heading level={3}>Title</Heading>);
    const el = screen.getByText('Title');
    expect(el.tagName).toBe('H3');
  });

  it('defaults to h2', () => {
    render(<Heading>Default</Heading>);
    const el = screen.getByText('Default');
    expect(el.tagName).toBe('H2');
  });

  it('supports as prop override', () => {
    render(
      <Heading level={2} as="h4">
        Override
      </Heading>,
    );
    const el = screen.getByText('Override');
    expect(el.tagName).toBe('H4');
    // Visually level 2, semantically h4
    expect(el.className).toContain('text-[length:--type-title]');
  });

  it('applies tracking-tight base class', () => {
    render(<Heading level={1}>Big</Heading>);
    const el = screen.getByText('Big');
    expect(el.className).toContain('tracking-tight');
  });
});
