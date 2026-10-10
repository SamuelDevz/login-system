import { fastifyCors } from '@fastify/cors'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from '../config/env.js'

const corsPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyCors, {
    origin: env.NODE_ENV !== 'production',
    credentials: true,
  })
}

export default fastifyPlugin(corsPlugin, {
  name: 'cors',
  dependencies: ['helmet'],
})
