import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32),
})

const loggerSchema = {
  development: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: { level: 'info' },
  staging: { level: 'info' },
}

export const env = envSchema.parse(process.env)
export const logger = loggerSchema
