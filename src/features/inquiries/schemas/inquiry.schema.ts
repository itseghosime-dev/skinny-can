import { z } from 'zod'

export const INQUIRY_TOPICS = [
  'Partner Inquiry',
  'Product Information',
  'Product Quality',
] as const

export type InquiryTopic = (typeof INQUIRY_TOPICS)[number]

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
]

export function createInquiryClientSchema(t?: (key: string) => string) {
  const msg = (key: string, fallback: string) => (t ? t(key) : fallback)

  return z.object({
    email: z
      .string()
      .min(1, {
        message: msg('val_email_required', 'Email address is required'),
      })
      .email({
        message: msg('val_email_invalid', 'Please enter a valid email address'),
      })
      .max(255, {
        message: msg('val_email_invalid', 'Email must be under 255 characters'),
      }),
    topic: z
      .string()
      .min(1, { message: msg('val_topic_required', 'Please select a topic') }),
    description: z
      .string()
      .min(5, {
        message: msg(
          'val_description_min',
          'Description must be at least 5 characters',
        ),
      })
      .max(3000, {
        message: msg(
          'val_description_min',
          'Description must be under 3000 characters',
        ),
      }),
    attachment: z
      .custom<File | undefined>()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        msg('val_attachment_size', 'Attachment file size must be 5MB or less'),
      )
      .refine(
        (file) => !file || ACCEPTED_FILE_TYPES.includes(file.type),
        msg(
          'val_attachment_type',
          'Only .jpg, .jpeg, .png, .webp and .pdf files are accepted',
        ),
      )
      .optional(),
  })
}

export const inquiryClientSchema = createInquiryClientSchema()

export type InquiryFormValues = z.infer<typeof inquiryClientSchema>
