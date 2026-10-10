import { fastifySwagger } from '@fastify/swagger'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'REST API',
        description: 'API for managing users',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
}

export default fastifyPlugin(swaggerPlugin, { name: 'swagger' })
