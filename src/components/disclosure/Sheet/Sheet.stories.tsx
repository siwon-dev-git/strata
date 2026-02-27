import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetTitle,
  SheetDescription,
} from './Sheet';
import { Button, Text } from '@/components/primitives';

const meta = {
  title: 'Disclosure/Sheet',
  component: SheetRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof SheetRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {
  args: { children: null },
  render: () => (
    <SheetRoot>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <SheetDescription>
            This is a sheet that slides in from the right side.
          </SheetDescription>
          <Text className="mt-4">
            Sheets are great for secondary content, filters, or navigation
            panels.
          </Text>
        </SheetBody>
      </SheetContent>
    </SheetRoot>
  ),
};

export const Left: Story = {
  args: { children: null },
  render: () => (
    <SheetRoot>
      <SheetTrigger asChild>
        <Button>Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <SheetDescription>
            This sheet slides in from the left side, perfect for navigation
            menus.
          </SheetDescription>
          <Text className="mt-4">
            Use the left sheet for sidebar navigation or menu panels.
          </Text>
        </SheetBody>
      </SheetContent>
    </SheetRoot>
  ),
};
