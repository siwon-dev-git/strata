# Icon

## Role

Base SVG icon wrapper and factory for 61 named icon components.

## Tier

2

## Tokens

- none (inherits `currentColor` from parent via `stroke="currentColor"`)

## Constraints

- Base `Icon` renders an SVG with `viewBox="0 0 24 24"`, stroke-based, `aria-hidden="true"`
- Size controlled via `SIZE_MAP` (sm: 16px | md: 20px | lg: 24px), default `md`
- `createIcon` factory generates named icon components with consistent props
- All icons use `fill="none"` and `strokeWidth={2}` with round caps/joins
- Icons are decorative (`aria-hidden`); pair with text or `aria-label` for meaning

## Composition

- `Icon` -> base SVG wrapper accepting children paths
- `createIcon(name, paths)` -> factory producing named icon components
- 61 named exports: `IconHome`, `IconSearch`, `IconSettings`, `IconPlus`, `IconChevronRight`, `IconHash`, `IconUser`, `IconBell`, `IconMail`, `IconStar`, `IconBookmark`, `IconHeart`, `IconMessageCircle`, `IconRepeat`, `IconMoreHorizontal`, `IconX`, `IconMenu`, `IconCheck`, `IconCircle`, `IconPlay`, `IconPause`, `IconSkipForward`, `IconSkipBack`, `IconVolume2`, `IconMusic`, `IconGrid`, `IconList`, `IconArrowLeft`, `IconFilter`, `IconInbox`, `IconFile`, `IconFolder`, `IconImage`, `IconLink`, `IconChevronDown`, `IconType`, `IconClock`, `IconShuffle`, `IconToggleRight`, `IconCode`, `IconHeadphones`, `IconEdit`, `IconTrash`, `IconCopy`, `IconEye`, `IconLock`, `IconGlobe`, `IconCalendar`, `IconMicrophone`, `IconSmile`, `IconPaperclip`, `IconGift`, `IconAtSign`, `IconArrowRight`, `IconArrowUp`, `IconArrowDown`, `IconRefresh`, `IconDownload`, `IconUpload`, `IconExternalLink`, `IconTerminal`

## History

- Sprint 1: Initial implementation
