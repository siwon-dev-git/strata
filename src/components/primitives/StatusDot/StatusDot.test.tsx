import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { StatusDot } from './StatusDot';

describe('StatusDot', () => {
  it('renders with status role', () => {
    render(<StatusDot status="online" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders correct aria-label for each status', () => {
    const { rerender } = render(<StatusDot status="online" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'online');

    rerender(<StatusDot status="idle" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'idle');

    rerender(<StatusDot status="dnd" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'dnd');

    rerender(<StatusDot status="offline" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'offline');
  });

  it('applies correct color class for status', () => {
    const { container } = render(<StatusDot status="online" />);
    expect((container.firstChild as HTMLElement).className).toContain(
      'bg-[--color-success]',
    );
  });

  it('defaults to md size', () => {
    const { container } = render(<StatusDot status="online" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('h-2.5');
    expect(el.className).toContain('w-2.5');
  });

  it('applies sm size', () => {
    const { container } = render(<StatusDot status="online" size="sm" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('h-2');
    expect(el.className).toContain('w-2');
  });

  it('applies custom className', () => {
    const { container } = render(
      <StatusDot status="offline" className="ml-2" />,
    );
    expect((container.firstChild as HTMLElement).className).toContain('ml-2');
  });
});
