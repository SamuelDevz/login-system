import { fastifyJwt } from '@fastify/jwt'
import type { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from '../config/env.js'
import { authenticate } from '../hooks/authenticate.js'
import { authorized } from '../hooks/authorized.js'

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: { expiresIn: env.JWT_EXPIRES_IN || '1h' },
    cookie: { cookieName: 'access_token', signed: false },
  })

  app.addHook('preHandler', (req, _res, next) => {
    req.jwt = app.jwt
    return next()
  })

  app.decorate('authenticate', authenticate)
  app.decorate('authorized', authorized)
}

export default fastifyPlugin(jwtPlugin, { name: 'jwt' })
