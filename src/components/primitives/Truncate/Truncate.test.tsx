import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Truncate } from './Truncate';

describe('Truncate', () => {
  it('renders children', () => {
    render(<Truncate>Some text</Truncate>);
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('applies truncate class for single line', () => {
    render(<Truncate>Overflow text</Truncate>);
    const el = screen.getByText('Overflow text');
    expect(el.className).toContain('truncate');
  });
});
