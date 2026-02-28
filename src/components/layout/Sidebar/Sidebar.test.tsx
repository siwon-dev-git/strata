import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';

describe('Sidebar', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders as aside element', () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    expect(container.firstChild?.nodeName).toBe('ASIDE');
  });

  it('renders children', () => {
    render(
      <Sidebar>
        <span>Nav items</span>
      </Sidebar>,
    );
    expect(screen.getByText('Nav items')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('renders with custom className', () => {
    const { container } = render(
      <Sidebar className="my-sidebar">Content</Sidebar>,
    );
    expect(container.firstChild).toHaveClass('my-sidebar');
  });

  it('supports collapsed state with overflow-hidden', () => {
    const { container } = render(<Sidebar collapsed>Content</Sidebar>);
    expect(container.firstChild).toHaveClass('overflow-hidden');
  });

  it('applies overflow-y-auto when not collapsed', () => {
    const { container } = render(<Sidebar>Content</Sidebar>);
    expect(container.firstChild).toHaveClass('overflow-y-auto');
  });
});

describe('SidebarSection', () => {
  it('renders title text', () => {
    render(
      <SidebarSection title="General">
        <div>Items</div>
      </SidebarSection>,
    );
    expect(screen.getByText('General')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <SidebarSection title="Section">
        <span>Child content</span>
      </SidebarSection>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});

describe('SidebarItem', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders label', () => {
    render(<SidebarItem label="Dashboard" />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('has button role', () => {
    render(<SidebarItem label="Settings" />);
    expect(
      screen.getByRole('button', { name: /Settings/ }),
    ).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('shows badge count', () => {
    render(<SidebarItem label="Inbox" badge={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('active state applies styling', () => {
    render(<SidebarItem label="Home" active />);
    const button = screen.getByRole('button', { name: /Home/ });
    expect(button).toHaveClass('font-medium');
  });

  // ── Actions / Callbacks ───────────────────────────────────────────

  it('calls onClick handler', async () => {
    const handleClick = vi.fn();
    render(<SidebarItem label="Click me" onClick={handleClick} />);
    await userEvent.click(screen.getByRole('button', { name: /Click me/ }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
