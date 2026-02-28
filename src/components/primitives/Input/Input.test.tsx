import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input, InputGroup } from './Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('accepts typed text', async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText('Type here');
    await userEvent.type(input, 'hello');
    expect(input).toHaveValue('hello');
  });

  it('respects disabled state', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });

  // ── Action failure scenarios ──────────────────────────────────────

  it('fires onPressEnter on Enter key', async () => {
    const onPressEnter = vi.fn();
    render(<Input placeholder="Search" onPressEnter={onPressEnter} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    await userEvent.keyboard('{Enter}');
    expect(onPressEnter).toHaveBeenCalledOnce();
  });

  it('does not fire onPressEnter on Shift+Enter', async () => {
    const onPressEnter = vi.fn();
    render(<Input placeholder="Search" onPressEnter={onPressEnter} />);
    const input = screen.getByPlaceholderText('Search');
    await userEvent.click(input);
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    expect(onPressEnter).not.toHaveBeenCalled();
  });

  it('sets aria-invalid when error is true', () => {
    render(<Input error placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).not.toHaveAttribute(
      'aria-invalid',
    );
  });
});

describe('InputGroup', () => {
  it('renders prefix and suffix slots', () => {
    render(
      <InputGroup
        prefix={<span data-testid="prefix">@</span>}
        suffix={<span data-testid="suffix">.com</span>}
      >
        <Input placeholder="email" />
      </InputGroup>,
    );
    expect(screen.getByTestId('prefix')).toHaveTextContent('@');
    expect(screen.getByTestId('suffix')).toHaveTextContent('.com');
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
  });
});
