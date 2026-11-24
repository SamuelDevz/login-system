import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { AppError } from './app-error.js'

export async function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    return reply.status(422).send({
      error: 'Validation Error',
      issues: error.issues.map(({ path, message }) => ({
        path: path.join('.'),
        message,
      })),
    })
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: error.message,
      code: error.code,
    })
  }

  request.log.error(error)
  return reply.status(500).send({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred',
  })
}
