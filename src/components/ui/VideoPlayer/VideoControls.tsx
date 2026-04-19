'use client';

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { cn } from '@/utils/cn';

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  isFullscreen: boolean;
  currentTime: number;
  duration: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onFullscreenToggle: () => void;
  onSeek: (time: number) => void;
  className?: string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function VideoControls({
  isPlaying,
  isMuted,
  isFullscreen,
  currentTime,
  duration,
  onPlayPause,
  onMuteToggle,
  onFullscreenToggle,
  onSeek,
  className,
}: VideoControlsProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-b-xl bg-black/80 px-4 py-2 backdrop-blur-sm',
        className,
      )}
    >
      <button
        onClick={onPlayPause}
        className="text-white transition-colors hover:text-white/80"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </button>

      <span className="min-w-[4rem] text-xs text-white/70">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>

      <div className="relative flex-1">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="accent-primary-500 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/30"
          aria-label="Seek"
        />
        <div
          className="bg-primary-500 pointer-events-none absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        onClick={onMuteToggle}
        className="text-white transition-colors hover:text-white/80"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>

      <button
        onClick={onFullscreenToggle}
        className="text-white transition-colors hover:text-white/80"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
      </button>
    </div>
  );
}
