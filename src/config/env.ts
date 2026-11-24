import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('127.0.0.1'),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
})

export const env = envSchema.parse(process.env)
