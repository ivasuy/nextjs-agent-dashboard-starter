import { z } from 'zod';

const booleanFromEnv = z
  .enum(['true', 'false', '1', '0', ''])
  .default('true')
  .transform((val) => val === 'true' || val === '1');

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Dashboard Starter'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default('http://localhost:8000/api/v1'),
  NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().default(30000),
  NEXT_PUBLIC_AUTH_COOKIE_NAME: z.string().default('auth_token'),
  NEXT_PUBLIC_AUTH_REFRESH_COOKIE_NAME: z.string().default('refresh_token'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: booleanFromEnv,
  NEXT_PUBLIC_ENABLE_MOCK_API: booleanFromEnv,
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables. Check server logs for details.');
  }
  return parsed.data;
}

let _env: Env | undefined;

export function getEnv(): Env {
  if (!_env) _env = validateEnv();
  return _env;
}

export const env = new Proxy({} as Env, {
  get(_, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
