import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { AppError } from '../errors/app-error.js'

const errorHandlerPlugin: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((error, request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.status(400).send({
        error: 'Validation Error',
        issues: error.validation.map((issue) => ({
          path: issue.instancePath.replace(/^\//, '').replace(/\//g, '.'),
          message: issue.message,
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
    })
  })
}

export default fastifyPlugin(errorHandlerPlugin, { name: 'error-handler' })
