import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { ErrorPage } from '@/components/ui/ErrorPage';

export default function NotFound() {
  return (
    <ErrorPage
      icon={FileQuestion}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={
        <Link
          href="/"
          className="bg-primary-500 hover:bg-primary-600 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          Go to Dashboard
        </Link>
      }
    />
  );
}
