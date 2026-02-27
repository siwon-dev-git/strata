import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when no src', () => {
    render(<Avatar name="John Doe" alt="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders single initial for single name', () => {
    render(<Avatar name="Alice" alt="A" />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('renders img when src provided', () => {
    render(
      <Avatar
        name="Jane"
        alt="Jane avatar"
        src="https://example.com/jane.jpg"
      />,
    );
    const img = screen.getByAltText('Jane avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/jane.jpg');
  });
});
