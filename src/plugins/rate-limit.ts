import { fastifyRateLimit } from '@fastify/rate-limit'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

const rateLimitPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyRateLimit, {
    global: true,
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (request) => request.ip,
    errorResponseBuilder: () => ({
      statusCode: 429,
      error: 'Too Many Requests',
      message: 'Rate limit exceeded. Please wait before retrying.',
    }),
  })

  app.setNotFoundHandler((request, reply) => {
    reply.code(404).send({ error: 'Not Found', path: request.url })
  })
}

export default fastifyPlugin(rateLimitPlugin, { name: 'rate-limit' })
