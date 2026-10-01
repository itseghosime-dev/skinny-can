import StoryBanner from '@/components/StoryBanner'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'
import BBSBg from '@/assets/bbs.png'
import ScienceResearch from '@/components/ScienceResearch'
import NewNeed from '@/components/NewNeed'
import ScientificBacking from '@/components/ScientificBacking'
import BBSBanner from '@/components/BBSBanner'

export default function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <main className="w-screen overflow-x-hidden">
      <StoryBanner page="bbs" img={BBSBg} />
      <ScientificBacking />
      {/* <BBSBanner /> */}
      <ScienceResearch />
      <NewNeed />
    </main>
  )
}
