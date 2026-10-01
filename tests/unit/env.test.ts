import { describe, it, expect } from 'vitest'
import { env } from '@/config/env'

describe('Environment Configuration', () => {
  it('loads valid default environment values', () => {
    expect(env.NODE_ENV).toBeDefined()
    expect(env.NEXT_PUBLIC_SITE_URL).toBe('https://skinny-cans.com')
  })
})
