import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Divider } from './Divider';

describe('Divider', () => {
  it('renders as separator role', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('defaults to horizontal orientation', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('supports vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });
});
