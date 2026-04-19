# Naming Conventions

## Files

| Type | Convention | Example |
|---|---|---|
| Component | PascalCase | `Button.tsx`, `CampaignCard.tsx` |
| Variants | PascalCase + `.variants` | `Button.variants.ts` |
| Hook | camelCase, `use` prefix | `useDebounce.ts`, `useCampaignList.ts` |
| Service | kebab-case + `.service` | `campaign.service.ts` |
| Store | camelCase, `use` prefix + `Store` | `useAuthStore.ts` |
| Schema | kebab-case + `.schema` | `campaign.schema.ts` |
| Types | kebab-case + `.types` | `campaign.types.ts` |
| Helper | camelCase | `string.ts`, `date.ts` |
| Page | `page.tsx` (Next.js convention) | `app/(dashboard)/campaigns/page.tsx` |
| Layout | `layout.tsx` | `app/(dashboard)/layout.tsx` |
| CSS tokens | kebab-case | `colors.css`, `typography.css` |

## Directories

| Type | Convention | Example |
|---|---|---|
| Feature | kebab-case, singular noun | `campaigns/`, `brand/`, `auth/` |
| Component dir | PascalCase | `Button/`, `DataTable/` |
| Lib module | kebab-case | `api/`, `query/`, `store/` |
| Route group | parenthesized | `(auth)/`, `(dashboard)/` |

## Code

| Type | Convention | Example |
|---|---|---|
| Component | PascalCase | `CampaignCard`, `DataTable` |
| Hook | camelCase, `use` prefix | `useCampaignList`, `useDebounce` |
| Function | camelCase, verb-first | `formatDate`, `getCampaigns` |
| Constant | SCREAMING_SNAKE | `MAX_FILE_SIZE`, `API_TIMEOUT` |
| Type/Interface | PascalCase | `Campaign`, `ApiResponse<T>` |
| Zod schema | camelCase + `Schema` | `campaignSchema` |
| CVA variants | camelCase + `Variants` | `buttonVariants`, `cardVariants` |
| Event handler | `on` + Event | `onClick`, `onSubmit` |
| Handler prop | `on` + Action | `onClose`, `onSelect` |
| Boolean prop | `is`/`has`/`should` prefix | `isLoading`, `hasError` |
| Store selector | inline arrow | `(s) => s.user` |

## CSS Custom Properties

```css
/* Category prefix */
--color-*           /* Colors */
--font-*            /* Typography */
--spacing-*         /* Spacing */
--radius-*          /* Border radius */
--shadow-*          /* Shadows */
--surface-*         /* Surface/background */
--text-*            /* Text colors */
--border-*          /* Border colors */
--brand-*           /* Brand-specific */
```

## API Paths

All API paths follow REST conventions:

```
GET    /api/v1/campaigns          # List
POST   /api/v1/campaigns          # Create
GET    /api/v1/campaigns/:id      # Get one
PATCH  /api/v1/campaigns/:id      # Update
DELETE /api/v1/campaigns/:id      # Delete
```

## React Query Keys

```ts
['campaigns']                    // list
['campaigns', { status: 'active' }] // filtered list
['campaigns', id]                // single item
```
