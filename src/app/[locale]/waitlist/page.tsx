import React from 'react'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { getSiteConfig } from '@/config/site-i18n'
import WaitlistForm from '@/components/WaitlistForm'
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
    title: 'Contact Us & Partner Waiting List | Skinny Cans',
    description:
      'Submit an inquiry or join the waiting list for Skinny Cans. Inquiries for commercial partnerships, retail distribution, and product information.',
    alternates: {
      canonical: `${baseUrl}/${locale}/waitlist`,
      languages: {
        en: `${baseUrl}/en/waitlist`,
        no: `${baseUrl}/no/waitlist`,
        se: `${baseUrl}/se/waitlist`,
      },
    },
    openGraph: {
      title: 'Join the Waiting List | Skinny Cans',
      description: 'Submit a partnership request or product inquiry.',
      url: `${baseUrl}/${locale}/waitlist`,
    },
  }
}

export default function Page({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  const siteConfig = getSiteConfig(locale)
  return (
    <main className="mx-auto mt-20 w-screen overflow-hidden lg:mt-40">
      <WaitlistForm config={siteConfig} />
    </main>
  )
}
