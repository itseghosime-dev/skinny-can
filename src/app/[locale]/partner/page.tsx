import React from 'react'
import Invite from '@/assets/waitlist_bg.webp'
import BackingBg from '@/assets/backings_bg.svg'
import { unstable_setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import StoryBanner from '@/components/StoryBanner'
import PartnersInfo from '@/components/PartnersInfo'
import { Locale } from '@/i18n/request'

export default function PartnerPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
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
