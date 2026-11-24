import type { FastifyRequest } from 'fastify'
import { AppError } from '../errors/app-error.js'
import type { Role } from '../generated/prisma/enums.js'

export function authorized(roles: Role[]) {
  return async (req: FastifyRequest): Promise<void> => {
    const user = req.user

    if (!user?.role) throw new AppError('Unauthorized access', 401)

    if (!roles.includes(user.role))
      throw new AppError('Insufficient permissions', 403)
  }
}
