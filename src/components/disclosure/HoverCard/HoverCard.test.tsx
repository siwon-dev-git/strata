import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from './HoverCard';

describe('HoverCard', () => {
  it('renders trigger content', () => {
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Profile card</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
  });
});
