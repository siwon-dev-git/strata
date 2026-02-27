import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Slider } from './Slider';

describe('Slider', () => {
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
});
