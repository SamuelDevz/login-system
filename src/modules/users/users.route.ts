import type { FastifyTypedInstance } from '../../@types/fastify-typed-instance.js'
import { UserController } from './users.controller.js'
import { UserRepository } from './users.repository.js'
import {
  createUserResponseSchema,
  createUserSchema,
  errorResponseSchema,
  loginResponseSchema,
  loginSchema,
  logoutResponseSchema,
  profileUserSchema,
} from './users.schema.js'
import { UserService } from './users.service.js'

export async function userRoutes(app: FastifyTypedInstance) {
  const userRepository = new UserRepository(app.db)
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)

  app.post(
    '/register',
    {
      schema: {
        summary: 'Register user',
        tags: ['Auth'],
        security: [],
        description: 'Register a new user account with credentials and role.',
        body: createUserSchema,
        response: {
          201: createUserResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    userController.register,
  )

  app.post(
    '/login',
    {
      config: { rateLimit: { max: 5, timeWindow: '15 minutes' } },
      schema: {
        summary: 'Authenticate user',
        tags: ['Auth'],
        security: [],
        description:
          'Authenticate user credentials to return an access token and set a refresh token cookie.',
        body: loginSchema,
        response: {
          200: loginResponseSchema,
          400: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    userController.login,
  )

  app.get(
    '/me',
    {
      preHandler: [app.authenticate, app.authorized(['USER', 'ADMIN'])],
      schema: {
        summary: 'Get user profile',
        tags: ['User'],
        security: [{ bearerAuth: [] }],
        description:
          'Retrieve details and profile information of the currently authenticated user.',
        response: {
          200: profileUserSchema,
          401: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    userController.profile,
  )

  app.delete(
    '/logout',
    {
      preHandler: [app.authenticate],
      schema: {
        summary: 'Logout user',
        tags: ['Auth'],
        security: [{ cookieAuth: [] }],
        description:
          'Clear authentication session and revoke the refresh token cookie.',
        response: {
          200: logoutResponseSchema,
          401: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    userController.logout,
  )
}
