'use client'

import React, { useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        muted={muted}
        autoPlay={autoPlay}
        className="h-full w-full object-cover"
      />

      {/* Play/Pause Button Overlay */}
      <button
        onClick={togglePlay}
        className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-base text-white backdrop-blur transition hover:bg-black/80"
        aria-label="Toggle Play/Pause"
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  )
}
