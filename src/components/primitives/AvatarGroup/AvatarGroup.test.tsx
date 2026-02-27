import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AvatarGroup } from './AvatarGroup';
import { Avatar } from '../Avatar/Avatar';

describe('AvatarGroup', () => {
  it('renders all avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="Alice Smith" alt="Alice" />
        <Avatar name="Bob Jones" alt="Bob" />
        <Avatar name="Carol White" alt="Carol" />
      </AvatarGroup>,
    );
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByText('BJ')).toBeInTheDocument();
    expect(screen.getByText('CW')).toBeInTheDocument();
  });

  it('shows overflow count when max exceeded', () => {
    render(
      <AvatarGroup max={3}>
        <Avatar name="Alice Smith" alt="Alice" />
        <Avatar name="Bob Jones" alt="Bob" />
        <Avatar name="Carol White" alt="Carol" />
        <Avatar name="David Brown" alt="David" />
        <Avatar name="Eve Davis" alt="Eve" />
      </AvatarGroup>,
    );
    // Only first 3 should be visible
    expect(screen.getByText('AS')).toBeInTheDocument();
    expect(screen.getByText('BJ')).toBeInTheDocument();
    expect(screen.getByText('CW')).toBeInTheDocument();
    // Overflow indicator shows "+2"
    expect(screen.getByText('+2')).toBeInTheDocument();
    expect(screen.getByLabelText('2 more')).toBeInTheDocument();
    // Hidden avatars should not render
    expect(screen.queryByText('DB')).not.toBeInTheDocument();
    expect(screen.queryByText('ED')).not.toBeInTheDocument();
  });
});
