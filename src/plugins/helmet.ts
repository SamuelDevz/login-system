import { fastifyHelmet } from '@fastify/helmet'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

const helmetPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          'cdn.jsdelivr.net/npm/@scalar/api-reference',
          "'unsafe-inline'",
        ],
      },
    },
  })
}

export default fastifyPlugin(helmetPlugin, { name: 'helmet' })
