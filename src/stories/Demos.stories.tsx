import type { Meta, StoryObj } from '@storybook/react-vite';

import { DiscordDemo } from '@/demos/discord/DiscordDemo';
import { FigmaDemo } from '@/demos/figma/FigmaDemo';
import { GitHubDemo } from '@/demos/github/GitHubDemo';
import { LinearDemo } from '@/demos/linear/LinearDemo';
import { NotionDemo } from '@/demos/notion/NotionDemo';
import { SlackDemo } from '@/demos/slack/SlackDemo';
import { SpotifyDemo } from '@/demos/spotify/SpotifyDemo';
import { TwitterDemo } from '@/demos/twitter/TwitterDemo';
import { TrelloDemo } from '@/demos/trello/TrelloDemo';
import { VSCodeDemo } from '@/demos/vscode/VSCodeDemo';
import { CharacterChatDemo } from '@/demos/character-chat/CharacterChatDemo';

const meta = {
  title: 'Demos',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  render: () => <LinearDemo />,
};

export const Twitter: Story = {
  render: () => <TwitterDemo />,
};

export const Slack: Story = {
  render: () => <SlackDemo />,
  parameters: { layout: 'fullscreen' },
};

export const Notion: Story = {
  render: () => <NotionDemo />,
  parameters: { layout: 'fullscreen' },
};

export const Spotify: Story = {
  render: () => <SpotifyDemo />,
  parameters: { layout: 'fullscreen' },
};

export const GitHub: Story = {
  render: () => <GitHubDemo />,
  parameters: { layout: 'fullscreen' },
};

export const Discord: Story = {
  render: () => <DiscordDemo />,
  parameters: { layout: 'fullscreen' },
};

export const Figma: Story = {
  render: () => <FigmaDemo />,
  parameters: { layout: 'fullscreen' },
};

export const VSCode: Story = {
  render: () => <VSCodeDemo />,
  parameters: { layout: 'fullscreen' },
};

export const Trello: Story = {
  render: () => <TrelloDemo />,
  parameters: { layout: 'fullscreen' },
};

export const CharacterChat: Story = {
  render: () => <CharacterChatDemo />,
  parameters: { layout: 'fullscreen' },
};
