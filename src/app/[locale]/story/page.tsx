import Stories from '@/components/Stories'
import StoryBanner from '@/components/StoryBanner'
import { unstable_setRequestLocale } from 'next-intl/server'
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
  const baseUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    title: 'The Skinny Story — Brewed by Hand, Built for Health',
    description:
      'Learn the origin of Skinny Cans. How an army veteran turned fitness enthusiast rebelled against sugar-laden alcohol by brewing clean cocktails by hand.',
    alternates: {
      canonical: `${baseUrl}/${locale}/story`,
      languages: {
        en: `${baseUrl}/en/story`,
        no: `${baseUrl}/no/story`,
        se: `${baseUrl}/se/story`,
      },
    },
    openGraph: {
      title: 'The Skinny Story | Skinny Cans',
      description:
        'Brewed by hand. Born out of frustration. Built for freedom.',
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
