import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './ContextMenu';

describe('ContextMenu', () => {
  it('renders trigger content', () => {
    render(
      <ContextMenuRoot>
        <ContextMenuTrigger asChild>
          <div>Right-click me</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Edit</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>,
    );
    expect(screen.getByText('Right-click me')).toBeInTheDocument();
  });
});
