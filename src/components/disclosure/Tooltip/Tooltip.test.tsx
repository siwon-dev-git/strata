import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger element', () => {
    render(
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>,
    );
    expect(
      screen.getByRole('button', { name: 'Hover me' }),
    ).toBeInTheDocument();
  });

  it('does not show tooltip content by default (requires hover)', () => {
    render(
      <TooltipProvider>
        <TooltipRoot>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Hidden tooltip</TooltipContent>
        </TooltipRoot>
      </TooltipProvider>,
    );
    expect(screen.queryByText('Hidden tooltip')).not.toBeInTheDocument();
  });

  it('wraps children correctly in TooltipProvider', () => {
    const { container } = render(
      <TooltipProvider>
        <span data-testid="child">Hello</span>
      </TooltipProvider>,
    );
    expect(container).toBeTruthy();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
