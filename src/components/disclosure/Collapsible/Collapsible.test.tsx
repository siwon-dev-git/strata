import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';

describe('Collapsible', () => {
  it('renders the trigger', () => {
    render(
      <CollapsibleRoot>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </CollapsibleRoot>,
    );
    expect(screen.getByRole('button', { name: 'Toggle' })).toBeInTheDocument();
  });

  it('content toggles on click', async () => {
    render(
      <CollapsibleRoot>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Hidden content</CollapsibleContent>
      </CollapsibleRoot>,
    );
    // Content should not be visible initially
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();

    // Click trigger to open
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.getByText('Hidden content')).toBeInTheDocument();

    // Click trigger to close
    await userEvent.click(screen.getByRole('button', { name: 'Toggle' }));
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});
