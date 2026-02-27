import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Badge variant="success">Done</Badge>);
    expect(container.firstChild?.textContent).toBe('Done');
  });

  it('applies size class', () => {
    const { container } = render(<Badge size="md">Medium</Badge>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('text-xs');
  });
});
