import type { FastifyPluginAsync } from 'fastify'
import fastifyGracefulShutdown from 'fastify-graceful-shutdown'
import { fastifyPlugin } from 'fastify-plugin'

const gracefulShutdownPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyGracefulShutdown)
}

export default fastifyPlugin(gracefulShutdownPlugin, {
  name: 'graceful-shutdown',
})
