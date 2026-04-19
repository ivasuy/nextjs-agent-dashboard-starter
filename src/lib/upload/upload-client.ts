import { apiClient } from '@/lib/api';

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface UploadFileOptions {
  file: File;
  endpoint: string;
  onProgress?: (progress: UploadProgress) => void;
  signal?: AbortSignal;
}

export async function uploadFile({
  file,
  endpoint,
  onProgress,
  signal,
}: UploadFileOptions): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    signal,
    onUploadProgress: (event) => {
      if (event.total && onProgress) {
        onProgress({
          loaded: event.loaded,
          total: event.total,
          percentage: Math.round((event.loaded / event.total) * 100),
        });
      }
    },
  });

  return response.data.data;
}
