'use client';

import { ErrorPage } from '@/components/ui/ErrorPage';
import { ServerCrash } from 'lucide-react';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <ErrorPage
      icon={ServerCrash}
      title="Something went wrong"
      description="An unexpected error occurred. Please try again."
      action={
        <button
          onClick={reset}
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          Try again
        </button>
      }
    />
  );
}
