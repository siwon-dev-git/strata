import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs', () => {
  it('renders with first tab active by default', () => {
    render(
      <TabsRoot defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </TabsRoot>,
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches tab on click', async () => {
    render(
      <TabsRoot defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </TabsRoot>,
    );
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });
});
