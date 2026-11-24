import type { JWT } from '@fastify/jwt'
import type { PrismaClient, Role } from '../generated/prisma/client.ts'

type UserPayload = {
  id: string
  name: string
  email: string
  role: Role
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }

  interface FastifyInstance {
    db: PrismaClient
    authenticate: (
      req: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void> | void
    authorized: (roles: Role[]) => (request: FastifyRequest) => Promise<void>
  }
}
