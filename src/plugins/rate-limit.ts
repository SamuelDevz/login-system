import { fastifyRateLimit } from '@fastify/rate-limit'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

const rateLimitPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (request) => request.ip,
  })
}

export default fastifyPlugin(rateLimitPlugin, { name: 'rate-limit' })
