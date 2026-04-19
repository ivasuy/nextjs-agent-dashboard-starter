import { Inbox } from 'lucide-react';

interface DataTableEmptyProps {
  title?: string;
  description?: string;
}

export function DataTableEmpty({
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
}: DataTableEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-neutral-100 p-3">
        <Inbox className="h-6 w-6 text-(--text-muted)" />
      </div>
      <h3 className="text-base font-semibold text-(--text-primary)">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-(--text-secondary)">{description}</p>
    </div>
  );
}
