import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { TopBar } from './TopBar';

describe('TopBar', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders without crashing', () => {
    const { container } = render(<TopBar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<TopBar>Nav content</TopBar>);
    expect(screen.getByText('Nav content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <TopBar>
        <span>Logo</span>
        <nav>Links</nav>
      </TopBar>,
    );
    expect(screen.getByText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Links')).toBeInTheDocument();
  });

  // ── Semantic element ──────────────────────────────────────────────

  it('renders as a header element', () => {
    const { container } = render(<TopBar />);
    expect(container.firstChild?.nodeName).toBe('HEADER');
  });

  it('is accessible via banner landmark role', () => {
    render(<TopBar>Site header</TopBar>);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<TopBar className="sticky-top" />);
    expect(container.firstChild).toHaveClass('sticky-top');
  });

  it('preserves default layout classes when custom className is provided', () => {
    const { container } = render(<TopBar className="custom" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('items-center');
    expect(el).toHaveClass('shrink-0');
  });

  it('renders default layout and border classes', () => {
    const { container } = render(<TopBar />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('items-center');
    expect(el).toHaveClass('px-4');
    expect(el).toHaveClass('gap-3');
    expect(el).toHaveClass('border-b');
  });
});
