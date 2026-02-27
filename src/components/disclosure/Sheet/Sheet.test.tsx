import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { SheetRoot, SheetTrigger, SheetContent, SheetTitle } from './Sheet';

describe('Sheet', () => {
  it('renders trigger content', () => {
    render(
      <SheetRoot>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Open Sheet' }),
    ).toBeInTheDocument();
  });
});
