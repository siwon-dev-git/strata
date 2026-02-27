import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title', () => {
    render(<EmptyState title="No results" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <EmptyState
        title="No results"
        description="Try a different search term."
      />,
    );
    expect(
      screen.getByText('Try a different search term.'),
    ).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<EmptyState title="Empty" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('renders icon when provided', () => {
    render(
      <EmptyState title="No data" icon={<svg data-testid="empty-icon" />} />,
    );
    expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState
        title="No items"
        action={<button type="button">Add item</button>}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Add item' }),
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <EmptyState title="Test" className="custom-empty" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain(
      'custom-empty',
    );
  });
});
