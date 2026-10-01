import React from 'react'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { getSiteConfig } from '@/config/site-i18n'
import WaitlistForm from '@/components/WaitlistForm'
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
    title: t('waitlist_title'),
    description: t('waitlist_desc'),
    alternates: {
      canonical: `${baseUrl}/${locale}/waitlist`,
      languages: {
        en: `${baseUrl}/en/waitlist`,
        no: `${baseUrl}/no/waitlist`,
        se: `${baseUrl}/se/waitlist`,
      },
    },
    openGraph: {
      title: `${t('waitlist_title')} | Skinny Cans`,
      description: t('waitlist_desc'),
      url: `${baseUrl}/${locale}/waitlist`,
    },
  }
}

export default function Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const siteConfig = getSiteConfig(locale)
  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <WaitlistForm config={siteConfig} />
    </main>
  )
}
