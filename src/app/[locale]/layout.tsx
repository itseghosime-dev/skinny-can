import '@/styles/globals.css'
import { Metadata } from 'next'
import { Amiri, Varela_Round } from 'next/font/google'
import { Locale, locales } from '@/i18n/request'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

import { getSiteConfig } from '@/config/site-i18n'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { NextIntlClientProvider } from 'next-intl'
import Footer from '@/components/Footer'
import Restriction from '@/components/Restriction'
import { Toaster } from '@/components/ui/sonner'
import { env } from '@/config/env'

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
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${siteConfig.name} — Clean, Conscious & Crafted Alcohol`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    robots: {
      index: locale === 'en',
      follow: true,
      googleBot: {
        index: locale === 'en',
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        no: `${baseUrl}/no`,
        se: `${baseUrl}/se`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'no' ? 'nb_NO' : 'se_NO',
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} — Clean, Conscious & Crafted Alcohol`,
      description: siteConfig.description,
      images: [
        {
          url: `${baseUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} — Clean, Conscious & Crafted Alcohol`,
      description: siteConfig.description,
      images: [`${baseUrl}/android-chrome-512x512.png`],
    },
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
  const messages = await getMessages()
  const siteConfig = getSiteConfig(locale)
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/android-chrome-512x512.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
      siteConfig.links.facebook,
    ],
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          amiri.variable,
          varelaRound.variable,
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader locale={locale} />
            <div className="flex-1">
              <Restriction config={siteConfig} />
              {children}
            </div>
            <Footer locale={locale} />
          </div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
