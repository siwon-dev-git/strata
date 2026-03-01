'use client';

import { AppShell } from '@/components/layout/AppShell/AppShell';
import {
  Sidebar,
  SidebarSection,
  SidebarItem,
} from '@/components/layout/Sidebar/Sidebar';
import { Container } from '@/components/layout/Container/Container';
import { TopBar } from '@/components/layout/TopBar/TopBar';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/disclosure/Tabs/Tabs';
import { Input } from '@/components/primitives/Input/Input';
import { Button } from '@/components/primitives/Button/Button';
import { FormField } from '@/components/primitives/FormField/FormField';
import { Heading } from '@/components/primitives/Heading/Heading';
import { Text } from '@/components/primitives/Text/Text';
import { Divider } from '@/components/primitives/Divider/Divider';
import { Switch } from '@/components/primitives/Switch/Switch';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/primitives/Select/Select';
import {
  IconSettings,
  IconUser,
  IconBell,
  IconLock,
  IconGlobe,
} from '@/components/primitives/Icon/Icon';

/**
 * SettingsPage Recipe
 *
 * Pattern: AppShell + Sidebar + Tabs + FormField
 * Use case: Application settings, user preferences, admin panels
 */
export function SettingsPage() {
  return (
    <AppShell>
      <Sidebar>
        <SidebarSection title="Settings">
          <SidebarItem icon={<IconUser size="sm" />} label="Profile" active />
          <SidebarItem icon={<IconBell size="sm" />} label="Notifications" />
          <SidebarItem icon={<IconLock size="sm" />} label="Security" />
          <SidebarItem icon={<IconGlobe size="sm" />} label="Language" />
          <SidebarItem icon={<IconSettings size="sm" />} label="Advanced" />
        </SidebarSection>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <TopBar>
          <Heading level={3}>Settings</Heading>
        </TopBar>
        <Container className="py-6">
          <TabsRoot defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6 pt-6">
              <div>
                <Heading level={4}>Profile Information</Heading>
                <Text color="muted">
                  Update your personal details and preferences.
                </Text>
              </div>
              <Divider />
              <div className="grid gap-4 max-w-lg">
                <FormField label="Display Name">
                  <Input placeholder="Enter your name" />
                </FormField>
                <FormField label="Email">
                  <Input type="email" placeholder="you@example.com" />
                </FormField>
                <FormField label="Language">
                  <SelectRoot>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ko">한국어</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                </FormField>
              </div>
              <div className="flex gap-2">
                <Button>Save Changes</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 pt-6">
              <div>
                <Heading level={4}>Notification Preferences</Heading>
                <Text color="muted">Choose how you want to be notified.</Text>
              </div>
              <Divider />
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Text>Email Notifications</Text>
                    <Text size="sm" color="muted">
                      Receive email updates
                    </Text>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Text>Push Notifications</Text>
                    <Text size="sm" color="muted">
                      Browser push notifications
                    </Text>
                  </div>
                  <Switch />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 pt-6">
              <div>
                <Heading level={4}>Security Settings</Heading>
                <Text color="muted">
                  Manage your password and security preferences.
                </Text>
              </div>
              <Divider />
              <div className="grid gap-4 max-w-lg">
                <FormField label="Current Password">
                  <Input type="password" placeholder="••••••••" />
                </FormField>
                <FormField label="New Password">
                  <Input type="password" placeholder="••••••••" />
                </FormField>
                <FormField label="Confirm Password">
                  <Input type="password" placeholder="••••••••" />
                </FormField>
              </div>
              <Button>Update Password</Button>
            </TabsContent>
          </TabsRoot>
        </Container>
      </div>
    </AppShell>
  );
}
