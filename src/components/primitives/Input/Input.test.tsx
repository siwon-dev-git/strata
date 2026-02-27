import { describe, it, expect } from 'vitest';
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
