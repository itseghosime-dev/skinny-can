import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { getSiteConfig } from '@/config/site-i18n'
import WaitlistForm from '@/components/WaitlistForm'

export default function Page({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const siteConfig = getSiteConfig(locale)
  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <WaitlistForm config={siteConfig} />
    </main>
  )
}
