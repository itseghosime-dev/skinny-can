import StoryBanner from '@/components/StoryBanner'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'
import BBSBg from '@/assets/bbs.webp'
import ScienceResearch from '@/components/ScienceResearch'
import NewNeed from '@/components/NewNeed'
import ScientificBacking from '@/components/ScientificBacking'
import { Locale } from '@/i18n/request'

export default function SciencePage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
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
