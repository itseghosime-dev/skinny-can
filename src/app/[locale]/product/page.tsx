import Collections from '@/components/Collections'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
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
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    title: t('product_title'),
    description: t('product_desc'),
    alternates: {
      canonical: `${baseUrl}/${locale}/product`,
      languages: {
        en: `${baseUrl}/en/product`,
        no: `${baseUrl}/no/product`,
        se: `${baseUrl}/se/product`,
      },
    },
    openGraph: {
      title: `${t('product_title')} | Skinny Cans`,
      description: t('product_desc'),
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
