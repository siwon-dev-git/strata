import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Label } from './Label';

describe('Label', () => {
  it('renders label text', () => {
    render(<Label>Email address</Label>);
    expect(screen.getByText('Email address')).toBeInTheDocument();
  });

  it('has correct htmlFor attribute', () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText('Email')).toHaveAttribute('for', 'email-input');
  });
});
