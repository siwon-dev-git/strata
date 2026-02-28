import {
  REDDIT_SUBREDDITS,
  REDDIT_POSTS,
  REDDIT_COMMENTS,
  type RedditComment as RedditCommentType,
} from '@/__fixtures__/strata-data';
import { Stack, TopBar } from '@/components/layout';
import {
  Card,
  CardBody,
  Avatar,
  Badge,
  Button,
  Text,
  Heading,
  Divider,
  Input,
  IconArrowUp,
  IconArrowDown,
  IconMessageCircle,
  IconSearch,
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from '@/components/primitives';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/disclosure';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  CommentNode — recursive comment tree                               */
/* ------------------------------------------------------------------ */

function CommentNode({
  comment,
  depth = 0,
}: {
  comment: RedditCommentType;
  depth?: number;
}) {
  return (
    <div className={cn('flex gap-0', depth > 0 && 'ml-6')}>
      {/* Depth indicator line */}
      {depth > 0 && (
        <div className="w-px bg-border-subtle shrink-0 mr-3 hover:bg-interactive transition-colors cursor-pointer" />
      )}

      <div className="flex-1 min-w-0">
        {/* Comment header */}
        <Stack direction="row" gap={2} align="center" className="mb-1">
          <Avatar name={comment.author} alt={comment.author} size="sm" />
          <Text as="span" size="xs" weight="bold" className="text-fg-default">
            {comment.author}
          </Text>
          <Text as="span" size="xs" color="subtle">
            {comment.timeAgo}
          </Text>
        </Stack>

        {/* Comment body */}
        <Text as="p" size="sm" className="text-fg-default mb-1.5">
          {comment.content}
        </Text>

        {/* Comment actions */}
        <Stack direction="row" gap={3} align="center" className="mb-3">
          <Stack direction="row" gap={1} align="center">
            <button
              type="button"
              className="text-fg-subtle hover:text-interactive transition-colors"
              aria-label="Upvote"
            >
              <IconArrowUp size="sm" />
            </button>
            <Text as="span" size="xs" weight="medium" className="text-fg-muted">
              {comment.upvotes}
            </Text>
            <button
              type="button"
              className="text-fg-subtle hover:text-danger transition-colors"
              aria-label="Downvote"
            >
              <IconArrowDown size="sm" />
            </button>
          </Stack>
          <button
            type="button"
            className="flex items-center gap-1 text-fg-subtle hover:text-fg-default transition-colors"
          >
            <IconMessageCircle size="sm" />
            <Text as="span" size="xs">
              Reply
            </Text>
          </button>
        </Stack>

        {/* Recursive replies */}
        {comment.replies.length > 0 && (
          <div>
            {comment.replies.map((reply) => (
              <CommentNode key={reply.id} comment={reply} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PostCard — individual post in the feed                             */
/* ------------------------------------------------------------------ */

function PostCard({
  post,
  isSelected,
  onSelect,
}: {
  post: (typeof REDDIT_POSTS)[number];
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={cn(
        'mb-3 cursor-pointer transition-colors',
        isSelected
          ? 'border-interactive bg-surface-raised'
          : 'hover:border-border-default',
      )}
    >
      <CardBody className="flex gap-3">
        {/* Vote column */}
        <div className="flex flex-col items-center gap-0.5 shrink-0 pt-1">
          <button
            type="button"
            className={cn(
              'transition-colors',
              post.isUpvoted
                ? 'text-interactive'
                : 'text-fg-subtle hover:text-interactive',
            )}
            aria-label="Upvote"
          >
            <IconArrowUp size="md" />
          </button>
          <Text
            as="span"
            size="sm"
            weight="bold"
            className={cn(
              post.isUpvoted && 'text-interactive',
              post.isDownvoted && 'text-danger',
            )}
          >
            {post.upvotes >= 1000
              ? `${(post.upvotes / 1000).toFixed(1)}k`
              : post.upvotes}
          </Text>
          <button
            type="button"
            className={cn(
              'transition-colors',
              post.isDownvoted
                ? 'text-danger'
                : 'text-fg-subtle hover:text-danger',
            )}
            aria-label="Downvote"
          >
            <IconArrowDown size="md" />
          </button>
        </div>

        {/* Post content */}
        <div
          className="flex-1 min-w-0"
          onClick={onSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSelect();
          }}
        >
          {/* Meta line */}
          <Stack
            direction="row"
            gap={2}
            align="center"
            className="mb-1 flex-wrap"
          >
            <Text as="span" size="xs" weight="bold" className="text-fg-muted">
              {post.subreddit}
            </Text>
            <Text as="span" size="xs" color="subtle">
              Posted by u/{post.author}
            </Text>
            <Text as="span" size="xs" color="subtle">
              {post.timeAgo}
            </Text>
            {post.flair && (
              <Badge size="sm" className={post.flair.color}>
                {post.flair.label}
              </Badge>
            )}
          </Stack>

          {/* Title */}
          <Heading level={5} className="mb-1.5">
            {post.title}
          </Heading>

          {/* Content preview */}
          <Text as="p" size="sm" color="muted" className="line-clamp-2 mb-2">
            {post.content}
          </Text>

          {/* Post footer */}
          <Stack direction="row" gap={4} align="center">
            <button
              type="button"
              className="flex items-center gap-1.5 text-fg-subtle hover:text-fg-default transition-colors"
            >
              <IconMessageCircle size="sm" />
              <Text as="span" size="xs" weight="medium">
                {post.commentCount} comments
              </Text>
            </button>
          </Stack>
        </div>
      </CardBody>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  RedditDemo — main layout                                           */
/* ------------------------------------------------------------------ */

export function RedditDemo() {
  const selectedSubreddit = REDDIT_SUBREDDITS[0];
  const selectedPostId = REDDIT_POSTS[0].id;
  const selectedPost = REDDIT_POSTS[0];
  const comments = REDDIT_COMMENTS[selectedPostId] ?? [];

  return (
    <div className="flex flex-col h-full bg-surface-inset">
      {/* ── Top Bar ──────────────────────────────────────────────── */}
      <TopBar className="bg-surface-base">
        <Stack
          direction="row"
          gap={3}
          align="center"
          className="flex-1 min-w-0"
        >
          {/* Reddit logo (inline SVG) */}
          <svg
            viewBox="0 0 20 20"
            className="w-8 h-8 text-interactive shrink-0"
            fill="currentColor"
            aria-label="Reddit logo"
          >
            <circle cx="10" cy="10" r="10" fill="currentColor" />
            <path
              d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.08 2.14.45a1 1 0 1 0 .13-.66l-2.4-.5a.37.37 0 0 0-.44.28l-.73 3.44a7.14 7.14 0 0 0-3.93 1.23A1.46 1.46 0 1 0 4.2 11.2a2.78 2.78 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.78 2.78 0 0 0 0-.44 1.46 1.46 0 0 0 .81-1.2zM7.27 11.57a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.6 2.76a3.58 3.58 0 0 1-2.84.87 3.58 3.58 0 0 1-2.84-.87.22.22 0 0 1 .31-.31 3.17 3.17 0 0 0 2.53.71 3.17 3.17 0 0 0 2.53-.71.22.22 0 0 1 .31.31zm-.2-1.76a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
              fill="var(--color-surface-base, white)"
            />
          </svg>

          <Text
            as="span"
            size="sm"
            weight="bold"
            className="text-fg-default shrink-0"
          >
            reddit
          </Text>

          {/* Search */}
          <div className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <IconSearch
                size="sm"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-fg-subtle pointer-events-none"
              />
              <Input
                size="sm"
                placeholder="Search Reddit"
                className="pl-8 rounded-full bg-surface-raised border-border-subtle"
              />
            </div>
          </div>

          {/* Auth button */}
          <Button variant="solid" size="sm" className="shrink-0">
            Log In
          </Button>
        </Stack>
      </TopBar>

      {/* ── Three-column layout ──────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">
        {/* ── Left sidebar: subreddit list ─────────────────────── */}
        <div className="w-[200px] bg-surface-base border-r border-border-subtle shrink-0 flex flex-col">
          <div className="px-3 py-3">
            <Text
              as="span"
              size="xs"
              weight="bold"
              className="text-fg-subtle uppercase tracking-wider"
            >
              My Communities
            </Text>
          </div>
          <ScrollAreaRoot className="flex-1">
            <ScrollAreaViewport className="h-full">
              <div className="px-1">
                {REDDIT_SUBREDDITS.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-left transition-colors',
                      sub.id === selectedSubreddit.id
                        ? 'bg-interactive-subtle text-interactive'
                        : 'text-fg-default hover:bg-surface-raised',
                    )}
                  >
                    <Avatar name={sub.name} alt={sub.name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <Text
                        as="span"
                        size="xs"
                        weight="medium"
                        className="block truncate"
                      >
                        {sub.name}
                      </Text>
                      <Text as="span" size="xs" color="subtle">
                        {sub.members >= 1000000
                          ? `${(sub.members / 1000000).toFixed(1)}M`
                          : sub.members >= 1000
                            ? `${(sub.members / 1000).toFixed(0)}k`
                            : sub.members}{' '}
                        members
                      </Text>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollAreaRoot>
        </div>

        {/* ── Center feed ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          <TabsRoot defaultValue="hot" className="flex flex-col flex-1 min-h-0">
            {/* Feed tabs */}
            <div className="bg-surface-base border-b border-border-subtle px-4">
              <TabsList>
                <TabsTrigger value="hot">Hot</TabsTrigger>
                <TabsTrigger value="new">New</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
                <TabsTrigger value="rising">Rising</TabsTrigger>
              </TabsList>
            </div>

            {/* Feed content */}
            <TabsContent value="hot" className="flex-1 min-h-0 mt-0">
              <ScrollAreaRoot className="h-full">
                <ScrollAreaViewport className="h-full">
                  <div className="p-4 max-w-2xl mx-auto">
                    {REDDIT_POSTS.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        isSelected={post.id === selectedPostId}
                        onSelect={() => {}}
                      />
                    ))}
                  </div>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar orientation="vertical">
                  <ScrollAreaThumb />
                </ScrollAreaScrollbar>
              </ScrollAreaRoot>
            </TabsContent>

            <TabsContent value="new" className="flex-1 min-h-0 mt-0">
              <div className="p-4 text-center">
                <Text as="p" size="sm" color="muted">
                  New posts will appear here
                </Text>
              </div>
            </TabsContent>

            <TabsContent value="top" className="flex-1 min-h-0 mt-0">
              <div className="p-4 text-center">
                <Text as="p" size="sm" color="muted">
                  Top posts will appear here
                </Text>
              </div>
            </TabsContent>

            <TabsContent value="rising" className="flex-1 min-h-0 mt-0">
              <div className="p-4 text-center">
                <Text as="p" size="sm" color="muted">
                  Rising posts will appear here
                </Text>
              </div>
            </TabsContent>
          </TabsRoot>
        </div>

        {/* ── Right sidebar: community info ────────────────────── */}
        <div className="w-[280px] bg-surface-base border-l border-border-subtle shrink-0">
          <ScrollAreaRoot className="h-full">
            <ScrollAreaViewport className="h-full">
              <div className="p-4">
                {/* Community info card */}
                <Card className="mb-4">
                  <div className="bg-interactive px-4 py-3 rounded-t-[--card-radius]">
                    <Heading level={6} className="text-fg-on-accent">
                      About Community
                    </Heading>
                  </div>
                  <CardBody>
                    <Text as="p" size="sm" color="muted" className="mb-3">
                      {selectedSubreddit.description}
                    </Text>
                    <Divider className="my-3" />
                    <Stack direction="row" gap={4} align="center">
                      <div>
                        <Text
                          as="span"
                          size="sm"
                          weight="bold"
                          className="block text-fg-default"
                        >
                          {selectedSubreddit.members >= 1000
                            ? `${(selectedSubreddit.members / 1000).toFixed(0)}k`
                            : selectedSubreddit.members}
                        </Text>
                        <Text as="span" size="xs" color="subtle">
                          Members
                        </Text>
                      </div>
                      <div>
                        <Text
                          as="span"
                          size="sm"
                          weight="bold"
                          className="block text-fg-default"
                        >
                          1.2k
                        </Text>
                        <Text as="span" size="xs" color="subtle">
                          Online
                        </Text>
                      </div>
                    </Stack>
                    <Divider className="my-3" />
                    <Button variant="solid" size="sm" className="w-full">
                      Join Community
                    </Button>
                  </CardBody>
                </Card>

                {/* Community rules card */}
                <Card className="mb-4">
                  <CardBody>
                    <Heading level={6} className="mb-3">
                      Community Rules
                    </Heading>
                    {[
                      'Be respectful and civil',
                      'No self-promotion or spam',
                      'Use descriptive titles',
                      'Add flair to your posts',
                      'No duplicate submissions',
                    ].map((rule, i) => (
                      <div key={rule} className="py-1.5">
                        <Text as="p" size="xs">
                          <Text as="span" size="xs" weight="bold">
                            {i + 1}.
                          </Text>{' '}
                          {rule}
                        </Text>
                        {i < 4 && <Divider className="mt-1.5" />}
                      </div>
                    ))}
                  </CardBody>
                </Card>

                {/* Selected post comments */}
                {comments.length > 0 && (
                  <Card>
                    <CardBody>
                      <Stack
                        direction="row"
                        gap={2}
                        align="center"
                        className="mb-3"
                      >
                        <IconMessageCircle
                          size="sm"
                          className="text-fg-muted"
                        />
                        <Heading level={6}>
                          Comments on &ldquo;{selectedPost.title.slice(0, 30)}
                          ...&rdquo;
                        </Heading>
                      </Stack>
                      <Divider className="mb-3" />
                      <div>
                        {comments.map((comment) => (
                          <CommentNode
                            key={comment.id}
                            comment={comment}
                            depth={0}
                          />
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar orientation="vertical">
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollAreaRoot>
        </div>
      </div>
    </div>
  );
}
