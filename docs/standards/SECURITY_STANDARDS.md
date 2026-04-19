# Security Standards

## Token Storage

### Rules

1. **Never store tokens in localStorage** -- vulnerable to XSS
2. Use encrypted in-memory storage via `@/lib/auth`
3. Refresh tokens are stored in httpOnly cookies (managed by backend)
4. Access tokens are short-lived and held in memory only

### Token Flow

```
Login -> Backend sets httpOnly refresh cookie
      -> Frontend receives access token in response body
      -> Access token stored in encrypted memory (@/lib/auth)
      -> Axios interceptor attaches access token to requests
      -> On 401: interceptor uses refresh cookie to get new access token
      -> On refresh failure: redirect to login
```

## XSS Prevention

### Input Sanitization

Always sanitize user-generated content before rendering:

```ts
import { sanitize } from '@/helpers/sanitize';

// In component
<div>{sanitize(userInput)}</div>
```

### React Defaults

React escapes content in JSX by default. Never bypass this:

```tsx
// ALWAYS: Let React escape content
<div>{userContent}</div>
```

Never inject raw HTML into the DOM. If rich text rendering is needed, use the `sanitize` helper from `@/helpers/sanitize` with a trusted sanitizer (DOMPurify) and strict allowlists.

### Content Security Policy

Headers are configured in `next.config.ts` to prevent inline scripts and restrict resource origins.

## Input Validation

### Client-Side (Zod)

All form inputs are validated with Zod schemas before submission:

```ts
const createCampaignSchema = z.object({
  name: z.string().min(1, 'Required').max(100, 'Too long'),
  budget: z.number().positive('Must be positive'),
  startDate: z.string().datetime(),
});
```

### Server-Side

Client validation is a UX convenience. The backend must validate all inputs independently. Never trust client-side validation alone.

## API Security

### Auth Interceptor

The Axios client in `@/lib/api` automatically:
- Attaches the access token to every request
- Handles 401 responses with token refresh
- Redirects to login on refresh failure
- Never exposes tokens in URLs or query parameters

### CORS

API requests go through the Next.js proxy (`src/proxy.ts`), which handles CORS configuration server-side.

## Environment Variables

```
# Public (exposed to browser) -- prefix with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_WS_URL=...

# Private (server-only) -- no prefix
DATABASE_URL=...
JWT_SECRET=...
```

Rules:
- Never put secrets in `NEXT_PUBLIC_*` variables
- Never commit `.env.local` to version control
- Use `@/config` to access environment variables with type safety

## File Upload Security

The file upload system in `@/lib/upload` enforces:
- File type validation (allowlist of MIME types)
- File size limits
- Image dimension limits
- Client-side validation before upload

```ts
import { validateFile } from '@/lib/upload';

const result = validateFile(file, {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
});
```

## Dependency Security

- Run `npm audit` regularly
- Keep dependencies updated
- Never install packages from untrusted sources
