import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('renders as SVG element', () => {
    render(<Spinner />);
    expect(screen.getByRole('status').tagName).toBe('svg');
  });

  it('applies size class', () => {
    render(<Spinner size="lg" />);
    const el = screen.getByRole('status');
    expect(el.getAttribute('class')).toContain('h-8');
  });
});
