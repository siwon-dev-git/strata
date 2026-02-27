import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from './Menubar';

describe('Menubar', () => {
  it('renders menubar role', () => {
    render(
      <MenubarRoot>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>,
    );
    expect(screen.getByRole('menubar')).toBeInTheDocument();
  });

  it('renders menu triggers', () => {
    render(
      <MenubarRoot>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </MenubarRoot>,
    );
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
  });
});
