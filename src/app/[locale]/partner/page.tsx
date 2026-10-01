import React from 'react'
import Invite from '@/assets/waitlist_bg.png'
import BackingBg from '@/assets/backings_bg.svg'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import StoryBanner from '@/components/StoryBanner'

export default function PartnerPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)

  return (
    <div className="relative pb-40 md:pb-60">
      <div className="relative z-10">
        <StoryBanner img={Invite} page="partner" />
      </div>
      <Image
        src={BackingBg}
        alt="Background"
        sizes="100%"
        className="absolute bottom-0 z-0 h-full w-full object-cover object-bottom md:-bottom-12"
      />
    </div>
  )
}
