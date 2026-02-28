import { useState } from 'react';

import type { SpotifyTrack } from '@/__fixtures__/strata-data';
import {
  SPOTIFY_PLAYLISTS,
  SPOTIFY_ALBUMS,
  SPOTIFY_TRACKS,
  SPOTIFY_NAV,
} from '@/__fixtures__/strata-data';
import { SidebarSection, SidebarItem } from '@/components/layout';
import {
  Text,
  Button,
  IconHome,
  IconSearch,
  IconMusic,
  IconPlay,
  IconPause,
  IconSkipForward,
  IconSkipBack,
  IconShuffle,
  IconRepeat,
  IconVolume2,
  IconHeart,
} from '@/components/primitives';

// -- Nav icon map ----------------------------------------------------------------

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <IconHome size="sm" />,
  search: <IconSearch size="sm" />,
  music: <IconMusic size="sm" />,
};

// -- Component -------------------------------------------------------------------

export function SpotifyDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack>(
    SPOTIFY_TRACKS[0],
  );
  const [progress, setProgress] = useState(35);
  const [volume, setVolume] = useState(72);

  return (
    <div className="flex h-full flex-col bg-surface-base text-fg-default">
      {/* ── Upper region: sidebar + main ─────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Sidebar (240px) ──────────────────────────────────────── */}
        <aside className="w-60 shrink-0 flex flex-col border-r border-border-subtle bg-surface-base overflow-y-auto">
          {/* Nav links */}
          <div className="px-2 pt-4 pb-2">
            {SPOTIFY_NAV.map((item) => (
              <SidebarItem
                key={item.label}
                icon={NAV_ICONS[item.icon]}
                label={item.label}
                active={item.label === 'Home'}
              />
            ))}
          </div>

          {/* Playlists */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <SidebarSection title="Playlists">
              {SPOTIFY_PLAYLISTS.map((pl) => (
                <SidebarItem
                  key={pl.id}
                  icon={<IconMusic size="sm" />}
                  label={pl.name}
                  badge={pl.trackCount}
                />
              ))}
            </SidebarSection>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Greeting */}
          <Text as="h1" size="xl" weight="bold" className="mb-6">
            Good evening
          </Text>

          {/* Quick-play grid (top 4 albums as wide cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {SPOTIFY_ALBUMS.slice(0, 4).map((album) => (
              <button
                key={album.id}
                type="button"
                className="flex items-center gap-3 rounded-md bg-surface-raised hover:bg-surface-overlay transition-colors overflow-hidden group"
                onClick={() => {
                  const match = SPOTIFY_TRACKS.find(
                    (t) => t.album === album.title,
                  );
                  if (match) {
                    setCurrentTrack(match);
                    setIsPlaying(true);
                    setProgress(0);
                  }
                }}
              >
                <div
                  className={`h-12 w-12 shrink-0 ${album.coverColor}`}
                  aria-hidden="true"
                />
                <Text
                  as="span"
                  size="sm"
                  weight="semibold"
                  className="truncate pr-3"
                >
                  {album.title}
                </Text>
                {/* Play overlay on hover */}
                <span className="ml-auto mr-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-black shadow-lg">
                    <IconPlay size="sm" />
                  </span>
                </span>
              </button>
            ))}
          </div>

          {/* Made for you section */}
          <Text as="h2" size="lg" weight="bold" className="mb-4">
            Made for you
          </Text>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {SPOTIFY_ALBUMS.map((album) => (
              <button
                key={album.id}
                type="button"
                className="rounded-lg bg-surface-raised p-3 hover:bg-surface-overlay transition-colors cursor-pointer text-left group"
                onClick={() => {
                  const match = SPOTIFY_TRACKS.find(
                    (t) => t.album === album.title,
                  );
                  if (match) {
                    setCurrentTrack(match);
                    setIsPlaying(true);
                    setProgress(0);
                  }
                }}
              >
                {/* Cover art placeholder */}
                <div className="relative aspect-square rounded-md mb-3 overflow-hidden">
                  <div
                    className={`absolute inset-0 ${album.coverColor}`}
                    aria-hidden="true"
                  />
                  {/* Play button overlay */}
                  <span className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black shadow-lg">
                      <IconPlay size="md" />
                    </span>
                  </span>
                </div>
                <Text
                  as="span"
                  size="sm"
                  weight="semibold"
                  className="block truncate"
                >
                  {album.title}
                </Text>
                <Text as="span" size="xs" color="subtle" className="truncate">
                  {album.artist}
                </Text>
              </button>
            ))}
          </div>

          {/* Recently played section (track list) */}
          <Text as="h2" size="lg" weight="bold" className="mb-4">
            Recently played
          </Text>
          <div className="rounded-lg bg-surface-raised overflow-hidden">
            {SPOTIFY_TRACKS.map((track, idx) => (
              <button
                key={track.id}
                type="button"
                className={`flex w-full items-center gap-3 px-4 py-2 hover:bg-surface-overlay transition-colors ${
                  currentTrack.id === track.id
                    ? 'text-green-500'
                    : 'text-fg-default'
                }`}
                onClick={() => {
                  setCurrentTrack(track);
                  setIsPlaying(true);
                  setProgress(0);
                }}
              >
                <Text
                  as="span"
                  size="sm"
                  color="subtle"
                  className="w-6 text-right shrink-0"
                >
                  {idx + 1}
                </Text>
                <div
                  className={`h-10 w-10 rounded shrink-0 ${track.coverColor}`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0 text-left">
                  <Text
                    as="span"
                    size="sm"
                    weight="medium"
                    className="block truncate"
                  >
                    {track.title}
                  </Text>
                  <Text as="span" size="xs" color="subtle" className="truncate">
                    {track.artist}
                  </Text>
                </div>
                <Text as="span" size="xs" color="subtle" className="shrink-0">
                  {track.album}
                </Text>
                <Text
                  as="span"
                  size="xs"
                  color="subtle"
                  className="w-10 text-right shrink-0"
                >
                  {track.duration}
                </Text>
              </button>
            ))}
          </div>
        </main>
      </div>

      {/* ── Now Playing Bar (fixed bottom, 72px) ────────────────────── */}
      <footer className="h-18 shrink-0 border-t border-border-subtle bg-surface-raised flex items-center px-4 gap-4">
        {/* Left: current track info */}
        <div className="flex items-center gap-3 w-60 shrink-0 min-w-0">
          <div
            className={`h-12 w-12 rounded shrink-0 ${currentTrack.coverColor}`}
            aria-hidden="true"
          />
          <div className="min-w-0">
            <Text
              as="span"
              size="sm"
              weight="medium"
              className="block truncate"
            >
              {currentTrack.title}
            </Text>
            <Text as="span" size="xs" color="subtle" className="truncate">
              {currentTrack.artist}
            </Text>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0"
            aria-label="Like"
          >
            <IconHeart size="sm" />
          </Button>
        </div>

        {/* Center: playback controls + progress */}
        <div className="flex-1 flex flex-col items-center gap-1 max-w-150 mx-auto">
          {/* Controls row */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Shuffle"
              className="text-fg-muted hover:text-fg-default"
            >
              <IconShuffle size="sm" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Previous"
              onClick={() => {
                const idx = SPOTIFY_TRACKS.findIndex(
                  (t) => t.id === currentTrack.id,
                );
                const prev =
                  SPOTIFY_TRACKS[
                    (idx - 1 + SPOTIFY_TRACKS.length) % SPOTIFY_TRACKS.length
                  ];
                setCurrentTrack(prev);
                setProgress(0);
              }}
            >
              <IconSkipBack size="sm" />
            </Button>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-fg-default text-surface-base hover:scale-105 transition-transform"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <IconPause size="sm" /> : <IconPlay size="sm" />}
            </button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Next"
              onClick={() => {
                const idx = SPOTIFY_TRACKS.findIndex(
                  (t) => t.id === currentTrack.id,
                );
                const next = SPOTIFY_TRACKS[(idx + 1) % SPOTIFY_TRACKS.length];
                setCurrentTrack(next);
                setProgress(0);
              }}
            >
              <IconSkipForward size="sm" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Repeat"
              className="text-fg-muted hover:text-fg-default"
            >
              <IconRepeat size="sm" />
            </Button>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full">
            <Text as="span" size="xs" color="subtle" className="w-8 text-right">
              {formatTime(progress)}
            </Text>
            <div
              className="flex-1 h-1 rounded-full bg-surface-overlay cursor-pointer group"
              role="slider"
              aria-label="Playback progress"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = Math.round(
                  ((e.clientX - rect.left) / rect.width) * 100,
                );
                setProgress(Math.max(0, Math.min(100, pct)));
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight')
                  setProgress((p) => Math.min(100, p + 5));
                if (e.key === 'ArrowLeft')
                  setProgress((p) => Math.max(0, p - 5));
              }}
            >
              <div
                className="h-full rounded-full bg-fg-default group-hover:bg-green-500 transition-colors relative"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-fg-default opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <Text as="span" size="xs" color="subtle" className="w-8">
              {currentTrack.duration}
            </Text>
          </div>
        </div>

        {/* Right: volume */}
        <div className="flex items-center gap-2 w-40 shrink-0 justify-end">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Volume"
            onClick={() => setVolume((v) => (v > 0 ? 0 : 72))}
          >
            <IconVolume2 size="sm" />
          </Button>
          <div
            className="w-24 h-1 rounded-full bg-surface-overlay cursor-pointer group"
            role="slider"
            aria-label="Volume"
            aria-valuenow={volume}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(
                ((e.clientX - rect.left) / rect.width) * 100,
              );
              setVolume(Math.max(0, Math.min(100, pct)));
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight')
                setVolume((v) => Math.min(100, v + 5));
              if (e.key === 'ArrowLeft') setVolume((v) => Math.max(0, v - 5));
            }}
          >
            <div
              className="h-full rounded-full bg-fg-default group-hover:bg-green-500 transition-colors"
              style={{ width: `${volume}%` }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

// -- Helpers ---------------------------------------------------------------------

/** Convert a progress percentage (0-100) to a mm:ss timestamp. */
function formatTime(pct: number): string {
  // Assume current track ~4 min average → 240s
  const totalSec = Math.round((pct / 100) * 240);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
