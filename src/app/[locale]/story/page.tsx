import Stories from '@/components/Stories'
import StoryBanner from '@/components/StoryBanner'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import React from 'react'
import StoryBg from '@/assets/skinny-story.webp'
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
    title: t('story_title'),
    description: t('story_desc'),
    alternates: {
      canonical: `${baseUrl}/${locale}/story`,
      languages: {
        en: `${baseUrl}/en/story`,
        no: `${baseUrl}/no/story`,
        se: `${baseUrl}/se/story`,
      },
    },
    openGraph: {
      title: `${t('story_title')} | Skinny Cans`,
      description: t('story_desc'),
      url: `${baseUrl}/${locale}/story`,
    },
  }
}

export default function StoryPage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)

  return (
    <main>
      <StoryBanner page="skinny" img={StoryBg} />
      <Stories />
    </main>
  )
}
