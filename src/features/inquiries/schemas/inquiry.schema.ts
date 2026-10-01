import { z } from 'zod'

export const INQUIRY_TOPICS = [
  'Partner Inquiry',
  'Product Information',
  'Product Quality',
] as const

export type InquiryTopic = (typeof INQUIRY_TOPICS)[number]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
]

export const inquiryClientSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must be under 255 characters' }),
  topic: z.string().min(1, { message: 'Please select a topic' }),
  description: z
    .string()
    .min(5, { message: 'Description must be at least 5 characters' })
    .max(3000, { message: 'Description must be under 3000 characters' }),
  attachment: z
    .custom<File | undefined>()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      'Attachment file size must be 5MB or less',
    )
    .refine(
      (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png, .webp and .pdf files are accepted',
    )
    .optional(),
})

export type InquiryFormValues = z.infer<typeof inquiryClientSchema>
