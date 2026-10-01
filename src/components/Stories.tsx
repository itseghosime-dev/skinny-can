import { useTranslations } from 'next-intl'
import Image from 'next/image'
import StoryImage1 from '@/assets/the_story_img.png'
import StoryImage2 from '@/assets/the_story_img_2.png'
import StoryImage3 from '@/assets/the_story_img_3.png'
import StoryImage4 from '@/assets/the_story_img_4.png'
import StoryImage1Bg from '@/assets/the_story_1_bg.png'
import StoryImage2Bg from '@/assets/the_story_2_bg.png'
import StoryImage3Bg from '@/assets/the_story_3_bg.png'
import StoryImage4Bg from '@/assets/the_story_4_bg.png'
import React from 'react'

export default function Stories() {
  const t = useTranslations('Index')
  return (
    <div className="overflow-hidden">
      <div className="pb-10">
        <div className="mx-auto max-w-6xl">
          {/* First story Grid */}

          <div className="container relative">
            <Image
              src={StoryImage1Bg}
              alt="The Story"
              sizes="100%"
              className="absolute top-0 z-0 h-full w-auto object-cover opacity-30 md:h-auto md:w-full md:opacity-60 lg:opacity-85"
            />
            <div className="relative z-10 grid items-center gap-8 pb-4 pt-24 md:grid-cols-2 md:gap-12 xl:gap-24">
              <div className="space-y-4 lg:space-y-6">
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_intro')}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_origin')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
              <div>
                <Image
                  src={StoryImage1}
                  alt="The Story"
                  sizes="100%"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Second story Grid */}

          <div className="container relative">
            <Image
              src={StoryImage2Bg}
              alt="The Story"
              sizes="100%"
              className="absolute bottom-0 right-0 z-0 h-full w-auto object-cover opacity-30 md:h-auto md:w-full md:opacity-60 lg:opacity-85"
            />
            <div className="relative z-10 grid items-center gap-8 py-24 md:grid-cols-2 md:gap-12 xl:gap-24">
              <div className="order-2 md:order-1">
                <Image
                  src={StoryImage2}
                  alt="The Story"
                  sizes="100%"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="order-1 space-y-4 md:order-2 lg:space-y-6">
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_alek_intro')}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_brewing')}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_by_hand')}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_on_no_sugar')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
            </div>
          </div>

          {/* Third story Grid */}

          <div className="container relative">
            <Image
              src={StoryImage3Bg}
              alt="The Story"
              sizes="100%"
              className="absolute bottom-0 left-0 z-0 h-full w-auto object-cover opacity-30 md:h-auto md:w-full md:object-contain md:opacity-60 lg:h-full lg:w-auto lg:opacity-85"
            />
            <div className="relative z-10 grid items-center gap-8 pb-24 md:grid-cols-2 md:gap-12 xl:gap-24">
              <div className="space-y-4 lg:space-y-6">
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_naming')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_truth')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_by_consequence')}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_evolution')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_regret')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
              </div>
              <div>
                <Image
                  src={StoryImage3}
                  alt="The Story"
                  sizes="100%"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Forth story Grid */}

          <div className="container relative">
            <Image
              src={StoryImage4Bg}
              alt="The Story"
              sizes="100%"
              className="absolute -right-1/4 top-0 z-0 h-full w-auto object-cover opacity-30 md:h-auto md:w-full md:max-w-3xl md:opacity-60 lg:opacity-85"
            />
            <div className="relative z-10 grid items-center gap-8 pb-20 pt-7 md:grid-cols-2 md:gap-12 xl:gap-24">
              <div className="order-2 md:order-1">
                <Image
                  src={StoryImage4}
                  alt="The Story"
                  sizes="100%"
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="order-1 space-y-4 md:order-2 lg:space-y-6">
                <h4 className="font-amiri text-2xl text-primary md:text-3xl lg:text-4xl">
                  {t('story_today')}
                </h4>
                <p className="font-varela text-base text-[#5F5F5F] lg:text-lg">
                  {t('story_tagline')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </p>
                <h4 className="font-amiri text-xl text-primary lg:text-2xl">
                  {t('story_footer')
                    .split('\n')
                    .map((line, idx, arr) => (
                      <React.Fragment key={idx}>
                        {line}
                        {idx !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
