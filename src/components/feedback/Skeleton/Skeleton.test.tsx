import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default text variant', () => {
    const { container } = render(<Skeleton />);
    const el = container.firstElementChild!;
    expect(el).toHaveClass('animate-pulse');
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders circle variant', () => {
    const { container } = render(
      <Skeleton variant="circle" width={40} height={40} />,
    );
    const el = container.firstElementChild!;
    expect(el).toHaveClass('rounded-full');
  });

  it('applies custom width and height via style', () => {
    const { container } = render(
      <Skeleton variant="rect" width={200} height={100} />,
    );
    const el = container.firstElementChild!;
    expect(el).toHaveStyle({ width: '200px', height: '100px' });
  });
});
