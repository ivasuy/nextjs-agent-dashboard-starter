# Asset Management Standards

## Directory Structure

```
src/assets/
├── icons/          # SVG icons
├── images/         # Static images (logos, illustrations)
└── fonts/          # Custom fonts (if not using next/font)

public/
├── favicon.ico
├── og-image.png    # Open Graph image
└── robots.txt
```

## Icons

### Icon Component

All icons go through the centralized `Icon` component:

```tsx
import { Icon } from '@/components/ui/Icon';

<Icon name="campaigns" size="md" className="text-(--text-muted)" />
```

### Adding New Icons

1. Place SVG file in `src/assets/icons/`
2. Register in the icon map used by the `Icon` component
3. Use consistent naming: `kebab-case` (e.g., `arrow-right`, `chevron-down`)

### Icon Rules

- Use SVG format only -- never PNG/JPG for icons
- Remove hardcoded colors from SVGs -- use `currentColor` for fill/stroke
- Icons must be decorative (`aria-hidden="true"`) when accompanied by text
- Icons must have `aria-label` when used standalone

```tsx
// With text: decorative
<Button>
  <Icon name="plus" aria-hidden="true" />
  Add Campaign
</Button>

// Standalone: needs label
<Button aria-label="Delete campaign">
  <Icon name="trash" aria-hidden="true" />
</Button>
```

## Images

### next/image

Always use `next/image` for images:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.png"
  alt="Dashboard overview"
  width={1200}
  height={630}
  priority // Above-the-fold images only
/>
```

### User-Uploaded Images

Use the `ImageWithFallback` component for user-uploaded content:

```tsx
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

<ImageWithFallback
  src={brand.logoUrl}
  alt={`${brand.name} logo`}
  fallback="/images/placeholder-logo.png"
  width={64}
  height={64}
  className="rounded-(--radius-md)"
/>
```

### Image Optimization Rules

1. Use `next/image` -- never raw `<img>` tags
2. Always specify `width` and `height` to prevent layout shift
3. Use `priority` only for above-the-fold images
4. Use WebP format for production images where possible
5. Compress images before adding to the repository

## Fonts

### next/font

Fonts are loaded via `next/font` in the root layout:

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
```

### Font Rules

1. Use `next/font` for all fonts -- automatic optimization and self-hosting
2. Define font CSS variables for use in design tokens
3. Limit to 2 font families maximum (sans + mono)
4. Preload only the weights you use

## Static Assets in Public

Files in `public/` are served at the root URL:

```tsx
// public/og-image.png -> /og-image.png
<meta property="og:image" content="/og-image.png" />
```

Rules:
- Only put truly static, rarely-changing files in `public/`
- Do not put files that need optimization (use `src/assets/` + imports instead)
- Keep `public/` small -- large files increase deployment size

## File Upload Assets

User-uploaded files are handled by `@/lib/upload`:

```ts
import { uploadFile } from '@/lib/upload';

const result = await uploadFile(file, {
  maxSize: 5 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
});
```

Uploaded files are stored on the backend/CDN, not in the frontend repository.
