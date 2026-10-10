import fastifyApiReference from '@scalar/fastify-api-reference'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

const scalarPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyApiReference, { routePrefix: '/docs' })
}

export default fastifyPlugin(scalarPlugin, {
  name: 'scalar',
  dependencies: ['swagger'],
})
