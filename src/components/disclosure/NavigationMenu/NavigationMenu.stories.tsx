import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './NavigationMenu';

const meta = {
  title: 'Disclosure/NavigationMenu',
  component: NavigationMenuRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenuRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <NavigationMenuRoot>
      <NavigationMenuList>
        {/* Getting Started — with dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 w-[320px] p-2">
              <NavigationMenuLink href="#introduction">
                <div className="font-medium text-sm">Introduction</div>
                <p className="text-xs text-fg-muted mt-0.5">
                  A quick overview of the design system and its principles.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#installation">
                <div className="font-medium text-sm">Installation</div>
                <p className="text-xs text-fg-muted mt-0.5">
                  How to install and configure the library in your project.
                </p>
              </NavigationMenuLink>
              <NavigationMenuLink href="#usage">
                <div className="font-medium text-sm">Usage</div>
                <p className="text-xs text-fg-muted mt-0.5">
                  Basic usage patterns and best practices.
                </p>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Components — with dropdown */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-1 w-[280px] p-2">
              <NavigationMenuLink href="#primitives">
                Primitives
              </NavigationMenuLink>
              <NavigationMenuLink href="#layout">Layout</NavigationMenuLink>
              <NavigationMenuLink href="#disclosure">
                Disclosure
              </NavigationMenuLink>
              <NavigationMenuLink href="#feedback">Feedback</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Documentation — simple link */}
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuRoot>
  ),
};
