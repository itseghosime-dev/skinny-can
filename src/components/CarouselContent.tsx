import React from 'react'
import { SiteConfig } from '@/config/site-i18n'
import { Icons } from './icons'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type SiteConfigKey = keyof Pick<
  SiteConfig,
  'brewed' | 'backed' | 'built' | 'banner_description' | 'button_banner'
>

export type CarouselItem = {
  src: any
  heading: SiteConfigKey
  description: SiteConfigKey
  btn: SiteConfigKey
}

interface CarouselContentProps {
  cont: CarouselItem
  translation: SiteConfig
}

export default function CarouselContent({
  cont,
  translation,
}: CarouselContentProps) {
  function renderWithBreaks(text: string) {
    return text.split('\n').map((line, idx) => (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ))
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={cont.heading}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 z-10 flex flex-col items-start justify-end gap-2 p-5 pb-7 lg:p-7 xl:p-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-amiri text-2xl uppercase leading-6 text-white md:text-4xl"
        >
          {renderWithBreaks(translation[cont.heading] as string)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="font-varela text-xs uppercase text-white md:text-sm"
        >
          {translation[cont.description]}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Link
            href="/story"
            className="flex items-center justify-center gap-2 bg-[#F1F1F1] px-4 py-3 text-xs uppercase tracking-wider text-primary transition-colors duration-300 hover:bg-primary hover:text-white md:px-8 lg:text-base xl:text-lg"
          >
            {translation[cont.btn]} <Icons.rightArrow className="h-5 w-5" />
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
