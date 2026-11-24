import { fastifyCookie } from '@fastify/cookie'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from '../config/env.js'

const cookiePlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyCookie, {
    secret: env.JWT_SECRET,
    hook: 'preHandler',
  })
}

export default fastifyPlugin(cookiePlugin, { name: 'cookie' })
