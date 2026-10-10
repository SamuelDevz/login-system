import type { FastifyTypedInstance } from '../../types/fastify-typed-instance.js'
import { UserController } from './user.controller.js'
import { UserRepository } from './user.repository.js'
import {
  createUserResponseSchema,
  createUserSchema,
  errorResponseSchema,
  loginResponseSchema,
  loginSchema,
  sucessResponseSchema,
  usersSchema,
  validationErrorResponseSchema,
} from './user.schema.js'
import { UserService } from './user.service.js'

export async function userRoutes(app: FastifyTypedInstance) {
  const userRepository = new UserRepository(app.db)
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)

  app.get(
    '/',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['users'],
        response: {
          200: usersSchema,
          404: errorResponseSchema,
        },
      },
    },
    userController.getUsers,
  )

  app.post(
    '/register',
    {
      schema: {
        tags: ['users'],
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
          400: validationErrorResponseSchema,
          409: errorResponseSchema,
        },
      },
    },
    userController.register,
  )

  app.post(
    '/login',
    {
      schema: {
        tags: ['users'],
        body: loginSchema,
        response: {
          201: loginResponseSchema,
          401: errorResponseSchema,
          404: validationErrorResponseSchema,
        },
      },
    },
    userController.login,
  )

  app.delete(
    '/logout',
    {
      preHandler: [app.authenticate],
      schema: {
        tags: ['users'],
        response: {
          200: sucessResponseSchema,
        },
      },
    },
    userController.logout,
  )
}
