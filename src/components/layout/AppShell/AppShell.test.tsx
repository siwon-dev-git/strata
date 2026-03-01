import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AppShell } from './AppShell';

describe('AppShell', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders without crashing', () => {
    const { container } = render(<AppShell />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<AppShell>Main content</AppShell>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('renders multiple children', () => {
    render(
      <AppShell>
        <div>Sidebar</div>
        <div>Content</div>
      </AppShell>,
    );
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<AppShell className="custom-shell" />);
    expect(container.firstChild).toHaveClass('custom-shell');
  });

  it('preserves default layout classes when custom className is provided', () => {
    const { container } = render(<AppShell className="custom-shell" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('h-screen');
    expect(el).toHaveClass('w-screen');
    expect(el).toHaveClass('overflow-hidden');
  });

  // ── Semantic element ──────────────────────────────────────────────

  it('renders as a div element', () => {
    const { container } = render(<AppShell />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders with flex layout classes by default', () => {
    const { container } = render(<AppShell />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('overflow-hidden');
  });
});
