import { fastifySwagger } from '@fastify/swagger'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { jsonSchemaTransform } from 'fastify-type-provider-zod'
import { env } from '../config/env.js'

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Authentication & User API',
        description:
          'REST API for user authentication and profile management using Fastify and JWT.',
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
          description: 'Local Development Server',
        },
      ],
      tags: [
        {
          name: 'Auth',
          description: 'Authentication endpoints (Register, Login, Logout)',
        },
        {
          name: 'User',
          description: 'User management and authenticated profile endpoints',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description:
              'Enter your JWT access token in the format: Bearer <token>',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  })
}

export default fastifyPlugin(swaggerPlugin, { name: 'swagger' })
