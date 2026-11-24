import { fastifyHelmet } from '@fastify/helmet'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

const helmetPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    noSniff: true,
    hidePoweredBy: true,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: 'sameorigin' },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  })
}

export default fastifyPlugin(helmetPlugin, { name: 'helmet' })
