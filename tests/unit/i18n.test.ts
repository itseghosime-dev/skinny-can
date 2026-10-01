import { describe, it, expect } from 'vitest'
import { locales, defaultLocale, languageNames } from '@/i18n/request'

describe('i18n Configuration', () => {
  it('supports English, Norwegian, and Sami locales', () => {
    expect(locales).toContain('en')
    expect(locales).toContain('no')
    expect(locales).toContain('se')
    expect(defaultLocale).toBe('en')
  })

  it('has readable names for all supported locales', () => {
    for (const locale of locales) {
      expect(languageNames[locale]).toBeDefined()
      expect(typeof languageNames[locale]).toBe('string')
    }
  })
})
