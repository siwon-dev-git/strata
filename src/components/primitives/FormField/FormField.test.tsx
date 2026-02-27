import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label and children', () => {
    render(
      <FormField label="Name">
        <input data-testid="input" />
      </FormField>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByTestId('input')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows description when no error', () => {
    render(
      <FormField label="Bio" description="Tell us about yourself.">
        <textarea />
      </FormField>,
    );
    expect(screen.getByText('Tell us about yourself.')).toBeInTheDocument();
  });

  it('shows error instead of description', () => {
    render(
      <FormField
        label="Bio"
        description="Tell us about yourself."
        error="Required field."
      >
        <textarea />
      </FormField>,
    );
    expect(screen.getByText('Required field.')).toBeInTheDocument();
    expect(
      screen.queryByText('Tell us about yourself.'),
    ).not.toBeInTheDocument();
  });
});
