import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  FRESHDESK_DOMAIN: z.string().optional(),
  FRESHDESK_API_KEY: z.string().optional(),
  NEXT_PUBLIC_MAPS_API_KEY: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://skinny-cans.com'),
})

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  FRESHDESK_DOMAIN: process.env.FRESHDESK_DOMAIN,
  FRESHDESK_API_KEY: process.env.FRESHDESK_API_KEY,
  NEXT_PUBLIC_MAPS_API_KEY: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
})

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format())
  throw new Error('Invalid environment configuration')
}

export const env = parsed.data
