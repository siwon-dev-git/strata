import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Callout } from './Callout';

describe('Callout', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders children', () => {
    render(<Callout>Hello world</Callout>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Callout title="Important">Content here</Callout>);
    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(
      <Callout icon={<span data-testid="callout-icon">!</span>}>
        Message
      </Callout>,
    );
    expect(screen.getByTestId('callout-icon')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('applies info variant classes by default', () => {
    const { container } = render(<Callout>Default variant</Callout>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('bg-blue-500/10');
    expect(el).toHaveClass('border-blue-500/30');
  });

  it('applies danger variant classes', () => {
    const { container } = render(
      <Callout variant="danger">Error message</Callout>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('bg-red-500/10');
    expect(el).toHaveClass('border-red-500/30');
  });

  it('applies warning variant classes', () => {
    const { container } = render(
      <Callout variant="warning">Warning message</Callout>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('bg-yellow-500/10');
    expect(el).toHaveClass('border-yellow-500/30');
  });

  it('applies success variant classes', () => {
    const { container } = render(
      <Callout variant="success">Success message</Callout>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('bg-green-500/10');
    expect(el).toHaveClass('border-green-500/30');
  });

  it('applies custom className', () => {
    const { container } = render(
      <Callout className="my-custom-class">Styled</Callout>,
    );
    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
