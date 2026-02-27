import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PopoverRoot, PopoverTrigger, PopoverContent } from './Popover';

describe('Popover', () => {
  it('renders trigger content', () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });
});
