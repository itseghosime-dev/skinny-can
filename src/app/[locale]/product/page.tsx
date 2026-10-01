import Collections from '@/components/Collections'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

import { Locale } from '@/i18n/request'

export default function ProductPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  unstable_setRequestLocale(locale)

  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <Collections />
    </main>
  )
}
