import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Slider } from './Slider';

describe('Slider', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders as slider role', () => {
    render(<Slider defaultValue={[50]} max={100} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('has correct default value', () => {
    render(<Slider defaultValue={[30]} max={100} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '30');
  });

  it('respects disabled state', () => {
    render(<Slider defaultValue={[50]} disabled />);
    expect(screen.getByRole('slider')).toHaveAttribute('data-disabled');
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('has aria-valuemin and aria-valuemax attributes', () => {
    render(<Slider defaultValue={[50]} min={0} max={100} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('supports min/max props', () => {
    render(<Slider defaultValue={[25]} min={10} max={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '10');
    expect(slider).toHaveAttribute('aria-valuemax', '50');
    expect(slider).toHaveAttribute('aria-valuenow', '25');
  });

  it('supports step prop', () => {
    render(<Slider defaultValue={[50]} max={100} step={10} />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  // ── Range (multiple thumbs) ───────────────────────────────────────

  it('renders multiple thumbs for range slider', () => {
    render(<Slider defaultValue={[20, 80]} max={100} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(2);
    expect(sliders[0]).toHaveAttribute('aria-valuenow', '20');
    expect(sliders[1]).toHaveAttribute('aria-valuenow', '80');
  });
});
