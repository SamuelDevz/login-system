import { z } from 'zod'

const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100).trim(),
  email: z.email().min(1).max(255).trim().toLowerCase(),
  password: z.string().min(8),
})

export const usersSchema = z.array(
  userSchema.pick({
    id: true,
    name: true,
    email: true,
  }),
)

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
})

export const createUserResponseSchema = userSchema.pick({
  id: true,
  name: true,
  email: true,
})

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
})

export const sucessResponseSchema = z.object({
  message: z.string(),
})

export const validationErrorResponseSchema = z.object({
  error: z.string(),
  issues: z.array(
    z.object({
      path: z.string(),
      message: z.string(),
    }),
  ),
})

export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type LoginUserInput = z.infer<typeof loginSchema>
