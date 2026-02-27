import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children in a flex column by default', () => {
    render(
      <Stack data-testid="stack">
        <div>A</div>
        <div>B</div>
      </Stack>,
    );
    const el = screen.getByTestId('stack');
    expect(el).toHaveClass('flex');
    expect(el).toHaveClass('flex-col');
  });

  it('renders as row when direction is row', () => {
    render(
      <Stack direction="row" data-testid="stack">
        <div>A</div>
      </Stack>,
    );
    expect(screen.getByTestId('stack')).toHaveClass('flex-row');
  });

  it('applies gap class', () => {
    render(
      <Stack gap={6} data-testid="stack">
        <div>A</div>
      </Stack>,
    );
    expect(screen.getByTestId('stack')).toHaveClass('gap-6');
  });
});
