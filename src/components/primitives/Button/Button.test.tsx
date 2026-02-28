import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows aria-busy when loading', () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    expect(btn).toBeDisabled();
  });

  it('renders as child element via asChild', () => {
    render(
      <Button asChild variant="solid">
        <a href="/test">Link</a>
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Link' })).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[--btn-danger-bg]');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).not.toHaveClass('bg-[--btn-solid-bg]');
  });

  // ── Action failure scenarios ──────────────────────────────────────

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('does not fire onClick when loading', async () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Keyboard navigation ───────────────────────────────────────────

  it('triggers onClick via Enter key', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('triggers onClick via Space key', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is focusable via Tab key', async () => {
    const user = userEvent.setup();
    render(<Button>Focus me</Button>);
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  it('is not focusable when disabled', async () => {
    const user = userEvent.setup();
    render(<Button disabled>Disabled</Button>);
    await user.tab();
    expect(screen.getByRole('button')).not.toHaveFocus();
  });

  it('does not trigger onClick via Enter when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        No
      </Button>,
    );
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(onClick).not.toHaveBeenCalled();
  });

  // ── Variant & size props ──────────────────────────────────────────

  it('allows className override without losing variant styles', () => {
    render(
      <Button className="custom-class" variant="solid">
        Test
      </Button>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('custom-class');
    expect(btn).toHaveClass('bg-[--btn-solid-bg]');
  });

  it('applies all four variant classes correctly', () => {
    const { rerender } = render(<Button variant="solid">S</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[--btn-solid-bg]');

    rerender(<Button variant="ghost">G</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-[--btn-ghost-fg]');

    rerender(<Button variant="outline">O</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'border-[--btn-outline-border]',
    );

    rerender(<Button variant="danger">D</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-[--btn-danger-bg]');
  });

  it('applies all three size classes correctly', () => {
    const { rerender } = render(<Button size="sm">S</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-7');

    rerender(<Button size="lg">L</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-11');
  });

  // ── Icon-only ─────────────────────────────────────────────────────

  it('renders as square icon button with icon size', () => {
    render(
      <Button size="icon" aria-label="Settings">
        <span>X</span>
      </Button>,
    );
    expect(
      screen.getByRole('button', { name: 'Settings' }),
    ).toBeInTheDocument();
  });

  it('warns when icon size is used without aria-label', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Button size="icon">
        <span>X</span>
      </Button>,
    );
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('aria-label'));
    spy.mockRestore();
  });

  // ── ARIA attributes ───────────────────────────────────────────────

  it('defaults to type="button" to prevent accidental form submission', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('allows type override to submit', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('passes aria-label to the button element', () => {
    render(<Button aria-label="Close dialog">X</Button>);
    expect(
      screen.getByRole('button', { name: 'Close dialog' }),
    ).toBeInTheDocument();
  });

  it('passes aria-expanded to the button element', () => {
    render(<Button aria-expanded={true}>Toggle</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('has no aria-busy when not loading', () => {
    render(<Button>Normal</Button>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('renders spinner with status role when loading', () => {
    render(<Button loading>Saving</Button>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
