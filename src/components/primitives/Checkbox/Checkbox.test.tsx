import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders as a checkbox role', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('defaults to unchecked', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('respects defaultChecked', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onCheckedChange when clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', async () => {
    const onChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
