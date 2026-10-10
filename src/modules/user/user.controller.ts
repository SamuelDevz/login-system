import type { FastifyReply, FastifyRequest } from 'fastify'
import type { CreateUserInput, LoginUserInput } from './user.schema.js'
import type { UserService } from './user.service.js'

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUsers = async (_req: FastifyRequest, reply: FastifyReply) => {
    const users = await this.userService.findUsers()
    return reply.status(200).send(users)
  }

  register = async (
    req: FastifyRequest<{
      Body: CreateUserInput
    }>,
    reply: FastifyReply,
  ) => {
    const { name, email, password } = req.body
    const user = await this.userService.createUser({ name, email, password })
    return reply.status(201).send(user)
  }

  login = async (
    req: FastifyRequest<{
      Body: LoginUserInput
    }>,
    reply: FastifyReply,
  ) => {
    const { email, password } = req.body

    const user = await this.userService.autenticate({ email, password })

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    }
    const token = req.jwt.sign(payload)

    reply.setCookie('access_token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    })

    return reply.status(200).send({ accessToken: token })
  }

  logout = async (_req: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('access_token')
    return reply.status(200).send({ message: 'Logout successful' })
  }
}
