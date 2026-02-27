import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders as progressbar role', () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

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
});
