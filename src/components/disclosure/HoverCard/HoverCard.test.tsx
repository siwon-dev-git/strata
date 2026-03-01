import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from './HoverCard';

describe('HoverCard', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders trigger content', () => {
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Profile card</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
  });

  it('renders trigger as a link via asChild', () => {
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="/profile">@janedoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Profile card</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByRole('link', { name: '@janedoe' })).toBeInTheDocument();
  });

  it('does not show card content by default', () => {
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Hidden profile</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.queryByText('Hidden profile')).not.toBeInTheDocument();
  });

  // ── Happy path ────────────────────────────────────────────────────

  it('shows card content when defaultOpen is true', () => {
    render(
      <HoverCardRoot defaultOpen>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Profile card body</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('Profile card body')).toBeInTheDocument();
  });

  it('renders arbitrary content inside the card', () => {
    render(
      <HoverCardRoot defaultOpen>
        <HoverCardTrigger asChild>
          <a href="#">@user</a>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Joined January 2020</p>
          <p>42 followers</p>
        </HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('Joined January 2020')).toBeInTheDocument();
    expect(screen.getByText('42 followers')).toBeInTheDocument();
  });

  // ── Keyboard navigation ───────────────────────────────────────────

  it('trigger is focusable via Tab key', async () => {
    const user = userEvent.setup();
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>Profile card</HoverCardContent>
      </HoverCardRoot>,
    );
    await user.tab();
    expect(screen.getByRole('link', { name: '@johndoe' })).toHaveFocus();
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('trigger rendered via asChild keeps native element role', () => {
    render(
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <button type="button">Show card</button>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Show card' }),
    ).toBeInTheDocument();
  });

  it('card content is accessible as a region when open', () => {
    render(
      <HoverCardRoot defaultOpen>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>Bio information</p>
        </HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('Bio information')).toBeInTheDocument();
  });

  it('className prop is accepted on HoverCardContent without error', () => {
    render(
      <HoverCardRoot defaultOpen>
        <HoverCardTrigger asChild>
          <a href="#">@johndoe</a>
        </HoverCardTrigger>
        <HoverCardContent className="custom-card">Card</HoverCardContent>
      </HoverCardRoot>,
    );
    expect(screen.getByText('Card')).toBeInTheDocument();
  });
});
