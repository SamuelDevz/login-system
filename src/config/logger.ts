import { env } from './env.js'

const redactConfig = {
  paths: [
    'req.headers.authorization',
    'req.headers.cookie',
    '*.password',
    '*.passwordHash',
    '*.token',
  ],
}

const loggerSchema = {
  development: {
    level: 'debug',
    redact: redactConfig,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: {
    level: 'info',
    redact: redactConfig,
  },
  staging: {
    level: 'info',
    redact: redactConfig,
  },
}

export const logger = loggerSchema[env.NODE_ENV]
