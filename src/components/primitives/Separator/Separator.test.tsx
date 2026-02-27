import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Separator } from './Separator';

describe('Separator', () => {
  it('renders as separator role', () => {
    render(<Separator decorative={false} />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('supports vertical orientation', () => {
    render(<Separator orientation="vertical" decorative={false} />);
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });
});
