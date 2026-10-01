import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from './i18n/request'

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
