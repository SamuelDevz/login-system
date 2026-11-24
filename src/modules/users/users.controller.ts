import type { FastifyReply, FastifyRequest } from 'fastify'
import ms, { type StringValue } from 'ms'
import { env } from '../../config/env.js'
import type { CreateUserInput, LoginUserInput } from './users.schema.js'
import type { UserService } from './users.service.js'

export class UserController {
  constructor(private readonly userService: UserService) {}

  register = async (
    req: FastifyRequest<{ Body: CreateUserInput }>,
    reply: FastifyReply,
  ) => {
    const user = await this.userService.createUser(req.body)
    reply.status(201).send(user)
  }

  login = async (
    req: FastifyRequest<{ Body: LoginUserInput }>,
    reply: FastifyReply,
  ) => {
    const user = await this.userService.loginUser(req.body)

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    const token = await reply.jwtSign(payload)
    const expires = ms(env.JWT_EXPIRES_IN as StringValue)

    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: true,
      maxAge: expires / 1000,
    })

    return reply.status(200).send({ accessToken: token, expires })
  }

  profile = async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.user
    const user = await this.userService.getUserById(id)
    return reply.status(200).send(user)
  }

  logout = async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('access_token', { path: '/' })
    return reply.status(200).send({ message: 'Logout successful' })
  }
}
