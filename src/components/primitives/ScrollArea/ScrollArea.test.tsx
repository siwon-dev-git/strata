import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders children', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        <p>Hello scroll</p>
      </ScrollArea>,
    );
    expect(screen.getByText('Hello scroll')).toBeInTheDocument();
  });

  it('renders without crashing with many items', () => {
    render(
      <ScrollArea data-testid="scroll-area">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>Item {i}</div>
        ))}
      </ScrollArea>,
    );
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 49')).toBeInTheDocument();
  });

  it('supports horizontal orientation', () => {
    render(
      <ScrollArea orientation="horizontal" data-testid="scroll-area">
        <div>Wide content</div>
      </ScrollArea>,
    );
    expect(screen.getByText('Wide content')).toBeInTheDocument();
  });
});
