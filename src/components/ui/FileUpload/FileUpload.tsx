'use client';

import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getDropzoneAccept, type FileCategory } from '@/lib/upload/upload-validation';

interface FileUploadProps {
  category: FileCategory;
  onFileSelect: (file: File) => void;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({ category, onFileSelect, disabled, className }: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: getDropzoneAccept(category),
    multiple: false,
    disabled,
    onDrop: (files) => {
      if (files[0]) onFileSelect(files[0]);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors',
        'hover:border-primary-500 border-(--border-default)',
        isDragActive && 'border-primary-500 bg-primary-50',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mb-2 h-8 w-8 text-(--text-muted)" />
      <p className="text-sm font-medium text-(--text-primary)">
        {isDragActive ? 'Drop file here' : 'Drag & drop or click to upload'}
      </p>
      <p className="mt-1 text-xs text-(--text-muted)">Supported formats: {category}</p>
    </div>
  );
}
