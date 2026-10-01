import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['en', 'no', 'se'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'
export const localePrefix = 'always' as const

export const languageNames: Record<Locale, string> = {
  en: 'English',
  no: 'Norsk',
  se: 'Sámegiella',
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default
    return {
      locale,
      messages,
    }
  } catch {
    const fallback = (await import('../../messages/en.json')).default
    return {
      locale: defaultLocale,
      messages: fallback,
    }
  }
})
