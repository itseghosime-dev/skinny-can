import StoryBanner from '@/components/StoryBanner'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import React from 'react'
import BBSBg from '@/assets/bbs.webp'
import ScienceResearch from '@/components/ScienceResearch'
import NewNeed from '@/components/NewNeed'
import ScientificBacking from '@/components/ScientificBacking'
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
    title: 'The Science of Smarter Drinking — BBS Research & Evidence',
    description:
      'Discover the clinical research behind sugar-free alcohol. Why sugar and alcohol combined trigger severe metabolic inflammation, and how Skinny Cans changes that.',
    alternates: {
      canonical: `${baseUrl}/${locale}/bbs`,
      languages: {
        en: `${baseUrl}/en/bbs`,
        no: `${baseUrl}/no/bbs`,
        se: `${baseUrl}/se/bbs`,
      },
    },
    openGraph: {
      title: 'The Science of Smarter Drinking | Skinny Cans',
      description:
        'Peer-reviewed studies on alcohol, sugar metabolic load, and liver health.',
      url: `${baseUrl}/${locale}/bbs`,
    },
  }
}

export default function SciencePage({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)

  return (
    <main className="w-screen overflow-x-hidden">
      <StoryBanner page="bbs" img={BBSBg} />
      <ScientificBacking />
      <ScienceResearch />
      <NewNeed />
    </main>
  )
}
