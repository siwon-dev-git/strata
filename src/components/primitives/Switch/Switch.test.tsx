import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Switch } from './Switch';

describe('Switch', () => {
  it('renders as a switch role', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('defaults to unchecked', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('respects defaultChecked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('calls onCheckedChange when toggled', async () => {
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn();
    render(<Switch disabled onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
