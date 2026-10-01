'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ImagBg from '@/assets/waitlist.png'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SiteConfig } from '@/config/site-i18n'
import { Icons } from './icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { useRef, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import Image from 'next/image'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  description: z.string().min(1, { message: 'Description is required' }),
  topic: z.string().min(1, { message: 'Topic is required' }),
  attachment: z.instanceof(File).optional(),
})

export default function WaitlistForm({ config }: { config?: SiteConfig }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      description: '',
      topic: '',
      attachment: undefined,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

      if (!res.ok) {
        const { error } = await res.json()
        toast(`Error: ${error?.message || 'Could not submit ticket'}`)
      } else {
        toast('Your request was submitted successfully!')
        form.reset()
        setFileName('')
      }
    } catch (err: any) {
      console.error('Error submitting form:', err)
      if (err instanceof Response) {
        const data = await err.json()
        console.error('API error response:', data)
      }
      toast('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative pb-10">
      <div className="container">
        <div className="relative z-10 mx-auto mt-16 w-full max-w-2xl border border-[#DDDDDD] bg-white px-6 py-12 md:px-11">
          <h3 className="mb-8 text-pretty font-amiri text-2xl font-medium uppercase text-primary md:text-3xl lg:text-4xl">
            {config?.request}
          </h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <SelectTrigger className="h-auto w-full rounded-none border-[#DDDDDD] py-5 visited:ring-0 focus-visible:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Partner Inquiry">
                            Partner Inquiry
                          </SelectItem>
                          <SelectItem value="Product Information">
                            Product Information
                          </SelectItem>
                          <SelectItem value="Product Quality">
                            Product Quality
                          </SelectItem>
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
                        className="min-h-24 resize-none rounded-none border-[#DDDDDD] shadow-none outline-none ring-0 focus-visible:ring-0"
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
                      your email address<sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto resize-none rounded-none border-[#DDDDDD] py-3 shadow-none outline-none ring-0 focus-visible:ring-0"
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
                      Attachments
                    </FormLabel>
                    <FormControl>
                      <>
                        <div className="space-y-4">
                          <button
                            type="button"
                            className="w-full rounded-none border border-[#DDDDDD] py-3 font-varela text-sm text-primary"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Add file or drop files here
                          </button>

                          {fileName && (
                            <span className="block max-w-[200px] truncate font-medium">
                              {fileName}
                            </span>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="*/*"
                          className="hidden"
                          ref={(el) => {
                            if (el) {
                              // fileInputRef.current = el;
                              field.ref(el)
                            }
                          }}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setFileName(file.name)
                              field.onChange(file)
                            }
                          }}
                        />
                      </>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-8">
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-primary px-6 py-3 text-xs uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#96A69C] hover:text-white md:px-8 lg:text-base xl:text-lg"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      {config?.submit} <Icons.rightArrow className="h-5 w-5" />
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
        alt="Background Image"
        fill
        sizes="100%"
        className="absolute z-0 h-full w-full object-cover object-left-bottom md:object-contain"
      />
    </div>
  )
}
