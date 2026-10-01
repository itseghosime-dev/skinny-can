import Image from 'next/image'
import React from 'react'

import { useTranslations } from 'next-intl'
import Apos from '@/assets/apos.png'
import EventFlower from '@/assets/event-flower.svg'
import VideoPlayer from './Player'

export default function Events() {
  const t = useTranslations('Index')

  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src={EventFlower}
        alt="Flower"
        sizes="100%"
        className="absolute right-0 top-0 z-0 "
      />
      <div className="container relative py-28 md:py-40">
        <div className="relative mx-auto mb-5 max-w-[600px] text-center font-amiri text-xl font-normal italic text-primary md:mb-10 md:text-4xl lg:mb-16 lg:max-w-[800px] lg:text-5xl">
          <Image
            src={Apos}
            alt="Apostrophe"
            sizes="100%"
            className="absolute -left-2 top-0 h-5 w-5 rotate-180 md:-left-7 md:h-8 md:w-8 lg:-left-10 lg:h-10 lg:w-10"
          />
          <h3>
            {t('event_heading')
              .split('\n')
              .map((line, idx, arr) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx !== arr.length - 1 && <br />}
                </React.Fragment>
              ))}
          </h3>
          <Image
            src={Apos}
            alt="Apostrophe"
            sizes="100%"
            className="absolute -right-2 bottom-0 h-5 w-5 md:-right-7 md:h-8 md:w-8 lg:-right-10 lg:h-10 lg:w-10"
          />
        </div>
        <div>
          <div className="relative h-full w-full p-3 md:p-6">
            <div className="relative h-full w-full bg-white">
              <VideoPlayer
                src="/Event.mp4"
                poster="/poster.jpg"
                autoPlay={true}
                muted
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
