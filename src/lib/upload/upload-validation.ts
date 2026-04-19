export const FILE_RULES = {
  image: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxWidth: 4096,
    maxHeight: 4096,
  },
  video: {
    maxSize: 100 * 1024 * 1024, // 100MB
    accept: ['video/mp4', 'video/webm'],
  },
  document: {
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
} as const;

export type FileCategory = keyof typeof FILE_RULES;

interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateFile(file: File, category: FileCategory): ValidationResult {
  const rules = FILE_RULES[category];

  if (file.size > rules.maxSize) {
    const maxMB = rules.maxSize / (1024 * 1024);
    return { valid: false, error: `File exceeds ${maxMB}MB limit` };
  }

  if (!(rules.accept as readonly string[]).includes(file.type)) {
    return { valid: false, error: 'File type not supported' };
  }

  return { valid: true };
}

export function getAcceptString(category: FileCategory): string {
  return FILE_RULES[category].accept.join(',');
}

/**
 * Build the `accept` object expected by react-dropzone.
 * Maps each MIME type to an empty extensions array (dropzone infers extensions).
 */
export function getDropzoneAccept(category: FileCategory): Record<string, string[]> {
  const rules = FILE_RULES[category];
  const accept: Record<string, string[]> = {};
  for (const mime of rules.accept) {
    accept[mime] = [];
  }
  return accept;
}
