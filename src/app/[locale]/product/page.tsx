import Collections from '@/components/Collections'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import React from 'react'
import { Locale } from '@/i18n/request'
import { env } from '@/config/env'

interface PageProps {
  params: { locale: Locale }
}

export async function generateMetadata({
  params: { locale },
}: PageProps): Promise<Metadata> {
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    title: 'Products — Hard Lemonade & Hard Berries RTD Beverages',
    description:
      'Explore the Skinny Cans beverage collection. 100% organic vodka cocktails with zero sugar, only 57 kcal, and hand-picked Sicilian ingredients.',
    alternates: {
      canonical: `${baseUrl}/${locale}/product`,
      languages: {
        en: `${baseUrl}/en/product`,
        no: `${baseUrl}/no/product`,
        se: `${baseUrl}/se/product`,
      },
    },
    openGraph: {
      title: 'Our Products | Skinny Cans',
      description:
        'Zero sugar, 4% alc, organic vodka canned cocktails crafted for tomorrow.',
      url: `${baseUrl}/${locale}/product`,
    },
  }
}

export default function ProductPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)

  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <Collections />
    </main>
  )
}
