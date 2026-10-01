import { useTranslations } from 'next-intl'
import React from 'react'
import CounterBg from '@/assets/counter-bg.png'
import CounterBg1 from '@/assets/counter-bg-1.png'
import Image from 'next/image'

export default function Counters() {
  const t = useTranslations('Index')
  const stats = t.raw('stat_facts') as { percent: string; text: string }[]

  return (
    <div className="relative mt-5 bg-[#F4EA48] py-6">
      <Image
        src={CounterBg}
        alt="Flower"
        sizes="100%"
        className="absolute bottom-0 right-0 z-0 hidden md:block "
      />
      <Image
        src={CounterBg1}
        alt="Flower"
        sizes="100%"
        className="absolute bottom-0 left-0 z-0 "
      />
      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-5 md:grid-cols-3">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={
                  idx === 1
                    ? 'flex flex-col justify-center border-y border-primary py-4 md:max-h-20 md:border-x md:border-y-0 md:py-0'
                    : ''
                }
              >
                <div className="mx-auto max-w-[200px] text-center text-primary">
                  <h3 className="font-amiri text-3xl md:text-5xl lg:text-6xl">
                    {item.percent}
                  </h3>
                  <p className="text-sm md:text-base">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
