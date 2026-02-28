import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select';

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(
      <SelectRoot>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows items when defaultOpen', () => {
    render(
      <SelectRoot defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
  });

  it('renders with a default value', () => {
    render(
      <SelectRoot defaultValue="b">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Bravo');
  });

  // ── Action failure scenarios ──────────────────────────────────────

  it('does not open when disabled', async () => {
    render(
      <SelectRoot disabled>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
  });

  it('calls onValueChange when item is selected', async () => {
    const onValueChange = vi.fn();
    render(
      <SelectRoot defaultOpen onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    await userEvent.click(screen.getByText('Alpha'));
    expect(onValueChange).toHaveBeenCalledWith('a');
  });
});
