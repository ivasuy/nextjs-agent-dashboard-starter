'use client';

import { useState, useCallback, useRef } from 'react';
import { uploadFile } from '@/lib/upload/upload-client';
import { validateFile, type FileCategory } from '@/lib/upload/upload-validation';

interface FileUploadState {
  file: File | null;
  preview: string | null;
  progress: number;
  isUploading: boolean;
  error: string | null;
  url: string | null;
}

const initialState: FileUploadState = {
  file: null,
  preview: null,
  progress: 0,
  isUploading: false,
  error: null,
  url: null,
};

export function useFileUpload(category: FileCategory, endpoint: string) {
  const [state, setState] = useState<FileUploadState>(initialState);
  const abortRef = useRef<AbortController | null>(null);

  const upload = useCallback(
    async (file: File) => {
      const validation = validateFile(file, category);
      if (!validation.valid) {
        setState((prev) => ({
          ...prev,
          error: validation.error ?? 'Invalid file',
        }));
        return;
      }

      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;

      setState({
        file,
        preview,
        progress: 0,
        isUploading: true,
        error: null,
        url: null,
      });

      abortRef.current = new AbortController();

      try {
        const result = await uploadFile({
          file,
          endpoint,
          onProgress: (p) => {
            setState((prev) => ({ ...prev, progress: p.percentage }));
          },
          signal: abortRef.current.signal,
        });
        setState((prev) => ({
          ...prev,
          isUploading: false,
          progress: 100,
          url: result.url,
        }));
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setState((prev) => ({
            ...prev,
            isUploading: false,
            error: 'Upload failed',
          }));
        }
      }
    },
    [category, endpoint],
  );

  const cancel = useCallback(() => {
    abortRef.current?.abort();
    setState(initialState);
  }, []);

  const reset = useCallback(() => {
    if (state.preview) URL.revokeObjectURL(state.preview);
    setState(initialState);
  }, [state.preview]);

  return { ...state, upload, cancel, reset };
}
