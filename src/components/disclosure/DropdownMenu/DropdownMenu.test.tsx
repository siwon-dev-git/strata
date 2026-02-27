import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './DropdownMenu';

describe('DropdownMenu', () => {
  it('renders trigger button', () => {
    render(
      <DropdownMenuRoot>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>,
    );
    expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
  });

  it('shows menu items when opened', async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenuRoot>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>,
    );

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }),
    ).toBeInTheDocument();
  });

  it('does not show menu items when closed', () => {
    render(
      <DropdownMenuRoot>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>,
    );
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });
});
