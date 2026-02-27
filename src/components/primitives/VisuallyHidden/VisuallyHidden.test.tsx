import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders children accessible by text', () => {
    render(<VisuallyHidden>Hidden label</VisuallyHidden>);
    expect(screen.getByText('Hidden label')).toBeInTheDocument();
  });

  it('applies hidden styling', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>);
    const el = screen.getByText('Hidden');
    expect(el.className).toContain('absolute');
    expect(el.className).toContain('w-px');
    expect(el.className).toContain('h-px');
    expect(el.className).toContain('overflow-hidden');
  });

  it('renders as a span element', () => {
    render(<VisuallyHidden>Span check</VisuallyHidden>);
    expect(screen.getByText('Span check').tagName).toBe('SPAN');
  });
});
