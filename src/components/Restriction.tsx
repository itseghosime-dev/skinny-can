'use client'

import { useEffect, useState } from 'react'
import { SiteConfig } from '@/config/site-i18n'
import Image from 'next/image'
import React from 'react'
import ImaBg from '@/assets/welcome.webp'
import { Link } from '@/i18n/routing'

export default function Restriction({ config }: { config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const hasConfirmedStorage = localStorage.getItem('ageConfirmed')
    const hasConfirmedCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('ageConfirmed='))

    if (!hasConfirmedStorage && !hasConfirmedCookie) {
      setIsOpen(true)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ageConfirmed', 'true')
    document.cookie =
      'ageConfirmed=true; path=/; max-age=31536000; SameSite=Lax'
    document.body.style.overflow = ''
    setIsOpen(false)
  }

  const handleReject = () => {
    window.location.href = 'https://www.responsibility.org'
  }

  if (!mounted || !isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      aria-describedby="age-gate-desc"
      className="fixed inset-0 left-0 top-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-4xl">
        <section className="relative mx-auto overflow-hidden bg-white shadow-2xl">
          <Image
            src={ImaBg}
            alt="Welcome background illustration"
            fill
            sizes="100%"
            className="pointer-events-none absolute z-0 h-full w-full object-cover object-right-top md:object-contain"
            priority
          />
          <div className="relative z-10 w-full space-y-5 px-6 pb-24 pt-20 text-center md:px-12 lg:px-20 xl:px-24">
            <h2
              id="age-gate-title"
              className="text-pretty font-amiri text-2xl font-bold uppercase text-primary md:text-3xl lg:text-4xl"
            >
              {config?.restrictions?.welcome || 'Welcome!'}
            </h2>
            <p
              id="age-gate-desc"
              className="font-varela text-sm font-normal text-primary md:text-base lg:text-lg"
            >
              {config?.restrictions?.check || 'Just checking, you are over 21?'}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-2 md:flex-row">
              <button
                type="button"
                onClick={handleReject}
                className="flex items-center justify-center gap-2 border border-primary bg-transparent px-8 py-3 font-varela text-xs uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-[#96A69C] hover:text-white focus:outline-none focus:ring-2 focus:ring-primary md:text-base"
              >
                {config?.restrictions?.no || 'No, I’m under 21'}
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex items-center justify-center gap-2 bg-primary px-8 py-3 font-varela text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] hover:text-white focus:outline-none focus:ring-2 focus:ring-primary md:text-base"
              >
                {config?.restrictions?.yes || 'Yes, I’m over 21'}
              </button>
            </div>
            <div className="pt-2">
              <p className="mx-auto max-w-xl font-varela text-xs text-primary/80 md:text-sm">
                {config?.restrictions?.read ||
                  'This site uses cookies to give you the best experience.'}{' '}
                <Link
                  className="underline underline-offset-2 hover:text-primary"
                  href="/story"
                >
                  {config?.restrictions?.more || 'here'}.
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
