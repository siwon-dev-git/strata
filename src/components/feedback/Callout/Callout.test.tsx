import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Callout } from './Callout';

describe('Callout', () => {
  it('renders children', () => {
    render(<Callout>Hello world</Callout>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Callout title="Important">Content here</Callout>);
    expect(screen.getByText('Important')).toBeInTheDocument();
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });
});
