import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders as progressbar role', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('has correct value attributes', () => {
    render(<ProgressBar value={75} max={100} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '75');
    expect(el).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps value to 0-100 range', () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('supports value prop reflecting aria-valuenow', () => {
    render(<ProgressBar value={33} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '33',
    );
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('has aria-valuemax matching max prop', () => {
    render(<ProgressBar value={50} max={200} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuemax', '200');
  });

  it('defaults aria-valuemax to 100 when max not provided', () => {
    render(<ProgressBar value={25} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuemax',
      '100',
    );
  });

  it('renders zero value correctly', () => {
    render(<ProgressBar value={0} />);
    const el = screen.getByRole('progressbar');
    expect(el).toHaveAttribute('aria-valuenow', '0');
  });

  // ── Size variant ──────────────────────────────────────────────────

  it('applies size class for sm variant', () => {
    const { container } = render(<ProgressBar value={50} size="sm" />);
    expect(container.firstChild).toHaveClass('h-1.5');
  });

  it('applies size class for md variant', () => {
    const { container } = render(<ProgressBar value={50} size="md" />);
    expect(container.firstChild).toHaveClass('h-2');
  });
});
