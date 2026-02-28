import type { Tweet } from '@/__fixtures__/strata-data';

import { Avatar } from '@/components/primitives';
import { Button } from '@/components/primitives';
import { Text } from '@/components/primitives';
import { Stack } from '@/components/layout';
import {
  IconMessageCircle,
  IconRepeat,
  IconHeart,
} from '@/components/primitives';
import { Badge } from '@/components/primitives';
import { IconCheck } from '@/components/primitives';

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function TweetCard({ tweet }: { tweet: Tweet }) {
  return (
    <div className="flex gap-3 p-4 border-b border-border-subtle hover:bg-surface-raised/50 transition-colors cursor-pointer">
      <Avatar name={tweet.author.name} alt={tweet.author.name} size="md" />
      <Stack direction="col" gap={1} className="flex-1 min-w-0">
        {/* Header */}
        <Stack direction="row" gap={1} align="center">
          <Text as="span" size="sm" weight="bold">
            {tweet.author.name}
          </Text>
          {tweet.author.verified && (
            <Badge variant="interactive" size="sm">
              <IconCheck size="sm" />
            </Badge>
          )}
          <Text as="span" size="sm" color="subtle">
            {tweet.author.handle}
          </Text>
          <Text as="span" size="sm" color="subtle">
            &middot;
          </Text>
          <Text as="span" size="sm" color="subtle">
            {tweet.timestamp}
          </Text>
        </Stack>

        {/* Content */}
        <Text as="p" size="sm" className="whitespace-pre-line">
          {tweet.content}
        </Text>

        {/* Actions */}
        <div className="flex justify-between max-w-100 mt-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-fg-subtle">
            <IconMessageCircle size="sm" />
            <Text as="span" size="xs" color="subtle">
              {formatCount(tweet.stats.replies)}
            </Text>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 text-fg-subtle">
            <IconRepeat size="sm" />
            <Text as="span" size="xs" color="subtle">
              {formatCount(tweet.stats.retweets)}
            </Text>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5 text-fg-subtle">
            <IconHeart size="sm" />
            <Text as="span" size="xs" color="subtle">
              {formatCount(tweet.stats.likes)}
            </Text>
          </Button>
          <Text
            as="span"
            size="xs"
            color="subtle"
            className="flex items-center"
          >
            {tweet.stats.views}
          </Text>
        </div>
      </Stack>
    </div>
  );
}
