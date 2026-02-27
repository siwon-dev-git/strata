import type { Meta, StoryObj } from '@storybook/react-vite';

import { EmptyState } from './EmptyState';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const meta = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No results found',
    description:
      'Try adjusting your search or filter to find what you are looking for.',
    action: (
      <button
        type="button"
        className="rounded-md bg-[--color-interactive] px-3 py-1.5 text-sm font-medium text-white"
      >
        Clear filters
      </button>
    ),
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'No items yet',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'No notifications',
    description: 'You are all caught up! Check back later for new updates.',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <SearchIcon />,
    title: 'No search results',
    description: 'We could not find anything matching your query.',
  },
};
