'use client';

import Image from 'next/image';
import { FileText, X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FileUploadPreviewProps {
  file: File;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
  onRemove: () => void;
  className?: string;
}

export function FileUploadPreview({
  file,
  preview,
  progress,
  isUploading,
  error,
  onRemove,
  className,
}: FileUploadPreviewProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border border-(--border-default) p-3',
        error && 'border-error',
        className,
      )}
    >
      {/* Thumbnail */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-(--bg-muted)">
        {preview ? (
          <Image src={preview} alt={file.name} fill unoptimized className="object-cover" />
        ) : (
          <FileText className="h-6 w-6 text-(--text-muted)" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-(--text-primary)">{file.name}</p>
        <p className="text-xs text-(--text-muted)">{(file.size / 1024).toFixed(1)} KB</p>

        {/* Progress bar */}
        {isUploading && (
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-(--bg-muted)">
            <div
              className="bg-primary-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Error */}
        {error && <p className="text-error mt-1 text-xs">{error}</p>}
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-md p-1 text-(--text-muted) transition-colors hover:bg-(--bg-muted) hover:text-(--text-primary)"
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
