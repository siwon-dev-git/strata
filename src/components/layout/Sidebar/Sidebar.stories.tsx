import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  IconHome,
  IconSearch,
  IconSettings,
  IconInbox,
} from '@/components/primitives';

import { Sidebar, SidebarSection, SidebarItem } from './Sidebar';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[500px] flex">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarSection title="Navigation">
        <SidebarItem icon={<IconHome size="sm" />} label="Home" active />
        <SidebarItem icon={<IconSearch size="sm" />} label="Search" />
        <SidebarItem icon={<IconInbox size="sm" />} label="Inbox" badge={3} />
      </SidebarSection>
      <SidebarSection title="Settings">
        <SidebarItem icon={<IconSettings size="sm" />} label="Preferences" />
      </SidebarSection>
    </Sidebar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const homeItem = canvas.getByRole('button', { name: /home/i });
    await expect(homeItem).toBeInTheDocument();
    const inboxItem = canvas.getByRole('button', { name: /inbox/i });
    await expect(inboxItem).toBeInTheDocument();
  },
};

export const Collapsed: Story = {
  render: () => (
    <Sidebar collapsed>
      <SidebarSection title="Navigation">
        <SidebarItem icon={<IconHome size="sm" />} label="Home" active />
        <SidebarItem icon={<IconSearch size="sm" />} label="Search" />
        <SidebarItem icon={<IconInbox size="sm" />} label="Inbox" badge={3} />
      </SidebarSection>
    </Sidebar>
  ),
};
