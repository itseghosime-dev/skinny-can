import Stories from '@/components/Stories'
import StoryBanner from '@/components/StoryBanner'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'
import StoryBg from '@/assets/skinny-story.webp'

export default function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <main>
      <StoryBanner page="skinny" img={StoryBg} />
      <Stories />
    </main>
  )
}
