import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './ContextMenu';

describe('ContextMenu', () => {
  // ── Rendering ─────────────────────────────────────────────────────

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

  // ── Props ─────────────────────────────────────────────────────────

  it('trigger wraps child element with asChild', () => {
    render(
      <ContextMenuRoot>
        <ContextMenuTrigger asChild>
          <span data-testid="custom-trigger">Custom element</span>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Action</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>,
    );
    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger.tagName).toBe('SPAN');
    expect(trigger).toHaveTextContent('Custom element');
  });

  it('renders with custom className on trigger', () => {
    render(
      <ContextMenuRoot>
        <ContextMenuTrigger asChild>
          <div className="custom-ctx-class">Target area</div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuRoot>,
    );
    expect(screen.getByText('Target area')).toHaveClass('custom-ctx-class');
  });
});
