import '@/styles/globals.css'
import { Metadata } from 'next'
import { Amiri, Varela_Round } from 'next/font/google'
import { Locale, locales } from '@/i18n'
import { unstable_setRequestLocale } from 'next-intl/server'

import { getSiteConfig } from '@/config/site-i18n'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/Footer'
import Restriction from '@/components/Restriction'
import { Toaster } from '@/components/ui/sonner'

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

const varelaRound = Varela_Round({
  variable: '--font-varela-round',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const siteConfig = getSiteConfig(locale)
  return {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  }
}

export type PageProps = Readonly<{
  children: React.ReactNode
  params: { locale: Locale }
}>

export default async function RootLayout({
  children,
  params: { locale },
}: PageProps) {
  unstable_setRequestLocale(locale)

  let messages
  try {
    messages = (await import(`@/locales/${locale}.json`)).default
  } catch (error) {
    console.error(`Missing translation file for locale: ${locale}`)
    messages = {} // fallback to empty messages or handle 404
  }

  const siteConfig = getSiteConfig(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          amiri.variable,
          varelaRound.variable,
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader locale={locale} />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex-1">
              <Restriction config={siteConfig} />
              {children}
            </div>
          </NextIntlClientProvider>
          <Footer locale={locale} />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
