import { type FastifyJWT, fastifyJwt } from '@fastify/jwt'
import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from '../config/env.js'
import { AppError } from '../errors/app-error.js'

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifyJwt, { secret: env.JWT_SECRET })

  app.addHook('preHandler', (req, _res, next) => {
    req.jwt = app.jwt
    return next()
  })

  app.decorate(
    'authenticate',
    async (req: FastifyRequest, _reply: FastifyReply) => {
      const token = req.cookies.access_token

      if (!token)
        throw new AppError('Authentication required', 401, 'UNAUTHORIZED')

      try {
        const decoded = req.jwt.verify<FastifyJWT['user']>(token)
        req.user = decoded
      } catch (_error) {
        throw new AppError('Invalid or expired token', 401, 'INVALID_TOKEN')
      }
    },
  )
}

export default fastifyPlugin(jwtPlugin, { name: 'jwt' })
