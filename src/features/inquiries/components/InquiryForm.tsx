'use client'
import React, { useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { toast } from 'sonner'
import { FaSpinner } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

import ImagBg from '@/assets/waitlist.webp'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Icons } from '@/components/icons'
import { SiteConfig } from '@/config/site-i18n'
import {
  inquiryClientSchema,
  InquiryFormValues,
  INQUIRY_TOPICS,
} from '@/features/inquiries/schemas/inquiry.schema'

export default function InquiryForm({ config }: { config?: SiteConfig }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryClientSchema),
    defaultValues: {
      email: '',
      description: '',
      topic: 'Partner Inquiry',
      attachment: undefined,
    },
  })

  async function onSubmit(values: InquiryFormValues) {
    setLoading(true)
    const formData = new FormData()
    formData.append('email', values.email)
    formData.append('description', values.description)
    formData.append('topic', values.topic)
    if (values.attachment) {
      formData.append('attachment', values.attachment)
    }

    try {
      const res = await fetch('/api/freshdesk', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(
          data.error || 'Could not submit your inquiry. Please try again.',
        )
      } else {
        toast.success(
          data.mock
            ? 'Inquiry received! (Development mock mode)'
            : 'Your request was submitted successfully! Our team will get back to you shortly.',
        )
        form.reset()
        setFileName('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    } catch (err) {
      console.error('Inquiry submission error:', err)
      toast.error(
        'Network error occurred. Please check your connection and try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClearAttachment = () => {
    form.setValue('attachment', undefined)
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="relative pb-10">
      <div className="container">
        <div className="relative z-10 mx-auto mt-16 w-full max-w-2xl border border-[#DDDDDD] bg-white px-6 py-12 shadow-sm md:px-11">
          <h1 className="mb-8 text-pretty font-amiri text-2xl font-medium uppercase text-primary md:text-3xl lg:text-4xl">
            {config?.request || 'Submit a Request'}
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
              noValidate
            >
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-varela text-sm capitalize text-primary">
                      Topic<sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger
                          aria-label="Select topic"
                          className="h-auto w-full rounded-none border-[#DDDDDD] py-4 text-primary focus-visible:ring-1 focus-visible:ring-primary"
                        >
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none border-[#DDDDDD] bg-white shadow-md">
                          {INQUIRY_TOPICS.map((topic) => (
                            <SelectItem
                              key={topic}
                              value={topic}
                              className="cursor-pointer py-3 text-sm text-primary hover:bg-[#F1F1F1]"
                            >
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-varela text-sm capitalize text-primary">
                      Description<sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us how we can help you..."
                        className="min-h-28 resize-none rounded-none border-[#DDDDDD] p-3 text-primary shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-varela text-sm capitalize text-primary">
                      Your Email Address<sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="h-auto rounded-none border-[#DDDDDD] px-3 py-3 text-primary shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attachment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-varela text-sm capitalize text-primary">
                      Attachments (Optional, max 5MB)
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <button
                          type="button"
                          className="w-full rounded-none border border-dashed border-[#B0B0B0] py-4 font-varela text-sm text-primary transition-colors hover:border-primary hover:bg-[#F9FBF9] focus:outline-none focus:ring-1 focus:ring-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          📎 Add file or drop files here (.jpg, .png, .webp,
                          .pdf)
                        </button>

                        {fileName && (
                          <div className="flex items-center justify-between border border-[#DDDDDD] bg-[#F7F7F7] px-3 py-2 text-sm text-primary">
                            <span className="max-w-[280px] truncate font-medium">
                              {fileName}
                            </span>
                            <button
                              type="button"
                              onClick={handleClearAttachment}
                              className="p-1 text-[#6E6E6E] hover:text-primary"
                              aria-label="Remove attached file"
                            >
                              <IoClose className="h-4 w-4" />
                            </button>
                          </div>
                        )}

                        <input
                          type="file"
                          data-testid="file-input"
                          accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                          className="hidden"
                          ref={(el) => {
                            field.ref(el)
                            fileInputRef.current = el
                          }}
                          onChange={(e) => {
                            const selectedFile = e.target.files?.[0]
                            if (selectedFile) {
                              setFileName(selectedFile.name)
                              field.onChange(selectedFile)
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-primary px-8 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] disabled:opacity-60 md:px-10 lg:text-base"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {config?.submit || 'Submit'}{' '}
                      <Icons.rightArrow className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Image
        src={ImagBg}
        alt="Waitlist background illustration"
        fill
        sizes="100%"
        className="absolute z-0 h-full w-full object-cover object-left-bottom md:object-contain"
        priority
      />
    </div>
  )
}
