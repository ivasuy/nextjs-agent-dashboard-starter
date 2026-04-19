# Overflow Standards

## General Rules

1. Never allow content to overflow uncontrolled
2. Use Radix `ScrollArea` for custom-styled scrollable regions
3. Use `overflow-hidden` on containers with rounded corners to clip content
4. Use `overflow-x-auto` for horizontally scrollable tables
5. Use `truncate` for single-line text overflow with ellipsis

## Scrollable Containers

### Custom Scroll Areas

Use Radix ScrollArea for styled scrollbars:

```tsx
import { ScrollArea } from '@/components/ui/ScrollArea';

function NotificationList({ items }: Props) {
  return (
    <ScrollArea className="h-80">
      <div className="space-y-2 p-4">
        {items.map((item) => (
          <NotificationItem key={item.id} {...item} />
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Native Scroll

Use native scroll for simple cases:

```tsx
// Vertical scroll with max height
<div className="max-h-96 overflow-y-auto">
  {/* Content */}
</div>

// Horizontal scroll for tables
<div className="overflow-x-auto">
  <table className="min-w-full">
    {/* Table content */}
  </table>
</div>
```

## Text Overflow

### Single Line Truncation

```tsx
<p className="truncate">Long text that will be truncated with ellipsis</p>
```

### Multi-Line Clamping

```tsx
// Clamp to 2 lines
<p className="line-clamp-2">
  Long text that spans multiple lines and will be clamped at two lines
  with an ellipsis at the end.
</p>

// Clamp to 3 lines
<p className="line-clamp-3">Content here</p>
```

## Overflow with Rounded Corners

Always pair `rounded-*` with `overflow-hidden` on parent containers:

```tsx
// GOOD: Content clips to rounded corners
<div className="rounded-(--radius-lg) overflow-hidden">
  <img src={src} alt="" className="w-full" />
</div>

// BAD: Image corners extend beyond parent radius
<div className="rounded-(--radius-lg)">
  <img src={src} alt="" className="w-full" />
</div>
```

## Sidebar Overflow

The sidebar has a fixed height and scrollable content:

```tsx
<aside className="flex h-screen flex-col">
  <div className="p-4">{/* Logo, fixed header */}</div>
  <ScrollArea className="flex-1">
    <nav className="space-y-1 p-2">
      {/* Navigation items */}
    </nav>
  </ScrollArea>
  <div className="p-4">{/* Fixed footer */}</div>
</aside>
```

## Modal Overflow

Modals with long content use internal scroll:

```tsx
<Modal>
  <ModalHeader>{/* Fixed */}</ModalHeader>
  <div className="max-h-[60vh] overflow-y-auto p-6">
    {/* Scrollable body */}
  </div>
  <ModalFooter>{/* Fixed */}</ModalFooter>
</Modal>
```

## Data Table Overflow

```tsx
// Wrapper handles horizontal scroll on small screens
<div className="overflow-x-auto rounded-(--radius-lg) border border-(--border-default)">
  <table className="min-w-full divide-y divide-(--border-default)">
    {/* Table content */}
  </table>
</div>
```

## Scrollbar Styling

Custom scrollbar styles are defined globally in `globals.css`. The Radix `ScrollArea` component provides consistent cross-browser scrollbar styling.
