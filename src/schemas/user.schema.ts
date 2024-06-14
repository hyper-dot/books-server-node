import { z } from 'zod'

export const userSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name should be string',
  }),
  password: z.string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a number.',
  }),
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Must be an email.',
    })
    .email({ message: 'Invalid email.' }),
})

export const otpSchema = z.object({
  otp: z.string().min(6).max(6),
  email: z.string().email(),
})
