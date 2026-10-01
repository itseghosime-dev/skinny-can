'use client'

import { useEffect } from 'react'

type Props = {
  error: Error & { digest?: string }
  reset(): void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Application runtime error:', error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="font-amiri text-2xl text-primary md:text-3xl">
        Something went wrong
      </h2>
      <p className="font-varela text-sm text-[#5F5F5F] md:text-base">
        An unexpected error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 bg-primary px-6 py-2.5 font-varela text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#96A69C]"
      >
        Try again
      </button>
    </div>
  )
}
