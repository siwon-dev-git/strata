import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from './Collapsible';
import { Button } from '@/components/primitives';

const meta = {
  title: 'Disclosure/Collapsible',
  component: CollapsibleRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof CollapsibleRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CollapsibleRoot>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle content</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="p-4 text-fg-muted text-sm">
          This is the collapsible content. It can be toggled open and closed by
          clicking the trigger button above.
        </p>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
  args: { children: null },
};
