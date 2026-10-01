import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import robots from '@/app/robots'

describe('Technical SEO', () => {
  it('generates a valid robots configuration', () => {
    const robotsConfig = robots()
    expect(robotsConfig.sitemap).toContain('/sitemap.xml')
    expect(robotsConfig.rules).toBeDefined()
  })

  it('generates complete localized sitemap entries', () => {
    const entries = sitemap()
    expect(entries.length).toBeGreaterThan(10)

    // Check that English, Norwegian and Sami home routes exist
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/en'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/no'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/se'))).toBe(true)

    // Check dynamic product entries
    expect(urls.some((u) => u.includes('/product/hard_lemonade'))).toBe(true)
    expect(urls.some((u) => u.includes('/product/hard_berries'))).toBe(true)
  })
})
