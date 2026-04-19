# Accessibility Standards

## Target

WCAG 2.1 Level AA compliance for all features.

## Semantic HTML

Use the correct HTML element for the job:

```tsx
// GOOD: Semantic elements
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/campaigns">Campaigns</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Campaign Details</h1>
    <section aria-labelledby="metrics-heading">
      <h2 id="metrics-heading">Metrics</h2>
    </section>
  </article>
</main>

// BAD: Divs for everything
<div className="nav">
  <div onClick={navigate}>Campaigns</div>
</div>
```

## ARIA Attributes

### Labels

Every interactive element must have an accessible name:

```tsx
// Text label
<Button>Save Campaign</Button>

// Icon-only button
<Button aria-label="Close dialog">
  <Icon name="x" aria-hidden="true" />
</Button>

// Input with label
<label htmlFor="campaign-name">Campaign Name</label>
<Input id="campaign-name" />
```

### Live Regions

Announce dynamic content changes:

```tsx
// Toast notifications use aria-live automatically via Sonner
// For custom announcements:
<div role="status" aria-live="polite">
  {successMessage}
</div>

// Urgent announcements
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### States

Communicate element states:

```tsx
<Button aria-disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>

<nav aria-label="Tabs">
  <button role="tab" aria-selected={isActive} aria-controls={panelId}>
    Tab Label
  </button>
</nav>
```

## Keyboard Navigation

### Focus Management

```tsx
// Auto-focus first input in dialogs
<Dialog onOpenChange={setOpen}>
  <DialogContent>
    <Input autoFocus />
  </DialogContent>
</Dialog>

// Return focus after closing dialog
// Radix handles this automatically
```

### Focus Visible

Style focus indicators clearly:

```tsx
// CVA variant includes focus styles
'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-primary)'
```

### Keyboard Shortcuts

- `Tab`: Move focus forward
- `Shift+Tab`: Move focus backward
- `Enter`/`Space`: Activate buttons and links
- `Escape`: Close dialogs and popovers
- `Arrow keys`: Navigate within lists, tabs, menus

### Focus Trap

Dialogs and modals must trap focus. Radix Dialog handles this automatically.

## Color and Contrast

- Minimum contrast ratio: 4.5:1 for normal text, 3:1 for large text
- Never rely on color alone to convey information -- pair with icons or text
- Design tokens are tested for contrast compliance

```tsx
// GOOD: Color + icon + text
<Badge variant="error">
  <Icon name="alert-circle" aria-hidden="true" />
  Error
</Badge>

// BAD: Color only
<span className="text-error">Error</span>
```

## Screen Readers

### Hidden Content

```tsx
// Visually hidden but screen-reader accessible
<span className="sr-only">Sort ascending</span>

// Decorative content hidden from screen readers
<Icon name="chevron" aria-hidden="true" />
```

### Skip Links

The layout includes a skip-to-content link:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Tables

```tsx
<table>
  <caption className="sr-only">Campaign performance data</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Status</th>
      <th scope="col">Budget</th>
    </tr>
  </thead>
</table>
```

## Form Accessibility

```tsx
<FormField
  name="name"
  label="Campaign Name"
  description="Enter a unique campaign name"
  error={errors.name?.message}
>
  <Input
    id="name"
    aria-describedby="name-description name-error"
    aria-invalid={!!errors.name}
  />
</FormField>
```

## Reduced Motion

```tsx
import { useReducedMotion } from 'framer-motion';

function AnimatedCard() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div {...(shouldReduce ? fadeIn : fadeInUp)}>
      <Card />
    </motion.div>
  );
}
```

## Testing

Use the `@/lib/a11y` utilities for automated checks. Manually test with:
- VoiceOver (macOS)
- Keyboard-only navigation
- Browser accessibility inspector
