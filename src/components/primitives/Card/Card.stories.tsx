import type { Meta, StoryObj } from '@storybook/react-vite';

import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

const meta = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <Text as="h3" size="lg" weight="semibold">
          Card Title
        </Text>
      </CardHeader>
      <CardBody>
        <Text size="sm" color="muted">
          This is a basic card with header, body, and footer sections.
        </Text>
      </CardBody>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card variant="interactive" className="w-80">
      <CardBody>
        <Text as="h3" size="lg" weight="semibold">
          Clickable Card
        </Text>
        <Text size="sm" color="muted" className="mt-2">
          Hover to see the interactive state.
        </Text>
      </CardBody>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {['Design', 'Develop', 'Deploy'].map((title) => (
        <Card key={title} variant="interactive">
          <CardBody>
            <Text weight="semibold">{title}</Text>
            <Text size="xs" color="muted" className="mt-1">
              Learn more about {title.toLowerCase()}.
            </Text>
          </CardBody>
        </Card>
      ))}
    </div>
  ),
};
