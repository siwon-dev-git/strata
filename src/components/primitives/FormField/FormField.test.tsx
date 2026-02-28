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

  it('shows required indicator with sr-only text', () => {
    render(
      <FormField label="Email" required>
        <input />
      </FormField>,
    );
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('(required)')).toHaveClass('sr-only');
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

  it('error message has role="alert"', () => {
    render(
      <FormField label="Name" error="Required.">
        <input />
      </FormField>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Required.');
  });

  it('auto-generates htmlFor linking label to input via render-prop', () => {
    render(
      <FormField label="Username">
        {({ inputId }) => <input id={inputId} data-testid="linked-input" />}
      </FormField>,
    );
    const input = screen.getByTestId('linked-input');
    const label = screen.getByText('Username');
    expect(label).toHaveAttribute('for', input.id);
  });

  it('provides aria-describedby IDs via render-prop', () => {
    render(
      <FormField label="Email" description="We won't share it." error="Invalid.">
        {({ inputId, describedBy }) => (
          <input
            id={inputId}
            aria-describedby={describedBy}
            data-testid="described-input"
          />
        )}
      </FormField>,
    );
    const input = screen.getByTestId('described-input');
    const errorEl = screen.getByRole('alert');
    // When error is present, describedBy should include the error ID
    expect(input.getAttribute('aria-describedby')).toContain(errorEl.id);
  });
});
