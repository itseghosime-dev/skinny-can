import { useTranslations } from 'next-intl'
import React from 'react'

export default function PartnerHeader() {
  const t = useTranslations('Partner')

  return (
    <div className="space-y-4 pb-28 text-center text-primary">
      <div className="relative after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-primary">
        <p className="text-sm uppercase tracking-wide md:text-base">
          {t('partner')}
        </p>
      </div>
      <h2 className="font-amiri text-3xl uppercase md:text-5xl lg:text-6xl">
        {t('title')}
      </h2>
    </div>
  )
}
