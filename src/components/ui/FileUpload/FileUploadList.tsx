'use client';

import { FileUploadPreview } from './FileUploadPreview';
import { cn } from '@/utils/cn';

interface FileItem {
  file: File;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
}

interface FileUploadListProps {
  items: FileItem[];
  onRemove: (index: number) => void;
  className?: string;
}

export function FileUploadList({ items, onRemove, className }: FileUploadListProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {items.map((item, index) => (
        <FileUploadPreview
          key={`${item.file.name}-${item.file.lastModified}`}
          file={item.file}
          preview={item.preview}
          progress={item.progress}
          isUploading={item.isUploading}
          error={item.error}
          onRemove={() => onRemove(index)}
        />
      ))}
    </div>
  );
}
