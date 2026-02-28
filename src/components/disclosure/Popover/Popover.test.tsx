import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from './Popover';

describe('Popover', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders trigger content', () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('trigger renders as a button by default', () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('does not show popover content by default', () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Hidden content</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  // ── Happy path ────────────────────────────────────────────────────

  it('shows popover content when trigger is clicked', async () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </PopoverRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popover body')).toBeInTheDocument();
  });

  it('hides popover content when trigger is clicked again', async () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </PopoverRoot>,
    );
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await userEvent.click(trigger);
    expect(screen.getByText('Popover body')).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
  });

  it('shows popover when defaultOpen is true', () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Always visible</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByText('Always visible')).toBeInTheDocument();
  });

  // ── PopoverClose ──────────────────────────────────────────────────

  it('renders PopoverClose as a button', () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverClose aria-label="Close" />
        </PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('closes popover when PopoverClose is clicked', async () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          Body
          <PopoverClose aria-label="Close" />
        </PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByText('Body')).not.toBeInTheDocument();
  });

  // ── Keyboard navigation ───────────────────────────────────────────

  it('closes popover on Escape key when open', async () => {
    render(
      <PopoverRoot defaultOpen>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByText('Popover body')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument();
  });

  it('opens popover via Enter key on focused trigger', async () => {
    const user = userEvent.setup();
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Keyboard content</PopoverContent>
      </PopoverRoot>,
    );
    screen.getByRole('button', { name: 'Open' }).focus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Keyboard content')).toBeInTheDocument();
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('trigger has aria-expanded false when closed', () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverRoot>,
    );
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('trigger has aria-expanded true when open', async () => {
    render(
      <PopoverRoot>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('calls onOpenChange when popover opens', async () => {
    const onOpenChange = vi.fn();
    render(
      <PopoverRoot onOpenChange={onOpenChange}>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </PopoverRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
