import type { FastifyPluginAsync } from 'fastify'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import { fastifyPlugin } from 'fastify-plugin'

const gracefulShutdownPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyGracefulShutdown, { timeout: 10000 })

  app.gracefulShutdown(async (signal) => {
    app.log.info(`Received ${signal}, shutting down gracefully`)
  })
}

export default fastifyPlugin(gracefulShutdownPlugin, {
  name: 'graceful-shutdown',
})