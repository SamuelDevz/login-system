import type { FastifyPluginAsync } from 'fastify'
import fastifyHealthcheck from 'fastify-healthcheck'
import { fastifyPlugin } from 'fastify-plugin'

const healthcheckPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyHealthcheck)
}

export default fastifyPlugin(healthcheckPlugin, {
  name: 'healthcheck',
  dependencies: ['swagger'],
})
