import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from './NavigationMenu';

describe('NavigationMenu', () => {
  it('renders navigation element', () => {
    render(
      <NavigationMenuRoot>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#home">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
