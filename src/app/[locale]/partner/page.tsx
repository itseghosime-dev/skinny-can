import React from 'react'
import Invite from '@/assets/waitlist_bg.webp'
import BackingBg from '@/assets/backings_bg.svg'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import Image from 'next/image'
import StoryBanner from '@/components/StoryBanner'
import PartnersInfo from '@/components/PartnersInfo'
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
    title: t('partner_title'),
    description: t('partner_desc'),
    alternates: {
      canonical: `${baseUrl}/${locale}/partner`,
      languages: {
        en: `${baseUrl}/en/partner`,
        no: `${baseUrl}/no/partner`,
        se: `${baseUrl}/se/partner`,
      },
    },
    openGraph: {
      title: `${t('partner_title')} | Skinny Cans`,
      description: t('partner_desc'),
      url: `${baseUrl}/${locale}/partner`,
    },
  }
}

export default function PartnerPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)

  return (
    <main className="relative pb-40 md:pb-60">
      <div className="relative z-10">
        <StoryBanner img={Invite} page="partner" />
        <PartnersInfo />
      </div>
      <Image
        src={BackingBg}
        alt="Decorative background pattern"
        sizes="100%"
        className="pointer-events-none absolute bottom-0 z-0 h-full w-full object-cover object-bottom md:-bottom-12"
      />
    </main>
  )
}
