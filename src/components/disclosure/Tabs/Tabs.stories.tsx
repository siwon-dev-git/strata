import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './Tabs';

const meta = {
  title: 'Disclosure/Tabs',
  component: TabsRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof TabsRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TabsRoot defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Overview content goes here. This is the main summary panel.
      </TabsContent>
      <TabsContent value="activity">
        Activity feed showing recent actions and events.
      </TabsContent>
      <TabsContent value="settings">
        Settings panel with configuration options.
      </TabsContent>
    </TabsRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify first tab is active
    const overviewTab = canvas.getByRole('tab', { name: /overview/i });
    await expect(overviewTab).toHaveAttribute('data-state', 'active');
    await expect(canvas.getByText(/overview content/i)).toBeVisible();

    // Click second tab
    const activityTab = canvas.getByRole('tab', { name: /activity/i });
    await userEvent.click(activityTab);

    // Verify second content is visible
    await expect(canvas.getByText(/activity feed/i)).toBeVisible();
  },
};

export const ManyTabs: Story = {
  render: () => (
    <TabsRoot defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">General</TabsTrigger>
        <TabsTrigger value="tab2">Profile</TabsTrigger>
        <TabsTrigger value="tab3">Security</TabsTrigger>
        <TabsTrigger value="tab4">Notifications</TabsTrigger>
        <TabsTrigger value="tab5">Integrations</TabsTrigger>
        <TabsTrigger value="tab6">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">General settings and preferences.</TabsContent>
      <TabsContent value="tab2">Profile information and avatar.</TabsContent>
      <TabsContent value="tab3">
        Security and authentication options.
      </TabsContent>
      <TabsContent value="tab4">
        Notification preferences and channels.
      </TabsContent>
      <TabsContent value="tab5">Third-party integrations and APIs.</TabsContent>
      <TabsContent value="tab6">
        Advanced configuration and developer tools.
      </TabsContent>
    </TabsRoot>
  ),
};
