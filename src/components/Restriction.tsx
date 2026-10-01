'use client'

import { useEffect, useState } from 'react'
import { SiteConfig } from '@/config/site-i18n'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ImaBg from '@/assets/welcome.png'

export default function Restriction({ config }: { config: SiteConfig }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const ageConfirmed = localStorage.getItem('ageConfirmed')
    if (!ageConfirmed) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('ageConfirmed', 'true')
    setIsOpen(false)
  }

  const handleReject = () => {
    // Redirect to another page or show a message
    window.location.href = 'https://www.google.com' // or /not-allowed
  }

  if (!isOpen) return null
  return (
    <div className="fixed inset-0 left-0 top-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="container">
        <section className="relative mx-auto max-w-4xl bg-white">
          <Image
            src={ImaBg}
            alt="Background Image"
            fill
            sizes="100%"
            className="absolute z-0 h-full w-full object-cover object-right-top md:object-contain"
          />
          <div className="relative z-10 w-full space-y-5 px-6 pb-32 pt-20 text-center md:px-12 lg:px-20 xl:px-24">
            <h3 className="text-pretty font-amiri text-2xl font-bold uppercase text-primary md:text-3xl lg:text-4xl">
              {config?.restrictions.welcome}
            </h3>
            <p className="font-varela text-sm font-normal text-primary md:text-base lg:text-lg">
              {config.restrictions.check}
            </p>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
              <button
                onClick={handleReject}
                className="flex items-center justify-center gap-2 border border-primary bg-transparent px-6 py-3 text-xs uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-[#96A69C] hover:text-white md:px-8 lg:text-base"
              >
                {config.restrictions.no}
              </button>
              <button
                onClick={handleAccept}
                className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] hover:text-white md:px-8 lg:text-base"
              >
                {config.restrictions.yes}
              </button>
            </div>
            <div>
              <p className="mx-auto max-w-xl font-varela text-sm font-normal text-primary md:text-base lg:text-lg">
                {config.restrictions.read}{' '}
                <Link className="underline underline-offset-2" href="">
                  {config.restrictions.more}.
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
