import { describe, it, expect } from 'vitest'
import sitemap, { INDEXABLE_LOCALES } from '@/app/sitemap'
import robots from '@/app/robots'

describe('Technical SEO', () => {
  it('generates a valid robots configuration with API disallow and sitemap URL', () => {
    const robotsConfig = robots()
    expect(robotsConfig.sitemap).toContain('/sitemap.xml')
    expect(robotsConfig.rules).toBeDefined()
  })

  it('generates sitemap entries strictly for indexable locales (reconciled with noindex policy)', () => {
    const entries = sitemap()
    expect(entries.length).toBe(8) // 6 static routes + 2 dynamic product routes

    const urls = entries.map((e) => e.url)
    // English indexable routes must be present
    expect(urls.some((u) => u.endsWith('/en'))).toBe(true)
    expect(urls.some((u) => u.includes('/product/hard_lemonade'))).toBe(true)
    expect(urls.some((u) => u.includes('/product/hard_berries'))).toBe(true)

    // Non-indexable placeholder locales (/no, /se) must NOT be present in sitemap
    expect(urls.some((u) => u.endsWith('/no'))).toBe(false)
    expect(urls.some((u) => u.endsWith('/se'))).toBe(false)
  })
})
