import { z } from 'zod'

const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3).max(100).trim(),
  email: z.email().max(255).trim().toLowerCase(),
  password: z.string().min(8).max(255),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  createdAt: z.date(),
})

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  role: true,
})

export const createUserResponseSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
  role: true,
})

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  expires: z.number(),
})

export const profileUserSchema = userSchema.omit({
  password: true,
})

export const logoutResponseSchema = z.object({
  message: z.string(),
})

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
  code: z.string().optional(),
  issues: z
    .array(
      z.object({
        path: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginSchema>
